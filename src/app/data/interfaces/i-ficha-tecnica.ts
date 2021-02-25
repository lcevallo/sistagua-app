export interface IFichaTecnica {
  id?: number,
  fk_cliente?: number,
  tipo_cliente: string,
  codigo: string,
  tds?: number,
  ppm?: number,
  visitas?: number,
  fecha_comprado: string;
  created_at?:string,
  updated_at?:string,
  publish?:boolean
}
