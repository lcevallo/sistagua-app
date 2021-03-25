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
      OFICINAS: `${ENV.baseUrl}oficinas-ce/`
    },
    DIRECCION: {
      LISTA: `${ENV.baseUrl}direcciones_cliente`
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
