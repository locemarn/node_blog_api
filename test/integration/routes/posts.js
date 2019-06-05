/* eslint-disable no-undef */
describe('Routes: Posts', () => {
  const defaultPost = {
    title: 'Default title',
    description: 'Default description',
    author: 'Default author',
    likes: 100
  }

  describe('GET /api/posts', () => {
    it('should return a list of posts', done => [
      request.get('/api/posts').end((err, res) => {
        expect(res.body[0]).to.eql(defaultPost)
        done(err)
      })
    ])
  })
})
