require('dotenv').config()
const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/users')
const userOneId = new mongoose.Types.ObjectId()

const userOne = {
   _id: userOneId,
   name: 'Abhinav Jha',
   email: 'abhi@gmail.com',
   password: 'Abhinav@123',
   tokens: [
      {
         token: jwt.sign({ _id: userOneId }, process.env.SECRET_KEY),
      },
   ],
}

beforeEach(async () => {
   await User.deleteMany()
   await new User(userOne).save()
})
test('should signIn a user', async () => {
   await request(app)
      .post('/users')
      .send({
         name: 'Mike Sam',
         email: 'mike@gmail.com',
         password: 'Mike@123',
      })
      .expect(201)
})
test('should login a user', async () => {
   const response = await request(app)
      .post('/users/login')
      .send({
         email: userOne.email,
         password: userOne.password,
      })
      .expect(200)
   expect(response.body.user).toMatchObject({
      name: 'Abhinav Jha'.toUpperCase(),
      email: userOne.email,
   })
})

test('should fetch user profile', async () => {
   const response = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0]?.token}`)
      .expect(200)
})
test('should upload a avatar', async () => {
   await request(app)
      .post('/users/me/avatar')
      .set('Authorization', `Bearer ${userOne.tokens[0]?.token}`)
      .attach('avatar', 'tests/fixtures/Abhinav.PNG')
      .expect(200)
   expect({}).toEqual({}) //check for equal objects as it uses algorithm not reference operator ===
   const user = await User.findById(userOneId)
   expect(user.avatar).toEqual(expect.any(Buffer))
})
