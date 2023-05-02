import React, { Component } from "react";
import { Button, Form, Input, Space, Table, Tag, TreeSelect } from 'antd';
import "./App.css"

class App extends Component {
	formRef = React.createRef();

	constructor(props) {
		super(props);
		this.state = {
			selected: null,
			clicked: null,
		}
	}

	onClickTable = () => {
		this.setState({
			...this.state,
			clicked: "clicked",
		})
	}

	onChange = value => {
		this.setState({
			...this.state,
			selected: value,
		})
	}

	onReset = () => {
		this.formRef.current.resetFields();
		this.setState({
			...this.state,
			selected: null,
			clicked: null,
		})
	}

	render = () => {
		return (
			<div className={'form-view'}>
				<h1>Form</h1>
				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 20,
					}}
					style={{
						maxWidth: 600,
					}}
					autoComplete="off"
					ref={this.formRef}
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[
							{
								required: true,
								message: 'Input Something',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label={"Options"}
						name={"Options"}
					>
						<TreeData
							{...this}
							{...this.state}
						/>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary" onClick={this.onReset}>
							Reset
						</Button>
					</Form.Item>
				</Form>
				<div>
					<TableClicked
						{...this}
						{...this.state}
					/>
				</div>
			</div>
		)
	}
}

const TreeData = props => {
	return (
		<TreeSelect
			onClick={props.onClickTable}
			showSearch
			style={{
				width: '100%',
			}}
			dropdownStyle={{
				maxHeight: 400,
				overflow: 'auto',
			}}
			placeholder="Variables"
			allowClear
			treeDefaultExpandAll
			onChange={props.onChange}
			treeData={treeData(props.selected)}
			defaultValue={props.selected}
		/>
	)
}

const treeData = () => {
	return (
		[
			{
				value: 'Inverter 1',
				title: 'Inverter 1',
				children: [
					{
						value: 'KWH',
						title: 'KWH'
					},
					{
						value: 'Voltage',
						title: "Vol"
					},
				],
			},
			{
				value: 'Inverter 2',
				title: 'Inverter 2',
				children: [
					{
						value: 'Ampe',
						title: 'Ampe',
					},
					{
						value: 'Temperature',
						title: 'Temperature',
					},
				],
			}
		]
	)
}

const TableClicked = props => {
	const { clicked } = props;
	return (
		<div className={clicked ? "table-clicked" : "table-normal"}>
			<Table columns={columns} dataSource={data} />
		</div>
	)
}

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags',
		render: (_, { tags }) => (
			<>
				{tags.map((tag) => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'loser') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<a>Invite {record.name}</a>
				<a>Delete</a>
			</Space>
		),
	},
];

const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sydney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
];
export default App;