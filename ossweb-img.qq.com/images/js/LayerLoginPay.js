var Prototype = {
  Version: '1.6.0.3',

  Browser: {
    IE:     !!(window.attachEvent &&
      navigator.userAgent.indexOf('Opera') === -1),
    Opera:  navigator.userAgent.indexOf('Opera') > -1,
    WebKit: navigator.userAgent.indexOf('AppleWebKit/index.html') > -1,
    Gecko:  navigator.userAgent.indexOf('Gecko') > -1 &&
      navigator.userAgent.indexOf('KHTML') === -1,
    MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
  },
 
  BrowserFeatures: {
    XPath: !!document.evaluate,
    SelectorsAPI: !!document.querySelector,
    ElementExtensions: !!window.HTMLElement,
    SpecificElementExtensions:
      document.createElement('div')['__proto__'] &&
      document.createElement('div')['__proto__'] !==
        document.createElement('form')['__proto__']
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: function() { },
  K: function(x) { return x }
};

function _$(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)
      elements.push(_$(arguments[i]));
    return elements;
  }
  if (Object.isString(element))
    element = document.getElementById(element);
  return element;
}

Object.extend = function(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
};
function $A(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
}
if (Prototype.Browser.WebKit) {
  $A = function(iterable) {
    if (!iterable) return [];
    if (!(typeof iterable === 'function' && typeof iterable.length ===
        'number' && typeof iterable.item === 'function') && iterable.toArray)
      return iterable.toArray();
    var length = iterable.length || 0, results = new Array(length);
    while (length--) results[length] = iterable[length];
    return results;
  };
}
Object.extend(Function.prototype, {
    argumentNames: function() {
        var names = this.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
        return names.length == 1 && !names[0] ? [] : names;
    },
    bind: function() {
        if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
        var __method = this, args = $A(arguments), object = args.shift();
        return function() {
            return __method.apply(object, args.concat($A(arguments)));
        }
    }
})
Object.extend(Object, {
  clone: function(object) {
    return Object.extend({ }, object);
  },
  isElement: function(object) {
    return !!(object && object.nodeType == 1);
  },
  isArray: function(object) {
    return object != null && typeof object == "object" &&
      'splice' in object && 'join' in object;
  },
  isFunction: function(object) {
    return typeof object == "function";
  },
  isString: function(object) {
    return typeof object == "string";
  },
  isNumber: function(object) {
    return typeof object == "number";
  },
  isUndefined: function(object) {
    return typeof object == "undefined";
  }
});
function LL_argumentNames(funStr) {
    var names = funStr.match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
}
function LL_parseParam(sParams){
    var paramMap={};
    if(sParams.length>0) {
        var paramArray = sParams.split("&");
        for(var i=0;i<paramArray.length;++i) {
            var paramPair=paramArray[i].split("=");
            paramMap[paramPair[0]]=paramPair[1];
        }
    }
    return paramMap;
}
function LL_hash2QueryStr(hash)
{
    var str="";
    for (var property in hash)
        str+=property+"="+hash[property]+"&";
    return str;    
}

function LL_getWindowSize(){
    var minClientHeight=Math.min(document.documentElement.clientHeight,document.body.clientHeight);
    var minClientWidth=Math.min(document.documentElement.clientWidth,document.body.clientWidth);
    if(minClientHeight==0) minClientHeight=document.documentElement.clientHeight+document.body.clientHeight;
    if(minClientWidth==0) minClientWidth=document.documentElement.clientWidth+document.body.clientWidth;
    return {width:minClientWidth,height:minClientHeight}
}
function LL_getScrollOffsets() {
    return {
        left:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        top:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop}
}
function LL_positionByPrecent(element,precent) {
    var bodySize=LL_getWindowSize()
    var bodyScrollOff=LL_getScrollOffsets()
    element.style.top=Math.floor(bodyScrollOff.top+(bodySize.height-parseInt(element.clientHeight||element.style.height))*(precent.top||0.5))+"px";
    element.style.left=Math.floor(bodyScrollOff.left+(bodySize.width-parseInt(element.clientWidth||element.style.width))*(precent.left||0.5))+"px";  
    if(element.style.top<0) {
        element.style.top="30%"
        element.style.left="30%"
    }
}

