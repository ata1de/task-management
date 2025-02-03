import { PrismaClient } from '@prisma/client';
import { TarefaInput } from '../schemas/tarefa.schema';

const prisma = new PrismaClient();

export class TarefaService {
  async criar(data: TarefaInput) {
    return await prisma.tarefa.create({
      data: {
        ...data,
        data_vencimento: data.data_vencimento ? new Date(data.data_vencimento) : null
      }
    });
  }

  async listarTodas(status?: string) {
    if (status) {
      return await prisma.tarefa.findMany({
        where: { status }
      });
    }
    return await prisma.tarefa.findMany();
  }

  async buscarPorId(id: number) {
    return await prisma.tarefa.findUnique({
      where: { id }
    });
  }

  async buscarPorStatus(status: string) {
    return await prisma.tarefa.findMany({
      where: { status }
    });
  }

  async atualizar(id: number, data: Partial<TarefaInput>) {
    return await prisma.tarefa.update({
      where: { id },
      data: {
        ...data,
        data_vencimento: data.data_vencimento ? new Date(data.data_vencimento) : undefined
      }
    });
  }

  async deletar(id: number) {
    return await prisma.tarefa.delete({
      where: { id }
    });
  }
} 