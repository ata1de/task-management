import { z } from 'zod';

export const TarefaSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().optional(),
  status: z.enum(['pendente', 'realizando', 'concluída']),
  data_vencimento: z.string().datetime().optional()
});

export const TarefaSchemaStatus = z.object({
  status: z.enum(['pendente', 'realizando', 'concluída'])
});

export type TarefaInput = z.infer<typeof TarefaSchema>;
export type TarefaInputStatus = z.infer<typeof TarefaSchemaStatus>;
