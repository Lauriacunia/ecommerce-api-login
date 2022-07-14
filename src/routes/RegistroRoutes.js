import { Router } from 'express';
import passport from 'passport';
const router = Router();


router.get('/', (req, res) => {
    res.json({message: 'registro'});
});
// router.post('/registro', passport.authenticate('registro', {
//     successRedirect: '/login',
//     failureRedirect: '/errorRegistro', 
// }));

export default router;