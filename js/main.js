/**
 * Created by aine on 6/24/16.
 */
var ChooseDialog = React.createClass({
    chooseElement:function (){
        var choseType;
        var radioElements = $('.radio-input');
        for (var i=0; i<radioElements.length; i++){
            if (radioElements[i].checked){
                choseType = radioElements[i].value;
                break;
            }
        }
        this.props.addFormItem({
            type:choseType
        });
        $('.popup-dialog').hide();
    },
    render:function (){
        return (
            <div className="popup-dialog">
                <div className="tip-text">请选择需要添加的表单元素：</div>
                <input type="radio" name="formElement" value="text" className="radio-input" />文本
                <br />
                <input type="radio" name="formElement" value="date" className="radio-input" />日期
                <br />
                <span type="button" className="edit-button" onClick={this.chooseElement}>选择</span>
            </div>
        )
    }
});
var EditTemplate =  React.createClass({
    addFormItem:function (item){
        this.props.addFormItem(item);
    },
    removeFormItem:function (event){
        var index = $(event.currentTarget).data("item-index");
        this.props.removeFormItem(index);
    },
    chooseElement:function (type){
        this.props.chooseElement(type);
    },
    render:function (){
        var self = this;
        return (
            <div className="controls-wrapper">
                {
                    this.props.items.map(function (item,index){
                        return (<div className="item-wrapper">
                            {
                                (function (){
                                    if (item.type == "date"){
                                        return (<input type="date" className="text-input date-input" />)
                                    }
                                    else{
                                        return (<input type="text" className="text-input" />)
                                    }
                                })()
                            }
                            <span className="common-button delete-button" onClick={self.removeFormItem}
                                  data-item-index={index}>一</span>
                        </div>)
                    })
                }
                <ChooseDialog addFormItem={this.addFormItem}></ChooseDialog>
            </div>
        )
    }
});
var PreviewTemplate = React.createClass({
    render:function (){
        return (
            <div className="controls-wrapper">
                {
                    this.props.items.map(function (item){
                        return (<div className="item-wrapper">
                            {
                                (function (){
                                    if (item.type == "date"){
                                        return (<input type="date" className="text-input date-input" />)
                                    }
                                    else{
                                        return (<input type="text" className="text-input" />)
                                    }
                                })()
                            }
                        </div>)
                    })
                }
            </div>
        )
    }
});

var MyContainer = React.createClass({
    getInitialState:function (){
        return ({
            status:"edit",
            items:[]
        })
    },
    addFormItem:function (item) {
        this.state.items.push(item);
        this.setState(this.state);
    },
    removeFormItem:function (index) {
        this.state.items.splice(index, 1);
        this.setState(this.state);
    },
    popupDialog:function (e){
        $('.popup-dialog').show();
    },
    renderEditor:function (){
        this.state.status = "edit";
    },
    renderPreview:function (){
        this.state.status = "preview";
    },
    render:function () {
        var self = this;
        return (
            <div>
                {(function (){
                   if (self.state.status == "edit"){
                       return (<span className="edit-button" onClick={self.renderPreview}>预览</span>)
                   }else{
                       return (<span className="edit-button" onClick={self.renderEditor}>编辑</span>)
                   }
                })()}
                {(function (){
                    if (self.state.status == "edit"){
                        return (<EditTemplate items={self.state.items}
                        addFormItem={self.addFormItem} removeFormItem={self.removeFormItem} />)
                    }
                    else{
                        return (<PreviewTemplate items={self.state.items} />);
                    }
                })()}
                {(function (){
                    if (self.state.status == "edit"){
                        return (<span className="common-button add-button" onClick={self.popupDialog}>+</span>)
                    }else{
                        return (<span className="edit-button">提交</span>)
                    }
                })()}
            </div>
        )
    }
});

setInterval(function (){
    ReactDOM.render(<MyContainer />,
        document.getElementById("container"));
},50);