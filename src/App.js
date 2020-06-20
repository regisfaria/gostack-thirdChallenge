import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [handleRemoveRepository])
  
  async function handleAddRepository() {                                                    // OK
    const response = await api.post('repositories', {
      title: `Repository created at ${Date.now()}`,
      url: `github.com/regis/${Date.now()}`,
      techs: "Node, ReactJS"
    })

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      
      <ul data-testid="repository-list">
        {repositories.map(repository => (                                                   // OK
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      
    </div>
  );
}

export default App;