function CMaskDiv(maskDiv){
    this.oMaskDiv=false;
}
CMaskDiv.prototype.show=function(){
	this.body=document.body || document.documentElement;
    this.oMaskDiv=_$("maskDiv");
    if(!this.oMaskDiv) {
	var mask = document.createElement('div');
	mask.className = "mask";
	mask.id = "maskDiv";
	mask.style.cssText = "position: absolute;display: none; left:0; top:0;width: 100%;height: 100%; z-index: 900; background: #DFE0E1 ;filter: alpha(opacity=50);opacity: 0.5";
	this.body.appendChild(mask);
	this.oMaskDiv = mask;
    }
    this.oMaskDiv.style.width=this.body.scrollWidth+"px";
    this.oMaskDiv.style.height=this.body.scrollHeight+"px";
    this.oMaskDiv.style.display=""; 
}
CMaskDiv.prototype.close=function(){
    this.oMaskDiv.style.display="none"; 
}
__MaskDiv__=new CMaskDiv('maskDiv');

function LL_createPromptDiv(options){
    var oDiv=null;
    oDiv=_$(options.id);
    if(!oDiv) {
        oDiv=document.createElement("div");
        oDiv.id=options.id;
        //oDiv.style.height="40px";
        //oDiv.style.width="300px";
        oDiv.style.backgroundColor="#FFFFCC";
        oDiv.style.border="2px solid buttonface";
        oDiv.style.padding="10px";
        oDiv.style.zIndex="10001";
        oDiv.style.margin="0px";
        oDiv.style.position="absolute";
        oDiv.style.top="30%";
        oDiv.style.left="30%";
        oDiv.style.color="#000000";
        document.body.appendChild(oDiv);
    }
    oDiv.innerHTML=options.promptMsg;
    LL_positionByPrecent(oDiv,options.promptOffset||{left:0.5,top:0.5});
    return oDiv
}

document.domain="qq.com";
function ptlogin2_onResize(width, height){	
	var login_wnd = _$("__LoginDiv__");
	if (login_wnd)
	{
		login_wnd.style.width = width + "px";
		login_wnd.style.height = height + "px";
		
		login_wnd.style.visibility = "hidden";
		login_wnd.style.visibility = "visible";
	}
	LL_moveHandler();
}
function LL_onLoginDivClose(){
    if(_$("__LoginDiv__")){
        _$("__LoginDiv__").style.display="none";
    }
	if (document.removeEventListener) {
        window.removeEventListener("scroll", LL_moveHandler, false);
        window.removeEventListener("resize", LL_moveHandler, false);
    }else if (document.detachEvent) {
        window.detachEvent('onscroll', LL_moveHandler);
        window.detachEvent('onresize', LL_moveHandler);
    }    
}
function ptlogin2_onClose(){
	LL_onLoginDivClose()
}
if (!window.Cookie) {
    var Cookie = new Object();
}

Cookie.get = function(sName,sDefaultValue){
    var sRE = "(?:; |^)" + sName + "=([^;]*);?";
    var oRE = new RegExp(sRE);
    
    if (oRE.test(document.cookie)) {
        return unescape(RegExp["$1"]);
    } else {
        return sDefaultValue||null;
    }
}
Cookie.set = function(sName,sValue,iExpireSec,sDomain,sPath,bSecure){
    if(sName==undefined) {
        return;
    }
    if(sValue==undefined) {
        sValue="";
    }
    var oCookieArray = [sName+"="+escape(sValue)];
    if(!isNaN(iExpireSec)){
        var oDate = new Date();
        oDate.setTime(oDate.getTime()+iExpireSec*1000);
        oCookieArray.push("expires=" + oDate.toGMTString());
    }
	if(sDomain!=undefined){
		oCookieArray.push("domain="+sDomain);
	}
	if(sPath!=undefined){
	    oCookieArray.push("path="+sPath);
	}
	if(bSecure){
	    oCookieArray.push("secure");
	}
    document.cookie=oCookieArray.join("; ");
}

Cookie.clear = function(sName){
    var oDate = new Date();
    Cookie.set(sName,"", new Date(0),"qq.com","../../index.html");
}

