export class Funcionario{
    constructor(){
        this.id = 0,
        this.nome = '',
        this.foto = '',
        this.rg = '',
        this.sigla = '',
        this.departamentoId = 0 
    }
    id!: number;
    nome!: string;
    foto!: string;
    rg!: string;
    sigla!: string;
    departamentoId!: number;
}