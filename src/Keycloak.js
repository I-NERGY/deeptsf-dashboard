import Keycloak from "keycloak-js";

const createKeycloakInstance = (enabled) => {
    if (enabled) {
        // Keycloak client for localhost
        return new Keycloak({
            realm: process.env.REACT_APP_KEYCLOAK_REALM,
            url: process.env.REACT_APP_KEYCLOAK_URL,
            clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID
        });

        // Keycloak client for production
        // return new Keycloak({
        //     "realm": "inergy",
        //     "url": "https://oblachek.eu:8443/",
        //     "clientId": "load-forecasting-sso"
        // })
    } else {
        // Create a dummy Keycloak instance that doesn't do authentication
        const dummyKeycloak = {
            init: () => Promise.resolve(),
            login: () => {
            },
            logout: () => {
            },
            // Add other Keycloak methods you may use as empty functions
        };

        // Manually set initialized to true
        dummyKeycloak.initialized = true;

        return dummyKeycloak;
    }
};

const shouldAuthenticate = process.env.REACT_APP_AUTH === "true";

const my_keycloak = createKeycloakInstance(shouldAuthenticate);

export default my_keycloak;