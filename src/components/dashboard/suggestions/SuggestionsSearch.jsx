import React, { useState } from "react";
import { useSelector } from "react-redux";
const process = require('process');

const SuggestionsSearch = ({ setSuggestions }) => {
  const token = useSelector((state) => state.user.token);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}dashboard/suggestion/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        title,
        message,
        status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.suggestions);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-3">
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="email"
            id="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="message"
            id="message"
            className="form-control"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-3">
          <select
            name="status"
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">Tout</option>
            <option value="pending">En attente</option>
            <option value="accepted">Accepté</option>
            <option value="refused">Refusé</option>
          </select>
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-primary">
            Rechercher
          </button>
        </div>
      </div>
    </form>
  );
};
export default SuggestionsSearch;
