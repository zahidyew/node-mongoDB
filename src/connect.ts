import mongoose, { Connection } from 'mongoose'

export default function connectToDatabase() {
   const uri: string | any = process.env.DATABASE

   mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   }).catch((err: any) => console.log(err.reason))

   const db: Connection = mongoose.connection;

   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', () => { console.log("Connected to Database") });
}