import { useEffect, useState } from "react";
import Calculator from "./Components/Calculator";

function App() {
  const [res, setRes] = useState();

  useEffect(() => {
    var requestURL = "https://api.exchangerate.host/latest";
    var request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();

    request.onload = function () {
      setRes(request.response);
      // console.log(res);
    };
  }, []);

  return (
    <div className="App">
      {res === undefined ? false : <Calculator res={res} />}
      <div style={{
        position : "absolute",
        top : "calc(100% - 50px)",

      }}>© 2023 WUYUH. All rights reserved.</div>
    </div>
  );
}

export default App;
