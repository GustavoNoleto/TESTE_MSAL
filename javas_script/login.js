let token = ''; // Variável para armazenar o token

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const payload = {
        "username": username,
        "password": password
    };

    try {
        // Exibe a mensagem "Efetuando login..."
        document.getElementById('response').innerText = 'Efetuando login...';

        // Envia o request de login usando axios
        const response = await axios.post('https://1e86-138-219-192-138.ngrok-free.app/auth/login', payload);
        token = response.data.access_token;  // Armazena o token

        // Armazena o token e o username no localStorage
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', username);

        // Exibe mensagem de sucesso
        document.getElementById('response').innerText = 'Login bem-sucedido';

        // Redireciona para a página de resumo
        setTimeout(() => {
            window.location.href = 'resumo.html';
        }, 1000); 
    } catch (error) {
        document.getElementById('response').innerText = 'Erro no login: ' + error.message;
    }
});
