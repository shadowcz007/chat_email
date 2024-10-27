export default function Input({ ...props }) {
  return (
    <input
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
}
