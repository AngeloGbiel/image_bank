import {Router} from 'express'
import UserController from '../Controllers/UserController';
import authenticate from '../helpers/Authenticate';
import ImageUpload from '../helpers/imageUserEdit';
const router = Router()

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getuser',authenticate, UserController.getUser);
router.patch('/edituser/:id', authenticate, ImageUpload.single('image'), UserController.editUser)

export default router;
