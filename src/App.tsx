import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from './utils/AuthProvider';
import ProtectedRoute from './utils/ProtectedRoute';
import {
  CreateReminder,
  EditReminder,
  HomeLayout,
  Login,
  Reminder,
  Profile,
  Register,
  NotFoundPage,

} from "./pages";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Reminder />
          </ProtectedRoute>
        ),
      },
      {

        path: "/reminder",
        element: (
          <AuthProvider>
            <ProtectedRoute>
              <Reminder />
            </ProtectedRoute>
          </AuthProvider>
        ),

      },

      {
        path: "/reminder/create-reminder",
        element: (
          <AuthProvider>
            <ProtectedRoute>
              <CreateReminder />
            </ProtectedRoute>
          </AuthProvider>
        ),
      },
      {
        path: "/reminder/edit/:id",
        element: (
          <AuthProvider>
            <ProtectedRoute>
              <EditReminder />
            </ProtectedRoute>
          </AuthProvider>
        ),
      },


      {
        path: "/profile",
        element: (
          <AuthProvider>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </AuthProvider>
        ),
      },
      {
        path: "*",
        element: (
          <AuthProvider>
            <ProtectedRoute>
              <NotFoundPage />
            </ProtectedRoute>
          </AuthProvider>
        ),
      },
    ],
  },
]);



function App() {

  return <RouterProvider router={router} />;

}

export default App;
