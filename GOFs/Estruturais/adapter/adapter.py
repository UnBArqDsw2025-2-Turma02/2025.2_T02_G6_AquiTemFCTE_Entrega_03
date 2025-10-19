from datetime import date
from enum import Enum

class StatusEnum(Enum):
    DISPONIVEL = "Disponível"
    INDISPONIVEL = "Indisponível"


class CategoriaEnum(Enum):
    ELETRONICO = "Aparelho Eletrônico"
    LIVRO = "Livro"
    ROUPA = "Roupa"
    MOVEL = "Móvel"
    IMOVEL = "Imóvel"
    OUTROS = "Outros"


class ModalidadeEnum(Enum):
    VENDA = "Venda"
    TROCA = "Troca"
    ALUGUEL = "Aluguel"
    VENDA_TROCA = "Venda/Troca"


class EstadoEnum(Enum):
    NOVO = "Novo"
    USADO = "Usado"


class Produto:
    def __init__(self, id_produto: int, nome: str, preco: float, descricao: str,
                 categoria: CategoriaEnum, modalidade: ModalidadeEnum, estado: EstadoEnum):
        self.id_produto = id_produto
        self.nome = nome
        self.preco = preco
        self.descricao = descricao
        self.categoria = categoria
        self.modalidade = modalidade
        self.estado = estado
        self.imagens = []

    def adicionar_imagem(self, url: str):
        self.imagens.append(url)

    def remover_imagem(self, url: str):
        if url in self.imagens:
            self.imagens.remove(url)

    def obter_dados(self):
        return {
            "id": self.id_produto,
            "nome": self.nome,
            "preco": self.preco,
            "descricao": self.descricao,
            "categoria": self.categoria.value,
            "modalidade": self.modalidade.value,
            "estado": self.estado.value,
            "imagens": self.imagens
        }


class Aluno:
    def __init__(self, nome: str, matricula: int, email: str, telefone: str, senha: str,
                 foto_perfil: str = "", sobre_mim: str = ""):
        self.nome = nome
        self.matricula = matricula
        self.email = email
        self.telefone = telefone
        self.senha = senha
        self.foto_perfil = foto_perfil
        # self.comprovante_matricula = comprovante_matricula 
        self.sobre_mim = sobre_mim
        self.produtos_publicados = []

    def mudar_senha(self, nova_senha):
        self.senha = nova_senha

    def editar_sobre_mim(self, texto: str):
        self.sobre_mim = texto

    def obter_nome(self):
        return self.nome

    def obter_matricula(self):
        return self.matricula

    def obter_telefone(self):
        return self.telefone


class Publicacao:
    def __init__(self, produto: Produto, dono: Aluno, status: StatusEnum = StatusEnum.DISPONIVEL):
        self.produto = produto
        self.dono = dono
        self.status = status
        self.data_publicacao = date.today()

    def obter_status(self):
        return self.status

    def obter_dono(self):
        return self.dono

    def obter_produto(self):
        return self.produto

    def mudar_status(self, novo_status: StatusEnum):
        self.status = novo_status

class Aluguel:
    def __init__(self, endereco: str, valor_mensal: float, condominio: float, metragem: float, quartos: int):
        self.endereco = endereco
        self.valor_mensal = valor_mensal
        self.condominio = condominio
        self.metragem = metragem
        self.quartos = quartos

    def calcular_valor_total(self):
        return self.valor_mensal + self.condominio


class AdapterAluguel(Produto):
    def __init__(self, aluguel: Aluguel):
        valor_total = aluguel.calcular_valor_total()
        descricao = f"{aluguel.metragem}m² - Condomínio: R${aluguel.condominio:.2f} - Número de quartos: {aluguel.quartos}"
        super().__init__(
            id_produto=999,
            nome=f"Imóvel em {aluguel.endereco}",
            preco=valor_total,
            descricao=descricao,
            categoria=CategoriaEnum.IMOVEL,
            modalidade=ModalidadeEnum.ALUGUEL,
            estado=EstadoEnum.USADO
        )
        self.aluguel = aluguel



if __name__ == "__main__":

    aluno = Aluno(
        nome="Zoe",
        matricula=231011111,
        email="231011111@aluno.unb.br",
        telefone="99999-9999",
        senha="1234"
    )

    aluguel1 = Aluguel("QNL 18 conjunto F casa 21", 900.0, 200.0, 45.0, 3)
    aluguel_adapter = AdapterAluguel(aluguel1)
    pub = Publicacao(aluguel_adapter, aluno)
    print(pub.obter_dono().nome)
    print(pub.obter_produto().obter_dados())
