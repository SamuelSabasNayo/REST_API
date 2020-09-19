var mongoose = require('mongoose'),
bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

var User = mongoose.model('User', userSchema);

// save user to database
User.addUser = function(user, callback) {

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            callback('Server error');
        }
        else {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    callback('Incomplete infos')
                }
                else {
                    user.password = hash;
                    user.save((err, result) => {
                        if (err) {
                            console.log(err);
                            callback('User already exist', null);
                        }
                        else {
                            callback(null, 'User added');
                        }
                    });
                }
            });
        }
    });
};

// login
User.login = function(email, password, callback) {
    User.findOne({email: email}, (err, user) => {
        if (err) {
            console.log(err);
            callback('Server error');
        } 
        else if (user == undefined) {
            callback('User not found');
        }
        else {
            bcrypt.compare(password,user.password, (err, isMatch) => {
                if (err) {
                    callback('Server error');
                }
                else if (isMatch === true) {
                    callback(null, 'login successfully');
                }
                else {
                    callback('Password incorrect');
                    // callback('Login infos incorrect');
                }
            });
        }
    });
}

module.exports = User;