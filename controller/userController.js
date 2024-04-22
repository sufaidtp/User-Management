const bcrypt = require("bcrypt")
const userData = require("../models/userdeatils")

const product = require('../card/card')



const isUser = (req, res, next) => {
    try {
        if (req.session.isUser) {
            next()
        } else {
            res.render('login')
        }
    } catch (e) {
        console.log('problem with isUser')
    }
}

const displayLogin = async (req, res) => {
    try {
        if (req.session.isUser) {
            res.redirect('/home')
        } else {
            res.render("login")
        }
    } catch (e) {
        console.log("problem with displaylogin" + e)

    }
}



const displayHome = async (req, res) => {
    try {
        const data = await userData.findOne({ email: req.session.email })
        const userName = data.name
        res.render("home", { product, userName })
    } catch (e) {
        console.log("problem with displayHome" + e)

    }


}
const dispalySignup = async (req, res) => {
    try {
        res.render("signup")

    } catch (e) {
        console.log("problem with displaysignup" + e)

    }
}

const userRegister = async (req, res) => {

    try {

        console.log(req.body)
        const user = await userData.findOne({ email: req.body.email })

        if (user) {
            res.redirect("/signup")
        } else {

            const hashedpass = await bcrypt.hash(req.body.password, 10)

            const userDetails = await userData.create({ name: req.body.username, email: req.body.email, password: hashedpass, isAdmin: 0 })
            console.log(userDetails)
            res.redirect("/")
        }

    } catch (e) {
        console.log("problem withe the userRegister" + e)
    }
}

const userLogin = async (req, res) => {
    try {
        console.log(req.body)
        const userloginDetails = await userData.findOne({ name: req.body.username })
        if (userloginDetails) {
            console.log(req.body.username);
            const data = await bcrypt.compare(req.body.password, userloginDetails.password)
            console.log(data)
            if (data) {
                req.session.isUser = true
                req.session.email = userloginDetails.email
                res.redirect("/home")
            } else {
                res.render("login", { notuser: "Invalid username or password" })


            }
        } else {
            res.render("login", { notuser: "Invalid username or password" })


        }

    } catch (e) {
        console.log("problem with the userLogin" + e)
    }
}

const userLogout = async (req, res) => {
    try {
        req.session.isUser = false
        res.redirect("/")

    } catch (e) {
        console.log("problem with userLogout" + e)
    }
}

module.exports = { userRegister, userLogin, displayLogin, dispalySignup, displayHome, userLogout, isUser }