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

//render app notes
const renderNotes = function(notes, filters) {
    const filteredNotes = notes.filter(function(note){
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
