import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import AddItem from "./components/AddItem.jsx";
import ViewItem from "./components/ViewItem.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <ViewItem />
        </>
      ),
    },
    {
      path: "/add-item",
      element: (
        <>
          <Navbar />
          <AddItem />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
