import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, json } from "react-router-dom";
import { ErrorPage } from "./components/error-page";
import "./index.css";
import Contact from "./routes/contact";
import Root from "./routes/root";
import * as contactsApi from "./api/contacts";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: async () => {
      let contacts = await contactsApi.getContacts();

      return json({ contacts });
    },
    children: [{ path: "contacts/:contactId", element: <Contact /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
