import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';
import {
	CursorIcon,
	NoneElement,
	HoverRow,
} from '../../../../styled';
import {
	DragSource,
	DropTarget,
	ConnectDragSource,
	ConnectDropTarget,
	DragSourceMonitor,
	DropTargetMonitor,
} from 'react-dnd';
import {findDOMNode} from 'react-dom';
import DragableCol from './DragableCol';

const type=`COL`;

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
				addColIntoRow,
				data,
			}
		}=props;
		// console.log(`hover`);
		// setDownElement(dragItem)
    const dragIndex = data.indexOf(dragItem);
    const hoverIndex = data.indexOf(hoverItem);

	},
	drop(props,monitor,component){
    // const tp=monitor.getItemType();
    //const dragData=monitor.getItem().data;
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
} )
@inject('store')
@observer
export default class DropableRow extends Component{
  render(){
    const {
      connectDropTarget,
			isOver,
      childrenGroup,
      store,
      item,
			design,
			form,
		}=this.props;
    return connectDropTarget(
      <div>
        <HoverRow>
          {
            (childrenGroup.length==0&&design)
              ?
                (
                  <NoneElement style={{lineHeight:`31px`,height:39,marginBottom:24}}>
                    行容器，请加入列
                  </NoneElement>
                )
              :
              (
                childrenGroup.map((e,i)=>(
                  <DragableCol
										form={form}
										design={design}
                    parent={item}
                    key={`DragableCol${i}`}
                    store={store}
                    item={e}
                  />
                ))
              )
          }
        </HoverRow>
      </div>
    )
  }
}
