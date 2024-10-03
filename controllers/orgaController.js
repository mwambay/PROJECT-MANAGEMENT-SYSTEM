const Orga = require('../models/Orga');
const Task = require('../models/Task');
const Project = require('../models/Project');
const Member = require('../models/Member');

let admin = null;
let orga = null;

const getWelcome = (req, res) => {
    res.render('welcome');
}

const getJoinOrga = (req, res) => {
    res.render('login_as_member');
}

const getDashboard = async (req, res) => {
    let members = [];
    let projects = [];
    if(admin == null){
        res.redirect('/orga/login');
    }
    else{
        orga = await Orga.findById(admin.id_orga);
        members = await Member.find({id_orga: admin.id_orga});
        projects = await Project.find({id_orga: admin.id_orga});
    
        res.render('index', { title: 'Dashboard', admin: admin, name_orga: orga.name, cle_orga: orga.cle, members: members, projects: projects});
    }

}

const getDashboardMember = (req, res) => {
    res.render('index_member', { title: 'Dashboard',});
}

const getLogin = (req, res) => {
    res.render('login');
}

const postLoginProcess = async (req, res) => {
    console.log(req.body);
    let id_orga = null;
    id_orga = await Orga.findOne({name: req.body.orga});
    if(id_orga == null){
        console.log('Organisation not found');
        res.redirect('/orga/login');
    }   
    else{
        Member.findOne({name: req.body.name, password: req.body.pwd, id_orga: id_orga._id})
        .then(result => {
            if(result){
                if(result.as_admin){
                    admin = result;
                    res.redirect('/orga/dashboard');
                }
                else{
                    res.redirect('/orga/dashboard_member');
                }

            } else {
                res.redirect('/orga/login');
            }
        })
        .catch(err => console.error(err));
    }
}



const postLoginAsMember = (req, res) => {
    if(req.body.pwd != req.body.pwd2){
        //console.log('Passwords do not match');
        res.redirect('/orga/join_orga');
    }

    Orga.findOne({name: req.body.orga, cle: req.body.cle})
        .then(result => {
            if(result){
                const member = new Member({
                    id_orga: result._id,
                    id_project: null,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.pwd,
                    as_admin: false
                });

                member.save()
                    .then(result => {
                        //console.log('Member saved');
                        res.redirect('/dashboard_member');
                    })
                    .catch(err => console.error(err));
            } else {
                //console.log('Organisation not found');
                res.redirect('/orga/join_orga');
            }
        }
    )
}

const getCreateOrga = (req, res) => {
    res.render('create_orga');
}

const postLoginAsAdmin = (req, res) => {
    if(req.body.pwd != req.body.pwd2){
        console.log('Passwords do not match');
        res.redirect('/orga/create_orga');
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
                    res.redirect('/orga/dashboard');
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
}

module.exports = {
    getWelcome,
    getDashboard,
    getDashboardMember,
    getLogin,
    postLoginProcess,
    getJoinOrga,
    postLoginAsMember,
    postLoginAsAdmin,
    getCreateOrga,
    admin
}