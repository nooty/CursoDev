

export class Movimento {
    id: number = 0;
    descricao: string = '';
    data: Date = new Date();
    valor: number = 0;

    categoriaTipo: string = 'Receita';
    categoriaDescricao: string = '';
    categoriaId: number = 0;

    constructor(init?: Partial<Movimento>) {
        Object.assign(this, init);
    }
}