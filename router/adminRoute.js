const express = require("express")
const router = express.Router()
const adminController = require("../controller/adminController")

router.get("/", adminController.admin)
router.post("/login", adminController.adminLogin)

router.get("/adminHome", adminController.adminAuth, adminController.displayAdminhome)

router.get("/edit", adminController.adminAuth, adminController.editDisplay)
router.post("/edit", adminController.editUser)

router.get('/delete', adminController.deleteUser)

router.post('/search', adminController.userSearch)

router.get('/signout', adminController.signout)



module.exports = router




