const express =  require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const Orga = require('./models/Orga');
const Task = require('./models/Task');
const Project = require('./models/Project');
const Member = require('./models/Member');
const orgaRoutes = require('./routes/orgaRoutes');
const projectRoutes = require('./routes/projectRoutes');
const memberRoutes = require('./routes/memberRoutes');
const app = express();


let admin = null;


app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    secret: 'mon-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

const dbRI = 'mongodb://localhost:27017/project_manager';
mongoose.connect(dbRI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(3000, () => console.log('Server is running...')))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.set('view engine', 'ejs');  
app.use(express.static('public'));
 
app.use(express.urlencoded({ extended: true }));
    
//----------------------------------------------------------------
app.get('/', (req, res) => {
    res.redirect('/orga');
});

app.use('/orga', orgaRoutes);
app.use('/project', projectRoutes);
app.use('/member', memberRoutes);


app.get('/404', (res, req) => {
    console.log('error 404');
})