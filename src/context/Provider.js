import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const collumnsArray = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  // const newCollumns = [...collumnsArray];

  const [isLoading, setLoading] = useState(true);
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilter] = useState([]);
  const [filterType, setFilterType] = useState('population');
  const [greaterLessOrEqual, setGreaterLessOrEqual] = useState('maior que');
  const [filterNumberValue, setFilterNumberValue] = useState(0);
  const [allFilters, setNewFilter] = useState([]);
  const [collumns, setCollumns] = useState(collumnsArray);

  function removeResidents(entry) {
    delete entry.residents;
    return entry;
  }

  const fetchApi = async () => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const res = await fetch(url);
    const resJson = await res.json();
    const { results } = resJson;
    setPlanets(results.map(removeResidents));
    setFilter(results.map(removeResidents));
    setLoading(false);
  };

  const onChangeFilterValue = ({ target }) => {
    const { value } = target;
    setFilterNumberValue(value);
  };
  const onChangeGreaterLessOrEqual = ({ target }) => {
    const { value } = target;
    setGreaterLessOrEqual(value);
  };
  const handleOnChangeType = ({ target }) => {
    const { value } = target;
    setFilterType(value);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const onChangeInput = ({ target }) => {
    const { value } = target;
    const planetsFilter = planets.filter(({ name }) => name.includes(value.toUpperCase())
     || name.includes(value.toLowerCase()));
    // console.log({ planetsFilter, planets, value });
    setFilter(planetsFilter);
  };

  const addNewFilter = (newFilter) => {
    setNewFilter([...allFilters, newFilter]);
  };
  useEffect(() => {
    const planetsClone = [...planets];
    setFilter([...planets]);
    const numericFilter = () => {
      console.log(planetsClone);
      if (allFilters.length > 0) {
        allFilters.forEach(({ type, comparission, value }) => {
          console.log(type, comparission, value);
          if (comparission === 'menor que') {
            setFilter(filteredPlanets.filter(
              (p) => Number(p[type]) < Number(value),
            ));
          } else if (comparission === 'maior que') {
            setFilter(filteredPlanets.filter(
              (p) => Number(p[type]) > Number(value),
            ));
          } else {
            setFilter(filteredPlanets.filter(
              (p) => p[type] === value,
            ));
          }
        });
      }
    };
    numericFilter();
  },
  [allFilters]);

  const context = {
    setCollumns,
    collumns,
    setNewFilter,
    allFilters,
    addNewFilter,
    onChangeFilterValue,
    filterNumberValue,
    onChangeGreaterLessOrEqual,
    greaterLessOrEqual,
    handleOnChangeType,
    filterType,
    filteredPlanets,
    onChangeInput,
    planets,
    isLoading,
  };
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