function LL_extractUin(str){
    return str.replace(/^o0*/g,"")    
}
/*
1.没有uin cookie     no login
2.有uin cookie
    2.1没有info        unknown
    2.2有info
           2.2.1uin != uin cookie，同2.1     unknown
           2.2.2uin = uin cookie         
                   2.2.2.1cookie没超时           logined
                   2.2.2.2cookie超时              no login
*/
function LL_isRealLogined(){
    var uin=GetCookieUin();
    var loginInfo=Cookie.get('IED_LOG_INFO');
    if(loginInfo) loginInfo=LL_parseParam(loginInfo.replace(/\|/g,"&").replace(/\*/g,"="));
    var expire=false;
    if(!uin) return false;
    if(loginInfo && loginInfo.uin==LL_extractUin(uin)){
        expire=(Math.floor((new Date().getTime()/1000))-loginInfo.time)>3000?true:false;
    }
    if(expire) {
        Cookie.clear('IED_LOG_INFO');
        return false
    }
    if(!loginInfo || (loginInfo && loginInfo.uin!=LL_extractUin(uin))){//暂时当成没有登录，让用户重新登录
        Cookie.clear('IED_LOG_INFO');
        return "unknown";
    }
    return true;
}

function trans2Asc(str)
{
    var len=str.length;
    if(len % 2 !=0)
    {
        return -1;
    }
    
    var result="";
    for(i=0;i<len;i+=2)
    {
        result=result+String.fromCharCode(parseInt(str.substr(i,2),16));
    }
    return result;
}

function GetCookieUin(){
	var loginInfo=Cookie.get('IED_LOG_INFO',null);
    if (!loginInfo){
		if(Cookie.get("uin",null)==null){
			return "";
		}
		else{   
			if(Cookie.get("show_id",null)==null || Cookie.get("show_id",null)=="")
				return Cookie.get("uin");
			else
				return trans2Asc(Cookie.get("show_id"))
		}
	}
	else{
		loginInfo=LL_parseParam(loginInfo.replace(/\|/g,"&").replace(/\*/g,"="));		
		return loginInfo.uin
	}
	
}
function LL_cookieLogined(){
    return GetCookieUin()!=""    
}
function LL_getUin(){
    return LL_extractUin(GetCookieUin())   
}
function LL_getNickname(){
    var loginInfo=Cookie.get('IED_LOG_INFO');
    if(loginInfo){
        var c=loginInfo.split("|");
        return unescape(c.slice(1,c.length-1).join("|").replace("nick*","")).replace(/ $/,"");
    }
    return "";
}
var LL__appDomainInfo="";
function LL__getCheckLoginUrl()
{
    //var n=location.host.split(".qq.com")[0].split(".");
    //n=n[n.length-1];
    var d="apps.game.qq.com";
    //var services=LL__appDomainInfo.split("/");
    //for(var i=0;i<services.length;i++){
    //    if(services[i]==n) {
    //        d="app."+n+".qq.com";
    //        break;
    //    }
    //}
    //d="app."+location.host;
    //if(/^app\./.test(location.host))
    //    d=location.host;
    if(/.*test\.qq\.com/.test(location.host))
        d=location.host;
    return ("http://"+d+"/comm-cgi-bin/login/dynamiclogin.cgi?cmd=1&r="+Math.random())
}
//此函数一般用来初始化大页面
function CheckLogin(options){
    if(!options){
        options={};    
    }
    options=Object.extend({onlyCookie:false,
                           unloginCallback:Prototype.emptyFunction,
                           execDefUnloginFun:true,
                           loginedCallback:Prototype.emptyFunction,
                           execDefLoginedFun:true},options)
    function __logined_callback(){
        if((LL_argumentNames(LoginedCallback.toString())[0] || "not_native") =="$native"){
    	    if(options.execDefLoginedFun) defLoginedCallback();
    	    options.loginedCallback();
    	}
        else{
            LoginedCallback()
        }
    }
    function __unlogin_callback(){
        if((LL_argumentNames(UnloginCallback.toString())[0] || "not_native") =="$native"){
            if(options.execDefUnloginFun) defUnloginCallback()
    	    options.unloginCallback()
        }
        else{
            UnloginCallback()
        }    
    }
    __checkLoginCallback=function (){
        if(LL_isRealLogined()==true)
            __logined_callback()
        else{
            __unlogin_callback()
        }    
    }
    if((LL_cookieLogined() && options.onlyCookie) || LL_isRealLogined()==true){
        __logined_callback()
    }
    else if(LL_isRealLogined()=="unknown"){
        //__logined_callback()
        LL_FloadJS(LL__getCheckLoginUrl(),"l_c_b=__checkLoginCallback","u_c_b=__checkLoginCallback")    
    }
    else{
        __unlogin_callback()
    }
}
LL_CheckLogin=CheckLogin;
LL_checkLogin=CheckLogin;

