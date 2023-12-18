import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { Input, Label, TextArea } from "../components/forms.jsx";

export default function EditContact() {
  const { contact } = useLoaderData();

  const navigate = useNavigate();
  function goBack() {
    navigate("..", { relative: "path", replace: true });
  }

  return (
    <Form method="post" className="space-y-6">
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
        <Label htmlFor="first" className="sm:pt-1.5">
          First name
        </Label>
        <div className="max-sm:mt-2 sm:col-span-2">
          <Input
            type="text"
            name="first"
            id="first"
            defaultValue={contact.first}
            className="sm:max-w-xs"
          />
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
        <Label htmlFor="last" className="sm:pt-1.5">
          Last name
        </Label>
        <div className="max-sm:mt-2 sm:col-span-2">
          <Input
            type="text"
            name="last"
            id="last"
            defaultValue={contact.last}
            className="sm:max-w-xs"
          />
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
        <Label htmlFor="twitter" className="sm:pt-1.5">
          Twitter
        </Label>
        <div className="max-sm:mt-2 sm:col-span-2">
          <Input
            type="text"
            name="twitter"
            id="twitter"
            defaultValue={contact.twitter}
            className="sm:max-w-xs"
            aria-label="Twitter username"
          />
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
        <Label htmlFor="avatar" className="sm:pt-1.5">
          Avatar
        </Label>
        <div className="max-sm:mt-2 sm:col-span-2">
          <Input
            type="url"
            name="avatar"
            id="avatar"
            defaultValue={contact.avatar}
            className="sm:max-w-sm"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
        <Label htmlFor="notes" className="sm:pt-1.5">
          Notes
        </Label>
        <div className="max-sm:mt-2 sm:col-span-2">
          <TextArea
            name="notes"
            id="notes"
            defaultValue={contact.notes}
            rows={6}
          />
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
        <div className="flex items-center justify-end gap-x-6 sm:col-start-2 sm:flex-row-reverse">
          <button
            type="button"
            onClick={goBack}
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </Form>
  );
}
