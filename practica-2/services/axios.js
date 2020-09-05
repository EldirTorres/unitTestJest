const axios = require('axios')

//Con esto podriamos definir a que ambiente queremos que apunte 
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

module.exports = instance;
//module.exports = axios;