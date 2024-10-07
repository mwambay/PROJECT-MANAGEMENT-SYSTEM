const express = require('express');
const Orga = require('../models/Orga');
const Project = require('../models/Project');
const Member = require('../models/Member');
const { setAdmin, getAdmin } = require('../adminState');
let admin = getAdmin();

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
        
        res.render('index_member', { title: 'Dashboard', admin: admin, name_orga: orga.name, cle_orga: orga.cle, members: members, projects: projects});
    }    
}



module.exports = {
    getDashboard
}