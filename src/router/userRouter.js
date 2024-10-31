import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser,loginUser,refreshToken ,authenticateJWT} from '../controller/userController.js';

const router = express.Router();

router.get('/users',authenticateJWT, getAllUsers);            
router.get('/users/:id', getUserById);         
router.post('/users', createUser);            
router.put('/users/:id', updateUser);         
router.delete('/users/:id', deleteUser);   
router.post('/login', loginUser);    
router.post("/refreshToken", refreshToken);

export default router;

