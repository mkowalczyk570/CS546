// Setup server, session and middleware here.
import express from 'express'
const app = express()
import session from 'express-session'
import configRoutes from './routes/index.js';
import exphbs from 'express-handlebars'


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use('/public', express.static('public'));
app.use(session({
    name:"AuthState",
    secret: "Very secret string. Only I know it",
    saveUninitialized: true,
    resave: false,
}))

app.get('/login', (req, res, next) =>{
    if(req.session.user && req.session.user.role === 'admin'){
        res.redirect('/admin')
        return
    }
    else if(req.session.user && req.session.user.role === 'user'){
        res.redirect('/protected')
        return
    }
    next() 
})

app.get('/register', (req, res, next) =>{
    if(req.session.user && req.session.user.role === 'admin'){
        res.redirect('/admin')
        return
    }
    else if(req.session.user && req.session.user.role === 'user'){
        res.redirect('/protected')
        return
    }
    next()
})

app.get('/protected', (req, res, next) =>{
    if(!(req.session.user)){
        res.redirect('/login')
        return
    }
    next()
})

app.get('/admin', (req, res, next) =>{
    if(!req.session.user){
        res.redirect('/login')
        return;
    }
    if(req.session.user.role !== 'admin'){
        res.redirect('/error')
        res.status(403)
        return;
    }
    next()
})

app.get('/logout', (req, res, next) =>{
    if(!req.session.user){
        res.redirect('/login')
        return;
    }
    next();
})

const redirectRoot = (req, res, next) =>{
    if(req.session.user){
        if(req.session.user.role === 'admin'){
            return res.redirect('/admin')
        }
        else if(req.session.user.role === 'user'){
            return res.redirect('/protected')
        } 
        else{
            return res.redirect('/login')
        }
    }
    else{
        return res.redirect('/login')
    }
}
app.all('/', redirectRoot);

const logger = (req, res, next) =>{
    if(req.session.user){
        console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (Authenticated User)`)
    }else{console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (Non-Authenticated User)`)}
    next();
}
app.use(logger)

configRoutes(app)

app.listen(3000, () =>{
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
})