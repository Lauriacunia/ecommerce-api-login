import { Router } from 'express';
import productosRouter from './ProductosRoutes.js';
import carritosRouter from './CarritosRoutes.js';
import registroRouter from './RegistroRoutes.js';
import loginRouter from './LoginRoutes.js';
import logoutRouter from './LogoutRoutes.js';
import passport from 'passport';

const apiRouter = Router();

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {  // Si esta autenticado sigue con la ejecucion que queremos
        return next();
    }
    res.redirect('/login');
}

apiRouter.use('/registro', registroRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/productos', productosRouter);
apiRouter.use('/carritos', carritosRouter);
apiRouter.use('/logout', logoutRouter);


export default apiRouter;