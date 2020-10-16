import express, {Application} from 'express'
import {usersRouter} from './api/users'
import {notesRouter} from './api/notes'
import connectToDatabase from './connect'

// Load config
require('dotenv').config()

const app: Application = express()

connectToDatabase() 

// middleware for body/form parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// endpoints
app.use('/users', usersRouter)
app.use('/notes', notesRouter)

// define port for the server
const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log("Server started on port " + PORT);
});