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

  create (req, res) {
    const post = new this.Posts(req.body)

    return post
      .save()
      .then(() => res.status(201).send(post))
      .catch(err => res.status(422).send(err.message))
  }

  update (req, res) {
    return this.Posts.findOneAndUpdate(
      {
        _id: req.params.id
      },
      req.body
    )
      .then(() => res.sendStatus(200))
      .catch(err => res.status(422).send(err.message))
  }
}

export default PostsController
