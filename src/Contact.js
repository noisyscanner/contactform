import React from 'react'
import PropTypes from 'prop-types'
import ContactForm from './ContactForm'
import ThemeContext from './ThemeContext'

const ThemeShape = PropTypes.shape({
  loaderClass: PropTypes.string
})

export default class Contact extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    theme: ThemeShape
  }

  static defaultProps = {
    theme: {
      loaderClass: ''
    }
  }

  state = {
    error: null,
    success: false
  }

  setSuccess (success) {
    this.setState({ success: !!success })
  }

  setError (error) {
    this.setState({ error })
  }

  render () {
    const { success, error } = this.state
    const { endpoint, theme } = this.props
    return <ThemeContext.Provider value={theme}>
      {
        error &&
        <p className='contact__error'>
            Sorry, something went wrong while sending your message. Please email us directly.
        </p>
      }

      {
        success
          ? <p className='contact__success'>Thanks for getting in touch. We aim to get back to you within 1 working day.</p>
          : <ContactForm endpoint={endpoint} setSuccess={this.setSuccess.bind(this)} setError={this.setError.bind(this)} />
      }
    </ThemeContext.Provider>
  }
}
