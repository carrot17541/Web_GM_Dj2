0 <= location.href.indexOf("qq.com") && (document.domain = "qq.com");
(function() {
	var a = {
			LoginManager: "http://ossweb-img.qq.com/images/js/login/loginmanagerv3.js",
			$$: "http://ossweb-img.qq.com/images/script/com/qq/basic/basic.js"
		},
		c;
	for (c in a) "undefined" == typeof window[c] && (window[c] = {}, document.write('<script src="' + a[c] + '" type="text/javascript">\x3c/script>'))
})();
(function() {
	RoleSelector = function(a) {
		this.option = {
			gameId: "",
			type: "float",
			isQueryRole: !0,
			showAreaId: "",
			hideAreaId: "",
			isShutdownSubmit: !1,
			isShutdownHide: !1,
			needConfirm: !1,
			confirmAreaMessage: "\u8bf7\u786e\u8ba4\u5956\u54c1\u5c06\u53d1\u9001\u81f3\uff1a",
			cancelEvent: null,
			openEvent: null,
			closeEvent: null,
			area1ContentId: "",
			areaContentId: "",
			roleContentId: "",
			confirmButtonId: "",
			onErrorEvent: function(a) {
				"\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01" == a ? alert("\u5f88\u62b1\u6b49\uff0c\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01\u8bf7\u68c0\u67e5\u60a8\u662f\u5426\u6ce8\u518c\u8be5\u6e38\u620f\u89d2\u8272\u540e\uff0c\u518d\u6765\u5c1d\u8bd5\u54e6\uff01") :
					alert(a)
			},
			submitEvent: null
		};
		this.config = {
			id: ""
		};
		var c = this;
		this.setOption = function(a) {
			RoleSelector._$extend(c.option, a)
		};
		this.setConfig = function(a) {
			RoleSelector._$extend(c.config, a)
		};
		(function(a) {
			c.config.id || (c.config.id = 1 * RoleSelector._comm.getId());
			c.setOption(a);
			c.setConfig(a);
			c.option.gameId ? (c.option.type = "html" == c.option.type ? "html" : "float", RoleSelector._comm.initNickName(c.option.gameId)) : alert("\u67e5\u8be2\u89d2\u8272\u4f20\u5165gameId\u9519\u8bef")
		})(a)
	};
	RoleSelector.init = function(a) {
		return new RoleSelector(a)
	};
	RoleSelector.prototype.show = function(a) {
		var c = this;
		c.setOption(a);
		if (c.option.gameId)
			if ("function" != typeof c.option.submitEvent) alert("\u89d2\u8272\u9009\u62e9\u5b8c\u540e\uff0c\u6309\u786e\u5b9a\u4ee5\u540e\u7684\u65b9\u6cd5submitEvent\u5fc5\u987b\u4f20\u5165\u3002");
			else {
				if (c.option.needConfirm) {
					var b = c.option.submitEvent;
					a = RoleSelector._comm.getId();
					RoleSelector._$extend(c.option, {
						confirmAreaButtonId: "confirmAreaButtonId_" + a,
						cancelAreaButtonId: "cancelAreaButtonId_" + a
					});
					c.option.submitEvent = function(a) {
						var e = {
							width: 300,
							height: 210,
							border: 1,
							title: "\u6e29\u99a8\u63d0\u793a",
							isCanMove: !1,
							content: RoleSelector._initConfirmHtml(a, c.option),
							onOpenEvent: function() {
								return "function" == typeof c.option.onOpenFloatEvent ? c.option.onOpenFloatEvent() : !1
							},
							onCloseEvent: function() {
								return "function" == typeof c.option.onCloseFloatEvent ? c.option.onCloseFloatEvent() : !1
							}
						};
						window.roleConfirmFloater = FloaterManager.init(e, !1);
						roleConfirmFloater.show();
						$$("#" + c.option.confirmAreaButtonId).unbind("click").bind("click", function() {
							b(a)
						});
						$$("#" + c.option.cancelAreaButtonId).unbind("click").bind("click", function() {
							roleConfirmFloater.close()
						});
						return !0
					}
				}
				"float" == c.option.type ? (a = {}, RoleSelector._$extend(a, c.option), a.gameId = c.option.gameId, a.isQueryRole = c.option.isQueryRole, a.isShutdownSubmit = c.option.isShutdownSubmit || !1, a.isShutdownHide = c.option.isShutdownHide || !1, a.onOpenFloatEvent = c.option.openEvent, a.onCloseFloatEvent = c.option.closeEvent, a.onConfirmSubmitEvent = c.option.submitEvent, a.onCancelSubmitEvent = c.option.cancelEvent, RoleSelector.initFloatContent(a)) :
					"html" == c.option.type && (a = {}, RoleSelector._$extend(a, c.option), a.gameId = c.option.gameId, a.isQueryRole = c.option.isQueryRole, a.isShutdownSubmit = c.option.isShutdownSubmit || !1, a.isShutdownHide = c.option.isShutdownHide || !1, a.onConfirmSubmitEvent = c.option.submitEvent, RoleSelector.initHtmlContent(a))
			}
		else alert("\u89d2\u8272\u9009\u62e9\u7684\u4e1a\u52a1gameId\u5fc5\u987b\u4f20\u5165\u3002")
	};
	RoleSelector._initConfirmHtml = function(a, c) {
		return TemplateManager.parseTemplate('<div><ul class="role_select"><li style="line-height: 20px;_height:20px;margin-left:10px;list-style: none;">' +
			c.confirmAreaMessage + '</li>{if roleObj.areaname}<li style="line-height: 20px;_height:20px;margin-left:10px;list-style: none;"><span style="float:left">\u5927\u533a\u670d\u52a1\u5668\uff1a</span><span style="clear:none;color:#f00">${roleObj.areaname}</span></li>{/if}{if roleObj.rolename}<li style="line-height: 20px;_height:20px;margin-left:10px;list-style: none;"><span style="float:left">\u89d2\u8272\uff1a</span><span style="clear:none;color:#f00">${roleObj.rolename}</span></li>{/if}<li style="line-height: 20px;_height:20px;margin-top: 40px;list-style: none;" class="button"><button id="' +
			c.confirmAreaButtonId + '">\u786e  \u5b9a</button><button id="' + c.cancelAreaButtonId + '">\u53d6  \u6d88</button></li></ul></div>').process(a.submitData, "roleObj")
	};
	RoleSelector._MultiSelector = function(a, c, b) {
		this.option = {
			_defaultValue: [],
			_defaultFunction: []
		};
		this._init = function() {
			this._fillSelect() && this._bindAllEvent()
		};
		this._fillSelect = function() {
			if ("undefined" == typeof a || "undefined" == typeof c || 0 == a.length || 0 == c.length) return !1;
			for (var d = [], e = [], g = 0; g < a.length; g++) {
				var f = [];
				$$(a[g]).find("option").each(function() {
					var a =
						$$(this).val(),
						c = $$(this).html();
					f.push({
						t: c,
						v: a
					})
				});
				d[g] = f;
				e[g] = "undefined" != typeof b ? "function" == typeof b ? g == a.length - 1 ? b : null : b && b instanceof Array && 0 < b.length && "function" == typeof b[g] ? b[g] : null : null
			}
			this.option._defaultValue = d;
			this.option._defaultFunction = e;
			d = this._getOptionStr(a[0], c);
			$$(a[0]).html(d);
			return !0
		};
		this._bindAllEvent = function() {
			for (var c = this, b = 0; b < a.length; b++) $$(a[b]).unbind("change").change(function(b) {
				b = a.indexOf(this);
				if (0 > b) alert("dom\u8f93\u5165\u9519\u8bef\uff0c\u8bf7\u68c0\u67e5select_dom_array\u4e2d\u7684\u503c");
				else {
					for (var e = b + 1; e < a.length; e++) {
						var h = c._getOptionStr(a[e], []);
						$$(a[e]).html(h)
					}
					e = b + 1;
					a[e] && (h = c.findNextArray(this, $$(this).val())) && (h = c._getOptionStr(a[e], h), $$(a[e]).html(h));
					if (c.option._defaultFunction[b]) {
						h = {};
						for (e = 0; e < a.length; e++) {
							var l = {
									t: "",
									v: ""
								},
								m = $$(a[e]).find("option:selected");
							m && (l = {
								t: m.html(),
								v: m.val()
							});
							h[a[e]] = l
						}
						c.option._defaultFunction[b](h)
					}
				}
			})
		};
		this._getOptionStr = function(c, b) {
			for (var g = [], f = a.indexOf(c), f = this.option._defaultValue[f].concat(b), h = 0; h < f.length; h++) g.push("<option value=" +
				f[h].v + ">" + f[h].t + "</option>");
			return g.join("")
		};
		this.findNextArray = function(b, e) {
			var g = a.indexOf(b);
			if (0 > g) return alert("id\u8f93\u5165\u9519\u8bef\uff0c\u8bf7\u68c0\u67e5select_dom_array\u4e2d\u7684\u503c"), [];
			var f = [],
				h = function(a, c) {
					for (var b = 0; b < c.length; b++) {
						if (a == g && c[b].v == e) {
							f = c[b].opt_data_array;
							break
						}
						c[b].opt_data_array && c[b].opt_data_array instanceof Array && (a++, h(a, c[b].opt_data_array), a--)
					}
				};
			h(0, c);
			return f
		};
		this._init()
	};
	RoleSelector._MultiSelector.create = function(a, c, b) {
		return new RoleSelector._MultiSelector(a,
			c, b)
	};
	RoleSelector._$extend = function(a, c) {
		if ("object" != typeof c || !c) return a;
		for (var b in c) a[b] = c[b];
		return a
	};
	RoleSelector._getCookie = function(a) {
		var c;
		return (c = document.cookie.match(RegExp("(^| )" + a + "=([^;]*)(;|$)"))) ? unescape(c[2]) : null
	};
	RoleSelector._getAllQuery = function(a) {
		a = a || window.location.href;
		var c = {};
		if (0 < a.length)
			for (var b = a.split("&"), d = 0; d < b.length; d++) {
				var e = b[d].split("=");
				2 == e.length && 0 < e[0].length && 0 < e[1].length && (a == window.location.href && 0 <= e[1].indexOf("#") && (e[1] = e[1].split("#")[0]),
					0 < e[1].length && (0 == d && (e[0] = e[0].substr(e[0].indexOf("?") + 1)), e[0] && (c[e[0]] = unescape(e[1]))))
			}
		return c
	};
	RoleSelector._getAllQueryStr = function(a, c) {
		a = a || null;
		c = c || null;
		var b = function(a) {
				if (a) {
					var c = [],
						b;
					for (b in a)
						if ("undefined" != typeof a[b])
							if ("string" == typeof a[b] || "number" == typeof a[b] || "boolean" == typeof a[b]) c.push(b + "=" + escape(a[b].toString()));
							else if (null == a[b]) c.push(b + "=");
					else if (a[b] instanceof Array) {
						for (var d = 0; d < a[b].length; d++) a[b][d] = escape(a[b][d].toString());
						c.push(b + "=" + a[b].join("|"))
					} else try {
						c.push(b +
							"=" + escape(a[b].toString()))
					} catch (e) {}
					if (0 < c.length) return c.join("&")
				}
				return ""
			},
			d = -1;
		a || c ? a && c ? d = 2 : a && !c ? d = 1 : !a && c && (a = c, d = 1) : d = 0;
		switch (d) {
			case 0:
				return c = RoleSelector._getAllQuery(), b(c);
			case 1:
				var e = a;
				return "string" == typeof e ? b(RoleSelector._getAllQuery(e)) : "object" == typeof e ? b(e) : "";
			case 2:
				d = {};
				if ("string" == typeof a) d = RoleSelector._getAllQuery(a);
				else if ("object" == typeof a)
					for (e in a) try {
						d[e] = unescape(a[e])
					} catch (g) {} else return "";
				for (e in c) try {
					d[e] = unescape(c[e])
				} catch (f) {}
				return b(d);
			default:
				alert("\u53c2\u6570\u9519\u8bef")
		}
	};
	RoleSelector._getAllOldQuery = function(a) {
		a = a || window.location.href;
		var c = {};
		if (0 < a.length)
			for (var b = a.split("&"), d = 0; d < b.length; d++) {
				var e = b[d].split("=");
				2 == e.length && 0 < e[0].length && 0 < e[1].length && (a == window.location.href && 0 <= e[1].indexOf("#") && (e[1] = e[1].split("#")[0]), 0 < e[1].length && (0 == d && (e[0] = e[0].substr(e[0].indexOf("?") + 1)), e[0] && (c[e[0]] = e[1])))
			}
		return c
	};
	RoleSelector._comm = {
		option: {
			ALL_SELECTOR: [],
			maxId: 0
		},
		getId: function() {
			return ++this.option.maxId
		},
		getUserUin: function() {
			var a = RoleSelector._getCookie("IED_LOG_INFO2");
			return a ? (a = RoleSelector._getAllQuery(a), (a = a.userUin) && !isNaN(a) ? a : "") : (a = RoleSelector._getCookie("IED_LOG_INFO")) ? (a = LL_parseParam(a.replace(/\|/g, "&").replace(/\*/g, "=")), (a = a.uin) && !isNaN(a) ? a : "") : ""
		},
		getNickName: function() {
			var a = "";
			if (a = RoleSelector._getCookie("IED_LOG_INFO2"))
				if (a = RoleSelector._getAllQuery(a), a.nickName) return a = decodeURIComponent(a.nickName), RoleSelector._DATA.USER_LOGIN_INFO.userUin = RoleSelector._comm.getUserUin(), RoleSelector._DATA.USER_LOGIN_INFO.nickName = a, RoleSelector._DATA.USER_LOGIN_INFO.nickName;
			if (RoleSelector._DATA.USER_LOGIN_INFO.userUin && RoleSelector._DATA.USER_LOGIN_INFO.userUin == RoleSelector._comm.getUserUin() && RoleSelector._DATA.USER_LOGIN_INFO.nickName) return RoleSelector._DATA.USER_LOGIN_INFO.nickName;
			RoleSelector._DATA.USER_LOGIN_INFO.userUin = RoleSelector._comm.getUserUin();
			RoleSelector._DATA.USER_LOGIN_INFO.nickName = RoleSelector._comm.getUserUin();
			LoginManager.getNickName(function(a) {
				RoleSelector._DATA.USER_LOGIN_INFO.userUin = RoleSelector._comm.getUserUin();
				RoleSelector._DATA.USER_LOGIN_INFO.nickName =
					a.nickName ? a.nickName : RoleSelector._comm.getUserUin()
			});
			return RoleSelector._DATA.USER_LOGIN_INFO.nickName
		},
		initNickName: function(a) {
			a && ("ava" != a && "7" != a && "cf" != a || this.getNickName())
		},
		getAreaAndRoleType: function(a) {
			a = a.toLowerCase();
			var c = {
				bear: 2,
				pet: 2,
				roco: 2,
				qqgame: 1,
				djc: 1,
				ld2: 2,
				qqbaby: 2,
				tnt: 2,
				cheng: 2,
				ttd: 2,
				qqtang: 2,
				ye: 2,
				fight: 2,
				"007": 2,
				qqsh: 2,
				jjxf: 2,
				mc: 2,
				yu: 2
			};
			return "undefined" != typeof c[a] ? c[a] : 4
		}
	};
	window.RoleSelector_currloginuser = RoleSelector._comm.getUserUin();
	RoleSelector.checkLoginUser = function() {
		return "" ==
			RoleSelector._comm.getUserUin() || "" == window.RoleSelector_currloginuser ? !0 : window.RoleSelector_currloginuser == RoleSelector._comm.getUserUin() ? !0 : !1
	};
	RoleSelector._DATA = {
		GET_AREA_URL: {
			"default": "http://gameact.qq.com/comm-htdocs/js/game_area/${gameId}_server_select.js",
			xia: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=${gameId}",
			s3: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=s3",
			zw: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=zw",
			ff: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=ff",
			dh: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=dh",
			zl: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=zl",
			yi: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=yi",
			meng: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=meng",
			ls: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=ls",
			zx: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=zx",
			"7q": "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=7q",
			yz: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=yz",
			hlzq: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=hlzq",
			t3: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=t3",
			chuanqi: "http://openwebgame.qq.com/app/getServerInfoJs.php?gameName=chuanqi"
		},
		GET_ROLE_URL: {
			'default' : location.protocol+'//comm.aci.game.qq.com/main',
			'cf' : location.protocol+'//cf.aci.game.qq.com/main',
			'lol' : location.protocol+'//lol.aci.game.qq.com/main',
			'yxzj': location.protocol+'//yxzj.aci.game.qq.com/main'
		},
		USER_LOGIN_INFO: {
			userUin: "",
			nickName: ""
		}
	};
	RoleSelector.getAllServiceType = function() {
		var a = [],
			c;
		for (c in RoleSelector._ChractorResult)
			if (/^_(.+)GetChractorResult$/i.test(c)) {
				var b =
					c.replace(/^_(.+)GetChractorResult$/i, "$1"),
					b = b.toLowerCase();
				"comm" != b && a.push(b)
			}
		return a
	};
	RoleSelector.setRoleToCookie = function(a, c) {
		"function" != typeof c && (c = function(a) {
			a = JsonObject.toString(a);
			alert(a)
		});
		if (a) {
			for (var b = !1, d = RoleSelector.getAllServiceType(), e = 0; e < d.length; e++)
				if (a == d[e]) {
					b = !0;
					break
				}
			if (!b) return !1;
			LoginManager.submitLogin(function() {
				RoleSelector.init({
					gameId: a,
					isQueryRole: !0,
					isShutdownSubmit: !1,
					isShutdownHide: !1,
					submitEvent: function(a) {
						a.uin = LoginManager.getUserUin();
						var b = JsonObject.toString(a),
							b = encodeURIComponent(b);
						CookieManager.setCookie("GLOBAL_ROLE_DATA", b, 720);
						c(a)
					}
				}).show()
			})
		} else alert("\u4f20\u5165\u4e1a\u52a1ID")
	};
	RoleSelector.getRoleFromCookie = function(a) {
		if (!LoginManager.isLogin()) return null;
		var c = CookieManager.getCookie("GLOBAL_ROLE_DATA");
		if (!c) return null;
		var c = decodeURIComponent(c),
			c = JsonObject.toJson(c),
			b = LoginManager.getUserUin();
		if (c.uin != b) return null;
		if (!a) return c;
		for (var b = !1, d = RoleSelector.getAllServiceType(), e = 0; e < d.length; e++)
			if (a == d[e]) {
				b = !0;
				break
			}
		return b &&
			c.gameId == a ? c : null
	};
	RoleSelector.initFloatContent = function(a) {
		var c = RoleSelector._comm.getId(),
			b = {
				gameId: "",
				isQueryRole: !0,
				showAreaId: "",
				hideAreaId: "",
				isShutdownSubmit: !1,
				isShutdownHide: !1,
				onOpenFloatEvent: null,
				onCloseFloatEvent: null,
				onConfirmSubmitEvent: null,
				onCancelSubmitEvent: null,
				onBeforSubmit: function() {
					return RoleSelector.checkLoginUser()
				},
				onErrorEvent: function(a) {
					"\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01" == a ? alert("\u5f88\u62b1\u6b49\uff0c\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01\u8bf7\u68c0\u67e5\u60a8\u662f\u5426\u6ce8\u518c\u8be5\u6e38\u620f\u89d2\u8272\u540e\uff0c\u518d\u6765\u5c1d\u8bd5\u54e6\uff01") :
						$$("#errorMessage_" + c).html() ? $$("#errorMessage_" + c).html(a).show() : alert(a)
				},
				style: 1
			};
		RoleSelector._$extend(b, a);
		var d = {
				isShowHeader: !0,
				isShowClose: !0,
				isShowCancel: !0,
				isAlignCenter: !0,
				isCanMove: !0,
				isAlignTop: !1,
				onAllCloseEvent: function() {
					return !1
				},
				isShowCover: !0,
				coverColor: "#E6F5FF",
				styleStr: ""
			},
			d = JsonObject.extend(d, a);
		"function" == typeof b.onCancelSubmitEvent && (d.isShowCancel = !0);
		if (b.gameId) {
			var e = "area1ContentId_" + c,
				g = "areaContentId_" + c,
				f = "roleContentId_" + c,
				h = "confirmButtonId_" + c,
				l = "cancelButtonId_" +
				c,
				m = function(a) {
					a = {
						level: a.level,
						isQueryRole: a.isQueryRole
					};
					return TemplateManager.parseTemplate('<ul class="role_select">{if RoleObject.level != 0}<li class="area_select_li"><span>\u8bf7\u9009\u62e9\u5927\u533a\uff1a</span>{if RoleObject.level==2}<select id="' + e + '"><option value="">\u8bf7\u9009\u62e9\u5927\u533a</option></select><select id="' + g + '"><option value="">\u8bf7\u9009\u62e9\u670d\u52a1\u5668</option></select>{else}<select id="' + g + '"><option value="">\u8bf7\u9009\u62e9\u5927\u533a</option></select>{/if}</li>{/if}{if RoleObject.isQueryRole}<li class="role_select_li" style="display:none;"><span>\u8bf7\u9009\u62e9\u89d2\u8272\uff1a</span><select id="' +
						f + '"></select></li>{/if}<li class="error_message_li" id="errorMessage_' + c + '"></li><li class="button"><button id="' + h + '">\u786e  \u5b9a</button><button id="' + l + '">\u53d6  \u6d88</button></li></ul>').process(a, "RoleObject")
				};
			a = RoleSelector._comm.getAreaAndRoleType(b.gameId);
			if (1 == a) {
				var k = {
					gameId: b.gameId,
					submitData: {}
				};
				if ("function" == typeof b.onConfirmSubmitEvent) b.onConfirmSubmitEvent(k)
			} else {
				var n = function(a, c) {
					var d = {
						getOnlyAreaStyle: function() {
							var a = [];
							2 == c ? (a.push(".role_select {width:300px; _width:280px;}"),
								a.push(".role_select li select{width:130px;}"), a.push(".role_select li.button{text-align:center;}")) : 1 == c && (a.push(".role_select {width:240px; _width:220px;}"), a.push(".role_select li select{width:200px;}"), b.isQueryRole || a.push(".role_select li.button{text-align:center;}"));
							a.push('.role_select {font:normal 12px Tahoma,"\u5b8b\u4f53"; color:#222222; list-style:none; padding:5px 0 0 5px; margin:0px; margin-left:-10px; *margin-left:0px;}');
							a.push(".role_select li{*height:40px; margin:0px;}");
							a.push(".role_select .error_message_li {height:25px; display:none; color:#FF0000; clear:both; padding-left:10px;}");
							a.push(".role_select li select{height:22px;}");
							a.push(".role_select .area_select_li {text-align:center;}");
							a.push(".role_select .area_select_li span {display:none;}");
							a.push(".role_select .area_select_li select { margin-right:5px; margin-bottom:10px;}");
							a.push(".role_select .role_select_li {display:none;}");
							a.push(".role_select li.button{*height:30px; clear:both;}");
							return a.join("")
						},
						getDefaultStyle: function() {
							var a = [];
							2 == c ? (a.push(".role_select {width:300px; _width:280px;}"), a.push(".role_select li select{width:135px;}"),
								a.push(".role_select li.button{text-align:center;}")) : 1 == c && (a.push(".role_select {width:240px; _width:220px;}"), a.push(".role_select li select{width:220px;}"));
							a.push('.role_select{font:normal 12px Tahoma,"\u5b8b\u4f53"; color:#222222; text-align:left; list-style:none; padding:5px 0 0 5px; margin:0px; margin-top:-5px;}');
							a.push(".role_select li{*height:50px; margin:0px;}");
							a.push(".role_select .error_message_li {height:25px; display:none; color:#FF0000; clear:both;}");
							a.push(".role_select li span {display:block;font-weight:normal;height:22px;line-height:22px;}");
							a.push(".role_select li select,.role_select li input{*border:1px solid #616162;float:left;margin-right:3px;}");
							a.push(".role_select li select{height:22px;}");
							a.push(".role_select li button{width:75px; height:25px;}");
							a.push(".role_select .role_select_li{clear:both;}");
							a.push(".role_select li.button{*height:30px; clear:both;}");
							return a.join("")
						},
						getOnlyRoleStyle: function() {
							var a = [];
							2 == c ? (a.push(".role_select {width:300px; _width:280px;}"), a.push(".role_select li select{width:135px;}"), a.push(".role_select li.button{text-align:center;}")) :
								1 == c && (a.push(".role_select {width:240px; _width:220px;}"), a.push(".role_select li select{width:220px;}"));
							a.push('.role_select{font:normal 12px Tahoma,"\u5b8b\u4f53"; color:#222222; text-align:left; list-style:none; padding:5px 0 0 5px; margin:0px; margin-top:-5px;}');
							a.push(".role_select li{*height:50px; margin:0px;}");
							a.push(".role_select .error_message_li {height:25px; display:none; color:#FF0000; clear:both;}");
							a.push(".role_select li span {display:block;font-weight:normal;height:22px;line-height:22px;}");
							a.push(".role_select li select,.role_select li input{*border:1px solid #616162; margin-right:3px;}");
							a.push(".role_select li select{height:22px;}");
							a.push(".role_select li button{width:75px; height:25px;}");
							a.push(".role_select .role_select_li{clear:both;}");
							a.push(".role_select li.button{*height:30px; clear:both;}");
							return a.join("")
						}
					};
					0 != $$("#roleSelectStyle").length && $$("#roleSelectStyle").remove();
					var e = "";
					1 == a ? e = d.getOnlyAreaStyle() : 2 == a ? e = d.getDefaultStyle() : 3 == a && (e = d.getOnlyRoleStyle());
					e &&
						(RoleSelector.isNewFloater && (e += ".role_select {margin-left:10px; margin-bottom:10px;}"), d = '<style id="roleSelectStyle" type="text/css">' + e + "</style>", $$("head").append($$(d)))
				};
				if (2 == a)
					if (k = {
							gameId: b.gameId,
							submitData: {}
						}, b.isQueryRole) RoleSelector.loadRoleInfoList({
						gameId: b.gameId
					}, function(a) {
						if (0 == a.length) b.onErrorEvent("\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01");
						else if ("jjxf" == b.gameId) {
							var e = {
								width: 300,
								height: 0,
								border: 1,
								title: "\u9009\u62e9\u6e38\u620f\u89d2\u8272",
								content: '<ul class="role_select"><li class="role_select_li">\u8bf7\u9009\u62e9\u89d2\u8272\uff1a<select id="' + f + '"></select></li><li class="error_message_li" id="errorMessage_' + c + '"></li><li class="button"><button id="' + h + '">\u786e  \u5b9a</button><button id="' + l + '">\u53d6  \u6d88</button></li></ul>',
								onOpenEvent: function() {
									return "function" == typeof b.onOpenFloatEvent ? b.onOpenFloatEvent() : !1
								},
								onCloseEvent: function() {
									return "function" == typeof b.onCloseFloatEvent ? b.onCloseFloatEvent() : !1
								},
								style: b.style
							};
							RoleSelector._$extend(e, d);
							window.roleFloater = FloaterManager.init(e, !1);
							n(3, 2);
							roleFloater.show();
							for (var e = [], g = 0; g < a.length; g++) {
								var m = a[g],
									s = RoleSelector._getAllQueryStr(m);
								e.push('<option value="' + m.roleId + '" roleStr="' + s + '">\u89d2\u8272' + m.roleId + " " + m.roleName + " \u7b49\u7ea7" + m.roleLevel + "</option>")
							}
							$$("#" + f).html(e.join(""));
							$$("#" + f).unbind("change").change(function() {
								$$("#errorMessage_" + c).empty().hide()
							});
							$$("#" + h).click(function() {
								k.submitData.areaid = "";
								k.submitData.areaname = "";
								var a =
									$$("#" + f).find("option:selected").val();
								if (a) {
									var c = $$("#" + f).find("option:selected").attr("roleStr"),
										d = $$("#" + f).find("option:selected").html();
									k.submitData.roleid = a;
									k.submitData.rolename = d;
									var a = RoleSelector._getAllQuery(c),
										e;
									for (e in a) k.submitData[e.toLowerCase()] = a[e];
									"function" == typeof b.onConfirmSubmitEvent && b.onConfirmSubmitEvent(k) || roleFloater.close()
								} else b.onErrorEvent("\u8bf7\u60a8\u9996\u5148\u9009\u62e9\u89d2\u8272\u4fe1\u606f")
							});
							$$("#" + l).click(function() {
								"function" == typeof b.onCancelSubmitEvent &&
									b.onCancelSubmitEvent() || roleFloater.close()
							})
						} else if (1 == a.length) {
							m = a[0];
							for (g in m) k.submitData[g.toLowerCase()] = m[g];
							if ("function" == typeof b.onConfirmSubmitEvent) b.onConfirmSubmitEvent(k)
						} else alert("\u6ca1\u5927\u533a\u4fe1\u606f\u65f6\uff0c\u89d2\u8272\u5374\u6709\u591a\u4e2a\uff0c\u8be5\u7ec4\u4ef6\u5c1a\u4e0d\u652f\u6301\u3002")
					}, function(a) {
						b.onErrorEvent(a)
					});
					else {
						if ("function" == typeof b.onConfirmSubmitEvent) b.onConfirmSubmitEvent(k)
					}
				else 3 == a ? (k = {
					gameId: b.gameId,
					submitData: {}
				}, RoleSelector.initAreaContent({
					gameId: b.gameId,
					isShutdownHide: b.isShutdownHide,
					area1ContentId: e,
					areaContentId: g,
					showAreaId: b.showAreaId,
					hideAreaId: b.hideAreaId,
					onConfirmSubmitEvent: function(a) {
						a.areaId || $$("#errorMessage_" + c).empty().hide()
					},
					onEndLoadAreaEvent: function(a) {
						var c = 0;
						"undefined" != typeof a && a && 0 < a.length && (c = "undefined" == typeof a[0].status ? 2 : 1);
						if (0 != c) {
							a = m({
								level: c,
								isQueryRole: !1
							});
							var e = 300;
							1 == c && (e = 250);
							a = {
								width: e,
								height: 0,
								border: 1,
								title: "\u9009\u62e9\u5927\u533a\u4fe1\u606f",
								content: a,
								onOpenEvent: function() {
									return "function" == typeof b.onOpenFloatEvent ?
										b.onOpenFloatEvent() : !1
								},
								onCloseEvent: function() {
									return "function" == typeof b.onCloseFloatEvent ? b.onCloseFloatEvent() : !1
								},
								style: b.style
							};
							RoleSelector._$extend(a, d);
							window.roleFloater = FloaterManager.init(a);
							1 == b.style ? n(1, c) : 2 == b.style && n(0);
							roleFloater.show();
							$$("#" + h).click(function() {
								if ("function" == typeof b.onBeforSubmit && !1 == b.onBeforSubmit()) return alert("\u60a8\u540c\u65f6\u767b\u5f55\u4e86\u591a\u4e2aQQ\u53f7\uff0c\u8bf7\u70b9\u51fb\u786e\u5b9a\u5237\u65b0\u672c\u9875\u9762\u540e\u91cd\u8bd5\uff01"),
									document.location.reload(), !1;
								var a = $$("#" + g).find("option:selected").val(),
									c = $$("#" + g).find("option:selected").html();
								if (a)
									if (!b.isShutdownSubmit && 0 <= c.indexOf("\u505c\u673a")) b.onErrorEvent("\u8be5\u5927\u533a\u5df2\u505c\u673a\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\u3002");
									else k.submitData.areaid = a, k.submitData.areaname = c, "function" == typeof b.onConfirmSubmitEvent && b.onConfirmSubmitEvent(k) || roleFloater.close();
								else b.onErrorEvent("\u8bf7\u60a8\u9996\u5148\u9009\u62e9\u5927\u533a\u4fe1\u606f")
							});
							$$("#" + l).click(function() {
								"function" == typeof b.onCancelSubmitEvent && b.onCancelSubmitEvent() || roleFloater.close()
							})
						}
					}
				})) : 4 == a && (k = {
					gameId: b.gameId,
					submitData: {}
				}, RoleSelector.initAreaContent({
					gameId: b.gameId,
					isShutdownHide: b.isShutdownHide,
					area1ContentId: e,
					areaContentId: g,
					showAreaId: b.showAreaId,
					hideAreaId: b.hideAreaId,
					onConfirmSubmitEvent: function(a) {
						$$("#errorMessage_" + c).empty().hide();
						a.areaId ? b.isQueryRole && RoleSelector.initRoleContent({
							gameId: b.gameId,
							areaId: a.areaId,
							roleContentId: f,
							onErrorEvent: b.onErrorEvent,
							onBeginLoadRoleEvent: function() {
								$$("#errorMessage_" + c).html("\u6b63\u5728\u4e3a\u60a8\u67e5\u8be2\u89d2\u8272\u4fe1\u606f\uff0c\u8bf7\u7a0d\u540e...").show();
								$$("#" + f).parent().hide()
							},
							onConfirmSubmitEvent: function() {
								$$("#errorMessage_" + c).empty().hide();
								$$("#" + f).parent().show()
							}
						}) : ($$("#" + f).empty(), $$("#" + f).parent().hide())
					},
					onEndLoadAreaEvent: function(a) {
						var e = 0;
						"undefined" != typeof a && a && 0 < a.length && (e = "undefined" == typeof a[0].status ? 2 : 1);
						if (0 != e) {
							a = m({
								level: e,
								isQueryRole: b.isQueryRole
							});
							var q =
								300;
							1 == e && (q = 250);
							var r = "\u9009\u62e9\u6e38\u620f\u89d2\u8272";
							b.isQueryRole || (r = "\u9009\u62e9\u5927\u533a\u4fe1\u606f");
							a = {
								width: q,
								height: 0,
								border: 1,
								title: r,
								content: a,
								onOpenEvent: function() {
									return "function" == typeof b.onOpenFloatEvent ? b.onOpenFloatEvent() : !1
								},
								onCloseEvent: function() {
									return "function" == typeof b.onCloseFloatEvent ? b.onCloseFloatEvent() : !1
								},
								style: b.style
							};
							RoleSelector._$extend(a, d);
							window.roleFloater = FloaterManager.init(a);
							2 == b.style ? n(0) : 1 != b.style || b.isQueryRole ? 1 == b.style && b.isQueryRole &&
								n(2, e) : n(1, e);
							roleFloater.show();
							b.isQueryRole && $$("#" + f).unbind("change").change(function() {
								$$("#errorMessage_" + c).empty().hide()
							});
							$$("#" + h).click(function() {
								if ("function" == typeof b.onBeforSubmit && !1 == b.onBeforSubmit()) return alert("\u60a8\u540c\u65f6\u767b\u5f55\u4e86\u591a\u4e2aQQ\u53f7\uff0c\u8bf7\u70b9\u51fb\u786e\u5b9a\u5237\u65b0\u672c\u9875\u9762\u540e\u91cd\u8bd5\uff01"), document.location.reload(), !1;
								var a = $$("#" + g).find("option:selected").val(),
									c = $$("#" + g).find("option:selected").html();
								if (a)
									if (!b.isShutdownSubmit && 0 <= c.indexOf("\u505c\u673a")) b.onErrorEvent("\u8be5\u5927\u533a\u5df2\u505c\u673a\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\u3002");
									else if (k.submitData.areaid = a, k.submitData.areaname = c, b.isQueryRole)
									if (c = $$("#" + f).find("option:selected").val()) {
										var a = $$("#" + f).find("option:selected").attr("roleStr"),
											d = $$("#" + f).find("option:selected").html();
										k.submitData.roleid = c;
										k.submitData.rolename = d;
										a = RoleSelector._getAllQuery(a);
										a.roleAreaId != k.submitData.areaid && ($$("#" + g).val(a.roleAreaId),
											c = $$("#" + g).find("option:selected").html(), k.submitData.areaid = a.roleAreaId, k.submitData.areaname = c);
										for (var e in a) k.submitData[e.toLowerCase()] = a[e];
										"function" == typeof b.onConfirmSubmitEvent && b.onConfirmSubmitEvent(k) || roleFloater.close()
									} else b.onErrorEvent("\u8bf7\u60a8\u9996\u5148\u9009\u62e9\u89d2\u8272\u4fe1\u606f");
								else "function" == typeof b.onConfirmSubmitEvent && b.onConfirmSubmitEvent(k) || roleFloater.close();
								else b.onErrorEvent("\u8bf7\u60a8\u9996\u5148\u9009\u62e9\u5927\u533a\u4fe1\u606f\u3002")
							});
							$$("#" + l).click(function() {
								"function" == typeof b.onCancelSubmitEvent && b.onCancelSubmitEvent() || roleFloater.close()
							})
						}
					}
				}))
			}
		} else alert("RoleSelector.initFloatContent\u4e2dgameId\u503c\u672a\u8bbe\u7f6e:" + b.gameId)
	};
	RoleSelector.initHtmlContent = function(a) {
		var c = {
			gameId: "",
			isQueryRole: !0,
			showAreaId: "",
			hideAreaId: "",
			area1ContentId: "",
			areaContentId: "",
			roleContentId: "",
			confirmButtonId: "",
			onErrorEvent: function(a) {
				alert(a)
			},
			isShutdownSubmit: !1,
			isShutdownHide: !1,
			onConfirmSubmitEvent: null,
			onChangeAreaEvent: null
		};
		RoleSelector._$extend(c, a);
		if (c.gameId)
			if (c.onConfirmSubmitEvent) {
				var b = {
					isAutoSubmit: !1,
					onBeginLoadAreaEvent: null,
					onEndLoadAreaEvent: null,
					onBeginLoadRoleEvent: null,
					onEndLoadRoleEvent: null
				};
				c.confirmButtonId || (b.isAutoSubmit = !0);
				RoleSelector._$extend(b, a);
				a = function(a, b, d) {
					a && c.area1ContentId && $$("#" + c.area1ContentId).hide();
					b && c.areaContentId && $$("#" + c.areaContentId).hide();
					d && c.roleContentId && $$("#" + c.roleContentId).hide()
				};
				var d = function(a) {
						c.roleContentId && $$("#" + c.roleContentId).html('<option value="">\u9009\u62e9\u89d2\u8272</option>');
						if ("function" == typeof c.onErrorEvent) return c.onErrorEvent(a)
					},
					e = function(a) {
						if (b.isAutoSubmit) {
							if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
						} else $$("#" + c.confirmButtonId).unbind("click").click(function() {
							if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
						})
					},
					g = function(a) {
						if (b.isAutoSubmit)
							if (c.areaContentId) $$("#" + c.areaContentId).unbind("change").change(function() {
								var b = $$("#" + c.areaContentId).find("option:selected").val(),
									e = $$("#" + c.areaContentId).find("option:selected").html();
								if (b)
									if (!c.isShutdownSubmit && 0 <= e.indexOf("\u505c\u673a")) d("\u8be5\u5927\u533a\u5df2\u505c\u673a\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\u3002");
									else {
										if (a.submitData.areaid = b, a.submitData.areaname = e, "function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
									}
								else d("\u8bf7\u60a8\u9996\u5148\u9009\u62e9\u5927\u533a\u4fe1\u606f")
							});
							else {
								if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
							}
						else $$("#" + c.confirmButtonId).unbind("click").click(function() {
							var b = $$("#" + c.areaContentId).find("option:selected").val(),
								e = $$("#" + c.areaContentId).find("option:selected").html();
							if (b)
								if (!c.isShutdownSubmit && 0 <= e.indexOf("\u505c\u673a")) d("\u8be5\u5927\u533a\u5df2\u505c\u673a\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\u3002");
								else {
									if (a.submitData.areaid = b, a.submitData.areaname = e, "function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
								}
							else d("\u8bf7\u60a8\u9996\u5148\u9009\u62e9\u5927\u533a\u4fe1\u606f")
						})
					},
					f = function(a) {
						if (b.isAutoSubmit)
							if (c.roleContentId) $$("#" + c.roleContentId).unbind("change").change(function() {
								var b =
									$$("#" + c.areaContentId).find("option:selected").val(),
									e = $$("#" + c.areaContentId).find("option:selected").html();
								if (b)
									if (!c.isShutdownSubmit && 0 <= e.indexOf("\u505c\u673a")) d("\u8be5\u5927\u533a\u5df2\u505c\u673a\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\u3002");
									else if (a.submitData.areaid = b, a.submitData.areaname = e, b = $$("#" + c.roleContentId).find("option:selected").val()) {
									var e = $$("#" + c.roleContentId).find("option:selected").attr("roleStr"),
										f = $$("#" + c.roleContentId).find("option:selected").html();
									a.submitData.roleid =
										b;
									a.submitData.rolename = f;
									var b = RoleSelector._getAllQuery(e),
										g;
									for (g in b) a.submitData[g.toLowerCase()] = b[g];
									if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
								} else d("\u8bf7\u60a8\u9996\u5148\u9009\u62e9\u89d2\u8272\u4fe1\u606f");
								else d("\u8bf7\u60a8\u9996\u5148\u9009\u62e9\u5927\u533a\u4fe1\u606f")
							});
							else {
								if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
							}
						else $$("#" + c.confirmButtonId).unbind("click").click(function() {
							var b = $$("#" + c.areaContentId).find("option:selected").val(),
								e = $$("#" + c.areaContentId).find("option:selected").html();
							if (b)
								if (!c.isShutdownSubmit && 0 <= e.indexOf("\u505c\u673a")) d("\u8be5\u5927\u533a\u5df2\u505c\u673a\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\u3002");
								else if (a.submitData.areaid = b, a.submitData.areaname = e, b = $$("#" + c.roleContentId).find("option:selected").val()) {
								var e = $$("#" + c.roleContentId).find("option:selected").attr("roleStr"),
									f = $$("#" + c.roleContentId).find("option:selected").html();
								a.submitData.roleid = b;
								a.submitData.rolename = f;
								var b = RoleSelector._getAllQuery(e),
									g;
								for (g in b) a.submitData[g.toLowerCase()] = b[g];
								if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
							} else d("\u8bf7\u60a8\u9996\u5148\u9009\u62e9\u89d2\u8272\u4fe1\u606f");
							else d("\u8bf7\u60a8\u9996\u5148\u9009\u62e9\u5927\u533a\u4fe1\u606f")
						})
					},
					h = function(a) {
						var e = function() {
							a.submitData.areaid = "";
							a.submitData.areaname = "";
							var b = $$("#" + c.roleContentId).find("option:selected").val();
							if (b) {
								var e = $$("#" + c.roleContentId).find("option:selected").attr("roleStr"),
									f = $$("#" + c.roleContentId).find("option:selected").html();
								a.submitData.roleid = b;
								a.submitData.rolename = f;
								var b = RoleSelector._getAllQuery(e),
									g;
								for (g in b) a.submitData[g.toLowerCase()] = b[g];
								if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
							} else d("\u8bf7\u60a8\u9996\u5148\u9009\u62e9\u89d2\u8272\u4fe1\u606f")
						};
						if (b.isAutoSubmit)
							if (c.roleContentId) $$("#" + c.roleContentId).unbind("change").change(function() {
								e()
							});
							else {
								if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
							}
						else $$("#" + c.confirmButtonId).unbind("click").click(function() {
							e()
						})
					},
					l = function(a, b) {
						b = b || 1;
						1 == b ? e(a) : 2 == b ? g(a) : 3 == b ? f(a) : 4 == b && h(a)
					},
					m = RoleSelector._comm.getAreaAndRoleType(c.gameId);
				if (1 == m) {
					a(!0, !0, !0);
					var k = {
						gameId: c.gameId,
						submitData: {}
					};
					l(k, 1)
				} else 2 == m ? (k = {
					gameId: c.gameId,
					submitData: {}
				}, c.isQueryRole ? (a(!0, !0, !1), RoleSelector.loadRoleInfoList({
					gameId: c.gameId
				}, function(a) {
					if (0 == a.length) d("\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01");
					else if ("jjxf" == c.gameId) {
						for (var b = [], e = 0; e < a.length; e++) {
							var f = a[e],
								g = RoleSelector._getAllQueryStr(f);
							b.push('<option value="' + f.roleId + '" roleStr="' + g + '">\u89d2\u8272' + f.roleId + " " + f.roleName + " \u7b49\u7ea7" + f.roleLevel + "</option>")
						}
						$$("#" + c.roleContentId).html(b.join(""));
						l(k, 4)
					} else if (1 == a.length) {
						f = a[0];
						for (e in f) k.submitData[e.toLowerCase()] = f[e];
						l(k, 1)
					} else alert("\u6ca1\u5927\u533a\u4fe1\u606f\u65f6\uff0c\u89d2\u8272\u5374\u6709\u591a\u4e2a\uff0c\u8be5\u7ec4\u4ef6\u5c1a\u4e0d\u652f\u6301\u3002")
				}, function(a) {
					d(a)
				})) : (a(!0, !0, !0), l(k))) : 3 == m ? (k = {
						gameId: c.gameId,
						submitData: {}
					}, a(!1, !1, !0),
					RoleSelector.initAreaContent({
						gameId: c.gameId,
						isShutdownHide: c.isShutdownHide,
						area1ContentId: c.area1ContentId,
						areaContentId: c.areaContentId,
						showAreaId: c.showAreaId,
						hideAreaId: c.hideAreaId,
						onConfirmSubmitEvent: function(a) {
							if ("function" == typeof c.onChangeAreaEvent) c.onChangeAreaEvent(a)
						},
						onEndLoadAreaEvent: function(a) {
							var b = 0;
							"undefined" != typeof a && a && 0 < a.length && (b = "undefined" == typeof a[0].status ? 2 : 1);
							0 != b && l(k, 2)
						}
					})) : 4 == m && (k = {
					gameId: c.gameId,
					submitData: {}
				}, a(!1, !1, !1), RoleSelector.initAreaContent({
					gameId: c.gameId,
					isShutdownHide: c.isShutdownHide,
					area1ContentId: c.area1ContentId,
					areaContentId: c.areaContentId,
					showAreaId: c.showAreaId,
					hideAreaId: c.hideAreaId,
					onConfirmSubmitEvent: function(a) {
						if ("function" == typeof c.onChangeAreaEvent) c.onChangeAreaEvent(a);
						c.roleContentId && $$("#" + c.roleContentId).html('<option value="">\u9009\u62e9\u89d2\u8272</option>');
						if (c.isQueryRole && a.areaId) {
							var b = $$("#" + c.areaContentId).find("option:selected").html();
							if (!c.isShutdownSubmit && 0 <= b.indexOf("\u505c\u673a")) c.onErrorEvent("\u8be5\u5927\u533a\u5df2\u505c\u673a\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\u3002");
							else RoleSelector.initRoleContent({
								gameId: c.gameId,
								areaId: a.areaId,
								roleContentId: c.roleContentId,
								onErrorEvent: d
							})
						}
					},
					onEndLoadAreaEvent: function(a) {
						var b = 0;
						"undefined" != typeof a && a && 0 < a.length && (b = "undefined" == typeof a[0].status ? 2 : 1);
						0 != b && (c.isQueryRole ? l(k, 3) : l(k, 2))
					}
				}))
			} else alert("RoleSelector.initHtmlContent\u4e2donConfirmSubmitEvent\u503c\u672a\u8bbe\u7f6e:" + c.onConfirmSubmitEvent);
		else alert("RoleSelector.initHtmlContent\u4e2dgameId\u503c\u672a\u8bbe\u7f6e:" + c.gameId)
	};
	RoleSelector.loadAreaInfoList =
		function(a, c) {
			var b = {
				gameId: ""
			};
			RoleSelector._$extend(b, a);
			if (b.gameId) {
				var d = b.gameId.toLowerCase(),
					e = "";
				"string" == typeof RoleSelector._DATA.GET_AREA_URL[d] && (e = RoleSelector._DATA.GET_AREA_URL[d]);
				e || (e = RoleSelector._DATA.GET_AREA_URL["default"]);
				var e = e.replaceAll("${gameId}", d),
					g = "",
					d = d + "",
					g = "7" == d ? "QXZBServerSelect" : "9j" == d ? "_9JServerSelect" : "9" == d ? "_9ServerSelect" : "3" == d ? "_3ServerSelect" : "9z" == d ? "_9ZServerSelect" : "7q" == d ? "_7QServerSelect" : "6" == d ? "_6ServerSelect" : d.toUpperCase() + "ServerSelect";
				if ("function" != typeof c) alert("\u52a0\u8f7d\u5927\u533a\u4fe1\u606f\u5fc5\u987b\u8bbe\u7f6e\u56de\u8c03\u51fd\u6570");
				else if ("object" == typeof window[g] && window[g].STD_DATA) c(window[g].STD_DATA);
				else if (b = RoleSelector._comm.getAreaAndRoleType(b.gameId), 1 == b || 2 == b) c([]);
				else try {
					FileLoadManager.ajaxRequest({
						url: e,
						dataType: "object",
						dataTypeName: g,
						showLoadingStr: "",
						onLoadSuccessEvent: function() {
							var a = eval(g);
							"undefined" != typeof a && a && a.STD_DATA && c(a.STD_DATA)
						}
					})
				} catch (f) {
					alert("RoleSelector.loadAreaInfoList \u52a0\u8f7d\u51fa\u9519\uff01")
				}
			} else alert("RoleSelector.loadAreaInfoList\u4e2dgameId\u503c\u672a\u8bbe\u7f6e:" +
				b.gameId)
		};
	RoleSelector.loadRoleInfoList = function(a, c, b) {
		var d = {
			gameId: "",
			areaId: ""
		};
		RoleSelector._$extend(d, a);
		a = !0;
		var e = RoleSelector._comm.getAreaAndRoleType(d.gameId);
		if (1 != e && 3 != e)
			if (d.gameId) {
				if (1 == e || 2 == e) a = !1;
				if (a && !d.areaId) alert("RoleSelector.loadRoleInfoList\u4e2dareaId\u503c\u672a\u8bbe\u7f6e:" + d.areaId);
				else {
					var g = "";
					"string" == typeof RoleSelector._DATA.GET_ROLE_URL[d.gameId] && (g = RoleSelector._DATA.GET_ROLE_URL[d.gameId]);
					g || (g = RoleSelector._DATA.GET_ROLE_URL["default"]);
					var f = {};
					f.game =
						d.gameId;
					a && (f.area = d.areaId);
					//request over aci
					f.sCloudApiName = 'ams.gameattr.role';
					(function() {
						var a = +new Date + "" + Math.floor(2E4 * Math.random()),
							e = "query_role_result_" + a;
						f.callback = a;
						g = g + "?" + RoleSelector._getAllQueryStr(f);
						FileLoadManager.ajaxRequest({
							url: g,
							dataType: "object",
							dataTypeName: e,
							showLoadingStr: "",
							onLoadSuccessEvent: function() {
								window[e].area = f.area || 0;
								a: if ("function" == typeof c) {
									var a = null;
									try {
										for (var a = RoleSelector._ChractorResult.getChractorResultByGameId(d.gameId, window[e]), g = 0; g < a.length; g++) a[g].roleAreaId = d.areaId
									} catch (h) {
										"function" ==
										typeof b && b(h);
										break a
									}
									null != a ? c(a) : "function" == typeof b && b("\u7f51\u7edc\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")
								}
								window[e] = void 0
							}
						})
					})()
				}
			} else alert("RoleSelector.loadRoleInfoList\u4e2dgameId\u503c\u672a\u8bbe\u7f6e:" + d.gameId)
	};
	RoleSelector.initAreaContent = function(a) {
		var c = {
			gameId: "",
			area1ContentId: "",
			areaContentId: "",
			showAreaId: "",
			hideAreaId: "",
			isShutdownHide: !1,
			onConfirmSubmitEvent: null,
			onBeginLoadAreaEvent: null,
			onEndLoadAreaEvent: null
		};
		RoleSelector._$extend(c, a);
		if (c.gameId)
			if (c.areaContentId) {
				a =
					RoleSelector._comm.getAreaAndRoleType(c.gameId);
				var b = {
					gameId: c.gameId,
					areaId: ""
				};
				if (1 == a || 2 == a) {
					if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(b)
				} else "function" == typeof c.onBeginLoadAreaEvent && c.onBeginLoadAreaEvent() || RoleSelector.loadAreaInfoList({
					gameId: c.gameId
				}, function(a) {
					if ("function" != typeof c.onEndLoadAreaEvent || !c.onEndLoadAreaEvent(a)) {
						var b = 0;
						"undefined" != typeof a && a && 0 < a.length && (b = "undefined" == typeof a[0].status ? 2 : 1);
						if (0 != b) {
							if (1 == b) {
								for (var g = [], f = 0; f < a.length; f++)
									if (!a[f].display ||
										0 !== 1 * a[f].display) {
										if (a[f].status && 0 == 1 * a[f].status) {
											if (c.isShutdownHide) continue;
											0 > a[f].t.indexOf("(\u505c\u673a)") && (a[f].t += "(\u505c\u673a)")
										}
										g.push(a[f])
									}
								a = g
							} else if (2 == b)
								for (f = 0; f < a.length; f++) {
									for (var g = [], h = 0; h < a[f].opt_data_array.length; h++)
										if (!a[f].opt_data_array[h].display || 0 !== 1 * a[f].opt_data_array[h].display) {
											if (a[f].opt_data_array[h] && a[f].opt_data_array[h].status && 0 == 1 * a[f].opt_data_array[h].status) {
												if (c.isShutdownHide) continue;
												0 > a[f].opt_data_array[h].t.indexOf("(\u505c\u673a)") &&
													(a[f].opt_data_array[h].t += "(\u505c\u673a)")
											}
											g.push(a[f].opt_data_array[h])
										}
									a[f].opt_data_array = g
								}
							var f = c.showAreaId,
								l = c.hideAreaId,
								g = [],
								m = [];
							f && ("string" == typeof f ? g = f.split("|") : "object" == typeof f && f.join && (g = f));
							l && ("string" == typeof l ? m = l.split("|") : "object" == typeof l && l.join && (m = l));
							h = 0;
							if (0 < g.length) {
								if (0 < m.length) {
									for (var k = [], f = 0; f < g.length; f++) {
										for (var l = !1, n = 0; n < m.length; n++)
											if (m[n] == g[f]) {
												l = !0;
												break
											}
										l || k.push(g[f])
									}
									g = k
								}
								0 < g.length && (h = 1)
							} else 0 < m.length && (h = 2);
							if (0 < h)
								if (1 == h)
									if (1 == b) {
										k = [];
										for (f = 0; f < a.length; f++) {
											l = !1;
											for (n = 0; n < g.length; n++)
												if (g[n] == a[f].v) {
													l = !0;
													break
												}
											l && k.push(a[f])
										}
										a = k
									} else {
										if (2 == b) {
											k = [];
											for (f = 0; f < a.length; f++) {
												for (var p = [], h = 0; h < a[f].opt_data_array.length; h++)
													if (a[f].opt_data_array[h]) {
														l = !1;
														for (n = 0; n < g.length; n++)
															if (g[n] == a[f].opt_data_array[h].v) {
																l = !0;
																break
															}
														l && p.push(a[f].opt_data_array[h])
													}
												0 < p.length && (a[f].opt_data_array = p, k.push(a[f]))
											}
											a = k
										}
									}
							else if (2 == h)
								if (1 == b) {
									k = [];
									for (f = 0; f < a.length; f++) {
										l = !1;
										for (n = 0; n < m.length; n++)
											if (m[n] == a[f].v) {
												l = !0;
												break
											}
										l || k.push(a[f])
									}
									a =
										k
								} else if (2 == b) {
								k = [];
								for (f = 0; f < a.length; f++) {
									p = [];
									for (h = 0; h < a[f].opt_data_array.length; h++)
										if (a[f].opt_data_array[h]) {
											l = !1;
											for (n = 0; n < m.length; n++)
												if (m[n] == a[f].opt_data_array[h].v) {
													l = !0;
													break
												}
											l || p.push(a[f].opt_data_array[h])
										}
									0 < p.length && (a[f].opt_data_array = p, k.push(a[f]))
								}
								a = k
							}
							1 == b ? $E(c.areaContentId) ? RoleSelector._MultiSelector.create([$E(c.areaContentId)], a, function(a) {
									a = {
										gameId: c.gameId,
										areaId: a[$E(c.areaContentId)].v,
										areaName: a[$E(c.areaContentId)].t
									};
									if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
								}) :
								alert("RoleSelector.initAreaContent\u4e2dareaContentId\u503c\u672a\u8bbe\u7f6e:" + c.areaContentId) : 2 == b && (c.area1ContentId ? $E(c.area1ContentId) ? $E(c.areaContentId) ? RoleSelector._MultiSelector.create([$E(c.area1ContentId), $E(c.areaContentId)], a, [function() {
										var a = {
											gameId: c.gameId,
											areaId: "",
											areaName: ""
										};
										if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
									}, function(a) {
										a = {
											gameId: c.gameId,
											areaId: a[$E(c.areaContentId)].v,
											areaName: a[$E(c.areaContentId)].t
										};
										if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
									}]) :
									alert("RoleSelector.initAreaContent\u4e2dareaContentId\u503c\u672a\u8bbe\u7f6e:" + c.areaContentId) : alert("RoleSelector.initAreaContent\u4e2darea1ContentId\u503c\u672a\u8bbe\u7f6e:" + c.area1ContentId) : alert("RoleSelector.initAreaContent\u4e2darea1ContentId\u503c\u672a\u8bbe\u7f6e:" + c.area1ContentId))
						}
					}
				})
			} else alert("RoleSelector.initAreaContent\u4e2dareaContentId\u503c\u672a\u8bbe\u7f6e:" + c.areaContentId);
		else alert("RoleSelector.initAreaContent\u4e2dgameId\u503c\u672a\u8bbe\u7f6e:" + c.gameId)
	};
	RoleSelector.initRoleContent =
		function(a) {
			var c = {
				gameId: "",
				areaId: "",
				roleContentId: "",
				onErrorEvent: function(a) {
					alert(a)
				},
				onBeginLoadRoleEvent: null,
				onEndLoadRoleEvent: null,
				onConfirmSubmitEvent: null
			};
			RoleSelector._$extend(c, a);
			c.gameId ? c.roleContentId ? (a = RoleSelector._comm.getAreaAndRoleType(c.gameId), 1 == a || 3 == a || "function" == typeof c.onBeginLoadRoleEvent && c.onBeginLoadRoleEvent() || ($$("#" + c.roleContentId).html(""), RoleSelector.loadRoleInfoList({
				gameId: c.gameId,
				areaId: c.areaId
			}, function(a) {
				if ("function" != typeof c.onEndLoadRoleEvent ||
					!c.onEndLoadRoleEvent(a))
					if (a && 0 != a.length) {
						for (var d = [], e = 0; e < a.length; e++) {
							var g = a[e],
								f = RoleSelector._getAllQueryStr(g);
							d.push('<option value="' + g.roleId + '" roleStr="' + f + '">' + g.roleName + "</option>")
						}
						$$("#" + c.roleContentId).html(d.join(""));
						if ("function" == typeof c.onConfirmSubmitEvent) c.onConfirmSubmitEvent(a)
					} else c.onErrorEvent("\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01")
			}, function(a) {
				c.onErrorEvent(a)
			}))) : alert("RoleSelector.initRoleContent\u4e2droleContentId\u503c\u672a\u8bbe\u7f6e:" +
				c.roleContentId) : alert("RoleSelector.initRoleContent\u4e2dgameId\u503c\u672a\u8bbe\u7f6e:" + c.gameId)
		};
	RoleSelector._ChractorResult = {
		getChractorResultByGameId: function(a, c) {
			if (0 != c.retCode) {
				var b = c.msg;
				"\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55\uff01" == b && (b = "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u672a\u767b\u5f55\u6216\u767b\u5f55\u5df2\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01");
				throw b;
			}
			var d = a.toUpperCase();
			"function" != typeof this["_" + d + "GetChractorResult"] && (d = "COMM");
			b = [];
			try {
				if (b = this["_" + d + "GetChractorResult"](c), null == b) return []
			} catch (e) {
				throw e;
			}
			if (c && c.checkparam)
				for (d = 0; d < b.length; d++) b[d].checkparam = c.checkparam, b[d].md5str = c.md5str;
			return b
		},
		_COMMGetChractorResult: function(a) {
			a = RoleSelector._getAllQuery(a.data);
			if (a.result && 0 != 1 * a.result) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			a = a.msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					4 <= d.length && c.push({
						roleId: d[0],
						roleName: d[1],
						roleJob: d[2],
						roleLevel: d[3]
					})
				}
			return c
		},
		_DMGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result) {
				if (1 == 1 * a.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a.result) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d =
						a[b].split(" ");
					5 == d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleLevel: d[2],
						roleJob: d[3]
					})
				}
			return c
		},
		_DNFGetChractorResult: function(a) {
			a.data = encodeURI(a.data);
			a = RoleSelector._getAllQuery(a.data);
			if (a.result && 0 != 1 * a.result) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			a = a.msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					if (4 <= d.length) {
						try {
							d[1] = decodeURIComponent(d[1])
						} catch (e) {}
						c.push({
							roleId: d[0],
							roleName: d[1],
							roleJob: d[2],
							roleLevel: d[3]
						})
					}
				}
			return c
		},
		_R2GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 ==
				a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					3 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_BEARGetChractorResult: function(a) {
			a = RoleSelector._getAllQuery(a.data);
			if (a.result && 0 != 1 * a.result) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			if (0 == a.num) return null;
			var c = RoleSelector._comm.getUserUin();
			return c || (c = a.uin, c) ? [{
				roleId: c,
				roleName: a.nick
			}] : null
		},
		_PETGetChractorResult: function(a) {
			var c =
				RoleSelector._getAllOldQuery(a.data);
			if (c.result && 0 != 1 * c.result) {
				if (1 == 1 * c.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			a = c._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			var b = 0;
			(c = c.species) && !isNaN(c) && (102 == 1 * c ? b = 1 : 103 == 1 * c && (b = 2));
			for (var c = [], d = 1; d < a.length; d++)
				if (a[d]) {
					var e = a[d].split(" ");
					if (2 == e.length) {
						var g = e[0];
						try {
							g = decodeURIComponent(e[1])
						} catch (f) {
							g = e[0]
						}
						c.push({
							roleId: e[0],
							roleName: g,
							roleSex: b
						})
					}
				}
			return c
		},
		_CFGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (a.errerno && 9003 == 1 * a.errerno) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			var c = RoleSelector._comm.getUserUin();
			if (!c) return null;
			var b = c;
			try {
				b = decodeURIComponent(a.szNick_name)
			} catch (d) {
				b =
					c
			}
			return [{
				roleId: c,
				roleName: b,
				roleLevel: a.iLevel
			}]
		},
		_X5GetChractorResult: function(a) {
			a.data = encodeURI(a.data);
			a = RoleSelector._getAllQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (a.errerno && 9003 == a.errerno) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			var c = RoleSelector._comm.getUserUin();
			if (!c) return null;
			var b = c;
			try {
				b = decodeURIComponent(a.nick)
			} catch (d) {
				(b =
					RoleSelector._comm.getNickName()) || (b = c)
			}
			if (0 != a.sex && 1 != a.sex) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			var e = 2;
			1 == a.sex && (e = 1);
			return [{
				roleId: c,
				roleName: b,
				roleSex: e,
				roleLevel: a.level,
				roleCreateTime: a.create_time,
				roleLastLogin: a.lastlogin
			}]
		},
		_SLGetChractorResult: function(a) {
			var c = RoleSelector._getAllOldQuery(a.data);
			if (c.result && 0 != 1 * c.result) {
				if (1 == 1 * c.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			a = c._webplat_msg;
			if (!a) return null;
			c = c.uin || RoleSelector._comm.getUserUin();
			a = a.split("|");
			if (1 == a.length) return null;
			for (var b = [], d = 1; d < a.length; d++)
				if (a[d]) {
					var e = a[d].split(" ");
					if (10 == e.length)
						if ("0" == e[6] || "1" == e[6] || "2" == e[6]) b.push({
							roleId: c,
							roleName: decodeURIComponent(e[1])
						});
						else {
							if ("3" == e[6]) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
							if ("4" ==
								e[6]) throw "\u7531\u4e8e\u957f\u671f\u672a\u767b\u9646\uff0c\u60a8\u5728\u8be5\u670d\u52a1\u5668\u7684\u89d2\u8272\u9700\u8981\u767b\u9646\u5927\u533a\u8fdb\u884c\u6062\u590d\u64cd\u4f5c\uff01";
							if ("5" == e[6]) throw "\u60a8\u7684\u8d26\u53f7\u5df2\u88ab\u5c01\u53f7\uff0c\u65e0\u6cd5\u83b7\u53d6\u89d2\u8272\u4fe1\u606f\uff01";
						}
				}
			return b
		},
		_XXGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			a = a.msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					5 <= d.length && (d = {
						roleId: d[0],
						roleName: decodeURIComponent(d[0])
					}, c.push(d))
				}
			return c
		},
		_XJGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					if (2 <= d.length) {
						var e = decodeURIComponent(d[1]),
							e = e.replaceAll("?", "");
						c.push({
							roleId: d[0],
							roleName: e
						})
					}
				}
			return c
		},
		_CHENGGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result && "query empty" == a.error_info) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 != a.length)
				for (var c = [], b = 1; b < a.length; b++)
					if (a[b]) {
						var d = a[b].split(" ");
						if (2 == d.length) return c.push({
							roleId: d[0],
							roleName: d[1]
						}), c
					}
			return null
		},
		_AVAGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			var c = a._webplat_msg;
			if (!c) return null;
			c = c.split("|");
			if (1 == c.length) return null;
			for (var b = [], d = 1; d < c.length; d++)
				if (c[d]) {
					var e = c[d].split(" ");
					2 == e.length && (e = {
						roleId: e[0],
						roleName: decodeURIComponent(e[d]),
						roleLevel: a.lev
					}, b.push(e))
				}
			return b
		},
		_SGGetChractorResult: function(a) {
			var c = RoleSelector._getAllOldQuery(a.data);
			if (c.result && 0 != 1 * c.result) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			if (c.msg && c.extend) {
				a = c.extend.split("|");
				c = c.msg.split("|");
				if (a.length != c.length) return null;
				for (var b = [], d = 1; d < c.length; d++) c[d] && b.push({
					roleId: a[d],
					roleName: decodeURIComponent(c[d])
				});
				return b
			}
			return null
		},
		_SGetChractorResult: function(a) {
			a.data = encodeURI(a.data);
			a = RoleSelector._getAllQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!a.name) return null;
			var c = RoleSelector._comm.getUserUin();
			a.name = decodeURIComponent(a.name);
			return [{
				roleId: c,
				roleName: a.name,
				roleLevel: a.companyLevel || 0
			}]
		},
		_QQXYGetChractorResult: function(a) {
			var c = RoleSelector._getAllOldQuery(a.data);
			if (c.result && 0 != 1 * c.result && 1 != 1 * c.result) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			a = RoleSelector._comm.getUserUin();
			if (!a && (a = c.uin, !a)) return null;
			if (c.msg) {
				for (var b = [], c = c.msg.split("|"), d = 1; d < c.length; d++)
					if (c[d]) {
						a =
							c[d].split(" ")[0];
						var e = c[d].split(" ")[1];
						b.push({
							roleId: a,
							roleName: decodeURIComponent(e)
						})
					}
				return b
			}
			return null
		},
		_SPEEDGetChractorResult: function(a) {
			a.data = decodeURIComponent(a.data);
			a = RoleSelector._getAllQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (a.errerno && 9003 == a.errerno) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			var c = RoleSelector._comm.getUserUin();
			if (!c) {
				for (var c = a._tail_request_body_, c = c.split("||"), b = 0; b < c.length; b++)
					if (c[b]) {
						var d = c[b].split("|");
						if (2 == d.length && "uin" == d[0].trim()) {
							c = d[1].trim();
							break
						}
					}
				if (!c) return null
			}
			b = a.gender_inusing;
			0 == b && (b = 2);
			return [{
				roleId: c,
				roleSex: b,
				roleName: a.nick ? a.nick : c,
				roleLevel: a.level,
				roleCountry: a.country,
				roleLiense: a.license
			}]
		},
		_7GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result && a.error_info && 0 == a.error_info.indexOf("-2,")) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (2 == 1 * a.result && a.error_info && 0 == a.error_info.indexOf("-3,")) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			var c = RoleSelector._comm.getUserUin();
			if (!c) {
				for (var c = a._tail_request_body_, c = c.split("||"), b = 0; b < c.length; b++)
					if (c[b]) {
						var d = c[b].split("|");
						if (2 == d.length && "uin" == d[0].trim()) {
							c = d[1].trim();
							break
						}
					}
				if (!c) return null
			}
			b = c;
			try {
				a.userName && (b = decodeURIComponent(a.userName))
			} catch (e) {
				(b =
					RoleSelector._comm.getNickName()) || (b = c)
			}
			return [{
				roleId: c,
				roleName: b,
				roleLevel: a.userLevel
			}]
		},
		_ROCOGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (-4E3 == 1 * a.result) throw "\u60a8\u8fd8\u672a\u6ce8\u518c\u6d1b\u514b\u738b\u56fd\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			var c = RoleSelector._comm.getUserUin();
			if (!c && (c = a.uin, !c)) return null;
			a.charac_name = a.charac_name ? a.charac_name : c;
			a.charac_name =
				a.charac_name.replace(/(\%00)+$/gi, "");
			a.charac_name = decodeURIComponent(a.charac_name);
			return [{
				roleId: c,
				roleName: a.charac_name,
				roleLevel: a.level
			}]
		},
		_FFOGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (a.error_info && 8E3 == a.error_info) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			var c = RoleSelector._comm.getUserUin();
			if (!c && (c = a.uin, !c)) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					4 == d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleLevel: d[2]
					})
				}
			return c
		},
		_FOGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (a.error_info && 8E3 == a.error_info) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			var c = RoleSelector._comm.getUserUin();
			if (!c && (c = a.uin, !c)) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					4 == d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleLevel: d[2]
					})
				}
			return c
		},
		_HXSJGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 == d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_ZGGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (-4E3 == 1 * a.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			var c = RoleSelector._comm.getUserUin();
			if (!c) return null;
			var b = c;
			try {
				b = decodeURIComponent(a.nick)
			} catch (d) {
				b = c
			}
			return [{
				roleId: c,
				roleName: b
			}]
		},
		_LOLGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result && "the account does not exist" == a.error_info) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			var c =
				RoleSelector._comm.getUserUin();
			if (!c) return null;
			var b = c;
			try {
				b = decodeURIComponent(a.userName)
			} catch (d) {
				b = c
			}
			return [{
				roleId: c,
				roleName: b
			}]
		},
		_XXZGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a.xxzmsg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_MOGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result && 0 == 1 * a.role_num) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_9JGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_LD2GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					3 <= d.length && c.push({
						roleId: decodeURIComponent(d[0]),
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_QQBABYGetChractorResult: function(a) {
			var c = RoleSelector._getAllOldQuery(a.data);
			if (c.result && 0 != 1 * c.result) {
				if (1 == 1 * c.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			a = RoleSelector._comm.getUserUin();
			a = c.uin || a;
			c = c._webplat_msg;
			if (!c) return null;
			c = c.split("|");
			if (1 == c.length) return null;
			for (var b = [], d = 1; d < c.length; d++)
				if (c[d]) {
					var e = c[d].split(" ");
					2 <= e.length && b.push({
						roleId: a,
						roleName: decodeURIComponent(e[1])
					})
				}
			return b
		},
		_TNTGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			var c = RoleSelector._comm.getUserUin(),
				c = a.uin || c,
				b = a._webplat_msg;
			if (!b) return null;
			b = b.split("|");
			if (1 == b.length) return null;
			for (var d = [], e = 1; e < b.length; e++)
				if (b[e]) {
					var g = b[e].split(" ");
					3 <= g.length && d.push({
						roleId: c,
						roleName: decodeURIComponent(g[0]),
						roleLevel: a.level,
						roleSex: g[2]
					})
				}
			return d
		},
		_YLGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result &&
					"[2,Player is not Exist]" == a.error_info) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			RoleSelector._comm.getUserUin();
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_XYGetChractorResult: function(a) {
			a =
				RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_CHGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d =
						a[b].split(" ");
					3 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_9GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_WCBYGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_JGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_XGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_3GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_BOSSGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_TTDGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					3 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_QQTANGGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: d[1]
					})
				}
			return c
		},
		_TGAMEGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_NZGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_GFGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_JHGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_QQHXGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code ||
					-100 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_WINGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d =
						a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_C9GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a =
				a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_YXDGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_YEGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					3 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_SSGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					3 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_FIGHTGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 ==
					1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					3 <= d.length && c.push({
						roleId: decodeURIComponent(d[0]),
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_QQSHGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c =
					[], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: d[1]
					})
				}
			return c
		},
		_007GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: d[1]
					})
				}
			return c
		},
		_WFGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_H2GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_TIANTANGGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 !=
					1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_DZSGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_TIANTANG2GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_XIAGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_NBA2KGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_DJ2GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_S3GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 ==
					1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_MENGGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d =
						a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_X52GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_QQTGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_BNSGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_WOZGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_JJXFGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleJob: d[2],
						roleLevel: d[3]
					})
				}
			return c
		},
		_ZWGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 ==
					1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_FFGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d =
						a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_DHGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_XDGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			RoleSelector._comm.getUserUin();
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					if (2 <= d.length) {
						c.push({
							roleId: d[0],
							roleName: decodeURIComponent(d[1]),
							roleSex: d[2]
						});
						break
					}
				}
			return c
		},
		_BAGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 !=
					1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_QYJGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_ZLGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 ==
					1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_YIGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d =
						a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_IMONSTERGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a.result && 0 != 1 * a.result) {
				if (1 == 1 * a.result) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			RoleSelector._comm.getUserUin();
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					if (2 <= d.length) {
						c.push({
							roleId: d[0],
							roleName: decodeURIComponent(d[1]),
							roleSex: d[2]
						});
						break
					}
				}
			return c
		},
		_BTRGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_SGNGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_TPSGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_9ZGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[3]
					})
				}
			return c
		},
		_KTVGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1]),
						roleSex: d[2]
					})
				}
			return c
		},
		_LSGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 ==
					1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_ZXGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d =
						a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_SMGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_ZYGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_YTGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_7QGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_FSGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_XBGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_MXGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_YZGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_HLZQGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_BLGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_T3GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_FSFGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_CHUANQIGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 !=
					1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_WJGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_FIFAGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_CODOGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_SMITEGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_MCGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: d[1]
					})
				}
			return c
		},
		_6GetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_YSGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_YUGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		},
		_JJGetChractorResult: function(a) {
			a = RoleSelector._getAllOldQuery(a.data);
			if (a._webplat_msg_code) {
				if (1 == 1 * a._webplat_msg_code) throw "\u5728\u8be5\u670d\u52a1\u5668\u4e0a\u672a\u83b7\u53d6\u5230\u89d2\u8272\u4fe1\u606f\uff01";
				if (0 != 1 * a._webplat_msg_code) throw "\u67e5\u8be2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u60a8\u7a0d\u540e\u518d\u6765\uff01";
			}
			if (!RoleSelector._comm.getUserUin()) return null;
			a = a._webplat_msg;
			if (!a) return null;
			a = a.split("|");
			if (1 == a.length) return null;
			for (var c = [], b = 1; b < a.length; b++)
				if (a[b]) {
					var d = a[b].split(" ");
					2 <= d.length && c.push({
						roleId: d[0],
						roleName: decodeURIComponent(d[1])
					})
				}
			return c
		}
	}
})();/*  |xGv00|6b1e0036ff3ff1129b50a43966d932ba */