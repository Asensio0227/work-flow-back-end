const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizedPermissions
} = require('../middleware/authentication');

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
} = require("../controllers/UserController");


router
  .route('/')
  .get(authenticateUser,authorizedPermissions('admin'),getAllUsers);

router
  .route('/showMe')
  .get(authenticateUser,showCurrentUser);

router
  .route('/updateUser')
  .patch(authenticateUser,updateUser);
  
router
  .route('/updateUserPassword')
  .patch(authenticateUser,updateUserPassword);

  router
    .route('/:id')
    .get(authenticateUser,getSingleUser)

module.exports = router;