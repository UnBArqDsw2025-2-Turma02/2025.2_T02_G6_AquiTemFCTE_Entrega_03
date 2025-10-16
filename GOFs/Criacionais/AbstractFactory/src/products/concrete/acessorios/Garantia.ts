import InterfaceAcessorio from "../../interfaces/InterfaceAcessorio";

export default class Garantia implements InterfaceAcessorio {
    nome: string = "Garantia Estendida";
    descricao: string = "Cobertura de 12 meses para defeitos de fabricação.";
}