const msalConfig = {
    auth: {
        clientId: "817bba57-5d3f-41ae-82fc-cefb5febd08c", // Seu clientId
        authority: "https://login.microsoftonline.com/3ce9f1fb-3751-4eea-be2e-b8e1c09c90d8", // Seu tenantId
        redirectUri: window.location.origin + "/resumo.html", // Página pós-login
    },
    cache: {
        cacheLocation: "sessionStorage", // ou "localStorage"
        storeAuthStateInCookie: false,
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

const loginRequest = {
    scopes: ["User.Read"]
};

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
        // Faz o login via popup
        const loginResponse = await msalInstance.loginPopup(loginRequest);
        const account = loginResponse.account;

        // Guarda informações básicas
        sessionStorage.setItem('username', account.username);

        const tokenResponse = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: account
        });

        sessionStorage.setItem('token', tokenResponse.accessToken);

        // Redireciona após login
        window.location.href = "resumo.html";
    } catch (error) {
        console.error("Erro no login:", error);
        document.getElementById("response").innerText = "Erro no login: " + error.message;
    }
})