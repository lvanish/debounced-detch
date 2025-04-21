import { useEffect, useState, useCallback } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  function debounce(fn, delay) {
    let timerID = null;
    return function (...args) {
      clearTimeout(timerID);
      timerID = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }

  const fetchData = async (query) => {
    const response = await fetch(
      `https://api.frontendeval.com/fake/food/${query}`
    );
    const res = await response.json();
    console.log(res);
    setData(res);
  };
  const debouncedFetch = useCallback(debounce(fetchData, 500), []);

  useEffect(() => {
    debouncedFetch(input);
  }, [input]);

  // console.log(data);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <input
        className="search-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="resultContainer">
        {data.map((val, ind) => (
          <div className="result" key={ind}>
            {val}
          </div>
        ))}
      </div>
    </div>
  );
}