function LL_onLogout(){
    //document.cookie = "uin=; path=/; domain=qq.com";
    //document.cookie = "skey=; path=/; domain=qq.com";
    //document.cookie = "SppKey_SatetyID=; path=/; domain=qq.com";
    //document.cookie = "IED_LOG_INFO=; path=/; domain=qq.com";
    Cookie.clear('IED_LOG_INFO');	
}
function LogoutPage(options){
    LL_onLogout()
    if(!options){
        options={};    
    }
    options=Object.extend({freshWin:"none",
                           jumpUrl:"",
                           needMaskDiv:true,
                           needPrompt:true,
                           promptMsg:"亲爱的用户，您已经注销成功！",
                           promptOffset:{left:0.5,top:0.5},
                           execDefUnloginCallback:true,
                           logoutCallback:Prototype.emptyFunction},options)
                           
    if(options.needMaskDiv) __MaskDiv__.show();
    if(options.needPrompt){
        LL_createPromptDiv({id:"__LogoutDiv__",
                            promptMsg:options.promptMsg,
                            promptOffset:options.promptOffset}).style.display=""
    }
	
	if(!_$("__LoginDiv__")){
        var oDiv=document.createElement("div");
        oDiv.id="__LoginDiv__";
        oDiv.style.height="300px";
        oDiv.style.width="450px";
        oDiv.style.border="0px";
        oDiv.style.padding="0px"; 
        oDiv.style.margin="0px";
        oDiv.style.position="absolute";
        oDiv.style.zIndex="10000";
        oDiv.style.top="20%";
        oDiv.style.left="30%";
        //oDiv.style.visibility = "hidden";
        var oIFrame=document.createElement("iframe");
        oIFrame.id="__LoginIframe__";
        oIFrame.frameborder="0";
        oIFrame.scrolling="no";
        oIFrame.width="100%";
        oIFrame.height="100%";
		oIFrame.frameBorder ="0";
        oDiv.appendChild(oIFrame);
        document.body.appendChild(oDiv);
	}
	_$("__LoginIframe__").src="http://game.qq.com/act/logout.html?20121029"	
	_$("__LoginDiv__").style.display = "none";
	window["logoutCallback"] = function(){
		if((LL_argumentNames(UnloginCallback.toString())[0] || "not_native") =="$native"){//之前的页面重写了这个函数
			if(options.execDefUnloginCallback) defUnloginCallback()
			options.logoutCallback()
		}
		else
		{
			UnloginCallback()
		}
		if(options.needPrompt) _$("__LogoutDiv__").style.display="none";
		if(options.needMaskDiv) __MaskDiv__.close();
		
		if(options.freshWin!="none"){
			if(options.jumpUrl=="")
				window[options.freshWin].location.href=window[options.freshWin].location.href;
			else
				window[options.freshWin].location.href=options.jumpUrl
		}
	}
}
LL_logout=LogoutPage;

