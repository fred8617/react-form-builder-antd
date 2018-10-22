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
import {
  observer,
  inject
} from 'mobx-react';
import {toJS} from 'mobx';
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
`;






const FormItem = Form.Item;
const type=[`ELEMENT`];
//放置目标处理集合
const target={
	canDrop(props){
		return props.store.data.length==0;
	},
	drop(props,monitor,component){
    const {item:element}=monitor.getItem();
		const {
			store:{
				addElement
			},
		}=props;
		addElement(element);
	}
};



@DropTarget(
  type,
	target,
	(connect,monitor) =>{
    return ({
  		connectDropTarget: connect.dropTarget(),
  		isOver: monitor.isOver(),
  })
})
@observer
export default class Priview extends Component{
  render(){
		console.log(`Priview render`);
		const {
			connectDropTarget,
			store,
			store:{//Dnd的原因，store必须通过props传入不能注入
				editingData:{
					required=false,
					label,
					options,
					optionRowShow,
					fieldName
				},
				data,
				data:{
					length,
				}
			},
			form,
		}=this.props;
		const a=[];
		options&&options.forEach(e=>a.push(e.label));
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
											form={form}
											item={e}
											store={store}
											required={e.required}
											label={e.label}
											options={toJS(e.options)}
											optionRowShow={e.optionRowShow}
											fieldName={e.fieldName}
											a={a}
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
