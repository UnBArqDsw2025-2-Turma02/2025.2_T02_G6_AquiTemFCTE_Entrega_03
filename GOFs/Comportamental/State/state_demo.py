# state_demo.py
"""
Demonstração do padrão de projeto State no contexto do sistema AquiTemFCTE.
Autor: Eric Rabelo & Algusto Caldas
Data: 23/10/2025

Descrição:
-----------
O programa simula o ciclo de vida de um produto dentro da plataforma AquiTemFCTE,
aplicando o padrão comportamental State. Cada estado define um comportamento distinto
para o produto e controla suas próprias transições válidas.

Estados possíveis:
- Disponível: o produto pode ser reservado.
- Reservado: o produto pode ser vendido ou voltar a ficar disponível.
- Vendido: estado final, nenhuma ação adicional é permitida.
"""

from abc import ABC, abstractmethod

# ======================================================
# Interface EstadoProduto
# ======================================================

class EstadoProduto(ABC):
    """Interface abstrata que define as ações possíveis sobre um produto."""

    def __init__(self, produto):
        self.produto = produto

    @abstractmethod
    def reservar(self):
        pass

    @abstractmethod
    def vender(self):
        pass

    @abstractmethod
    def cancelar(self):
        pass


# ======================================================
# Classe Contexto: Produto
# ======================================================

class Produto:
    """Contexto que mantém o estado atual e delega o comportamento."""

    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco
        self.estado = Disponivel(self)

    def set_estado(self, novo_estado):
        """Atualiza o estado atual do produto."""
        self.estado = novo_estado

    # Delegação de ações
    def reservar(self):
        self.estado.reservar()

    def vender(self):
        self.estado.vender()

    def cancelar(self):
        self.estado.cancelar()

    def exibir_status(self):
        print(f"📦 Produto: {self.nome} | Estado atual: {self.estado.__class__.__name__}")


# ======================================================
# Estados Concretos
# ======================================================

class Disponivel(EstadoProduto):
    def reservar(self):
        print(f"✅ O produto '{self.produto.nome}' foi reservado com sucesso!")
        self.produto.set_estado(Reservado(self.produto))

    def vender(self):
        print(f"⚠️ Não é possível vender diretamente. É necessário reservar antes.")
    
    def cancelar(self):
        print(f"ℹ️ O produto '{self.produto.nome}' já está disponível.")


class Reservado(EstadoProduto):
    def reservar(self):
        print(f"⚠️ O produto '{self.produto.nome}' já está reservado.")
    
    def vender(self):
        print(f"💰 O produto '{self.produto.nome}' foi vendido!")
        self.produto.set_estado(Vendido(self.produto))
    
    def cancelar(self):
        print(f"↩️ A reserva do produto '{self.produto.nome}' foi cancelada. Voltou a ficar disponível.")
        self.produto.set_estado(Disponivel(self.produto))


class Vendido(EstadoProduto):
    def reservar(self):
        print(f"❌ O produto '{self.produto.nome}' já foi vendido. Não é possível reservá-lo.")
    
    def vender(self):
        print(f"❌ O produto '{self.produto.nome}' já foi vendido anteriormente.")
    
    def cancelar(self):
        print(f"❌ O produto '{self.produto.nome}' já foi vendido. A venda não pode ser cancelada.")


# ======================================================
# Demonstração Interativa
# ======================================================

def menu():
    print("\n=== Sistema de Demonstração do Padrão State ===")
    print("1 - Reservar produto")
    print("2 - Vender produto")
    print("3 - Cancelar ação atual")
    print("4 - Exibir estado atual")
    print("0 - Sair")
    print("===============================================")


def main():
    produto = Produto("Livro de Engenharia de Software", 59.90)
    print(f"\n🛒 Produto criado: {produto.nome} (R$ {produto.preco})")
    produto.exibir_status()

    while True:
        menu()
        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            produto.reservar()
        elif opcao == "2":
            produto.vender()
        elif opcao == "3":
            produto.cancelar()
        elif opcao == "4":
            produto.exibir_status()
        elif opcao == "0":
            print("Encerrando demonstração. 👋")
            break
        else:
            print("❌ Opção inválida! Tente novamente.")


if __name__ == "__main__":
    main()