var LL_moveHandler=null;
function OpenLoginDiv(options,bNotFreshTop){
    function _withOut(s,d){
        var o={}
        for(var p in s)
            if(!(p in d))
                o[p]=s[p]
        return o;
    }
    if(options && Object.isString(options)){
        options=LL_parseParam(options)     
    }
    if(!options){
        options={}    
    }
    var ptOptions={
        f_url:"loginerroralert",
        no_verifyimg:1 ,
        appid:GetAppId() 
    }
    var myOptions={
        needMaskDiv:true,
        loginDivOffset:{left:0.5,top:0.5},
        execDefLoginedFun:true,
        loginedCallback:Prototype.emptyFunction//无刷新时生效
    }
    if(bNotFreshTop) options.target="self"//兼容老参数
	options.daid = 8;
	options.style = 12;
    options=Object.extend(Object.extend(Object.extend({},myOptions),ptOptions),options)
    
    if(!_$("__LoginDiv__")){
        var oDiv=document.createElement("div");
        oDiv.id="__LoginDiv__";
        oDiv.style.height="300px";
        oDiv.style.width="450px";
        oDiv.style.border="0px";
        oDiv.style.padding="0px"; 
        oDiv.style.margin="0px";
        oDiv.style.position="absolute";
        oDiv.style.zIndex="10000";
        oDiv.style.top="20%";
        oDiv.style.left="30%";
        //oDiv.style.visibility = "hidden";
        var oIFrame=document.createElement("iframe");
        oIFrame.id="__LoginIframe__";
        oIFrame.frameborder="0";
        oIFrame.scrolling="no";
        oIFrame.width="100%";
        oIFrame.height="100%";
		oIFrame.frameBorder ="0";
        oDiv.appendChild(oIFrame);
        document.body.appendChild(oDiv);
	}
    else{
        _$("__LoginDiv__").style.display="block";
    }
    if(!options.target){//刷新整页
		if(!options.s_url) {
                    options.s_url = top.location.href;
                }
                if(options.s_url == top.location.href) {
                    options.s_url = options.s_url.replace(/#+$/, "")
                }
                options.s_url=escape(options.s_url);
		_$("__LoginIframe__").src="http://ui.ptlogin2.qq.com/cgi-bin/login?"+
		        LL_hash2QueryStr(Object.extend({qlogin_jumpname:"jump",												
		                                        qlogin_param:"u1%3D"+options.s_url},
		                         _withOut(options,myOptions)));
	}
	else{//无刷新
	    if((LL_argumentNames(LoginedCallback.toString())[0] || "not_native") =="$native")//之前的页面重写了这个函数
	    {
    	    LoginedCallback=function($not_native){
    	        __MaskDiv__.show();
    	        LL_createPromptDiv({id:"__LogoutDiv__",
                                promptMsg:"正在获取登录信息，请稍候...",
                                promptOffset:options.promptOffset}).style.display=""
    	        __openLoginDivCallback=function (){
    	            __MaskDiv__.close();
    	            _$("__LogoutDiv__").style.display="none";
    	            if(options.execDefLoginedFun) defLoginedCallback();
    	            options.loginedCallback();
    	        }
    	        LL_FloadJS(LL__getCheckLoginUrl(),"l_c_b=__openLoginDivCallback","u_c_b=__openLoginDivCallback")    
    	    }
    	}
	    options.s_url="http%3A//"+location.host+"/comm-htdocs/login/logincallback.htm";
	    _$("__LoginIframe__").src="http://ui.ptlogin2.qq.com/cgi-bin/login?"+
	            LL_hash2QueryStr(Object.extend({target:"self"}, //快速登录登录完会刷新全页，是个bug，设置target不管用
		                         _withOut(options,myOptions)));
	}
    if(options.needMaskDiv) {
        __MaskDiv__.show();
        ptlogin2_onClose=function(){
            __MaskDiv__.close();
            LL_onLoginDivClose();
        }
    }
    if(!LL_moveHandler || (LL_moveHandler && LL_argumentNames(LL_moveHandler.toString())[0] || "not_native") =="$native"){
        LL_moveHandler=function($native){
            LL_positionByPrecent(_$("__LoginDiv__"),options.loginDivOffset)
        }; 
    }
    LL_moveHandler();
    if (document.addEventListener) {
        window.addEventListener("scroll", LL_moveHandler, false);
        window.addEventListener("resize", LL_moveHandler, false);
    }else if (document.attachEvent) {
        window.attachEvent('onscroll', LL_moveHandler);
        window.attachEvent('onresize', LL_moveHandler);
    }
}
LL_openLoginDiv=OpenLoginDiv;
/*
{style:1,
 fromWindow: window,
 openLoginDivOptions...
 }

{style:2,
 submitFun:function..,
 fromWindow: window,
 openLoginDivOptions...
 }
*/
function LL_submitWrapper(event,options){
    if(LL_isRealLogined()==true){
        if(options.style==2) options.submitFun.apply(options.fromWindow||window,[]);
        if(options.style==1) {
            if(options.submitFun) 
                options.submitFun.apply(options.fromWindow||window,[]) 
            return ; 
        } 
        return true;
    }
    else{
        if(!options.openLoginDivOptions){
            options.openLoginDivOptions={};    
        }
        options.openLoginDivOptions.target="self";
        if(options.style==2) {
            options.openLoginDivOptions.loginedCallback=options.submitFun.bind(options.fromWindow||window)
            //top.document.getElementsByTagName("iframe")["middle"].contentWindow.document.getElementById("pay_form").submit();  
        }
        else if(options.style==1) {
            var a=options.a=(event.target || event.srcElement);
            if (event.preventDefault) {
                event.preventDefault();
                event.stopPropagation();
            } 
            else {
                event.returnValue = false;
                event.cancelBubble = true;
            }  
            options.openLoginDivOptions.loginedCallback=(function(){
                    if(options.submitFun) 
                        options.submitFun(); 
                    //if(a.onclick) a.onclick(); wrapper一定是放onclick的最后，没有必要再执行一次
                    if(a.href.match(/^\s*javascript:.*/i)){
                        eval(a.href);
                    }
                    else{
                        if(a.target && a.target.toLowerCase()=="_blank"){
                             window.open(a.href);
                        }
                        else {
                            var tt=(a.target||"_self").toLowerCase().replace(/^_(self|parent|top)$/i,"$1");
                            //alert(tt);
                            //alert(options.fromWindow[tt]);
                            if(options.fromWindow[tt]) options.fromWindow[tt].location.href=a.href;
                            else document.getElementsByTagName("iframe")[tt].src=a.href;
                            //options.fromWindow.location.href=a.href;
                        }
                    }
                }).bind(options.fromWindow||window)
        }
        OpenLoginDiv(options.openLoginDivOptions);
        if(options.style==1) return ;
        return false;
    }
}
function defLoginedCallback(){
    try{
        _$("unlogin").style.display="none";
        _$("logined").style.display="block";
    }catch(e){}
}
function LoginedCallback($native){
    defLoginedCallback();    
}
function defUnloginCallback(){
    try{
        _$("logined").style.display="none";
        _$("unlogin").style.display="block";
    }catch(e){}
}
function UnloginCallback($native){
    defUnloginCallback();    
}
var FBrowser=new Object();
FBrowser.isIE=((navigator.userAgent.indexOf('MSIE')==-1)?false:true);
FBrowser.isFirefox=((navigator.userAgent.indexOf('Firefox')==-1)?false:true);
FBrowser.isOpera=((navigator.userAgent.indexOf('Opera')==-1)?false:true);
function LL_FloadJS(url,sucfn,failfn){
    var js=document.createElement("script");
    js.type="text/javascript";
    js.onerror=function(){
        if('function'==typeof(failfn))
            failfn();
    }
    if(Object.isString(sucfn)) {
        if(url.indexOf("?")!=-1) url+="&";
        else url+="?";
        url+=sucfn+"&"+(Object.isString(failfn)? failfn:"");
    }
    js.src=url;
    var h=document.getElementsByTagName('HEAD').item(0);
    h.appendChild(js);
    if(Object.isFunction(sucfn)){
        if(FBrowser.isIE){
            js.onreadystatechange=function(){
                if(this.readyState.toLowerCase()!="complete"&&this.readyState.toLowerCase()!="loaded") return;
                if(this.$funExeced!=true && 'function'==typeof(sucfn)){
                    this.$funExeced=true;
                    sucfn();
                }
            }
        }
        else if(FBrowser.isOpera){
            if('function'==typeof(sucfn))   sucfn();
        }
        else{
            js.onload=function(){
                if('function'==typeof(sucfn))  sucfn();
            }
        }
    }
}
var __IED_APPID__={ "qqtang": 21000107,
                    "battle": 21000111,
                    "kaixuan": 21000112,
                    "qqgame": 21000110,
                    "fo": 21000106,
                    "pet": 21000109,
                    "sg": 21000103,
                    "r2": 21000105,
                    "tgame": 21000113,
                    "st": 21000114,
                    "xx": 21000104,
                    "xunxian": 21000104,
                    "game": 21000115,
                    "gcs": 21000108,
                    "pigpet": 21000117,
                    "fcm": 21000116,
                    "speed": 21000118,
                    "petbear": 21000101,
                    "nana": 21000119,
                    "cf": 21000124,
                    "gamesafe": 21000109,
                    "dnf": 21000127,
                    "ffo": 21000106,
                    "x5": 21000118,
                    "gamevip": 21000121,
                    "webgame": 21000118,
                    "sl": 21000401,
                    "ava":21000128,
                    "ied-gameinfo": 21000501};
function GetAppId(){
    var n=location.host.split(".qq.com")[0].split(".");
    n=n[n.length-1];
    return __IED_APPID__[n] || __IED_APPID__[n.replace("test","")] || __IED_APPID__["ied-gameinfo"];
}


{//该js已不推荐使用了，所以收集目前还在使用的页面列表
	var checkHasOldLogin4 = function(){
		var loc = encodeURIComponent(location.href);
		//LL_FloadJS('http://apps.game.qq.com/speed/a20110623wb/login/mark.php?name=LayerLogin.js&url='+loc, function(){}, function(){});
	};
	
	if(window.attachEvent){
		window.attachEvent("onload",function(){checkHasOldLogin4();});
	}else{//FireFox
		window.addEventListener("load",function() {checkHasOldLogin4();}, false);
	}
}/*  |xGv00|3ddca0cef2f5dffac7844463f9456db0 */