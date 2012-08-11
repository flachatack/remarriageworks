/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */
(function(){tinymce.create("tinymce.plugins.VisualChars",{init:function(e,t){var n=this;n.editor=e,e.addCommand("mceVisualChars",n._toggleVisualChars,n),e.addButton("visualchars",{title:"visualchars.desc",cmd:"mceVisualChars"}),e.onBeforeGetContent.add(function(e,t){n.state&&t.format!="raw"&&!t.draft&&(n.state=!0,n._toggleVisualChars(!1))})},getInfo:function(){return{longname:"Visual characters",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/visualchars",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_toggleVisualChars:function(e){var t=this,n=t.editor,r,i,s,o=n.getDoc(),u=n.getBody(),a,f=n.selection,l,c,h;t.state=!t.state,n.controlManager.setActive("visualchars",t.state),e&&(h=f.getBookmark());if(t.state){r=[],tinymce.walk(u,function(e){e.nodeType==3&&e.nodeValue&&e.nodeValue.indexOf(" ")!=-1&&r.push(e)},"childNodes");for(i=0;i<r.length;i++){a=r[i].nodeValue,a=a.replace(/(\u00a0)/g,'<span data-mce-bogus="1" class="mceItemHidden mceItemNbsp">$1</span>'),c=n.dom.create("div",null,a);while(node=c.lastChild)n.dom.insertAfter(node,r[i]);n.dom.remove(r[i])}}else{r=n.dom.select("span.mceItemNbsp",u);for(i=r.length-1;i>=0;i--)n.dom.remove(r[i],1)}f.moveToBookmark(h)}}),tinymce.PluginManager.add("visualchars",tinymce.plugins.VisualChars)})();