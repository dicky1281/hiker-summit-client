import React,{ useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import Cards from '../GlobalComponent/Cards/Cards'

const Product = ({cat,filters}) => {

    const [destination , setDestination] = useState([])
    const [filteredDestination , setFilteredDestination] = useState([])

    useEffect(()=>{
        const getDestination = async ()=>{
            try {
                const res = await axios.get( cat ? `/api/v1/destinations?level=${cat}` : `/api/v1/destinations`)
                setDestination(res.data.result.docs)
                
            } catch (error) {
                
            }
        }
        getDestination()

    },[cat])

    useEffect(()=>{
        cat && setFilteredDestination(
            destination.filter(item=> Object.entries(filters).every(([key,value])=>item[key].include(value)))
        )
    },[destination,cat, filters])
    console.log(filteredDestination)

  return (
    <div>
        <Container>
            {destination.map((item)=>(
                <Cards going={`/explore/${item._id}`} imgs={`/api/v1/assets?bucket=${item.content.image_assets.bucket}&key=${item.content.image_assets.assets_key[0]}`} key={item.id} mouname={item.title} lokasi={item.location.province} kesulitan={item.difficulty}/>
            ))}
        </Container>
    </div>
  )
}

export default Product