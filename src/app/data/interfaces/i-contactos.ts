export interface IContactos {
  id?:                     number;
  fk_cliente_empresarial: number;
  fk_cargo:           number;
  publish:                number;
  nombres:  string;
  apellidos:  string;
  celular:  string;
  cumple:  string;
  correo:  string;
  fk_tipo_cargo:  number;
}
