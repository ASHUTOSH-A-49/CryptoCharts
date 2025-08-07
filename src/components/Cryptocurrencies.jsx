import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card,Row,Col,Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'
const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10:100;
  const {data:cryptoslist,isFetching} = useGetCryptosQuery(count);
  const [cryptos,setCryptos] = useState([])
  const[searchTerm,setSearchTerm] = useState('')

  console.log(cryptos);

  useEffect(()=>{
    
    const filterData = cryptoslist?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(filterData);
  },[cryptoslist,searchTerm])
  if(isFetching) return 'Loading';
  return (
    <>
    {!simplified &&(
      // do not show search on homepage 
      <div className='searh-crypto'>
      <Input placeholder='Search Cryptocurrencies' onChange={(e)=>setSearchTerm(e.target.value)}>
      
      </Input>
    </div>
    )}
    
      <Row className='crypto-card-containers' gutter = {[32,32]}>
        {/* looping over cryptos  */}
        {cryptos?.map((currency)=>(
          <Col xs = {24}  sm = {12}  lg = {6} className='crypto-card' key =  {currency.id}>
            {/* xs sm and lg are xtra small small and large devices respectively 
             */}
             <Link to={`/crypto/${currency.uuid}`}>

              <Card 
              title = {`${currency.rank}.${currency.name}`}
              extra = {<img className='crypto-image' src = {currency.iconUrl}></img>}
              hoverable
              >

                <p>Price : {millify(currency.price)}</p>
                <p>MarketCap : {millify(currency.marketCap)}</p>
                <p>Change : {millify(currency.change)}</p>

              </Card>

             </Link>

          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
