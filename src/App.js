import React from "react";
import List from "./js/components/List";
import Form from "./js/components/Form";

const App = () => (
  <>
    <div>
      <h2>Articles</h2>
      <List />
    </div>
    <div>
      <h2>Add a new article.</h2>
      <Form />
    </div>
  </>
);

export default App;
