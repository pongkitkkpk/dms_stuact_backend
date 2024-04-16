const nodemailer = require('nodemailer');

// Create a transporter with your SMTP settings
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

/**
 * Function to send an email using nodemailer.
 * @param {string} recipient - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The text content of the email.
 * @returns {Promise} A promise indicating whether the email was sent successfully or not.
 */
const sendEmail = async (recipient, subject, text) => {
  try {
    // Create email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: subject,
      text: text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    
    return { status: 'success', message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
