import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./components/Home";
import Project from "./components/Project";
import Template from "./components/Template";
import CreateDesign from "./components/CreateDesign";
import Main from "./pages/Main";
import Index from "./pages/Index";
import AuthCallback from "./pages/AuthCallback";
import { tokenDecode } from "./utils";

const userInfo = tokenDecode(localStorage.getItem("artboard_token"));

const router = createBrowserRouter([
  {
    path: "/",
    element: userInfo ? <Layout /> : <Index />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/projects",
        element: <Project />,
      },
      {
        path: "/templates",
        element: <Template />,
      },
    ],
  },
  {
    path: "/design/create",
    element: userInfo ? <CreateDesign /> : <Navigate to="/" />,
  },
  {
    path: "/design/:designId/edit",
    element: userInfo ? <Main /> : <Navigate to="/" />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
