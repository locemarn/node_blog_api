import express from 'express'
import PostsController from '../controllers/posts'
import Posts from '../models/posts'

const router = express.Router()
const postsController = new PostsController(Posts)

router.get('/', (req, res) => postsController.getAll(req, res))
router.get('/:id', (req, res) => postsController.getById(req, res))
router.post('/', (req, res) => postsController.create(req, res))
router.put('/:id', (req, res) => postsController.update(req, res))
router.delete('/:id', (req, res) => postsController.remove(req, res))

export default router
