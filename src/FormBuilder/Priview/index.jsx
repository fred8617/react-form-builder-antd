import React,{Component} from 'react';

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
import {CursorIcon} from '@/styled';
import PriviewItem from './PriviewItem';//预览单个元素
import EditingContent from './EditingContent';//编辑抽屉
const FormItem = Form.Item;
const type=[`ELEMENT`];
//放置目标处理集合
const target={
	canDrop(props){
		return props.data.length==0;
	},
	drop(props,monitor,component){
    const {addElement}=props;
    const {item}=monitor.getItem();
    addElement(item)
	}
}

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

  render(){
    console.log(`Priview render`);
    const {
      props:{
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
        form,
        form:{
          getFieldDecorator,
          getFieldsValue,
        },
        connectDropTarget,
        moveElement,
        createElement,
        setDownElement,
        design,
      },
    }=this;
    return (
      connectDropTarget&&
      connectDropTarget(
        <div>
          <EditingContent
            form={form}
            data={editingData}
            visible={editing}
            onClose={editingClose}
            index={editingIndex}
            setEditingData={setEditingData}
            setGroupData={setGroupData}
            addGroupData={addGroupData}
            deleteGroupData={deleteGroupData}
          />
          <Form>
            {do{
              if(length==0){
                <div>抓点来</div>
              }else{
                data.map((e,i)=>{
                  return (
                    <PriviewItem
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
