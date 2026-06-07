import SideBar from "./components/layout/SideBar";
import Select from "./components/ui/Select";

function App() {
  return (
    <div className="flex flex-row items-start justify-start">
      <SideBar />
      <div className="flex m-10">
        <Select
          text={"Filtrer par"}
          options={[
            {
              value: "Test 1",
              label: "Option 1",
            },
            {
              value: "Test 1",
              label: "Option 1",
            },
            {
              value: "Test 1",
              label: "Option 1",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
