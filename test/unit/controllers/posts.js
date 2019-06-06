import PostsController from '../../../src/controllers/posts'
import sinon from 'sinon'
import Posts from '../../../src/models/posts'

describe('Controllers: Posts', () => {
  const defaultPost = [
    {
      title: 'Default title',
      description: 'Default description',
      author: 'Default author',
      likes: 100
    }
  ]

  const defaultRequest = {
    params: {}
  }

  describe('getAll() posts', () => {
    it('should call send with a list of posts', () => {
      const response = {
        send: sinon.spy()
      }

      Posts.find = sinon.stub()

      Posts.find.withArgs({}).resolves(defaultPost)

      const postsController = new PostsController(Posts)
      return postsController.getAll(defaultRequest, response).then(() => {
        sinon.assert.calledWith(response.send, defaultPost)
      })
    })

    it('should return 400 when an error occurs', () => {
      const request = {}
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }

      response.status.withArgs(400).returns(response)
      Posts.find = sinon.stub()
      Posts.find.withArgs({}).rejects({ message: 'Error' })

      const postsController = new PostsController(Posts)
      return postsController.getAll(request, response).then(() => {
        sinon.assert.calledWith(response.send, 'Error')
      })
    })
  })

  describe('getById()', () => {
    it('should call send with one posts', () => {
      const fakeId = 'a-fake-id'
      const request = {
        params: {
          id: fakeId
        }
      }
      const response = {
        send: sinon.spy()
      }

      Posts.find = sinon.stub()
      Posts.find.withArgs({ _id: fakeId }).resolves(defaultPost)

      const postsController = new PostsController(Posts)

      return postsController.getById(request, response).then(() => {
        sinon.assert.calledWith(response.send, defaultPost)
      })
    })
  })
})
