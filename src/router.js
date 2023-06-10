import { createBrowserRouter, } from "react-router-dom";
import Home from "./pages/Home";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Definitions from "./pages/Definitions"
import PressReleases from "./pages/PressReleases";
import Enterprises from "./pages/Enterprises";
import Definition from "./pages/Definition";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/enseignants",
    element: <Teachers />,
  },
  {
    path: "/cours",
    element: <Courses />,
  },
  {
    path: "/lexique",
    element: <Definitions />,
  },
  {
    path: "/lexique/:id",
    element: <Definition />,
  },
  {
    path: "/entreprises",
    element: <Enterprises />,
  },
  {
    path: "/communiques",
    element: <PressReleases />,
  },
]);

export default router;