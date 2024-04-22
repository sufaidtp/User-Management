const express = require("express")
const router = express.Router()

const userController = require("../controller/userController")


router.get("/", userController.displayLogin)
router.post("/login", userController.userLogin)

router.get("/signup", userController.dispalySignup)
router.post("/signup", userController.userRegister)

router.get("/home", userController.isUser, userController.displayHome)
router.get("/logout", userController.userLogout)











module.exports = router