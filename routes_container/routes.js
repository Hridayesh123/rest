const express =  require('express');
const router = express.Router();
const client =  require('../config/db');
const { getUsers, getById, createUser, updateUser, deleteUser } = require('../function_container/functions');

router.get('/', getUsers);

router.get('/:id', getById);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;