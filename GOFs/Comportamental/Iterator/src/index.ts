import { CatalogoFCTE } from "./collections/CatalogoFCTE";
import { Produto } from "./models/Produto";

const catalogo = new CatalogoFCTE();

const produto1 = new Produto("Notebook Dell", "Notebook em bom estado");
produto1.setPreco(2500);
produto1.setModalidade("Venda");
produto1.setImagem(["notebook1.jpg", "notebook2.jpg"]);
produto1.setEstado(true);

const produto2 = new Produto("iPhone 12", "iPhone seminovo");
produto2.setPreco(3000);
produto2.setModalidade("Venda");
produto2.setImagem(["iphone1.jpg"]);
produto2.setEstado(true);

const produto3 = new Produto("Livro de Cálculo", "Livro para troca");
produto3.setPreco(0);
produto3.setModalidade("Troca");
produto3.setImagem(["livro1.jpg"]);
produto3.setEstado(true);

catalogo.adicionarProduto(produto1);
catalogo.adicionarProduto(produto2);
catalogo.adicionarProduto(produto3);

const iterator = catalogo.criarIterator();

console.log("=== Iterando sobre o catálogo de produtos ===\n");

while (iterator.hasNext()) {
    const produto = iterator.next();
    produto.getDados();
    console.log("---");
}
