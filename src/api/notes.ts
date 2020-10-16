import express, {Request, Response, Router} from 'express'
import Note from '../models/note'

export const notesRouter: Router = express.Router()

// get all notes
notesRouter.get('/', async (_req: Request, res: Response) => {
   try {
      const notes = await Note.find()
      res.json(notes)
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

// get a specific note
notesRouter.get('/:id', getNote, (_req: Request, res: Response) => {
   res.json((<any>res).note)
})

// create new note
notesRouter.post('/', async (req: Request, res: Response) => {
   const note = new Note({
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag, 
      user: req.body.user 
   })
   try {
      const newNote = await note.save()
      res.status(201).json(newNote)
   } catch (err) {
      res.status(400).json({ message: err.message })
   }
})

// update a note
notesRouter.patch('/:id', getNote, async (req: Request, res: Response) => {
   if (req.body.title != null) {
      (<any>res).note.title = req.body.title
   }
   if (req.body.content != null) {
      (<any>res).note.content = req.body.content
   }
   if (req.body.tag != null) {
      (<any>res).note.tag = req.body.tag
   }
   try {
      const updatedNote = await(<any>res).note.save()
      res.json(updatedNote)
   } catch (err) {
      res.status(400).json({ message: err.message })
   }
})

// delete a note
notesRouter.delete('/:id', getNote, async (req: Request, res: Response) => {
   try {
      await (<any>res).note.remove()
      res.json({ message: "Success" })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

// func to find a specific note
async function getNote(req: Request, res: Response, next: any) {
   let note 
   try {
      note = await Note.findById(req.params.id)
      if (note == null) {
         return res.status(404).json({ message: "Cannot find note with that id" })
      }
   } catch (err) {
      return res.status(500).json({ message: err.message })
   }
   Object.assign(res, { note: note })
   next()
}