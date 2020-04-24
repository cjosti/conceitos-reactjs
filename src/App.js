import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: 'new repository',
      url: 'new url',
      techs: ['new tech']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO    
    await api.delete(`repositories/${id}`).catch(console.log);

    const newRepositories = repositories.filter(repository => repository.id !== id);
    
    setRepositories(newRepositories);
  }

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (<li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>)
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
