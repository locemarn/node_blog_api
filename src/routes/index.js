import express from 'express'
import postsRoute from './posts'

const router = express.Router()

router.use('/posts', postsRoute)
router.get('/', (req, res) => res.send('Hello World!'))

export default router
