import React from 'react'
import { withFormik } from 'formik'
import sendEmail from './sendmail'
import Loader from './Loader'
import { ValidationError } from './errors'

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

const SubmitButton = ({
  isSubmitting,
  children
}) =>
  <div className='form-group form-group--button'>
    <button type='submit' disabled={isSubmitting}>
      {
        isSubmitting
          ? <Loader />
          : children
      }
    </button>
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

  <SubmitButton isSubmitting={isSubmitting}>Send</SubmitButton>
</form>

export default withFormik({
  mapPropsToValues: () => ({ name: '', email: '', message: '' }),
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    sendEmail(props.endpoint, values).then(() => {
      props.setError(null)
      props.setSuccess(true)
    }).catch(error => {
      setSubmitting(false)
      props.setSuccess(false)

      if (error instanceof ValidationError) {
        setErrors(error.errors)
        props.setError(null)
      } else {
        props.setError(error)
      }
    })
  }
})(Form)
