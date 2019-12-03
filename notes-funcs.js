//check for existing notes in local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    if(notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

//remove a note 
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if(noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

//generate DOM structure for note
const generateNoteDOM = (note) => {
    const divElem = document.createElement('div')
    const noteElem = document.createElement('a')
    const deleteBtn = document.createElement('button')
    
    deleteBtn.textContent = 'x'
    divElem.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', () => {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })
    noteElem.textContent = note.title || 'Unnamed note...'
    noteElem.setAttribute('href', `/edit.html#${note.id}`)
    divElem.appendChild(noteElem)
    return divElem
}

//sort notes
const sortNotes = (notes, sort) => {
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

//render app notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    document.querySelector('#notes').innerHTML = ''
    
    filteredNotes.forEach((note) => {
        const noteElem = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteElem)
    })
    //ENHANCEMENT
    if(notes.length === 0) {
        const noteElem = document.createElement('a')
        noteElem.textContent = 'No notes found. Remove filter criteria or use the Add Note button to create one.'
        document.querySelector('#notes').appendChild(noteElem)
    }
}

//save the notes to LS
const saveNotes = (notes) => localStorage.setItem('notes', JSON.stringify(notes))

//generate last updated
const lastUpdated = (timeStamp) => `Last edited: ${moment(timeStamp).fromNow()}`