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
        var template = document.querySelector('#' + templateId);
        var clone = template.content.cloneNode(true);
        $('div',clone).attr('style','border-style:solid');
        $('div',clone).attr('contextmenu','template-editor-contextmenu');
        document.body.appendChild(clone);
    };
    tplbEditor.tutu = function () {
        alert('tutu');
        return this;
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
