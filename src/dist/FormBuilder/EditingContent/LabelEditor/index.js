'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.default=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _class;var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactDraftWysiwyg=require('react-draft-wysiwyg');require('react-draft-wysiwyg/dist/react-draft-wysiwyg.css');var _draftJs=require('draft-js');var _draftjsToHtml=require('draftjs-to-html');var _draftjsToHtml2=_interopRequireDefault(_draftjsToHtml);var _htmlToDraftjs=require('html-to-draftjs');var _htmlToDraftjs2=_interopRequireDefault(_htmlToDraftjs);var _immutabilityHelper=require('immutability-helper');var _immutabilityHelper2=_interopRequireDefault(_immutabilityHelper);var _Context=require('../../../Context');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var LabelEditor=(0,_Context.FormConsume)(_class=function(_Component){_inherits(LabelEditor,_Component);function LabelEditor(){var _ref;var _temp,_this,_ret;_classCallCheck(this,LabelEditor);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=LabelEditor.__proto__||Object.getPrototypeOf(LabelEditor)).call.apply(_ref,[this].concat(args))),_this),_this.state={editorState:_draftJs.EditorState.createEmpty(),toolbar:['inline','blockType','fontSize','fontFamily',//'list',
//'textAlign',
'colorPicker','link',//'embedded',
'emoji','image','remove','history']},_this.setEditState=function(data){var editorState=void 0;var newContent=(0,_draftJs.convertFromHTML)(data.label);if(!newContent.contentBlocks){editorState=_draftJs.EditorState.createEmpty()}else{var contentState=_draftJs.ContentState.createFromBlockArray(newContent);editorState=_draftJs.EditorState.createWithContent(contentState)}var newState=(0,_immutabilityHelper2.default)(_this.state,{editorState:{$set:editorState}});_this.setState(newState)},_this.onEditorStateChange=function(editorState){var _this$props$state=_this.props.state,data=_this$props$state.editingData,setEditingData=_this$props$state.actions.setEditingData;var label=(0,_draftjsToHtml2.default)((0,_draftJs.convertToRaw)(editorState.getCurrentContent()));setEditingData(data,0,'label',label);_this.setState({editorState:editorState})},_temp),_possibleConstructorReturn(_this,_ret)}_createClass(LabelEditor,[{key:'componentDidMount',value:function componentDidMount(){this.setEditState(this.props.state.editingData)}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){console.log('EditingContent receive');var data=nextProps.state.editingData;var editingData=this.props.state.editingData;if(editingData.fieldName&&data.fieldName==editingData.fieldName){return}this.setEditState(data)}},{key:'render',value:function render(){var toolbar=this.state.toolbar;return _react2.default.createElement(_reactDraftWysiwyg.Editor,{toolbar:{options:toolbar},editorState:this.state.editorState,wrapperClassName:'editor',editorClassName:'editor-main',onEditorStateChange:this.onEditorStateChange})}}]);return LabelEditor}(_react.Component))||_class;exports.default=LabelEditor;