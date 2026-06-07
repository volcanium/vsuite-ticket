function Test({ children, grand }) {
  return <h1 className={grand ? "text-2xl" : "text-sm"}>{children}</h1>;
}

function App() {
  return <Test grand={false}>Vef</Test>;
}

export default App;