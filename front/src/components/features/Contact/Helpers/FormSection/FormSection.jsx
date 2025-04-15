import React, { useState } from 'react';
import HeadingStart from '../../../../shared/HeadingStyles/HeadingStart';
import axios from 'axios';
const VITE_REACT_APP_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY 

const FormSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  // console.log(VITE_REACT_APP_API_KEY)

  const [status, setStatus] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const emailData = {
      sender: { email: "info@appnxt.in" }, // Use your Brevo verified sender email
      to: [{ email: "info@appnxt.in" }], // Replace with the recipient's email
      subject: "New Contact Form Submission",
      htmlContent: `
        <h3>New Contact Form Submission</h3>
        <p><strong>First Name:</strong> ${formData.firstName}</p>
        <p><strong>Last Name:</strong> ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `,
    };

    try {
      // Make the API call to Brevo to send the email
      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        emailData,
        {
          headers: {
            'api-key': VITE_REACT_APP_API_KEY, // Access the API key from .env
            'Content-Type': 'application/json',
          },
        }
      );

      // console.log(response)

      setStatus('Message sent successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      setStatus('Error sending message. Please try again later.');
      console.error('Error sending email:', error);
    }
  };

  return (
    <>
      <div className="container pt-cs">
        <div className="contact">
          <div className="row">
            <div className="col-md-12">
              <div className="form-section">
                <div className="header">
                  <HeadingStart
                    width={100}
                    highlight={`We're Always Ready to Help You`}
                    highlightSize={window.innerWidth >= 767 ? 92 : 45}
                    normal={'& Answer Your Questions'}
                    normalSize={window.innerWidth >= 767 ? 82 : 40}
                  />
                </div>
                {/* <div className="form-card"> */}
                  <form className="form-card" onSubmit={handleSubmit}>
                    <div className="w-100 grid-cs">
                      <input
                        type="text"
                        placeholder="First Name*"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name*"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email*"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Phone Number*"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <textarea
                      name="message"
                      placeholder="How can we help you?*"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                    <button type="submit">Get in Touch</button>
                    {status && <p>{status}</p>}
                  </form>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSection;
