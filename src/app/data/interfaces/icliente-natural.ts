
export interface IclienteNatural {
  id?: number;
  codigo: string;
  cedula: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  correo?: string;
  celular: string;
  cumpleanios?: string;
  provincia_id: number;
  ciudad_id: number;
  parroquia_id: number;
  direccion_domiciliaria: string;
  direccion_oficina?: string;
  telefono?: string;
  tipo_parentesco_id?: number;
  primer_nombre_parentesco: string;
  segundo_nombre_parentesco?: string;
  primer_apellido_parentesco: string;
  segundo_apellido_parentesco?: string;
  celular_parentesco: string;
  cumpleanios_parentesco?: string;
}
