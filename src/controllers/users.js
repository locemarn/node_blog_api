class UsersController {
  constructor (User) {
    this.User = User
  }

  getAll (req, res) {
    return this.User.find({})
      .then(users => res.send(users))
      .catch(err => res.status(400).send(err.message))
  }

  getById (req, res) {
    const {
      params: { id }
    } = req

    return this.User.find({ _id: id })
      .then(user => res.send(user))
      .catch(err => res.status(400).send(err.message))
  }

  create (req, res) {
    const user = new this.User(req.body)

    return user
      .save()
      .then(() => res.status(201).send(user))
      .catch(err => res.status(422).send(err.message))
  }

  update (req, res) {
    // const body = req.body
    return this.User.findOneAndUpdate(
      {
        _id: req.params.id
      },
      req.body
    )
      .then(() => res.sendStatus(200))
      .catch(err => res.status(422).send(err.message))
  }

  remove (req, res) {
    return this.User.deleteOne({ _id: req.params.id })
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message))
  }
}

export default UsersController
