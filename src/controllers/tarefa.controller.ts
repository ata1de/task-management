import { Request, Response } from 'express';
import { TarefaService } from '../services/tarefa.service';
import { TarefaSchema, TarefaSchemaStatus } from '../schemas/tarefa.schema';

const tarefaService = new TarefaService();

export class TarefaController {
  async criar(req: Request, res: Response) {
    try {
      const validacao = TarefaSchema.safeParse(req.body);

      if (!validacao.success) {
        return res.status(400).json({ errors: validacao.error.errors });
      }

      const tarefa = await tarefaService.criar(validacao.data);
      return res.status(201).json(tarefa);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const { status } = req.query;
      const tarefas = await tarefaService.listarTodas(status as string);
      return res.json(tarefas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const tarefa = await tarefaService.buscarPorId(id);

      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      return res.json(tarefa);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async buscarPorStatus(req: Request, res: Response) {
    try {
      const status = req.params.status;
      const validacao = TarefaSchemaStatus.safeParse(req.body);

      if (!validacao.success) {
        return res.status(400).json({ errors: validacao.error.errors });
      }

      const tarefa = await tarefaService.buscarPorStatus(status);

      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      return res.json(tarefa);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const validacao = TarefaSchema.partial().safeParse(req.body);

      if (!validacao.success) {
        return res.status(400).json({ errors: validacao.error.errors });
      }

      const tarefa = await tarefaService.atualizar(id, validacao.data);
      return res.json(tarefa);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await tarefaService.deletar(id);
      return res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}