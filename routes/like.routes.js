 const { Router } = require("express")
 const Like = require("../models/Like")
 const router = Router()

 //вернуть лайки которые уже стоят на посте
router.get('/like/:workId', async (req, res) => {
    try {
        const workId = req.params.workId

        if (!workId) {
            return res.status(400).json({message: "Не указан ID"})
        }
    
        const likes = await Like.findOne({work: workId})

        res.status(200).json(likes);
    } catch(e) {
        res.status(500).json({message: "Что то пошло не так. Попробуйте снова"})
    }

})

//добавление лайка
router.post('/like', async (req, res) => {
    try {
        const {userId, workId} = req.body
        const candidate = await Like.findOne({users: [userId], work: workId})
        if (candidate) {
            return res.status(400).json({message: "Лайк уже существует"})
        }

        const workLikes = await Like.findOne({work: workId})
        const updated = await Like.findOneAndUpdate({work: workId}, {users: [...workLikes.users, userId], count: workLikes.count + 1})

        res.status(200).json(updated)
    } catch(e) {
        res.status(500).json({message: "Что то пошло не так. Попробуйте снова"})
    }
})


//убрать лайк
router.delete('/like', async (req, res) => {
    try {
        const {userId, workId} = req.body
        const candidate = await Like.findOne({users: userId, work: workId})

        console.log(candidate)

        if (!candidate) {
            return res.status(400).json({message: "Лайк не существует"})
        }

        await Like.findOneAndUpdate({work: workId}, {users: candidate.users.filter(user => user != userId), count: candidate.count - 1})
        res.status(200).json(candidate)
    } catch(e) {
        res.status(500).json({message: "Что то пошло не так. Попробуйте снова"})
    }
})

module.exports = router