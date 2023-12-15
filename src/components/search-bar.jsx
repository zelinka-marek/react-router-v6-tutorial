import { MagnifyingGlassIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useNavigation, useSearchParams, useSubmit } from "react-router-dom";

export function SearchBar() {
  let [searchParams] = useSearchParams();
  let searchQuery = searchParams.get("q");

  let navigation = useNavigation();
  let isSearching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  let submit = useSubmit();

  // Sync input value with the current URL Search Params
  useEffect(() => {
    document.getElementById("q").value = searchQuery;
  }, [searchQuery]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {isSearching ? (
          <ArrowPathIcon className="h-5 w-5 animate-spin text-gray-400" />
        ) : (
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        )}
      </div>
      <input
        type="search"
        name="q"
        id="q"
        defaultValue={searchQuery}
        onChange={(event) => {
          let isFirstSearch = searchQuery === null;
          submit(event.currentTarget.form, {
            replace: !isFirstSearch,
          });
        }}
        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
        placeholder="Search"
        aria-label="Search contacts"
      />
    </div>
  );
}
