const express = require('express')
var bodyParser = require('body-parser');
const { posts } = require('./endpoint')
const { authenticate } = require('./middlewares');
const services = require('./services') //Recomendacion de arquitectura de inyecccion de dependencias
const endpoint = require('./endpoint');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:false})); //Configuarcion necesaria para body-parser
app.use(bodyParser.json()); //todo lo que llegue lo convertira a json

//Inyectamos a axios en el handler de user
const postHandlers = posts(services)
app.post('/',  authenticate, postHandlers.post)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 

module.exports = app;

//Nota: buen tip cuando se importen librerias de terceros.
/* EJ: express, azure etc .. no debemos requerirlas en los archivos de middlewares ni en los endpoint se deben inyectar, como hicimos con 
axios atraves de services para poder hacer los test mas facil 


*/