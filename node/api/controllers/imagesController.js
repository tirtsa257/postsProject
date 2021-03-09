const Image = require('../models/image');
const userss = require('../models/user')
const createImage = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.params.id)
        let user = await userss.findById(req.params.id);
        console.log("1"+user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let image = new Image(req.body.pst);
        image.user_id=req.params.id;
        console.log("2"+image);
        await image.save();
        console.log("3"+user.posts);
        user.posts.push(image);
        console.log("4");
        await user.save();
        console.log("5");
        return res.status(200).json(image)

    } catch (err) {
        return res.status(500).json({ "problem": err.message })
    }
}




const getImagesByIdUser = (req, res) => {
    userss.findById(req.params.userId).populate('posts')
        .then((user) => {
            if (!user)
                res.status(404).json({ "message": 'user not found' });
            else {
                console.log(user);
                res.status(200).json(user.posts);
                console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"+user.posts);
            }
        }).catch((err) => {
            res.status(500).json({ "eror": err });
            console.log(`err ${err}`);
        })
}
const updateImage = (req, res) => {
    console.log(req.body)
    let imageId = req.params.id;
    Image.findByIdAndUpdate(imageId, req.body, { new: true })
        .then((img) => {
            if (!img)
                return res.status(404).json({ message: 'Image not found' })
            return res.status(200).json(img);
        }).catch((err) => {
            res.status(500).json({ "eror": err });
            console.log(`err ${err}`);
        })

}

const deleteImage = (req, res) => {
    // try{
    //     jwt.verify(req.headers.authorization, process.env.SECRET)
    // }
    // catch(err){
    //     res.status(401).json({ err: "verify err" })
    // }cons
    console.log(req.params.id);
    Image.findByIdAndDelete(req.params.id).then(

        (image) => {
            console.log(image);
            if (!image) {
                return res.status(404).json({ message: 'Image not found' })
            }
            else {
                return userss.findByIdAndUpdate(image.user_id, { $pull: { images: req.params.id } })
            }
        }
    ).then((u) => {
        console.log("uuuuuuuuuuuuuuuuu"+u);
        if (!u) {
            return res.status(404).json({ message: 'User not found' })
        }
        else {
            u.save();
            return res.status(200).json(u);
        }
    }).catch(err => {
        console.log(`err ${err}`);
    })

}
module.exports = { createImage, getImagesByIdUser, updateImage, deleteImage }

