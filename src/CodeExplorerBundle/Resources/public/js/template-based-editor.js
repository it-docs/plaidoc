/**
 * Created by testp1 on 25/04/16.
 */

(function() {
    tplbEditor = function () {
        return new tplbEditor.fn.init();
    };
    tplbEditor.fn = tplbEditor.prototype = {
        constructor:tplbEditor,
    };
    init = tplbEditor.fn.init = function() {
        return this;
    };
    tplbEditor.onClick = function (evt) {
        tplbEditor.pageX=evt.pageX;
        tplbEditor.pageY=evt.pageY;
    };
    tplbEditor.onKeyPress = function (evt) {
            if (evt.defaultPrevented) {
                return; // Should do nothing if the key event was already consumed.
            }

            if (evt.ctrlKey) {
                //var theSel = document.getSelection()
                    //var theNode = theSel.focusNode;
                //var thePos = document.getSelection().
                //var x = this.getSelection().
                var $this = $(this);
                $this.contextMenu();
                //var evtCtx = $.Event("contextmenu", { data: evt.data, pageX: tplbEditor.pageX, pageY: tplbEditor.pageY });
                //$this.trigger(evtCtx);
                //jQuery(document.activeElement).triggerHandler('contextmenu',{pageX:tplbEditor.clientX,pageY:tplbEditor.clientY});
                //.contextMenu(this.getCursorPosition());
                    //.parent().parent().triggerHandler('contextmenu');
                    //.parent().parent().contextMenu(this.getCursorPosition());
                //parent().triggerHandler('contextmenu');

/*
// cf cette page https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent
*/
                //var codeOfCharE = 'e'.charCodeAt(0);
                switch (evt.key) {
                        case 'e':
                            jQuery(getSelection().focusNode).contextMenu();
                            break;
                        default:
                            return; // Quit when this doesn't handle the key event.
                    }
                    //return; // Quit when this doesn't handle the key event.
            }

            // Consume the event for suppressing "double action".
            //evt.preventDefault();
            return;
//        alert('tplbEditor.onKeyPress');
 //       alert(evt.target.localName);
  //      alert(getSelection().focusNode.nodeName);
    };
    tplbEditor.addTemplate = function (templateId) {
        var evt = ctxMenuEvt;
        var currentNode = $(evt.target);
        if (tplbEditor.selectedNode) currentNode = tplbEditor.selectedNode;
        var template = document.querySelector('#' + templateId);
        var clone = template.content.cloneNode(true);
        //$('div',clone).attr('style','border-style:dotted');
        var theDiv=$('div',clone);
        theDiv.attr('contextmenu','template-editor-contextmenu');
        //theDiv.keypress(tplbEditor.onKeyPress);
        //theDiv.children().attr('onkeypress','alert("ici")');
        currentNode.append(clone);
        if (tplbEditor.selectedNode) {
            $(tplbEditor.selectedNode).css('border-style','');
            tplbEditor.selectedNode=null;
        }
    };
    tplbEditor.selectParent = function () {
        var evt = ctxMenuEvt;
        var par = $(evt.target).parent();
        par.css('border-style','dotted');
        tplbEditor.selectedNode=par;
    };
    init.prototype = tplbEditor.fn;
    window.tplbEditor=tplbEditor;
    return tplbEditor;
}());

addEventListener('contextmenu',function(evt){
    window.ctxMenuEvt=evt;
});
jQuery( document ).ready(function() {
    try {
        jQuery('body').keypress(
            tplbEditor.onKeyPress
        ).click(
            tplbEditor.onClick
        );

        /////////////////////


                jQuery.contextMenu({
                    selector: 'body',
                    callback: function(key, options) {
                        var m = "clicked: " + key + "on a " + this.localName;
                        window.console && console.log(m) || alert(m);
                    },
/*                    position: function($menu,x,y){
                        var dbgx= x;
                        var dbgy=y;
                    },*/
                    determinePosition: function($menu){
                        $menu.offset({top : tplbEditor.pageY, left : tplbEditor.pageX});
                    },
                    items: {
                        "edit": {name: "Edit", icon: "edit"},
                        "cut": {name: "Cut", icon: "cut"},
                        copy: {name: "Copy", icon: "copy"},
                        "paste": {name: "Paste", icon: "paste"},
                        "delete": {name: "Delete", icon: "delete"},
                        "sep1": "---------",
                        "quit": {name: "Quit", icon: function(){
                            return 'context-menu-icon context-menu-icon-quit';
                        }}
                    }
                });
            ////////////////////////
        } catch (e) {
            alert ('error');
        }
    });
