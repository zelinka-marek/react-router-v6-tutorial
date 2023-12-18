import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useNavigation, useSearchParams, useSubmit } from "react-router-dom";
import { Input } from "./forms.jsx";

export function SearchBar() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const navigation = useNavigation();
  const isSearching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  const submit = useSubmit();
  function handleChange(event) {
    const isFirstSearch = searchQuery === null;
    submit(event.currentTarget.form, {
      replace: !isFirstSearch,
    });
  }

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
      <Input
        type="search"
        name="q"
        id="q"
        defaultValue={searchQuery}
        onChange={handleChange}
        className="pl-10"
        placeholder="Search"
        aria-label="Search contacts"
      />
    </div>
  );
}
