import express, {Request, Response, Router} from 'express'
import User from '../models/user'
import Note from '../models/note'
import bcrypt from 'bcrypt'

export const usersRouter: Router = express.Router()

// find user with the given id
async function getUser(req: Request, res: Response, next: any) {
   let user
   try {
      user = await User.findById(req.params.id)
      if (user == null) {
         return res.status(404).json({ message: "Cannot find user with that id" })
      }
   } catch (err) {
      return res.status(500).json({ message: err.message })
   }
   // add new key/value pair to the res obj
   Object.assign(res, { user: user })
   next() // pass control to the next handler
}

// get all users
usersRouter.get('/', async (_req: Request, res: Response) => {
   try {
      const users = await User.find()
      res.json(users)
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

// get a specific user
usersRouter.get('/:id', getUser, (_req: Request, res: Response) => {
   res.json((<any>res).user)
})

// create new user
usersRouter.post('/', async (req: Request, res: Response) => {
   const hashedPass: string = await bcrypt.hash(req.body.password, 10)

   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass
   })
   try {
      const newUser = await user.save()
      res.status(201).json(newUser)
   } catch (err) {
      res.status(400).json({ message: err.message })
   }
})

// update user's info
usersRouter.patch('/:id', getUser, async (req: Request, res: Response) => {
   if (req.body.name != null) {
      (<any>res).user.name = req.body.name
   }
   if (req.body.email != null) {
      (<any>res).user.email = req.body.email
   }
   try {
      const updatedUser = await (<any>res).user.save()
      res.json(updatedUser)
   } catch (err) {
      res.status(400).json({ message: err.message })
   }
})

// delete user
usersRouter.delete('/:id', getUser, async (req: Request, res: Response) => {
   try {
      await (<any>res).user.remove()
      res.json({ message: "User has been successfully deleted"})
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

// login
usersRouter.post('/login', async (req: Request, res: Response) => {
   const user = await User.findOne({ name: req.body.name }).exec()

   if (user == null) {
      return res.status(400).send('User does not exist.')
   }
   try {
      if (await bcrypt.compare(req.body.password, (<any>user).password)) {
         //res.json(user)
         res.send('Login successful')
      } else {
         res.send('Wrong password.')
      }
   } catch (error) {
      res.status(500).json({ message: error.message })
   }
})

// get a user's notes
usersRouter.get('/:id/getnotes', getUser, async (_req: Request, res: Response) => {
   const username = (<any>res).user.name

   try {
      const notes = await Note.find({ user: username }).exec()
      res.json(notes)
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})
// Sally = 5f86ffbebedaee15e4044ab1
// Reese = 5f870003bedaee15e4044ab2