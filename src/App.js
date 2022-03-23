import useFilteredProducts from "hooks/useFilteredProducts";
import "./App.css";

function App() {
  const { applyFilter } = useFilteredProducts();
  return (
    <div>
      <button onClick={() => applyFilter("d", 234)}>Click</button>
    </div>
  );
}

export default App;
