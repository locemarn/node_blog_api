import express from 'express'
import PostsController from '../controllers/posts'

const router = express.Router()
const postsController = new PostsController()

router.get('/', (req, res) => postsController.getAll(req, res))

export default router
