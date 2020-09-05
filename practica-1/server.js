const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser');
const { users } = require('./endpoint')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:false})); //Configuarcion necesaria para body-parser
app.use(bodyParser.json()); //todo lo que llegue lo convertira a json

//Inyectamos a axios en el handler de user
const usersHandlers = users({ axios })
app.get('/', usersHandlers.get)
app.post('/', usersHandlers.post)
app.put('/:id', usersHandlers.put)
app.delete('/:id', usersHandlers.delete)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 