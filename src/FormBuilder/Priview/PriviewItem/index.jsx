import React,{Component} from 'react';
import {findDOMNode} from 'react-dom';
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
  Row,
  Col,
  Drawer,
	Checkbox,
	Radio,
} from 'antd';

import {CursorIcon} from '@/styled';
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
    const {data,item:hoverItem,createElement}=props;
    props.setDownElement(monitor.getItem().item)
		const dragIndex = data.indexOf(dragItem);
		const hoverIndex = data.indexOf(hoverItem);
		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}
    if (dragIndex === -1) {
      console.log(props.data);
      createElement(dragItem,hoverIndex);
      return;
		//	item.index = hoverIndex
			// props.insertCard(item.onCreate(item.data), hoverIndex)
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
		props.moveElement(dragIndex, hoverIndex)
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
  getFormItem=(item,props)=>{//根据元素类型获取控件
    const {type}=item;
    if(type===`input`){
      return <Input {...props}/>
    }else if(type===`inputNumber`){
      return <InputNumber {...props}/>
    }else if(type===`radio`){
      return <Input {...props}/>
    }else if(type===`checkbox`){
      return <Checkbox {...props}/>
    }else if(type===`checkboxGroup`){
      return (
				<CheckboxGroup  {...props} style={{width:`100%`,lineHeight:`32px`,position:`relative`,top:5}}>
					<Row>
						{
							item.options.map(e=>(
								<Col
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
			<RadioGroup {...props} style={{width:`100%`,lineHeight:`32px`,position:`relative`,top:5}}>
							<Row>
								{
									item.options.map(e=>(
										<Col
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
		}
  }
  render(){
    console.log(`PriviewItem render`);
    const {
      item,
      item:{
        name
      },
      connectDropTarget,
      connectDragSource,
      children,
      design,
      form:{
        getFieldDecorator,
        getFieldProps,
      },
      editShow,
    }=this.props;
    const labelStyle={
      cursor:design?`move`:null,
			display:`inline-block`,
    }
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
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
                        onClick={e=>editShow(item)}
                      />
                    </Col>
                    <Col span={2}>
                      <CursorIcon type="delete"/>
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
