import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "login" });
});

// router.post('/', passport.authenticate('login', {
//     //successRedirect: '/info',
//    // failureRedirect: '/login',
// }));

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "login" });
});

export default router;
