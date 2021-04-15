export class FichaTecnicaItems {
  id : number = 0;
  fk_ficha_tecnica: number = 0;
  factura: string = '';
  fecha_mantenimiento: string = '';
  recibo:string = '';
  ficha_tecnica?:string = '';
  descripcion?: string= '';
  persona_recepta?: string= '';
  firma_url:string = '';
  cedula_receptor:string = '';
  persona_dio_mantenimiento:string = '';
  cedula_dio_mantenimiento:string = '';
  created_at:string = '';
  updated_at:string = '';
  publish:boolean = true;
}
