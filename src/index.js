import {createNote} from './notes'
import {setFilters} from './filters'
import {renderNotes} from './views'

//Object template 
// const notes = [{
//         id: uuidv4(), 
//         title: 'My next trip',
//         body: 'I would love to go to India',
//         createdAt: '',
//         updatedAt: ''
//     }] 

//read - initial note generation
renderNotes() 

//create
document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = createNote()
    location.assign(`edit.html#${id}`)
})

//read - filter applied
document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderNotes()
})

document.querySelector('#filter').addEventListener('change', (e) => {
    setFilters({
        sortBy:  e.target.value
    })
    renderNotes()
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        renderNotes()
    } 
})