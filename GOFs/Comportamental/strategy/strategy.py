from datetime import date
from enum import Enum
from abc import ABC, abstractmethod


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


class EstrategiaFiltro(ABC):
    @abstractmethod
    def filtrar(self, publicacoes):
        pass


class FiltroPorCategoria(EstrategiaFiltro):
    def __init__(self, categoria: CategoriaEnum):
        self.categoria = categoria

    def filtrar(self, publicacoes):
        return [p for p in publicacoes if p.produto.categoria == self.categoria]


class FiltroPorEstado(EstrategiaFiltro):
    def __init__(self, estado: EstadoEnum):
        self.estado = estado

    def filtrar(self, publicacoes):
        return [p for p in publicacoes if p.produto.estado == self.estado]


class FiltroPorStatus(EstrategiaFiltro):
    def __init__(self, status: StatusEnum):
        self.status = status

    def filtrar(self, publicacoes):
        return [p for p in publicacoes if p.status == self.status]


class FiltroPorPrecoMax(EstrategiaFiltro):
    def __init__(self, preco_max: float):
        self.preco_max = preco_max

    def filtrar(self, publicacoes):
        return [p for p in publicacoes if p.produto.preco <= self.preco_max]


class PublicacaoManager:
    _instancia = None

    def __new__(cls):
        if cls._instancia is None:
            cls._instancia = super(PublicacaoManager, cls).__new__(cls)
            cls._instancia._publicacoes = []
        return cls._instancia

    def adicionar_publicacao(self, publicacao: Publicacao):
        self._publicacoes.append(publicacao)

    def remover_publicacao(self, publicacao: Publicacao):
        if publicacao in self._publicacoes:
            self._publicacoes.remove(publicacao)
            return True
        return False

    def buscar_por_aluno(self, dono: Aluno):
        return [p for p in self._publicacoes if p.dono == dono]

    def listar_publicacoes(self):
        return list(self._publicacoes)

    # --- MÉTODO STRATEGY ---
    def filtrar_publicacoes(self, estrategia: EstrategiaFiltro):
        """Aplica uma estratégia de filtro sobre as publicações"""
        return estrategia.filtrar(self._publicacoes)
    






# --- Testbench ---
a1 =  aluno = Aluno(
        nome="Zoe",
        matricula=231011111,
        email="231011111@aluno.unb.br",
        telefone="99999-9999",
        senha="1234"
    )

a2 =  aluno = Aluno(
        nome="felix",
        matricula=231022222,
        email="231022222@aluno.unb.br",
        telefone="88888-8888",
        senha="12345"
    )


p1 = Produto(1, "Livro Python", 50, "Livro introdutório", CategoriaEnum.LIVRO, ModalidadeEnum.VENDA, EstadoEnum.NOVO)
p2 = Produto(2, "Notebook Dell", 2500, "Em ótimo estado", CategoriaEnum.ELETRONICO, ModalidadeEnum.VENDA, EstadoEnum.USADO)
p3 = Produto(3, "Camiseta Azul", 80, "Pouco usada", CategoriaEnum.ROUPA, ModalidadeEnum.TROCA, EstadoEnum.USADO)
p4 = Produto(4, "Livro Java", 40, "Novo", CategoriaEnum.LIVRO, ModalidadeEnum.VENDA, EstadoEnum.NOVO)


manager = PublicacaoManager()

pub1 = Publicacao(p1, a1, StatusEnum.DISPONIVEL)
manager.adicionar_publicacao(pub1)

pub2 = Publicacao(p2, a2, StatusEnum.INDISPONIVEL)
manager.adicionar_publicacao(pub2)

pub3 = Publicacao(p3, a1, StatusEnum.DISPONIVEL)
manager.adicionar_publicacao(pub3)

pub4 = Publicacao(p4, a2, StatusEnum.DISPONIVEL)
manager.adicionar_publicacao(pub4)





print("Filtrar por categoria LIVRO:")
for pub in manager.filtrar_publicacoes(FiltroPorCategoria(CategoriaEnum.LIVRO)):
    print(f"- {pub.produto.nome} ({pub.produto.estado.value})")

print("\niltrar por preço máximo <= 100:")
for pub in manager.filtrar_publicacoes(FiltroPorPrecoMax(100)):
    print(f"- {pub.produto.nome}: R${pub.produto.preco}")

print("\n Filtrar por estado USADO:")
for pub in manager.filtrar_publicacoes(FiltroPorEstado(EstadoEnum.USADO)):
    print(f"- {pub.produto.nome}")

print("\n Filtrar por status DISPONÍVEL:")
for pub in manager.filtrar_publicacoes(FiltroPorStatus(StatusEnum.DISPONIVEL)):
    print(f"- {pub.produto.nome}")

