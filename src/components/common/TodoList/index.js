import React, { useState, useEffect } from 'react';
import { Button, List, Row, Col, Select, Modal, Form, message, Input } from "antd";
import TaskDetails from "../../reusable-components/TaskDetails";
import CreateTask from "../CreateTask";
import data from '../../../Data/data.json';
// import Axios from '../../../Axios/index';
import styled from 'styled-components';

const TodoListCard = styled.div`
        margin-top:3rem;
        padding: 1rem;
        align-items: center;
        justify-content: center;
        border: 1px solid #eee;
        border-radius: 10px;
        box-shadow: 5px 5px 10px 0px #acacac;
    `;

const TaskList = () => {
    const [form] = Form.useForm();
    const [initLoading, setInitLoading] = useState(true);
    const [list, setList] = useState([]);
    const [position, setPosition] = useState();
    const [currentTitle, setCurrentTitle] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getTasks();
        setInitLoading(false);
    }, [currentTitle]);

    const getTasks = async () => {
        // const allTasks = await Axios.get('task/list');
        const allTasks = data;
        setList(allTasks.data.data.sort((a, b) => b.isDone - a.isDone));
    }

    const resetState = () => {
        setCurrentTitle(null);
        setCurrentStatus(null)
        setPosition();
    }

    const openModal = (modalActiveStatus) => {
        setModalVisible(modalActiveStatus);
    }

    const handleCreate = (values) => {
        setList([...list, { id: list.length + 1, name: values.Title, isDone: values.Status !== 'true' ? false : true }]);
    }

    const handleDelete = (position) => { setList(list.filter((item, index) => index !== position)); message.success('Deleted Successfully!'); }

    const handleEdit = (position) => {
        form.resetFields();
        const chosenItem = list.filter((item, index) => (index === position));
        setCurrentTitle(chosenItem[0].name);
        setCurrentStatus(chosenItem[0].isDone);
        setPosition(position);
        setModalVisible(true);
    }

    const onEditFinish = (values) => {
        setList([...list].map((object, idx) => {
            if (idx === position) {
                return {
                    ...object,
                    name: values.Title,
                    isDone: values.Status !== 'true' ? false : true
                }
            }
            else return object;
        }));
        form.resetFields();
        setModalVisible(false);
        // resetState();
        message.success('Edited Successfully!');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCancel = () => {
        form.resetFields();
        openModal(false);
        // resetState();
    };

    return (
        <>
            <Row justify="center" className='container'>
                <Col span={12} >
                    <TodoListCard>
                        <CreateTask handleAddTask={handleCreate} />
                        <hr color='#eee' />
                        <List
                            className="demo-loadmore-list"
                            loading={initLoading}
                            itemLayout="horizontal"
                            dataSource={list}
                            renderItem={(item, index) => (
                                <TaskDetails key={index} item={item} index={index} handleEdit={handleEdit} handleDelete={handleDelete} />
                            )}
                        />
                    </TodoListCard>
                </Col>
            </Row >

            <Modal
                title="Edit Todo"
                centered
                visible={modalVisible}
                onOk={() => openModal(false)}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    // initialValues={{ remember: true }}
                    onFinish={onEditFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Title"
                        name="Title"
                        initialValue={currentTitle}
                        rules={[{ required: true, message: 'Please input task title!' }]}>
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item
                        initialValue={currentStatus}
                        label="Status"
                        name="Status"
                    >
                        <Select
                            placeholder="Status"
                            allowClear
                        >
                            <Select.Option value="false">Done</Select.Option>
                            <Select.Option value="true">Todo</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 18, span: 24 }}>
                        <Button type="primary" size='large' shape='round' htmlType="submit">
                            Edit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default TaskList;