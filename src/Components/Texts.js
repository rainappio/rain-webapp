import styled from 'styled-components'
import { mediaQuery } from './MediaQuery';

export const Text = styled.div.attrs((props) => ({}))`
 
box-sizing: border-box;
display: ${props => props?.theme?.display ?? 'initial'};

//定位
position: ${props => props?.theme?.position ?? 'relative'};       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
top: ${props => props?.theme?.top ?? 'initial'};
right: ${props => props?.theme?.right ?? 'initial'};
bottom: ${props => props?.theme?.bottom ?? 'initial'};
left: ${props => props?.theme?.left ?? 'initial'};
z-index: ${props => props?.theme?.zIndex ?? 'initial'};

//寬高
width: ${props => props?.theme?.width ?? 'initial'}; 
min-width: 0; //修復滾動條 x 方向
height: ${props => props?.theme?.height ?? 'initial'}; 
line-height: ${props => props?.theme?.lineHeight ?? 'initial'};

//外距、邊框、內距
margin: ${props => props?.theme?.margin ?? 'initial'};
border: ${props => props?.theme?.border ?? 'initial'};
border-radius: ${props => props?.theme?.borderRadius ?? 'initial'};
border-top: ${props => props?.theme?.borderTop};
border-right: ${props => props?.theme?.borderRight};
border-bottom: ${props => props?.theme?.borderBottom};
border-left: ${props => props?.theme?.borderLeft};
padding: ${props => props?.theme?.padding ?? 'initial'};

//溢出
overflow-y: ${props => props?.theme?.overflowY ?? 'initial'};
overflow-x: ${props => props?.theme?.overflowX ?? 'initial'};

//滾動條美化
::-webkit-scrollbar {
    width: 0.5em;
    height: ${props => props?.theme?.scrollHeight ?? 'initial'}; //scroll-x 的高度
    }
::-webkit-scrollbar-track {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    margin:0px 0.1rem 5px 0;
    }
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: ${props => props?.theme?.scrollUnhoverBackgroundColor ?? '#9093994d'};
    }
&:hover::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: ${props => props?.theme?.scrollHoverBackgroundColor ?? '#9093994d'};
    }

//陰影
box-shadow: ${props => props?.theme?.boxShadow ?? 'initial'};

//背景
background-attachment: ${props => props?.theme?.backgroundAttachment ?? 'initial'}; 
background-color: ${props => props?.theme?.backgroundColor ?? 'initial'};
background-image: ${props => 'url(' + props?.theme?.img + ')' ?? 'initial'};
background-position: ${props => props?.theme?.backgroundPosition ?? 'initial'};
background-position-y: ${props => props?.theme?.positiony ?? 'initial'};
background-position-x: ${props => props?.theme?.positionx ?? 'initial'};
background-repeat: ${props => props?.theme?.backgroundRepeat ?? 'initial'};
background-size: ${props => props?.theme?.backgroundSize ?? 'initial'};

//游標
cursor: ${props => props?.theme?.cursor ?? 'initial'}; 

//轉場
transition: ${props => props?.theme?.transition ?? 'initial'}; 

//動畫

//字體
white-space : ${props => props?.theme?.whiteSpace ?? 'initial'};
text-align: ${props => props?.theme?.textAlign ?? 'initial'}; 
font-size: ${props => props?.theme?.fontSize ?? 'initial'}; 
color: ${props => props?.theme?.color ?? 'initial'}; 
font-family: ${props => props?.theme?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'}; 
font-weight: ${props => props?.theme?.fontWeight ?? '500'};
letter-spacing: ${ props => props?.theme?.letterSpacing ?? '0.0075em'};
text-decoration: ${ props => props?.theme?.textDecoration ?? 'initial'};
user-select: ${ props => props?.theme?.userSelect ?? 'initial'};

&:hover {
    color: ${props => props?.theme?.hoverColor};
}

@media ${ mediaQuery.tablet} {
    box-sizing: border-box;
    display: ${props => props?.theme?.tablet?.display ? props.theme.tablet.display : (props?.theme?.display ?? 'initial')};
    
    //定位
    position: ${props => props?.theme?.tablet?.position ? props.theme.tablet.position : (props?.theme?.position ?? 'relative')};       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
    top: ${props => props?.theme?.tablet?.top ? props.theme.tablet.top : (props?.theme?.top ?? 'initial')};
    right: ${props => props?.theme?.tablet?.right ? props.theme.tablet.right : (props?.theme?.right ?? 'initial')};
    bottom: ${props => props?.theme?.tablet?.bottom ? props.theme.tablet.bottom : (props?.theme?.bottom ?? 'initial')};
    left: ${props => props?.theme?.tablet?.left ? props.theme.tablet.left : (props?.theme?.left ?? 'initial')};
    z-index: ${props => props?.theme?.tablet?.zIndex ? props.theme.tablet.zIndex : (props?.theme?.zIndex ?? 'initial')};
    
    //寬高
    width: ${props => props?.theme?.tablet?.width ? props.theme.tablet.width : (props?.theme?.width ?? 'initial')}; 
    min-width: 0; //修復滾動條 x 方向
    height: ${props => props?.theme?.tablet?.height ? props.theme.tablet.height : (props?.theme?.height ?? 'initial')}; 
    line-height: ${props => props?.theme?.tablet?.lineHeight ? props.theme.tablet.lineHeight : (props?.theme?.lineHeight ?? 'initial')};
    
    //外距、邊框、內距
    margin: ${props => props?.theme?.tablet?.margin ? props.theme.tablet.margin : (props?.theme?.margin ?? 'initial')};
    border: ${props => props?.theme?.tablet?.border ? props.theme.tablet.border : (props?.theme?.border ?? 'initial')};
    border-radius: ${props => props?.theme?.tablet?.borderRadius ? props.theme.tablet.borderRadius : (props?.theme?.borderRadius ?? 'initial')};
    border-top: ${props => props?.theme?.tablet?.borderTop};
    border-right: ${props => props?.theme?.tablet?.borderRight};
    border-bottom: ${props => props?.theme?.tablet?.borderBottom};
    border-left: ${props => props?.theme?.tablet?.borderLeft};
    padding: ${props => props?.theme?.tablet?.padding ? props.theme.tablet.padding : (props?.theme?.padding ?? 'initial')};
    
    //溢出
    overflow-y: ${props => props?.theme?.tablet?.overflowY ? props.theme.tablet.overflowY : (props?.theme?.overflowY ?? 'initial')};
    overflow-x: ${props => props?.theme?.tablet?.overflowX ? props.theme.tablet.overflowX : (props?.theme?.overflowX ?? 'initial')};
    
    //滾動條美化
    ::-webkit-scrollbar {
        width: 0.5em;
        height: ${props => props?.theme?.tablet?.scrollHeight ? props.theme.tablet.scrollHeight : (props?.theme?.scrollHeight ?? 'initial')}; //scroll-x 的高度
        }
    ::-webkit-scrollbar-track {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        margin:0px 0.1rem 5px 0;
        }
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 4px;
        border-radius: 4px;
        background: ${props => props?.theme?.tablet?.scrollUnhoverBackgroundColor ? props.theme.tablet.scrollUnhoverBackgroundColor : (props?.theme?.scrollUnhoverBackgroundColor ?? '#9093994d')};
        }
    &:hover::-webkit-scrollbar-thumb {
        -webkit-border-radius: 4px;
        border-radius: 4px;
        background: ${props => props?.theme?.tablet?.scrollHoverBackgroundColor ? props.theme.tablet.scrollHoverBackgroundColor : (props?.theme?.scrollHoverBackgroundColor ?? '#9093994d')};
        }
    
    //陰影
    box-shadow: ${props => props?.theme?.tablet?.boxShadow ? props.theme.tablet.boxShadow : (props?.theme?.boxShadow ?? 'initial')};
    
    //背景
    background-attachment: ${props => props?.theme?.tablet?.backgroundAttachment ? props.theme.tablet.backgroundAttachment : (props?.theme?.backgroundAttachment ?? 'initial')}; 
    background-color: ${props => props?.theme?.tablet?.backgroundColor ? props.theme.tablet.backgroundColor : (props?.theme?.backgroundColor ?? 'initial')};
    background-image: ${props => props?.theme?.tablet?.img ? 'url(' + props.theme.tablet.img + ')' : (props?.theme?.img ?? 'initial')}; 
    background-position: ${props => props?.theme?.tablet?.backgroundPosition ? props.theme.tablet.backgroundPosition : (props?.theme?.backgroundPosition ?? 'initial')};
    background-position-y: ${props => props?.theme?.tablet?.positiony ? props.theme.tablet.positiony : (props?.theme?.positiony ?? 'initial')};
    background-position-x: ${props => props?.theme?.tablet?.positionx ? props.theme.tablet.positionx : (props?.theme?.positionx ?? 'initial')};
    background-repeat: ${props => props?.theme?.tablet?.backgroundRepeat ? props.theme.tablet.backgroundRepeat : (props?.theme?.backgroundRepeat ?? 'initial')};
    background-size: ${props => props?.theme?.tablet?.backgroundSize ? props.theme.tablet.backgroundSize : (props?.theme?.backgroundSize ?? 'initial')};
    
    //游標
    cursor: ${props => props?.theme?.tablet?.cursor ? props.theme.tablet.cursor : (props?.theme?.cursor ?? 'initial')}; 
    
    //轉場
    transition: ${props => props?.theme?.tablet?.transition ? props.theme.tablet.transition : (props?.theme?.transition ?? 'initial')}; 
    
    //動畫

    //字體
    white-space : ${ props => props?.theme?.tablet?.whiteSpace ? props.theme.tablet.whiteSpace : (props?.theme?.whiteSpace ?? 'initial')};
    text-align: ${ props => props?.theme?.tablet?.textAlign ? props.theme.tablet.textAlign : (props?.theme?.textAlign ?? 'initial')};
    font-size: ${ props => props?.theme?.tablet?.fontSize ? props.theme.tablet.fontSize : (props?.theme?.fontSize ?? 'initial')};
    color: ${ props => props?.theme?.tablet?.color ? props.theme.tablet.color : (props?.theme?.color ?? 'initial')};
    font-family: ${ props => props?.theme?.tablet?.fontFamily ? props.theme.tablet.fontFamily : (props?.theme?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif')};
    font-weight: ${ props => props?.theme?.tablet?.fontWeight ? props.theme.tablet.fontWeight : (props?.theme?.fontWeight ?? '500')};
    letter-spacing: ${ props => props?.theme?.tablet?.letterSpacing ? props.theme.tablet.letterSpacing : (props?.theme?.letterSpacing ?? '0.0075em')};
    user-select: ${ props => props?.theme?.tablet?.userSelect ? props.theme.tablet.userSelect : (props?.theme?.userSelect ?? 'initial')};

    &:hover {
        color: ${ props => props?.theme?.tablet?.hoverColor ? props.theme.tablet.hoverColor : (props?.theme?.hoverColor)};
    }
}
`