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
        //this check if it is a click on a context menu item (or a descendant element of the item like a span...), and if yes does nothing as the focusNode does not change in this case.
        var isMenuItem=$(evt.target).closest('.context-menu-item').length;
        if (!isMenuItem) {
        tplbEditor.pageX = evt.pageX;
        tplbEditor.pageY = evt.pageY;
        tplbEditor.removeSelection();
        tplbEditor.selectedNode = $(document.getSelection().focusNode);
        }
    };
    tplbEditor.onKeyPress = function (evt) {
        /* this test that alt-arrow and ctrl-alt-arrow keys do not trigger significant firfox browser behavior so they can be used to trigger the most common authoring feauture :
           - alt-arrow keys : insert a new template (via a template choice context menu) :
             - down arrow : at the current position (offset) in the focusNode if one is defined (for exemple if caret is in the text of the element), otherwise at the beginning of the element
             - right arrow : after the focusNode if its an element or the focusNode parent if the focusNode is '#text'
             - up arrow : at the end of the focusNode parent or grand parent if the focusNode is '#text'
             - left arrow : before the focusNode if its an element or the focusNode parent if the focusNode is '#text'
           - ctrl-alt-arrow keys : select another element in the element structure (via a display of the selected element border and path in the element structure):
            - up arrow : the focusNode parent
            - left arrow : the element before the focusNode if its an element or before the focusNode parent if the focusNode is '#text'
            - right arrow : the element after the focusNode if its an element or the focusNode parent if the focusNode is '#text'
            - down arrow : the first focusNode child element if its an element or nothing if the focusNode is '#text'
           - other context menu (and associated keyboard shortcuts) will be defined to : select a range of brother element, delete or cut and pazst them...
          */
        /* some test alerts...
        alert('alt :' + evt.altKey);
        alert('key : ' + evt.key);
        alert('ctrl : ' + evt.ctrlKey);
        var theSel = document.getSelection();
        var theNode = theSel.focusNode;
        alert('node : ' + theNode.nodeName);
        */
        if (evt.defaultPrevented) {
                return; // Should do nothing if the key event was already consumed.
            }

            if (evt.altKey) {

                //var thePos = document.getSelection().
                //var x = this.getSelection().
                //var $this = $(this);
                //$this.contextMenu();
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
                        case 'Down':
                            var $this = $(this);
                            $this.contextMenu();
                            //jQuery(getSelection().focusNode).contextMenu();
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
        var currentNode;
        if (tplbEditor.selectedNode)
            currentNode = tplbEditor.selectedNode;
        /* does not work anymore with jquery contextMenu plugin
          else if (ctxMenuEvt) currentNode = $(evt.target);
           */
        else
            currentNode = document.getSelection().focusNode;
        if (currentNode.localName=='p'||(currentNode.parentNode && currentNode.parentNode.localName=='p')) {
            alert('a DIV template element cannot be inserted inside a Paragraph element. Please select a parent element with the "Select parent" context menu to select a parent element that can include a DIV.');
            return;
        }
        var template = document.querySelector('#' + templateId);
        var clone = template.content.cloneNode(true);
        //$('div',clone).attr('style','border-style:dotted');
        var theDiv=$('div',clone);
        theDiv.attr('contextmenu','template-editor-contextmenu');
        //theDiv.keypress(tplbEditor.onKeyPress);
        //theDiv.children().attr('onkeypress','alert("ici")');
        currentNode.append(clone);
        tplbEditor.removeSelection();
    };
    tplbEditor.selectParent = function () {
        /* does not work anymore with jquery contextMenu plugin
                    var evt = ctxMenuEvt;
                     */
            var par;
                if (tplbEditor.selectedNode) {
                    par = tplbEditor.selectedNode.parent();
                    tplbEditor.removeSelection();
                }
        /* does not work anymore with jquery contextMenu plugin
                        else  if (evt) par=$(evt.target).parent();
                         */
                else par=$(document.getSelection().focusNode).parent();
            par.css('border-style','dotted');
            tplbEditor.selectedNode=par;
        };
    tplbEditor.removeSelection = function () {
            if (tplbEditor.selectedNode) {
                tplbEditor.selectedNode.css('border-style','');
                tplbEditor.selectedNode=null;
            }
        };
    init.prototype = tplbEditor.fn;
    window.tplbEditor=tplbEditor;
    return tplbEditor;
}());

