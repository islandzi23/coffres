const express = require('express');

const {
  createSafe,
  getSafes,
  getSafe,
  deleteSafe,
  addItems,
  removeItems
} = require('../controllers/safeController');

const router = express.Router();

router.post('/safe', createSafe);
router.get('/safe', getSafes);
router.get('/safe/:id', getSafe);
router.delete('/safe/:id', deleteSafe)
router.post('/safe/:id/addItems', addItems)
router.post('/safe/:id/removeItems', removeItems)

module.exports = {
    routes: router
}
