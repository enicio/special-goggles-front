import React, { useEffect, useState } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { AntCloudOutlined } from '@ant-design/icons';
import socketIOClient from "socket.io-client";
import './realTimeCard.css'
// const socket = io.connect("http://localhost:5000");

// const ENDPOINT = 'https://socket-aipsi.herokuapp.com/';
const ENDPOINT = 'http://localhost:5000';
// const ENDPOINT = 'https://aipsi.herokuapp.com';
const socket = socketIOClient(ENDPOINT);

function RealTimeCard() {
const [ temp, setTemp] = useState('');

  useEffect(() => {
    // socket.on('time', (timeString) => {
    //   setTemp(timeString)
    // });
    socket.emit('getTemp');
    socket.on('setTemp', (temp) => {
      console.log(temp);
      setTemp(temp)
    })
  },[]);

  return (
    <div className="site-statistic-demo-card">
    <Row gutter={16}>
      <Col span={80}>
        <Card>
          <Statistic
            title="Luminosidade"
            value={temp}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<AntCloudOutlined />}
            suffix="c"
          />
        </Card>
      </Col>
    </Row>
  </div>
  )
};

export default RealTimeCard;