import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Form, Input, Button, Select, message } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 10,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: 'O campo ${label} é obrigatório!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

function AssetRegister() {
const [ companies, setCompanies ] = useState('');
const [ units, setUnits ] = useState('');
const [ asset, setAsset ] = useState({});

function success() {
  message.success('Cadastro realizado com sucesso');
};


const onFinish = () => {
  const fileInput = document.getElementById("files");
  const data = new FormData();

  data.append('data', JSON.stringify( asset ));
  data.append('image', fileInput.files[0] );

  api.post('/assets', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => success());
};

useEffect(() => {
  function getCompanies() {
    api.get('/companies')
      .then(response => setCompanies(response.data) );
  }
  getCompanies();
},[])

function getUnitsByCompany(value) {
  // console.log(`selected ${value}`);
  setAsset({
    ...asset,
    companyId: value,
  })
    api.get(`/units/${value}`)
      .then(response => setUnits(response.data) );
}

function onChange({target}) {
  console.log(target.value);
  setAsset({
    ...asset,
    [target.name]: target.value,

  })
}

function setunit(value) {
  // console.log(target.name);
  setAsset({
    ...asset,
      unitId: value
  })
}

return (
  <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
    <Form.Item
      name={['asset', 'model']}
      label="Modelo"
      onChange={onChange}
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input name={'model'}  />
    </Form.Item>

    <Form.Item
      name={['asset', 'name']}
      label="Nome"
      onChange={onChange}
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input name={'name'} />
    </Form.Item>

    <Form.Item>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Selecione a empresa"
        optionFilterProp="children"
        onChange={getUnitsByCompany}
        onFocus={onFocus}
        onBlur={onBlur}
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
        onChange={setunit}
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
    </Form.Item>

    <Form.Item onChange={onChange} name={['user', 'introduction']} label="Descrição">
      <Input.TextArea name={'description'} />
    </Form.Item>


    <div className="input-group">
      <label htmlFor='files'>Selecione o arquivo</label>
      <input id='files' type="file" multiple />
    </div>

    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  );
};

export default AssetRegister;
