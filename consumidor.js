const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'minha_chave_secreta';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const usuarioValido = {
  email: 'user@exemplo.com',
  senha: '123456'
};

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === usuarioValido.email && senha === usuarioValido.senha) {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

app.get('/status', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ authenticated: false });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, SECRET_KEY);
    res.json({ authenticated: true });
  } catch (err) {
    res.json({ authenticated: false });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});