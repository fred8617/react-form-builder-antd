import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';
import {toJS} from 'mobx';
import {
	DragSource,
	DropTarget,
	ConnectDragSource,
	ConnectDropTarget,
	DragSourceMonitor,
	DropTargetMonitor,
} from 'react-dnd';
import PriviewItem from '../../index';
import {
	CursorIcon,
	NoneElement,
	HoverRow,
} from '../../../../../styled';
import {
  Col,
	Icon,
	Divider
} from 'antd';
import {findDOMNode} from 'react-dom';
const PRIVIEW_ELEMENT=`PRIVIEW_ELEMENT`;
const dragType=`COL`;
const dropType=[
  `ELEMENT`,
  PRIVIEW_ELEMENT,
  dragType,
];

//放置目标处理集合
const target={
	canDrop(props){
		return true;
	},
  hover(props, monitor, component) {

	},
	drop(props,monitor,component){
		const {
			item:dragItem,
		} = monitor.getItem();
		const {
			item:hoverItem,
			store:{
				createElement,
				moveElement,
				setDownElement,
				addColIntoRow,
				data,
				addItemInCol,
			},
			parent
		}=props;
		console.log(`hover`,dragItem.type,hoverItem.type);
		const dragType=dragItem.type;
		const hoverType=hoverItem.type;
		if(dragType!='col'&&hoverType=='col'){
			// console.log(hoverItem,parent,dragItem);
			addItemInCol(dragItem,hoverItem)
			return;
		}
		// setDownElement(dragItem)


		const dragIndex = data.indexOf(dragItem);
		const hoverIndex = data.indexOf(hoverItem);
		// if (dragIndex === hoverIndex) {
		// 	console.log(`=`);
		// 	return;
		// }
		// if (dragIndex === -1) {
		// 	console.log(`-1`);
		//   createElement(dragItem,hoverIndex);
		//   return;
		// }
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
		// moveElement(dragIndex, hoverIndex)
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
		console.log(monitor.getItemType());
		return props;
	},
	endDrag(props){
		console.log(props);
	}
}


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
		monitor:monitor,
		connectDragPreview: connect.dragPreview(),
	}),
)
export default class DragableCol extends Component{
  render(){
    const {
      connectDropTarget,
      connectDragSource,
			item,
			item:{
				children:childrenGroup
			},
			store,
			design,
			form,
    }=this.props;
		const iconContainerWidth=70;
		const moveContainerWidth=25;
		const mainMargin=10;
		const elementContainer={
			margin:design?`0 ${mainMargin}px`:null,
			width:design?`calc( 100% - ${iconContainerWidth+moveContainerWidth+mainMargin*2}px )`:`100%`
		}
    return (
      <Col>
        {
          connectDragSource&&
          connectDropTarget&&
					connectDropTarget(
						<div className="priviewItem">
							{
								design&&connectDragSource(
									<div className="move-container">
										<Icon
											style={{cursor:`move`}}
											type="drag"
										/>
									</div>
								)
							}
							<div className="element-container" style={elementContainer}>
								{
									(design&&childrenGroup.length==0)
										?
											(
												<NoneElement style={{lineHeight:`31px`,height:39,marginBottom:24}}>
													列容器，请加入元素
												</NoneElement>
											)
										:
										(
											childrenGroup.map((e,i)=>(
												<PriviewItem
													parent={item}
													design={design}
													key={`PriviewItem${i}`}
													form={form}
													item={e}
													store={store}
													required={e.required}
													children={toJS(e.children)}
													label={e.label}
													options={toJS(e.options)}
													optionRowShow={e.optionRowShow}
													fieldName={e.fieldName}
													a={[]}
												/>
											))
										)
								}
							</div>
							{do{
								if(design){
									<div className="operation-container" style={{width:iconContainerWidth}}>
										<CursorIcon
											type="edit"
											onClick={this.edit}
										/>
										<Divider type="vertical"/>
										<CursorIcon
											type="delete"
											onClick={this.delete}
										/>
									</div>
								}
							}}
							<div style={{clear:`both`}}></div>
						</div>
					)
        }
      </Col>
    )
  }
}
