(function(){function n(e,n){return e.getParam(n,t[n])}var e=tinymce.each,t={paste_auto_cleanup_on_paste:!0,paste_enable_default_filters:!0,paste_block_drop:!1,paste_retain_style_properties:"none",paste_strip_class_attributes:"mso",paste_remove_spans:!1,paste_remove_styles:!1,paste_remove_styles_if_webkit:!0,paste_convert_middot_lists:!0,paste_convert_headers_to_strong:!1,paste_dialog_width:"450",paste_dialog_height:"400",paste_text_use_dialog:!1,paste_text_sticky:!1,paste_text_sticky_default:!1,paste_text_notifyalways:!1,paste_text_linebreaktype:"combined",paste_text_replacements:[[/\u2026/g,"..."],[/[\x93\x94\u201c\u201d]/g,'"'],[/[\x60\x91\x92\u2018\u2019]/g,"'"]]};tinymce.create("tinymce.plugins.PastePlugin",{init:function(t,r){function s(e,r){var s=t.dom,o;i.onPreProcess.dispatch(i,e),e.node=s.create("div",0,e.content),tinymce.isGecko&&(o=t.selection.getRng(!0),o.startContainer==o.endContainer&&o.startContainer.nodeType==3&&e.node.childNodes.length===1&&/^(p|h[1-6]|pre)$/i.test(e.node.firstChild.nodeName)&&e.content.indexOf("__MCE_ITEM__")===-1&&s.remove(e.node.firstChild,!0)),i.onPostProcess.dispatch(i,e),e.content=t.serializer.serialize(e.node,{getInner:1,forced_root_block:""}),!r&&t.pasteAsPlainText?(i._insertPlainText(e.content),n(t,"paste_text_sticky")||(t.pasteAsPlainText=!1,t.controlManager.setActive("pastetext",!1))):i._insert(e.content)}function o(n){var r,i,o,u,a=t.selection,f=t.dom,l=t.getBody(),p,v;if(n.clipboardData||f.doc.dataTransfer){v=(n.clipboardData||f.doc.dataTransfer).getData("Text");if(t.pasteAsPlainText){n.preventDefault(),s({content:f.encode(v).replace(/\r?\n/g,"<br />")});return}}if(f.get("_mcePaste"))return;r=f.add(l,"div",{id:"_mcePaste","class":"mcePaste","data-mce-bogus":"1"},"﻿﻿"),l!=t.getDoc().body?p=f.getPos(t.selection.getStart(),l).y:p=l.scrollTop+f.getViewPort(t.getWin()).y,f.setStyles(r,{position:"absolute",left:tinymce.isGecko?-40:0,top:p-25,width:1,height:1,overflow:"hidden"});if(tinymce.isIE){u=a.getRng(),o=f.doc.body.createTextRange(),o.moveToElementText(r),o.execCommand("Paste"),f.remove(r);if(r.innerHTML==="﻿﻿"){t.execCommand("mcePasteWord"),n.preventDefault();return}return a.setRng(u),a.setContent(""),setTimeout(function(){s({content:r.innerHTML})},0),tinymce.dom.Event.cancel(n)}function m(e){e.preventDefault()}f.bind(t.getDoc(),"mousedown",m),f.bind(t.getDoc(),"keydown",m),i=t.selection.getRng(),r=r.firstChild,o=t.getDoc().createRange(),o.setStart(r,0),o.setEnd(r,2),a.setRng(o),window.setTimeout(function(){var n="",r;f.select("div.mcePaste > div.mcePaste").length?n="<p>"+f.encode(v).replace(/\r?\n\r?\n/g,"</p><p>").replace(/\r?\n/g,"<br />")+"</p>":(r=f.select("div.mcePaste"),e(r,function(t){var r=t.firstChild;r&&r.nodeName=="DIV"&&r.style.marginTop&&r.style.backgroundColor&&f.remove(r,1),e(f.select("span.Apple-style-span",t),function(e){f.remove(e,1)}),e(f.select("br[data-mce-bogus]",t),function(e){f.remove(e)}),t.parentNode.className!="mcePaste"&&(n+=t.innerHTML)})),e(f.select("div.mcePaste"),function(e){f.remove(e)}),i&&a.setRng(i),s({content:n}),f.unbind(t.getDoc(),"mousedown",m),f.unbind(t.getDoc(),"keydown",m)},0)}var i=this;i.editor=t,i.url=r,i.onPreProcess=new tinymce.util.Dispatcher(i),i.onPostProcess=new tinymce.util.Dispatcher(i),i.onPreProcess.add(i._preProcess),i.onPostProcess.add(i._postProcess),i.onPreProcess.add(function(e,n){t.execCallback("paste_preprocess",e,n)}),i.onPostProcess.add(function(e,n){t.execCallback("paste_postprocess",e,n)}),t.onKeyDown.addToTop(function(e,t){if((tinymce.isMac?t.metaKey:t.ctrlKey)&&t.keyCode==86||t.shiftKey&&t.keyCode==45)return!1}),t.pasteAsPlainText=n(t,"paste_text_sticky_default"),t.addCommand("mceInsertClipboardContent",function(e,t){s(t,!0)}),n(t,"paste_text_use_dialog")||t.addCommand("mcePasteText",function(e,r){var i=tinymce.util.Cookie;t.pasteAsPlainText=!t.pasteAsPlainText,t.controlManager.setActive("pastetext",t.pasteAsPlainText),t.pasteAsPlainText&&!i.get("tinymcePasteText")&&(n(t,"paste_text_sticky")?t.windowManager.alert(t.translate("paste.plaintext_mode_sticky")):t.windowManager.alert(t.translate("paste.plaintext_mode")),n(t,"paste_text_notifyalways")||i.set("tinymcePasteText","1",new Date((new Date).getFullYear()+1,12,31)))}),t.addButton("pastetext",{title:"paste.paste_text_desc",cmd:"mcePasteText"}),t.addButton("selectall",{title:"paste.selectall_desc",cmd:"selectall"}),n(t,"paste_auto_cleanup_on_paste")&&(tinymce.isOpera||/Firefox\/2/.test(navigator.userAgent)?t.onKeyDown.addToTop(function(e,t){((tinymce.isMac?t.metaKey:t.ctrlKey)&&t.keyCode==86||t.shiftKey&&t.keyCode==45)&&o(t)}):t.onPaste.addToTop(function(e,t){return o(t)})),t.onInit.add(function(){t.controlManager.setActive("pastetext",t.pasteAsPlainText),n(t,"paste_block_drop")&&t.dom.bind(t.getBody(),["dragend","dragover","draggesture","dragdrop","drop","drag"],function(e){return e.preventDefault(),e.stopPropagation(),!1})}),i._legacySupport()},getInfo:function(){return{longname:"Paste text/word",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/paste",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_preProcess:function(t,r){function h(t){e(t,function(e){e.constructor==RegExp?s=s.replace(e,""):s=s.replace(e[0],e[1])})}var i=this.editor,s=r.content,o=tinymce.grep,u=tinymce.explode,a=tinymce.trim,f,l;if(i.settings.paste_enable_default_filters==0)return;tinymce.isIE&&document.documentMode>=9&&/<(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)/.test(r.content)&&(h([[/(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g,"$1"]]),h([[/<br><br>/g,"<BR><BR>"],[/<br>/g," "],[/<BR><BR>/g,"<br>"]]));if(/class="?Mso|style="[^"]*\bmso-|w:WordDocument/i.test(s)||r.wordContent){r.wordContent=!0,h([/^\s*(&nbsp;)+/gi,/(&nbsp;|<br[^>]*>)+\s*$/gi]),n(i,"paste_convert_headers_to_strong")&&(s=s.replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi,"<p><strong>$1</strong></p>")),n(i,"paste_convert_middot_lists")&&h([[/<!--\[if !supportLists\]-->/gi,"$&__MCE_ITEM__"],[/(<span[^>]+(?:mso-list:|:\s*symbol)[^>]+>)/gi,"$1__MCE_ITEM__"],[/(<p[^>]+(?:MsoListParagraph)[^>]+>)/gi,"$1__MCE_ITEM__"]]),h([/<!--[\s\S]+?-->/gi,/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi,[/<(\/?)s>/gi,"<$1strike>"],[/&nbsp;/gi," "]]);do f=s.length,s=s.replace(/(<[a-z][^>]*\s)(?:id|name|language|type|on\w+|\w+:\w+)=(?:"[^"]*"|\w+)\s?/gi,"$1");while(f!=s.length);n(i,"paste_retain_style_properties").replace(/^none$/i,"").length==0?s=s.replace(/<\/?span[^>]*>/gi,""):h([[/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,function(e,t){return t.length>0?t.replace(/./," ").slice(Math.floor(t.length/2)).split("").join(" "):""}],[/(<[a-z][^>]*)\sstyle="([^"]*)"/gi,function(t,n,r){var i=[],s=0,o=u(a(r).replace(/&quot;/gi,"'"),";");return e(o,function(e){function o(e){return e+(e!=="0"&&/\d$/.test(e))?"px":""}var t,n,r=u(e,":");if(r.length==2){t=r[0].toLowerCase(),n=r[1].toLowerCase();switch(t){case"mso-padding-alt":case"mso-padding-top-alt":case"mso-padding-right-alt":case"mso-padding-bottom-alt":case"mso-padding-left-alt":case"mso-margin-alt":case"mso-margin-top-alt":case"mso-margin-right-alt":case"mso-margin-bottom-alt":case"mso-margin-left-alt":case"mso-table-layout-alt":case"mso-height":case"mso-width":case"mso-vertical-align-alt":i[s++]=t.replace(/^mso-|-alt$/g,"")+":"+o(n);return;case"horiz-align":i[s++]="text-align:"+n;return;case"vert-align":i[s++]="vertical-align:"+n;return;case"font-color":case"mso-foreground":i[s++]="color:"+n;return;case"mso-background":case"mso-highlight":i[s++]="background:"+n;return;case"mso-default-height":i[s++]="min-height:"+o(n);return;case"mso-default-width":i[s++]="min-width:"+o(n);return;case"mso-padding-between-alt":i[s++]="border-collapse:separate;border-spacing:"+o(n);return;case"text-line-through":if(n=="single"||n=="double")i[s++]="text-decoration:line-through";return;case"mso-zero-height":n=="yes"&&(i[s++]="display:none");return}if(/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?!align|decor|indent|trans)|top-bar|version|vnd|word-break)/.test(t))return;i[s++]=t+":"+r[1]}}),s>0?n+' style="'+i.join(";")+'"':n}]])}n(i,"paste_convert_headers_to_strong")&&h([[/<h[1-6][^>]*>/gi,"<p><strong>"],[/<\/h[1-6][^>]*>/gi,"</strong></p>"]]),h([[/Version:[\d.]+\nStartHTML:\d+\nEndHTML:\d+\nStartFragment:\d+\nEndFragment:\d+/gi,""]]),l=n(i,"paste_strip_class_attributes");if(l!=="none"){function p(e,t){if(l==="all")return"";var n=o(u(t.replace(/^(["'])(.*)\1$/,"$2")," "),function(e){return/^(?!mso)/i.test(e)});return n.length?' class="'+n.join(" ")+'"':""}s=s.replace(/ class="([^"]+)"/gi,p),s=s.replace(/ class=([\-\w]+)/gi,p)}n(i,"paste_remove_spans")&&(s=s.replace(/<\/?span[^>]*>/gi,"")),r.content=s},_postProcess:function(t,r){var i=this,s=i.editor,o=s.dom,u;if(s.settings.paste_enable_default_filters==0)return;r.wordContent&&(e(o.select("a",r.node),function(e){(!e.href||e.href.indexOf("#_Toc")!=-1)&&o.remove(e,1)}),n(s,"paste_convert_middot_lists")&&i._convertLists(t,r),u=n(s,"paste_retain_style_properties"),tinymce.is(u,"string")&&u!=="all"&&u!=="*"&&(u=tinymce.explode(u.replace(/^none$/i,"")),e(o.select("*",r.node),function(e){var t={},n=0,r,i,s;if(u)for(r=0;r<u.length;r++)i=u[r],s=o.getStyle(e,i),s&&(t[i]=s,n++);o.setAttrib(e,"style",""),u&&n>0?o.setStyles(e,t):e.nodeName=="SPAN"&&!e.className&&o.remove(e,!0)}))),n(s,"paste_remove_styles")||n(s,"paste_remove_styles_if_webkit")&&tinymce.isWebKit?e(o.select("*[style]",r.node),function(e){e.removeAttribute("style"),e.removeAttribute("data-mce-style")}):tinymce.isWebKit&&e(o.select("*",r.node),function(e){e.removeAttribute("data-mce-style")})},_convertLists:function(t,n){var r=t.editor.dom,i,s,o=-1,u,a=[],f,l;e(r.select("p",n.node),function(t){var n,l="",p,v,g,y;for(n=t.firstChild;n&&n.nodeType==3;n=n.nextSibling)l+=n.nodeValue;l=t.innerHTML.replace(/<\/?\w+[^>]*>/gi,"").replace(/&nbsp;/g," "),/^(__MCE_ITEM__)+[\u2022\u00b7\u00a7\u00d8o\u25CF]\s*\u00a0*/.test(l)&&(p="ul"),/^__MCE_ITEM__\s*\w+\.\s*\u00a0+/.test(l)&&(p="ol"),p?(u=parseFloat(t.style.marginLeft||0),u>o&&a.push(u),!i||p!=f?(i=r.create(p),r.insertAfter(i,t)):u>o?i=s.appendChild(r.create(p)):u<o&&(g=tinymce.inArray(a,u),y=r.getParents(i.parentNode,p),i=y[y.length-1-g]||i),e(r.select("span",t),function(e){var t=e.innerHTML.replace(/<\/?\w+[^>]*>/gi,"");p=="ul"&&/^__MCE_ITEM__[\u2022\u00b7\u00a7\u00d8o\u25CF]/.test(t)?r.remove(e):/^__MCE_ITEM__[\s\S]*\w+\.(&nbsp;|\u00a0)*\s*/.test(t)&&r.remove(e)}),v=t.innerHTML,p=="ul"?v=t.innerHTML.replace(/__MCE_ITEM__/g,"").replace(/^[\u2022\u00b7\u00a7\u00d8o\u25CF]\s*(&nbsp;|\u00a0)+\s*/,""):v=t.innerHTML.replace(/__MCE_ITEM__/g,"").replace(/^\s*\w+\.(&nbsp;|\u00a0)+\s*/,""),s=i.appendChild(r.create("li",0,v)),r.remove(t),o=u,f=p):i=o=0}),l=n.node.innerHTML,l.indexOf("__MCE_ITEM__")!=-1&&(n.node.innerHTML=l.replace(/__MCE_ITEM__/g,""))},_insert:function(e,t){var n=this.editor,r=n.selection.getRng();!n.selection.isCollapsed()&&r.startContainer!=r.endContainer&&n.getDoc().execCommand("Delete",!1,null),n.execCommand("mceInsertContent",!1,e,{skip_undo:t})},_insertPlainText:function(t){function u(n){e(n,function(e){e.constructor==RegExp?t=t.replace(e,""):t=t.replace(e[0],e[1])})}var r=this.editor,i=n(r,"paste_text_linebreaktype"),s=n(r,"paste_text_replacements"),o=tinymce.is;typeof t=="string"&&t.length>0&&(/<(?:p|br|h[1-6]|ul|ol|dl|table|t[rdh]|div|blockquote|fieldset|pre|address|center)[^>]*>/i.test(t)?u([/[\n\r]+/g]):u([/\r+/g]),u([[/<\/(?:p|h[1-6]|ul|ol|dl|table|div|blockquote|fieldset|pre|address|center)>/gi,"\n\n"],[/<br[^>]*>|<\/tr>/gi,"\n"],[/<\/t[dh]>\s*<t[dh][^>]*>/gi,"	"],/<[a-z!\/?][^>]*>/gi,[/&nbsp;/gi," "],[/(?:(?!\n)\s)*(\n+)(?:(?!\n)\s)*/gi,"$1"],[/\n{3,}/g,"\n\n"]]),t=r.dom.decode(tinymce.html.Entities.encodeRaw(t)),o(s,"array")?u(s):o(s,"string")&&u(new RegExp(s,"gi")),i=="none"?u([[/\n+/g," "]]):i=="br"?u([[/\n/g,"<br />"]]):i=="p"?u([[/\n+/g,"</p><p>"],[/^(.*<\/p>)(<p>)$/,"<p>$1"]]):u([[/\n\n/g,"</p><p>"],[/^(.*<\/p>)(<p>)$/,"<p>$1"],[/\n/g,"<br />"]]),r.execCommand("mceInsertContent",!1,t))},_legacySupport:function(){var e=this,t=e.editor;t.addCommand("mcePasteWord",function(){t.windowManager.open({file:e.url+"/pasteword.htm",width:parseInt(n(t,"paste_dialog_width")),height:parseInt(n(t,"paste_dialog_height")),inline:1})}),n(t,"paste_text_use_dialog")&&t.addCommand("mcePasteText",function(){t.windowManager.open({file:e.url+"/pastetext.htm",width:parseInt(n(t,"paste_dialog_width")),height:parseInt(n(t,"paste_dialog_height")),inline:1})}),t.addButton("pasteword",{title:"paste.paste_word_desc",cmd:"mcePasteWord"})}}),tinymce.PluginManager.add("paste",tinymce.plugins.PastePlugin)})();