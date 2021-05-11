import  {environment as ENV} from 'environments/environment';


export const API_ROUTES = {
    CLIENTE_NATURAL: {
        LISTA: `${ENV.baseUrl}clientes_naturales`,
        CLIENTE: `${ENV.baseUrl}cliente_natural`,
        CLIENTE_ESTADO: `${ENV.baseUrl}clientes_naturales_desactivado`,
        STEPPER: `${ENV.baseUrl}cliente_natural_stepper`
    },
    CLIENTE_EMPRESARIAL: {
      LISTA: `${ENV.baseUrl}clientes_empresariales`,
      INFO: `${ENV.baseUrl}info_clientes_empresariales`,
      CLIENTE: `${ENV.baseUrl}master-detail-ce`,
      OFICINA: `${ENV.baseUrl}oficina-ce`,
      OFICINAS: `${ENV.baseUrl}oficinas-ce/`,
      CARGO: `${ENV.baseUrl}cargo-ce`,
      CARGOS: `${ENV.baseUrl}cargos-ce/`
    },
    DIRECCION: {
      LISTA: `${ENV.baseUrl}direcciones_cliente`
    },
    HOJA_CONTROL: {
        LISTA:`${ENV.baseUrl}hojas-control`,
        MASTER_DETAIL:`${ENV.baseUrl}hoja-control`,
        DETALLE_FILTRACIONES:`${ENV.baseUrl}hojas-control-detalle-filtraciones/`,
        HCD_FILTRACION:`${ENV.baseUrl}hoja-control-detalle-filtracion`,
        DETALLE_ACCESORIOS:`${ENV.baseUrl}hojas-control-detalle-accesorios/`,
        HCD_ACCESORIO:`${ENV.baseUrl}hoja-control-detalle-accesorio`
    },
    FILTRACION: {
        LISTA: `${ENV.baseUrl}filtraciones`,
        FILTRACION_DETAIL: `${ENV.baseUrl}filtracion`
    },
    ACCESORIO: {
        LISTA: `${ENV.baseUrl}accesorios`,
        ACCESORIO_DETAIL: `${ENV.baseUrl}accesorio`
    },
    PROVINCIAS: {
      LISTA: `${ENV.baseUrl}provincias`
    },
    CANTONES: {
      LISTA: `${ENV.baseUrl}cantones`
    },
    PARROQUIA: {
      LISTA: `${ENV.baseUrl}parroquias`
    }



}
