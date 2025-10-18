import Categoria from "./class/Categoria";
import ProdutoVenda from "./class/ProdutoVenda";

function main() {
  console.log("=== Demonstração do Padrão Composite - AquiTemFCTE ===\n");

  // Criando a categoria principal "Livros"
  const categoriaLivros = new Categoria("Livros");

  // Criando subcategorias dentro de "Livros"
  const categoriaCalculo = new Categoria("Cálculo");
  const categoriaEletronica = new Categoria("Eletrônica");

  // Criando produtos (anúncios) para a categoria Cálculo
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

  // Adicionando produtos à categoria Cálculo
  categoriaCalculo.adicionarProduto(livroGuidorizzi);
  categoriaCalculo.adicionarProduto(livroStewart);

  // Criando produto para a categoria Eletrônica (dentro de Livros)
  const protoboard = new ProdutoVenda(
    "Protoboard usada",
    "Protoboard em bom estado de conservação"
  );
  protoboard.setPreco(25.0);

  categoriaEletronica.adicionarProduto(protoboard);

  // Criando produto direto na categoria Livros
  const vadeMecum = new ProdutoVenda(
    "Vade Mecum 2025",
    "Vade Mecum atualizado para 2025"
  );
  vadeMecum.setPreco(80.0);

  // Adicionando subcategorias e produto à categoria principal Livros
  categoriaLivros.adicionarProduto(categoriaCalculo);
  categoriaLivros.adicionarProduto(categoriaEletronica);
  categoriaLivros.adicionarProduto(vadeMecum);

  // Criando a categoria "Eletrônicos" (separada de Livros)
  const categoriaEletronicos = new Categoria("Eletrônicos");

  // Criando produtos para a categoria Eletrônicos
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

  // Adicionando produtos à categoria Eletrônicos
  categoriaEletronicos.adicionarProduto(multimetro);
  categoriaEletronicos.adicionarProduto(kitResistores);

  // Exibindo a estrutura hierárquica
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

  // Demonstrando o padrão Composite em ação
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

// Executando a demonstração
main();
