import Posts from '../../../src/models/posts'

/* eslint-disable no-undef */
describe('Routes: Posts', () => {
  let request

  before(() => {
    return setupApp().then(app => {
      request = supertest(app)
    })
  })

  const defaultPost = {
    title: 'Default title',
    description: 'Default description',
    author: 'Default author',
    likes: 100
  }

  const expectedPost = {
    __v: 0,
    _id: '56cb91bdc3464f14678934ca',
    title: 'Default title',
    description: 'Default description',
    author: 'Default author',
    likes: 100
  }

  beforeEach(() => {
    const posts = new Posts(defaultPost)
    posts._id = '56cb91bdc3464f14678934ca'
    return Posts.deleteOne({}).then(() => posts.save())
  })

  afterEach(() => Posts.deleteOne({}))

  describe('GET /api/posts', () => {
    it('should return a list of posts', done => [
      request.get('/api/posts').end((err, res) => {
        expect(res.body).to.eql([expectedPost])
        done(err)
      })
    ])
  })
})
