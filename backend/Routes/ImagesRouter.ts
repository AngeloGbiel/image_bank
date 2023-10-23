import { Router } from "express";
import authenticate from "../helpers/Authenticate";
import ImagesControllers from "../Controllers/ImagesControllers";
import ImagesUpload from "../helpers/ImagesUpload";
const router = Router();

router.get('/allimages', ImagesControllers.getAllImage)
router.post(
  "/add",
  authenticate,
  ImagesUpload.single("image"),
  ImagesControllers.addImage
);
router.get("/imageuser", authenticate, ImagesControllers.getImageByUser);

export default router;
