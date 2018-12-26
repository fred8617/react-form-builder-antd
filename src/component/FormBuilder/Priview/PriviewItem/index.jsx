import React,{Component,Fragment} from 'react';
import {findDOMNode} from 'react-dom';
import {Map, is} from 'immutable';
import {
	DragSource,
	DropTarget,
	ConnectDragSource,
	ConnectDropTarget,
	DragSourceMonitor,
	DropTargetMonitor,
} from 'react-dnd';
// import * as dnd from 'react-dnd'
import {
  Form,
	Divider,
  Input,
  InputNumber,
  Icon,
	Select,
  Row,
  Col,
  Drawer,
	Checkbox,
	Radio,
} from 'antd';
import {
  observer,
  inject
} from 'mobx-react';
import {FormConsume} from '../../../Context';
import {
	CursorIcon,
	NoneElement,
	HoverRow,
} from '../../../styled';
// import style from './index.less';
import DropableRow from './DropableRow';
import update from 'immutability-helper';
import styled from 'styled-components';
const FormItem = Form.Item;
const PRIVIEW_ELEMENT=`PRIVIEW_ELEMENT`;
const dropType=[
  `ELEMENT`,
  PRIVIEW_ELEMENT,
];
const dragType=PRIVIEW_ELEMENT;

const ElementContainer=styled.div`
	float:left;
`;
const OperationContainer=styled.div`
	float:left;
	line-height: 35px;
`;

//放置目标处理集合
const target={
	canDrop(props){
		// //console.log(props,`props`);
		return true;
	},
  hover(props, monitor, component) {

	},
	drop(props,monitor,component){
		const dragItem = monitor.getItem().item;
		const {
			item:hoverItem,
			store:{
				createElement,
				moveElement,
				setDownElement,
				addColIntoRow,
			},
			parent:data,
		}=props;
		console.log(`hover`,dragItem,hoverItem);
		setDownElement(dragItem)
		if(dragItem.type==`col`&&hoverItem.type==`col`){
			//console.log(`colcol`,dragItem,hoverItem);
		}
		if(dragItem.type==`col`&&hoverItem.type==`row`){
			addColIntoRow(dragItem,hoverItem);
			////console.log(`rowcol`,dragItem,hoverItem);
			return;
		}
		if(dragItem.type==`col`&&hoverItem.type!=`row`){
			//console.log(`col!row`,dragItem,hoverItem);
			return;
		}
		if(hoverItem.inCol){
			return;
		}

		const dragIndex = data.indexOf(dragItem);
		const hoverIndex = data.indexOf(hoverItem);
		if (dragIndex === hoverIndex) {
			//console.log(`=`);
			return;
		}
		if (dragIndex === -1) {
			//console.log(`-1`);
			createElement(dragItem,hoverIndex);
			return;
		}
		// Determine rectangle on screen
		// const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
		// Get vertical middle
		// const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		// Determine mouse position
		// const clientOffset = monitor.getClientOffset()
		// Get pixels to the top
		// if(!clientOffset){
		// 	return;
		// }
		// const hoverClientY = clientOffset.y - hoverBoundingRect.top;
		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%
		// Dragging downwards
		// if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
		// 	return
		// }
		// // Dragging upwards
		// if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
		// 	return
		// }
		// Time to actually perform the action
		moveElement(dragIndex, hoverIndex)
		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		//item.index = hoverIndex
	}
}



//拖拽目标处理集合
const source={
	canDrag(props){
		return true;
	},
	beginDrag(props,monitor,component) {
		//console.log(monitor.getItemType());
		return props;
	},
	endDrag(props){
		//console.log(props);
	}
}
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;


@DropTarget(
	dropType,
	target,
	(connect,monitor) =>{
    return ({
			dropItem:monitor.getItem(),
  		connectDropTarget: connect.dropTarget(),
  		isOver: monitor.isOver(),
			sourceClientOffset: monitor.getSourceClientOffset(),
  })
  } )
