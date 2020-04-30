const nodemailer = require("nodemailer");


export async function activeAccount(email, username, active_link){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'ashley.lepan@gmail.com',
           pass: 'Ashley0930'
       }
  });
  
    const message = `
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p>Hi ${username},</p>
        <br>
        <p>Thank you for your registration on Matcha.</p>
        <p>Please click the link below to active your account: </p>
        <a href="http:localhost:3000/register/${active_link}">Click Me</a>
      </body>
    </html>
    `;

    await transporter.sendMail({
        from: "noreply@matcha.42.fr",
        to: email,
        subject: "Welcome to Matcha",
        html: message,
        contentType: "text/html"
    },(err) => {
        if(err)
            console.log(err)
    }
    );
}

export async function resetpwd(email, username, resetpwd_link){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'ashley.lepan@gmail.com',
           pass: 'Ashley0930'
       }
  });
  
  const message = `
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <p>Hi ${username},</p>
      <br>
      <p>We received your request of reseting your passward on Matcha.</p>
      <p>Please click the link below: </p>
      <a href="http:localhost:3000/resetpwd/${resetpwd_link}">Click Me</a>
    </body>
  </html>
  `;

  await transporter.sendMail({
      from: "noreply@matcha.42.fr",
      to: email,
      subject: "Reset your password on Matcha",
      html: message,
      contentType: "text/html"
  },(err) => {
      if(err)
          console.log(err)
  }
  );
}