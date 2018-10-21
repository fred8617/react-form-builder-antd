import React,{Component} from 'react';
import {FormConsume} from '../../Context';
import {
	CursorIcon
} from '../../styled';
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
} from 'antd';
import update from 'immutability-helper';

import styled from 'styled-components';
import PriviewItem from './PriviewItem';//预览单个元素

const NoneElement=styled.div`
	height:100px;
	text-align: center;
	border: 3px dashed #d3d3d3;
	color:#d3d3d3;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	font-size: 20px;
	border-radius: 5px;
	line-height: 100px;
`





const FormItem = Form.Item;
const type=[`ELEMENT`];
//放置目标处理集合
const target={
	canDrop(props){
		return props.state.data.length==0;
	},
	drop(props,monitor,component){
    const {item:element}=monitor.getItem();
		const {
			state:{
				actions:{
					addElement
				},
			},
		}=props;
		addElement(element);
	}
};

@FormConsume
@DropTarget(
  type,
	target,
	(connect,monitor) =>{
    return ({
  		connectDropTarget: connect.dropTarget(),
  		isOver: monitor.isOver(),
  })
})
export default class Priview extends Component{
	shouldComponentUpdate(nextProps){
		return (
			this.props.state.data!==nextProps.state.data
		);
	}
  render(){
    console.log(`Priview render`);
    const {
      props:{
				state:{
					editing,
	        editingData,
	        editingIndex,
	        editShow,
	        editingClose,
	        setEditingData,
	        setGroupData,
	        addGroupData,
	        deleteGroupData,
	        data,
	        data:{
	          length
	        },
					moveElement,
	        createElement,
	        setDownElement,
	        design,
				},
        connectDropTarget,
				form,
				form:{
					getFieldDecorator,
					getFieldsValue,
				},
      },
    }=this;
    return (
      connectDropTarget&&
      connectDropTarget(
        <div>
          <Form>
            {do{
              if(length==0){
                <NoneElement>
									抓点来
								</NoneElement>
              }else{
                data.map((e,i)=>{
                  return (
                    <PriviewItem
											key={i}
                      design={design}
                      form={form}
                      item={e}
                      editShow={editShow}
                      data={data}
                      moveElement={moveElement}
                      setDownElement={setDownElement}
                      createElement={createElement}
                    />

                  )
                }
                )
              }
            }}
          </Form>
        </div>
      )
    )
  }
}
