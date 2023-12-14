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
import Index from "./routes/index";
import Root from "./routes/root";

let router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: async ({ request }) => {
        let url = new URL(request.url);
        let searchQuery = url.searchParams.get("q");
        let contacts = await contactApi.getAll(searchQuery);

        return json({ searchQuery, contacts });
      },
      action: async () => {
        let contact = await contactApi.createEmpty();

        return redirect(`/contacts/${contact.id}/edit`);
      },
      children: [
        { index: true, element: <Index /> },
        {
          path: "contacts/:contactId",
          element: <Contact />,
          loader: async ({ params }) => {
            let contact = await contactApi.getById(params.contactId);
            if (!contact) {
              throw json({ contact }, { status: 404, statusText: "Not Found" });
            }

            return json({ contact });
          },
          action: async ({ request, params }) => {
            let formData = await request.formData();
            let favorite = formData.get("favorite") === "true";

            await contactApi.updateById(params.contactId, { favorite });

            return json({ ok: true });
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
          errorElement: <div>Oops! There was an error.</div>,
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
