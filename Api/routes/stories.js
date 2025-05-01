const express=require("express")
const { createStoryController,getStoriesController, 
    getUserStoriesController,deleteStoryController,
    deleteStoriesController } = require("../controllers/storyController")
const upload = require("../middlewares/upload")
const router=express.Router()


router.post("/create/:userId",upload.single("image"),createStoryController)

router.get("/all/:userId",getStoriesController)

router.get("/user/:userId",getUserStoriesController)

router.delete("/delete/:storyId",deleteStoryController)

router.delete("/delete/stories/:userId",deleteStoriesController)





module.exports=router