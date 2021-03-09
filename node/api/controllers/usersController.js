const userss = require('../models/user')
const jwt = require("jsonwebtoken");
const env = require("dotenv");

const getUserLikes = async (req, res) => {
    try {
        console.log(req.body)
        let user = await User.findById(req.body.user.id)
            // .populate('posts');      
            console.log(user);
        if (user)
            res.status(200).json({ user: user })
    } catch (error) {
        res.status(500).send("cannot save user: ", error.message)
    }

}
const getImagesByIdUser = (req, res) => {
    userss.findById(req.body.user.id).populate('posts')
        .then((user) => {
            if (!user)
                res.status(404).json({ "message": 'user not found' });
            else {
                console.log(user);
                res.status(200).json(user.images);
            }
        }).catch((err) => {
            res.status(500).json({ "eror": err });
            console.log(`err ${err}`);
        })
}
  
env.config();
const login = (req, res) => {
    console.log("rrrrrrrrrrrrrrrr")
    let userdetails = req.body;
    console.log(userdetails);
    userss.findOne({ nameUser: userdetails.name, password: userdetails.password })
        .then((user) => {
            console.log(user);
            if (!user) {
                return res.status(404).json({ message: 'User not exists' });
            }
            else {
                return res.status(200).json(user);
            }
        }).catch((err) => {
            res.status(500).json({ err });
        })
}

const createUser = async (req, res) => {
    try {
        console.log(req.body);
        let user = new userss(req.body);
        let newUser = await user.save();
        //צריך לבדוק אם המשתמש כבר קיים
        // const token = jwt.sign({ userName: userName, password: password }, process.env.SECRET)
        // res.status(200).json({ user: user, token: token })
        console.log(user);
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({ "err": err.message })
    }
}
const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.query.idUser)
        .then((user) => {
            if (!user) {
                return res.status(500).send(user)
            };
            return res.status(200).send(user);
        }).catch((err) => {
            console.log(`err ${err}`);
        })
}

const getAllUsers = async (req, res) => {

    try {
        let users = await User.find()
        if (!users) {
            return res.status(404).json({})
        }
        else {
            return res.status(200).json(users)
        }
    }
    catch (error) {
        return res.status(500).json({ "err": error.message })
    }
}

const findUserById = (req, res) => {
    User.findById(req.query.id)
        .then((user) => {
            if (!user) {
                return res.status(500).send(user)
            }
            return res.status(200).send(user);
        }).catch((err) => {
            console.log(`err ${err}`);
        })
}
module.exports = { login, findUserById, updateUser, createUser, getAllUsers,getUserLikes }
