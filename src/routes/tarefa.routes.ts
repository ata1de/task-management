import { Router, Request, Response, NextFunction } from 'express';
import { TarefaController } from '../controllers/tarefa.controller';

const router = Router();
const tarefaController = new TarefaController();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post('/tarefas', asyncHandler((req, res) => tarefaController.criar(req, res)));
router.get('/tarefas', asyncHandler((req, res) => tarefaController.listar(req, res)));
router.get('/tarefas/:id', asyncHandler((req, res) => tarefaController.buscarPorId(req, res)));
router.put('/tarefas/:id', asyncHandler((req, res) => tarefaController.atualizar(req, res)));
router.delete('/tarefas/:id', asyncHandler((req, res) => tarefaController.deletar(req, res)));

export default router;