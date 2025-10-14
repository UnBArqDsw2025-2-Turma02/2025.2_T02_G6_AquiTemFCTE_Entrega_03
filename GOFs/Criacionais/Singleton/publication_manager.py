from typing import List


class PublicacaoManager:
  
    _instancia = None

    def __new__(cls):
        if cls._instancia is None:
            cls._instancia = super(PublicacaoManager, cls).__new__(cls)
            cls._instancia._publicacoes = []  # lista interna de publicações
        return cls._instancia

    def adicionar_publicacao(self, publicacao):
        self._publicacoes.append(publicacao)

    def remover_publicacao(self, publicacao):
        if publicacao in self._publicacoes:
            self._publicacoes.remove(publicacao)
            return True 
        return False

    def buscar_por_aluno(self, dono):
        return [p for p in self._publicacoes if getattr(p, "dono", None) == dono]

    def listar_publicacoes(self):
        return list(self._publicacoes)



