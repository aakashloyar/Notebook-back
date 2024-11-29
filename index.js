const express = require('express')
var cors = require('cors')
const connectTomongo=require('./db')
connectTomongo();

const app = express()
app.use(cors())
app.use(express.json())
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`inotebook is  listening on port ${port}`)
})






//password:-hashing,salt,peeper
//database can be accessed by hackers
//so in database we store password in hash//10 character long
//hash is one way function//convert to hash only
//when user enter password convert it to hash and check that it matches to store hash
//but hackers use ***Rainbow dictoinary which has stored common hash with their password
//so we use to add salt to that like 3r@r  with help of backend so that if user entered a password will not be common