import React, { useState, useEffect } from "react";
import api from '../../services/api';
import { Select } from 'antd';

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

function DelegateUser(params) {
  const [ selectedItems, setSelectedItems ] = useState([]);
  const [ users, setUsers ] = useState([]);

  const filteredOptions = users.filter(o => !selectedItems.includes(o));

  useEffect(() => {
    async function getUsers(){
      await api.get('/users').then(response => setUsers(response.data.map(user => user.name)))
    }
    getUsers();
  },[]);

  function handleDelegateUser(selectedItems) {
    console.log(selectedItems);
    setSelectedItems(selectedItems);
  }

  return (
    <Select
    mode="multiple"
    placeholder="Inserted are removed"
    value={selectedItems}
    onChange={handleDelegateUser}
    style={{ width: '100%' }}
  >
    {filteredOptions.map(item => (
      <Select.Option key={item} value={item}>
        {item}
      </Select.Option>
    ))}
  </Select>
  )
}

export default DelegateUser;
