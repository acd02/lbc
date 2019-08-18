import { Form, Formik, FormikProps } from 'formik'
import { fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import * as React from 'react'
import { toast } from 'react-toastify'

import { Button } from '/commons/atoms/button'
import { Switch } from '/commons/atoms/switch'
import { TextArea } from '/commons/atoms/textarea'
import { Err, Message, MessageWithID } from '/shared/model'
import { post } from '/utils/http'

import { useMessageStore } from '../store'
import { styles } from '../styles'
import { styles as formStyles } from './styles'
import { validationSchema } from './validation'

/* eslint-disable-next-line max-lines-per-function */
export function MessageForm() {
  const [shouldReset, setShouldReset] = React.useState(false)
  const { addMessage } = useMessageStore()

  return (
    <div className={formStyles.root}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          message: '',
          label: 'public'
        }}
        onSubmit={(data, actions) => {
          post<Message, Err, MessageWithID>(data)('/.netlify/functions/postMessage')
            .then(
              fold(
                err => console.error(err),
                message => {
                  pipe(
                    addMessage(message),
                    fold(
                      () =>
                        toast.info('oops', {
                          className: styles.toast('error')
                        }),
                      () =>
                        toast.info('your message has been published', {
                          className: styles.toast(data.label)
                        })
                    )
                  )
                }
              )
            )
            .finally(() => {
              actions.resetForm()
              setShouldReset(true)
            })
        }}
        onReset={() => setShouldReset(true)}
        /* eslint-disable-next-line max-lines-per-function */
        render={(formState: FormikProps<Message>) => {
          const { setFieldValue, values, dirty } = formState
          function handleSubmit(e: React.MouseEvent) {
            e.preventDefault()

            formState
              .validateForm()
              .then(_errorObject => formState.submitForm())
              .catch(err => console.error(err))
          }

          dirty && setShouldReset(false)

          return (
            <Form>
              <TextArea<Message>
                onChange={value => setFieldValue('message', value)}
                shouldReset={shouldReset}
                name="message"
                className={formStyles.textArea}
                placeholder="Type your message"
              />
              <span
                className={formStyles.charactersCountBlock(values.message.length > 280)}
              >
                {values.message.length} / 280
              </span>
              <div className={formStyles.switchSection}>
                <Switch
                  id="switchOne"
                  shouldReset={shouldReset}
                  onChecked={() => setFieldValue('label', 'private')}
                  onUnchecked={() => setFieldValue('label', 'public')}
                />
                <span>
                  This message will be{' '}
                  <span className={formStyles.switchLabel(values.label === 'public')}>
                    {values.label}
                  </span>
                </span>
              </div>
              <Button
                onClick={handleSubmit}
                className={formStyles.submitBtn}
                label="publish"
                isSubmitBtn={true}
                isDisabled={!formState.isValid}
              />
            </Form>
          )
        }}
      />
    </div>
  )
}
