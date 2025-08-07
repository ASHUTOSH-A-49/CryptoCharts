import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

const { Text, Title } = Typography
const { Option } = Select

const News = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: 'cryptocurrency',
    count: simplified ? 6 : 12
  })

  console.log(cryptoNews)

  if (!cryptoNews?.data) return 'Loading...'

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.data.map((news, i) => (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <a href={news.url} target="_blank" rel="noreferrer" ><Title className="news-title" level={4}>
                  {news.title}
                </Title></a>
                <img style={{maxWidth:'200px',maxHeight:'100px'}} src={news?.thumbnail} alt="news" />
                
              </div>
              <p>
                {news?.excerpt>20?`${news.excerpt.substring(0,20)}...`:news.excerpt}
              </p>
              <p>{moment(news.pubDate).fromNow()}</p>
              <p>{news.source_id}</p>
              <p>Published by :{news.publisher.name}</p>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News
