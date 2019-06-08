/* eslint-disable no-undef */
import Users from '../../../src/models/user'

describe('Routes: Users', () => {
  let request

  before(() => {
    return setupApp().then(app => {
      request = supertest(app)
    })
  })

  const defaultUser = {
    name: 'Default user',
    email: 'user@email.com',
    password: 'password',
    role: 'user'
  }

  const defaultId = '56cb91bdc3464f14678934ca'

  const expectedUser = {
    __v: 0,
    _id: defaultId,
    name: 'Default user',
    email: 'user@email.com',
    password: 'password',
    role: 'user'
  }

  beforeEach(() => {
    const user = new Users(defaultUser)
    user._id = '56cb91bdc3464f14678934ca'
    return Users.deleteOne({}).then(() => user.save())
  })

  afterEach(() => Users.deleteOne({}))

  describe('GET /api/users', () => {
    it('should return a lis of users', done => {
      request.get('/api/users').end((err, res) => {
        expect(res.body).to.eql([expectedUser])
        done(err)
      })
    })

    context('when an id is specified', done => {
      it('should return 200 with one user', done => {
        request.get(`/api/users/${defaultId}`).end((err, res) => {
          expect(res.statusCode).to.eql(200)
          expect(res.body).to.eql([expectedUser])
          done(err)
        })
      })
    })
  })

  describe('POST, /api/users', () => {
    context('when posting a user', () => {
      it('should return a new user with status code 201', done => {
        const customId = '56cb91bdc3464f14678934ba'
        const newUser = Object.assign(
          {},
          {
            _id: customId,
            __v: 0
          },
          defaultUser
        )

        const expectedSavedUser = {
          __v: 0,
          _id: customId,
          name: 'Default user',
          email: 'user@email.com',
          password: 'password',
          role: 'user'
        }

        request
          .post('/api/users')
          .send(newUser)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201)
            expect(res.body).to.eql(expectedSavedUser)
            done(err)
          })
      })
    })
  })

  describe('PUT /api/users/:id', () => {
    context('when editinr a user', () => {
      it('should update the user ans return status 200 as status code', done => {
        const customUser = {
          name: 'Custom User'
        }
        const updatedUser = Object.assign({}, customUser, defaultUser)
        request
          .put(`/api/users/${defaultId}`)
          .send(updatedUser)
          .end((err, res) => {
            expect(res.status).to.eql(200)
            done(err)
          })
      })
    })
  })

  describe('DELETE /api/users/:id', () => {
    context('when deleting a user', () => {
      it('should delete a user and return 204 as status code', done => {
        request.delete(`/api/users/${defaultId}`).end((err, res) => {
          expect(res.status).to.eql(204)
          done(err)
        })
      })
    })
  })
})
