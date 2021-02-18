import  {environment as ENV} from 'environments/environment';
// import  {environment as ENVDEV} from 'environments/environment.dev';


export const API_ROUTES = {
    CLIENTE_NATURAL: {
        LISTA: `${ENV.baseUrl}clientes_naturales`,
        CLIENTE: `${ENV.baseUrl}cliente_natural`
    }

}