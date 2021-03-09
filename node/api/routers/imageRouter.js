const router = require('express').Router()
const image = require('../controllers/imagesController')
router.get('/getImagesByIdUser/:userId', image.getImagesByIdUser)
router.post('/updateImage/:id', image.updateImage)
router.post('/createImage/:id', image.createImage)
router.post('/deleteImage/:id', image.deleteImage)

module.exports = router