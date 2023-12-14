import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function getErrorMessage(error) {
  if (isRouteErrorResponse(error)) {
    return error.statusText;
  } else if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

export function ErrorPage() {
  let error = useRouteError();
  let errorMessage = getErrorMessage(error);
  console.error(errorMessage);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
