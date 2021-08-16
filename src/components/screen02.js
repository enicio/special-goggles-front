import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
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


function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}


const user = {
  'model': "motor",
  'status': "Alerting",
  'health': 70,
  'name': "Motor H13D-1",
  'unitId': 1,
  'companyId': 1
  }

  const onFinish = (values) => {
    console.log(values.user);
    const files = document.getElementById("files");
    const data = new FormData();

    data.append('dados', JSON.stringify( user ));
    data.append('image', files.files[0] );

    api.post('/assets', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => console.log(response));
};


function ScreenTwo() {
const [ companies, setCompanies ] = useState('');
const [ units, setUnits ] = useState('');

useEffect(() => {
  function getCompanies() {
    api.get('/companies')
      .then(response => setCompanies(response.data) );
  }
  getCompanies();
},[])

function getUnitsByCompany(value) {
  console.log(`selected ${value}`);

    api.get(`/units/${value}`)
      .then(response => setUnits(response.data) );

}

function onChange(value) {
  console.log(`selected ${value}`);

}


return (
  <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Modelo"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Nome"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
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

      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
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

      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <div className="input-group">
        <label htmlFor='files'>Select files</label>
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

export default ScreenTwo;
