import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Table() {
  const { planets, isLoading } = useContext(Context);
  console.log(planets);
  return (
    <div>
      {
        isLoading ? (<p>Loading...</p>)

          : (
            <table>
              {
                planets.map((p) => (
                  <tr key={ p.name }>
                    <td>{p.name}</td>
                  </tr>
                ))
              }
            </table>
          )
      }
    </div>
  );
}
