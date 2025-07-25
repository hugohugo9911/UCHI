export const Button = ({ onClick, children }) => (
  <button onClick={onClick} className="px-4 py-2 rounded bg-blue-500 text-white">
    {children}
  </button>
);
