import { Router } from 'express';
import passport from 'passport';
const router = Router();

router.get('/', (req, res) => {
    res.json({message: 'logout'});
});

// router.post('/', passport.authenticate('login', {
//     successRedirect: '/info',
//     failureRedirect: '/login',
// }));

export default router;