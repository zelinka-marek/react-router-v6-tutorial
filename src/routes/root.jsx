import { PlusSmallIcon, StarIcon } from "@heroicons/react/20/solid";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { Logo } from "../components/logo";
import { SearchBar } from "../components/search-bar";
import { classNames } from "../utils/misc";

export default function Root() {
  let { contacts } = useLoaderData();

  let navigation = useNavigation();
  let isSearching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  let isLoading = navigation.state === "loading";
  let shouldDisplayLoadingOverlay = !isSearching && isLoading;

  return (
    <>
      <div className="fixed inset-y-0 left-0 z-50 border-r border-gray-200 bg-white max-lg:hidden">
        <div className="flex w-20 justify-center py-5">
          <Logo className="h-6 w-auto text-blue-600" />
        </div>
      </div>
      <div className="lg:pl-20">
        <aside className="fixed inset-y-0 left-20 flex w-96 flex-col divide-y divide-gray-200 border-r border-gray-200 max-xl:hidden">
          <div className="flex gap-5 px-4 py-4 sm:px-6 lg:px-8">
            <search role="search">
              <Form>
                <SearchBar />
              </Form>
            </search>
            <Form method="post">
              <button
                type="submit"
                className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                aria-label="New contact"
              >
                <PlusSmallIcon className="-ml-1.5 h-5 w-5" />
                New
              </button>
            </Form>
          </div>
          <nav className="flex-auto scroll-py-4 overflow-y-auto px-4 py-4 sm:px-6 lg:px-8">
            {contacts.length ? (
              <ul className="-mx-2">
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <NavLink
                      to={`/contacts/${contact.id}`}
                      className={({ isActive, isPending }) =>
                        classNames(
                          "group flex items-center gap-3 rounded-md p-2 text-sm",
                          isActive ? "bg-blue-600" : "",
                          !isActive && !isPending
                            ? "hover:bg-gray-100 hover:text-gray-900"
                            : "",
                          isActive
                            ? contact.first || contact.last
                              ? "text-white"
                              : "text-blue-200"
                            : isPending
                              ? "bg-gray-100 text-blue-600"
                              : contact.first || contact.last
                                ? "text-gray-700"
                                : "text-gray-500",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className="flex-auto truncate">
                            {contact.first || contact.last ? (
                              <>
                                {contact.first} {contact.last}
                              </>
                            ) : (
                              <i>No Name</i>
                            )}
                          </span>
                          {contact.favorite && (
                            <StarIcon
                              className={classNames(
                                "h-5 w-5",
                                isActive
                                  ? "text-white"
                                  : "text-yellow-400 group-hover:text-yellow-500",
                              )}
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </aside>
        <main
          className={classNames(
            "transition-opacity delay-200 duration-200 xl:pl-96",
            shouldDisplayLoadingOverlay ? "opacity-25" : "",
          )}
        >
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
