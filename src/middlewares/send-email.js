const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL_ADDRESS,
    pass: process.env.SMTP_EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, name, verificationUrl) => {
  await transporter.sendMail({
    from: {
      name: "Apotekku",
      address: process.env.SMTP_EMAIL_ADDRESS,
    },
    to: email,
    subject: "Apotekku Registration Confirmation",
    html: `<h1>Account Confirmation</h1>
            <h2>Hi ${name},</h2>
            <p>Welcome to Apotekku! Please confirm your email by clicking on the link below:</p>
            <a href="${verificationUrl}">Click Here</a>
            <p>If you can't click on that link, please copy and paste following url in your browser:</p>
            <p>${verificationUrl}</p>`,
  });
};

const sendResetEmail = async (email, name, verificationUrl) => {
  await transporter.sendMail({
    from: {
      name: "Apotekku",
      address: process.env.SMTP_EMAIL_ADDRESS,
    },
    to: email,
    subject: "Apotekku Reset Password Confirmation",
    html: `<h1>Reset Password Confirmation</h1>
            <h2>Hi ${name},</h2>
            <p>We received a request to reset the password for your account.</p>
            <p>To reset your password, click link below:</p>
            <a href="${verificationUrl}">Click Here</a>
            <p>If you can't click on that link, please copy and paste following url in your browser:</p>
            <p>${verificationUrl}</p>`,
  });
};

module.exports = { sendVerificationEmail, sendResetEmail };
