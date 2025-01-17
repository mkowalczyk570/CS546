//Here is where you'll set up your server as shown in lecture code
import express from 'express'
const app = express();
import configRoutes from './routes/index.js'
import {fileURLToPath} from 'url'
import {dirname} from 'path'
import exphbs from 'express-handlebars'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const staticDir = express.static(__dirname + '/public')
const rewriteUnsupportedMethods = (req, res, next) => {
    if (req.body && req.body._method){
        req.method = req.body._method;
        delete req.body._method
    }
    next();
}

app.use('/public', staticDir)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(rewriteUnsupportedMethods)

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


configRoutes(app)

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
  });