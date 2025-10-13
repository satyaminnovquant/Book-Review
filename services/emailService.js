const nodemailer = require("nodemailer");

// Create transporter with your working Gmail settings
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number.parseInt(process.env.SMTP_PORT) || 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendThankYouReviewEmail = async (email, userName, bookTitle) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${process.env.APP_NAME || "Book Review Hub"}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thanks for reviewing "${bookTitle}"! 📚`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9fafb; border-radius: 8px;">
          <h2 style="color: #10b981;">Hi ${userName},</h2>
          <p>Thanks for sharing your thoughts on <strong>${bookTitle}</strong>! Your review helps fellow readers and supports authors.</p>
          <p>Keep exploring, reviewing, and inspiring! 📖</p>
          <p style="margin-top: 30px;">– The Book Review Hub Team</p>
          <hr style="margin-top: 40px;">
          <p style="font-size: 12px; color: #888;">This is an automated message. Please do not reply.</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("mail send to user");
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("✗ Review thank-you email error:", error);
    return { success: false, message: error.message };
  }
};

const sendAuthorReviewNotificationEmail = async (email, authorName, bookTitle, reviewerName, reviewLink) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${process.env.APP_NAME || "Book Review Hub"}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your book "${bookTitle}" just got a new review! ✨`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f0fdf4; border-radius: 8px;">
          <h2 style="color: #16a34a;">Hello ${authorName},</h2>
          <p>We're excited to let you know that <strong>${reviewerName}</strong> just reviewed your book <strong>"${bookTitle}"</strong> on Book Review Hub.</p>
          <p>You can read the review here:</p>
          <p><a href="${reviewLink}" target="_blank" style="color: #2563eb;">View Review</a></p>
          <p>Thank you for sharing your work with the world. Keep writing and inspiring! ✍️</p>
          <p style="margin-top: 30px;">– The Book Review Hub Team</p>
          <hr style="margin-top: 40px;">
          <p style="font-size: 12px; color: #888;">This is an automated message. Please do not reply.</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
       console.log("mail send to author");
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("✗ Author notification email error:", error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  sendThankYouReviewEmail,
  sendAuthorReviewNotificationEmail
};