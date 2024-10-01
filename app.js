const express =  require('express');
const mongoose = require('mongoose');
const Schemas = require('./models/schemas');
const crypto = require('crypto');

const Orga = Schemas.Orga;
const Task = Schemas.Task;
const Project = Schemas.Project;
const Member = Schemas.Member;

const app = express();

const dbRI = 'mongodb://localhost:27017/project_manager';
mongoose.connect(dbRI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(3000, () => console.log('Server is running...')))
    .catch(err => console.error('Could not connect to MongoDB...'));

    app.set('view engine', 'ejs');  
    app.use(express.static('public')); 
    app.use(express.urlencoded({ extended: true }));
    
app.get('/', (req, res) => {
    res.render('welcome');
})

app.post('/login_admin', (req, res) => {
    console.log(req.body);
    if(req.body.pwd != req.body.pwd2){
        console.log('Passwords do not match');
        res.redirect('/create_orga');
    }
    const randomKey = crypto.randomBytes(16).toString('hex'); // Génère une clé aléatoire de 16 octets

    const orga = new Orga({
        name: req.body.orga,
        description: req.body.description,
        cle: randomKey
    });

    const creator = new Member({
        id_orga: orga._id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.pwd,
        as_admin: true

    });

    orga.save()
        .then(result => {
            creator.save()
                .then(result => {
                    console.log('Organisation and creator saved');
                    //res.redirect('/dashboard');
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
});

app.get('/create_orga', (req, res) => {
    res.render('create_orga');
});

app.get('/join_orga', (req, res) => {
    res.render('login_as_member');
});

app.get('/login', (req, res) => {
    res.render('login');
} );

