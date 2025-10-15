import IAcessorio from "../../interfaces/IAcessorio";

export default class TabelaDeMedidas implements IAcessorio {
    public nome: string = "Tabela de Medidas";
    public descricao: string = "Guia de tamanhos padrão (P, M, G, GG) para este item.";
}