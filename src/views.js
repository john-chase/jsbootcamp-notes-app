import moment from 'moment'
import {getFilters} from './filters'
import {getNotes, sortNotes, removeNote, saveNotes} from './notes'

//generate DOM structure for note
const generateNoteDOM = (note) => {
    const divElem = document.createElement('div')
    const noteElem = document.createElement('a')
    const deleteBtn = document.createElement('button')
    
    deleteBtn.textContent = 'x'
    divElem.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', () => {
        removeNote(note.id)
        renderNotes()
    })
    noteElem.textContent = note.title || 'Unnamed note...'
    noteElem.setAttribute('href', `edit.html#${note.id}`)
    divElem.appendChild(noteElem)
    return divElem
}

//render app notes
const renderNotes = () => {
    const notesElem = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => { 
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    
    notesElem.innerHTML = ''
   
    if(filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteElem = generateNoteDOM(note)
            notesElem.appendChild(noteElem)
        })
    } else {
        const noteElem = document.createElement('a')
        noteElem.textContent = 'No notes found. Remove filter criteria or use the Add Note button to create one.'
        document.querySelector('#notes').appendChild(noteElem)
    }
}

//init edit page
const initEditPage = (id) => {
    const titleElem = document.querySelector('#note-title')
    const bodyElem = document.querySelector('#note-body')
    const dateElem = document.querySelector('#edited')    
    const notes = getNotes()
    const note = notes.find((note) => (note.id === id))
    if(!note) { //note === undefined
        location.assign('index.html')
    }
    titleElem.value = note.title
    bodyElem.value = note.body
    dateElem.textContent = lastUpdated(note.updatedAt)
}

//generate last updated
const lastUpdated = (timeStamp) => {
    return `Last edited: ${moment(timeStamp).fromNow()}`
}

export {generateNoteDOM, renderNotes, initEditPage, lastUpdated}