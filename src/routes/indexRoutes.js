import { Router } from 'express';
import productosRouter from './ProductosRoutes.js';
import carritosRouter from './CarritosRoutes.js';

const apiRouter = Router();
apiRouter.use('/productos', productosRouter);
apiRouter.use('/carritos', carritosRouter);


export default apiRouter;