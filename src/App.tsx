import { Counter } from "components/Counter";
import { Pokemon } from "pages/Pokemon";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/counter" element={<Counter />} />
      <Route index element={<Pokemon />} />
      <Route path="*" element={<h1>not found</h1>} />
    </Routes>
  );
}

export default App;
