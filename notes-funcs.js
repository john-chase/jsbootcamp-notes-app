//check for existing notes in local storage
const getSavedNotes = function() {
    const notesJSON = localStorage.getItem('notes')
    if(notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

//remove a note 
const removeNote = function(id) {
    const noteIndex = notes.findIndex(function(note){
        return note.id === id
    })
    if(noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

//generate DOM structure for note
const generateNoteDOM = function(note) {
    const divElem = document.createElement('div')
    const noteElem = document.createElement('a')
    const deleteBtn = document.createElement('button')
    
    deleteBtn.textContent = 'x'
    divElem.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', function(){
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
const sortNotes = function(notes, sort) {
    if(sort === 'lastEdited') {
        return notes.sort(function(a,b) {
            if(a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if(sort === 'recentlyCreated') {
        return notes.sort(function(a,b) {
            if(a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if(sort === 'alpha') {
        return notes.sort(function(a,b) {
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
const renderNotes = function(notes, filters) {
    const newNotes = sortNotes(notes, filters.sortBy)
    const filteredNotes = newNotes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    }) 
    document.querySelector('#notes').innerHTML=''
    filteredNotes.forEach(function(note) {
        const noteElem = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteElem)
    })
} 

//save the notes to LS
const saveNotes = function(notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//generate last updated
const lastUpdated = function(timeStamp) {
    return `Last edited: ${moment(timeStamp).fromNow()}`
}