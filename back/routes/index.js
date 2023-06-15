var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer')
const { body } = require('express-validator');
const bodyParser = require('body-parser');
const transporter  = require('./conection');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about', function(req, res, next){
  res.send('hola');
});


//correos
router.post('/mail', [
  body('user').not().isEmpty().isString(),
  body('subject').not().isEmpty().isString(),
  body('text').not().isEmpty().isString()
], (req, res) => {
  console.log("estoy enviando un correo :O0");
  let dato = req.body
  console.log(req.body.user)
  transporter.sendMail({
      from: '"Vittoria mails 👩‍💻👨‍💻👻" <peachycoold@gmail.com>', // sender address
      to: dato.user, // list of receivers *----------------------aqui se colocaria el objeto recuperado que nos envia el formlario
      subject: dato.subject,// "Hello ✔", // Subject line
      text: dato.text, //"Hello world? esto funciona?", // plain text body
      html: dato.text, // html body
      
  } , (error, info) => {console.log("New User 👩‍💻👨‍💻👻");
      if (error) {
          console.log(error);
          res.status(500).send('Error al enviar el correo electrónico');
      } else {
          console.log('Correo enviado: ' + info.response);
          res.status(200).send('Correo enviado correctamente');
      }
  });

});

module.exports = router;
