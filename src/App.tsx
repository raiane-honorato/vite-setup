import { Counter } from "components/Counter";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/counter" element={<Counter />} />
      <Route index element={<h1>home</h1>} />
      <Route path="*" element={<h1>not found</h1>} />
    </Routes>
  );
}

export default App;
