import { styles } from './styles'

import * as React from 'react'
import cx from 'classnames'
import {
  fromNullable,
  fromPredicate,
  map as mapOpt,
  option,
  isSome
} from 'fp-ts/lib/Option'
import { sequenceT } from 'fp-ts/lib/Apply'
import { pipe } from 'fp-ts/lib/pipeable'
import { FieldProps, Field, ErrorMessage } from 'formik'

import { reducer } from './reducer'
import { ErrorTransition } from 'commons/atoms/errorTransition'
import { useIsInitialMount } from 'utils/hooks'

const optionSequence = sequenceT(option)

export type State = {
  defaultHeight: number
  value: string
  isFocused: boolean
}

type Props<T> = {
  name: keyof T
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  className?: string
  shouldReset?: boolean
}

export function TextArea<T>(props: Props<T>) {
  const [state, dispatch] = React.useReducer(reducer, {
    defaultHeight: 0,
    value: props.value || '',
    isFocused: false
  })

  const { defaultHeight, isFocused } = state

  const isInitialMount = useIsInitialMount()

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
  const cloneRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    pipe(
      fromPredicate<boolean>(_isInitialMount => !_isInitialMount && !!props.shouldReset)(
        isInitialMount
      ),
      mapOpt(() => {
        dispatch({ type: 'SET_VALUE', payload: '' })

        pipe(
          optionSequence(
            fromNullable(cloneRef.current),
            fromNullable(textAreaRef.current)
          ),
          mapOpt(([clone, textArea]) => {
            setCloneContent(clone, '')
            textArea.style.height = `${defaultHeight}px`
          })
        )
      })
    )
  }, [props.shouldReset])

  React.useLayoutEffect(() => {
    pipe(
      fromNullable(textAreaRef.current),
      mapOpt(textArea => {
        dispatch({
          type: 'SET_DEFAULT_HEIGHT',
          payload: textArea.offsetHeight
        })

        const clone = cloneRef.current as HTMLDivElement

        setCloneContent(clone, state.value)
        textArea.style.height = `${Math.max(clone.offsetHeight, defaultHeight)}px`
      })
    )
  }, [])

  function setCloneContent(cloneElm: HTMLDivElement, value: string) {
    // we want to prevent the 'newValue' to be serialized as html
    cloneElm.textContent = value + '\n'
    const hiddenCloneInnerHTML = cloneElm.innerHTML
    const newContent = hiddenCloneInnerHTML.replace(/\n/g, '<br>')
    cloneElm.innerHTML = newContent
  }

  return (
    <Field
      name={props.name}
      render={({ field, form }: FieldProps) => {
        function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
          dispatch({ type: 'SET_VALUE', payload: e.target.value })

          pipe(
            optionSequence(
              fromNullable(cloneRef.current),
              fromNullable(textAreaRef.current)
            ),
            mapOpt(([clone, textArea]) => {
              setCloneContent(clone, e.target.value)
              textArea.style.height = `${Math.max(clone.offsetHeight, defaultHeight)}px`
            })
          )

          pipe(
            fromNullable(props.onChange),
            mapOpt(onChang => onChang(e.target.value))
          )
        }

        function handleFocus() {
          dispatch({ type: 'SET_IS_FOCUSED', payload: true })
        }

        function handleBlur(e: React.ChangeEvent<HTMLTextAreaElement>) {
          dispatch({ type: 'SET_IS_FOCUSED', payload: false })
          field.onBlur(e)
        }

        const hasErrrors = pipe(
          optionSequence(
            fromNullable(form.errors[field.name]),
            fromNullable(form.touched[field.name])
          ),
          isSome
        )

        return (
          <div className={styles.wrapper}>
            <div
              className={cx(styles.root, props.className, isFocused && styles.isFocused)}
            >
              <textarea
                {...field}
                placeholder={props.placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleInput}
                value={state.value}
                ref={textAreaRef}
                className={styles.textArea}
              ></textarea>
              <div ref={cloneRef} className={styles.clone} />
            </div>
            <ErrorTransition className={styles.errorsBlock} toggle={hasErrrors}>
              <ErrorMessage name={String(field.name)} />
            </ErrorTransition>
          </div>
        )
      }}
    />
  )
}
