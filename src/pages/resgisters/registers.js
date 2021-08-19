import React from 'react';
import { Tabs } from 'antd';
import AssetRegister from '../../components/assetsRegister/assetsRegister';
import UserRegister from '../../components/userRegistry/userRegistry';

const { TabPane } = Tabs;


function Registers() {

  function callback(key) {
    console.log(key);
  }

  return (
    <Tabs defaultActiveKey="1" style={{ padding: '0 50px', marginTop: 60 }} onChange={callback}>
    <TabPane tab="Ativos" key="1">
      <AssetRegister />
    </TabPane>
    <TabPane tab="Funcionários" key="2">
      <UserRegister />
    </TabPane>
    <TabPane tab="Unidades" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
  )
}

export default Registers;