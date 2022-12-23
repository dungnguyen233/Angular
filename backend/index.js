var express = require ('express');
var mongoose = require ('mongoose');
var bodyparser = require ('body-parser');
var User = require('./models/user')
var cors = require ("cors");
const user = require('./models/user');

var app = express();

var db = mongoose.connect('mongodb://localhost:27017/AutAngular', function(err, response){
    if (err) console.log("There is error to connect with mongoDB");
    console.log("Connect succesfully");
});

app.use(cors());

app.set('port', process.env.port || 3000);
app.use(bodyparser.json());
app.get('/', (req, res) =>{
    // res.send("hello");
})

app.post('/register', (req, res) =>{
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    
    var user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = role;

    user.save((err,result) =>{
        if (err){
            console.log("error to add user in database");
            res.send({success : "Failed to add user", status: 500});
        }
        res.send({success : "Successfully to add user", status: 200});
    })     
    

})

app.get('/fetch', (req, res) =>{
    user.find((err,val) => {
        if (err){console.log("error get user")};
        console.log("successfully get user");
        res.json(val)
    })
})
app.get('/fetch/detail', (req, res) =>{
    user.find((err,val) => {
        if (err){console.log("error get account")};
        console.log("successfully get account");
        res.json(val)
    })
})

app.listen(app.get('port'), function(err, response){
    console.log("Serve is running on port", app.get('port'));
});