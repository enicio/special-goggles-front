import React from 'react';
import api from '../services/api';
import { Form, Input, InputNumber, Button, Upload, message  } from 'antd';
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

// const user = {
//   'model': "motor",
//   'status': "Alerting",
//   'health': 70,
//   'name': "Motor H13D-1",
//   'unitId': 1,
//   'companyId': 1
//   }

// const Demo = () => {
  const onFinish = (values) => {
    console.log(values.user);
    const files = document.getElementById("files");
    const data = new FormData();

    data.append('dados', JSON.stringify( {
      model: "motor",
      status: "Alerting",
      health: 70,
      name: "Motor H13D-1",
      unitId: 2,
      companyId: 3
      }));
    data.append('image', files.files[0] );

    api.post('/assets', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => console.log(response));
};
// };


function ScreenTwo(params) {
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
      <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>
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
