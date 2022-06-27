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
    try {
      const values = await axios.get("/api/values/current");
      setValues(values.data);
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const fecthIndexes = async () => {
    try {
      const indexes = await axios.get("/api/values/all");
      console.log("indexes: ", indexes);
      console.log("Is Array", Array.isArray(indexes.data))
      if (Array.isArray(indexes.data)) setSeenIndexes(indexes.data);
    } catch (error) {
      console.log("err: ", error);
    }
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
