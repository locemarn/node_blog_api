class PostsController {
  getAll (req, res) {
    return res.send([
      {
        title: 'Default title',
        description: 'Default description',
        author: 'Default author',
        likes: 100
      }
    ])
  }
}

export default PostsController
