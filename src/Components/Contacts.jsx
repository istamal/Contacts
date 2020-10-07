import React from 'react';
import '../App.scss';
import styled from 'styled-components';
import axios from 'axios';

import {
  Form,
  Input,
  Button,
  Card,
  Table,
} from 'antd';

const Wrapper = styled.div`
  width: 100%;
	height: 100vh;
	padding-top: 30px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
`;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Contacts = (props) => {
  const [contacts, setCotcontacts] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRowKeys);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  React.useEffect(async () => {
    const fetchContacts = async () => {
      const response = await axios.get('http://localhost:3004/posts');
      setCotcontacts(response.data);
    	console.log(response.data);
    };
    fetchContacts();
  }, []);

  const handleDelete = async (row) => {
    row.forEach((id) => axios.delete(`http://localhost:3004/posts/${id}`));
    const newContacts = contacts.filter((el) => !row.includes(el.key));
    setCotcontacts(newContacts);
    setSelected(null);
  };

  const handleSeach = async (str) => {
    const id = contacts.map((el) => (el.name === str ? el.key : null));
    const newContacts = contacts.filter((el) => el.key === id[0]);
    console.log(newContacts);
    setCotcontacts(newContacts);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
    },
  ];

  const onFinish = async ({ name, number, id }) => {
    const response = await axios.post('http://localhost:3004/posts', { name, number, key: id });
    const { data } = response;
    console.log(data);
    const contact = { key: data.key, name: data.name, number: data.number };
    setCotcontacts([...contacts, contact]);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Wrapper>
      <Card className="set-contact" title="Добавить контакт" bordered={false} style={{ width: 300 }}>
        <Form
          {...layout}
          name="basic"
          initialValues={{
					  remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Номер"
            name="number"
            rules={[
						  {
						    required: true,
						    message: 'Пожалуйста введите номер',
						  },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Имя"
            name="name"
            rules={[
						  {
						    required: true,
						    message: 'Пожалуйста введите имя',
						  },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="Контакты" bordered={false} style={{ width: 300 }}>
        <Input.Search onSearch={handleSeach} className="margin-bottom" placeholder="Введите название контакта" enterButton />
        <Button onClick={() => handleDelete(selected)} className="margin-right" type="primary" danger>Удолить</Button>
        <Button className="margin-bottom" type="primary">Редактрировать</Button>
        <Table
          rowSelection={{
					  ...rowSelection,
          }}
          columns={columns}
          dataSource={contacts}
        />
      </Card>
    </Wrapper>
  );
};

export default Contacts;
