const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    user_name: {
        type: String
    },
    phone_no: {
        type: Number
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
    cpassword: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const user = mongoose.model('user', userSchema)
module.exports = user

// const searchCoupon = async(req, res) => {
//     const offerName = req.params.offerName
//     const couponCode = req.params.couponCode
//     await coupon.find(({
//         $or: [{ offerName: { $regex: `${offerName}`, $options: "i" } },
//             { couponCode: { $regex: `${couponCode}`, $options: "i" } }
//         ]
//     }), (err, data) => {
//         if (!data) {
//             return res.status(404).json({ error: "No results found" })
//         } else {
//             return res.status(200).json(data);
//         }
//     }).clone()
// }



//createCoupon part

//console.log("else")
// process.exit(1)

// const coupondata = await Coupon.save();
// console.log(coupondata);
// return res.json({ status: "success", data: coupondata })
// if (coupondata.status === true) {
//     res.status(200).jon({ message: "active" })
// } else if (coupondata.status === false) {
//     res.status(200).jon({ message: "inactive" })
// }