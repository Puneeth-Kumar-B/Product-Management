const user = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async(req, res) => {
    try {
        let { phone_no, email } = req.body;

        const userExist = await user.findOne({ $or: [{ email: email }, { phone_no: phone_no }] });
        if (userExist) {
            return res.status(200).json({ message: "User already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const hashedCPassword = await bcrypt.hash(req.body.cpassword, 10)
            const User = new user({
                user_name: req.body.user_name,
                phone_no: req.body.phone_no,
                email: req.body.email,
                password: hashedPassword,
                cpassword: hashedCPassword
            });
            const userRegister = await User;
            if (userRegister) {
                if (req.body.password === req.body.cpassword) {
                    let token = jwt.sign({ _id: req.body._id, userType: "USER" }, 'verySecretValue', { expiresIn: '1hr' })
                    userRegister.save()
                    return res.status(201).json({ message: "User registered successfully :) ", token });
                } else {
                    return res.status(422).json({ error: "Passwords didnot match" });
                }
            }
        }

    } catch (err) {
        console.log("Please fill your details");

    }

}

const login = async(req, res) => {
    var username = req.body.username
    var password = req.body.password

    await user.findOne({ $or: [{ email: username }, { phone_no: username }] })
        .then(User => {
            if (User) {
                bcrypt.compare(password, User.password, function(err, result) {
                    if (err) {
                        res.json({ error: err })
                    }
                    if (result) {
                        let token = jwt.sign({ _id: req.body._id, userType: "USER" }, 'verySecretValue', { expiresIn: '1hr' })
                        res.json({ message: 'Login Successful! :)', token })
                    } else {
                        res.json({ error: 'Password incorrect :(' })
                    }
                })
            } else {
                res.json({ error: 'User not found!!' })
            }
        })
}

module.exports = {
    register,
    login
}

/*let id = req.params._id
    let offerName = req.body.offerName
    let couponCode = req.body.couponCode
    let discount = req.body.discount
    let amount = req.body.amount

    await coupon.findByIdAndUpdate({ _id: id }, { $set: { offerName, couponCode, discount, amount } }, { new: true })
        .then(Coupon => {
            if (Coupon) {
                (err, result) => {
                    if (err) {
                        res.json({ error: 'Error2 Occured' })
                    }
                    if (result) {
                        if (result == null) {
                            res.json({ message: 'Details not found!' })
                        } else {
                            res.send(result)
                            res.json({ message: 'Details updated' })
                        }
                    }

                }
            } else {
                res.json({ error: 'Error1 Occured' })
            }
        })*/