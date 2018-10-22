import React,{Component} from 'react';
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
import {
  Form,
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
import {CursorIcon} from '../../../styled';
import update from 'immutability-helper';
const PRIVIEW_ELEMENT=`PRIVIEW_ELEMENT`;

const FormItem = Form.Item;
const dropType=[
  `ELEMENT`,
  PRIVIEW_ELEMENT,
];
const dragType=PRIVIEW_ELEMENT;


//放置目标处理集合
const target={
	canDrop(props){
		return true;
	},
  hover(props, monitor, component) {
		const dragItem = monitor.getItem().item;
    const {
			item:hoverItem,
			store:{
				createElement,
				moveElement,
				setDownElement,
				data,
			}
		}=props;
    setDownElement(monitor.getItem().item)
		const dragIndex = data.indexOf(dragItem);
		const hoverIndex = data.indexOf(hoverItem);
		if (dragIndex === hoverIndex) {
			return;
		}
    if (dragIndex === -1) {
      createElement(dragItem,hoverIndex);
      return;
		}
		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		// Determine mouse position
		const clientOffset = monitor.getClientOffset()
		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;
		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%
		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}
		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}
		// Time to actually perform the action
		moveElement(dragIndex, hoverIndex)
		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		//item.index = hoverIndex
	},
	drop(props,monitor,component){
    const tp=monitor.getItemType();


    //const dragData=monitor.getItem().data;
	}
}



//拖拽目标处理集合
const source={
	canDrag(props){
		return true;
	},
	beginDrag(props,monitor,component) {
		return props;
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
  		connectDropTarget: connect.dropTarget(),
  		isOver: monitor.isOver(),
  })
  } )
@DragSource(
	dragType,
	source,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview(),
	}),
)
export default class PriviewItem extends Component{
	shouldComponentUpdate(nextProps){
		return (
			(this.props.store.editField===nextProps.item.fieldName)
			||(this.props.item!==nextProps.item)
			||(this.props.required!==nextProps.required)
			||(this.props.label!==nextProps.label)
			||(this.props.fieldName!==nextProps.fieldName)
			||(this.props.optionRowShow!==nextProps.optionRowShow)
			||(JSON.stringify(this.props.options)!=JSON.stringify(nextProps.options))
			// ||(this.props.item.fieldName!==nextProps.item.fieldName)
		)
	}
  getFormItem=(item,props)=>{//根据元素类型获取控件
    const {type}=item;
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
    console.log(`PriviewItem render`);
    const {
			store:{
				design
			},
      item,
      item:{
        name
      },
      connectDropTarget,
      connectDragSource,
			form:{
				getFieldProps,
				getFieldDecorator
			},
    }=this.props;
    const labelStyle={
      cursor:design?`move`:null,
			display:`inline-block`,
    }
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      connectDragSource &&
      connectDropTarget &&
        connectDropTarget(
          connectDragSource(
            <div style={{cursor:`move`}}>
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
              <FormItem
                {...formItemLayout}
								colon={true}
                label={
                  <span dangerouslySetInnerHTML={{__html: item.label}} style={labelStyle}/>
                }
              >
                {
                  <Row gutter={5}>
                    <Col span={20}>
                      {this.getFormItem(item,getFieldProps(item.fieldName||'invalidField',{
												force:true,
												rules:[
													{
														required:item.required,
														message:item.requiredMessage
													},
												]
											}))}
                    </Col>
                    <Col span={2}>
                      <CursorIcon
                        type="edit"
                        onClick={this.edit}
                      />
                    </Col>
                    <Col span={2}>
                      <CursorIcon
												type="delete"
												onClick={this.delete}
											/>
                    </Col>
                  </Row>
                 }
              </FormItem>
            </div>
          )
        )
    )
  }
}
