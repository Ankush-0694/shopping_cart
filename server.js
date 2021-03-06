const express = require('express')
const app = express()
const hbs = require('express-hbs')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const mongoose = require('mongoose')
require('./passport')


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(session({
    secret: 'hashashashashashashashashashashash',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
    res.locals.error = req.flash("error")
    next()
})

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('connected')
}).catch((err) => {
    console.log(err)
})


app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',
    defaultLayout: __dirname + '/views/layouts/main'
}))

app.set('view engine', 'hbs')
app.use(express.static(__dirname + "/public"))




app.use('/login', require('./routes/login').route)
app.use('/signup', require('./routes/signup').route)
app.use('/', require('./routes/home').route)
app.use('/wishlist', require('./routes/wishlist').route)
app.use('/profile', require('./routes/profile').route)
app.use('/editProfile', require('./routes/editProfile').route)
app.use('/createProfile', require('./routes/createProfile').route)





app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});



app.listen(5000, () => {
    console.log('started')
})