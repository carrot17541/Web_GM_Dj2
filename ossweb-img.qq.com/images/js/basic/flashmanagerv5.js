/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
//�ҳ����Ҫ��ʾ�ĳ齱Flash
//flash -> js:
//1��clickRoll ����������¼�
//2��completeRoll ����Ժ�Ļص�����

//js -> flash:
//1��_obj.stopRoll(num); ֹͣ�ķ���


function flashChecker(){var hasFlash=0;��������//�Ƿ�װ��flash
var flashVersion=0;����//flash�汾
if(document.all)
{
	var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'); 
		if(swf) {
		hasFlash=1;
		VSwf=swf.GetVariable("$version");
		flashVersion=parseInt(VSwf.split(" ")[1].split(",")[0]); 
		}
	}else{
	if (navigator.plugins && navigator.plugins.length > 0)
	{
		var swf=navigator.plugins["Shockwave Flash"];
		if (swf)
			{
		hasFlash=1;
			   var words = swf.description.split(" ");
			   for (var i = 0; i < words.length; ++i)
		{   

			 if (isNaN(parseInt(words[i]))) continue;
				 flashVersion = parseInt(words[i]);
		}
		}
	}
	}
	return {f:hasFlash,v:flashVersion};
}
 var jsReady=false;
 var swfReady=false;
 function onWebLoad(f) {
    if (onWebLoad.loaded) // If document is already loaded
        window.setTimeout(f, 0); // Queue f to be run as soon as possible
    else if (window.addEventListener) // Standard event registration method
        window.addEventListener("load", f, false);
    else if (window.attachEvent) // IE8 and earlier use this instead
        window.attachEvent("onload", f);
}
// Start by setting a flag that indicates that the document is not loaded yet.
onWebLoad.loaded = false;
// And register a function to set the flag when the document does load.
onWebLoad(function() { onWebLoad.loaded = true;});
 //onload=function(){ pageInit();} 
function isReady(){return onWebLoad.loaded;}
var $id = function(o){return document.getElementById(o);};
var cid = function(fid, id){var _div = document.createElement('div');_div.id = id;$id(fid).appendChild(_div);return _div;};
var swfstr=function(id,url,width,height,basev){
		 var obj='';
			obj+='<object id="'+id+'" name="'+id+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+width+'" height="'+height+'">';
			obj+='<param name="movie" value="'+url+'" />';
			obj+='<param name="quality" value="high" />';
			obj+='<param name="wmode" value="transparent" />';
			obj+='<param name="base" value="'+basev+'" />';
			obj+='<param name="allowfullscreen" value="true" />';
			obj+='<param name="allowScriptAccess" value="always" />';
			obj+='<embed id="'+id+'_ff" name="'+id+'_ff" base="'+basev+'" src="'+ url +'" quality="high" wmode="transparent" width="'+ width +'" height="'+ height +'" allowfullscreen="true" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
			 obj += '</object>';
			return obj;
		}
