import { Router } from "express";
import authenticate from "../helpers/Authenticate";
import ImagesControllers from "../Controllers/ImagesControllers";
import ImagesUpload from "../helpers/ImagesUpload";
const router = Router();

router.post(
  "/add",
  authenticate,
  ImagesUpload.single("image"),
  ImagesControllers.addImage
);

export default router;
