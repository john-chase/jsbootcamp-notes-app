'use strict'

const titleElem = document.querySelector('#note-title')
const bodyElem = document.querySelector('#note-body')
const dateElem = document.querySelector('#edited')
const removeBtn = document.querySelector('#remove-note')
const doneBtn = document.querySelector('#done')
const id = location.hash.substring(1)

let notes = getSavedNotes()
let note = notes.find(function(note) {
    return note.id === id
})
if(!note) { //note === undefined
    location.assign('/index.html')
}

titleElem.value = note.title
bodyElem.value = note.body
dateElem.textContent = lastUpdated(note.updatedAt)
console.log(dateElem.value)

titleElem.addEventListener('input', function(e) {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElem.textContent = lastUpdated(note.updatedAt)
    saveNotes(notes)
})

bodyElem.addEventListener('input', function(e) {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElem.textContent = lastUpdated(note.updatedAt)
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

//update LS
window.addEventListener('storage', function(e) {
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue)
    } 
    //dup code
    note = notes.find(function(note) {
        return note.id === id
    })
    if(!note) {
        location.assign('/index.html')
    }
    titleElem.value = note.title
    bodyElem.value = note.body 
    dateElem.textContent = lastUpdated(note.updatedAt)  
})