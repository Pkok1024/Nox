/** @format */

import nodemailer from 'nodemailer';

export default async function sendVerificationEmail(toEmail, verificationUrl) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lzaky404@gmail.com',
      pass: 'kqfsqrqrdigiaicr',
    },
  });

  const mailOptions = {
    from: '"M.U.F.A.R." <admin@onlasdan.tech>',
    to: toEmail,
    subject: 'Account Verification',
    html: `

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: Arial, Helvetica, sans-serif;
        }
        .container {
            background-color: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 10px;
            color: white;
            max-width: 600px;
            margin: auto;
            position: relative;
            height: 100%;
        }
        .content {
            position: relative;
            z-index: 1;
        }
        .logo {
            text-align: center; /* Center logo */
            margin-top: 20px; /* Top margin */
        }
        .logo img {
            border-radius: 50%;
            width: 150px; /* Logo width */
            height: 150px; /* Logo height */
        }
        .button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            font-size: 18px;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
        }
        .button-container {
            text-align: center;
        }
        .alternate-link {
            color: #007bff;
            text-decoration: none;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            color: #999999;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://telegra.ph/file/bb154efc53f1bc317c8e0.jpg" alt="Logo">
        </div>
        <div class="content">
            <h2 style="font-size: 24px; text-align: center;">Please verify your email address to access your account:</h2>
            <div class="button-container">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            <p style="font-size: 16px; text-align: center; margin-top: 20px;">If the button above doesn't work, you can use the following link:</p>
            <p style="font-size: 16px; text-align: center;"><a href="${verificationUrl}" class="alternate-link">click here if the button above doesn't work</a></p>
            <p style="font-size: 14px; text-align: center;">This verification link will expire in 14 minutes.</p>
            <p style="font-size: 14px; text-align: center;">If you did not sign up for an account, you can ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024-2026 NoxVenenum.</p>
        </div>
    </div>
</body>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}
