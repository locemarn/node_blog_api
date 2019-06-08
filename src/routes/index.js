import express from 'express'
import postsRoute from './posts'
import usersRoute from './users'

const router = express.Router()

router.use('/posts', postsRoute)
router.use('/users', usersRoute)
router.get('/', (req, res) => res.send('Hello World!'))

export default router
