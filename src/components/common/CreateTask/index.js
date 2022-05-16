import { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { PlusCircleFilled } from '@ant-design/icons';

const CreateTask = (props) => {
	const { handleAddTask } = props;
	const [modalVisible, setModalVisible] = useState(false)

	const openModal = (modalActiveStatus) => {
		setModalVisible(modalActiveStatus);
	}

	const onCreateNewTask = (values) => {
		// Fire the call back event to create new task based on task values.
		handleAddTask(values);
		openModal(false);
	};

	// Handle creation failure.
	const onCreateFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<Button type="primary" shape="round" icon={<PlusCircleFilled />} onClick={() => openModal(true)}>
				New Task
			</Button>
			<Modal
				title="Create Todo"
				centered
				visible={modalVisible}
				onOk={() => openModal(false)}
				onCancel={() => openModal(false)}
				footer={null}
			>
				<Form
					name="basic"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onCreateNewTask}
					onFinishFailed={onCreateFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Title"
						name="Title"
						rules={[{ required: true, message: 'Please input task title!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Status"
						name="Status">
						<Select
							placeholder="Status"
							allowClear
						>
							<Select.Option value="false">Done</Select.Option>
							<Select.Option value="true">Todo</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 16, span: 16 }}>
						<Button type="primary" size="large" shape="round" htmlType="submit">
							Create
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

export default CreateTask;