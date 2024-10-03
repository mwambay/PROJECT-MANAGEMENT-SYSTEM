const Orga = require('../models/Orga');
const Task = require('../models/Task');
const Project = require('../models/Project');
const Member = require('../models/Member');
const {admin} = require('../controllers/orgaController');

let detailsProject = null;

const addProject = (req, res) => {

    console.log(req.body);
    const project = new Project({
        id_orga: admin.id_orga,
        name: req.body.name,
        description: req.body.description,
        date_start: req.body.date_debut,
        deadline: req.body.date_fin
    });

    project.save()
        .then(result => {
            //console.log('Project saved');
            const members = req.body.members;
            console.log(members,   members.length);
            if(members.length > 1){
                console.log('Multiple members');
                members.forEach(async member => {
                    console.log(member);
                    resp = await Member.findByIdAndUpdate(
                        member,
                        { id_project: project._id },
                        { new: true }
                    )
                })
                res.redirect('/dashboard');
            }
            
            else{
                console.log('Single member');
                Member.findByIdAndUpdate(
                    members,
                    { id_project: project._id },
                    { new: true } )
                    .then(result => {
                        console.log(result);
                        res.redirect('/dashboard');
                    })
                    .catch(err => console.error(err));

            }
            
            })
        .catch(err => console.error(err));

}


const detailsProjectSecand = async (req, res)=> {
    if(detailsProject != null){
        let members_ = [];
        let tasks = [];

        tasks = await Task.find({id_project: detailsProject._id});
        members_ = await Member.find({id_project: detailsProject._id});
        res.render('project', {project: detailsProject, members: members_, tasks: tasks});

    }
    else{
        res.redirect('/404')
    }
}

const detailsProjectFirst = (req, res) => {    
    const id = req.params.id;
    Project.findOne({_id: id})
        .then(result =>{
            detailsProject  = result;
            res.redirect('/project/details');
        })
        .catch(err => 
            res.redirect('/404')
        )
}


const addTask = (req, res) =>{
    console.log(req.body);
    let memb = req.body.members;
    if(typeof memb != 'object'){
        memb = [memb];
    }
    const task = new Task({
        id_project: detailsProject._id,
        name: req.body.name,
        priority: req.body.priority,
        deadline: req.body.deadline,
        assignedTo: memb
     })

     task.save()
        .then(result=>{
            res.redirect('/project/details/' + detailsProject._id);
        })

        .catch(err => res.redirect('/404'));
}

module.exports = {
    addTask,
    detailsProjectFirst,
    detailsProjectSecand,
    addProject
}