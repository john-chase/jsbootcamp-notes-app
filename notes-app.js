'use strict'

let notes = getSavedNotes()
//Object template 
// const notes = [{
//         id: uuidv4(), 
//         title: 'My next trip',
//         body: 'I would love to go to India',
//         createdAt: '',
//         updatedAt: ''
//     }]
const filters = {
    searchText: '',
    sortBy: 'lastEdited'
}   

//create
document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = uuidv4()
    const now = moment().valueOf()
    notes.push({
        id,
        title: '',
        body: '',
        createdAt: now,
        updatedAt: now
    })
    saveNotes(notes)
    location.assign(`/edit.html#${id}`)
})

//read - initial note generation
renderNotes(notes, filters) 

//read - filter applied
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes,filters)
})

document.querySelector('#filter').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes,filters)
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue)
    } 
    renderNotes(notes,filters)
})
