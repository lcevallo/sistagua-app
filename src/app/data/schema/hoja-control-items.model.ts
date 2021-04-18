export class HojaControlItems {
  id : number = -1;
  fk_hoja_control: number = 0;
  factura: string = '';
  fecha_mantenimiento: string = '';
  recibo:string = '';
  hoja_control?:string = '';
  descripcion?: string= '';
  persona_autoriza?: string= '';
  firma_url:string = '';
  cedula_autoriza:string = '';
  persona_dio_mantenimiento:string = '';
  cedula_dio_mantenimiento:string = '';
  ppm?:number;
  tds?:number;
  created_at:string = '';
  updated_at:string = '';
  publish:boolean = true;
}
