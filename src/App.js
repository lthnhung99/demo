import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { Routes, Route } from "react-router-dom";

import CustomerList from "./components/customer/CustomerList";
import CreateCustomer from "./components/customer/CreateCustomer";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customer/create" element={<CreateCustomer />} />
      </Routes>
    </>
  );
}

export default App;
