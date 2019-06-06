import express from 'express'
import PostsController from '../controllers/posts'
import Posts from '../models/posts'

const router = express.Router()
const postsController = new PostsController(Posts)

router.get('/', (req, res) => postsController.getAll(req, res))
router.get('/:id', (req, res) => postsController.getById(req, res))

export default router
