import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Table() {
  const { filteredPlanets, isLoading, onChangeInput } = useContext(Context);
  const headers = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited',
    'URL'];
  return (
    <div>
      <input
        onChange={ onChangeInput }
        data-testid="name-filter"
        placeholder="Filtro"
      />
      {
        isLoading ? (<p>Loading...</p>)

          : (
            <table>
              <thead>
                <tr>

                  {
                    headers.map((h) => (<th key={ h }>{ h }</th>))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  filteredPlanets.map((planet) => (
                    <tr key={ planet.url }>
                      <td>{planet.name}</td>
                      <td>{planet.rotation_period}</td>
                      <td>{planet.orbital_period}</td>
                      <td>{planet.diameter}</td>
                      <td>{planet.climate}</td>
                      <td>{planet.gravity}</td>
                      <td>{planet.terrain}</td>
                      <td>{planet.surface_water}</td>
                      <td>{planet.population}</td>
                      <td>{planet.films.map((film) => film)}</td>
                      <td>{planet.created}</td>
                      <td>{planet.edited}</td>
                      <td>{planet.url}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
      }
    </div>
  );
}
