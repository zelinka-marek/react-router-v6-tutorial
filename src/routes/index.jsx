import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { Form } from "react-router-dom";
import { Empty } from "../components/empty";

export default function Index() {
  return (
    <Empty
      title="No contact selected"
      description="Select a contact on the left or create a new contact."
    >
      <Form method="post">
        <button
          type="submit"
          className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PlusSmallIcon className="-ml-1.5 h-5 w-5" />
          New contact
        </button>
      </Form>
    </Empty>
  );
}
