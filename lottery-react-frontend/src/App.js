import React, { useEffect, useState } from "react";

import lottery from "./lottery";

const App = () => {
  const [manager, setManager] = useState("");

  const fetchManager = async () => {
    try {
      const address = await lottery.methods.manager().call();
      // const balance = await web3.eth.getBalance(lottery.options.address);
      console.log(address);
    } catch (error) {
      console.log(`Error fetching ${error}`);
    }
  };

  useEffect(() => {
    fetchManager();
  }, []);

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>Contract is managed by: {manager}</p>
    </div>
  );
};

export default App;
