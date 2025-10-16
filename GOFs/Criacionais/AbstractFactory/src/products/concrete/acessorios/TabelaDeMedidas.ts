import InterfaceAcessorio from "../../interfaces/InterfaceAcessorio";

export default class TabelaDeMedidas implements InterfaceAcessorio {
    public nome: string = "Tabela de Medidas";
    public descricao: string = "Guia de tamanhos padrão (P, M, G, GG) para este item.";
}