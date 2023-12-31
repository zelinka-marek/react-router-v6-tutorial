import {
  ChevronLeftIcon,
  PlusSmallIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import {
  Form,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useMatch,
  useNavigation,
} from "react-router-dom";
import { Logo } from "./components/logo.jsx";
import { SearchBar } from "./components/search-bar.jsx";
import { classNames } from "./utils/misc.js";

export default function Root() {
  const { contacts } = useLoaderData();

  const navigation = useNavigation();
  const isSearching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  const isLoading = navigation.state === "loading";
  const shouldDisplayLoadingOverlay = !isSearching && isLoading;

  const rootMatch = useMatch("/");
  const shouldForceDisplaySidebar = Boolean(rootMatch);

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white lg:hidden">
        <div className="px-4 sm:px-6">
          <div className="flex h-16 items-center">
            <Logo className="h-6 w-auto text-blue-600" />
          </div>
        </div>
      </nav>
      <nav className="fixed inset-y-0 left-0 z-50 border-r border-gray-200 bg-white max-lg:hidden">
        <div className="flex w-20 justify-center py-5">
          <Logo className="h-6 w-auto text-blue-600" />
        </div>
      </nav>
      <aside
        className={classNames(
          "fixed inset-y-0 flex flex-col divide-y divide-gray-200 lg:left-20 xl:w-96 xl:border-r xl:border-gray-200",
          shouldForceDisplaySidebar
            ? "inset-x-0 max-lg:top-16"
            : "max-xl:hidden",
        )}
      >
        <div className="flex gap-5 px-4 py-4 sm:px-6 lg:px-8">
          <search role="search" className="flex-auto">
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
            <ul className="-mx-3">
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`/contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      classNames(
                        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm",
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
          "transition-opacity delay-200 duration-200 lg:pl-20",
          shouldDisplayLoadingOverlay ? "opacity-25" : "",
          shouldForceDisplaySidebar ? "max-xl:hidden" : "",
        )}
      >
        <div className="xl:pl-96">
          <nav className="border-b border-gray-200 xl:hidden" aria-label="Back">
            <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6 lg:px-8">
              <Link
                to="/"
                className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <ChevronLeftIcon className="-ml-1 h-5 w-5 flex-none text-gray-400" />
                Contacts
              </Link>
            </div>
          </nav>
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