/* does not work anymore with jquery contextMenu plugin
addEventListener('contextmenu',function(evt){
    window.ctxMenuEvt=evt;
});
*/
jQuery( document ).ready(function() {
    try {
        jQuery('body').keyup(
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
                        /*"edit": {name: "Edit", icon: "edit"},
                        "cut": {name: "Cut", icon: "cut"},
                        copy: {name: "Copy", icon: "copy"},
                        "paste": {name: "Paste", icon: "paste"},
                        "delete": {name: "Delete", icon: "delete"},
                        "sep1": "---------",
                        "quit": {name: "Quit", icon: function(){
                            return 'context-menu-icon context-menu-icon-quit';
                        }},*/
                        InsertSubmenu: {
                                name: "Insert (Alt-DownArrow)",
                                items : {
                                    "insert-business-request":
                                    {
                                        name: "Business Request",
                                            icon: function () {
                                            return 'context-menu-icon context-menu-icon-quit';
                                        },
                                        callback: function(){
                                            tplbEditor.addTemplate('business-request');
                                            alert('Prototype level implemented : will insert a new business request template at the current position : a new editable business request template should appear in the document. You can also try the shortcut Alt-down that will display, in this proto, this global context menu at the mouse position. In a later version, it will only display this template insertion sub menu.');
                                        }
                                    },
                                    "business-request-ref": {
                                        name: "Business Request Reference",
                                            icon: function(){
                                            return 'context-menu-icon context-menu-icon-quit';
                                        },
                                        callback: function(){
                                            alert ('Not Yet Implemented : will display a screen  to select an existing business request in the document database and create a reference to the selected business request at the current position, with a default behavior "inline" or "navigate". "Inline" reference will dynamically include the business request in place of the reference, "Navigate" will navigate from the reference to the request. These two behaviors can be toggled.');
                                        }
                                    },
                                    "symfony-controller": {
                                        name: "Symfony Controller",
                                            icon: function(){
                                            return 'context-menu-icon context-menu-icon-quit';
                                        },
                                        callback: function(){
                                            alert ('Not Yet Implemented : will display a screen  to select an existing Symfony Contoller in the (Git) source repository database and create a reference to the selected controller at the current position, with the same "inline" or "navigate" behaviors, as for document elements like business request elements. The goal is to organise a software platform documentation as a repository of document elements linked together, enabling breakthrough traceability between business/user requirements and their code implementation, with minimal documenting process cost for authors : just create the/ focus on value added document element without the charge of extra documenting management tasks. Further more , conversion of the document elements to markdown or other wiki formats will be available to ensure flexible integration in software platform management solutions like Github, Redmine, Trello...');
                                        }
                                    }

                                }
                        },
                        InsertAfterSubmenu: {
                            name: "Insert after (Alt-RightArrow)",
                            items : {
                                "insert-after-business-request":
                                {
                                    name: "Business Request",
                                    icon: function () {
                                        return 'context-menu-icon context-menu-icon-quit';
                                    },
                                    callback: function(){
                                        alert('No yet implemented : will do the same as the Insert menu but after the current element of the document structure. Sub menus to insert before the current element (left) or in the current element parent (up) will be added too, together with menus to navigate and select elements in the whole document structure (Ctrl-Alt-Up, left, right...), so that combined with the insertion menus, one can quickly edit a whole document structure without the "lost in the structure" effect.');
                                    }
                                }
                            }
                        },
                        "select-parent":
                        {
                            name: "Select parent (Ctrl-Alt-UpArrow)",
                            icon: function () {
                                return 'context-menu-icon context-menu-icon-quit';
                            },
                            callback: function(){
                                tplbEditor.selectParent();
                                alert('Prototype level implemented : select the parent of the current element to enable insertion in it or other element selection in it . The parent element box borders are now visible (dotted lines).');
                            }
                        }

                    }
                });
            ////////////////////////
        } catch (e) {
            alert ('error');
        }
    });
