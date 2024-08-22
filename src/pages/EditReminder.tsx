import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineSave } from "react-icons/hi";
import { InputWithLabel, Sidebar } from "../components";
import SimpleInput from "../components/SimpleInput";
import TextAreaInput from "../components/TextAreaInput";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';

const EditReminder = () => {
  const { id } = useParams<{ id: string }>();
  const [inputObject, setInputObject] = useState({
    title: "",
    description: "",
    dateTime: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const response = await fetch(`http://localhost:8080/alerts/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInputObject({
          title: data.title,
          description: data.message,
          dateTime: data.reminderDateTime,
        });
      } catch (error) {
        console.error('Error fetching alert:', error);
      }
    };

    fetchAlert();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputObject({ ...inputObject, [name]: value });
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputObject({ ...inputObject, dateTime: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/alerts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: inputObject.title,
          description: inputObject.description,
          dateTime: inputObject.dateTime
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      navigate('/reminder');
    } catch (error) {
      console.error('Error saving alert:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <div className="mb-6">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <h2 className="h3 text-blue-400">Editar Lembrete</h2>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              <HiOutlineSave className="w-5 h-5 mr-2" />
              <span>Salvar Alterações</span>
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <InputWithLabel label="Título">
                <SimpleInput
                  type="text"
                  name="title"
                  className="form-control border rounded-lg p-2"
                  placeholder="Inserir novo título"
                  value={inputObject.title}
                  onChange={handleInputChange}
                />
              </InputWithLabel>
            </div>

            <div>
              <InputWithLabel label="Descrição">
                <TextAreaInput
                  placeholder="Inserir nova descrição"
                  rows={4}
                  className="form-control border rounded-lg p-2"
                  value={inputObject.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setInputObject({
                      ...inputObject,
                      description: e.target.value,
                    })
                  }
                />
              </InputWithLabel>
            </div>

            <div>
              <InputWithLabel label="Data e Hora do Lembrete">
                <input
                  type="datetime-local"
                  className="form-control border rounded-lg p-2"
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

export default EditReminder;
