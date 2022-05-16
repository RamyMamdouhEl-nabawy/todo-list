import React from 'react';
import { Button, List, Popconfirm, message, Badge } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const TitleHolder = styled.div`text-align: left;`;

const TaskDetails = (props) => {
    const { item, index, handleEdit, handleDelete } = props;

    // Handle the modal cancel event.
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    }

    return (
        <List.Item key={item.id} actions={[
            <Badge status={item.isDone === true ? 'success' : 'default'} text={item.isDone === true ? 'Todo' : 'Done'} />,
            <Button size='middle' shape='round' icon={<EditOutlined />} onClick={() => handleEdit(index)}></Button>,
            <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => handleDelete(index)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                <Button size='middle' shape='round' danger icon={<DeleteOutlined />} ></Button>
            </Popconfirm>]} >
            <TitleHolder>
                < List.Item.Meta title={item.name} />
            </TitleHolder>
        </List.Item>
    );
}

export default TaskDetails;