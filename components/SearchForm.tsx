import { useState } from 'react';
import { CarSpecification } from '../lib/schema';

interface CarSpecificationApi {
  data: {cars: CarSpecification[]}
}

const SearchForm = ( props: CarSpecificationApi ) => {
  console.log(props);
  
  const [hits, setHits] = useState(props?.data?.cars);

  const search = async (event: any) => {
    const q = event.target.value;

    if (q.length > 2) {
      const params = new URLSearchParams({ q });

      const res = await fetch('/api/search?' + params);

      const result = await res.json();
      console.log(result);
      setHits(result['cars']);
    }
  };

  return (
    <div>
      <input onChange={search} type="text" />

      <ul>
        {hits !== undefined && hits.length > 0 && hits.map((hit:any) => (
            <li key={hit.entityId}>
              <a href=''>{hit.entityData.manufacturer}</a> - {hit.entityData.model}
              <div>{hit.techdata.map((tech:any) => (<li key={hit.entityId}>{tech}</li>))}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchForm;