import { Request, Response } from 'express';
import { ContenedorService } from '../services/contenedor.service';

const service = new ContenedorService();

export class ContenedorController {

    async getAll(req: Request, res: Response) {
        const data = await service.getAll();
        return res.json(data);
    }

    async getById(req: Request, res: Response) {
        const data = await service.getById(Number(req.params.id));
        return res.json(data);
    }

    async create(req: Request, res: Response) {
        try {
            const data = await service.create(req.body);
            return res.status(201).json(data);
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const data = await service.update(
                Number(req.params.id),
                req.body
            );

            return res.json(data);
        } catch (error: any) {
            return res.status(409).json({
                message: error.message,
            });
        }
    }
}