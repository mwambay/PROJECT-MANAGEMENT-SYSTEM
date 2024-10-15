const Orga = require('../models/Orga');
const Project = require('../models/Project');
const Member = require('../models/Member');
const crypto = require('crypto');
const { setAdmin, getAdmin } = require('../adminState');


let admin = getAdmin();
let orga = null;

const getWelcome = (req, res) => {
    res.render('welcome');
}

const getJoinOrga = (req, res) => {
    res.render('login_as_member');
}

const getDashboard = async (req, res) => {
    const userInfo = req.session.user;
    //console.log("session", var__);

    let members = [];
    let projects = [];
    if(userInfo == null){
        res.redirect('/orga/login?error=session_expire');
    }
    else{
        orga = await Orga.findById(userInfo.id_orga);
        members = await Member.find({id_orga: userInfo.id_orga});
        projects = await Project.find({id_orga: userInfo.id_orga});
    
        res.render('index', { title: 'Dashboard', admin: userInfo, name_orga: orga.name, cle_orga: orga.cle, members: members, projects: projects});
    }

}

const getDashboardMember = async (req, res) => {
    console.log("dashbord member");
    //admin = getAdmin()
    const userInfo = req.session.user;

    let members = [];
    let projects = [];
    if(userInfo == null){
        console.log('return');
        res.redirect('/orga/login');
    }
    else{
        orga = await Orga.findById(userInfo.id_orga);
        members = await Member.find({id_orga: userInfo.id_orga});
        projects = await Project.find({id_orga: userInfo.id_orga});
        
        res.render('index_member', { title: 'Dashboard', admin: userInfo, name_orga: orga.name, cle_orga: orga.cle, members: members, projects: projects});
    }   
}

const getLogin = (req, res) => {
    const error = req.query.error;
    res.render('login', {error});
}

const postLoginProcess = async (req, res) => {
    console.log('kk',req.body);
    let id_orga = null;
    id_orga = await Orga.findOne({name: req.body.orga});
    if(id_orga == null){
        console.log('Organisation not found');
        res.redirect('/orga/login?error=orga_not_found');
    }   
    else{
        Member.findOne({name: req.body.name, password: req.body.pwd, id_orga: id_orga._id})
        .then(result => {
            if(result){
                if(result.as_admin){
                    req.session.user = result;
                    //setAdmin(result);
                    //admin = getAdmin();
                    res.redirect('/orga/dashboard');
                }
                else{
                    req.session.user = result;
                    //setAdmin(result);
                    res.redirect('/orga/dashboard_member');
                }

            } else {
                res.redirect('/orga/login?error=incorrect_pwd');
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
                    id_project: [],
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.pwd,
                    as_admin: false
                });

                member.save()
                    .then(result => {
                        //console.log('Member saved');
                        res.redirect('/orga/dashboard_member');
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
        id_project: [],
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