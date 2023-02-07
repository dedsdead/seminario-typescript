import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export type House = {
  name: string,
  sigil: string
  
}

type Houses = {
  houses: House[]
}

export function Houses() {
  const { data, isFetching } = useQuery<Houses>('houses', async () => {
    const response = await axios.get('http://localhost:8000/houses')

    return response.data

  }, {
    staleTime: 1000 * 60
  })
  
  return (
    <ul>
      {isFetching && <p>Carregando...</p>}
      {data?.houses.map((house) => {
        return (
          <li key={house.name}>
            <Link to={`houses/${house.name}/${house.sigil}`}>
              {house.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )

}