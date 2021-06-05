

export class Par {
    X: string = '';
    Y: number = 0;

    constructor(init?: Partial<Par>) {
        Object.assign(this, init);
    }
}

export class Grafico {
    serieReceita: Par[] = [];
    serieDespesa: Par[] = [];

    constructor(init?: Partial<Grafico>) {
        Object.assign(this, init);
    }
}