import React from 'react';
import {withFormik} from 'formik';

async function sendEmail(mailEndpoint, values) {
  const data = new URLSearchParams();
  Object.entries(values).forEach(p => data.append(...p));

  try {
    const response = await fetch(mailEndpoint, {
      method: 'post',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    });

    if (response.ok) return response;

    const body = await response.json();

    if (response.status === 400) {
      throw {
        kind : 'validationError',
        errors: body.errors,
        context: response
      };
    }

    throw {
      kind : 'apiError',
      context: {
        response,
        body
      }
    };
  } catch (error) {
    console.log(error);
    if (error.kind)
      throw error;

    throw {
      type: 'apiError',
      error
    };
  }
}

const InputField = ({
  name,
  error,
  el: Element = 'input',
  ...props
}) => <div className="form-group">
  <Element key="input" name={name} placeholder={name.toUpperCase()} type={props.type || Element == 'input'
      ? 'text'
      : null} className="contact__field" {...props}/>

  { error && <span key="error" className="fieldError">{error}</span> }
</div>;

const Form = ({
  mailEndpoint,
  values,
  errors,
  handleSubmit,
  handleChange,
  handleBlur,
  isSubmitting
}) => {
  return <form onSubmit={handleSubmit(mailEndpoint)}>
    <InputField name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} error={errors.name} />

    <InputField name="email" type="email" onChange={handleChange} onBlur={handleBlur} value={values.email} error={errors.email} />

    <InputField name="message" el="textarea" rows="10" onChange={handleChange} onBlur={handleBlur} value={values.message} error={errors.message} />

    <div className="form-group text-right">
      <button type="submit" className="contact__button" disabled={isSubmitting}>Send</button>
    </div>
  </form>;
}

export default withFormik({
  mapPropsToValues: props => ({ name: '', email: '', message: '' }),
  handleSubmit: (values, { props, setSubmitting, setErrors }) => endpoint => {
    sendEmail(endpoint, values).then(() => {
      props.setError(null);
      props.setSuccess(true);
    }).catch((error) => {
      setSubmitting(false);
      props.setSuccess(false);

      if (error.kind == 'validationError' && error.errors) {
        setErrors(error.errors);
        props.setError(null);
      } else {
        props.setError(error);
      }
    });
  }
})(Form);
