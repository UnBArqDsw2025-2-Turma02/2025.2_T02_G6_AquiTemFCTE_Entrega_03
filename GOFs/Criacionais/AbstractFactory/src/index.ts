import express, { Application, Request, Response } from 'express';
import ProdutoService from './services/ProdutoService';

const app= express();
const PORT = 3001;
const produtoService = new ProdutoService();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", produtoService.router);

app.get('/api', (req: Request, res: Response) => {
    res.send('API "AquiTemFCTE" está no ar!');
});

app.listen(PORT, () => {
    console.log(`Servidor Abstract Factory rodando em http://localhost:${PORT}`);

    console.log(
        `\nUTILIZE O POSTMAN OU INSOMNIA PARA TESTAR A CRIAÇÃO DE FAMÍLIAS DE PRODUTOS:`
    );
    console.log(`- Endpoint: POST http://localhost:${PORT}/api/produto`);
    console.log(
        `- A fábrica a ser usada é decidida pelo campo "categoria" no corpo da requisição.\n`
    );

    console.log(
        'EXEMPLO 1: REQUISIÇÃO PARA CRIAR UM PRODUTO DA FAMÍLIA "ELETRÔNICOS" (BODY):\n' +
        '{\n' +
        '  "nome": "Monitor Gamer 4K",\n' +
        '  "descricao": "Monitor com 144Hz de taxa de atualização.",\n' +
        '  "preco": 2800.00,\n' +
        '  "categoria": "Eletrônicos"\n' +
        '}\n'
    );

    console.log(
        'EXEMPLO 2: REQUISIÇÃO PARA CRIAR UM PRODUTO DA FAMÍLIA "VESTUÁRIO" (BODY):\n' +
        '{\n' +
        '  "nome": "Jaqueta de Couro",\n' +
        '  "descricao": "Jaqueta de couro sintético, cor preta.",\n' +
        '  "preco": 350.50,\n' +
        '  "categoria": "Vestuário"\n' +
        '}\n'
    );
});