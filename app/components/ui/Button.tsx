export default function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
      {...props}
    >
      {children}
    </button>
  );
}
