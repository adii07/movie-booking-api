const express=require("express");
const router=express.Router();
const {addTheatre,getTheatres}=require("../controllers/theatreController");

router.post("/",addTheatre);
router.get("/",getTheatres);

module.exports=router;