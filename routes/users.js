const router = require('express').Router();
const User = require('../models/User');
//CRUD
// Create a new user

// Delete a user
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted!");
        }catch(err) {
            return res.status(500).json(err);
        }
    }else{
        return res
                .status(403)
                .json("You can only delete your account!");
    }
});
// Update a user
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json("Account has been updated!");
        }catch(err) {
            return res.status(500).json(err);
        }
    }else {
        return res
            .status(403)
            .json("You can only update your account!");
    }
});
// Get user
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    }catch(err) {
        return res.status(500).json(err);
    }
});


// follow user
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            
            if(!user.followers.includes(req.body.userId)){
               await user.updateOne({
                 $push: { followers: req.body.userId },
               });
                await currentUser.updateOne({
                  $push: { followings: req.params.id },
                });
                return res.status(200).json("User has been followed!");
            }else{
                return res.status(403).json("You already follow this user!");
            }
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(500).json("You can't follow yourself!");
    }
})

// unfollow user
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            // Check if the user is already existing in the followers array
            // If yes, then remove the user from the followers array
            if(user.followers.includes(req.body.userId)){
               await user.updateOne({
                 $pull: { followers: req.body.userId },
               });
                await currentUser.updateOne({
                  $pull: { followings: req.params.id },
                });
                return res.status(200).json("User has been unfollowed!");
            }else{
                return res.status(403).json("You don't follow this user!");
            }
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(500).json("You can't unfollow yourself!");
    }
})



module.exports = router;