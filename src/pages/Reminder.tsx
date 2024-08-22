import { ReminderTable, Sidebar } from "../components";
import { Link } from "react-router-dom";

const Reminder = () => {
  return (
    <div className="h-auto border-t border-blackSecondary border-1 d-flex bg-light">
      <Sidebar />
      <div className="w-100">
        <div className="bg-light py-4">
          <div className="container-fluid d-flex justify-content-between align-items-center flex-column flex-md-row">
            <div className="text-center text-md-start mb-3 mb-md-0">
              <h2 className="h3 text-blue-400">Lembretes</h2>
            </div>
            <div className="d-grid">
              <Link
                to="/reminder/create-reminder"
                className="btn btn-primary btn-lg d-flex align-items-center justify-content-center  font-weight-bold px-4 py-1 shadow-sm  transition-all"
                style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
              >
                Novo
              </Link>
            </div>
          </div>

          <div className="container-fluid mt-4">
            <ReminderTable />
          </div>

          <div className="container-fluid d-flex justify-content-between align-items-center py-4 flex-column flex-md-row">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminder;
