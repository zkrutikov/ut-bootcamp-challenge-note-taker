const express = require("express");
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    console.log(note);
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  readNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      if (notes) {
        parsedNotes = [].concat(JSON.parse(notes));
      } else {
        parsedNotes = [];
      }
      console.log("parsed notes", parsedNotes);
      return parsedNotes;
    });
  }

  addNotes(note) {
    console.log(note);
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Title or text can not be blank!");
    }
    const newNote = { title, text, id: uuidv4() };
    return this.readNotes()
      .then((notes) => {
        console.log(notes);
        return [...notes, newNote];
      })
      .then((updatedNotes) => {
        console.log("addNote here", updatedNotes);
        console.log(this.write);
        return this.write(updatedNotes);
      })
      .then(() => {
        return newNote;
      });
  }

  deleteNotes(id) {
    return this.readNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then ((filteredNotes) => this.write(filteredNotes))
  }
}

module.exports = new Store();
