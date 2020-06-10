import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ articles: state.articles });

const ConnectedList = ({ articles }) => (
  <ul>
    {articles.map((el) => (
      <li key={el.id}> {el.title} </li>
    ))}
  </ul>
);

export default connect(mapStateToProps)(ConnectedList);
