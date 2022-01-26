const express = require('express')
const app = express()
const db = require('./db/connectiondb')

const PORT = 3000

app.listen(PORT, function () {
    console.log(`Servidor rodando na porta ${PORT}`)
})

//db connection

db
  .authenticate()
  .then(() => {
      console.log("Conexão com o banco de dados efetuada")
  })
  .catch(err => {
      console.log("Opa, algo deu errado na hora de conectar ao banco de dados", err)
  })


// routes
app.get('/', (req, res) => {
    res.send("Aplicação funcionando")
})