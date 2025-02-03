# API de Gerenciamento de Tarefas

Uma API RESTful para gerenciamento de tarefas desenvolvida com Express.js, Prisma, SQLite e Zod.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Prisma (ORM)
- SQLite
- Zod (Validação)
- TypeScript

## Configuração do Projeto

1. Clone o repositório
2. Instale as dependências:

3. Configure o banco de dados:

4. Inicie o servidor:


## Rotas da API

### 1. Criar Tarefa
- **Rota**: POST `/tarefas`
- **Descrição**: Cria uma nova tarefa
- **Corpo da Requisição**:

- **Validações**:
  - `titulo`: String (obrigatório)
  - `descricao`: String (opcional)
  - `status`: Enum ["pendente", "realizando", "concluída"] (obrigatório)
  - `data_vencimento`: Data ISO (opcional)
- **Resposta de Sucesso**: 201 Created

### 2. Listar Todas as Tarefas
- **Rota**: GET `/tarefas`
- **Descrição**: Retorna todas as tarefas cadastradas
- **Parâmetros de Query**:
  - `status` (opcional): Filtra tarefas por status
- **Resposta de Sucesso**: 200 OK


### 3. Buscar Tarefa por ID
- **Rota**: GET `/tarefas/:id`
- **Descrição**: Retorna uma tarefa específica pelo ID
- **Parâmetros de URL**:
  - `id`: ID da tarefa (número)
- **Resposta de Sucesso**: 200 OK
- **Resposta de Erro**: 404 Not Found (tarefa não encontrada)

### 4. Buscar Tarefas por Status
- **Rota**: GET `/tarefas/:status`
- **Descrição**: Retorna tarefas filtradas por status
- **Parâmetros de URL**:
  - `status`: Status da tarefa ("pendente", "realizando", "concluída")
- **Validações**:
  - Status deve ser um dos valores permitidos
- **Resposta de Sucesso**: 200 OK
- **Resposta de Erro**: 400 Bad Request (status inválido)

### 5. Atualizar Tarefa
- **Rota**: PUT `/tarefas/:id`
- **Descrição**: Atualiza uma tarefa existente
- **Parâmetros de URL**:
  - `id`: ID da tarefa
- **Corpo da Requisição** (todos os campos são opcionais):

- **Validações**:
  - Mesmas validações da criação, mas todos os campos são opcionais
- **Resposta de Sucesso**: 200 OK
- **Resposta de Erro**: 404 Not Found (tarefa não encontrada)

### 6. Deletar Tarefa
- **Rota**: DELETE `/tarefas/:id`
- **Descrição**: Remove uma tarefa
- **Parâmetros de URL**:
  - `id`: ID da tarefa
- **Resposta de Sucesso**: 200 OK
- **Resposta de Erro**: 404 Not Found (tarefa não encontrada)

## Tratamento de Erros

A API implementa os seguintes códigos de status HTTP:

- `200`: Operação realizada com sucesso
- `201`: Recurso criado com sucesso
- `400`: Erro de validação nos dados enviados
- `404`: Recurso não encontrado
- `500`: Erro interno do servidor

## Validações

### Schema de Tarefa (Zod)
```
const TarefaSchema = z.object({
titulo: z.string().min(1, 'Título é obrigatório'),
descricao: z.string().optional(),
status: z.enum(['pendente', 'realizando', 'concluída']),
data_vencimento: z.string().datetime().optional()
});

```


```
const TarefaSchemaStatus = z.object({
status: z.enum(['pendente', 'realizando', 'concluída'])
});

```

## Estrutura do Banco de Dados
### Modelo Tarefa
```
model Tarefa {
id Int @id @default(autoincrement())
titulo String
descricao String?
status String
data_vencimento DateTime?
created_at DateTime @default(now())
updated_at DateTime @updatedAt
}
```


## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento
- `npm run build`: Compila o projeto TypeScript
- `npm start`: Inicia o servidor em modo de produção

## Considerações de Segurança

- A API implementa validação de dados com Zod
- Utiliza tratamento de erros assíncrono com middleware
- Implementa CORS para controle de acesso
- Validação de tipos com TypeScript

## Melhorias Futuras Sugeridas

1. Implementar autenticação e autorização
2. Adicionar paginação nas listagens
3. Implementar cache
4. Adicionar testes automatizados
5. Implementar logging