// Generated by https://quicktype.io
export interface IclienteNatural {
  id?: number;
  codigo: string;
  ruc: string;
  nombre1: string;
  nombre2?: string;
  apellido1: string;
  apellido2: string;
  correo?: string;
  celular?: string;
  cumple?: string;
  foto?: string;
  publish?: number;
}
// Generated by https://quicktype.io

export interface iClienteNaturalGuardar {
  cliente_natural: iClienteNaturalSend[];
  direcciones: iDireccionCNSend[];
  parentesco: iParentescoCNSend[];
}

export interface iClienteNaturalSend {
  codigo: string;
  ruc: string;
  apellido1: string;
  apellido2: string;
  nombre1: string;
  nombre2: string;
  celular: string;
  correo: string;
  cumple: string;
  foto: string;
}

export interface iDireccionCNSend {
  fk_provincia: number;
  fk_canton: number;
  fk_parroquia: number;
  direccion_domiciliaria: string;
  direccion_oficina: string;
  telefono_convencional: string;
}

export interface iParentescoCNSend {
  tipo_parentesco: string;
  sexo: string;
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
  celular: string;
  correo: string;
  cumple: string;
}