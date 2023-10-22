import {Router} from 'express'
import UserController from '../Controllers/UserController';
import authenticate from '../helpers/Authenticate';
const router = Router()

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getuser',authenticate, UserController.getUser);

export default router;
