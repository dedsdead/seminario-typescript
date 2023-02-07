import { useParams, Link, useNavigate } from 'react-router-dom'
 
export function House(){
    const nav = useNavigate()

    const params = useParams()
    const housesigil = params['*'] as string

    const house = housesigil.split('/')[0]
    const sigil = housesigil.split('/')[1]

    const houseName = house.split(' ')[1]
    
    return (
        <>
            <button onClick={() => nav(-1)}>
                {`<-`}
            </button>
            <h1>{house} ({sigil})</h1>
            <img src={`../../src/assets/${houseName}.jpg`} alt=''/>
            <Link to={`characters/${house}`}>
              <p>List of characters</p>
            </Link>
        </>
    )
}