import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "registro" });
});
// router.post('/registro', passport.authenticate('registro', {
//     successRedirect: '/login',
//     failureRedirect: '/errorRegistro',
// }));
router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "registro" });
});

export default router;
