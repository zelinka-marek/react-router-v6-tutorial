export function Empty({ title, description, children }) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      {description ? (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
