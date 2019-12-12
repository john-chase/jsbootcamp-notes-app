import {initEditPage, lastUpdated} from './views'
import {updateNote, removeNote} from './notes'

const titleElem = document.querySelector('#note-title')
const bodyElem = document.querySelector('#note-body')
const removeBtn = document.querySelector('#remove-note')
const dateElem = document.querySelector('#edited')
const doneBtn = document.querySelector('#done')
const id = location.hash.substring(1)

initEditPage(id) 

titleElem.addEventListener('input', function(e) {
    const note = updateNote(id, {
        title: e.target.value
    })
    dateElem.textContent = lastUpdated(note.updatedAt)
})

bodyElem.addEventListener('input', function(e) {
    const note = updateNote(id, {
        body: e.target.value
    })
    dateElem.textContent = lastUpdated(note.updatedAt)
})

removeBtn.addEventListener('click', function(e) {
    removeNote(id)
    location.assign('index.html')    
})

doneBtn.addEventListener('click', function(e) {
    location.assign('index.html')    
})

//update LS
window.addEventListener('storage', function(e) {
    if(e.key === 'notes') {
        initEditPage(id)
    }
})