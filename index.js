const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const students = require('./Students');

const app = express();


// INIT Middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Homepage Route
app.get('/',(req, res)=> res.render ('index',{
    title :'Student Record App',students
}));

//static route folder
 app.use(express.static(path.join(__dirname, 'una')));


// students api routes
app.use ('/api/students',require('./routes/api/students'))

// render HTML files
// app.get('/', (req, res)=>{
// 	res.sendFile(path.join(__dirname, 'una', 'index.html'));
// });

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => console.log(`Server started on port ${PORT}` ));


