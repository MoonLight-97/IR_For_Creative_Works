const { Router } = require('express')
const Comment = require('../models/Comment')
const router = Router()

router.get('/comments/:workId', async (req, res) => {
    try {
        const workId = req.params.workId
        
        const comments = await Comment.findOne({work: workId})  
        
        res.status(200).json(comments)
    } catch(e) {
        res.status(500).json({message: "Произошла какая то ошибка. Попробуйте снова"})
    }
})

//создать коммент
router.post('/comments', async (req, res) => {
    try {
        const {workId, content, author} = req.body

        const comment = await Comment.findOne({work: workId})
        const updatedComment = await Comment.findOneAndUpdate({work: workId}, {authors: [...comment.authors, author], 
                                                                               contents: [...comment.contents, content],
                                                                               count: comment.count + 1})

        res.status(200).json(updatedComment)
    } catch(e) {
        res.status(500).json(e)
    }
})

//удалить коммент
router.delete('/comments', async (req, res) => {
    try {
        const {content, author, workId} = req.body
        
        const comment = await Comment.findOne({work: workId})
        const deletedComment = await Comment.findByIdAndUpdate({work: workId}, {authors: comment.authors.filter(user => user != author),
                                                                                contents: comment.contents.filter(comment => comment != content),
                                                                                count: comment.count - 1})

        res.status(200).json(deletedComment)
    } catch(e) {
        res.status(500).json({message: "Что то пошло не так. Попробуйте снова"})
    }
})

module.exports = router