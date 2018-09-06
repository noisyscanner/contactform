import React from 'react';
import ContactForm from './ContactForm';

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            success: false
        }
    }

    setSuccess(success) {
        this.setState({
            ...this.state,
            success: !!success
        });
    }

    setError(error) {
        this.setState({
            ...this.state,
            error
        });
    }

    render() {
        const { success, error } = this.state;
        return <div>
            {
                error &&
                <p className="error">
                    Sorry, something went wrong while sending your message. Please email us directly.
                </p>
            }

            { 
                success
                    ? <p className="success">Thanks for getting in touch. We aim to get back to you within 1 working day.</p>
                    : <ContactForm setSuccess={this.setSuccess.bind(this)} setError={this.setError.bind(this)} />
            }
        </div>;
    }
}