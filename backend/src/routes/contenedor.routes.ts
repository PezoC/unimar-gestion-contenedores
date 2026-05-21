import { Router } from 'express';
import { ContenedorController } from '../controllers/contenedor.controller';

const router = Router();
const controller = new ContenedorController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);

export default router;