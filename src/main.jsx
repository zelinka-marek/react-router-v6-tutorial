import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  json,
  redirect,
} from "react-router-dom";
import * as contactApi from "./api/contacts.js";
import { ErrorPage } from "./components/error-page.jsx";
import "./index.css";
import Root from "./root.jsx";
import Contact from "./routes/contact.jsx";
import EditContact from "./routes/edit-contact.jsx";
import Index from "./routes/index.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={async ({ request }) => {
        const url = new URL(request.url);
        const searchQuery = url.searchParams.get("q");
        const contacts = await contactApi.getAll(searchQuery);

        return json({ searchQuery, contacts });
      }}
      action={async () => {
        const contact = await contactApi.createEmpty();

        return redirect(`/contacts/${contact.id}/edit`);
      }}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={async ({ params }) => {
            const contact = await contactApi.getById(params.contactId);
            if (!contact) {
              throw json({ contact }, { status: 404, statusText: "Not Found" });
            }

            return json({ contact });
          }}
          action={async ({ request, params }) => {
            const formData = await request.formData();
            const favorite = formData.get("favorite") === "true";

            await contactApi.updateById(params.contactId, { favorite });

            return json({ ok: true });
          }}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={async ({ params }) => {
            const contact = await contactApi.getById(params.contactId);

            return json({ contact });
          }}
          action={async ({ request, params }) => {
            const formData = await request.formData();
            const updates = Object.fromEntries(formData);

            await contactApi.updateById(params.contactId, updates);

            return redirect(`/contacts/${params.contactId}`);
          }}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={async ({ params }) => {
            await contactApi.deleteById(params.contactId);

            return redirect("/");
          }}
        />
      </Route>
    </Route>,
  ),
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
    },
  },
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
