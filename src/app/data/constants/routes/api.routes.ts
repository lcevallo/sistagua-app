import  {environment as ENV} from 'environments/environment';
// import  {environment as ENVDEV} from 'environments/environment.dev';


export const API_ROUTES = {
    CLIENTE_NATURAL: {
        LISTA: `${ENV.baseUrl}clientes_naturales`,
        CLIENTE: `${ENV.baseUrl}cliente_natural`
    },
    FILTRACION: {
        LISTA: `${ENV.baseUrl}filtraciones`,
        FILTRACION_DETAIL: `${ENV.baseUrl}filtracion`
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
