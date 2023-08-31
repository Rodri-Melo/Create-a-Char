const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
  console.log('Mongo connected')
}).catch((error) => {
  console.log(error)
  console.log('mongoose nao conectadp')
})

module.exports = mongoose