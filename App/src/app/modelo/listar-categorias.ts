import * as moment from "moment";


export class ListarCategorias {
    tipo: string = '';

    constructor(init?: Partial<ListarCategorias>) {
        Object.assign(this, init);
    }
}