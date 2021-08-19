import React, { useState, useEffect } from "react";
import api from '../../services/api';
import { Form, Input, Button, Select, message } from 'antd';

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

function UserRegister() {
const [ companies, setCompanies ] = useState('');
const [ units, setUnits ] = useState('');
const [ user, setAsset ] = useState({});

function success() {
  message.success('Cadastro realizado com sucesso');
};

function fail() {
  message.error('Falha no cadastro');
};

function onFinish() {

api.post('/users', user)
	.then(response => success())
	.catch( () => fail());

};

useEffect(() => {
  function getCompanies() {
    api.get('/companies')
      .then(response => setCompanies(response.data) );
  }
  getCompanies();
},[])

function onChange({target}) {
  console.log(target.value);
  setAsset({
    ...user,
    [target.name]: target.value,

  })
}

function getUnitsByCompany(value) {
  setAsset({
    ...user,
    companyId: value,
  })
  api.get(`/units/${value}`)
    .then(response => setUnits(response.data) );
}

function setunit(value) {
  setAsset({
    ...user,
      unitId: value
  })
}

return (
	<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
		<Form.Item
			name={['user', 'name']}
			label="Name"
			onChange={onChange}
			rules={[
				{
					required: true,
				},
			]}
		>
			<Input name={'name'} />
		</Form.Item>

		<Form.Item
			name={['user', 'email']}
			label="Email"
			onChange={onChange}
			rules={[
				{
					type: 'email',
					required: true
				},
			]}
		>
			<Input name={'email'}/>
		</Form.Item>

		<Form.Item>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Selecione a empresa"
        optionFilterProp="children"
        onChange={getUnitsByCompany}
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
				label='Compania'
				name={['user', 'company']}
        showSearch
        style={{ width: 200 }}
        placeholder="Selecione unidade"
        optionFilterProp="children"
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
				Cadastrar
			</Button>
		</Form.Item>
	</Form>
  )
}

export default UserRegister;
