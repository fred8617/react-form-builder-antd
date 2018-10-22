import {observable,action} from 'mobx';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
export default class Store {
  editField;
  form;
  index=0;


  @observable editorState=EditorState.createEmpty();
  @observable submitUrl = ''; //测试提交|提交地址
  @observable data = []; //元素
  @observable design=false; //设计者模式
  @observable developer=false; //开发者模式
  @observable editingData = {}; //元素
  @observable editing=false;//编辑状态
  @observable elementTypes = [//元素类型
    {
      type: `input`,
      name: `文本输入框`,
      demo: true
    }, {
      type: `inputNumber`,
      name: `数字输入框`,
      demo: true
    }, {
      type: `radio`,
      name: `单选框`,
      demo: true
    }, {
      type: `checkbox`,
      name: `复选框`,
      demo: true
    }, {
      type: `checkboxGroup`,
      name: `复选框组`,
      demo: true
    }, {
      type: `select`,
      name: `下拉框`,
      demo: true
    }
  ];

  checkType=(item)=>{//检查元素类型赋予功能
    const {
      type,
    }=item;
    item.required=false;
    item.requiredMessage='';
    if(type==`checkboxGroup`||type==`radio`||type==`select`){
      item.options=[
        {label: 'default1', value: 'default1Value'},
        {label: 'default2', value: 'default2Value'}
      ]
      if(type==`checkboxGroup`||type==`radio`){
        item.optionRowShow=3;
      }
    }
  }
  getIndex=(data)=>{//获取元素索引
    return this.data.indexOf(data);
  }
  @action setDownElement=(element)=>{//稳定元素
    if(element.demo){
      delete element.demo;
      const newDemo={...element,demo:true};
      const index=this.elementTypes.indexOf(element);
      this.elementTypes.splice(index,1);
      this.elementTypes.splice(index,0,newDemo);
    }
  }
  @action addElement=(item)=>{//点击添加元素
    const fl=`${item.type}${this.index}`;
    const copyItem={...item,fieldName:fl,label:fl,demo:false};
    this.checkType(copyItem)
		this.data=[...this.data,copyItem];
    this.index++;
	}
  @action createElement=(dragItem,hoverIndex)=>{//生成元素
    const fl=`${dragItem.type}${this.index}`;
    dragItem.fieldName=fl;
    dragItem.label=fl;
    dragItem.adding=true;
    this.checkType(dragItem);
    this.index++;
    this.data.splice(hoverIndex, 0, dragItem);
    this.data.splice(hoverIndex, 1);
    this.data.splice(hoverIndex, 0, dragItem);
  }
  @action moveElement=( dragIndex, hoverIndex)=>{//移动元素
    const { data } = this;
		const dragCard = data[dragIndex];
    const hoverCard = data[hoverIndex];
    data.splice(dragIndex, 1);
    data.splice(hoverIndex, 0, dragCard);
  }

  @action editingShow=(data)=>{
    this.editing=true;
    this.editingData=data;
    this.setEditState(data)
  }
  @action deleteItem=(item)=>{
    const i=this.getIndex(item);
    this.data.splice(i,1);
  }
  @action setEditingData=(field,value)=>{
    this.editingData[field]=value;
  }
  @action setEditState=(data)=>{//富文本
    let editorState;
    const newContent=convertFromHTML(data.label);
    if (!newContent.contentBlocks) {
      editorState = EditorState.createEmpty();
    }else{
      const contentState = ContentState.createFromBlockArray(newContent);
      editorState=EditorState.createWithContent(contentState);
    }
    this.editorState=editorState;
  }


  @action setGroupData=(data,field,index,gpfield,value)=>{
    const i=this.getIndex(data)
    this.data[i][field][index][gpfield]=value;
  }


  @action addGroupData=(data,field,index,insertData)=>{
    const i=this.getIndex(data);
    this.data[i][field].splice(index+1,0,insertData)
  }

  @action deleteGroupData=(data,field,index)=>{
    const i=this.getIndex(data);
    this.data[i][field].splice(index,1)
  }

  @action init({design,data:{data,submitUrl},developer}){
    this.design=design;
    this.developer=developer;
    this.data=data;
    this.submitUrl=submitUrl;
  }

}
