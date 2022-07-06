import React, { useEffect, useState } from 'react'
import { publicAxiosInstance } from '../../Instance/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Cards from '../GlobalComponent/Cards/Cards'
import './Search.scss'
import { destinationSelectors, getDestinations } from '../../features/destinationSlice'

const Search = (props) => {
  const dispatch = useDispatch()
  const destinations = useSelector(destinationSelectors.selectAll)
  const [sort, setSort] = useState('')


    useEffect(()=>{
      dispatch(getDestinations())

    },[dispatch])


    const container = destinations?.filter(name => name.status === "active") 
    const searchText = (event) =>{
        setSort(event.target.value);
      }
    

    // eslint-disable-next-line array-callback-return
    const arr = container?.filter((item)=>{
        if(sort === ""){
          return item
        } else if (item.title.toLowerCase().includes(sort.toLowerCase())){
          return (item)
        }
      }).map((item)=> {
     
  
        return(
          <React.Fragment key={item.id}>
          <Cards  going={`/explore/${item._id}`} imgs={`/api/v1/assets?bucket=${item.content.image_assets.bucket}&key=${item.content.image_assets.assets_key[0]}`}  mouname={item.title} lokasi={item.location.province} kesulitan={item.difficulty}/>
  
          </React.Fragment>
        )
      })
  return (
    <div className='Search'>
        <div className="search-content">
            <h2 className='pb-3'>Pencarian Tujuan</h2>
        <input type="text"   name="search" placeholder="Mau Ke Gunung Apa ? Contoh : salak, tangkuban..." value={sort} onChange={searchText.bind(this)}/>
      
        
        </div>
        <div className="search-desti">
        {sort === '' ? '' : <h5 className='text-center pt-3'>Hasil Pencarian Anda Dari {sort}</h5>}
           <Container>
            
            {arr}
           </Container>
            
        </div>
       
    </div>
  )
}

export default Search