var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');
var sha512 = require('sha512');
var createHmac = require('create-hmac');

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0, length);
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash:value
    };
};

function saltHashPassword(userPassword){
    var salt = genRandomString(16);
    var passwordData = sha512(userPassword, salt);
    return passwordData;
}

function checkHashPassword(userPassword, salt){
    var passwordData = sha512(userPassword, salt);
    return passwordData;
}
//Create Express Service
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Connection URL
var MongoClient = mongodb.MongoClient;

var url = 'mongodb+srv://guzel:LifeLog2020@cluster0-rbmrz.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(url, {useNewUrlParser: true}, function(err, client){
    if(err)
        console.log('Unable to connect to the Database', err);
    else{
        //Register
        app.post('/register', (request, response, next)=>{
            var post_data = request.body;

            var plaint_password = post_data.password;
            var hash_data = saltHashPassword(plaint_password);

            var password = hash_data.passwordHash;
            var salt = hash_data.salt;

            var name = post_data.name;
            var email = post_data.email;

            var insertJson = {
                'email': email,
                'password': password,
                'salt': salt, 
                'name': name
            };
            var db = client.db('first-test');

            //Check exists email
            db.collection('users')
                .find({'email': email}).count(function(err, number){
                    if(number!=0){
                        response.json('Email already exists');
                        console.log('Email already exists');
                    }
                    else{
                        //Insert Data
                        db.collection('users')
                            .insertOne(insertJson, function(error, res){
                                response.json('Registration was successfull');
                                console.log('Registration was successfull');
                            })
                    }
                })
        });

        app.post('/login', (request, response, next)=>{
            var post_data = request.body;

            
            var email = post_data.email;
            var userPassword = post_data.password;

            
            var db = client.db('first-test');

            //Check exists email
            db.collection('users')
                .find({'email': email}).count(function(err, number){
                    if(number==0){
                        response.json('Email does not exist');
                        console.log('Email does not exist');
                    }
                    else{
                        //Insert Data
                        db.collection('users')
                            .findOne({'email': email}, function(err, user){
                                var salt = user.salt;
                                var hashedPassword = checkHashPassword(userPassword, salt).passwordHash;
                                var encrypted_password = user.password; // Get Password
                                if(hashedPassword==encrypted_password){
                                    response.json('Login Success');
                                    console.log('Login Success');
                                }
                                else{
                                    response.json('Wrong Password');
                                    console.log('Wrong Password');
                                }
                            })
                    }
                })
        });
        //Start WebServer
        app.listen(8081, ()=>{
            console.log('Connected to MongoDB Server, WebService is running on port 8081');
        })
    }
});