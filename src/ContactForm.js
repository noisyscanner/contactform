import React from 'react'
import {withFormik} from 'formik'
import sendEmail from './sendmail'

const InputField = ({
  name,
  error,
  el: Element = 'input',
  ...props
}) => <div className={`form-group form-group--${Element}`}>
  <Element key='input' name={name} placeholder={name.toUpperCase()} type={props.type || Element === 'input'
    ? 'text'
    : null} className='contact__field' {...props} />

  { error && <span key='error' className='fieldError'>{error}</span> }
</div>

const Form = ({
  values,
  errors,
  handleSubmit,
  handleChange,
  handleBlur,
  isSubmitting
}) => <form onSubmit={handleSubmit}>
  <InputField name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} error={errors.name} />

  <InputField name='email' type='email' onChange={handleChange} onBlur={handleBlur} value={values.email} error={errors.email} />

  <InputField name='message' el='textarea' rows='10' onChange={handleChange} onBlur={handleBlur} value={values.message} error={errors.message} />

  <div className='form-group form-group--button text-right'>
    <button type='submit' disabled={isSubmitting}>Send</button>
  </div>
</form>

export default withFormik({
  mapPropsToValues: props => ({ name: '', email: '', message: '' }),
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    sendEmail(props.endpoint, values).then(() => {
      props.setError(null)
      props.setSuccess(true)
    }).catch((error) => {
      setSubmitting(false)
      props.setSuccess(false)

      if (error.kind === 'validationError' && error.errors) {
        setErrors(error.errors)
        props.setError(null)
      } else {
        props.setError(error)
      }
    })
  }
})(Form)
