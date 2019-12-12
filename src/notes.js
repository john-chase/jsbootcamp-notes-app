import moment from 'moment'
import uuidv4 from 'uuid/v4'
let notes = []

//check for existing notes in local storage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch(err) {
        return []
    }
}

//save the notes to LS
const saveNotes = () => localStorage.setItem('notes', JSON.stringify(notes))

//Expose notes from module
const getNotes = () => notes

const createNote = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()  
    notes.push({
        id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })    
    saveNotes()
    return id
}

//remove a note 
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if(noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

//sort notes
const sortNotes = (sort) => {
    if(sort === 'lastEdited') {
        return notes.sort((a,b) => {
            if(a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if(sort === 'recentlyCreated') {
        return notes.sort((a,b) => {
            if(a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if(sort === 'alpha') {
        return notes.sort((a,b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes //bad option, return unsorted array
    }
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)
    if(!note) { return }
    if(typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }
    if(typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }
    saveNotes()
    return note
} 

notes = loadNotes()

export {getNotes, createNote, removeNote, sortNotes, updateNote}