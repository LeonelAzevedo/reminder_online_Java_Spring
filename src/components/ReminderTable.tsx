import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { parseISO } from 'date-fns';

interface Alert {
  id: string;
  title: string;
  message: string;
  reminderDateTime: string;
}

interface ReminderTableProps {
  className?: string;
}

const ReminderTable: React.FC<ReminderTableProps> = ({ className }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const email = sessionStorage.getItem('email');
        const response = await fetch(`http://localhost:8080/alerts/reminder?email=${email}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Deseja realmente excluir este lembrete?");

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/alerts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar o alerta');
      }

      setAlerts(alerts.filter((alert) => alert.id !== id));

      setSuccessMessage("Lembrete deletado com sucesso!");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Erro ao deletar o alerta:', error);
    }
  };

  return (
    <div className={`container mx-auto px-4 py-6 ${className}`}>
      {successMessage && (
        <div className="alert alert-success text-center" role="alert">
          {successMessage}
        </div>
      )}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100 text-blue-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data e Hora do Alerta</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {alerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{alert.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{alert.message}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {alert.reminderDateTime
                    ? (() => {
                      const parsedDate = parseISO(alert.reminderDateTime);
                      return new Date(parsedDate).toLocaleString();
                    })()
                    : 'Data não disponível'
                  }
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      to={`/reminder/edit/${alert.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <HiOutlinePencil className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(alert.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReminderTable;
