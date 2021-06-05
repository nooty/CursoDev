import * as moment from "moment";


export class ListarMovimentos {
    dataInicial: Date;
    dataFinal: Date;

    constructor(init?: Partial<ListarMovimentos>) {
        this.dataInicial = moment().add(-4, 'month').toDate();
        this.dataFinal = moment().toDate();

        Object.assign(this, init);
    }
}