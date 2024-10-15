const Task = require('../models/Task');
const Project = require('../models/Project');
const Member = require('../models/Member');
const { setAdmin, getAdmin } = require('../adminState');

let detailsProject = null;

const addProject = (req, res) => {
    const serInfo = req.session.user;

    //console.log('Add project', admin);
    //console.log(req.body);
    const project = new Project({
        id_orga: serInfo.id_orga,
        name: req.body.name,
        description: req.body.description,
        date_start: req.body.date_debut,
        deadline: req.body.date_fin
    });

    project.save()
        .then(async result => {
            console.log('Project saved', req.body.members, 'oo');

            let members = req.body.members;
            if(typeof members != 'object'){
                members = [members];
            }
            console.log(members,   members.length);
            if(members.length > 1){
                console.log('Multiple members');
                members.forEach(async member => {
                    //console.log(member);
                    result__ = await Member.findById(member);
                    let array_ = result.id_project
                    array_.push(project._id);
                    //result_.id_project = result.id_project.
                    resp = await Member.findByIdAndUpdate(
                        member,
                        { $push: {'members.id_project': array_}},
                        { new: true }
                    )
                })
                res.redirect('/orga/dashboard');
            }
            
            else{
                result__ = await Member.findById(members);
                let array_ = result__.id_project
                array_.push(project._id);
                console.log('Single member');
                Member.findByIdAndUpdate(
                    members,
                    { id_project: array_ },
                    { new: true } )
                    .then(result => {
                        console.log(result);
                        res.redirect('/orga/dashboard');
                    })
                    .catch(err => console.error(err));
            }
            
            })
        .catch(err => console.error(err));

}


const addMembers = async (req, res) =>{
    const id = req.params.id;
    let members = req.body.members;
    if(typeof members != 'object'){
        members = [members];
    }
    let result__;
    if(members.length > 1){
        console.log('Multiple members');
        members.forEach(async member => {
            console.log(member);
            result__ = await Member.findById(member);
            let array_ = result__.id_project
            console.log(array_)
            array_.push(id);
            //result_.id_project = result.id_project.
            resp = await Member.findByIdAndUpdate(
                member,
                { id_project: array_ },
                { new: true }
            )

            console.log(resp);
        })
        res.redirect('/project/details/' + id);
    }
    
    else{
        result__ = await Member.findById(members);
        let array_ = result__.id_project
        array_.push(id);
        console.log('Single member');
        Member.findByIdAndUpdate(
            members,
            { id_project: array_ },
            { new: true } )
            .then(result => {
                console.log(result);
                res.redirect('/project/details/' + id);
            })
            .catch(err => console.error(err));
    }
     
}

const detailsProjectSecand = async (req, res)=> {
    if(detailsProject != null){
        let members_ = [];
        let tasks = [];

        tasks = await Task.find({id_project: detailsProject._id});
        const allMembers = await Member.find();
        let user = req.session.user
        if(user == null){
            res.redirect('/orga/login');
        }

        else{
            if(user.as_admin){
                res.render('project', {project: detailsProject,  tasks: tasks, allMembers: allMembers});
            }
            else{
                res.render('project_member', {project: detailsProject, members: members_, tasks: tasks, user: user});
            }
        }

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

const deleteTask = (req, res) =>{
    const id = req.params.id;
    Task.findByIdAndDelete(id)
      .then(result => {
        res.redirect('/project/details');
      })
      .catch(err => {
        res.render('404');
      })
}



const deleteMemberFromProject = async (req, res) => {
    const ids = req.params.id.split('-');
    const idMember = ids[0];
    const idProject = ids[1];
    //console.log(idMember, idProject);
    let result__ = await Member.findById(idMember);
    let array_ = result__.id_project
    array_.pop(idProject);
    await Member.findByIdAndUpdate(
        idMember,
        { id_project: array_ },
        { new: true }
    ).then(result => {
        res.redirect('/project/details');
      })
      .catch(err => {
        res.render('404');
      })



}

const updateProject = async (req, res) =>{
    const id = req.params.id;
    const result = await Project.findById(id);
    if(!result){
        return res.status(404).send("Document non trouvé");
    }

    result.name = req.body.name
    result.date_start = req.body.date_debut
    result.deadline = req.body.date_fin
    result.description = req.body.description

    Project.findByIdAndUpdate(id, result, {new: true})
        .then(result =>{
            res.redirect('/orga/dashboard');

        })
        .catch(err =>{
            console.log(err);
        })

}

const finishedTask = async (req, res) =>{
    const id = req.params.id;
    const result = await Task.findById(id);
    if (!result) {
        return res.status(404).send("Document non trouvé");
    }

    // if(result.state == 'En cours'){ result.state = 'En pause'}
    // else{result.state = 'En cours'}
    result.state = 'terminée'

    //result = await Info.findById(result.id_info.toString());

    //console.log(result.id_info);
    Task.findByIdAndUpdate(id, result, { new: true })
        .then(result => {
            res.redirect('/project/details');
        })
        .catch(err => {
            console.log(err);
        })


}

const reportTask = async (req, res) => {
    const id = req.params.id;
    const result = await Task.findById(id);
    if (!result) {
        return res.status(404).send("Document non trouvé");
    }

    if(result.state == 'En cours'){ result.state = 'En pause'}
    else{result.state = 'En cours'}

    //result = await Info.findById(result.id_info.toString());

    //console.log(result.id_info);
    Task.findByIdAndUpdate(id, result, { new: true })
        .then(result => {
            res.redirect('/project/details');
        })
        .catch(err => {
            console.log(err);
        })

} 

const deleteProject = (req, res) => {
    const id = req.params.id;
    Project.findByIdAndDelete(id)
      .then(result => {
        res.redirect('/orga/dashboard');
      })
      .catch(err => {
        res.render('404');
      })  
}
module.exports = {
    addTask,
    detailsProjectFirst,
    detailsProjectSecand,
    addProject,
    deleteTask,
    reportTask,
    deleteProject,
    finishedTask,
    updateProject,
    addMembers,
    deleteMemberFromProject
}