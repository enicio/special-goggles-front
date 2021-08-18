import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import './main.css';
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;

const options = {
    title: {
      text: 'My chart'
    },
    series: [{
      data: [1, 2, 3, 3, 5, 7, 8, 2, 8, 9, 3]
    }]
  }

function Main(children) {
const history = useHistory();

    return(
        <div>
        	<Layout >
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
							<div className="logo" />
								<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
								<Menu.Item onClick={() => history.push('/assets')} key="1">Ativos</Menu.Item>
								<Menu.Item onClick={() => history.push('/unidades')}  key="2">Cadastro</Menu.Item>
								<Menu.Item onClick={() => history.push('/company')}  key="3">Company</Menu.Item>
							</Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 164 }}>
							Content
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </div>
    )
};

export default Main;
