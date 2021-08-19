import React, { useEffect, useState } from "react";
import { Form, Input } from 'antd';
import api from '../../services/api';

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

function EditAsset(props) {
  const { match: { params: { id } } } = props;
  const [ asset, setAsset ] = useState('');
  console.log(asset.name);

  function onFinish() {

    // api.post('/users', user)
    //   .then(response => success())
    //   .catch( () => fail());

    };

    function onChange({target}) {
      console.log(target.value);
      // setAsset({
      //   ...user,
      //   [target.name]: target.value,

      // })
    }
  useEffect(() => {
    async function getAssetById() {
      api.get(`/assets/${id}`)
        .then((response) => setAsset(response.data));
    }
    getAssetById();
  },[id])

  if(!asset.name) return <h1>Loading</h1>;

  return (
    <Form style={{marginTop: '80px'}} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
        <Input name={'model'} defaultValue={asset.model} />
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
        <Input name={'name'} defaultValue={asset.name} />
      </Form.Item>
    </Form>
  )
}

export default EditAsset;
