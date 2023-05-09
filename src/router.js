import { createBrowserRouter, } from "react-router-dom";
import Home from "./pages/Home";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Definitions from "./pages/Definitions"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "enseignants",
    element: <Teachers />,
  },
  {
    path: "cours",
    element: <Courses />,
  },
  {
    path: "lexique",
    element: <Definitions />,
  },
]);

export default router;