const admin = require('../models/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async(req, res) => {
    try {
        let { phoneNo, email } = req.body;

        const adminExist = await admin.findOne({ $or: [{ email: email }, { phoneNo: phoneNo }] });
        if (adminExist) {
            return res.status(200).json({ message: "Admin already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const hashedCPassword = await bcrypt.hash(req.body.cpassword, 10)
            const Admin = new admin({
                adminName: req.body.adminName,
                phoneNo: req.body.phoneNo,
                email: req.body.email,
                password: hashedPassword,
                cpassword: hashedCPassword
            });
            const adminRegister = await Admin;
            if (adminRegister) {
                if (req.body.password === req.body.cpassword) {
                    let token = jwt.sign({ _id: req.body._id, userType: "ADMIN" }, 'verySecretValue', { expiresIn: '1hr' })
                    adminRegister.save()
                    return res.status(201).json({ message: "Admin registered successfully :) ", token });
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const login = async(req, res) => {
    var admin_name = req.body.admin_name
    var password = req.body.password

    await admin.findOne({ $or: [{ email: admin_name }, { phoneNo: admin_name }] })
        .then(Admin => {
            if (Admin) {
                bcrypt.compare(password, Admin.password, function(err, result) {
                    if (err) {
                        res.json({ error: err })
                    }
                    if (result) {
                        let token = jwt.sign({ _id: req.body._id, userType: "ADMIN" }, 'verySecretValue', { expiresIn: '1hr' })
                        res.json({ message: 'Login Successful! :)', token })
                    } else {
                        res.json({ error: 'Password incorrect :(' })
                    }
                })
            } else {
                res.json({ error: 'Admin not found!!' })
            }
        })
}

module.exports = { register, login }