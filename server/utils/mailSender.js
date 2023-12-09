import nodemailer from "nodemailer";

const mailSender = async ({ email, otp }) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      service: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const body = `<div>
            <b>${otp} </b> is your otp for reseting your password!
        </div>`;

    let info = await transporter.sendMail({
      from: "www.petsparadise.com",
      to: email,
      subject: "Regarding Password Reset",
      html: body,
    });
  } catch (error) {
    console.log(error);
  }
};

export default mailSender;
