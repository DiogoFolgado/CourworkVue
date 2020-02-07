import moongoose from 'mongoose'

const courseSchema = moongoose.Schema({
  topic: String,
  price: Number,
  location: String,
  provider: String,
  rating: Number,
  time: String,
  author: String
})

export default moongoose.model('courses_information', courseSchema)
