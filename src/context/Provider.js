import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilter] = useState([]);

  const fetchApi = async () => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const res = await fetch(url);
    const resJson = await res.json();
    const { results } = resJson;
    console.log(results);
    setPlanets(results);
    setLoading(false);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const onChangeInput = ({ target }) => {
    const { value } = target;
    const planetsFilter = planets.filter(({ name }) => name.includes(value.toUpperCase())
     || name.includes(value.toLowerCase()));
    console.log({ planetsFilter, planets, value });
    setFilter(planetsFilter);
  };
  const context = {
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
