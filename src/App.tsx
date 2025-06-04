import { Transactions } from "pages/Transactions";

import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route index element={<Transactions />} />
    </Routes>
  );
}

export default App;