@DragSource(
	dragType,
	source,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		monitor:monitor,
		connectDragPreview: connect.dragPreview(),
		dragItem: monitor.getItem(),
		clientOffset: monitor.getClientOffset(),
		initialClientOffset: monitor.getInitialClientOffset(),
	}),
)
export default class PriviewItem extends Component{
	shouldComponentUpdate(nextProps){
		// console.log(nextProps.form.getFieldError(nextProps.item.fieldName));
		return (
			(this.props.store.editField===nextProps.item.fieldName)
			||(this.props.item!==nextProps.item)
			||(this.props.isDragging!==nextProps.isDragging)
			||(this.props.isOver!==nextProps.isOver)
			||(this.props.clientOffset!==nextProps.clientOffset)
			||(this.props.sourceClientOffset!==nextProps.sourceClientOffset)
			||(this.props.initialClientOffset!==nextProps.initialClientOffset)
			||(this.props.design!==nextProps.design)
			||(this.props.required!==nextProps.required)
			||(this.props.label!==nextProps.label)
			||(this.props.fieldName!==nextProps.fieldName)
			||(this.props.optionRowShow!==nextProps.optionRowShow)
			||(this.props.isDragging!==nextProps.isDragging)
			||(JSON.stringify(this.props.options)!=JSON.stringify(nextProps.options))
			||(JSON.stringify(this.props.children)!=JSON.stringify(nextProps.children))
			||nextProps.form.getFieldError(nextProps.item.fieldName)
			// ||(this.props.item.fieldName!==nextProps.item.fieldName)
		)
	}
  getFormItem=(item,props,index)=>{//根据元素类型获取控件
    const {type}=item;
		const {
		  connectDropTarget
		}=this.props;
    if(type===`input`){
      return <Input {...props}/>
    }else if(type===`inputNumber`){
      return <InputNumber {...props}/>
    }else if(type===`checkbox`){
      return <Checkbox {...props}/>
    }else if(type===`checkboxGroup`){
      return (
				<CheckboxGroup  {...props} style={{width:`100%`,lineHeight:`32px`,position:`relative`,top:5}}>
					<Row>
						{
							item.options.map((e,i)=>(
								<Col
									key={i}
									title={e.label}
									span={24/item.optionRowShow}
									style={{whiteSpace:`nowrap`,textOverflow:`ellipsis`,overflow:`hidden`}}
									>
									<Checkbox value={e.value}>
										{e.label}
									</Checkbox>
								</Col>
							))
						}
					</Row>
				</CheckboxGroup>
			)
    }else if(type===`radio`){
			return (
				<RadioGroup {...props} style={{width:`100%`,lineHeight:`32px`,position:`relative`,top:5}}>
					<Row>
						{
							item.options.map((e,i)=>(
								<Col
									key={i}
									title={e.label}
									span={24/item.optionRowShow}
									style={{whiteSpace:`nowrap`,textOverflow:`ellipsis`,overflow:`hidden`}}
								>
									<Radio value={e.value}>
										{e.label}
									</Radio>
								</Col>
							))
						}
					</Row>
				</RadioGroup>
			)
		}else if(type==`select`){
			return (
				<Select
					style={{ width: 120 }}
					{...props}
				>
					{
						item.options.map((e,i)=>(
							<Option
								key={i}
								value={e.value}>
								{e.label}
							</Option>
						))
					}
		    </Select>
			)
		}
  }
	edit=()=>{
		this.props.store.editingShow(this.props.item);
	}
	delete=()=>{
		this.props.store.deleteItem(this.props.item);
	}
  render(){
    //console.log(`PriviewItem render`);
    const {
			store,
      item,
      item:{
        name,
				type,
				children,
      },
      connectDropTarget,
      connectDragSource,
			isDragging,
			isOver,
			form,
			form:{
				getFieldProps,
				getFieldDecorator
			},
			design,
			dragItem,
			clientOffset,
      sourceClientOffset,
      initialClientOffset,
    }=this.props;
		console.log(dragItem,item);
		// console.log(clientOffset,
		// sourceClientOffset,
		// initialClientOffset);
		let borderStyle;
		let backStyle;
		if(isDragging){
			backStyle={
				background:`#1890ff`
			}
		}
		if(isOver){
			const dir=clientOffset&&sourceClientOffset&&initialClientOffset&&store.dragDirection(initialClientOffset,clientOffset,sourceClientOffset)
			borderStyle=dir&&({[`border${dir}`]:`2px dashed #1890ff`})
		}
		const labelStyle={
      // cursor:design?`move`:null,
			display:`inline-block`,
    }
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
		const iconContainerWidth=70;
		const moveContainerWidth=25;
		const mainMargin=10;
		const elementContainerStyle={
			margin:design?`0 ${mainMargin}px`:null,
			width:design?`calc( 100% - ${iconContainerWidth+moveContainerWidth+mainMargin*2}px )`:`100%`,
		}

    return (
      connectDragSource &&
      connectDropTarget &&
        connectDropTarget(
						<div style={{...backStyle,...borderStyle}}>
							{
								design&&(type!='row'&&store.simple)&&connectDragSource(
									<div style={{
										float: `left`,
										lineHeight: `35px`,
										fontSize: `25px`,
										color:`#999`,
									}}>
										<Icon
											style={{cursor:`move`}}
											type="drag"
										/>
									</div>
								)
							}
							<ElementContainer  style={elementContainerStyle}>
								<style>
									{
										`
							.ant-form-item-no-colon .ant-form-item-label label:after{

							}
							.editor{
								height:200px;
							}
							.editor-main{
								height:100px
							}
							.ant-drawer-content-wrapper{
								overflow:auto
							}
										`
									}
								</style>
								{do{
									if(type=='row'){
										if(store.simple){
											<span/>
										}else{
											<DropableRow
												form={form}
												design={design}
												childrenGroup={children}
												store={store}
												item={item}
											/>
										}
									}else{
										<FormItem
											{...formItemLayout}
											colon={true}
											label={
												<span dangerouslySetInnerHTML={{__html: item.label}} style={labelStyle}/>
											}
										>
											{
												<Row gutter={5}>
													<Col span={24}>
														{
															getFieldDecorator(item.fieldName||'invalidField',{
																	rules:[
																{
																	required:item.required,
																	message:item.requiredMessage
																},
																	]
															})(this.getFormItem(item,{}))
														}
													</Col>
												</Row>
											}
										</FormItem>
									}
								}}
	            </ElementContainer>
							{do{
								if(design){
									if(type=='row'&&store.simple){
										<span/>
									}else{
										<OperationContainer style={{width:iconContainerWidth}}>
											<CursorIcon
												type="edit"
												onClick={this.edit}
											/>
											<Divider type="vertical"/>
											<CursorIcon
												type="delete"
												onClick={this.delete}
											/>
										</OperationContainer>
									}
								}
							}}
							<div style={{clear:`both`}}></div>
						</div>
        )
    )
  }
}
