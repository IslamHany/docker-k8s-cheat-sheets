import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fecthIndexes();
  }, []);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };

  const fecthIndexes = async () => {
    const indexes = await axios.get("/api/values/all");
    console.log("indexes: ", indexes);
    setSeenIndexes(indexes.data);
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I Calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/values", {
      index,
    });

    setIndex("");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Enter Your Index</label>
          <input value={index} onChange={(e) => setIndex(e.target.value)} />
          <button>Submit</button>
        </form>

        <h3>Indexes I Have Seen:</h3>
        {renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {renderValues()}
      </div>
    </>
  );
};

export default Fib;
