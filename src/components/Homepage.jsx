import { Statistic, Typography,Row,Col } from 'antd';
import React from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Cryptocurrencies,News} from './index'


//NOTE: millify does is: Converts long numbers to pretty, human-readable strings


const {Title} = Typography

// fetch the coin data and then displaying it in home screen 
import { useGetCryptosQuery } from '../services/cryptoApi';
const Homepage = () => {
    const {data,isFetching} = useGetCryptosQuery(10)
    console.log(data)

    if(isFetching){
        return 'Loading'
    }

    const globalStats = data?.data?.stats;
    // refer the api data which is console logged into browser console to se the api return object structure and accordingly retrieve data from it 
  return (
    <>
    <Title level = {2} className='heading'>
        Global Crypto stats
        <Row>
            <Col span = {12}>
                <Statistic title = 'Total Cryptocurrencies'  value = {globalStats.total}/>  
            </Col>
            <Col span = {12}>
                <Statistic title = 'Total Exchanges'  value = {millify(globalStats.totalExchanges)}/>  
            </Col>
            <Col span = {12}>
                <Statistic title = 'Total Market Cap'  value ={millify(globalStats.totalMarketCap)}/>  
            </Col>
            <Col span = {12}>
                <Statistic title = 'Total 24hr Volume'  value = {millify(globalStats.total24hVolume)}/>  
            </Col>
            <Col span = {12}>
                <Statistic title = 'Total Markets'  value = {millify(globalStats.totalMarkets)}/>  
            </Col>
        </Row>
    </Title>
    <div className='home-heading-container'>
        <Title level = {2} className='home-title'>Top 10 Cryptocurrencies in world</Title>
        <Title level = {4} className='show-more'><Link to = "/cryptocurrencies">Show more</Link></Title>
    </div>
    <Cryptocurrencies simplified />
        <div className='home-heading-container'>
        <Title level = {2} className='home-title'>Latest crypto news</Title>
        <Title level = {4} className='show-more'><Link to = "/news">Show more</Link></Title>
        </div>

    <News simiplified />
    </>

    
  );
};

export default Homepage;
