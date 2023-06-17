var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer')
const { body } = require('express-validator');
const bodyParser = require('body-parser');
const transporter = require('./conection');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about', function (req, res, next) {
  res.send('hola');
});
//QR
function datosrandom() {

  elementos = ['https://www.recetasnestle.com.mx/escuela-sabor/recetas-caseras/como-hacer-lasana',
    'recetasderechupete.com/ensalada-caprese-receta-facil-y-rapida-de-esta-ensalada-italiana/49628/',
    'https://www.bonappetit.com/recipe/simple-carbonara',
    'https://www.directoalpaladar.com/recetas-de-arroces/arroz-a-milanesa-receta-italiana-original-risotto-alla-milanese',
    'https://saboryestilo.com.mx/gourmet/ossobuco/'];
  const indiceAleatorio = Math.floor(Math.random() * this.elementos.length);
  src = ['../../assets/media/QR/lassaña.jpg', '../../assets/images/capresse.jpg',
    '../../assets/images/pasta-carbonara.webp', '../../assets/images/rissoto.jpg', '../../assets/images/ossobusco.jpg'];

  nombre = ["Lassaña", "Capresse", "Pasta Carbonara", "Rissoto", "Ossobusco"]
  return elementos[indiceAleatorio]
}
router.get('/qrcode', function (req, res) {

  datoMandado = datosrandom()
  res.json(datoMandado)
})

router.get('/qrdata', function (req, res, next) {
  const data = {
    elementos: [
      'https://www.recetasnestle.com.mx/escuela-sabor/recetas-caseras/como-hacer-lasana',
      'recetasderechupete.com/ensalada-caprese-receta-facil-y-rapida-de-esta-ensalada-italiana/49628/',
      'https://www.bonappetit.com/recipe/simple-carbonara',
      'https://www.directoalpaladar.com/recetas-de-arroces/arroz-a-milanesa-receta-italiana-original-risotto-alla-milanese',
      'https://saboryestilo.com.mx/gourmet/ossobuco/'
    ],
    src: [
      '../../assets/images/lassaña.jpg',
      '../../assets/images/capresse.jpg',
      '../../assets/images/pasta-carbonara.webp',
      '../../assets/images/rissoto.jpg',
      '../../assets/images/ossobusco.jpg'
    ],
    nombre: [
      "Lassaña",
      "Capresse",
      "Pasta Carbonara",
      "Rissoto",
      "Ossobusco"
    ]
  };

  const indiceAleatorio = Math.floor(Math.random() * data.elementos.length)

  const dataResponsive = {
    elemento: [data.elementos[indiceAleatorio]],
    src: [data.src[indiceAleatorio]],
    nombre: [data.nombre[indiceAleatorio]]
  };


  res.json(dataResponsive);
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

  }, (error, info) => {
    console.log("New User 👩‍💻👨‍💻👻");
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
