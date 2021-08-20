import React, { useEffect, useState } from 'react';
import { Card, Avatar, Badge, Select, Drawer, Popconfirm } from 'antd';
import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import api from '../../services/api';
import Gauge from '../../components/Gauge/gauge';

import './dashboard.css'
import DelegateUser from '../../components/userDelegate/userDelegate';

const { Meta } = Card;
const { Option } = Select;

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

const history = useHistory();

const onClose = () => {
  setVisible(false);
};

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
  console.log(value);
  (value === 'all')
  ? await api.get('/assets').then(response => setAssets(response.data))
  :await api.get(`/assets/unit/${value}`).then(response => setAssets(response.data));
}

function Status(status) {
  const assetStatus ={
    Running: 'green',
    Alerting: "yellow",
    Stopped: 'red'
  }
  return assetStatus[status];
}

async function confirm(assetid) {
  console.log("Delete", assetid)
  await api.delete(`/assets/${assetid}`).then(response => console.log(response));
  window.location.reload();
 alert("Ativo deletado com sucesso")
}

if(!assets) return <h1>Loading</h1>;

return (
  <>
  <Select
    showSearch
    style={{ width: '200px', marginTop: '80px', marginLeft: '10%' }}
    placeholder="Selecione unidade"
    optionFilterProp="children"
    onChange={onChangeUnit}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    defaultValue="all"
    label="Filtro por unidades"
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option key="1" value="all">Todas as unidades</Option>
    { !!units && units
    .map( unit => <Option key={unit._id} value={ unit._id }>{ unit.name }</Option> ) }
  </Select>

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
      <p>{isSelected.model}</p>
      <p>{isSelected.description}</p>
      <img style={{width: '50%'}} src={isSelected.image} alt="asset"/>
    </Drawer>

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
              <EditOutlined onClick={() => history.push(`/assets/edit/${asset._id}`)} key="edit" />,
              <Popconfirm
                placement="topRight"
                title="Deseja deletar esse ativo"
                onConfirm={ () => confirm(asset._id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined />
              </Popconfirm>
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
