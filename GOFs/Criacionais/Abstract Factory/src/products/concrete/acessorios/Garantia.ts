import IAcessorio from "../../interfaces/IAcessorio";

export default class Garantia implements IAcessorio {
    nome: string = "Garantia Estendida";
    descricao: string = "Cobertura de 12 meses para defeitos de fabricação.";
}