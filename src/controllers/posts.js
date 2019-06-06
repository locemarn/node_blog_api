class PostsController {
  constructor (Posts) {
    this.Posts = Posts
  }

  getAll (req, res) {
    return this.Posts.find({})
      .then(posts => res.send(posts))
      .catch(err => res.status(400).send(err.message))
  }

  getById (req, res) {
    const {
      params: { id }
    } = req
    return this.Posts.find({
      _id: id
    })
      .then(posts => res.send(posts))
      .catch(err => res.status(400).send(err.message))
  }
}

export default PostsController
