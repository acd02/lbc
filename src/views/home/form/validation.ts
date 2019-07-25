import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  message: yup
    .string()
    .max(280)
    .required('Please enter your message'),
  label: yup
    .string()
    .oneOf(['public', 'private'], 'wrong value provided')
    .required('Please provide a label')
})
