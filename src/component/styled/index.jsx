import styled from 'styled-components';
import {
  Icon,
  Row,
} from 'antd';
export const CursorIcon=styled(Icon)`
  cursor: pointer;
`;

export const HoverRow=styled(Row)`
  :hover{
    border:1px dashed red;
  }
`;

export const SpanLH32=styled.span`
  line-height: 32px;
`;

export const RowMB10=styled(Row)`
  margin-bottom: 10px;
`;

export const NoneElement=styled.div`
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
