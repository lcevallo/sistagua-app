export interface IclienteEmpresarial {
  id?: number;
  codigo: string;
  ruc: string;
  nombres: string;
  direccion: string;
  telefono: string;
  correo: string;
  publish?: boolean
}

export interface iDireccionEmpresarial {
  id?: number;
  fk_cliente_empresarial?: number;
  fk_provincia: number;
  fk_canton: number;
  fk_parroquia: number;
  sector: string;
  direccion: string;
  telefono_convencional: string
}

export interface iCargo {
  id?: number;
  fk_tipo_cargo?: number;
  nombres: string;
  apellidos: string;
  celular: string;
  correo: string;
  publish: boolean
}
