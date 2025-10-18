import Categoria from "./class/Categoria";
import ProdutoVenda from "./class/ProdutoVenda";

function main() {
  console.log("=== Demonstração do Padrão Composite - AquiTemFCTE ===\n");

  // CRIA CATEGORIA "LIVROS"
  const categoriaLivros = new Categoria("Livros");

  // CRIA SUBCATEGORIAS "CÁLCULO" E "ELETRÔNICA" DENTRO DE "LIVROS"
  const categoriaCalculo = new Categoria("Cálculo");
  const categoriaEletronica = new Categoria("Eletrônica");

  const livroGuidorizzi = new ProdutoVenda(
    "Livro do Guidorizzi",
    "Livro de Cálculo Diferencial e Integral do Guidorizzi"
  );
  livroGuidorizzi.setPreco(150.0);

  const livroStewart = new ProdutoVenda(
    "Livro do Stewart",
    "Livro de Cálculo do James Stewart"
  );
  livroStewart.setPreco(200.0);

  // ADICIONA PRODUTOS À SUBCATEGORIA CÁLCULO
  categoriaCalculo.adicionarCatalogo(livroGuidorizzi);
  categoriaCalculo.adicionarCatalogo(livroStewart);

  const protoboard = new ProdutoVenda(
    "Protoboard usada",
    "Protoboard em bom estado de conservação"
  );
  protoboard.setPreco(25.0);

  // ADICIONA PRODUTO À SUBCATEGORIA ELETRÔNICA
  categoriaEletronica.adicionarCatalogo(protoboard);

  const vadeMecum = new ProdutoVenda(
    "Vade Mecum 2025",
    "Vade Mecum atualizado para 2025"
  );
  vadeMecum.setPreco(80.0);

  // ADICIONA SUBCATEGORIAS E PRODUTO À CATEGORIA LIVROS
  categoriaLivros.adicionarCatalogo(categoriaCalculo);
  categoriaLivros.adicionarCatalogo(categoriaEletronica);
  categoriaLivros.adicionarCatalogo(vadeMecum);

  // CRIA A CATEGORIA "ELETRÔNICOS" (SEPARADA DE LIVROS)
  const categoriaEletronicos = new Categoria("Eletrônicos");

  const multimetro = new ProdutoVenda(
    "Multímetro",
    "Multímetro digital profissional"
  );
  multimetro.setPreco(120.0);

  const kitResistores = new ProdutoVenda(
    "Kit de resistores",
    "Kit com resistores de diversos valores"
  );
  kitResistores.setPreco(35.0);

  // ADICIONA PRODUTOS À CATEGORIA ELETRÔNICOS
  categoriaEletronicos.adicionarCatalogo(multimetro);
  categoriaEletronicos.adicionarCatalogo(kitResistores);

  console.log("📚 CATEGORIA: LIVROS");
  console.log("├── 🧮 Subcategoria: Cálculo");
  console.log("│   ├── 📖 Produto: Livro do Guidorizzi (Leaf)");
  console.log("│   └── 📖 Produto: Livro do Stewart (Leaf)");
  console.log("├── ⚡ Subcategoria: Eletrônica");
  console.log("│   └── 🔧 Produto: Protoboard usada (Leaf)");
  console.log("└── 📚 Produto: Vade Mecum 2025 (Leaf)");
  console.log("");
  console.log("💻 CATEGORIA: ELETRÔNICOS");
  console.log("├── 🔌 Produto: Multímetro (Leaf)");
  console.log("└── 🔧 Produto: Kit de resistores (Leaf)");
  console.log("\n" + "=".repeat(60) + "\n");

  // EXECUÇÃO DO COMPOSITE
  console.log("🔄 EXECUTANDO MÉTODO getDados() DA CATEGORIA LIVROS:");
  console.log(
    "(Demonstra o padrão Composite propagando a chamada para todos os elementos)\n"
  );
  categoriaLivros.getDados();

  console.log("\n" + "=".repeat(60) + "\n");

  console.log("🔄 EXECUTANDO MÉTODO getDados() DA CATEGORIA ELETRÔNICOS:");
  console.log(
    "(Demonstra o padrão Composite propagando a chamada para todos os elementos)\n"
  );
  categoriaEletronicos.getDados();
}

main();