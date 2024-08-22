import { FaArrowRight } from "react-icons/fa6";
import { InputWithLabel, SimpleInput } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert } from 'react-bootstrap';
import iconReminder from "../assets/iconReminderOnline-removebg.png";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();


    if (!name || !email || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios. Por favor, preencha todos.");
      return;
    }


    if (password.length < 5) {
      setError("A senha deve ter pelo menos 5 caracteres.");
      return;
    }


    if (password !== confirmPassword) {
      setError("As senhas informadas são diferentes. Por favor, tente novamente.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('auth-token', data.token);
        sessionStorage.setItem('username', data.name);
        navigate('/login');
      } else {
        console.error('Registro falhou');
        setError("Erro ao realizar o registro. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error('Erro ao fazer registro:', error);
      setError("Ocorreu um erro inesperado. Por favor, tente novamente.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="w-100 max-w-md p-4 shadow-lg rounded bg-white">
          <div className="text-center mb-4">
            <img
              src={iconReminder}
              alt="Reminder Icon"
              className="w-24 h-24 mx-auto hover:rotate-90 hover:duration-1000 hover:ease-in-out cursor-pointer"
            />
          </div>

          <h2 className="h4 text-dark font-weight-bold mb-4 text-center">
            Registre-se no Lembrete Online!
          </h2>

          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          <div className="mb-3 text-left">
            <InputWithLabel label="Nome">
              <SimpleInput
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputWithLabel>
          </div>

          <div className="mb-3 text-left">
            <InputWithLabel label="Email">
              <SimpleInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputWithLabel>
          </div>

          <div className="mb-3 text-left">
            <InputWithLabel label="Senha">
              <SimpleInput
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputWithLabel>
          </div>

          <div className="mb-4 text-left">
            <InputWithLabel label="Confirmar Senha">
              <SimpleInput
                type="password"
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputWithLabel>
          </div>

          <Button
            variant="primary"
            type="submit"
            className="btn-lg w-100 mb-3"
          >
            Cadastrar
          </Button>

          <p className="text-muted text-center">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-primary font-weight-bold d-inline-flex align-items-center">
              Login <FaArrowRight className="ml-1" />
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterComponent;
