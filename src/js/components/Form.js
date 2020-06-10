import React, { useState } from "react";
import { connect } from "react-redux";
import { addArticle } from "../store/action";

const mapDispatchToProps = { addArticle };

const ConnectedForm = ({ addArticle }) => {
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { title: title };
    addArticle(payload);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={handleChange} />
      </div>
      <button type="submit">SAVE</button>
    </form>
  );
};

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;
