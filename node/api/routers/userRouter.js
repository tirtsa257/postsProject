const router=require("express").Router();
const user=require("../controllers/usersController")
router.post('/login',user.login);
router.post('/newUser',user.createUser);
router.patch('/updateUser',user.updateUser);
router.get('/getAllUsers',user.getAllUsers);
router.post('/getUserLikes',user.getUserLikes);

module.exports=router;