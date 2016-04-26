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
    tplbEditor.addTemplate = function (templateId) {
        var evt = ctxMenuEvt;
        var currentNode = $(evt.target);
        if (tplbEditor.selectedNode) currentNode = tplbEditor.selectedNode;
        var template = document.querySelector('#' + templateId);
        var clone = template.content.cloneNode(true);
        //$('div',clone).attr('style','border-style:solid');
        $('div',clone).attr('contextmenu','template-editor-contextmenu');
        currentNode.append(clone);
        if (tplbEditor.selectedNode) {
            $(tplbEditor.selectedNode).css('background-color','');
            tplbEditor.selectedNode=null;
        }
    };
    tplbEditor.selectParent = function () {
        var evt = ctxMenuEvt;
        var par = $(evt.target).parent();
        par.css('background-color','yellow');
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
        
    } catch (e) {
        alert ('error');
    }
});
