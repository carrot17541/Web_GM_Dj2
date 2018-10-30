(function(){
	function UriComponentEncode(sStr)
	{
		sStr = encodeURIComponent(sStr);
		sStr = sStr.replace(/~/g,"%7E");
		sStr = sStr.replace(/!/g,"%21");
		sStr = sStr.replace(/\*/g,"%2A");
		sStr = sStr.replace(/\(/g,"%28");
		sStr = sStr.replace(/\)/g,"%29");
		sStr = sStr.replace(/'/g,"%27");
		sStr = sStr.replace(/\?/g,"%3F");
		sStr = sStr.replace(/;/g,"%3B");
		return sStr;
	}
	var _url=document.getElementById("sns_lnks").src.split("&"),
	_sns={
		t:_url[0].split("=")[1].split(","),
		a:_url[1]?"&appkey="+encodeURI(_url[1].split("=")[1]):"",
		u:UriComponentEncode(document.location.href),
		n:encodeURI(document.title),
		c:['<ul class="sns">']
	},
	_func={
		weibo:"v.t.qq.com/share/share.php?title="+_sns.n+_sns.a+"&url=",
		qzone:"sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=",
		xiaoyou:"sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url=",
		kaixin:"www.kaixin001.com/repaste/bshare.php?rtitle="+_sns.n+"&rurl=",
		renren:"share.renren.com/share/buttonshare.do?link=",
		baidu:"apps.hi.baidu.com/share/?title="+_sns.n+"&url=",
		douban:"www.douban.com/recommend/?title="+_sns.n+"&url=",
		shuqian:"shuqian.qq.com/post?from=3&jumpback=2&noui=1&title="+_sns.n+"&uri=",
		sina:"v.t.sina.com.cn/share/share.php?title="+_sns.n+"&url="
	};
	for(var i=0,len=_sns.t.length;i<len;i++){
		var name=_sns.t[i];
		_sns.c.push('<li class="sns_lst"><a class="sns_lnk sns_'+name+'" onclick="pgvSendClick({hottag:\'sns.buttons.'+name+'\'});window.open(\'http:\/\/'+_func[name]+_sns.u+'\',\'\',\'width=840, height=540\')">'+name+'</a></li>');
	};
	document.getElementById("sns").innerHTML=_sns.c.join("")+"</ul>";
})();/*  |xGv00|0ac0cb0144f2fecffa40a17aedb1ece2 */