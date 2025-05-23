function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
  
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    })
      .then(res => {
        if (!res.ok) throw new Error("Login inválido");
        return res.json();
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        document.getElementById('status').textContent = 'Login bem-sucedido!';
      })
      .catch(err => {
        document.getElementById('status').textContent = err.message;
      });
  }
  
  function verificarStatus() {
    const token = localStorage.getItem('token');
  
    fetch('http://localhost:3000/status', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        document.getElementById('status').textContent =
          data.authenticated ? 'Logado' : 'Não logado';
      });
  }