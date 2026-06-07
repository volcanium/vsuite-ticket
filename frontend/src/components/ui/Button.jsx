export default function Button({ children, className, ...props }) {
  return (
    <button
      className={`py-1 px-4 bg-main rounded-lg hover:scale-105 transition justify-self-end cursor-pointer active:scale-95 flex flex-row gap-1 ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
