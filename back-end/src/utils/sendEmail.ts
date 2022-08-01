import nodemailer from "nodemailer";

export async function sendEmail(email: string, code: number) {
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  });

  const html = `
  <div style="
	  background-color:#e1e1e1;
    font-size:18px;
	  display:flex;
    min-height: 250px;
	  justify-content: center;
    align-items: center;
    text-align:center;
    ">
	    <div>Your confirmation code:<div/>
      <div style="
	      background-color:#ffff;
        border-radius:5px;
        padding:2px;
        border: 1px solid #2d2d2d;
       margin: 3px;
      ">
	      <b>${code}</b>
	    </div>
	  <span>Use this code to confirm you email at login<span/>
    <p style="font-size: 16px; color:red">This code will expires in 10 minutes<p/>
  </div>
  `

  const mailOptions = {
    from: '<email@test.com>', // sender address
    to: email, // list of receivers
    subject: "Confirmation email CODE", // Subject line
    text: `Use the code: ${code} to confirm your email. This code expires in 10 minutes`, // plain text body
    html
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
