import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendEmail({ to, subject, html }) {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
  } catch (error) {
    // Email failures should never crash an order — just log it.
    console.error('Email send failed:', error.message);
  }
}

function orderConfirmationTemplate(order) {
  const itemsRows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px 0; color: #f6f1ea;">${item.name} × ${item.quantity}</td>
          <td style="padding: 10px 0; color: #f6f1ea; text-align: right;">Rs. ${
            item.price * item.quantity
          }</td>
        </tr>`
    )
    .join('');

  return `
    <div style="background-color: #181411; padding: 40px; font-family: sans-serif;">
      <div style="max-width: 480px; margin: 0 auto; background-color: #1f1a16; border-radius: 20px; padding: 32px;">
        <h1 style="color: #c68a4b; font-size: 24px; margin-bottom: 8px;">DROP</h1>
        <p style="color: #f6f1ea; opacity: 0.7; margin-bottom: 24px;">Every Drop Matters.</p>

        <h2 style="color: #f6f1ea; font-size: 18px;">Your order is confirmed!</h2>
        <p style="color: #f6f1ea; opacity: 0.7; margin-bottom: 24px;">
          Order #${order._id}
        </p>

        <table style="width: 100%; border-collapse: collapse;">
          ${itemsRows}
        </table>

        <div style="border-top: 1px solid rgba(246,241,234,0.15); margin-top: 16px; padding-top: 16px; display: flex; justify-content: space-between;">
          <span style="color: #f6f1ea; font-weight: bold;">Total</span>
          <span style="color: #c68a4b; font-weight: bold; float: right;">Rs. ${order.total}</span>
        </div>

        <p style="color: #f6f1ea; opacity: 0.5; font-size: 12px; margin-top: 32px;">
          We'll notify you as your order moves through preparation, brewing, and delivery.
        </p>
      </div>
    </div>
  `;
}

export { sendEmail, orderConfirmationTemplate };
