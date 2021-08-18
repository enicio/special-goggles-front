import React from 'react';
import { Tabs } from 'antd';
import AssetRegister from '../../components/assetsRegister/assetsRegister';

const { TabPane } = Tabs;


function Registers() {

  function callback(key) {
    console.log(key);
  }

  return (
    <Tabs defaultActiveKey="1" style={{ padding: '0 50px', marginTop: 60 }} onChange={callback}>
    <TabPane tab="Cadastro de Ativos" key="1">
      <AssetRegister />
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
  )
}

export default Registers;