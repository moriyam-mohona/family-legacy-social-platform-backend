export const contactEmailTemplate = (
  name: string,
  email: string,
  phone: string,
  message: string
) => {
  return `
    <div style="font-family: Arial; line-height: 1.6;">
      <h2>📩 New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr/>
      <p>This message was sent from your website contact form.</p>
    </div>
  `;
};