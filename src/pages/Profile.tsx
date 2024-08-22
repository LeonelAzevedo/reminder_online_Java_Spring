import { HiOutlineSave } from "react-icons/hi";
import { InputWithLabel, Sidebar, SimpleInput } from "../components";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const email = sessionStorage.getItem('email');
const originalUsername = sessionStorage.getItem('username');

const Profile = () => {
  const [inputObject, setInputObject] = useState({
    username: "",
    email: email || "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`http://localhost:8080/profile/${storedEmail}`);
          if (response.ok) {
            const data = await response.json();
            setInputObject((prevState) => ({
              ...prevState,
              username: data.name,
              email: data.email,
            }));
          } else {
            throw new Error('Erro ao carregar o perfil');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      fetchUserProfile();
    } else {
      console.error('Email is null, cannot fetch profile');
    }
  }, [email]);

  useEffect(() => {
    const hasChanges = inputObject.username !== originalUsername;
    setIsButtonDisabled(!hasChanges);
  }, [inputObject.username, originalUsername]);

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: inputObject.username,
          email: inputObject.email,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setInputObject({
          username: updatedData.username,
          email: updatedData.email,
        });

        setMessage('Dados do perfil foram atualizados com sucesso!');
        setIsButtonDisabled(true);
        sessionStorage.setItem('username', updatedData.username);
      } else {
        throw new Error('Erro ao atualizar o perfil');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 text-blue-400">Perfil</h2>
            <button
              className={`btn btn-primary d-flex align-items-center ${isButtonDisabled ? 'btn-disabled' : 'btn-enabled'}`}
              onClick={handleSave}
              disabled={isButtonDisabled}
            >
              <HiOutlineSave className="me-2" />
              Salvar Perfil
            </button>
          </div>

          {message && <div className="alert alert-success">{message}</div>}

          <div className="row">
            <div className="col-12 mb-3">
              <InputWithLabel label="Nome">
                <SimpleInput
                  type="text"
                  placeholder="Nome"
                  value={inputObject.username}
                  onChange={(e) =>
                    setInputObject({ ...inputObject, username: e.target.value })
                  }
                  className="form-control"
                />
              </InputWithLabel>
            </div>
            <div className="col-12 mb-3">
              <InputWithLabel label="Email">
                <SimpleInput
                  type="text"
                  placeholder="Email"
                  value={inputObject.email}
                  readOnly
                  disabled
                  className="form-control bg-light text-muted"
                />
              </InputWithLabel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
