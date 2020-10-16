import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   content: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      required: true,
      default: Date.now()
   },
   tag: {
      type: String,
      required: false,
      default: "none"
   },
   user: {
      type: String,
      required: true
   }
})

const Note = mongoose.model('Note', noteSchema)
export default Note

/* function getDate() {
   const today = new Date()

   const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
   return date
}

function getTime() {
   const today = new Date();

   const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
   return time
} */