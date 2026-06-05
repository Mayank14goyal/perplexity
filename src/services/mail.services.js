import nodemailer from "nodemailer";

const useAppPassword = Boolean(process.env.GMAIL_APP_PASSWORD);
const authConfig = useAppPassword
  ? {
      user: process.env.GOOGLE_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    }
  : {
      type: "OAuth2",
      user: process.env.GOOGLE_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    };

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: authConfig,
});

transporter.verify()
  .then(() => {
    console.log("Ready to send emails");
  })
  .catch((err) => {
    console.log("Error setting up email transporter", err);
  });

export async function sendEmail({ to, subject, text, html }) {
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    text,
    html,
  };

  const details = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully", details);
}


