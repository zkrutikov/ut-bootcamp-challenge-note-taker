const e = require('express');
const fs = require('fs');
const util = require('util');
const {v4: uuidv4} = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read(){
    return readFileAsync('./db/db.json', 'utf8');
    }

    write(note){
    return writeFileAsync('./db/db.json', JSON.stringify(note));
    }

    readNotes(){
    return this.read()
    .then (function(notes){
    let parsedNotes;
    if (notes) {
        parsedNotes = [].concat(JSON.parse(notes));
    }
    else {
    parsedNotes = [];
    }
    return parsedNotes;
    })

    }

    addNotes(note){
    const {title, text} = note;
    if (!title || !text) {
        throw new Error('Title or text can not be blank!')
    }
    const newNote = {title, text, id: uuidv4()}
    return this.readNotes()
    .then (function(notes) {
        return [...notes, newNote]
    })
    .then (function(updatedNotes){
        return this.write(updatedNotes);
    })
    .then (function(){
        return newNote;
    })
    }

    deleteNotes(id){
    return this.readNotes()
    .then (function(notes){
    notes.filter(function(note){
    return note.id !== id; 
    })
    })
    .then (function(updatedNotes){
        return this.write(updatedNotes);
    })
    }
}

module.exports = new Store();