

export class Categoria {
    id: number = 0;
    tipo: string = '';
    descricao: string = '';

    constructor(init?: Partial<Categoria>) {
        Object.assign(this, init);
    }
}