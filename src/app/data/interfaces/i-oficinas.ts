export interface IOficinas {
  id?:                     number;
  fk_cliente_empresarial: number;
  fk_provincia:           number;
  fk_canton:              number;
  fk_parroquia:           number;
  sector:                 string;
  direccion:              string;
  telefono_convencional:  string;
  created_at:             string;
  updated_at:             string;
  publish:                number;
}
