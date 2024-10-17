const express = require('express');
const {
  createUser,
  createUserStatus,
  deleteUser,
  deleteUserStatus,
  getUser,
  getUserStatus,
  getUsers,
  getUsersStatus,
  getEmployeeLocations,
  updateUser,
  updateUserStatus,
} = require('../controllers/usersController');
const { authorizeAnyRoles, requireAuthentication } = require('../middleware/auth');


const router = express.Router();

router.use(requireAuthentication);

router.post('/', authorizeAnyRoles('superuser'), createUser);
router.get('/', authorizeAnyRoles('superuser', 'admin'), getUsers);

router.post('/status', authorizeAnyRoles('superuser'), createUserStatus);
router.get('/status', authorizeAnyRoles('superuser', 'admin'), getUsersStatus);
router.get('/status/:id', getUserStatus);
router.put('/status/:id', updateUserStatus);
router.delete('/status/:id', authorizeAnyRoles('superuser'), deleteUserStatus);

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', authorizeAnyRoles('superuser'), deleteUser);


module.exports = router;
