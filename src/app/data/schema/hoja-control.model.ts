export class HojaControl {
  id: number;
  fk_cliente: number = 0;
  tipo_cliente: string = '';
  codigo: string = '';
  tds?: number = 0;
  ppm?: number = 0;
  visitas?: number = 0;
  fecha_comprado: string = '';
  created_at?: string = '';
  updated_at?: string = '';
  publish: boolean = true;
}
