const fs =require('fs')
const chalk =require('chalk')
const getNotes = function(){
    return "Your notes..."
}

const addNotes =(title, body)=>{
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note)=>note.title === title)
    const duplicateNote = notes.find((note)=>{
        note.title===title
    })
    // const duplicateNotes = notes.filter(function(note){
    //     return note.title === title
    // })
   // console.log(duplicateNotes)
    if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('new note added'))

    }
    else{
        console.log(chalk.red.inverse('note title taken'))
    }
    
}

const removeNotes = (title)=>{
     const notes = loadNotes()
     const notesToKeep=notes.filter((note)=>note.title!==title)
     if(notes.length>notesToKeep.length){
        console.log(chalk.green.inverse('note removed!'))
        saveNotes(notesToKeep)
     }
     else{
        console.log(chalk.red.inverse('no note found!'))
     }
     
}

const listNotes = ()=>{
    const notes = loadNotes()
     console.log(chalk.inverse('your notes'))
    notes.forEach((note)=>{
        console.log(note.title)
    })
    // notes.forEach(function(note){

    // })
}
const readNotes= (title)=>{
   const notes=loadNotes()
   console.log('reading notes')
   const note = notes.find((note)=> note.title===title)
   if(note){
    console.log(chalk.inverse(note.title))
    console.log(note.body)
   }else{
    console.log(chalk.inverse.red('note not found'))
   }
}
const saveNotes = (notes)=>{
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}
const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }
    catch(e){
        return []
    }
   
}
module.exports = {
    getNotes: getNotes,
    addNotes:addNotes,
    removeNotes:removeNotes,
    listNotes:listNotes,
    readNotes:readNotes
}