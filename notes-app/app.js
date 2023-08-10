const chalk = require('chalk')
const validator = require('validator')
const notes = require('./notes')
const yargs = require('yargs')


//create add command
yargs.command({
    command:'add',
    describe:'add a new note',
    builder:{
      title:{
        describe:'note title',
        demandOption:true,
        type:'string',
      },
      body:{
        describe:'notes body',
        demandOption: true,
        type:"string",
      }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command:'remove',
    describe:'remove a note',
    builder:{
       title:{
        describe:'note title',
        demandOption:true,
        type:'string',
       }
    },
    handler(argv){
        notes.removeNotes(argv.title)
    }
})
// create list command
yargs.command({
    command:'list',
    describe:'list of notes',
    handler(){
        notes.listNotes()
    }
})

// create read command
yargs.command({
    command:'read',
    describe:'reading notes',
    builder:{
       title:{
        describe:'read title',
        demandOption:true,
        type:'string',
       }
    },
    handler(argv){
        notes.readNotes(argv.title)
    }
})


console.log(yargs.argv)
