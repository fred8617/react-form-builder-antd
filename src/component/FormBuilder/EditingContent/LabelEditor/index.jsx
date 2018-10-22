import React,{Component} from 'react';
import {
  Drawer,
  Radio ,
  Row,
  Col,
  Divider,
} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import update from 'immutability-helper';
import {FormConsume} from '../../../Context';

import {observer,inject} from 'mobx-react';
import {observable,action} from 'mobx';

@inject('store')
@observer
export default class LabelEditor extends Component{

  state={
    toolbar:[
      'inline',
      'blockType',
      'fontSize',
      'fontFamily',
      //'list',
      //'textAlign',
      'colorPicker',
      'link',
      //'embedded',
      'emoji',
      'image',
      'remove',
      'history'
    ],
  }

  @action onEditorStateChange=(editorState)=>{
    const {
      store,
      store:{
        editingData:data,
        setEditingData
      }
    }=this.props;
    const label=draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setEditingData(`label`,label);
    store.editorState=editorState;
  }
  render(){
    const {
      state:{
        toolbar
      },
      props:{
        store:{
          editorState
        }
      }
    }=this;
    return (
      <Editor
        toolbar={
          {options:toolbar}
        }
        editorState={editorState}
        wrapperClassName="editor"
        editorClassName="editor-main"
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}
