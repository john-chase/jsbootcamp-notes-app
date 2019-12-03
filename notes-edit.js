const titleElem = document.querySelector('#note-title')
const bodyElem = document.querySelector('#note-body')
const removeBtn = document.querySelector('#remove-note')
const doneBtn = document.querySelector('#done')
const id = location.hash.substring(1)
const notes = getSavedNotes()
const note = notes.find(function(note) {
    return note.id === id
})
if(note === undefined) {
    location.assign('/index.html')
}

titleElem.value = note.title
bodyElem.value = note.body

titleElem.addEventListener('input', function(e) {
    note.title = e.target.value
    saveNotes(notes)
})

bodyElem.addEventListener('input', function(e) {
    note.body = e.target.value
    saveNotes(notes)
})

removeBtn.addEventListener('click', function(e) {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')    
})

doneBtn.addEventListener('click', function(e) {
    location.assign('/index.html')    
})