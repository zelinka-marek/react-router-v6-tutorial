import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { classNames } from "../utils/misc.js";

function Favorite({ contact }) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <input
        type="hidden"
        name="favorite"
        value={favorite ? "false" : "true"}
      />
      <button
        type="submit"
        className={classNames(
          "-m-2.5 block p-2.5",
          favorite
            ? "text-yellow-400 hover:text-yellow-500"
            : "text-gray-400 hover:text-gray-500",
        )}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <StarIcon className="h-5 w-5" />
      </button>
    </fetcher.Form>
  );
}

export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <>
      <div className="sm:flex sm:items-end sm:gap-5">
        {contact.avatar ? (
          <img
            src={contact.avatar}
            alt=""
            className="h-24 w-24 flex-none rounded-full sm:h-32 sm:w-32"
          />
        ) : (
          <span className="inline-block h-24 w-24 overflow-hidden rounded-full bg-gray-100 sm:h-32 sm:w-32">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-full w-full text-gray-300"
              aria-hidden
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        )}
        <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
          <div className="mt-6 flex min-w-0 flex-1 items-baseline gap-4 sm:max-md:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900">
              {contact.first || contact.last ? (
                <>
                  {contact.first} {contact.last}
                </>
              ) : (
                <i>No Name</i>
              )}
            </h1>
            <Favorite contact={contact} />
          </div>
          <div className="mt-6 max-sm:space-y-3 sm:flex sm:gap-4">
            <Form action="edit">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 max-sm:w-full"
              >
                <PencilIcon className="h-5 w-5 text-gray-400 sm:-ml-0.5" />
                Edit
              </button>
            </Form>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event) => {
                const shouldDelete = confirm(
                  "Please confirm you want to delete this record.",
                );
                if (!shouldDelete) {
                  event.preventDefault();
                }
              }}
            >
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 max-sm:w-full"
              >
                <TrashIcon className="h-5 w-5 text-gray-400 sm:-ml-0.5" />
                Delete
              </button>
            </Form>
          </div>
        </div>
      </div>
      <div className="mt-6 hidden items-baseline gap-4 sm:flex md:hidden">
        <h1 className="truncate text-2xl font-bold text-gray-900">
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}
        </h1>
        <Favorite contact={contact} />
      </div>
      <div className="mt-8 space-y-2 sm:mt-6">
        <h3 className="text-base/7 font-semibold text-gray-900">About</h3>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100 text-sm/6">
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Twitter</dt>
              <dd className="text-gray-700 max-sm:mt-1 sm:col-span-2">
                {contact.twitter ? (
                  <a
                    href={`https://twitter.com/${contact.twitter}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-blue-600 underline hover:text-blue-500 hover:no-underline"
                  >
                    {contact.twitter}
                  </a>
                ) : (
                  <i className="text-gray-400">N/A</i>
                )}
              </dd>
            </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Notes</dt>
              <dd className="text-gray-700 max-sm:mt-1 sm:col-span-2">
                {contact.notes ? (
                  <p>{contact.notes}</p>
                ) : (
                  <i className="text-gray-400">N/A</i>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
