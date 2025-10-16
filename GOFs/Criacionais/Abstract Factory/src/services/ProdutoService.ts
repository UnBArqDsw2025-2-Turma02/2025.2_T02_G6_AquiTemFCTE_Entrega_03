import { Router, Request, Response } from "express";
import AbstractProdutoFactory from "../factories/interfaces/AbstractProdutoFactory";
import EletronicoFactory from "../factories/concrete/EletronicoFactory";
import VestuarioFactory from "../factories/concrete/VestuarioFactory";

const router = Router();

export default class ProdutoService {
    public router: Router;

    constructor() {
        this.router = router;
        this.configurarRotas();
    }

    private configurarRotas(): void {
        this.router.post("/produto", (req: Request, res: Response): void => {
            try {
                const { nome, descricao, preco, categoria } = req.body;

                let factory: AbstractProdutoFactory;

                // Seleciona a fábrica com base na categoria
                if (categoria === "Eletrônicos") {
                    factory = new EletronicoFactory();
                } else if (categoria === "Vestuário") {
                    factory = new VestuarioFactory();
                } else {
                    res.status(400).send({ error: "Categoria de produto inválida ou não suportada." });
                    return;
                }

                // Usa a fábrica para criar a família de produtos
                const produto = factory.criarProduto(nome, descricao, preco);
                const acessorio = factory.criarAcessorio();

                res.status(201).send({ produto, acessorio });

            } catch (error) {
                res.status(500).send({ error: "Erro interno no servidor." });
            }
        });
    }
}