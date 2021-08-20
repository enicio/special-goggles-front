import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button } from 'antd';
import api from '../../services/api';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 10,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function onSearch(val) {
  console.log('search:', val);
}


function EditAsset(props) {
  const [ companies, setCompanies ] = useState('');
  const [ units, setUnits ] = useState('');
  const [ asset, setAsset ] = useState('');
  const { match: { params: { id } } } = props;
  console.log(asset.name);

  function onFinish() {
    console.log(id);
    delete asset._id;
    api.put(`/assets/${id}`, asset )
      .then(response => console.log(response))
      .catch( (err) => console.log(err) );

  };

  function onChange({target}) {
    console.log(asset);
    console.log(target.value);
      setAsset({
        ...asset,
        [target.name]: target.value,

      })
  }

  useEffect(() => {
    function getCompanies() {
      api.get('/companies')
        .then(response => setCompanies(response.data) );
      }
    getCompanies();
  },[])

  useEffect(() => {
    function getUnits() {
      api.get('/units')
        .then(response => setUnits(response.data) );
      }
    getUnits();
  },[])

  useEffect(() => {
    async function getAssetById() {
      api.get(`/assets/${id}`)
        .then((response) => setAsset(response.data));
    }
    getAssetById();
  },[id])

  function setunit(value) {
    // console.log(target.name);
    setAsset({
      ...asset,
        unitId: value
    })
  }

  console.log(asset);

  if(!asset.name) return <h1>Loading</h1>;

  return (
    <Form style={{marginTop: '80px'}} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
       <Form.Item
          name={['asset', 'model']}
          label="Modelo"
          onChange={onChange}
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
        >
        <Input name={'model'} defaultValue={asset.model} />
      </Form.Item>

      <Form.Item
         name={['asset', 'name']}
         label="Nome"
         onChange={onChange}
        //  rules={[
        //    {
        //      required: true,
        //    },
        //  ]}
      >
        <Input name={'name'} defaultValue={asset.name} />
      </Form.Item>

      <Form.Item>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Selecione a empresa"
          optionFilterProp="children"
          defaultValue={asset.companyId}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          { !!companies && companies
          .map( companie => <Option key={companie._id} value={ companie._id }>{ companie.name }</Option> ) }
        </Select>
      </Form.Item>

      <Form.Item>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Selecione unidade"
          optionFilterProp="children"
          defaultValue={asset.unitId}
          onSearch={onSearch}
          onChange={setunit}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          { !!units && units
          .map( unit => <Option key={unit._id} value={ unit._id }>{ unit.name }</Option> ) }
        </Select>
    </Form.Item>

    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Atualizar
      </Button>
    </Form.Item>
    </Form>
  )
}

export default EditAsset;
