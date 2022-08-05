import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Table() {
  const { filteredPlanets, isLoading, onChangeInput,
    handleOnChangeType, onChangeGreaterLessOrEqual,
    onChangeFilterValue,
    filterNumberValue, addNewFilter, greaterLessOrEqual,
    filterType, allFilters, setNewFilter, collumns,
    filteredPlanets2, setFilter } = useContext(Context);
  const headers = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited',
    'URL'];

  const removeFilter = ({ target: { value } }) => {
    const remFilters = [...allFilters.map(
      (obj) => obj,
    ).filter((i) => i.type !== value)];
    setNewFilter(remFilters);
    setFilter(filteredPlanets2);
  };

  const removeAllFilters = (e) => {
    e.preventDefault();
    setNewFilter([]);
  };
  return (
    <div>
      <button
        onClick={ removeAllFilters }
        type="button"
        data-testid="button-remove-filters"
      >
        Remover todos os filtros

      </button>
      {allFilters.map(({ type, comparission, value }, index) => (
        <div key={ index } data-testid="filter">
          {`${type},${comparission},${value}`}
          <button
            type="button"
            value={ type }
            onClick={ removeFilter }
          >
            X
          </button>
        </div>
      ))}
      <select
        value={ filterType }
        data-testid="column-filter"
        onChange={ handleOnChangeType }
      >
        {collumns.map((collumn, index) => ( // Colunas com tipos do filtro
          <option
            key={ index }
            value={ collumn }
          >
            {collumn}
          </option>))}
      </select>
      <select
        value={ greaterLessOrEqual }
        data-testid="comparison-filter"
        onChange={ onChangeGreaterLessOrEqual }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        onChange={ onChangeFilterValue }
        value={ filterNumberValue }
      />
      <input
        onChange={ onChangeInput }
        data-testid="name-filter"
        placeholder="Filtro"
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => addNewFilter({ type: filterType,
          comparission: greaterLessOrEqual,
          value: filterNumberValue }) }
      >
        Apply

      </button>
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
