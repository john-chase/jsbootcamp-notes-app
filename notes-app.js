const notes = getSavedNotes()
// const notes = [{
//         id: uuidv4(), 
//         title: 'My next trip',
//         body: 'I would love to go to India',
//     }]
const filters = {
    searchText: ''
}   

//create
document.querySelector('#create-note').addEventListener('click', function(e) {
    console.log(e.target)
    notes.push({
        id: uuidv4(),
        title: '',
        body: ''
    })
    saveNotes(notes)
    renderNotes(notes, filters)
})

//read - initial note generation
renderNotes(notes, filters) 

//read - filter applied
document.querySelector('#search-text').addEventListener('input', function(e) {
    filters.searchText = e.target.value
    renderNotes(notes,filters)
})
document.querySelector('.filter').addEventListener('change', function(e) {
    console.log('select changed: ', e.target.value)
})