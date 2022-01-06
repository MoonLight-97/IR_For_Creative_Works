
const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Work = require('../models/Work')
const auth = require('../middleware/auth.middleware')
const router = Router()


// /api/works/<userId>
router.get("/:userId", async (req, res)=>{
    try {
        const works = await Work.find({user: req.params.userId});
        res.json(works);
    } catch (e){
        res.status(500).json({ massage: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router