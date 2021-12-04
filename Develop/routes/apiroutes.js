const store = require('../db/store');
const router = require('express').Router();

router.get('/notes', (req, res)=> {

    store.readNotes()
    .then (function(notes){
    return res.json(notes);
    })
    .catch (function(err){
    return res.status(500).json(err);
    })
})


// Define post and delete methods

module.exports = router;
