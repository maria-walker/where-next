import "./App.css";
import Header from "./components/Header";
import Input from "./components/Input";
import Map from "./components/Map";
import { useState } from "react";

function App() {
  const [postcode, setPostcode] = useState("M1");
  const [policeDataTicked, setPoliceDataTicked] = useState(false);

  return (
    <div className="App">
      <Header />
      <Input
        setPostcode={setPostcode}
        policeDataTicked={policeDataTicked}
        setPoliceDataTicked={setPoliceDataTicked}
      />
      <Map postcode={postcode} policeDataTicked={policeDataTicked} />
    </div>
  );
}

export default App;
