import createAuth0Client from "@auth0/auth0-spa-js"
import { user, isAuthenticated, popupOpen } from '$stores'

async function createClient() {

    const auth0Client = await createAuth0Client({
        domain: import.meta.env.VITE_ENV_AUTH0_DOMAIN,
        client_id: import.meta.env.VITE_ENV_AUTH0_CLIENT_ID
    });

    return auth0Client;
}

async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);

        user.set(await client.getUser());
        isAuthenticated.set(true);
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client) {
    return client.logout();
}

const Auth = {
    createClient,
    loginWithPopup,
    logout
};

export default Auth;