const express=require("express");
const router=express.Router();
const{register,getUsers}=require("../controllers/userController");

router.post("/register",register);
router.get("/",getUsers);

module.exports=router;