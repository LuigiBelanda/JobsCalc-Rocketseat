const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// usando template engine, neste caso o serve entende que o nosso front end estará em uma pasta chamada "views" na raiz do projeto
server.set('view engine',  'ejs')

// Mudando a localização da pasta views
// aqui fazemos algo parecido com oq foi feito no routes.js "const views = __dirname + "/views/""
// com essa mudança não precisamos mais usar a const views nos caminhos do nosso projeto
// Antes:  return res.render(views + "profile", { profile: Profile.data })
// Depois:  return res.render("profile", { profile: Profile.data })
// apenas colocamos qual ejs queremos pois ele ja sabe o caminho agora
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos statics
server.use(express.static("public"))

// usar o req.body
server.use(express.urlencoded({ extended: true }))

// routes
server.use(routes)

server.listen(3000, () => console.log('rodando'))