
const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Work = require('../models/Work')
const auth = require('../middleware/auth.middleware')
const router = Router()


// /api/work/create
router.post(
    "/create",
    auth,
    [
        check("title", "Введите заголовок работы").notEmpty(),
        check("description", "Введите описание работы").notEmpty(),
        check("content", "Введите текст работы").notEmpty(),
        check("status", "Укажите статус работы").notEmpty()/*isIn(["В процессе","Завершён","Заморожен"])*/,
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                //console.log(errors.array())
                return res.status(400).json({
                    errors: errors.array(),
                    message: errors.array()[0].msg
                })
            }

            const {title, description, content, status} = req.body

            const existing = await Work.findOne({ title })

            if (existing) {
                return res.status(400).json({ message: 'Такая работа уже существует' })
            }

            const work = new Work({
                title, description, content, status, user: req.user.userId
            })

            await work.save()

            res.status(201).json({ message: 'Работа создана' })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

module.exports = router