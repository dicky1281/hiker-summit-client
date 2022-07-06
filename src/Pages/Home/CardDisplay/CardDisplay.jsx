import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { publicAxiosInstance } from '../../../Instance/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { wishlist } from '../../../features/userSlice'
import Cards from '../../GlobalComponent/Cards/Cards'
import './CardDisplay.scss'

const CardDisplay = () => {

  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user.user)

  const navigate = useNavigate()

    const [destination, setDestination] = useState([])
    const [loading, setLoading] = useState(true)

    const handleWishlist = async(itemId) =>{

    
        dispatch(wishlist(itemId))

      
      
    }


    useEffect(()=>{
        (async() => {
            const response = await publicAxiosInstance.get('/api/v1/destinations');
            setDestination(response.data.result.docs)
            setLoading(false)
          })()
    },[])


  return (
    <>
    <div className="slide-card">
      <h1 className="slide-title text-center" data-aos="zoom-in">Bayangkan Petualanganmu<br></br>Selanjutnya</h1>
      <div className="card-mountain">
        <div className="row">
          {loading ? (<p>Loading</p>): destination.map((item, index)=>(
              <React.Fragment key={index}>
              <Cards aksi={()=>handleWishlist(item._id)} going={`/explore/${item._id}`} imgs={`/api/v1/assets?bucket=${item.content.image_assets.bucket}&key=${item.content.image_assets.assets_key[0]}`} key={item.id} mouname={item.title} lokasi={item.location.province} kesulitan={item.difficulty}/>
              </React.Fragment>
          ))}
        </div>
      </div>
      <div className="tombol text-center">
      <Button onClick={()=>navigate('/explore')} variant='warning'>Explore Lebih Lanjut</Button>
      </div>
     
      
     </div>
    </>
  )
}

export default CardDisplay