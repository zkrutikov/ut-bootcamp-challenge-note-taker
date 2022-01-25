const store = require("../db/store");
const router = require("express").Router();

router.get("/notes", (req, res) => {
  store
    .readNotes()
    .then(function (notes) {
      return res.json(notes);
    })
    .catch(function (err) {
      return res.status(500).json(err);
    });
});

// Define post and delete methods
router.post("/notes", (req, res) => {
  let note = req.body || {};
  store.addNotes(note).then(() => {
    console.log("this is res", res);
    return res.json(note);
  });
});

router.delete("/notes/:id", (req, res) => {
  console.log(req.id);
  store.deleteNotes(req.params.id).then(() => {
    return res.json(req.params.id);
  });
});

module.exports = router;
