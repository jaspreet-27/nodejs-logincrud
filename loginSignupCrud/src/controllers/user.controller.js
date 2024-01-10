
// const userService = require('../services/user.services');
// const { createUserSchema, loginUserSchema } = require("../validations/user.validate");
// const jwt = require('jsonwebtoken');

// // const createUser = async (req, res) => {
// //     const { error } = createUserSchema.validate(req.body);
// //     if (error) {
// //         return res.status(400).json({ error: error.details.map((err) => err.message) });
// //     }

// //     const { email, userName, password } = req.body;

// //     try {
// //         // const userExists = await userService.getUserByEmailOrUserName(email, userName);
// //         const userExists = await userService.getUserByEmail(email);
// //         if (userExists) {
// //             return res.status(400).json({ error: 'User with the provided email or username already exists' });
// //         }
        
        
// //         const newUser = await userService.createUser({ email, userName, password: encryptPassword });
// //         res.status(201).json({ message: 'User created successfully', user: newUser });
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // const loginUser = async (req, res) => {
// //     const { error } = loginUserSchema.validate(req.body);
// //     if (error) {
// //         return res.status(400).json({ error: error.details.map((err) => err.message) });
// //     }

// //     const { email, password } = req.body;

// //     try {
// //         const user = await userService.getUserByEmail(email);
// //         if (!user) {
// //             return res.status(401).json({ error: 'Invalid credentials' });
// //         }

// //         console.log(user.password);

// //         const isPasswordValid = await userService.validatePassword(password, user.password);
        
// //         if (!isPasswordValid) {
// //             return res.status(401).json({ error: 'Invalid credentials' });
// //         }

// //         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// //         res.status(200).json({ message: 'Login successful', token });
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };



// const createUser = async (req, res) => {
//     const { error } = createUserSchema.validate(req.body);
//     console.log(req.body)
//     if (error) {
//         return res.status(400).json({ error: error.details.map((err) => err.message) });
//     }
//     console.log(req.body)
//     const { email, userName, password } = req.body
//     console.log(req.body)
//     try {
//         let checkUser = await UserModel.findOne({ "$or": [{ email: email }, { userName: userName }] })
//         if (!checkUser) {
//             const salt = await bcrypt.genSalt(10)
//             const passwordHash = await bcrypt.hash(password, salt)

//             const user = await UserModel.create({
//                 ...req.body,
//                 password: passwordHash
//             })
//             res.send({
//                 data: user,
//                 message: "User created  succesfully...",
//                 status: 201
//             })
//         }
//         else {
//             res.status(403).json({ status: false, error: "user already exist" })
//         }
//     } catch (error) {
//     }
// }
// const loginUser = async (req, res) => {
//     console.log("im login")
//     const { error } = loginUserSchema.validate(req.body);

//     if (error) {
//         return res.status(400).json({ error: error.details.map((err) => err.message) });
//     }
//     const { email, password } = req.body
//     try {
//         const user = await UserModel.findOne({ email: email })
//         if (user) {
//             let isPasswordValid = await bcrypt.compare(password, user.password)
//             if (!!isPasswordValid) {
//                 const token = jwt.sign({ user_id: user?._id, email }, process.env.TOKEN_KEY);
//                 res.send({
//                     data: { user, token },
//                     status: true
//                 })
//             }
//         } else {
//             res.status(403).json({ status: false, error: "password/email not correct" })
//         }
//     } catch (error) {
//         res.status(403).json({ status: false, error: "password/email not correct" })
//     }
// }





// const updateUser = async (req, res) => {
//     const userId = req.params.id;
//     const updatedData = req.body;

//     try {
//         const updatedUser = await userService.updateUserById(userId, updatedData);
//         res.status(201).json({ message: 'User updated successfully', user: updatedUser });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// const deleteUser = async (req, res) => {
//     const userId = req.params.id;
  
//     try {
//       await userService.softDeleteUser(userId);
//       res.status(200).json({ message: 'User soft deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

// module.exports = {
//     createUser,
//     loginUser,
//     updateUser,
//     deleteUser,
    
// };


const UserModel = require('../models/user.schema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const rootRouter = require('../routes/users.routes');
const { createUserSchema, loginUserSchema } = require("../validations/user.validate");

const createUser = async (req, res) => {
    const { error } = createUserSchema.validate(req.body);
    console.log(req.body)
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    console.log(req.body)
    const { email, userName, password,role } = req.body
    console.log(req.body)
    try {
        let checkUser = await UserModel.findOne({ "$or": [{ email: email }, { userName: userName } ,{role: role}] })
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
        // next(error);
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    console.log(req.user_id, "user_id")
    console.log(req.email, "email")
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
 const deleteUser = async (req,res)=>{
    
 }

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
}