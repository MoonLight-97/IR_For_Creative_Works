
const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Work = require('../models/Work')
const auth = require('../middleware/auth.middleware')
const Like = require('../models/Like')
const router = Router()


//удаление поста по айди с проверкой владелец ли это поста на случай ошибки в фронте
router.delete("/works/:id", async (req, res) => {
    try {
        const postId = req.params.id
        const authUser = req.user

        if (!postId) {
            return res.status(400).json({ message: "Вы не указали id" })
        }

        const post = await Work.findById(postId)

        if (authUser.userId != post.user) {
            return res.status(400).json({ message: "Вы не можете удалить чужую работу" })
        }
        else {
            await Work.findByIdAndDelete(postId)
            await Like.findOneAndDelete({work: postId})
            res.status(200).json({ post })
        }

    } catch(e) {
        res.status(500).json({ message: 'Что то пошло не так, попробуйте снова', e })
    }
    
})


// /api/works/<userId>
router.get("/works/:userId", async (req, res)=>{
    try {
        const {page, limit} = req.query;

        const worksCount = await Work.find({user: req.params.userId});
        const works = await Work.find({user: req.params.userId}, null, {skip: (page - 1) * limit, limit: +limit})
        res.json({ works, count: worksCount.length});
    } catch (e){
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get("/works", async (req, res) => {
    try {
        const {page, limit} = req.query;

        const worksCount = await Work.find();
        const works = await Work.find({}, null, {skip: (page - 1) * limit, limit: +limit})
        res.status(200).json({ works, count: worksCount.length })
        
    } catch (e){
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router