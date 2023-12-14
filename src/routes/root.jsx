import { useEffect } from "react";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

export default function Root() {
  let { searchQuery, contacts } = useLoaderData();

  let navigation = useNavigation();
  let isLoading = navigation.state === "loading";
  let isSearching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  let submit = useSubmit();

  // Sync input value with the current URL Search Params
  useEffect(() => {
    document.getElementById("q").value = searchQuery;
  }, [searchQuery]);

  return (
    <>
      <aside id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className={isSearching ? "loading" : undefined}
              defaultValue={searchQuery}
              onChange={(event) => {
                let isFirstSearch = searchQuery === null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!isSearching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`/contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : undefined
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </aside>
      <main id="detail" className={isLoading ? "loading" : undefined}>
        <Outlet />
      </main>
    </>
  );
}
