const express = require('express');
const {
  createRecord,
  deleteRecord,
  getRecord,
  getRecords,
  updateRecord,
} = require('../controllers/locationGroupsController');
const { authorizeAnyRoles, requireAuthentication } = require('../middleware/auth');


const router = express.Router();

router.use(requireAuthentication);

router.post('/', authorizeAnyRoles('superuser', 'admin'), createRecord);
router.get('/', authorizeAnyRoles('superuser', 'admin'), getRecords);
router.get('/:id', getRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);


module.exports = router;
