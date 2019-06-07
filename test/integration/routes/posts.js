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

  const defaultId = '56cb91bdc3464f14678934ca'

  const expectedPost = {
    __v: 0,
    _id: defaultId,
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

    context('when an id is specified', done => {
      it('should return 200 with one post', done => {
        request.get(`/api/posts/${defaultId}`).end((err, res) => {
          expect(res.statusCode).to.eql(200)
          expect(res.body).to.eql([expectedPost])
          done(err)
        })
      })
    })
  })

  describe('POST /posts', () => {
    context('when posting a post', () => {
      it('should return a new post with status code 201', done => {
        const customId = '56cb91bdc3464f14678934ba'
        const newPost = Object.assign(
          {},
          {
            _id: customId,
            __v: 0
          },
          defaultPost
        )

        const expectedSavedPosts = {
          __v: 0,
          _id: customId,
          title: 'Default title',
          description: 'Default description',
          author: 'Default author',
          likes: 100
        }

        request
          .post('/api/posts')
          .send(newPost)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201)
            expect(res.body).to.eql(expectedSavedPosts)
            done(err)
          })
      })
    })
  })

  describe('PUT /posts/:id', () => {
    context('when editing a post', () => {
      it('should update the post and return 200 as status code', done => {
        const customPost = {
          title: 'Custom Title'
        }

        const updatedPost = Object.assign({}, customPost, defaultPost)

        request
          .put(`/api/posts/${defaultId}`)
          .send(updatedPost)
          .end((err, res) => {
            expect(res.status).to.eql(200)
            done(err)
          })
      })
    })
  })

  describe('DELETE /api/posts/:id', () => {
    context('when deleting a post', () => {
      it('should delete a post and return 204 as status code', done => {
        request.delete(`/api/posts/${defaultId}`).end((err, res) => {
          expect(res.status).to.eql(204)
          done(err)
        })
      })
    })
  })
})
