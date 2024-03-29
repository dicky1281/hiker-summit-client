import React,{useState,useEffect} from 'react'
import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { wishlistRemove } from '../../features/userSlice';
import { publicAxiosInstance } from '../../Instance/axiosInstance';
import Cards from '../GlobalComponent/Cards/Cards';

const DashboardWishlist = () => {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()

  const [wishlist, setWishlist] = useState([]);
  const [xoxo, setXoxo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async ()=>{
      const res = await publicAxiosInstance.get(`/api/v1/destinations`);
      setXoxo(res.data.result.docs);
      setWishlist(user.destination_wishlist);
      setLoading(false)
    })()
  },[])


  const removeWishlist = (itemId) => {
    dispatch(wishlistRemove(itemId))
  }
  return (
    <>
    {loading ? (
        <div className="order-content">
          <div className="loadingio-spinner-rolling-mhmrujtmme">
            <div className="ldio-x7xj3ccq8ts">
              <div></div>
            </div>
          </div>
        </div>
      ): (
        <div className='wishlist'>
     
      <div className="wishlist-content">
        <Row>
        <h2 className="title">
        Wishlist
      </h2>
      <div className="wishlist-cards">
          {user.destination_wishlist?.map((item, index)=>{
            const dd = xoxo?.filter((ele) => ele._id === item);
            console.log(dd)
            return(
              <React.Fragment key={index}>
              <Col lg={3} md={6} sm={12}>
               
                <Cards warna="red" aksi={() => removeWishlist(dd[0]._id)} going={`/explore/${dd[0]._id}`} imgs={`/api/v1/assets?bucket=${dd[0].content.image_assets.bucket}&key=${dd[0].content.image_assets.assets_key[0]}`} key={dd[0].id} mouname={dd[0].title} lokasi={dd[0].location.province} kesulitan={dd[0].difficulty}/>
               
                
              </Col>
              </React.Fragment>
            )

          })}
           </div>
        </Row>
      </div>
    </div>
      )}
    </>
    
  )
}

export default DashboardWishlist