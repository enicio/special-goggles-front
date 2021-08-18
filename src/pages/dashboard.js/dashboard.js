import React, { useEffect, useState } from 'react';
import { Card, Avatar, Badge, Select, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import api from '../../services/api';
import Gauge from '../../components/Gauge/gauge';

import './dashboard.css'
import DelegateUser from '../../components/userDelegate/userDelegate';

const { Meta } = Card;
const { Option } = Select;

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

function Dashboard() {
const [ assets, setAssets ] = useState();
const [ units, setUnits ] = useState('');
const [ visible, setVisible ] = useState(false);
const [ isSelected, setIdSelected ] = useState('');
const [ selectedItems, setSelectedItems ] = useState([]);
const [ users, setUsers ] = useState([]);

const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));

const onClose = () => {
  setVisible(false);
};

useEffect(() => {
  async function getUsers(){
    await api.get('/users').then(response => setUsers(response.data.map(user => user.name)))
  }
  getUsers();
},[]);

useEffect(() => {
  async function getAssets(){
    await api.get('/assets').then(response => setAssets(response.data))
  }
  getAssets();
},[]);

useEffect(() => {
  async function getUnits(){
    await api.get('/units').then(response => setUnits(response.data))
  }
  getUnits();
},[]);

async function onChangeUnit(value) {
  await api.get(`/assets/${value}`).then(response => setAssets(response.data))
}

function Status(status) {
  const assetStatus ={
    Running: 'green',
    Alerting: "yellow",
    Stopped: 'red'
  }
  return assetStatus[status];
}

function handleDelegateUser(selectedItems) {
  console.log(selectedItems);
  setSelectedItems(selectedItems);
}

if(!assets) return <h1>Loading</h1>;
// console.log(isSelected);

  return (
    <>
   <div className="card-container">
      <Drawer
        title={isSelected.name}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width='80%'
        closeIcon
      >
        <p>Some contents...</p>
        <p>{isSelected.model}</p>
        <p>Some contents...</p>
        <img src={isSelected.image} alt="asset"/>

      </Drawer>

        <Select
          showSearch
          style={{ width: '200px' }}
          placeholder="Selecione unidade"
          optionFilterProp="children"
          onChange={onChangeUnit}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          { !!units && units
          .map( unit => <Option key={unit._id} value={ unit._id }>{ unit.name }</Option> ) }
        </Select>

      {assets.map((asset) => {
        return (
          <Badge.Ribbon
              color={Status(asset.status)}
              key={asset._id}
              style={{width: '80px'}}
              placement="start"
              text={asset.status}>
            <Card
              style={{ width: '300px' }}
              cover={
                <Gauge health={asset.health} />
              }
              actions={[
                <SettingOutlined onClick={() => { setIdSelected(asset) ;setVisible(!visible)  }} key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >

              <DelegateUser />

              <Meta
                avatar={<Avatar src={asset.image} />}
                title={asset.name}
                description={asset.model}
              />
            </Card>
          </Badge.Ribbon>
        )
      })}
    </div>
    </>
  )
}

export default Dashboard;
