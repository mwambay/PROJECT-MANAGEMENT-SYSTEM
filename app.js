const express =  require('express');
const mongoose = require('mongoose');


const app = express();

const dbRI = 'mongodb://localhost:27017/depenseDB';
mongoose.connect(dbRI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(3000, () => console.log('Server is running...')))
    .catch(err => console.error('Could not connect to MongoDB...'));

    app.set('view engine', 'ejs');  
    app.use(express.static('public')); 
    app.use(express.urlencoded({ extended: true }));
    
app.get('/', (req, res) => {
    res.render('welcome');
})