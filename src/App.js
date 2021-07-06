import "./App.css";
import Header from "./components/Header";
import Input from "./components/Input";
import Map from "./components/Map";
import { useState } from "react";

function App() {
  const [postcode, setPostcode] = useState("M1");

  return (
    <div className="App">
      <Header />
      <Input setPostcode={setPostcode} />
      <Map postcode={postcode} />
    </div>
  );
}

export default App;
