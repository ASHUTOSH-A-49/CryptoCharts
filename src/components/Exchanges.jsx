import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography ,Avatar} from 'antd';

import { useGetExchangesQuery } from '../services/cryptoExchangesApi'; // updated path
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching, error } = useGetExchangesQuery();

console.log('Exchanges API Data:', data);
console.log('Error:', error);


  const exchangesList = data || [];  


  console.log(exchangesList)

  if (isFetching) return <Loader />;

  return (
    <>
      <Row style={{ fontWeight: 'bold', marginBottom: '10px' }}>
        <Col span={6}>Exchange</Col>
        <Col span={6}>24h Volume (USD)</Col>
        <Col span={6}>Trust Score</Col>
        <Col span={6}>year established</Col>
      </Row>

      <Row gutter={[0, 16]}>
        {exchangesList.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row>
                    <Col span={6}>
                      <Text strong>{exchange.trust_score_rank}. {exchange.name}</Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      {/* <Text><strong>{exchange.name}</strong></Text> */}
                    </Col>
                    
                    <Col span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
                    <Col span={6}>{exchange.trust_score}</Col>
                    <Col span={6}>{exchange.year_established}</Col>
                  </Row>
                )}
              >
                <p><strong>Exchange Website:</strong> <a href={exchange.url} target="_blank" rel="noreferrer">{exchange.url}</a></p>
                
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
