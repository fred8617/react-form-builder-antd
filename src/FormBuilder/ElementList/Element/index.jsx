import React,{Component} from 'react';
import {List} from 'antd';
import {
	DragSource,
} from 'react-dnd';

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
      addElement,
      connectDragSource,
      item,
      item:{
        type,
        name,
      }
    }=this.props;
    return (
      connectDragSource &&
      connectDragSource(
        <div onClick={e=>addElement(item)}>
          {name}
        </div>
      )
    )
  }
}
