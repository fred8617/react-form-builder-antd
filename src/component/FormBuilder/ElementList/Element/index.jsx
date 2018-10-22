import React,{Component} from 'react';
import {List} from 'antd';
import {FormConsume} from '../../../Context';
import {
	DragSource,
} from 'react-dnd';
import {
  inject,
  observer,
} from 'mobx-react';
import {action} from 'mobx';

const type=`ELEMENT`;
//拖拽目标处理集合
const source={
	canDrag(props){
		return true;
	},
	beginDrag(props,monitor,component) {
		return props;
	}
}

@inject('store')
@observer
@FormConsume
@DragSource(
	type,
	source,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview(),
	}),
)
export default class Element extends Component{

  render(){
    const {
      connectDragSource,
			item,
			item:{
        name,
      },
			store:{
				addElement
			}
    }=this.props;
    return (
      connectDragSource &&
      connectDragSource(
        <div
					onClick={e=>addElement(item)}
					style={{cursor:`pointer`}}
					>
          {name}
        </div>
      )
    )
  }
}
