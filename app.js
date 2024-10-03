const express =  require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');

const Orga = require('./models/Orga');
const Task = require('./models/Task');
const Project = require('./models/Project');
const Member = require('./models/Member');
const orgaRoutes = require('./routes/orgaRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

let admin = null;


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

app.get('/404', (res, req) => {
    console.log('error 404');
})