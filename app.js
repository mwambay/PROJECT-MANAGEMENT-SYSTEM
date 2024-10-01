const express =  require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');

const Orga = require('./models/Orga');
const Task = require('./models/Task');
const Project = require('./models/Project');
const Member = require('./models/Member');

const app = express();

let admin = null;


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

app.get('/dashboard', async (req, res) => {  
    let members = [];
    let projects = [];  
    orga = await Orga.findById(admin.id_orga);
    members = await Member.find({id_orga: admin.id_orga});
    projects = await Project.find({id_orga: admin.id_orga});

    res.render('index', { title: 'Dashboard', admin: admin, name_orga: orga.name, cle_orga: orga.cle, members: members, projects: projects});
});

app.get('/dashboard_member', (req, res) => {
    res.render('index_member', { title: 'Dashboard',});
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login_process', async (req, res) => {
    console.log(req.body);
    let id_orga = null;
    id_orga = await Orga.findOne({name: req.body.orga});
    if(id_orga == null){
        console.log('Organisation not found');
        res.redirect('/login');
    }   
    else{
        Member.findOne({name: req.body.name, password: req.body.pwd, id_orga: id_orga._id})
        .then(result => {
            if(result){
                if(result.as_admin){
                    admin = result;
                    res.redirect('/dashboard');
                }
                else{
                    res.redirect('/dashboard_member');
                }

            } else {
                res.redirect('/login');
            }
        })
        .catch(err => console.error(err));
    }


});
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
        id_project: null,
        name: req.body.name,
        email: req.body.email,
        password: req.body.pwd,
        as_admin: true

    });

    orga.save()
        .then(result => {
            creator.save()
                .then(result => {
                    //console.log('Organisation and creator saved');
                    res.redirect('/dashboard');
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

