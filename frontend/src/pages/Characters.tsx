import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { House } from './Houses'

type Character = {
    name: string
    house: House
}

type Characters = {
    characters: Character[]
}

export function Characters(){
    const nav = useNavigate()
    const params = useParams()
    const house = params['*'] as string

    const { data, isFetching } = useQuery<Characters>('characters', async () => {
        const response = await axios.get('http://localhost:8000/characters')

        return response.data

    }, {
        staleTime: 1000 * 60
    })

    const characters = data?.characters.filter((char) => {
        if(char.house.name === house){
            return char
        }
    })

    return (
        <ul>
            <button onClick={() => nav(-1)}>
                {`<-`}
            </button>
            {isFetching && <p>Carregando...</p>}
            {characters?.map((character) => {
                return (
                    <li key={character.name}>
                        {character.name}
                    </li>
                )
            })}
        </ul>
    )

}