import {observable,action,set} from 'mobx';
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
  @observable containerTypes = [
    {
      type: `row`,
      name: `行`,
      demo: true
    },
    {
      type: `col`,
      name: `列`,
      demo: true
    },
  ];
  @observable elementTypes = [//元素类型
    {
      type: `input`,
      name: `文本输入框`,
      demo: true
    },
    {
      type: `inputNumber`,
      name: `数字输入框`,
      demo: true
    },
    {
      type: `radio`,
      name: `单选框`,
      demo: true
    },
    {
      type: `checkbox`,
      name: `复选框`,
      demo: true
    },
    {
      type: `checkboxGroup`,
      name: `复选框组`,
      demo: true
    },
    {
      type: `select`,
      name: `下拉框`,
      demo: true
    },
  ];

  @action checkType=(item)=>{//检查元素类型赋予功能
    const {
      type,
    }=item;
    set(item,'required',false);
    set(item,'requiredMessage','');
    if(type==`checkboxGroup`||type==`radio`||type==`select`){
      set(item,'options',[
        {label: 'default1', value: 'default1Value'},
        {label: 'default2', value: 'default2Value'}
      ]);
      if(type==`checkboxGroup`||type==`radio`){
        set(item,'optionRowShow',3);
      }
    }else if(type==`row`){
      set(item,'children',[

      ]);
    }
  }
  getIndex=(data)=>{//获取元素索引
    return this.data.indexOf(data);
  }
  @action setDownElement=(element)=>{//稳定元素
    if(element.demo){
      delete element.demo;
      const newDemo={...element,demo:true};
      let type='elementTypes';
      if(element.type=='row'||element.type=='col'){
        type='containerTypes';
      }
      let index=this[type].indexOf(element);
      this[type].splice(index,1);
      this[type].splice(index,0,newDemo);
      this[type]=[...this[type]];
    }
  }

  @action addItemInCol=(dragItem,hoverItem)=>{//元素放入col中
    if(hoverItem.children.length===0){
      this.data.remove(dragItem);
      dragItem.inCol=true;
      hoverItem.children.push(dragItem);
    }
  }

  @action addColIntoRow=(col,row)=>{
    // console.log(col,row);
    if(row.children.indexOf(col)<0){
      set(col,'children',[

      ]);
      set(col,'span',24);
      // const copyItem=observable({...col});
      row.children.push(col);
    }

  }

  checkName=(str,type,l=0)=>{
    const exsit=this.data.filter(e=>e.fieldName==str).length>l;
    if(exsit){
      this.index++;
      str=`${type}${this.index}`;
      str=this.checkName(str,type);
    }
    return str;
  }

  @action addElement=(item)=>{//点击添加元素
    if(item.type=='col'){
      const rows=this.data.filter(e=>e.type==`row`);
      if(rows.length==0){
        return
      }
      set(item,'children',[

      ]);
      set(item,'span',24);
      const copyItem=observable({...item});
      rows[0].children.push(copyItem);
      return;
    }
    const flC=`${item.type}${this.index}`;
    const fl=this.checkName(flC,item.type);
    const copyItem=observable({...item,fieldName:fl,label:fl,demo:false});
    this.checkType(copyItem)
		this.data=[...this.data,copyItem];
    this.index++;
	}
  @action createElement=(dragItem,hoverIndex)=>{//生成元素
    if(dragItem.inCol===true){
      return;
    }
    const flC=`${dragItem.type}${this.index}`;
    const fl=this.checkName(flC,dragItem.type);
    set(dragItem,'fieldName',fl);
    set(dragItem,'label',fl);
    this.checkType(dragItem);
    this.index++;
    // this.data.splice(hoverIndex, 0, dragItem);
    // this.data.splice(hoverIndex, 1);
    this.data.splice(hoverIndex, 0, dragItem);
  }
  @action moveElement=( dragIndex, hoverIndex)=>{//移动元素
    const { data } = this;
    console.log(dragIndex, hoverIndex);
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

  @action init({design,data:{data=[],submitUrl,index=0},developer}){
    this.design=design;
    this.developer=developer;
    this.data=data;
    this.submitUrl=submitUrl;
    this.index=Number(index);
  }

  dragDirection=(
          initialClientOffset,
          clientOffset,
          sourceClientOffset,
        )=> {
    const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
    const hoverClientY = clientOffset.y - sourceClientOffset.y;
    if (hoverClientY > hoverMiddleY) {
      return `Bottom`;
    }
    if (hoverClientY < hoverMiddleY) {
      return 'Top';
    }
  }

}
