export class FichaTecnica {
  id:number = 0;
  fk_cliente:number = 0;
  tipo_cliente:string = '';
  codigo:string = '';
  tds?:number= 0;
  ppm?:number= 0;
  visitas?:number= 0;
  fecha_comprado:string = '';
  created_at?:string= '';
  updated_at?:string= '';
  publish:boolean = true;
}


// export interface Envio {
//   id:             number;
//   fk_cliente:     string;
//   tipo_cliente:   string;
//   codigo:         string;
//   tds:            string;
//   ppm:            string;
//   visitas:        string;
//   fecha_comprado: string;
//   created_at:     string;
//   updated_at:     string;
//   publish:        boolean;
//   detalle:        Detalle[];
// }

// export interface Detalle {
//   id:                        number;
//   fk_ficha_tecnica:          number;
//   factura:                   string;
//   fecha_mantenimiento:       string;
//   recibo:                    string;
//   ficha_tecnica:             string;
//   descripcion:               string;
//   persona_recepta:           string;
//   firma_url:                 string;
//   cedula_receptor:           string;
//   persona_dio_mantenimiento: string;
//   cedula_dio_mantenimiento:  string;
// }
