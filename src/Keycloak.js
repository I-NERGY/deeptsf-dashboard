import Keycloak from "keycloak-js";

// Localhost
// const my_keycloak = new Keycloak({
//     "realm": "inergy",
//     "url": "https://oblachek.eu:8443/",
//     "clientId": "test"
// })

const my_keycloak = new Keycloak({
    "realm": "inergy",
    "url": "https://oblachek.eu:8443/",
    "clientId": "load-forecasting-sso"
})

// my_keycloak.init({onLoad: 'login-required'})

export default my_keycloak