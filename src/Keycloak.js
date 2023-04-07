import Keycloak from "keycloak-js";

// const my_keycloak = new Keycloak({
//     "realm": "MATRYCS_2.0",
//     "url": "https://matrycs.epu.ntua.gr/auth/",
//     "clientId": "SSO_Client_test"
// })

const my_keycloak = new Keycloak({
    "realm": "inergy",
    "url": "https://oblachek.eu:8443/",
    "clientId": "test"
})

// my_keycloak.init({onLoad: 'login-required'})

export default my_keycloak