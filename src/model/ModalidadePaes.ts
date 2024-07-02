//CONTADOR QUE GERA O ID CONTÍNUO
let contadorID:number = 0

export class Pao{
    id: number;
    nome: string;
    vegano: boolean;
    
    constructor(nome: string, vegano: boolean){
        this.id = this.gerarId();
        this.nome = nome;
        this.vegano = vegano;
    }

    private gerarId(): number{
        contadorID += 1
        return contadorID;
    }

    get getNome():string{
        return this.nome;
    }

    set setNome(nome:string){
        this.nome = nome;
    }

    get getVegano():boolean{
        return this.vegano;
    }

    set setVegano(vegano:boolean){
        this.vegano = vegano;
    }
}