const nodemailer = require('nodemailer');

module.exports = {
  create(req, res) {
    return res.render('pages/test');
  },

  async store(req, res) {
    const { email } = req.body;
    console.log(process.env.NODEMAILMER_USER, process.env.NODEMAILMER_PASS);

    const transporter = nodemailer.createTransport({
      service: 'Outlook365',
      auth: {
        user: process.env.NODEMAILMER_USER,
        pass: process.env.NODEMAILMER_PASS,
      },
    });
    console.log('AMIL', email);
    const msg = {
      from: email,
      to: 'wedneri15@hotmail.com',
      subject: 'Hello, world',
      text: `Long time no see ${email}`,
      html: `<p>Email enviado com nodemailer </p>${email}`,
    };

    transporter.sendMail(msg, (err, result) => {
      if (err) return res.send(err);
      return res.send(`Mensagem enviada!!!! ${result}`);
    });
  },

};
