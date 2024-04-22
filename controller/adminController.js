const userData = require("../models/userdeatils")

const bcrypt = require('bcrypt')

const adminAuth = (req, res,next) => {
    try {
        if (req.session.isAdmin) {

            next()
            // res.redirect("/admin/adminHome")
        } else {
            res.render("adminlogin")
        }
    } catch (e) {
        console.log('problem in adminAuth in adminController:' + e)
    }
}


const admin = async (req, res) => {

    try {
        if(req.session.isAdmin){
            res.redirect('/admin/adminHome')
        }else{
            res.render('adminlogin')
        }
        // console.log(req.session.isAdmin)

    } catch (e) {
        console.log("problem with admin" + e)
    }
}

const displayAdminhome = async (req, res) => {
    try {

        const userName = req.session.userName

        const userDetails = await userData.find({ isAdmin: 0 })
        res.render("adminHome", { userName, userDetails })

    } catch (e) {
        console.log("problem with displayAdminhome" + e)

    }
}

const adminLogin = async (req, res) => {

    console.log(req.body.name)
    try {
        const adminloginDetails = await userData.findOne({ name: req.body.name })
        console.log(adminloginDetails)
        if (adminloginDetails) {
            console.log(req.body.name)
            const data = await bcrypt.compare(req.body.password, adminloginDetails.password)
            console.log(data)
            req.session.isAdmin = true
            if (data) {
                if (adminloginDetails.isAdmin == 1) {
                    req.session.userName = req.body.name
                    res.redirect("/admin/adminHome")

                } else {
                    res.render("adminLogin", { notuser: "Not an Admin" })
                }


            } else {
                res.render("adminLogin", { notuser: "Invalid username or password" })
            }

        } else {
            res.render("adminLogin", { notuser: "Invalid username or password" })
        }

    } catch (e) {
        console.log("problem with adminLogin" + e);

    }
}

const editDisplay = async (req, res) => {
    try {
        console.log(req.query)
        const data = await userData.find({ email: req.query.email })
        const found = req.query.found
        const username = req.query.username
        let user = false
        if (username) {
            user = true
        }

        //console.log(data)
        res.render("editUser", { data, found, username, user })


    } catch (e) {
        console.log("problem with adminLogin" + e)

    }
}

const editUser = async (req, res) => {
    try {

        console.log(req.body.username)
        console.log(req.body.oldusername)
        const moreUser = await userData.find({ name: req.body.username }).countDocuments()
        const data = await userData.find({ name: req.body.oldusername })
        console.log(data, 'moreuser')
        if (moreUser == 0) {
            await userData.updateOne({ name: req.body.oldusername }, { $set: { name: req.body.username } })

            res.redirect("/admin/adminHome")
        } else {
            res.redirect(`/admin/edit?username=${req.body.username}&found='username found&email=${data[0].email}`)
        }
    } catch (e) {
        console.log("problem with edit User" + e)

    }

}

const deleteUser = async (req, res) => {
    try {
        console.log(req.query)
        await userData.deleteOne({ name: req.query.name })
        res.redirect('/admin/adminHome')
    } catch (e) {
        console.log("problem with delete User" + e)
    }
}

const userSearch = async (req, res) => {
    try {
        console.log(req.body.userfind)
        const userDetails = await userData.find({ name: { $regex: new RegExp(`${req.body.userfind}`, 'i') }, isAdmin: 0 })
        const userName = req.session.userName
        res.render("adminHome", { userName, userDetails })
    } catch (e) {
        console.log("problem with delete User" + e)
    }
}

const signout = async (req, res) => {
    try {
        await req.session.destroy()
        res.redirect('/admin')
    } catch (e) {

    }
}


module.exports = { admin, adminLogin, displayAdminhome, editUser, editDisplay, deleteUser, userSearch, signout,adminAuth }
