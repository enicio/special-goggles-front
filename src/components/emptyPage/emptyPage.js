import React from 'react';
import { useHistory } from 'react-router';
import { Empty, Button } from 'antd';

function EmptyPage() {
const history = useHistory();
  return (
    <div> 
      <Empty description="Ainda não existem ativos cadastrados">
        <Button type="primary" onClick={ () => history.push('/registers')} >Cadastrar</Button>
      </Empty>
    </div>
  )
}

export default EmptyPage;