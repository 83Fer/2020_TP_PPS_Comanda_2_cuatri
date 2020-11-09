export interface IUsuario {
    apellido: string;
    aprobado: boolean;
    dni: number;
    foto: string;
    nombre: string;
    role: string;
}

export interface IUsuarioId extends IUsuario {
    uid;
}

export interface IAprobado {
    email: string;
    estado: string;
}

export interface IClienteEspera {
    nombre: string;
}

export interface IClienteEsperaId extends IClienteEspera {
    uid: string;
}