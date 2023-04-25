import React, { useState, useEffect } from "react";

function ModelList() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch("https://api.up2tom.com/v3/models", {
      headers: {
        "Authorization": "Token 9307bfd5fa011428ff198bb37547f979",
        "Content-Type": "application/vnd.api+json",
      }
    })
      .then(response => response.json())
      .then(data => setModels(data.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Model List</h1>
      <ul>
        {models.map(model => (
          <li key={model.id}>
            <h2>{model.attributes.name}</h2>
            <p>{model.attributes.description}</p>
            <p>Publisher: {model.attributes.publisher}</p>
            <p>Publish Date: {model.attributes["publish-date"]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModelList;
