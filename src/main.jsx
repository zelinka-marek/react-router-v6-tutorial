import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, json } from "react-router-dom";
import * as contactApi from "./api/contacts";
import { ErrorPage } from "./components/error-page";
import "./index.css";
import Contact from "./routes/contact";
import Root from "./routes/root";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: async () => {
      let contacts = await contactApi.getContacts();

      return json({ contacts });
    },
    action: async () => {
      let contact = await contactApi.createContact();

      return json({ contact });
    },
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
