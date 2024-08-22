import iconReminder from "../assets/iconReminderOnline-removebg.png";
import { InputWithLabel, SimpleInput } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('auth-token', data.token);
        sessionStorage.setItem('username', data.name);
        sessionStorage.setItem('email', data.email);

        if (rememberMe) {
          localStorage.setItem('savedEmail', email);
          localStorage.setItem('savedPassword', password);
        } else {
          localStorage.removeItem('savedEmail');
          localStorage.removeItem('savedPassword');
        }

        navigate('/reminder');
      } else {
        setErrorMessage('Não foi possível realizar o login. Email/Senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      setErrorMessage('Erro ao realizar login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-blue-100 relative overflow-hidden">

      <div className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')` }}>
      </div>

      <div className="container mx-auto px-4 lg:px-8 z-10">
        <div className="flex flex-col md:flex-row items-center">

          <div className="md:w-1/2 lg:w-1/3 mx-auto md:mx-0">
            <div className="p-8 bg-white rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <img src={iconReminder} alt="Reminder Icon" className="mx-auto w-24 h-24 mb-4" />
                <h2 className="text-3xl font-semibold text-blue-600">Lembrete Online</h2>
              </div>

              <div className="mb-4">
                <InputWithLabel label="Email">
                  <SimpleInput
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </InputWithLabel>
              </div>

              <div className="mb-4">
                <InputWithLabel label="Senha">
                  <SimpleInput
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </InputWithLabel>
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Mantenha-me conectado
                </label>
              </div>

              {errorMessage && <div className="alert alert-danger mb-4">{errorMessage}</div>}

              <button className="btn btn-primary w-full mb-3" onClick={handleLogin}>
                Login
              </button>

              <p className="text-center text-blue-600 mb-2">
                <Link to="/forgot-password">
                  Esqueceu sua senha?
                </Link>
              </p>

              <p className="text-muted text-center">
                Ainda não tem cadastro?{" "}
                <Link to="/register" className="text-primary font-weight-bold d-inline-flex align-items-center">
                  Cadastrar <FaArrowRight className="ml-1" />
                </Link>
              </p>

            </div>
          </div>


          <div className="md:w-1/2 lg:w-2/3 flex flex-col items-center justify-center p-4">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-blue-500 mb-6">
                <span className="block text-blue-400 font-light text-3xl border-b-2 border-blue-300 pb-2 mb-4">
                  Lembrete Online
                </span>
                <p className="text-base md:text-lg lg:text-xl font-light text-blue-700">
                  O  <span className="font-semibold text-black">Lembrete Online</span> permite que você <span className="font-semibold text-black">cadastre seus compromissos importantes</span> para não esquecer de nada! Basta cadastrar o lembrete, e nós enviaremos uma notificação para garantir que você seja avisado no momento certo. Para entender melhor como funciona, veja o vídeo abaixo com mais detalhes.
                </p>
              </h3>
              <div className="relative w-full max-w-lg mx-auto" style={{ paddingTop: '34.00%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/WE6S39tq9C4"
                  allowFullScreen
                  title="Vídeo de demonstração"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
