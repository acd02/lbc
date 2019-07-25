import { styles as formStyles } from './styles'
import { styles } from '../styles'

import * as React from 'react'
import { fold } from 'fp-ts/lib/Either'
import { Formik, FormikProps, Form } from 'formik'
import { toast } from 'react-toastify'

import { Switch } from 'commons/atoms/switch'
import { Button } from 'commons/atoms/button'
import { TextArea } from 'commons/atoms/textarea'
import { post } from 'utils/http'

import { validationSchema } from './validation'
import { useMessageStore } from '../store'

import { Err, Message, MessageWithID } from 'shared/model'

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
            .then(fold(err => console.error(err), message => addMessage(message)))
            .finally(() => {
              actions.resetForm()
              setShouldReset(true)
              toast.info('your message has been published', {
                className: styles.toast(data.label === 'public')
              })
            })
        }}
        onReset={() => setShouldReset(true)}
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
