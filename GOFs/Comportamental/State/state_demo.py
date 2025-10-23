# state_demo.py
print(">>> Script iniciado <<<")

from abc import ABC, abstractmethod


class EstadoProduto(ABC):
    def __init__(self, produto):
        self.produto = produto

    @abstractmethod
    def reservar(self): pass

    @abstractmethod
    def vender(self): pass

    @abstractmethod
    def cancelar(self): pass


class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco
        self.estado = Disponivel(self)

    def set_estado(self, novo_estado):
        self.estado = novo_estado

    def reservar(self): self.estado.reservar()
    def vender(self): self.estado.vender()
    def cancelar(self): self.estado.cancelar()

    def exibir_status(self):
        print(f"📦 Produto: {self.nome} | Estado: {self.estado.__class__.__name__}")


class Disponivel(EstadoProduto):
    def reservar(self):
        print(f"✅ '{self.produto.nome}' reservado.")
        self.produto.set_estado(Reservado(self.produto))

    def vender(self):
        print("⚠️ Primeiro é necessário reservar antes de vender.")

    def cancelar(self):
        print("ℹ️ Já está disponível.")


class Reservado(EstadoProduto):
    def reservar(self):
        print("⚠️ Produto já está reservado.")

    def vender(self):
        print(f"💰 '{self.produto.nome}' vendido.")
        self.produto.set_estado(Vendido(self.produto))

    def cancelar(self):
        print("↩️ Reserva cancelada, produto disponível novamente.")
        self.produto.set_estado(Disponivel(self.produto))


class Vendido(EstadoProduto):
    def reservar(self):
        print("❌ Produto já vendido, não pode ser reservado.")

    def vender(self):
        print("❌ Produto já foi vendido.")

    def cancelar(self):
        print("❌ Venda não pode ser cancelada.")


def main():
    produto = Produto("Livro de Engenharia de Software", 59.90)
    produto.exibir_status()

    while True:
        print("\n1 - Reservar | 2 - Vender | 3 - Cancelar | 4 - Status | 0 - Sair")
        op = input("Escolha: ")

        if op == "1": produto.reservar()
        elif op == "2": produto.vender()
        elif op == "3": produto.cancelar()
        elif op == "4": produto.exibir_status()
        elif op == "0": break
        else: print("❌ Opção inválida.")


if __name__ == "__main__":
    main()
