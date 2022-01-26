const express = require('express')
const app = express()

const PORT = 3000

app.listen(PORT, function () {
    console.log(`Servidor rodando na porta ${PORT}`)
})

app.get('/', (req, res) => {
    res.send("Aplicação funcionando")
})