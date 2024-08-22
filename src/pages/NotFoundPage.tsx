
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-blue-100 relative overflow-hidden">

            <div className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')` }}>
            </div>

            <div className="container mx-auto px-4 lg:px-8 z-10">
                <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
                    <h1 className="text-7xl md:text-9xl font-bold text-blue-400">404</h1>
                    <p className="text-2xl md:text-3xl text-gray-700 mt-4">
                        Oops! Página não encontrada.
                    </p>
                    <p className="text-md md:text-lg text-gray-600 mt-2 mb-6">
                        Parece que a página que você está procurando não existe ou foi movida.
                    </p>
                    <Link to="/reminder" className="btn btn-primary text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-blue-700">
                        Voltar
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
