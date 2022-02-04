const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connectiondb');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 8000;

app.listen(PORT, function() {
  console.log(`Aplicação rodando na porta${PORT}`)
})

// body parser
app.use(bodyParser.urlencoded({ extended: false }))

// handle bars
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// db connection
db
  .authenticate()
  .then(() => {
    console.log("Conexão com banco de dados efetuada com sucesso");
  })
  .catch(err => {
    console.log("Opa, ocorreu um erro na hora de conectar ao banco de dados", err);
  })

// routes
app.get('/', (req, res) => {

  let search = req.query.job
  let query  = '%'+search+'%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress

  if(!search) {
    Job.findAll({order: [
      ['createdAt', 'DESC']
    ]})
    .then(jobs => {
  
      res.render('index', {
        jobs
      });
    })
    .catch(err => console.log(err))
  } else {
    Job.findAll({
      where: {title: {[Op.like]: query}},
      order: [
        ['createdAt', 'DESC']
    ]})
    .then(jobs => {
      res.render('index', {
        jobs, search
      })
  
    })
    .catch(err => console.log(err))
  }
})

// jobs routes
app.use('/jobs', require('./routes/jobs'))