// Code server here
// Your server this week should not do any of the processing or calculations
// Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the application
import express from 'express'
import configRoutes from './routes/index.js'
import exphbs from 'express-handlebars'

const app = express()
app.use('/public', express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

configRoutes(app)

app.listen(3000, () =>{
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
})
