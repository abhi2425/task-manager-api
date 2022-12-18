const app = require('./app')
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
   return res.send({
      hello: 'Welcome to task-manager api',
      message: 'Please use postman for interacting with the api.',
      postmanCollection: "https://github.com/abhi2425/task-manager-api/blob/master/Task%20Manager.postman_collection.json"
   });
})

app.listen(port, () => {
   console.log('Server is up at ', port)
})
