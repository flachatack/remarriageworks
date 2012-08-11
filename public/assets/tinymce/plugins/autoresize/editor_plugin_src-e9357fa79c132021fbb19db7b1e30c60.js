/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */
(function(){tinymce.create("tinymce.plugins.AutoResizePlugin",{init:function(e,t){function i(){var t,s=e.getDoc(),o=s.body,u=s.documentElement,a=tinymce.DOM,f=n.autoresize_min_height,l;l=tinymce.isIE?o.scrollHeight:tinymce.isWebKit&&o.clientHeight==0?0:o.offsetHeight,l>n.autoresize_min_height&&(f=l),n.autoresize_max_height&&l>n.autoresize_max_height?(f=n.autoresize_max_height,o.style.overflowY="auto",u.style.overflowY="auto"):(o.style.overflowY="hidden",u.style.overflowY="hidden",o.scrollTop=0),f!==r&&(t=f-r,a.setStyle(a.get(e.id+"_ifr"),"height",f+"px"),r=f,tinymce.isWebKit&&t<0&&i())}var n=this,r=0;if(e.getParam("fullscreen_is_enabled"))return;n.editor=e,n.autoresize_min_height=parseInt(e.getParam("autoresize_min_height",e.getElement().offsetHeight)),n.autoresize_max_height=parseInt(e.getParam("autoresize_max_height",0)),e.onInit.add(function(e){e.dom.setStyle(e.getBody(),"paddingBottom",e.getParam("autoresize_bottom_margin",50)+"px")}),e.onChange.add(i),e.onSetContent.add(i),e.onPaste.add(i),e.onKeyUp.add(i),e.onPostRender.add(i),e.getParam("autoresize_on_init",!0)&&(e.onLoad.add(i),e.onLoadContent.add(i)),e.addCommand("mceAutoResize",i)},getInfo:function(){return{longname:"Auto Resize",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/autoresize",version:tinymce.majorVersion+"."+tinymce.minorVersion}}}),tinymce.PluginManager.add("autoresize",tinymce.plugins.AutoResizePlugin)})();