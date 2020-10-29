import { PedidoDetalle } from './pedido-detalle-model';

export class Pedido {
    usuarioID: string;
    mesaID: string;
    fechaInicio: string;
    fechaFin: string;
    estado: string;
    importeTotal: string;
    detallePedido: PedidoDetalle[];

    constructor() {
        this.detallePedido = [];
    }
}
