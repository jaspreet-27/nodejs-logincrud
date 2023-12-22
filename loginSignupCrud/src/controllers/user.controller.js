
const UserModel = require('../models/user.schema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rootRouter = require('../routes');
const { createUserSchema, loginUserSchema } = require("../validations/user.validate");

const createUser = async (req, res) => {
    const { error } = createUserSchema.validate(req.body);
    console.log(req.body)
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    console.log(req.body)
    const { email, userName, password } = req.body
    console.log(req.body)
    try {
        let checkUser = await UserModel.findOne({ "$or": [{ email: email }, { userName: userName }] })
        if (!checkUser) {
            const salt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(password, salt)

            const user = await UserModel.create({
                ...req.body,
                password: passwordHash
            })
            res.send({
                data: user,
                message: "User created  succesfully...",
                status: 200
            })
        }
        else {
            res.status(403).json({ status: false, error: "user already exist" })
        }
    } catch (error) {
    }
}


const loginUser = async (req, res) => {
    console.log("im login")
    const { error } = loginUserSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            let isPasswordValid = await bcrypt.compare(password, user.password)
            if (!!isPasswordValid) {
                const token = jwt.sign({ user_id: user?._id, email }, process.env.TOKEN_KEY);
                res.send({
                    data: { user, token },
                    status: true
                })
            } else {

                let responseObj = { status: 403, json: { status: false, error: "password/email not correct" } }
                res.responseObj = responseObj
                next(res)
            }
        } else {
            res.status(403).json({ status: false, error: "password/email not correct" })
        }
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    console.log(req.params.id)
    const updatedData = req.body;
    console.log(req.body)  

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user properties
        Object.assign(user, updatedData);

        // Save the updated user
        await user.save();

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changePassword = async (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        const newPasswordHash = await bcrypt.hash(newPassword, salt);
        user.password = newPasswordHash;
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    changePassword,
}