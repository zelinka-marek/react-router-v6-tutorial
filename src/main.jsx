import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  json,
  redirect,
} from "react-router-dom";
import * as contactApi from "./api/contacts";
import { ErrorPage } from "./components/error-page";
import "./index.css";
import Contact from "./routes/contact";
import EditContact from "./routes/edit-contact";
import Root from "./routes/root";

let router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: async () => {
        let contacts = await contactApi.getAll();

        return json({ contacts });
      },
      action: async () => {
        let contact = await contactApi.createEmpty();

        return redirect(`/contacts/${contact.id}/edit`);
      },
      children: [
        {
          path: "contacts/:contactId",
          element: <Contact />,
          loader: async ({ params }) => {
            let contact = await contactApi.getById(params.contactId);

            return json({ contact });
          },
        },
        {
          path: "contacts/:contactId/edit",
          element: <EditContact />,
          loader: async ({ params }) => {
            let contact = await contactApi.getById(params.contactId);

            return json({ contact });
          },
          action: async ({ request, params }) => {
            let formData = await request.formData();
            let updates = Object.fromEntries(formData);

            await contactApi.updateById(params.contactId, updates);

            return redirect(`/contacts/${params.contactId}`);
          },
        },
        {
          path: "contacts/:contactId/destroy",
          action: async ({ params }) => {
            await contactApi.deleteById(params.contactId);

            return redirect("/");
          },
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
