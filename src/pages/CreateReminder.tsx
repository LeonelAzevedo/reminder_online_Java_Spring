import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSave } from 'react-icons/hi';
import { InputWithLabel, Sidebar } from '../components';
import SimpleInput from '../components/SimpleInput';
import TextAreaInput from '../components/TextAreaInput';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateReminder: React.FC = () => {
  const [inputObject, setInputObject] = useState({
    title: "",
    description: "",
    dateTime: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputObject({ ...inputObject, [name]: value });
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputObject({ ...inputObject, dateTime: e.target.value });
  };

  const handleSave = async () => {
    const reminderData = {
      title: inputObject.title,
      description: inputObject.description,
      dateTime: inputObject.dateTime,
      email: sessionStorage.getItem('email')
    };

    try {
      const response = await fetch('http://localhost:8080/alerts/create-reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reminderData),
      });

      if (response.ok) {
        console.log('Lembrete criado com sucesso!');
        navigate('/reminder');
      } else {
        console.error('Erro ao criar lembrete:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar lembrete:', error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid">
        <div className="py-4">
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
            <h2 className="h3 text-blue-400">Novo Lembrete</h2>

            <button
              onClick={handleSave}
              className="btn btn-primary d-flex align-items-center"
            >
              <HiOutlineSave className="me-2" />
              <span>Salvar</span>
            </button>
          </div>

          <form className="row g-4 mt-4">
            <div className="col-12">
              <InputWithLabel label="Título">
                <SimpleInput
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Informe um título para seu lembrete"
                  value={inputObject.title}
                  onChange={handleInputChange}
                  required
                />
              </InputWithLabel>
            </div>

            <div className="col-12">
              <InputWithLabel label="Descrição">
                <TextAreaInput
                  placeholder="Informe uma descrição para seu lembrete"
                  rows={4}
                  cols={50}
                  value={inputObject.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setInputObject({ ...inputObject, description: e.target.value })
                  }
                  required
                />
              </InputWithLabel>
            </div>

            <div className="col-md-6">
              <InputWithLabel label="Data e Hora do Lembrete">
                <input
                  type="datetime-local"
                  className="form-control"
                  id="dateTime"
                  name="dateTime"
                  value={inputObject.dateTime}
                  onChange={handleDateTimeChange}
                  required
                />
              </InputWithLabel>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReminder;
