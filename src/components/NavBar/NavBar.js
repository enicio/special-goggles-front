import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';

import './NavBar.css';
import 'antd/dist/antd.css';

const { Header } = Layout;

function NavBar() {
const history = useHistory();
  return(
    <div>
      <Layout >
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item onClick={() => history.push('/')} key="1">Ativos</Menu.Item>
            <Menu.Item onClick={() => history.push('/registers')}  key="2">Cadastros</Menu.Item>
            <Menu.Item onClick={() => history.push('/temp')}  key="3">Temperatura</Menu.Item>
          </Menu>
        </Header>
      </Layout>
    </div>
    )
};

export default NavBar;
