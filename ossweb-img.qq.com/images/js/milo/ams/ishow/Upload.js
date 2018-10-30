/** 
 * @author garyzou
 * @version 1.0.0.0 
 * @function  ISHOW_CreateUploadForm
 * @modifytime 2013-04-25 11:42
 * 文件上传<br/>
 * @demo
 */
 
var g_ISHOW_Upload_Object={thumb:'',source:''};

function ISHOW_CreateUploadForm(options)
{
	need("biz.login",function(LoginManager){
		LoginManager.checkLogin(function(){
			var opt = {iModuleId:'4',thumb:'thumb',source:'source',imgsrc:'imgsrc',file:'IMG',_suffix:'gif|jpg|jpeg|bmp|png',_desc:'文件'};
			extend(opt, options);
			extend(g_ISHOW_Upload_Object, opt);
			//create form
			var formId = '__ISHOW_UploadForm__';
			var upd_url = location.protocol+"//apps.game.qq.com/cgi-bin/ams/module/ishow/V1.0/Upload.cgi";
			if(!document.getElementById(formId)){
				var tplHtml = '<div id="_ishowUploadFileCom" style="background-color:#fff; border:1px solid #389DD8; padding:20px;">\
									<form action='+ upd_url +' method="POST" name="' + formId + '" id="' + formId + '" target="__ISHOW_UploadIframe__" enctype="multipart/form-data">\
										<input type="hidden" name="iModuleId" id="iModuleId" value="' + opt.iModuleId + '" />\
										<input type="hidden" name="iUploadNum" id="iUploadNum" value="1" />\
										<input type="hidden" name="sPrefix" id="sPrefix" value="File" />\
										<input type="hidden" name="File_1_Type" id="iFileType" value="' + opt.file + ':FILE" />\
										<p style="color:#389DD8; font-size:14px; margin:-5px 0 5px;font-weight:bold;">文件上传</p>\
										<p style="color:#a1a1a1; font-size:12px;margin-bottom:8px;">( 提醒：有每天上传次数限制，请不要随意上传。)</p>\
										<input style=" height:21px;" type="file" name="File_1" id="File_1" _suffix="' + opt._suffix + '" _desc="' + opt._desc + '" /><br />\
										<input style="margin-top:10px; width:80px;" type="button"  id="_ishowUploadFileBtn" value="确认上传" />\
									</form>\
									<span title="关闭" id="_ishowUploadFileClose" style="position:absolute; right:10px; top:10px; cursor:pointer; font-size:14px; font-weight:bold; color:#389DD8;">&times;</span>\
								</div>';
								
				jQuery('body').append(tplHtml);
				
				_bindUploadDialogEvent(opt);
				/*
				var form = jQuery('<form  action="http://apps.game.qq.com/cgi-bin/ishow/ams/V1.0/Upload.cgi" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
				jQuery('<input type="hidden" name="iModuleId" id="iModuleId" value="' + opt.iModuleId + '" />').appendTo(form);
				jQuery('<input type="hidden" name="iUploadNum" id="iUploadNum" value="1" />').appendTo(form);
				jQuery('<input type="hidden" name="sPrefix" id="sPrefix" value="File" />').appendTo(form);
				jQuery('<input type="file" name="File_1" id="File_1" style="display:none;" _suffix="' + opt._suffix + '" _desc="' + opt._desc + '" onChange="ISHOW_Do_Submit(' +  opt.iModuleId + ')" />').appendTo(form);
				
				//set attributes
				jQuery(form).css('position', 'absolute');
				jQuery(form).css('top', '-1200px');
				jQuery(form).css('left', '-1200px');
				jQuery(form).attr('target', '__ISHOW_UploadIframe__');
				jQuery(form).appendTo('body');
				return form;
				*/
			}else{
				//_bindUploadDialogEvent(opt);
				//extend(g_ISHOW_Upload_Object, opt);
				need(['biz.dialog'],function(Dialog){
					jQuery('#iModuleId').attr('value',opt.iModuleId);
					jQuery('#iFileType').attr('value',opt.file);
					jQuery('#File_1').attr({'_suffix':opt._suffix,'_desc':opt._desc});
					g('File_1').value = '';
					Dialog.show({id:'_ishowUploadFileCom'});
				});
			}	
		},
		function(){
			LoginManager.login();
		});
	});		
}

function _bindUploadDialogEvent(opt)
{
	g('File_1').value = '';
	need(['biz.dialog'],function(Dialog){
		Dialog.show({id:'_ishowUploadFileCom'});		
		milo.addEvent(g('_ishowUploadFileBtn'),'click',function(){
			//extend(g_ISHOW_Upload_Object, opt);
			createUploadIframe("__ISHOW_UploadIframe__");
			var formId = '__ISHOW_UploadForm__';
			if(Check_File_Input()){	
				document.forms[formId].submit();				
			}else{
				return false;
			}
			Dialog.hide({id:'_ishowUploadFileCom'});
			
		});
		
		milo.addEvent(g('_ishowUploadFileClose'),'click',function(){

			Dialog.hide({id:'_ishowUploadFileCom'});		
		});
	});
}

function createUploadIframe(ifr_name)
{
	if(!document.getElementById(ifr_name))
	{
		var _iframe;
		try { // for I.E.
			_iframe= document.createElement('<iframe name="'+ifr_name+'">');
		} catch (ex) { //for other browsers, an exception will be thrown
			_iframe = document.createElement('iframe'); 
		}
		
		_iframe.setAttribute("id",ifr_name);
		_iframe.setAttribute("name",ifr_name);
		_iframe.setAttribute("height","0");
		_iframe.setAttribute("style","display:none;");   
		document.body.appendChild(_iframe);			
	}
}

function Check_File_Input()
{
	var elem = document.getElementById("File_1");
	if(elem.value == ""){
		milo.ui.alert("请先选择本地文件然后再提交");
		return false;		
	}
	var suffix = elem.getAttribute("_suffix");
	if ( suffix == null ) {
		return true;
	}
	suffix = suffix.toLowerCase().split("|");
	var file_suffix = elem.value.substr(elem.value.lastIndexOf(".")+1).toLowerCase();
	
	for (var i=0;i<suffix.length;++i) {
		if ( file_suffix == suffix[i] ) {
			return true;   
		}
	}
	
	milo.ui.alert(elem.getAttribute("_desc")+"格式不正确");
	return false;
}

function ajax_iframe_callback(_IFRAME_JSON_DATA_)
{	
	
	if(_IFRAME_JSON_DATA_.iRet >= 0){
		//上传完成后的回调
		if(typeof g_ISHOW_Upload_Object.uploadedCallback  == 'function'){
			g_ISHOW_Upload_Object.uploadedCallback(_IFRAME_JSON_DATA_);
		}
		
		if(g_ISHOW_Upload_Object.thumb){
			document.getElementById(g_ISHOW_Upload_Object.thumb).value = unescape(_IFRAME_JSON_DATA_.List[0].sThumbURL);
		}
		if(g_ISHOW_Upload_Object.source){
			document.getElementById(g_ISHOW_Upload_Object.source).value = unescape(_IFRAME_JSON_DATA_.List[0].sFileURL);
		}
		if(document.getElementById(g_ISHOW_Upload_Object.imgsrc)){
			document.getElementById(g_ISHOW_Upload_Object.imgsrc).src= unescape(_IFRAME_JSON_DATA_.List[0].sFileURL);
		}	
	}else{
		milo.ui.alert(_IFRAME_JSON_DATA_.sMsg);	
	}
}/*  |xGv00|690b98f3ae5983d1efd6de76c235c21c */