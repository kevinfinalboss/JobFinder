const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const db = require('./db/connectiondb')
const bodyParser = require('body-parser')
const Job = require('./models/Job')
 
const PORT = 3000

app.listen(PORT, function () {
    console.log(`Servidor rodando na porta ${PORT}`)
})

// body parser

app.use(bodyParser.urlencoded({extended: false}))

//handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// static folder 
app.use(express.static(path.join(__dirname, 'public')))

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
    Job.findAll({order: [
        ['createdAt', 'DESC']
    ]})
    .then(jobs => {
        res.render('index', {
            jobs
        })
    })
})

// jobs routes

app.use('/jobs', require('./routes/jobs'))