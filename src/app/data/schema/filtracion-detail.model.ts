export class FiltracionDetail {
    id: number = 0;
    fk_hoja_control_detalle: number= 0;
    fk_filtracion: number = 0;
    cantidad: number = 0;
    created_at: string = '';
    updated_at: string = '';
    publish: boolean = true;
    descripcion: string = '';
    sinHojaControlDetalle?:boolean = false;
}