function insertSwf(elm,url,width,height,base){
if(!$id(elm))return;
var fls=flashChecker();
	var s="";
	var id=elm+"_swf";
	if(fls.f) {
	if(fls.v>=10){
		if(!base)base="";
		$id(elm).innerHTML=swfstr(id,url,width,height,base);
				//document.write("��ǰflash�汾Ϊ: "+fls.v+".0");
		}
	}
	//else document.write("��û�а�װflash");

}
var FlashManager = function(opt){
	var _this = this;
	this.option = {
		'flashUrl' : '', //flash��ַ
		'contentId' : '', //�滻flash������
		'width' : '100%', //flash�Ŀ��
		'height' : '100%', //flash�ĸ߶�
		'onClickRollEvent' : null, //������¼�
		'onCompleteRollEvent' : null, //��ɺ���¼�
		'base':'.'
	};
	 //�Ƿ��ʼ�����
	this.config = {'isInited' : false };
	this.init = function(){
		var flashvars="&testModel=1"
		for(var i in opt){_this.option[i] = opt[i];if(typeof(opt[i])!='function')flashvars+=("&"+i+"="+opt[i]);}
		_this.option.swfid=_this.option.contentId + '_content'+ '_swf'
		flashvars+=("&flag="+_this.option.swfid);
		if(!_this.option.flashUrl){alert('û������flash��ַ��');return;}
		if(!_this.option.contentId){alert('û������ҳ��������');return;}
		cid(_this.option.contentId, _this.option.contentId + "_content");
		$id(_this.option.contentId + '_content').innerHTML='<div id="noflash" ><p>���������µ�Flash���<a href="http://get.adobe.com/flashplayer/" target="_blank" title="�������µ�Flash���"><img src="http://ossweb-img.qq.com/images/xy/web200907/images/flashLogo.gif" align="absmiddle" target="_blank" /></a></p> </div>';
		//alert("s"+_this.option.height)
	//	$id(_this.option.contentId + '_content').innerHTML=swfstr({url:_this.option.flashUrl+'?v=' + Math.random()+flashvars,fid: _this.option.swfid+"_swf",width:_this.option.width,height:_this.option.height})
		insertSwf(_this.option.contentId + '_content',_this.option.flashUrl+'?v=' + Math.random()+flashvars,_this.option.width,_this.option.height,_this.option.base)
		{//��ʼ��flash��ķ���
		
			//1 swf Ready
			window['setSwfIsReady' + _this.objectID() ]=function(){
				window['swfReady'+_this.option.contendId]=true;
				_this.config.isInited=true;
			}
			//2�����SWF�ķ���
			window['SWFCallJSToStart' +_this.objectID()] = function(num){
			//alert("CallJS")
				if(typeof(_this.option.onClickRollEvent) == 'function'){setTimeout(function(){_this.option.onClickRollEvent(num)},50);}
			};
			//3�ص�������
			window['SWFPlayComplete' +_this.objectID()] = function(num){
				if(typeof(_this.option.onCompleteRollEvent) == 'function'){
						setTimeout(function(){_this.option.onCompleteRollEvent(num)},100);
					}
				};
				//alert(this.objectID())
		}
	};
	//ȡ�ø�flash����
	this.getFlashInstance = function(){
	//alert($id(_this.option.swfid+ '_swf'))
	 if (navigator.appName.indexOf("Microsoft") != -1) {
	   return window[_this.option.swfid];
	  } else {
	   return document[_this.option.swfid+"_ff"];
	  }
	};
	this.objectID=function(){
		return this.getFlashInstance().id;
	}
	
	//֪ͨflash ֹͣ���ų齱���� �����н�ֵ��flash  ���ȴ�flash������
	this.stopRoll = function(num){
		//��ʱִ��
			var _obj = _this.getFlashInstance();
			if(typeof(_obj) == 'object' && typeof(_obj.JScallSWFtoRun) == 'function'){
				_obj.JScallSWFtoRun(num);
				return;
			}
			window['FlashLoadTimes_' + _this.option.contentId] = 0;
			window['FlashLoadFlag_' + _this.option.contentId] = window.setInterval(function(){
				if(window['FlashLoadTimes_' + _this.option.contentId] > 100){//���10s�ӻ�û�м��ص������Զ�������ʾ���ɡ�
					clearInterval(window['FlashLoadFlag_' + _this.option.contentId]);
					window['FlashLoadFlag_' + _this.option.contentId] = undefined;
					throw 'noת��û��ת��';
					return;
				}							  
				if(typeof(_obj.JScallSWFtoRun) == 'function'){
					clearInterval(window['FlashLoadFlag_' + _this.option.contentId]);
					window['FlashLoadFlag_' + _this.option.contentId] = undefined;
					_obj.JScallSWFtoRun(num);
					return;
				}
				window['FlashLoadTimes_' + _this.option.contentId]++;
			}, 10);
		
	};
	_this.init();
};

//ȡ�ø�ʵ��������
FlashManager.init = function(opt){return new FlashManager(opt);};
/*  |xGv00|4bcfc30a297fad01c0e8ccb88cd4bd3b */