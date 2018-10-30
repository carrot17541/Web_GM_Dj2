(function() {
    var u = window.jQuery;
    var v = window.$JQ;
    var w = function(a, b) {
        return new w.fn.init(a, b)
    };
    window.jQuery = w;
    window.$JQ = w;
    var x = /^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;
    var y = /^.[^:#\[\.]*$/;
    var A;
    w.fn = w.prototype = {
        init: function(a, b) {
            a = a || document;
            if (a.nodeType) {
                this[0] = a;
                this.length = 1;
                return this
            }
            if (typeof a == "string") {
                var c = x.exec(a);
                if (c && (c[1] || !b)) {
                    if (c[1]) a = w.clean([c[1]], b);
                    else {
                        var d = document.getElementById(c[3]);
                        if (d) {
                            if (d.id != c[3]) return w().find(a);
                            return w(d)
                        }
                        a = []
                    }
                } else {
                    return w(b).find(a)
                }
            } else if (w.isFunction(a)) return w(document)[w.fn.ready ? "ready": "load"](a);
            return this.setArray(w.makeArray(a))
        },
        jquery: "1.2.6",
        size: function() {
            return this.length
        },
        length: 0,
        get: function(a) {
            return a == A ? w.makeArray(this) : this[a]
        },
        pushStack: function(a) {
            var b = w(a);
            b.prevObject = this;
            return b
        },
        setArray: function(a) {
            this.length = 0;
            Array.prototype.push.apply(this, a);
            return this
        },
        each: function(a, b) {
            return w.each(this, a, b)
        },
        index: function(a) {
            var b = -1;
            return w.inArray(a && a.jquery ? a[0] : a, this)
        },
        attr: function(a, b, c) {
            var d = a;
            if (a.constructor == String) if (b === A) return this[0] && w[c || "attr"](this[0], a);
            else {
                d = {};
                d[a] = b
            }
            return this.each(function(i) {
                for (a in d) w.attr(c ? this.style: this, a, w.prop(this, d[a], c, i, a))
            })
        },
        css: function(a, b) {
            if ((a == 'width' || a == 'height') && parseFloat(b) < 0) b = A;
            return this.attr(a, b, "curCSS")
        },
        text: function(a) {
            if (typeof a != "object" && a != null) return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(a));
            var b = "";
            w.each(a || this,
            function() {
                w.each(this.childNodes,
                function() {
                    if (this.nodeType != 8) b += this.nodeType != 1 ? this.nodeValue: w.fn.text([this])
                })
            });
            return b
        },
        wrapAll: function(b) {
            if (this[0]) w(b, this[0].ownerDocument).clone().insertBefore(this[0]).map(function() {
                var a = this;
                while (a.firstChild) a = a.firstChild;
                return a
            }).append(this);
            return this
        },
        wrapInner: function(a) {
            return this.each(function() {
                w(this).contents().wrapAll(a)
            })
        },
        wrap: function(a) {
            return this.each(function() {
                w(this).wrapAll(a)
            })
        },
        append: function() {
            return this.domManip(arguments, true, false,
            function(a) {
                if (this.nodeType == 1) this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, true,
            function(a) {
                if (this.nodeType == 1) this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            return this.domManip(arguments, false, false,
            function(a) {
                this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, false, true,
            function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        end: function() {
            return this.prevObject || w([])
        },
        find: function(b) {
            var c = w.map(this,
            function(a) {
                return w.find(b, a)
            });
            return this.pushStack(/[^+>] [^+>]/.test(b) || b.indexOf("..") > -1 ? w.unique(c) : c)
        },
        clone: function(d) {
            var e = this.map(function() {
                if (w.browser.msie && !w.isXMLDoc(this)) {
                    var a = this.cloneNode(true),
                    container = document.createElement("div");
                    container.appendChild(a);
                    return w.clean([container.innerHTML])[0]
                } else return this.cloneNode(true)
            });
            var f = e.find("*").andSelf().each(function() {
                if (this[B] != A) this[B] = null
            });
            if (d === true) this.find("*").andSelf().each(function(i) {
                if (this.nodeType == 3) return;
                var a = w.data(this, "events");
                for (var b in a) for (var c in a[b]) w.event.add(f[i], b, a[b][c], a[b][c].data)
            });
            return e
        },
        filter: function(b) {
            return this.pushStack(w.isFunction(b) && w.grep(this,
            function(a, i) {
                return b.call(a, i)
            }) || w.multiFilter(b, this))
        },
        not: function(a) {
            if (a.constructor == String) if (y.test(a)) return this.pushStack(w.multiFilter(a, this, true));
            else a = w.multiFilter(a, this);
            var b = a.length && a[a.length - 1] !== A && !a.nodeType;
            return this.filter(function() {
                return b ? w.inArray(this, a) < 0 : this != a
            })
        },
        add: function(a) {
            return this.pushStack(w.unique(w.merge(this.get(), typeof a == 'string' ? w(a) : w.makeArray(a))))
        },
        is: function(a) {
            return !! a && w.multiFilter(a, this).length > 0
        },
        hasClass: function(a) {
            return this.is("." + a)
        },
        val: function(b) {
            if (b == A) {
                if (this.length) {
                    var c = this[0];
                    if (w.nodeName(c, "select")) {
                        var d = c.selectedIndex,
                        values = [],
                        options = c.options,
                        one = c.type == "select-one";
                        if (d < 0) return null;
                        for (var i = one ? d: 0, max = one ? d + 1 : options.length; i < max; i++) {
                            var e = options[i];
                            if (e.selected) {
                                b = w.browser.msie && !e.attributes.value.specified ? e.text: e.value;
                                if (one) return b;
                                values.push(b)
                            }
                        }
                        return values
                    } else return (this[0].value || "").replace(/\r/g, "")
                }
                return A
            }
            if (b.constructor == Number) b += '';
            return this.each(function() {
                if (this.nodeType != 1) return;
                if (b.constructor == Array && /radio|checkbox/.test(this.type)) this.checked = (w.inArray(this.value, b) >= 0 || w.inArray(this.name, b) >= 0);
                else if (w.nodeName(this, "select")) {
                    var a = w.makeArray(b);
                    w("option", this).each(function() {
                        this.selected = (w.inArray(this.value, a) >= 0 || w.inArray(this.text, a) >= 0)
                    });
                    if (!a.length) this.selectedIndex = -1
                } else this.value = b
            })
        },
        html: function(a) {
            return a == A ? (this[0] ? this[0].innerHTML: null) : this.empty().append(a)
        },
        replaceWith: function(a) {
            return this.after(a).remove()
        },
        eq: function(i) {
            return this.slice(i, i + 1)
        },
        slice: function() {
            return this.pushStack(Array.prototype.slice.apply(this, arguments))
        },
        map: function(b) {
            return this.pushStack(w.map(this,
            function(a, i) {
                return b.call(a, i, a)
            }))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        },
        data: function(a, b) {
            var c = a.split(".");
            c[1] = c[1] ? "." + c[1] : "";
            if (b === A) {
                var d = this.triggerHandler("getData" + c[1] + "!", [c[0]]);
                if (d === A && this.length) d = w.data(this[0], a);
                return d === A && c[1] ? this.data(c[0]) : d
            } else return this.trigger("setData" + c[1] + "!", [c[0], b]).each(function() {
                w.data(this, a, b)
            })
        },
        removeData: function(a) {
            return this.each(function() {
                w.removeData(this, a)
            })
        },
        domManip: function(d, e, f, g) {
            var h = this.length > 1,
            elems;
            return this.each(function() {
                if (!elems) {
                    elems = w.clean(d, this.ownerDocument);
                    if (f) elems.reverse()
                }
                var b = this;
                if (e && w.nodeName(this, "table") && w.nodeName(elems[0], "tr")) b = this.getElementsByTagName("tbody")[0] || this.appendChild(this.ownerDocument.createElement("tbody"));
                var c = w([]);
                w.each(elems,
                function() {
                    var a = h ? w(this).clone(true)[0] : this;
                    if (w.nodeName(a, "script")) c = c.add(a);
                    else {
                        if (a.nodeType == 1) c = c.add(w("script", a).remove());
                        g.call(b, a)
                    }
                });
                c.each(evalScript)
            })
        }
    };
    w.fn.init.prototype = w.fn;
    function evalScript(i, a) {
        if (a.src) w.ajax({
            url: a.src,
            async: false,
            dataType: "script"
        });
        else w.globalEval(a.text || a.textContent || a.innerHTML || "");
        if (a.parentNode) a.parentNode.removeChild(a)
    }
    function now() {
        return + new Date
    }
    w.extend = w.fn.extend = function() {
        var a = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false,
        options;
        if (a.constructor == Boolean) {
            deep = a;
            a = arguments[1] || {};
            i = 2
        }
        if (typeof a != "object" && typeof a != "function") a = {};
        if (length == i) {
            a = this; --i
        }
        for (; i < length; i++) if ((options = arguments[i]) != null) for (var b in options) {
            var c = a[b],
            copy = options[b];
            if (a === copy) continue;
            if (deep && copy && typeof copy == "object" && !copy.nodeType) a[b] = w.extend(deep, c || (copy.length != null ? [] : {}), copy);
            else if (copy !== A) a[b] = copy
        }
        return a
    };
    var B = "jQuery" + now(),
    uuid = 0,
    windowData = {};
    var C = /z-?index|font-?weight|opacity|zoom|line-?height/i;
    var D = document.defaultView || {};
    w.extend({
        noConflict: function(a) {
            window.$JQ = v;
            if (a) window.jQuery = u;
            return w
        },
        isFunction: function(a) {
            return !! a && typeof a != "string" && !a.nodeName && a.constructor != Array && /^[\s[]?function/.test(a + "")
        },
        isXMLDoc: function(a) {
            return a.documentElement && !a.body || a.tagName && a.ownerDocument && !a.ownerDocument.body
        },
        globalEval: function(a) {
            a = w.trim(a);
            if (a) {
                var b = document.getElementsByTagName("head")[0] || document.documentElement,
                script = document.createElement("script");
                script.type = "text/javascript";
                if (w.browser.msie) script.text = a;
                else script.appendChild(document.createTextNode(a));
                b.insertBefore(script, b.firstChild);
                b.removeChild(script)
            }
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toUpperCase() == b.toUpperCase()
        },
        cache: {},
        data: function(a, b, c) {
            a = a == window ? windowData: a;
            var d = a[B];
            if (!d) d = a[B] = ++uuid;
            if (b && !w.cache[d]) w.cache[d] = {};
            if (c !== A) w.cache[d][b] = c;
            return b ? w.cache[d][b] : d
        },
        removeData: function(a, b) {
            a = a == window ? windowData: a;
            var c = a[B];
            if (b) {
                if (w.cache[c]) {
                    delete w.cache[c][b];
                    b = "";
                    for (b in w.cache[c]) break;
                    if (!b) w.removeData(a)
                }
            } else {
                try {
                    delete a[B]
                } catch(e) {
                    if (a.removeAttribute) a.removeAttribute(B)
                }
                delete w.cache[c]
            }
        },
        each: function(a, b, c) {
            var d, i = 0,
            length = a.length;
            if (c) {
                if (length == A) {
                    for (d in a) if (b.apply(a[d], c) === false) break
                } else for (; i < length;) if (b.apply(a[i++], c) === false) break
            } else {
                if (length == A) {
                    for (d in a) if (b.call(a[d], d, a[d]) === false) break
                } else for (var e = a[0]; i < length && b.call(e, i, e) !== false; e = a[++i]) {}
            }
            return a
        },
        prop: function(a, b, c, i, d) {
            if (w.isFunction(b)) b = b.call(a, i);
            return b && b.constructor == Number && c == "curCSS" && !C.test(d) ? b + "px": b
        },
        className: {
            add: function(b, c) {
                w.each((c || "").split(/\s+/),
                function(i, a) {
                    if (b.nodeType == 1 && !w.className.has(b.className, a)) b.className += (b.className ? " ": "") + a
                })
            },
            remove: function(b, c) {
                if (b.nodeType == 1) b.className = c != A ? w.grep(b.className.split(/\s+/),
                function(a) {
                    return ! w.className.has(c, a)
                }).join(" ") : ""
            },
            has: function(a, b) {
                return w.inArray(b, (a.className || a).toString().split(/\s+/)) > -1
            }
        },
        swap: function(a, b, c) {
            var d = {};
            for (var e in b) {
                d[e] = a.style[e];
                a.style[e] = b[e]
            }
            c.call(a);
            for (var e in b) a.style[e] = d[e]
        },
        css: function(b, c, d) {
            if (c == "width" || c == "height") {
                var e, props = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                which = c == "width" ? ["Left", "Right"] : ["Top", "Bottom"];
                function getWH() {
                    e = c == "width" ? b.offsetWidth: b.offsetHeight;
                    var a = 0,
                    border = 0;
                    w.each(which,
                    function() {
                        a += parseFloat(w.curCSS(b, "padding" + this, true)) || 0;
                        border += parseFloat(w.curCSS(b, "border" + this + "Width", true)) || 0
                    });
                    e -= Math.round(a + border)
                }
                if (w(b).is(":visible")) getWH();
                else w.swap(b, props, getWH);
                return Math.max(0, e)
            }
            return w.curCSS(b, c, d)
        },
        curCSS: function(c, d, e) {
            var f, style = c.style;
            function color(a) {
                if (!w.browser.safari) return false;
                var b = D.getComputedStyle(a, null);
                return ! b || b.getPropertyValue("color") == ""
            }
            if (d == "opacity" && w.browser.msie) {
                f = w.attr(style, "opacity");
                return f == "" ? "1": f
            }
            if (w.browser.opera && d == "display") {
                var g = style.outline;
                style.outline = "0 solid black";
                style.outline = g
            }
            if (d.match(/float/i)) d = F;
            if (!e && style && style[d]) f = style[d];
            else if (D.getComputedStyle) {
                if (d.match(/float/i)) d = "float";
                d = d.replace(/([A-Z])/g, "-$1").toLowerCase();
                var h = D.getComputedStyle(c, null);
                if (h && !color(c)) f = h.getPropertyValue(d);
                else {
                    var j = [],
                    stack = [],
                    a = c,
                    i = 0;
                    for (; a && color(a); a = a.parentNode) stack.unshift(a);
                    for (; i < stack.length; i++) if (color(stack[i])) {
                        j[i] = stack[i].style.display;
                        stack[i].style.display = "block"
                    }
                    f = d == "display" && j[stack.length - 1] != null ? "none": (h && h.getPropertyValue(d)) || "";
                    for (i = 0; i < j.length; i++) if (j[i] != null) stack[i].style.display = j[i]
                }
                if (d == "opacity" && f == "") f = "1"
            } else if (c.currentStyle) {
                var k = d.replace(/\-(\w)/g,
                function(a, b) {
                    return b.toUpperCase()
                });
                f = c.currentStyle[d] || c.currentStyle[k];
                if (!/^\d+(px)?$/i.test(f) && /^\d/.test(f)) {
                    var l = style.left,
                    rsLeft = c.runtimeStyle.left;
                    c.runtimeStyle.left = c.currentStyle.left;
                    style.left = f || 0;
                    f = style.pixelLeft + "px";
                    style.left = l;
                    c.runtimeStyle.left = rsLeft
                }
            }
            return f
        },
        clean: function(h, k) {
            var l = [];
            k = k || document;
            if (typeof k.createElement == 'undefined') k = k.ownerDocument || k[0] && k[0].ownerDocument || document;
            w.each(h,
            function(i, d) {
                if (!d) return;
                if (d.constructor == Number) d += '';
                if (typeof d == "string") {
                    d = d.replace(/(<(\w+)[^>]*?)\/>/g,
                    function(a, b, c) {
                        return c.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? a: b + "></" + c + ">"
                    });
                    var e = w.trim(d).toLowerCase(),
                    div = k.createElement("div");
                    var f = !e.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !e.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || e.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !e.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!e.indexOf("<td") || !e.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !e.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || w.browser.msie && [1, "div<div>", "</div>"] || [0, "", ""];
                    div.innerHTML = f[1] + d + f[2];
                    while (f[0]--) div = div.lastChild;
                    if (w.browser.msie) {
                        var g = !e.indexOf("<table") && e.indexOf("<tbody") < 0 ? div.firstChild && div.firstChild.childNodes: f[1] == "<table>" && e.indexOf("<tbody") < 0 ? div.childNodes: [];
                        for (var j = g.length - 1; j >= 0; --j) if (w.nodeName(g[j], "tbody") && !g[j].childNodes.length) g[j].parentNode.removeChild(g[j]);
                        if (/^\s/.test(d)) div.insertBefore(k.createTextNode(d.match(/^\s*/)[0]), div.firstChild)
                    }
                    d = w.makeArray(div.childNodes)
                }
                if (d.length === 0 && (!w.nodeName(d, "form") && !w.nodeName(d, "select"))) return;
                if (d[0] == A || w.nodeName(d, "form") || d.options) l.push(d);
                else l = w.merge(l, d)
            });
            return l
        },
        attr: function(c, d, e) {
            if (!c || c.nodeType == 3 || c.nodeType == 8) return A;
            var f = !w.isXMLDoc(c),
            set = e !== A,
            msie = w.browser.msie;
            d = f && w.props[d] || d;
            if (c.tagName) {
                var g = /href|src|style/.test(d);
                if (d == "selected" && w.browser.safari) c.parentNode.selectedIndex;
                if (d in c && f && !g) {
                    if (set) {
                        if (d == "type" && w.nodeName(c, "input") && c.parentNode) throw "type property can't be changed";
                        c[d] = e
                    }
                    if (w.nodeName(c, "form") && c.getAttributeNode(d)) return c.getAttributeNode(d).nodeValue;
                    return c[d]
                }
                if (msie && f && d == "style") return w.attr(c.style, "cssText", e);
                if (set) c.setAttribute(d, "" + e);
                var h = msie && f && g ? c.getAttribute(d, 2) : c.getAttribute(d);
                return h === null ? A: h
            }
            if (msie && d == "opacity") {
                if (set) {
                    c.zoom = 1;
                    c.filter = (c.filter || "").replace(/alpha\([^)]*\)/, "") + (parseInt(e) + '' == "NaN" ? "": "alpha(opacity=" + e * 100 + ")")
                }
                return c.filter && c.filter.indexOf("opacity=") >= 0 ? (parseFloat(c.filter.match(/opacity=([^)]*)/)[1]) / 100) + '': ""
            }
            d = d.replace(/-([a-z])/ig,
            function(a, b) {
                return b.toUpperCase()
            });
            if (set) c[d] = e;
            return c[d]
        },
        trim: function(a) {
            return (a || "").replace(/^\s+|\s+$/g, "")
        },
        makeArray: function(a) {
            var b = [];
            if (a != null) {
                var i = a.length;
                if (i == null || a.split || a.setInterval || a.call) b[0] = a;
                else while (i) b[--i] = a[i]
            }
            return b
        },
        inArray: function(a, b) {
            for (var i = 0,
            length = b.length; i < length; i++) if (b[i] === a) return i;
            return - 1
        },
        merge: function(a, b) {
            var i = 0,
            elem, pos = a.length;
            if (w.browser.msie) {
                while (elem = b[i++]) {
                    if (elem.nodeType != 8) {
                        a[pos++] = elem
                    }
                }
            } else while (elem = b[i++]) a[pos++] = elem;
            return a
        },
        unique: function(a) {
            var b = [],
            done = {};
            try {
                for (var i = 0,
                length = a.length; i < length; i++) {
                    var c = w.data(a[i]);
                    if (!done[c]) {
                        done[c] = true;
                        b.push(a[i])
                    }
                }
            } catch(e) {
                b = a
            }
            return b
        },
        grep: function(a, b, c) {
            var d = [];
            for (var i = 0,
            length = a.length; i < length; i++) if (!c != !b(a[i], i)) d.push(a[i]);
            return d
        },
        map: function(a, b) {
            var c = [];
            for (var i = 0,
            length = a.length; i < length; i++) {
                var d = b(a[i], i);
                if (d != null) c[c.length] = d
            }
            return c.concat.apply([], c)
        }
    });
    var E = navigator.userAgent.toLowerCase();
    w.browser = {
        version: (E.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        safari: /webkit/.test(E),
        opera: /opera/.test(E),
        msie: /msie/.test(E) && !/opera/.test(E),
        mozilla: /mozilla/.test(E) && !/(compatible|webkit)/.test(E)
    };
    var F = w.browser.msie ? "styleFloat": "cssFloat";
    w.extend({
        boxModel: !w.browser.msie || document.compatMode == "CSS1Compat",
        props: {
            "for": "htmlFor",
            "class": "className",
            "float": F,
            cssFloat: F,
            styleFloat: F,
            readonly: "readOnly",
            maxlength: "maxLength",
            cellspacing: "cellSpacing"
        }
    });
    w.each({
        parent: function(a) {
            return a.parentNode
        },
        parents: function(a) {
            return w.dir(a, "parentNode")
        },
        next: function(a) {
            return w.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return w.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return w.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return w.dir(a, "previousSibling")
        },
        siblings: function(a) {
            return w.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return w.sibling(a.firstChild)
        },
        contents: function(a) {
            return w.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document: w.makeArray(a.childNodes)
        }
    },
    function(c, d) {
        w.fn[c] = function(a) {
            var b = w.map(this, d);
            if (a && typeof a == "string") b = w.multiFilter(a, b);
            return this.pushStack(w.unique(b))
        }
    });
    w.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(b, c) {
        w.fn[b] = function() {
            var a = arguments;
            return this.each(function() {
                for (var i = 0,
                length = a.length; i < length; i++) w(a[i])[c](this)
            })
        }
    });
    w.each({
        removeAttr: function(a) {
            w.attr(this, a, "");
            if (this.nodeType == 1) this.removeAttribute(a)
        },
        addClass: function(a) {
            w.className.add(this, a)
        },
        removeClass: function(a) {
            w.className.remove(this, a)
        },
        toggleClass: function(a) {
            w.className[w.className.has(this, a) ? "remove": "add"](this, a)
        },
        remove: function(a) {
            if (!a || w.filter(a, [this]).r.length) {
                w("*", this).add(this).each(function() {
                    w.event.remove(this);
                    w.removeData(this)
                });
                if (this.parentNode) this.parentNode.removeChild(this)
            }
        },
        empty: function() {
            w(">*", this).remove();
            while (this.firstChild) this.removeChild(this.firstChild)
        }
    },
    function(a, b) {
        w.fn[a] = function() {
            return this.each(b, arguments)
        }
    });
    w.each(["Height", "Width"],
    function(i, b) {
        var c = b.toLowerCase();
        w.fn[c] = function(a) {
            return this[0] == window ? w.browser.opera && document.body["client" + b] || w.browser.safari && window["inner" + b] || document.compatMode == "CSS1Compat" && document.documentElement["client" + b] || document.body["client" + b] : this[0] == document ? Math.max(Math.max(document.body["scroll" + b], document.documentElement["scroll" + b]), Math.max(document.body["offset" + b], document.documentElement["offset" + b])) : a == A ? (this.length ? w.css(this[0], c) : null) : this.css(c, a.constructor == String ? a: a + "px")
        }
    });
    function num(a, b) {
        return a[0] && parseInt(w.curCSS(a[0], b, true), 10) || 0
    }
    var G = w.browser.safari && parseInt(w.browser.version) < 417 ? "(?:[\\w*_-]|\\\\.)": "(?:[\\w\u0128-\uFFFF*_-]|\\\\.)";
    var H = new RegExp("^>\\s*(" + G + "+)");
    var I = new RegExp("^(" + G + "+)(#)(" + G + "+)");
    var J = new RegExp("^([#.]?)(" + G + "*)");
    w.extend({
        expr: {
            "": function(a, i, m) {
                return m[2] == "*" || w.nodeName(a, m[2])
            },
            "#": function(a, i, m) {
                return a.getAttribute("id") == m[2]
            },
            ":": {
                lt: function(a, i, m) {
                    return i < m[3] - 0
                },
                gt: function(a, i, m) {
                    return i > m[3] - 0
                },
                nth: function(a, i, m) {
                    return m[3] - 0 == i
                },
                eq: function(a, i, m) {
                    return m[3] - 0 == i
                },
                first: function(a, i) {
                    return i == 0
                },
                last: function(a, i, m, r) {
                    return i == r.length - 1
                },
                even: function(a, i) {
                    return i % 2 == 0
                },
                odd: function(a, i) {
                    return i % 2
                },
                "first-child": function(a) {
                    return a.parentNode.getElementsByTagName("*")[0] == a
                },
                "last-child": function(a) {
                    return w.nth(a.parentNode.lastChild, 1, "previousSibling") == a
                },
                "only-child": function(a) {
                    return ! w.nth(a.parentNode.lastChild, 2, "previousSibling")
                },
                parent: function(a) {
                    return a.firstChild
                },
                empty: function(a) {
                    return ! a.firstChild
                },
                contains: function(a, i, m) {
                    return (a.textContent || a.innerText || w(a).text() || "").indexOf(m[3]) >= 0
                },
                visible: function(a) {
                    return "hidden" != a.type && w.css(a, "display") != "none" && w.css(a, "visibility") != "hidden"
                },
                hidden: function(a) {
                    return "hidden" == a.type || w.css(a, "display") == "none" || w.css(a, "visibility") == "hidden"
                },
                enabled: function(a) {
                    return ! a.disabled
                },
                disabled: function(a) {
                    return a.disabled
                },
                checked: function(a) {
                    return a.checked
                },
                selected: function(a) {
                    return a.selected || w.attr(a, "selected")
                },
                text: function(a) {
                    return "text" == a.type
                },
                radio: function(a) {
                    return "radio" == a.type
                },
                checkbox: function(a) {
                    return "checkbox" == a.type
                },
                file: function(a) {
                    return "file" == a.type
                },
                password: function(a) {
                    return "password" == a.type
                },
                submit: function(a) {
                    return "submit" == a.type
                },
                image: function(a) {
                    return "image" == a.type
                },
                reset: function(a) {
                    return "reset" == a.type
                },
                button: function(a) {
                    return "button" == a.type || w.nodeName(a, "button")
                },
                input: function(a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                },
                has: function(a, i, m) {
                    return w.find(m[3], a).length
                },
                header: function(a) {
                    return /h\d/i.test(a.nodeName)
                },
                animated: function(a) {
                    return w.grep(w.timers,
                    function(b) {
                        return a == b.elem
                    }).length
                }
            }
        },
        parse: [/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/, /^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/, new RegExp("^([:.#]*)(" + G + "+)")],
        multiFilter: function(a, b, c) {
            var d, cur = [];
            while (a && a != d) {
                d = a;
                var f = w.filter(a, b, c);
                a = f.t.replace(/^\s*,\s*/, "");
                cur = c ? b = f.r: w.merge(cur, f.r)
            }
            return cur
        },
        find: function(t, a) {
            if (typeof t != "string") return [t];
            if (a && a.nodeType != 1 && a.nodeType != 9) return [];
            a = a || document;
            var b = [a],
            done = [],
            last,
            nodeName;
            while (t && last != t) {
                var r = [];
                last = t;
                t = w.trim(t);
                var d = false,
                re = H,
                m = re.exec(t);
                if (m) {
                    nodeName = m[1].toUpperCase();
                    for (var i = 0; b[i]; i++) for (var c = b[i].firstChild; c; c = c.nextSibling) if (c.nodeType == 1 && (nodeName == "*" || c.nodeName.toUpperCase() == nodeName)) r.push(c);
                    b = r;
                    t = t.replace(re, "");
                    if (t.indexOf(" ") == 0) continue;
                    d = true
                } else {
                    re = /^([>+~])\s*(\w*)/i;
                    if ((m = re.exec(t)) != null) {
                        r = [];
                        var e = {};
                        nodeName = m[2].toUpperCase();
                        m = m[1];
                        for (var j = 0,
                        rl = b.length; j < rl; j++) {
                            var n = m == "~" || m == "+" ? b[j].nextSibling: b[j].firstChild;
                            for (; n; n = n.nextSibling) if (n.nodeType == 1) {
                                var f = w.data(n);
                                if (m == "~" && e[f]) break;
                                if (!nodeName || n.nodeName.toUpperCase() == nodeName) {
                                    if (m == "~") e[f] = true;
                                    r.push(n)
                                }
                                if (m == "+") break
                            }
                        }
                        b = r;
                        t = w.trim(t.replace(re, ""));
                        d = true
                    }
                }
                if (t && !d) {
                    if (!t.indexOf(",")) {
                        if (a == b[0]) b.shift();
                        done = w.merge(done, b);
                        r = b = [a];
                        t = " " + t.substr(1, t.length)
                    } else {
                        var g = I;
                        var m = g.exec(t);
                        if (m) {
                            m = [0, m[2], m[3], m[1]]
                        } else {
                            g = J;
                            m = g.exec(t)
                        }
                        m[2] = m[2].replace(/\\/g, "");
                        var h = b[b.length - 1];
                        if (m[1] == "#" && h && h.getElementById && !w.isXMLDoc(h)) {
                            var k = h.getElementById(m[2]);
                            if ((w.browser.msie || w.browser.opera) && k && typeof k.id == "string" && k.id != m[2]) k = w('[@id="' + m[2] + '"]', h)[0];
                            b = r = k && (!m[3] || w.nodeName(k, m[3])) ? [k] : []
                        } else {
                            for (var i = 0; b[i]; i++) {
                                var l = m[1] == "#" && m[3] ? m[3] : m[1] != "" || m[0] == "" ? "*": m[2];
                                if (l == "*" && b[i].nodeName.toLowerCase() == "object") l = "param";
                                r = w.merge(r, b[i].getElementsByTagName(l))
                            }
                            if (m[1] == ".") r = w.classFilter(r, m[2]);
                            if (m[1] == "#") {
                                var o = [];
                                for (var i = 0; r[i]; i++) if (r[i].getAttribute("id") == m[2]) {
                                    o = [r[i]];
                                    break
                                }
                                r = o
                            }
                            b = r
                        }
                        t = t.replace(g, "")
                    }
                }
                if (t) {
                    var p = w.filter(t, r);
                    b = r = p.r;
                    t = w.trim(p.t)
                }
            }
            if (t) b = [];
            if (b && a == b[0]) b.shift();
            done = w.merge(done, b);
            return done
        },
        classFilter: function(r, m, a) {
            m = " " + m + " ";
            var b = [];
            for (var i = 0; r[i]; i++) {
                var c = (" " + r[i].className + " ").indexOf(m) >= 0;
                if (!a && c || a && !c) b.push(r[i])
            }
            return b
        },
        filter: function(t, r, b) {
            var d;
            while (t && t != d) {
                d = t;
                var p = w.parse,
                m;
                for (var i = 0; p[i]; i++) {
                    m = p[i].exec(t);
                    if (m) {
                        t = t.substring(m[0].length);
                        m[2] = m[2].replace(/\\/g, "");
                        break
                    }
                }
                if (!m) break;
                if (m[1] == ":" && m[2] == "not") r = y.test(m[3]) ? w.filter(m[3], r, true).r: w(r).not(m[3]);
                else if (m[1] == ".") r = w.classFilter(r, m[2], b);
                else if (m[1] == "[") {
                    var e = [],
                    type = m[3];
                    for (var i = 0,
                    rl = r.length; i < rl; i++) {
                        var a = r[i],
                        z = a[w.props[m[2]] || m[2]];
                        if (z == null || /href|src|selected/.test(m[2])) z = w.attr(a, m[2]) || '';
                        if ((type == "" && !!z || type == "=" && z == m[5] || type == "!=" && z != m[5] || type == "^=" && z && !z.indexOf(m[5]) || type == "$=" && z.substr(z.length - m[5].length) == m[5] || (type == "*=" || type == "~=") && z.indexOf(m[5]) >= 0) ^ b) e.push(a)
                    }
                    r = e
                } else if (m[1] == ":" && m[2] == "nth-child") {
                    var f = {},
                    e = [],
                    test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3] == "even" && "2n" || m[3] == "odd" && "2n+1" || !/\D/.test(m[3]) && "0n+" + m[3] || m[3]),
                    first = (test[1] + (test[2] || 1)) - 0,
                    d = test[3] - 0;
                    for (var i = 0,
                    rl = r.length; i < rl; i++) {
                        var g = r[i],
                        parentNode = g.parentNode,
                        id = w.data(parentNode);
                        if (!f[id]) {
                            var c = 1;
                            for (var n = parentNode.firstChild; n; n = n.nextSibling) if (n.nodeType == 1) n.nodeIndex = c++;
                            f[id] = true
                        }
                        var h = false;
                        if (first == 0) {
                            if (g.nodeIndex == d) h = true
                        } else if ((g.nodeIndex - d) % first == 0 && (g.nodeIndex - d) / first >= 0) h = true;
                        if (h ^ b) e.push(g)
                    }
                    r = e
                } else {
                    var j = w.expr[m[1]];
                    if (typeof j == "object") j = j[m[2]];
                    if (typeof j == "string") j = eval("false||function(a,i){return " + j + ";}");
                    r = w.grep(r,
                    function(a, i) {
                        return j(a, i, m, r)
                    },
                    b)
                }
            }
            return {
                r: r,
                t: t
            }
        },
        dir: function(a, b) {
            var c = [],
            cur = a[b];
            while (cur && cur != document) {
                if (cur.nodeType == 1) c.push(cur);
                cur = cur[b]
            }
            return c
        },
        nth: function(a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c]) if (a.nodeType == 1 && ++e == b) break;
            return a
        },
        sibling: function(n, a) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType == 1 && n != a) r.push(n)
            }
            return r
        }
    });
    w.event = {
        add: function(e, f, g, h) {
            if (e.nodeType == 3 || e.nodeType == 8) return;
            if (w.browser.msie && e.setInterval) e = window;
            if (!g.guid) g.guid = this.guid++;
            if (h != A) {
                var i = g;
                g = this.proxy(i,
                function() {
                    return i.apply(this, arguments)
                });
                g.data = h
            }
            var j = w.data(e, "events") || w.data(e, "events", {}),
            handle = w.data(e, "handle") || w.data(e, "handle",
            function() {
                if (typeof w != "undefined" && !w.event.triggered) return w.event.handle.apply(arguments.callee.elem, arguments)
            });
            handle.elem = e;
            w.each(f.split(/\s+/),
            function(a, b) {
                var c = b.split(".");
                b = c[0];
                g.type = c[1];
                var d = j[b];
                if (!d) {
                    d = j[b] = {};
                    if (!w.event.special[b] || w.event.special[b].setup.call(e) === false) {
                        if (e.addEventListener) e.addEventListener(b, handle, false);
                        else if (e.attachEvent) e.attachEvent("on" + b, handle)
                    }
                }
                d[g.guid] = g;
                w.event.global[b] = true
            });
            e = null
        },
        guid: 1,
        global: {},
        remove: function(d, f, g) {
            if (d.nodeType == 3 || d.nodeType == 8) return;
            var h = w.data(d, "events"),
            ret,
            index;
            if (h) {
                if (f == A || (typeof f == "string" && f.charAt(0) == ".")) for (var i in h) this.remove(d, i + (f || ""));
                else {
                    if (f.type) {
                        g = f.handler;
                        f = f.type
                    }
                    w.each(f.split(/\s+/),
                    function(a, b) {
                        var c = b.split(".");
                        b = c[0];
                        if (h[b]) {
                            if (g) delete h[b][g.guid];
                            else for (g in h[b]) if (!c[1] || h[b][g].type == c[1]) delete h[b][g];
                            for (ret in h[b]) break;
                            if (!ret) {
                                try {
                                    if (!w.event.special[b] || w.event.special[b].teardown.call(d) === false) {
                                        if (d.removeEventListener) d.removeEventListener(b, w.data(d, "handle"), false);
                                        else if (d.detachEvent) d.detachEvent("on" + b, w.data(d, "handle"))
                                    }
                                } catch(e) {}
                                ret = null;
                                delete h[b]
                            }
                        }
                    })
                }
                for (ret in h) break;
                if (!ret) {
                    var j = w.data(d, "handle");
                    if (j) j.elem = null;
                    w.removeData(d, "events");
                    w.removeData(d, "handle")
                }
            }
        },
        trigger: function(a, b, c, d, f) {
            b = w.makeArray(b);
            if (a.indexOf("!") >= 0) {
                a = a.slice(0, -1);
                var g = true
            }
            if (!c) {
                if (this.global[a]) w("*").add([window, document]).trigger(a, b)
            } else {
                if (c.nodeType == 3 || c.nodeType == 8) return A;
                var h, ret, fn = w.isFunction(c[a] || null),
                event = !b[0] || !b[0].preventDefault;
                if (event) {
                    b.unshift({
                        type: a,
                        target: c,
                        preventDefault: function() {},
                        stopPropagation: function() {},
                        timeStamp: now()
                    });
                    b[0][B] = true
                }
                b[0].type = a;
                if (g) b[0].exclusive = true;
                var i = w.data(c, "handle");
                if (i) h = i.apply(c, b);
                if ((!fn || (w.nodeName(c, 'a') && a == "click")) && c["on" + a] && c["on" + a].apply(c, b) === false) h = false;
                if (event) b.shift();
                if (f && w.isFunction(f)) {
                    ret = f.apply(c, h == null ? b: b.concat(h));
                    if (ret !== A) h = ret
                }
                if (fn && d !== false && h !== false && !(w.nodeName(c, 'a') && a == "click")) {
                    this.triggered = true;
                    try {
                        c[a]()
                    } catch(e) {}
                }
                this.triggered = false
            }
            return h
        },
        handle: function(a) {
            var b, ret, namespace, all, handlers;
            a = arguments[0] = w.event.fix(a || window.event);
            namespace = a.type.split(".");
            a.type = namespace[0];
            namespace = namespace[1];
            all = !namespace && !a.exclusive;
            handlers = (w.data(this, "events") || {})[a.type];
            for (var j in handlers) {
                var c = handlers[j];
                if (all || c.type == namespace) {
                    a.handler = c;
                    a.data = c.data;
                    ret = c.apply(this, arguments);
                    if (b !== false) b = ret;
                    if (ret === false) {
                        a.preventDefault();
                        a.stopPropagation()
                    }
                }
            }
            return b
        },
        fix: function(a) {
            if (a[B] == true) return a;
            var b = a;
            a = {
                originalEvent: b
            };
            var c = "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");
            for (var i = c.length; i; i--) a[c[i]] = b[c[i]];
            a[B] = true;
            a.preventDefault = function() {
                if (b.preventDefault) b.preventDefault();
                b.returnValue = false
            };
            a.stopPropagation = function() {
                if (b.stopPropagation) b.stopPropagation();
                b.cancelBubble = true
            };
            a.timeStamp = a.timeStamp || now();
            if (!a.target) a.target = a.srcElement || document;
            if (a.target.nodeType == 3) a.target = a.target.parentNode;
            if (!a.relatedTarget && a.fromElement) a.relatedTarget = a.fromElement == a.target ? a.toElement: a.fromElement;
            if (a.pageX == null && a.clientX != null) {
                var d = document.documentElement,
                body = document.body;
                a.pageX = a.clientX + (d && d.scrollLeft || body && body.scrollLeft || 0) - (d.clientLeft || 0);
                a.pageY = a.clientY + (d && d.scrollTop || body && body.scrollTop || 0) - (d.clientTop || 0)
            }
            if (!a.which && ((a.charCode || a.charCode === 0) ? a.charCode: a.keyCode)) a.which = a.charCode || a.keyCode;
            if (!a.metaKey && a.ctrlKey) a.metaKey = a.ctrlKey;
            if (!a.which && a.button) a.which = (a.button & 1 ? 1 : (a.button & 2 ? 3 : (a.button & 4 ? 2 : 0)));
            return a
        },
        proxy: function(a, b) {
            b.guid = a.guid = a.guid || b.guid || this.guid++;
            return b
        },
        special: {
            ready: {
                setup: function() {
                    bindReady();
                    return
                },
                teardown: function() {
                    return
                }
            },
            mouseenter: {
                setup: function() {
                    if (w.browser.msie) return false;
                    w(this).bind("mouseover", w.event.special.mouseenter.handler);
                    return true
                },
                teardown: function() {
                    if (w.browser.msie) return false;
                    w(this).unbind("mouseover", w.event.special.mouseenter.handler);
                    return true
                },
                handler: function(a) {
                    if (L(a, this)) return true;
                    a.type = "mouseenter";
                    return w.event.handle.apply(this, arguments)
                }
            },
            mouseleave: {
                setup: function() {
                    if (w.browser.msie) return false;
                    w(this).bind("mouseout", w.event.special.mouseleave.handler);
                    return true
                },
                teardown: function() {
                    if (w.browser.msie) return false;
                    w(this).unbind("mouseout", w.event.special.mouseleave.handler);
                    return true
                },
                handler: function(a) {
                    if (L(a, this)) return true;
                    a.type = "mouseleave";
                    return w.event.handle.apply(this, arguments)
                }
            }
        }
    };
    w.fn.extend({
        bind: function(a, b, c) {
            return a == "unload" ? this.one(a, b, c) : this.each(function() {
                w.event.add(this, a, c || b, c && b)
            })
        },
        one: function(b, c, d) {
            var e = w.event.proxy(d || c,
            function(a) {
                w(this).unbind(a, e);
                return (d || c).apply(this, arguments)
            });
            return this.each(function() {
                w.event.add(this, b, e, d && c)
            })
        },
        unbind: function(a, b) {
            return this.each(function() {
                w.event.remove(this, a, b)
            })
        },
        trigger: function(a, b, c) {
            return this.each(function() {
                w.event.trigger(a, b, this, true, c)
            })
        },
        triggerHandler: function(a, b, c) {
            return this[0] && w.event.trigger(a, b, this[0], false, c)
        },
        toggle: function(b) {
            var c = arguments,
            i = 1;
            while (i < c.length) w.event.proxy(b, c[i++]);
            return this.click(w.event.proxy(b,
            function(a) {
                this.lastToggle = (this.lastToggle || 0) % i;
                a.preventDefault();
                return c[this.lastToggle++].apply(this, arguments) || false
            }))
        },
        hover: function(a, b) {
            return this.bind('mouseenter', a).bind('mouseleave', b)
        },
        ready: function(a) {
            bindReady();
            if (w.isReady) a.call(document, w);
            else w.readyList.push(function() {
                return a.call(this, w)
            });
            return this
        }
    });
    w.extend({
        isReady: false,
        readyList: [],
        ready: function() {
            if (!w.isReady) {
                w.isReady = true;
                if (w.readyList) {
                    w.each(w.readyList,
                    function() {
                        this.call(document)
                    });
                    w.readyList = null
                }
                w(document).triggerHandler("ready")
            }
        }
    });
    var K = false;
    function bindReady() {
        if (K) return;
        K = true;
        if (document.addEventListener && !w.browser.opera) document.addEventListener("DOMContentLoaded", w.ready, false);
        if (w.browser.msie && window == top)(function() {
            if (w.isReady) return;
            try {
                document.documentElement.doScroll("left")
            } catch(error) {
                setTimeout(arguments.callee, 0);
                return
            }
            w.ready()
        })();
        if (w.browser.opera) document.addEventListener("DOMContentLoaded",
        function() {
            if (w.isReady) return;
            for (var i = 0; i < document.styleSheets.length; i++) if (document.styleSheets[i].disabled) {
                setTimeout(arguments.callee, 0);
                return
            }
            w.ready()
        },
        false);
        if (w.browser.safari) {
            var a; (function() {
                if (w.isReady) return;
                if (document.readyState != "loaded" && document.readyState != "complete") {
                    setTimeout(arguments.callee, 0);
                    return
                }
                if (a === A) a = w("style, link[rel=stylesheet]").length;
                if (document.styleSheets.length != a) {
                    setTimeout(arguments.callee, 0);
                    return
                }
                w.ready()
            })()
        }
        w.event.add(window, "load", w.ready)
    }
    w.each(("blur,focus,load,resize,scroll,unload,click,dblclick," + "mousedown,mouseup,mousemove,mouseover,mouseout,change,select," + "submit,keydown,keypress,keyup,error").split(","),
    function(i, b) {
        w.fn[b] = function(a) {
            return a ? this.bind(b, a) : this.trigger(b)
        }
    });
    var L = function(a, b) {
        var c = a.relatedTarget;
        while (c && c != b) try {
            c = c.parentNode
        } catch(error) {
            c = b
        }
        return c == b
    };
    w(window).bind("unload",
    function() {
        w("*").add(document).unbind()
    });
    w.fn.extend({
        _load: w.fn.load,
        load: function(c, d, e) {
            if (typeof c != 'string') return this._load(c);
            var f = c.indexOf(" ");
            if (f >= 0) {
                var g = c.slice(f, c.length);
                c = c.slice(0, f)
            }
            e = e ||
            function() {};
            var h = "GET";
            if (d) if (w.isFunction(d)) {
                e = d;
                d = null
            } else {
                d = w.param(d);
                h = "POST"
            }
            var i = this;
            w.ajax({
                url: c,
                type: h,
                dataType: "html",
                data: d,
                complete: function(a, b) {
                    if (b == "success" || b == "notmodified") i.html(g ? w("<div/>").append(a.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(g) : a.responseText);
                    i.each(e, [a.responseText, b, a])
                }
            });
            return this
        },
        serialize: function() {
            return w.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return w.nodeName(this, "form") ? w.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))
            }).map(function(i, b) {
                var c = w(this).val();
                return c == null ? null: c.constructor == Array ? w.map(c,
                function(a, i) {
                    return {
                        name: b.name,
                        value: a
                    }
                }) : {
                    name: b.name,
                    value: c
                }
            }).get()
        }
    });
    w.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),
    function(i, o) {
        w.fn[o] = function(f) {
            return this.bind(o, f)
        }
    });
    var M = now();
    w.extend({
        get: function(a, b, c, d) {
            if (w.isFunction(b)) {
                c = b;
                b = null
            }
            return w.ajax({
                type: "GET",
                url: a,
                data: b,
                success: c,
                dataType: d
            })
        },
        getScript: function(a, b) {
            return w.get(a, null, b, "script")
        },
        getJSON: function(a, b, c) {
            return w.get(a, b, c, "json")
        },
        post: function(a, b, c, d) {
            if (w.isFunction(b)) {
                c = b;
                b = {}
            }
            return w.ajax({
                type: "POST",
                url: a,
                data: b,
                success: c,
                dataType: d
            })
        },
        ajaxSetup: function(a) {
            w.extend(w.ajaxSettings, a)
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            timeout: 0,
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            data: null,
            username: null,
            password: null,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        ajax: function(s) {
            s = w.extend(true, s, w.extend(true, {},
            w.ajaxSettings, s));
            var c, jsre = /=\?(&|$)/g,
            status, data, type = s.type.toUpperCase();
            if (s.data && s.processData && typeof s.data != "string") s.data = w.param(s.data);
            if (s.dataType == "jsonp") {
                if (type == "GET") {
                    if (!s.url.match(jsre)) s.url += (s.url.match(/\?/) ? "&": "?") + (s.jsonp || "callback") + "=?"
                } else if (!s.data || !s.data.match(jsre)) s.data = (s.data ? s.data + "&": "") + (s.jsonp || "callback") + "=?";
                s.dataType = "json"
            }
            if (s.dataType == "json" && (s.data && s.data.match(jsre) || s.url.match(jsre))) {
                c = "jsonp" + M++;
                if (s.data) s.data = (s.data + "").replace(jsre, "=" + c + "$1");
                s.url = s.url.replace(jsre, "=" + c + "$1");
                s.dataType = "script";
                window[c] = function(a) {
                    data = a;
                    success();
                    complete();
                    window[c] = A;
                    try {
                        delete window[c]
                    } catch(e) {}
                    if (h) h.removeChild(i)
                }
            }
            if (s.dataType == "script" && s.cache == null) s.cache = false;
            if (s.cache === false && type == "GET") {
                var d = now();
                var f = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + d + "$2");
                s.url = f + ((f == s.url) ? (s.url.match(/\?/) ? "&": "?") + "_=" + d: "")
            }
            if (s.data && type == "GET") {
                s.url += (s.url.match(/\?/) ? "&": "?") + s.data;
                s.data = null
            }
            if (s.global && !w.active++) w.event.trigger("ajaxStart");
            var g = /^(?:\w+:)?\/\/([^\/?#]+)/;
            if (s.dataType == "script" && type == "GET" && g.test(s.url) && g.exec(s.url)[1] != location.host) {
                var h = document.getElementsByTagName("head")[0];
                var i = document.createElement("script");
                i.src = s.url;
                if (s.scriptCharset) i.charset = s.scriptCharset;
                if (!c) {
                    var j = false;
                    i.onload = i.onreadystatechange = function() {
                        if (!j && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            j = true;
                            success();
                            complete();
                            h.removeChild(i)
                        }
                    }
                }
                h.appendChild(i);
                return A
            }
            var k = false;
            var l = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            if (s.username) l.open(type, s.url, s.async, s.username, s.password);
            else l.open(type, s.url, s.async);
            try {
                if (s.data) l.setRequestHeader("Content-Type", s.contentType);
                if (s.ifModified) l.setRequestHeader("If-Modified-Since", w.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT");
                l.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                l.setRequestHeader("Accept", s.dataType && s.accepts[s.dataType] ? s.accepts[s.dataType] + ", */*": s.accepts._default)
            } catch(e) {}
            if (s.beforeSend && s.beforeSend(l, s) === false) {
                s.global && w.active--;
                l.abort();
                return false
            }
            if (s.global) w.event.trigger("ajaxSend", [l, s]);
            var m = function(a) {
                if (!k && l && (l.readyState == 4 || a == "timeout")) {
                    k = true;
                    if (n) {
                        clearInterval(n);
                        n = null
                    }
                    status = a == "timeout" && "timeout" || !w.httpSuccess(l) && "error" || s.ifModified && w.httpNotModified(l, s.url) && "notmodified" || "success";
                    if (status == "success") {
                        try {
                            data = w.httpData(l, s.dataType, s.dataFilter)
                        } catch(e) {
                            status = "parsererror"
                        }
                    }
                    if (status == "success") {
                        var b;
                        try {
                            b = l.getResponseHeader("Last-Modified")
                        } catch(e) {}
                        if (s.ifModified && b) w.lastModified[s.url] = b;
                        if (!c) success()
                    } else w.handleError(s, l, status);
                    complete();
                    if (s.async) l = null
                }
            };
            if (s.async) {
                var n = setInterval(m, 13);
                if (s.timeout > 0) setTimeout(function() {
                    if (l) {
                        l.abort();
                        if (!k) m("timeout")
                    }
                },
                s.timeout)
            }
            try {
                l.send(s.data)
            } catch(e) {
                w.handleError(s, l, null, e)
            }
            if (!s.async) m();
            function success() {
                if (s.success) s.success(data, status);
                if (s.global) w.event.trigger("ajaxSuccess", [l, s])
            }
            function complete() {
                if (s.complete) s.complete(l, status);
                if (s.global) w.event.trigger("ajaxComplete", [l, s]);
                if (s.global && !--w.active) w.event.trigger("ajaxStop")
            }
            return l
        },
        handleError: function(s, a, b, e) {
            if (s.error) s.error(a, b, e);
            if (s.global) w.event.trigger("ajaxError", [a, s, e])
        },
        active: 0,
        httpSuccess: function(a) {
            try {
                return ! a.status && location.protocol == "file:" || (a.status >= 200 && a.status < 300) || a.status == 304 || a.status == 1223 || w.browser.safari && a.status == A
            } catch(e) {}
            return false
        },
        httpNotModified: function(a, b) {
            try {
                var c = a.getResponseHeader("Last-Modified");
                return a.status == 304 || c == w.lastModified[b] || w.browser.safari && a.status == A
            } catch(e) {}
            return false
        },
        httpData: function(a, b, c) {
            var d = a.getResponseHeader("content-type"),
            xml = b == "xml" || !b && d && d.indexOf("xml") >= 0,
            data = xml ? a.responseXML: a.responseText;
            if (xml && data.documentElement.tagName == "parsererror") throw "parsererror";
            if (c) data = c(data, b);
            if (b == "script") w.globalEval(data);
            if (b == "json") data = eval("(" + data + ")");
            return data
        },
        param: function(a) {
            var s = [];
            if (a.constructor == Array || a.jquery) w.each(a,
            function() {
                s.push(encodeURIComponent(this.name) + "=" + encodeURIComponent(this.value))
            });
            else for (var j in a) if (a[j] && a[j].constructor == Array) w.each(a[j],
            function() {
                s.push(encodeURIComponent(j) + "=" + encodeURIComponent(this))
            });
            else s.push(encodeURIComponent(j) + "=" + encodeURIComponent(w.isFunction(a[j]) ? a[j]() : a[j]));
            return s.join("&").replace(/%20/g, "+")
        }
    });
    w.fn.extend({
        show: function(b, c) {
            return b ? this.animate({
                height: "show",
                width: "show",
                opacity: "show"
            },
            b, c) : this.filter(":hidden").each(function() {
                this.style.display = this.oldblock || "";
                if (w.css(this, "display") == "none") {
                    var a = w("<" + this.tagName + " />").appendTo("body");
                    this.style.display = a.css("display");
                    if (this.style.display == "none") this.style.display = "block";
                    a.remove()
                }
            }).end()
        },
        hide: function(a, b) {
            return a ? this.animate({
                height: "hide",
                width: "hide",
                opacity: "hide"
            },
            a, b) : this.filter(":visible").each(function() {
                this.oldblock = this.oldblock || w.css(this, "display");
                this.style.display = "none"
            }).end()
        },
        _toggle: w.fn.toggle,
        toggle: function(a, b) {
            return w.isFunction(a) && w.isFunction(b) ? this._toggle.apply(this, arguments) : a ? this.animate({
                height: "toggle",
                width: "toggle",
                opacity: "toggle"
            },
            a, b) : this.each(function() {
                w(this)[w(this).is(":hidden") ? "show": "hide"]()
            })
        },
        slideDown: function(a, b) {
            return this.animate({
                height: "show"
            },
            a, b)
        },
        slideUp: function(a, b) {
            return this.animate({
                height: "hide"
            },
            a, b)
        },
        slideToggle: function(a, b) {
            return this.animate({
                height: "toggle"
            },
            a, b)
        },
        fadeIn: function(a, b) {
            return this.animate({
                opacity: "show"
            },
            a, b)
        },
        fadeOut: function(a, b) {
            return this.animate({
                opacity: "hide"
            },
            a, b)
        },
        fadeTo: function(a, b, c) {
            return this.animate({
                opacity: b
            },
            a, c)
        },
        animate: function(g, h, i, j) {
            var k = w.speed(h, i, j);
            return this[k.queue === false ? "each": "queue"](function() {
                if (this.nodeType != 1) return false;
                var f = w.extend({},
                k),
                p,
                hidden = w(this).is(":hidden"),
                self = this;
                for (p in g) {
                    if (g[p] == "hide" && hidden || g[p] == "show" && !hidden) return f.complete.call(this);
                    if (p == "height" || p == "width") {
                        f.display = w.css(this, "display");
                        f.overflow = this.style.overflow
                    }
                }
                if (f.overflow != null) this.style.overflow = "hidden";
                f.curAnim = w.extend({},
                g);
                w.each(g,
                function(a, b) {
                    var e = new w.fx(self, f, a);
                    if (/toggle|show|hide/.test(b)) e[b == "toggle" ? hidden ? "show": "hide": b](g);
                    else {
                        var c = b.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
                        start = e.cur(true) || 0;
                        if (c) {
                            var d = parseFloat(c[2]),
                            unit = c[3] || "px";
                            if (unit != "px") {
                                self.style[a] = (d || 1) + unit;
                                start = ((d || 1) / e.cur(true)) * start;
                                self.style[a] = start + unit
                            }
                            if (c[1]) d = ((c[1] == "-=" ? -1 : 1) * d) + start;
                            e.custom(start, d, unit)
                        } else e.custom(start, b, "")
                    }
                });
                return true
            })
        },
        queue: function(a, b) {
            if (w.isFunction(a) || (a && a.constructor == Array)) {
                b = a;
                a = "fx"
            }
            if (!a || (typeof a == "string" && !b)) return N(this[0], a);
            return this.each(function() {
                if (b.constructor == Array) N(this, a, b);
                else {
                    N(this, a).push(b);
                    if (N(this, a).length == 1) b.call(this)
                }
            })
        },
        stop: function(a, b) {
            var c = w.timers;
            if (a) this.queue([]);
            this.each(function() {
                for (var i = c.length - 1; i >= 0; i--) if (c[i].elem == this) {
                    if (b) c[i](true);
                    c.splice(i, 1)
                }
            });
            if (!b) this.dequeue();
            return this
        }
    });
    var N = function(a, b, c) {
        if (a) {
            b = b || "fx";
            var q = w.data(a, b + "queue");
            if (!q || c) q = w.data(a, b + "queue", w.makeArray(c))
        }
        return q
    };
    w.fn.dequeue = function(a) {
        a = a || "fx";
        return this.each(function() {
            var q = N(this, a);
            q.shift();
            if (q.length) q[0].call(this)
        })
    };
    w.extend({
        speed: function(a, b, c) {
            var d = a && a.constructor == Object ? a: {
                complete: c || !c && b || w.isFunction(a) && a,
                duration: a,
                easing: c && b || b && b.constructor != Function && b
            };
            d.duration = (d.duration && d.duration.constructor == Number ? d.duration: w.fx.speeds[d.duration]) || w.fx.speeds.def;
            d.old = d.complete;
            d.complete = function() {
                if (d.queue !== false) w(this).dequeue();
                if (w.isFunction(d.old)) d.old.call(this)
            };
            return d
        },
        easing: {
            linear: function(p, n, a, b) {
                return a + b * p
            },
            swing: function(p, n, a, b) {
                return (( - Math.cos(p * Math.PI) / 2) + 0.5) * b + a
            }
        },
        timers: [],
        timerId: null,
        fx: function(a, b, c) {
            this.options = b;
            this.elem = a;
            this.prop = c;
            if (!b.orig) b.orig = {}
        }
    });
    w.fx.prototype = {
        update: function() {
            if (this.options.step) this.options.step.call(this.elem, this.now, this); (w.fx.step[this.prop] || w.fx.step._default)(this);
            if (this.prop == "height" || this.prop == "width") this.elem.style.display = "block"
        },
        cur: function(a) {
            if (this.elem[this.prop] != null && this.elem.style[this.prop] == null) return this.elem[this.prop];
            var r = parseFloat(w.css(this.elem, this.prop, a));
            return r && r > -10000 ? r: parseFloat(w.curCSS(this.elem, this.prop)) || 0
        },
        custom: function(b, c, d) {
            this.startTime = now();
            this.start = b;
            this.end = c;
            this.unit = d || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            this.update();
            var e = this;
            function t(a) {
                return e.step(a)
            }
            t.elem = this.elem;
            w.timers.push(t);
            if (w.timerId == null) {
                w.timerId = setInterval(function() {
                    var a = w.timers;
                    for (var i = 0; i < a.length; i++) if (!a[i]()) a.splice(i--, 1);
                    if (!a.length) {
                        clearInterval(w.timerId);
                        w.timerId = null
                    }
                },
                13)
            }
        },
        show: function() {
            this.options.orig[this.prop] = w.attr(this.elem.style, this.prop);
            this.options.show = true;
            this.custom(0, this.cur());
            if (this.prop == "width" || this.prop == "height") this.elem.style[this.prop] = "1px";
            w(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = w.attr(this.elem.style, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(a) {
            var t = now();
            if (a || t > this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                var b = true;
                for (var i in this.options.curAnim) if (this.options.curAnim[i] !== true) b = false;
                if (b) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        this.elem.style.display = this.options.display;
                        if (w.css(this.elem, "display") == "none") this.elem.style.display = "block"
                    }
                    if (this.options.hide) this.elem.style.display = "none";
                    if (this.options.hide || this.options.show) for (var p in this.options.curAnim) w.attr(this.elem.style, p, this.options.orig[p])
                }
                if (b) this.options.complete.call(this.elem);
                return false
            } else {
                var n = t - this.startTime;
                this.state = n / this.options.duration;
                this.pos = w.easing[this.options.easing || (w.easing.swing ? "swing": "linear")](this.state, n, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update()
            }
            return true
        }
    };
    w.extend(w.fx, {
        speeds: {
            slow: 600,
            fast: 200,
            def: 400
        },
        step: {
            scrollLeft: function(a) {
                a.elem.scrollLeft = a.now
            },
            scrollTop: function(a) {
                a.elem.scrollTop = a.now
            },
            opacity: function(a) {
                w.attr(a.elem.style, "opacity", a.now)
            },
            _default: function(a) {
                a.elem.style[a.prop] = a.now + a.unit
            }
        }
    });
    w.fn.offset = function() {
        var b = 0,
        top = 0,
        elem = this[0],
        results;
        if (elem) with(w.browser) {
            var c = elem.parentNode,
            offsetChild = elem,
            offsetParent = elem.offsetParent,
            doc = elem.ownerDocument,
            safari2 = safari && parseInt(version) < 522 && !/adobeair/i.test(E),
            css = w.curCSS,
            fixed = css(elem, "position") == "fixed";
            if (elem.getBoundingClientRect) {
                var d = elem.getBoundingClientRect();
                add(d.left + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft), d.top + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop));
                add( - doc.documentElement.clientLeft, -doc.documentElement.clientTop)
            } else {
                add(elem.offsetLeft, elem.offsetTop);
                while (offsetParent) {
                    add(offsetParent.offsetLeft, offsetParent.offsetTop);
                    if (mozilla && !/^t(able|d|h)$/i.test(offsetParent.tagName) || safari && !safari2) border(offsetParent);
                    if (!fixed && css(offsetParent, "position") == "fixed") fixed = true;
                    offsetChild = /^body$/i.test(offsetParent.tagName) ? offsetChild: offsetParent;
                    offsetParent = offsetParent.offsetParent
                }
                while (c && c.tagName && !/^body|html$/i.test(c.tagName)) {
                    if (!/^inline|table.*$/i.test(css(c, "display"))) add( - c.scrollLeft, -c.scrollTop);
                    if (mozilla && css(c, "overflow") != "visible") border(c);
                    c = c.parentNode
                }
                if ((safari2 && (fixed || css(offsetChild, "position") == "absolute")) || (mozilla && css(offsetChild, "position") != "absolute")) add( - doc.body.offsetLeft, -doc.body.offsetTop);
                if (fixed) add(Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft), Math.max(doc.documentElement.scrollTop, doc.body.scrollTop))
            }
            results = {
                top: top,
                left: b
            }
        }
        function border(a) {
            add(w.curCSS(a, "borderLeftWidth", true), w.curCSS(a, "borderTopWidth", true))
        }
        function add(l, t) {
            b += parseInt(l, 10) || 0;
            top += parseInt(t, 10) || 0
        }
        return results
    };
    w.fn.extend({
        position: function() {
            var a = 0,
            top = 0,
            results;
            if (this[0]) {
                var b = this.offsetParent(),
                offset = this.offset(),
                parentOffset = /^body|html$/i.test(b[0].tagName) ? {
                    top: 0,
                    left: 0
                }: b.offset();
                offset.top -= num(this, 'marginTop');
                offset.left -= num(this, 'marginLeft');
                parentOffset.top += num(b, 'borderTopWidth');
                parentOffset.left += num(b, 'borderLeftWidth');
                results = {
                    top: offset.top - parentOffset.top,
                    left: offset.left - parentOffset.left
                }
            }
            return results
        },
        offsetParent: function() {
            var a = this[0].offsetParent;
            while (a && (!/^body|html$/i.test(a.tagName) && w.css(a, 'position') == 'static')) a = a.offsetParent;
            return w(a)
        }
    });
    w.each(['Left', 'Top'],
    function(i, b) {
        var c = 'scroll' + b;
        w.fn[c] = function(a) {
            if (!this[0]) return;
            return a != A ? this.each(function() {
                this == window || this == document ? window.scrollTo(!i ? a: w(window).scrollLeft(), i ? a: w(window).scrollTop()) : this[c] = a
            }) : this[0] == window || this[0] == document ? self[i ? 'pageYOffset': 'pageXOffset'] || w.boxModel && document.documentElement[c] || document.body[c] : this[0][c]
        }
    });
    w.each(["Height", "Width"],
    function(i, b) {
        var c = i ? "Left": "Top",
        br = i ? "Right": "Bottom";
        w.fn["inner" + b] = function() {
            return this[b.toLowerCase()]() + num(this, "padding" + c) + num(this, "padding" + br)
        };
        w.fn["outer" + b] = function(a) {
            return this["inner" + b]() + num(this, "border" + c + "Width") + num(this, "border" + br + "Width") + (a ? num(this, "margin" + c) + num(this, "margin" + br) : 0)
        }
    });
    window.$$ = window.$JQ
})();
var TemplateManager = {}; (function() {
    if (TemplateManager == null) {
        TemplateManager = new Object()
    }
    if (TemplateManager.evalEx == null) {
        TemplateManager.evalEx = function(a) {
            return eval(a)
        }
    }
    var r;
    if (Array.prototype.pop == null) {
        Array.prototype.pop = function() {
            if (this.length === 0) {
                return r
            }
            return this[--this.length]
        }
    }
    if (Array.prototype.push == null) {
        Array.prototype.push = function() {
            for (var i = 0; i < arguments.length; ++i) {
                this[this.length] = arguments[i]
            }
            return this.length
        }
    }
    TemplateManager.parseTemplate = function(a, b, c) {
        if (c == null) {
            c = TemplateManager.parseTemplate_etc
        }
        var d = t(a, b, c);
        var e = TemplateManager.evalEx(d, b, 1);
        if (e != null) {
            return new c.Template(b, a, d, e, c)
        }
        return null
    };
    try {
        String.prototype.process = function(a, b) {
            var c = TemplateManager.parseTemplate(this, null);
            if (c != null) {
                return c.process(a, b)
            }
            return this
        }
    } catch(e) {}
    TemplateManager.parseTemplate_etc = {};
    TemplateManager.parseTemplate_etc.statementTag = "forelse|for|if|elseif|else|var|macro";
    TemplateManager.parseTemplate_etc.statementDef = {
        "if": {
            delta: 1,
            prefix: "if (",
            suffix: ") {",
            paramMin: 1
        },
        "else": {
            delta: 0,
            prefix: "} else {"
        },
        "elseif": {
            delta: 0,
            prefix: "} else if (",
            suffix: ") {",
            paramDefault: "true"
        },
        "/if": {
            delta: -1,
            prefix: "}"
        },
        "for": {
            delta: 1,
            paramMin: 3,
            prefixFunc: function(a, b, c, d) {
                if (a[2] != "in") {
                    throw new d.ParseError(c, b.line, "bad for loop statement: " + a.join(' '));
                }
                var e = a[1];
                var f = "__LIST__" + e;
                return ["var ", f, " = ", a[3], "; if(typeof(" + a[3] + ") == 'undefined'){throw '" + a[3] + "未定义'} ", "var __LENGTH_STACK__;", "if (typeof(__LENGTH_STACK__) == 'undefined' || !__LENGTH_STACK__.length) __LENGTH_STACK__ = new Array();", "__LENGTH_STACK__[__LENGTH_STACK__.length] = 0;", "if ((", f, ") != null) { ", "var ", e, "_ct = 0;", "for (var ", e, "_index in ", f, ") { ", e, "_ct++;", "if (typeof(", f, "[", e, "_index]) == 'function') {continue;}", "if (", e, "_index == '_MODIFIERS'){continue;}", "__LENGTH_STACK__[__LENGTH_STACK__.length - 1]++;", "var ", e, " = ", f, "[", e, "_index];"].join("")
            }
        },
        "forelse": {
            delta: 0,
            prefix: "} } if (__LENGTH_STACK__[__LENGTH_STACK__.length - 1] == 0) { if (",
            suffix: ") {",
            paramDefault: "true"
        },
        "/for": {
            delta: -1,
            prefix: "} }; delete __LENGTH_STACK__[__LENGTH_STACK__.length - 1];"
        },
        "var": {
            delta: 0,
            prefix: "var ",
            suffix: ";"
        },
        "macro": {
            delta: 1,
            prefixFunc: function(a, b, c, d) {
                var e = a[1].split('(')[0];
                return ["var ", e, " = function", a.slice(1).join(' ').substring(e.length), "{ var _OUT_arr = []; var _OUT = { write: function(m){if(m){_OUT_arr.push(m);}}};"].join('')
            }
        },
        "/macro": {
            delta: -1,
            prefix: " return _OUT_arr.join(''); };"
        }
    };
    TemplateManager.parseTemplate_etc.modifierDef = {
        "eat": function(v) {
            return ""
        },
        "escape": function(s) {
            return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        },
        "capitalize": function(s) {
            return String(s).toUpperCase()
        },
        "default": function(s, d) {
            return s ? s: d
        },
        "substring": function(s, a, b) {
            if (!s) {
                return ""
            }
            return String(s).substring(a, b)
        },
        "trim": function(s, a) {
            a = a || '\\s';
            return String(s).trim(a)
        },
        "toFixed": function(s, a) {
            var b = s + ""; {
                if (isNaN(b)) {
                    return b
                }
            }
            if (typeof(a) == 'undefined') {
                if (b.indexOf(".") >= 0) {
                    a = 2
                } else {
                    a = 0
                }
            }
            b *= 1;
            return b.toFixed(a)
        }
    };
    TemplateManager.parseTemplate_etc.modifierDef.h = TemplateManager.parseTemplate_etc.modifierDef.escape;
    TemplateManager.parseTemplate_etc.Template = function(i, j, l, n, o) {
        this.process = function(b, c, d) {
            if (b == null) {
                b = {}
            }
            if (typeof(c) == 'string' && c) {
                window[c] = b
            }
            if (b._MODIFIERS == null) {
                b._MODIFIERS = {}
            }
            if (b.defined == null) {
                b.defined = function(a) {
                    return (b[a] != undefined)
                }
            }
            for (var k in o.modifierDef) {
                if (b._MODIFIERS[k] == null) {
                    b._MODIFIERS[k] = o.modifierDef[k]
                }
            }
            if (d == null) {
                d = {}
            }
            var f = [];
            var g = {
                write: function(m) {
                    f.push(m)
                }
            };
            try {
                n(g, b, d)
            } catch(e1) {
                if (typeof(c) == 'string') {
                    c = c.split('.')[0];
                    window[c] = b;
                    try {
                        f = [];
                        n(g, window[c], d)
                    } catch(e) {
                        alert('[templatemanager.js][' + c + '][163][' + e + '][请设置模板中的变量名，如调用 process(obj, objStr)即可。');
                        if (d.throwExceptions == true) {
                            throw e;
                        }
                        var h = new String(f.join("") + "[ERROR: " + e.toString() + (e.message ? '; ' + e.message: '') + "]");
                        h["exception"] = e;
                        return h
                    }
                    window[c] = undefined;
                    return f.join("")
                } else {
                    alert('[templatemanager.js][174]' + e1);
                    if (d.throwExceptions == true) {
                        throw e;
                    }
                    var h = new String(f.join("") + "[ERROR: " + e1.toString() + (e1.message ? '; ' + e1.message: '') + "]");
                    h["exception"] = e1;
                    return h
                }
            }
            return f.join("")
        };
        this.name = i;
        this.source = j;
        this.sourceFunc = l;
        this.toString = function() {
            return "TemplateManager.Template [" + i + "]"
        }
    };
    TemplateManager.parseTemplate_etc.ParseError = function(a, b, c) {
        this.name = a;
        this.line = b;
        this.message = c
    };
    TemplateManager.parseTemplate_etc.ParseError.prototype.toString = function() {
        return ("TemplateManager template 错误发生在 " + this.name + ": line " + this.line + ", " + this.message)
    };
    var t = function(a, b, c) {
        a = A(a);
        var d = ["var TemplateManager_Template_TEMP = function(_OUT, _CONTEXT, _FLAGS) { with (_CONTEXT) {"];
        var e = {
            stack: [],
            line: 1
        };
        var f = -1;
        while (f + 1 < a.length) {
            var g = f;
            g = a.indexOf("{", g + 1);
            while (g >= 0) {
                var h = a.indexOf('}', g + 1);
                var i = a.substring(g, h);
                var j = i.match(/^\{(cdata|minify|eval)/);
                if (j) {
                    var k = j[1];
                    var l = g + k.length + 1;
                    var m = a.indexOf('}', l);
                    if (m >= 0) {
                        var n;
                        if (m - l <= 0) {
                            n = "{/" + k + "}"
                        } else {
                            n = a.substring(l + 1, m)
                        }
                        var o = a.indexOf(n, m + 1);
                        if (o >= 0) {
                            w(a.substring(f + 1, g), d);
                            var p = a.substring(m + 1, o);
                            if (k == 'cdata') {
                                y(p, d)
                            } else if (k == 'minify') {
                                y(B(p), d)
                            } else if (k == 'eval') {
                                if (p != null && p.length > 0) {
                                    d.push('_OUT.write( (function() { ' + p + ' })() );')
                                }
                            }
                            g = f = o + n.length - 1
                        }
                    }
                } else if (a.charAt(g - 1) != '$' && a.charAt(g - 1) != '\\') {
                    var q = (a.charAt(g + 1) == '/' ? 2 : 1);
                    if (a.substring(g + q, g + 10 + q).search(TemplateManager.parseTemplate_etc.statementTag) == 0) {
                        break
                    }
                }
                g = a.indexOf("{", g + 1)
            }
            if (g < 0) {
                break
            }
            var h = a.indexOf("}", g + 1);
            if (h < 0) {
                break
            }
            w(a.substring(f + 1, g), d);
            u(a.substring(g, h + 1), e, d, b, c);
            f = h
        }
        w(a.substring(f + 1), d);
        if (e.stack.length != 0) {
            throw new c.ParseError(b, e.line, "模板语法错误: " + e.stack.join(","));
        }
        d.push("}}; TemplateManager_Template_TEMP");
        return d.join("")
    };
    var u = function(a, b, c, d, e) {
        var f = a.slice(1, -1).split(' ');
        var g = e.statementDef[f[0]];
        if (g == null) {
            w(a, c);
            return
        }
        if (g.delta < 0) {
            if (b.stack.length <= 0) {
                throw new e.ParseError(d, b.line, "结束标签不匹配: " + a);
            }
            b.stack.pop()
        }
        if (g.delta > 0) {
            b.stack.push(a)
        }
        if (g.paramMin != null && g.paramMin >= f.length) {
            throw new e.ParseError(d, b.line, "参数不完整: " + a);
        }
        if (g.prefixFunc != null) {
            c.push(g.prefixFunc(f, b, d, e))
        } else {
            c.push(g.prefix)
        }
        if (g.suffix != null) {
            if (f.length <= 1) {
                if (g.paramDefault != null) {
                    c.push(g.paramDefault)
                }
            } else {
                for (var i = 1; i < f.length; i++) {
                    if (i > 1) {
                        c.push(' ')
                    }
                    c.push(f[i])
                }
            }
            c.push(g.suffix)
        }
    };
    var w = function(a, b) {
        if (a.length <= 0) {
            return
        }
        var c = 0;
        var d = a.length - 1;
        while (c < a.length && (a.charAt(c) == '\n')) {
            c++
        }
        while (d >= 0 && (a.charAt(d) == ' ' || a.charAt(d) == '\t')) {
            d--
        }
        if (d < c) {
            d = c
        }
        if (c > 0) {
            b.push('if (_FLAGS.keepWhitespace == true) _OUT.write("');
            var s = a.substring(0, c).replace('\n', '\\n');
            if (s.charAt(s.length - 1) == '\n') {
                s = s.substring(0, s.length - 1)
            }
            b.push(s);
            b.push('");')
        }
        var e = a.substring(c, d + 1).split('\n');
        for (var i = 0; i < e.length; i++) {
            x(e[i], b);
            if (i < e.length - 1) {
                b.push('_OUT.write("\\n");\n')
            }
        }
        if (d + 1 < a.length) {
            b.push('if (_FLAGS.keepWhitespace == true) _OUT.write("');
            var s = a.substring(d + 1).replace('\n', '\\n');
            if (s.charAt(s.length - 1) == '\n') {
                s = s.substring(0, s.length - 1)
            }
            b.push(s);
            b.push('");')
        }
    };
    var x = function(a, b) {
        var c = '}';
        var d = -1;
        while (d + c.length < a.length) {
            var e = "${",
            endMark = "}";
            var f = a.indexOf(e, d + c.length);
            if (f < 0) {
                break
            }
            if (a.charAt(f + 2) == '%') {
                e = "${%";
                endMark = "%}"
            }
            var g = a.indexOf(endMark, f + e.length);
            if (g < 0) {
                break
            }
            y(a.substring(d + c.length, f), b);
            var h = a.substring(f + e.length, g).replace(/\|\|/g, "#@@#").split('|');
            for (var k in h) {
                if (h[k].replace) {
                    h[k] = h[k].replace(/#@@#/g, '||')
                }
            }
            b.push('_OUT.write(');
            z(h, h.length - 1, b);
            b.push(');');
            d = g;
            c = endMark
        }
        y(a.substring(d + c.length), b)
    };
    var y = function(a, b) {
        if (a == null || a.length <= 0) {
            return
        }
        a = a.replace(/\\/g, '\\\\');
        a = a.replace(/\n/g, '\\n');
        a = a.replace(/"/g, '\\"');
        b.push('_OUT.write("');
        b.push(a);
        b.push('");')
    };
    var z = function(a, b, c) {
        var d = a[b];
        if (b <= 0) {
            c.push(d);
            return
        }
        var e = d.split(':');
        c.push('_MODIFIERS["');
        c.push(e[0]);
        c.push('"](');
        z(a, b - 1, c);
        if (e.length > 1) {
            c.push(',');
            c.push(e[1])
        }
        c.push(')')
    };
    var A = function(a) {
        a = a.replace(/\t/g, "    ");
        a = a.replace(/\r\n/g, "\n");
        a = a.replace(/\r/g, "\n");
        a = a.replace(/^(\s*\S*(\s+\S+)*)\s*$/, '$1');
        return a
    };
    var B = function(a) {
        a = a.replace(/^\s+/g, "");
        a = a.replace(/\s+$/g, "");
        a = a.replace(/\s+/g, " ");
        a = a.replace(/^(\s*\S*(\s+\S+)*)\s*$/, '$1');
        return a
    };
    TemplateManager.parseDOMTemplate = function(a, b, c) {
        if (b == null) {
            b = document
        }
        var d = b.getElementById(a);
        var e = d.value;
        if (e == null) {
            e = d.innerHTML
        }
        e = e.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        return TemplateManager.parseTemplate(e, a, c)
    };
    TemplateManager.processDOMTemplate = function(a, b, c, d, e) {
        return TemplateManager.parseDOMTemplate(a, d, e).process(b, c)
    }
})();
var JsonObject = {
    _option: {
        'SERIALIZE_ILLEGAL_CHARACTER': ['=', '|']
    },
    serialize: function(b) {
        switch (typeof(b)) {
        case 'object':
            {
                if (!b) {
                    return ''
                }
                var c = [];
                if (b instanceof Array) {
                    for (var i = 0; i < b.length; i++) {
                        c.push(JsonObject.serialize(b[i]))
                    }
                    return c.join('|') + '|'
                } else if (b instanceof RegExp) {
                    return encodeURIComponent(b.toString())
                } else {
                    for (var a in b) {
                        if (typeof(b[a]) == 'undefined') {
                            continue
                        }
                        if (typeof(b[a]) == 'string') {
                            c.push(a + '=' + JsonObject.serialize(b[a]))
                        } else {
                            c.push(a + '=' + encodeURIComponent(JsonObject.serialize(b[a])))
                        }
                    }
                    return c.join('&')
                }
            }
        case 'boolean':
            {
                if (b) {
                    return '1'
                }
                return '0'
            }
        case 'undefined':
            {
                return ''
            }
        case 'number':
            {
                return '' + b
            }
        case 'string':
            {
                for (var i = 0; i < JsonObject._option.SERIALIZE_ILLEGAL_CHARACTER.length; i++) {
                    var d = JsonObject._option.SERIALIZE_ILLEGAL_CHARACTER[i];
                    if (b.indexOf(d) > 0) {
                        b = b.replace(new RegExp('[' + d + ']', 'img'), encodeURIComponent('\\' + d))
                    }
                }
                return encodeURIComponent(b)
            }
        case 'function':
            {
                return b.toString()
            }
        default:
            {
                return b.toString()
            }
        }
    },
    unSerialize: function(a) {
        a = a.toString(); {
            var b = a.split('|');
            var c = a.split('=');
            if (b.length == 1) {
                if (c.length == 1) {
                    for (var i = 0; i < JsonObject._option.SERIALIZE_ILLEGAL_CHARACTER.length; i++) {
                        var d = JsonObject._option.SERIALIZE_ILLEGAL_CHARACTER[i];
                        if (a.indexOf(encodeURIComponent('\\' + d)) > 0) {
                            a = a.replace(new RegExp(encodeURIComponent('\\' + d), 'img'), d)
                        }
                    }
                    if (!isNaN(a)) {
                        return a * 1
                    }
                    var a = decodeURIComponent(a);
                    for (var i = 0; i < JsonObject._option.SERIALIZE_ILLEGAL_CHARACTER.length; i++) {
                        var d = JsonObject._option.SERIALIZE_ILLEGAL_CHARACTER[i];
                        if (a.indexOf(encodeURIComponent('\\' + d)) > 0) {
                            a = a.replace(new RegExp(encodeURIComponent('\\' + d), 'img'), d)
                        }
                    }
                    return a
                }
                var e = {};
                var f = a.split('&');
                for (var i = 0; i < f.length; i++) {
                    if (!f[i]) {
                        continue
                    }
                    var g = f[i].split('=');
                    if (g.length == 2) {
                        e[g[0]] = JsonObject.unSerialize(decodeURIComponent(g[1]))
                    }
                }
                return e
            } else {
                var h = [];
                for (var i = 0; i < b.length - 1; i++) {
                    if (b[i]) {
                        h.push(JsonObject.unSerialize(b[i]))
                    }
                }
                return h
            }
        }
    },
    clone: function(o) {
        if (typeof(o) != 'object') {
            return o
        }
        if (o == null) {
            return null
        }
        var n = (o.constructor == Array) ? [] : {};
        for (var i in o) {
            n[i] = JsonObject.clone(o[i])
        }
        return n
    },
    encode: function(o) {
        if (typeof(o) == 'string') {
            return encodeURIComponent(o)
        }
        if (typeof(o) != 'object') {
            return o
        }
        if (o == null) {
            return null
        }
        for (var i in o) {
            o[i] = JsonObject.encode(o[i])
        }
        return o
    },
    decode: function(o) {
        if (typeof(o) == 'string') {
            return decodeURIComponent(o)
        }
        if (typeof(o) != 'object') {
            return o
        }
        if (o == null) {
            return null
        }
        for (var i in o) {
            o[i] = JsonObject.decode(o[i])
        }
        return o
    },
    extend: function(a, b) {
        var c = this.clone(b);
        for (var i in a) {
            if (typeof(b[i]) != 'undefined') {
                a[i] = c[i]
            }
        }
        return a
    },
    minus: function(a, b) {
        var c = {};
        for (var i in a) {
            if (typeof(b[i]) == 'undefined') {
                c[i] = a[i]
            }
        }
        return c
    },
    intersect: function(a, b) {
        var c = {};
        for (var i in a) {
            if (typeof(b[i]) != 'undefined') {
                c[i] = a[i]
            }
        }
        return c
    },
    each: function(a, b) {
        if (typeof(a) != 'object' || typeof(b) != 'function') {
            return
        }
        if (a instanceof Array) {
            for (var i = 0; i < a.length; i++) {
                if (b(i, a[i])) {
                    return
                }
            }
        } else {
            for (var i in a) {
                if (b(i, a[i])) {
                    return
                }
            }
        }
    },
    stringToJson: function(b) {
        var a;
        eval('a=' + b + ';');
        return a
    },
    toJsonString: function(b) {
        switch (typeof(b)) {
        case 'object':
            var c = [];
            if (b instanceof Array) {
                for (var i = 0,
                len = b.length; i < len; i++) {
                    c.push(JsonObject.toJsonString(b[i]))
                }
                return '[' + c.join(',') + ']'
            } else if (b instanceof RegExp) {
                return b.toString()
            } else {
                for (var a in b) {
                    c.push('"' + a + '":' + JsonObject.toJsonString(b[a]))
                }
                return '{' + c.join(',') + '}'
            }
        case 'function':
            return 'function() {}';
        case 'number':
            return b.toString();
        case 'string':
            return "\"" + b.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g,
            function(a) {
                return ("\n" == a) ? "\\n": ("\r" == a) ? "\\r": ("\t" == a) ? "\\t": ""
            }) + "\"";
        case 'boolean':
            return b.toString();
        case 'undefined':
            return 'undefined';
        default:
            return b.toString()
        }
    },
    xmlToJson: function(xmlDocOrStr) {
        var xmlDoc = null;
		if(typeof(xmlDocOrStr) == 'string'){
			{//对格式进行规范化
				//首先去掉标签<>之间的空格
				xmlDocOrStr = xmlDocOrStr.replace(/<\s*?(\/|[a-zA-Z])/g, '<$1'); //< option < /
				xmlDocOrStr = xmlDocOrStr.replace(/>\s*?<([a-zA-Z])/g, '><$1'); //> <
				//再解决属性的问题。
				var arrTemp = xmlDocOrStr.match(/<[^\/].*?>/g);
				if(arrTemp){
					var oldArrTemp = [];
					//属性的字符串里不能包含空格
					for(var i = 0; i < arrTemp.length; i++){
						oldArrTemp.push(arrTemp[i]);
						var temp = arrTemp[i];
						temp = temp.replace(/(\s+)/g, ' '); //先将多个空格转换为一个空格
						temp = temp.replace(/\s*=\s*/g, '='); //去掉=两边的空格
						//解决属性没有等号的问题 selected disabled readonly
						var reg_ = / ([a-zA-Z_]+)( |>)/g;
						var t_ = temp.match(reg_);
						while(t_){
							temp = temp.replace(reg_, ' $1="$1"$2');
							t_ = temp.match(reg_);
						}
						//属性加引号
						var reg_ = / ([a-zA-Z_]+)=([^"].*?)( |>)/g;
						t_ = temp.match(reg_);
						while(t_){
							temp = temp.replace(reg_, ' $1="$2"$3');
							t_ = temp.match(reg_);
						}
						arrTemp[i] = temp;
					}
					//全部替换
					for(var i = 0; i < arrTemp.length; i++){
						xmlDocOrStr = xmlDocOrStr.replace(new RegExp(oldArrTemp[i], 'g'), arrTemp[i]);
					}
				}
				//最后解决特殊的类型 input img
				xmlDocOrStr = xmlDocOrStr.replace(/<([a-zA-Z_]+?) ([^>]*?)( ?\/>)/g,"<$1 $2></$1>");
				xmlDocOrStr = xmlDocOrStr.replace(/<([a-zA-Z_]+?)\s+>/g,"<$1>"); //<p ></p>
				//所有标签小写
				xmlDocOrStr = xmlDocOrStr.replace(/(<\/?)([a-z\d\:]+)((\s+.+?)?>)/gi, function(s,a,b,c){return a + b.toLowerCase() + c;}); //标签小写
			}
			
			var createXml = function(str){
				if(document.all){ 
					var Dom = new ActiveXObject("Microsoft.XMLDOM");
					Dom.loadXML(str);
					return Dom;
				}else{
					return new DOMParser().parseFromString(str, "text/xml");
				}
			};
			xmlDoc = createXml(xmlDocOrStr);
		}else if(typeof(xmlDocOrStr) == 'object'){
			xmlDoc = xmlDocOrStr;
			
			//FF下outterHTML没有效果			
			if(typeof(HTMLElement)!="undefined" && !window.opera){   
				HTMLElement.prototype.__defineGetter__("outerHTML",function(){   
					var a = this.attributes;
					var str = "<" + this.tagName;
					for(var i = 0;i < a.length; i++){
						if(a[i].specified){
							str += " " + a[i].name + '="' + a[i].value + '"';
						}
					}   
					if(!this.canHaveChildren){
						return str + " />";
					}
					return str + ">" + this.innerHTML + "</" + this.tagName + ">";
				});   
				HTMLElement.prototype.__defineSetter__("outerHTML",function(s){   
					var r = this.ownerDocument.createRange();   
					r.setStartBefore(this);   
					var df = r.createContextualFragment(s);   
					this.parentNode.replaceChild(df, this);   
					return s;   
				});   
				HTMLElement.prototype.__defineGetter__("canHaveChildren",function(){   
					return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/.test(this.tagName.toLowerCase());   
				});
			}
			//dom对象
			xmlDocOrStr = xmlDoc.outerHTML;
			return $json.xmlToJson(xmlDocOrStr);
		}
		
		if(!xmlDoc){
			alert('can not create XML DOM object');
			return null;
		}
		
		/**
		 * 判断该节点是否只包含文本节点
		 * @param {Object} node 用于判断的 节点
		 * @return {Boolean} 如果只包含文本内容为 true
		 */
		var nodeHasValue = function(node){
			if(node){
				var child = node.firstChild;
				if(child && child.nextSibling === null && (child.nodeType === 3 || child.nodeType === 4)){
					return true;
				}
			}
			return false;
		};
		/**
		 * 把 Node 转换成 JSON 格式
		 * @param {Object} node 用于转换的 节点
		 * @requires EYoo.XML.nodeHasValue 判断该节点是否只包含文本节点
		 * @return {Object} obj JSON 格式的信息
		*/
		var nodeToObject = function(node){
			if(!node){
				return null;
			}
			var obj = {};
			// Add all attributes as properties of the object.
			for(var i = 0; i < node.attributes.length; i++){
				var attr = node.attributes[i];
				var attrName = "@" + attr.name;
				obj[attrName] = attr.value;
			}
		
			var child = null;
			// 判断该节点是否只包含文本节点
			if(nodeHasValue(node)){
				try{
					child = node.firstChild;
					if(child.nodeType == 3){
						obj[child.nodeName] = child.data;
					}else if(child.nodeType == 4){
						obj[child.nodeName] = child.data;
					}
				}catch(e){
					throw("nodeToObject() exception caught: " + e + "\n");
				}
			}else{
				// 如果不是文本节点
				child = node.firstChild;
				while(child){
					if(child.nodeType == 1){
						var isArray = false;
						var tagName = child.nodeName;
		
						// 如果已经存在该节点信息了，则转换成 Array 类型
						if(obj[tagName]){
							if(obj[tagName].constructor != Array){
								var curValue = obj[tagName];
								obj[tagName] = new Array;
								obj[tagName].push(curValue);
							}
							isArray = true;
						}
						var childObj = nodeToObject(child);
		
						if(isArray){
							obj[tagName].push(childObj);
						}else{
							obj[tagName] = childObj;
						}
					}
					child = child.nextSibling;
				}
			}
			return obj;
		};
		
		var xmlToObject = function(xmlDoc){
			var obj = null;
			if(xmlDoc && xmlDoc.firstChild){
				var child = xmlDoc.firstChild;
				while(child){
					if(child.nodeType == 1){
						obj = {};
						obj[child.nodeName] = nodeToObject(child);
						break;
					}
					child = child.nextSibling;
				}
			}
			return obj;
		};
		return xmlToObject(xmlDoc);
    }
};
var CookieManager = {
    setCookie: function(a, b, c, d, e, f) {
        var g = new Date();
        var h = arguments[2] || null;
        var d = arguments[3] || "/";
        var e = arguments[4] || null;
        var f = arguments[5] || false;
        if (h) {
            g.setMinutes(g.getMinutes() + parseInt(h))
        }
        var i = escape(a) + '=' + escape(b) + (h ? '; expires=' + g.toGMTString() : '') + (d ? '; path=' + d: '') + (e ? '; domain=' + e: '') + (f ? '; secure': '');
        document.cookie = i
    },
    getCookie: function(a) {
        var b, reg = new RegExp("(^|; )" + a + "=([^;]*)(;|$)");
        if (b = document.cookie.match(reg)) {
            return unescape(b[2])
        } else {
            return null
        }
    },
    delCookie: function(a, b, c, d) {
        var e = new Date();
        e.setTime(e.getTime() - 1000);
        var f = e.toGMTString();
        var b = arguments[1] || "/";
        var c = arguments[2] || null;
        var d = arguments[3] || false;
        this.setCookie(a, '', -100, b, c, d)
    }
};
var URLManager = {
    getNoCacheFromUrl: function(a, b) {
        a = a || ((typeof(window) != 'undefined' && window && window.location && window.location.href) ? window.location.href: '') || '';
        b = b || '_';
        var c = b + "=" + randomInt(10000);
        if (a.indexOf("?") > 0) {
            var d = this.getQuery(b, a);
            if (d) {
                a = a.replace(new RegExp(b + '=([^&]*)', 'gi'), c)
            } else {
                a += "&" + c
            }
        } else {
            a += "?" + c
        }
        return a
    },
    getQuery: function(a, b) {
        var u = b || window.location.href;
        var c = new RegExp("(^|&)" + a + "=([^&]*)(&|$)");
        var r = u.substr(u.indexOf("\?") + 1).match(c);
        if (r != null) {
            return unescape(r[2])
        }
        return ""
    },
    getAllQuery: function(a) {
        var b = this.getAllOldQuery(a);
        for (var i in b) {
            if (typeof(b[i]) != 'undefined' && typeof(b[i]) != 'object' && typeof(b[i]) != 'function') {
                b[i] = b[i] + '';
                b[i] = unescape(b[i])
            }
        }
        return b
    },
    getAllOldQuery: function(a) {
        var b = window.location.href;
        var u = a || b;
        var c = {};
        if (u.length > 0 && u == b) {
            u = u.split('#')[0]
        }
        if (u.length > 0) {
            var d = u.split("&");
            for (var i = 0; i < d.length; i++) {
                var e = d[i].split("=");
                if (i == 0) {
                    if (e.length >= 2 && e[0].length > 0) {
                        if (i == 0) {
                            e[0] = e[0].substr(e[0].indexOf("\?") + 1)
                        }
                    }
                }
                if (e.length > 2 || e[0].length == 0) {
                    if (e[0].length > 0) {
                        var f = [];
                        for (var k = 1; k < e.length; k++) {
                            f.push(e[k])
                        }
                        c[e[0]] = f.join('=')
                    }
                    continue
                }
                if (e.length == 2) {
                    if (e[1].length == 0) {
                        c[e[0]] = ''
                    } else {
                        c[e[0]] = e[1]
                    }
                }
            }
        }
        return c
    },
    getAllQueryStr: function(c, d) {
        c = c || null;
        d = d || null;
        var f = function(a) {
            if (a) {
                var b = [];
                for (var i in a) {
                    if (typeof(a[i]) != "undefined") {
                        if (typeof(a[i]) == "string" || typeof(a[i]) == "number" || typeof(a[i]) == "boolean") {
                            b.push(i + "=" + escape(a[i].toString()))
                        } else {
                            if (a[i] == null) {
                                b.push(i + "=")
                            } else {
                                if (a[i] instanceof Array) {
                                    for (var k = 0; k < a[i].length; k++) {
                                        a[i][k] = escape(a[i][k].toString())
                                    }
                                    b.push(i + "=" + (a[i].join("|")))
                                } else {
                                    try {
                                        b.push(i + "=" + escape(a[i].toString()))
                                    } catch(e) {}
                                }
                            }
                        }
                    }
                }
                if (b.length > 0) {
                    return b.join("&")
                }
            }
            return ""
        };
        var g = -1;
        if (!c && !d) {
            g = 0
        } else if (c && d) {
            g = 2
        } else if (c && !d) {
            g = 1
        } else if (!c && d) {
            c = d;
            g = 1
        }
        switch (g) {
        case 0:
            {
                var d = URLManager.getAllQuery();
                return f(d)
            }
        case 1:
            {
                var h = c;
                if (typeof(h) == "string") {
                    return f(URLManager.getAllQuery(h))
                } else if (typeof(h) == "object") {
                    return f(h)
                } else {
                    return ""
                }
            }
        case 2:
            {
                var j = {};
                if (typeof(c) == "string") {
                    j = URLManager.getAllQuery(c)
                } else if (typeof(c) == "object") {
                    for (var i in c) {
                        try {
                            j[i] = unescape(c[i])
                        } catch(e) {}
                    }
                } else {
                    return ""
                }
                for (var i in d) {
                    try {
                        j[i] = unescape(d[i])
                    } catch(e) {}
                }
                return f(j)
            }
        default:
            {
                alert('参数错误');
                break
            }
        }
    },
    getAllEncodeStr: function(a) {
        if (a) {
            var b = [];
            for (var i in a) {
                if (typeof(a[i]) != "undefined") {
                    if (typeof(a[i]) == "string" || typeof(a[i]) == "number" || typeof(a[i]) == "boolean") {
                        b.push(i + "=" + encodeURIComponent(a[i].toString()))
                    } else {
                        if (a[i] == null) {
                            b.push(i + "=")
                        } else {
                            if (a[i] instanceof Array) {
                                for (var k = 0; k < a[i].length; k++) {
                                    a[i][k] = encodeURIComponent(a[i][k].toString())
                                }
                                b.push(i + "=" + (a[i].join("|")))
                            } else {
                                try {
                                    b.push(i + "=" + encodeURIComponent(a[i].toString()))
                                } catch(e) {}
                            }
                        }
                    }
                }
            }
            if (b.length > 0) {
                return b.join("&")
            }
        }
        return ""
    }
};
var ToolManager = {
    clipDataToBoard: function(a) {
        if (window.clipboardData) {
            clipboardData.setData("text", a)
        } else if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch(e) {
                alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'")
            }
            var b = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!b) {
                return false
            }
            var c = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!c) {
                return false
            }
            c.addDataFlavor('text/unicode');
            var d = new Object();
            var f = new Object();
            var d = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var g = a;
            d.data = g;
            c.setTransferData("text/unicode", d, g.length * 2);
            var h = Components.interfaces.nsIClipboard;
            if (!b) {
                return false
            }
            b.setData(c, null, h.kGlobalClipboard)
        }
        return true
    },
    marqueesUP: function(p) {
        this.option = {
            instanceName: "",
            ulId: "",
            showLiNum: 6,
            scrollstep: 1,
            scrollsteptime: 1,
            scrollstepLiNum: 0,
            scrollstoptime: 20
        };
        this.init = function() {
            $$.extend(this.option, p); {
                var b = true;
                $$("#" + this.option.ulId).children().each(function() {
                    var a = this.tagName;
                    if (a && a.toLowerCase() != 'li') {
                        b = false
                    }
                });
                if (!b) {
                    alert('如果需要使用轮播滚动效果，请将列表使用ul,li的方式');
                    return
                }
            }
            var c = $$('#' + this.option.ulId);
            var d = c[0];
            var e = c.find('li').eq(0).height();
            if (e * 1 <= 0) {
                e = 23
            }
            c.find('li').css('overflow', 'hidden').height(e);
            var f = e * this.option.showLiNum; {
                d.style.height = f + "px";
                d.style.padding = "0px";
                d.style.overflow = "hidden"
            }
            var g = $$(d).html();
            do {
                d.innerHTML += g;
                if (c.find('li').length == 0 || c.find('li').length >= this.option.showLiNum * 2) {
                    break
                }
            } while ( true );
            var h = this.option.scrollstepLiNum * e;
            var i = 0;
            var j = (c.find('li').length - this.option.showLiNum * 1 - 1) * e;
            var k = this.option.scrollstep;
            if (k > h && h > 0) {
                k = h
            }
            var l = this.option.scrollsteptime;
            var m = this.option.scrollstoptime;
            var n = this.option.instanceName;
            var o = window[n];
            if (!o) {
                o = window[n] = {}
            }
            o.start = function() {
                if (h > 0) {
                    clearTimeout(o['timeoutFlag']);
                    o.start2 = function() {
                        if (j >= i) {
                            i += k;
                            if (i >= j) {
                                i = 0
                            }
                            d.scrollTop = i;
                            if (i % h == 0) {
                                o['timeoutFlag'] = setTimeout(function() {
                                    o.start()
                                },
                                m);
                                clearTimeout(o['timeoutFlag2']);
                                return
                            }
                        }
                        o['timeoutFlag2'] = setTimeout(function() {
                            o.start2()
                        },
                        l)
                    };
                    o['timeoutFlag2'] = setTimeout(function() {
                        o.start2()
                    },
                    l)
                } else {
                    if (j >= i) {
                        i += k;
                        if (i >= j) {
                            i = 0
                        }
                        d.scrollTop = i
                    }
                    o['timeoutFlag'] = setTimeout(function() {
                        o.start()
                    },
                    m)
                }
            };
            o['timeoutFlag'] = setTimeout(function() {
                o.start()
            },
            m);
            d.onmouseover = function() {
                clearTimeout(o['timeoutFlag']);
                if (h > 0) {
                    clearTimeout(o['timeoutFlag2'])
                }
            };
            d.onmouseout = function() {
                o['timeoutFlag'] = setTimeout(function() {
                    o.start()
                },
                m)
            }
        }
    },
    getMD5: function(k) {
        var l = 1;
        var m = "";
        var n = 8;
        var o = 32;
        var p = function(a) {
            var b = "";
            b += a.verifycode.value;
            b = b.toUpperCase();
            a.p.value = md5(r(a.p.value) + b);
            return true
        };
        var r = function(s) {
            var a = new Array;
            a = C(L(s), s.length * n);
            a = C(a, 16 * n);
            a = C(a, 16 * n);
            return N(a)
        };
        var u = function(s) {
            return N(C(L(s), s.length * n))
        };
        var v = function(s) {
            return O(C(L(s), s.length * n))
        };
        var w = function(s) {
            return M(C(L(s), s.length * n))
        };
        var z = function(a, b) {
            return N(I(a, b))
        };
        var A = function(a, b) {
            return O(I(a, b))
        };
        var B = function() {
            return M(I(key, data))
        };
        var C = function(x, e) {
            x[e >> 5] |= 0x80 << ((e) % 32);
            x[(((e + 64) >>> 9) << 4) + 14] = e;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var f = a;
                var g = b;
                var h = c;
                var j = d;
                a = E(a, b, c, d, x[i + 0], 7, -680876936);
                d = E(d, a, b, c, x[i + 1], 12, -389564586);
                c = E(c, d, a, b, x[i + 2], 17, 606105819);
                b = E(b, c, d, a, x[i + 3], 22, -1044525330);
                a = E(a, b, c, d, x[i + 4], 7, -176418897);
                d = E(d, a, b, c, x[i + 5], 12, 1200080426);
                c = E(c, d, a, b, x[i + 6], 17, -1473231341);
                b = E(b, c, d, a, x[i + 7], 22, -45705983);
                a = E(a, b, c, d, x[i + 8], 7, 1770035416);
                d = E(d, a, b, c, x[i + 9], 12, -1958414417);
                c = E(c, d, a, b, x[i + 10], 17, -42063);
                b = E(b, c, d, a, x[i + 11], 22, -1990404162);
                a = E(a, b, c, d, x[i + 12], 7, 1804603682);
                d = E(d, a, b, c, x[i + 13], 12, -40341101);
                c = E(c, d, a, b, x[i + 14], 17, -1502002290);
                b = E(b, c, d, a, x[i + 15], 22, 1236535329);
                a = F(a, b, c, d, x[i + 1], 5, -165796510);
                d = F(d, a, b, c, x[i + 6], 9, -1069501632);
                c = F(c, d, a, b, x[i + 11], 14, 643717713);
                b = F(b, c, d, a, x[i + 0], 20, -373897302);
                a = F(a, b, c, d, x[i + 5], 5, -701558691);
                d = F(d, a, b, c, x[i + 10], 9, 38016083);
                c = F(c, d, a, b, x[i + 15], 14, -660478335);
                b = F(b, c, d, a, x[i + 4], 20, -405537848);
                a = F(a, b, c, d, x[i + 9], 5, 568446438);
                d = F(d, a, b, c, x[i + 14], 9, -1019803690);
                c = F(c, d, a, b, x[i + 3], 14, -187363961);
                b = F(b, c, d, a, x[i + 8], 20, 1163531501);
                a = F(a, b, c, d, x[i + 13], 5, -1444681467);
                d = F(d, a, b, c, x[i + 2], 9, -51403784);
                c = F(c, d, a, b, x[i + 7], 14, 1735328473);
                b = F(b, c, d, a, x[i + 12], 20, -1926607734);
                a = G(a, b, c, d, x[i + 5], 4, -378558);
                d = G(d, a, b, c, x[i + 8], 11, -2022574463);
                c = G(c, d, a, b, x[i + 11], 16, 1839030562);
                b = G(b, c, d, a, x[i + 14], 23, -35309556);
                a = G(a, b, c, d, x[i + 1], 4, -1530992060);
                d = G(d, a, b, c, x[i + 4], 11, 1272893353);
                c = G(c, d, a, b, x[i + 7], 16, -155497632);
                b = G(b, c, d, a, x[i + 10], 23, -1094730640);
                a = G(a, b, c, d, x[i + 13], 4, 681279174);
                d = G(d, a, b, c, x[i + 0], 11, -358537222);
                c = G(c, d, a, b, x[i + 3], 16, -722521979);
                b = G(b, c, d, a, x[i + 6], 23, 76029189);
                a = G(a, b, c, d, x[i + 9], 4, -640364487);
                d = G(d, a, b, c, x[i + 12], 11, -421815835);
                c = G(c, d, a, b, x[i + 15], 16, 530742520);
                b = G(b, c, d, a, x[i + 2], 23, -995338651);
                a = H(a, b, c, d, x[i + 0], 6, -198630844);
                d = H(d, a, b, c, x[i + 7], 10, 1126891415);
                c = H(c, d, a, b, x[i + 14], 15, -1416354905);
                b = H(b, c, d, a, x[i + 5], 21, -57434055);
                a = H(a, b, c, d, x[i + 12], 6, 1700485571);
                d = H(d, a, b, c, x[i + 3], 10, -1894986606);
                c = H(c, d, a, b, x[i + 10], 15, -1051523);
                b = H(b, c, d, a, x[i + 1], 21, -2054922799);
                a = H(a, b, c, d, x[i + 8], 6, 1873313359);
                d = H(d, a, b, c, x[i + 15], 10, -30611744);
                c = H(c, d, a, b, x[i + 6], 15, -1560198380);
                b = H(b, c, d, a, x[i + 13], 21, 1309151649);
                a = H(a, b, c, d, x[i + 4], 6, -145523070);
                d = H(d, a, b, c, x[i + 11], 10, -1120210379);
                c = H(c, d, a, b, x[i + 2], 15, 718787259);
                b = H(b, c, d, a, x[i + 9], 21, -343485551);
                a = J(a, f);
                b = J(b, g);
                c = J(c, h);
                d = J(d, j)
            }
            if (o == 16) {
                return Array(b, c)
            } else {
                return Array(a, b, c, d)
            }
        };
        var D = function(q, a, b, x, s, t) {
            return J(K(J(J(a, q), J(x, t)), s), b)
        };
        var E = function(a, b, c, d, x, s, t) {
            return D((b & c) | ((~b) & d), a, b, x, s, t)
        };
        var F = function(a, b, c, d, x, s, t) {
            return D((b & d) | (c & (~d)), a, b, x, s, t)
        };
        var G = function(a, b, c, d, x, s, t) {
            return D(b ^ c ^ d, a, b, x, s, t)
        };
        var H = function(a, b, c, d, x, s, t) {
            return D(c ^ (b | (~d)), a, b, x, s, t)
        };
        var I = function(a, b) {
            var c = L(a);
            if (c.length > 16) {
                c = C(c, a.length * n)
            }
            var d = Array(16),
            opad = Array(16);
            for (var i = 0; i < 16; i++) {
                d[i] = c[i] ^ 0x36363636;
                opad[i] = c[i] ^ 0x5C5C5C5C
            }
            var e = C(d.concat(L(b)), 512 + b.length * n);
            return C(opad.concat(e), 512 + 128)
        };
        var J = function(x, y) {
            var a = (x & 0xFFFF) + (y & 0xFFFF);
            var b = (x >> 16) + (y >> 16) + (a >> 16);
            return (b << 16) | (a & 0xFFFF)
        };
        var K = function(a, b) {
            return (a << b) | (a >>> (32 - b))
        };
        var L = function(a) {
            var b = Array();
            var c = (1 << n) - 1;
            for (var i = 0; i < a.length * n; i += n) {
                b[i >> 5] |= (a.charCodeAt(i / n) & c) << (i % 32)
            }
            return b
        };
        var M = function(a) {
            var b = "";
            var c = (1 << n) - 1;
            for (var i = 0; i < a.length * 32; i += n) {
                b += String.fromCharCode((a[i >> 5] >>> (i % 32)) & c)
            }
            return b
        };
        var N = function(a) {
            var b = l ? "0123456789ABCDEF": "0123456789abcdef";
            var c = "";
            for (var i = 0; i < a.length * 4; i++) {
                c += b.charAt((a[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + b.charAt((a[i >> 2] >> ((i % 4) * 8)) & 0xF)
            }
            return c
        };
        var O = function(a) {
            var b = "http://d2.qq.com/cp/a20160225xktl/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var c = "";
            for (var i = 0; i < a.length * 4; i += 3) {
                var d = (((a[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((a[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((a[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > a.length * 32) {
                        c += m
                    } else {
                        c += b.charAt((d >> 6 * (3 - j)) & 0x3F)
                    }
                }
            }
            return c
        };
        return u(k)
    }
};
var ExplorerManager = {
    bom: {},
    addFavorite: function(a, b) {
        a = a || location.href;
        b = b || document.title;
        try {
            if (window.sidebar) {
                window.sidebar.addPanel(b, a, '')
            } else if (document.all) {
                window.external.AddFavorite(a, b)
            } else if (window.opera && window.print) {
                return true
            }
        } catch(e) {
            alert("您的浏览器安全设置不允许该项操作")
        }
    }
}; (function() {
    var a = navigator.userAgent.toLowerCase();
    ExplorerManager.bom.isOpera = (a.indexOf("opera") != -1) ? true: false;
    ExplorerManager.bom.isTT = (a.indexOf('tencenttraveler') != -1) ? true: false;
    ExplorerManager.bom.isSafari = (a.indexOf("safari") != -1) ? true: false;
    ExplorerManager.bom.isFireFox = (a.indexOf("firefox") != -1) ? true: false;
    ExplorerManager.bom.isChrome = (a.indexOf("chrome") != -1) ? true: false;
    if (ExplorerManager.bom.isOpera) {
        ExplorerManager.bom.isIE = ExplorerManager.bom.isIE6 = ExplorerManager.bom.isIE7 = ExplorerManager.bom.isIE8 = ExplorerManager.bom.isGecko = false
    } else {
        ExplorerManager.bom.isIE = (a.indexOf("msie") != -1) ? true: false;
        ExplorerManager.bom.isIE6 = (a.indexOf("msie 6") != -1) ? true: false;
        ExplorerManager.bom.isIE7 = (a.indexOf("msie 7") != -1) ? true: false;
        ExplorerManager.bom.isIE8 = (a.indexOf("msie 8") != -1) ? true: false;
        ExplorerManager.bom.isIE9 = (a.indexOf("msie 9") != -1) ? true: false;
        if (ExplorerManager.bom.isSafari) {
            ExplorerManager.bom.isGecko = false
        } else {
            ExplorerManager.bom.isGecko = (a.indexOf("gecko") != -1) ? true: false
        }
    }
})();
var AjaxPage = function(j) {
    this.option = {
        oPage: "",
        pageId: "",
        pageNow: 1,
        pageShowNum: 5,
        pageTotal: 1,
        onChange: function(i) {
            return true
        },
        style: 0
    };
    this._AjaxPage = function(a) {
        $$.extend(this.option, a);
        if (this.option.pageNow > this.option.pageTotal) {
            this.option.pageNow = this.option.pageTotal
        }
        if (this.option.pageId.length < 1) {
            alert('请配置表单id，分页显示位置id。');
            return false
        };
        if (this.option.pageTotal > 0) {
            this.showList(this.makeList(this.option.style))
        }
    };
    this.linkFirst = function() {
        return '<a href="javascript:void(0);" class="pagepre" onclick="' + this.option.oPage + '.to(1);" >首页</a>'
    };
    this.linkFore = function(i) {
        return '<a href="javascript:void(0);" class="pagepre" onclick="' + this.option.oPage + '.to(' + i + ');" >上一页</a>'
    };
    this.linkForeNone = function() {
        return '<a href="javascript:void(0);" class="pageprenone" title="当前已经是第一页" >上一页</a>'
    };
    this.linkNum = function(i) {
        if (i * 1 == this.option.pageNow * 1) {
            return '<span class="pageprenone">' + i + '</span>'
        }
        return '<a href="javascript:void(0);" class="pagepre" onclick="' + this.option.oPage + '.to(' + i + ');" >' + i + '</a>'
    };
    this.linkNumNone = function() {
        return '<span class="pageprenone">...</span>'
    };
    this.linkNext = function(i) {
        return '<a href="javascript:void(0);" class="pagenext" onclick="' + this.option.oPage + '.to(' + i + ');">下一页</a>'
    };
    this.linkNextNone = function() {
        return '<a href="javascript:void(0);" class="pagenextnone" title=" 当前已经是最后一页">下一页</a>'
    };
    this.linkLast = function() {
        return '<a href="javascript:void(0);" class="pagenext" onclick="' + this.option.oPage + '.to(' + this.option.pageTotal + ');" >尾页</a>'
    };
    this.to = function(i) {
        if (isNaN(i) || i <= 1) {
            i = 1
        }
        if (i >= this.option.pageTotal) {
            i = this.option.pageTotal
        }
        if (this.option.onChange(i)) {
            alert(i)
        }
        this.option.pageNow = i
    };
    this.makeList = function(a) {
        var b = [];
        var c = this.option.pageNow * 1;
        var d = this.option.pageTotal * 1;
        var e = this.option.pageShowNum * 1;
        b[0] = "";
        b[1] = "";
        b[2] = "";
        b[3] = "";
        b[4] = "";
        b[5] = "";
        b[6] = "";
        b[7] = "";
        b[8] = "";
        b[1] = ' <span class="c3">' + c + '/' + d + '页</span> ';
        b[8] = ' 共' + d + '页 ';
        if (d > 5) {
            b[2] = this.linkFirst()
        }
        if (c == 1) {
            b[3] = this.linkForeNone()
        } else if (c > 1) {
            b[3] = this.linkFore(c * 1 - 1)
        };
        if (e > 0) {
            b[4] = "";
            var f = this.option.pageTotal * 1;
            if ((c - e) > 1) {
                b[4] += this.linkNumNone()
            }
            for (var i = e * ( - 1); i <= e; i++) {
                if ((c + i) >= 1 && (c + i) <= d) {
                    b[4] += this.linkNum((c + i))
                }
                f = c + i
            }
            if (f < this.option.pageTotal * 1) {
                b[4] += this.linkNumNone()
            }
        }
        if (c < d) {
            b[5] = this.linkNext(c * 1 + 1)
        } else if (c >= d) {
            b[5] = this.linkNextNone()
        }
        if (d > 5) {
            b[6] = this.linkLast()
        }
        b[7] = ' 第<input size="4" id="' + this.option.oPage + 'PageInput" onkeydown="if(event.keyCode==13) ' + this.option.oPage + '.to(this.value)" value="' + c + '" style="width:20px">页 <a href="#h" onclick="' + this.option.oPage + '.to($E(\'' + this.option.oPage + 'PageInput\').value);" style="cursor:pointer" align="absmiddle">GO</a>';
        var g = new StringBuffer();
        a += '';
        for (var i = 0; i < a.length; i++) {
            var h = a.charAt(i);
            if (b[h]) {
                g.append(b[h])
            }
        }
        if (!g.toString()) {
            for (var i = 1; i <= 7; i++) {
                g.append(b[i])
            }
        }
        return g.toString()
    };
    this.showList = function(a) {
        $E(this.option.pageId).innerHTML = a
    };
    this._AjaxPage(j)
};
var StringBuffer = function() {
    String.call(this);
    var e = arguments[0];
    if (typeof e == "undefined") {
        this._arr = []
    } else {
        if (e instanceof StringBuffer) {
            this._arr = e._arr
        } else if (e instanceof Array) {
            this._arr = e
        } else {
            this._arr = [e.toString()]
        }
    }
    if (typeof(StringBuffer._initialized) == "undefined") {
        StringBuffer.prototype.append = function(a) {
            if (this._arr.length == 0) {
                if (a instanceof StringBuffer) {
                    this._arr = a._arr
                } else if (a instanceof Array) {
                    this._arr = a
                } else {
                    this._arr = [a.toString()]
                }
            } else {
                if (a instanceof StringBuffer) {
                    var b = a._arr.length;
                    for (var i = 0; i < b; i++) {
                        this._arr[this._arr.length] = a._arr[i]
                    }
                } else if (a instanceof Array) {
                    var b = a.length;
                    for (var i = 0; i < b; i++) {
                        this._arr[this._arr.length] = a[i]
                    }
                } else {
                    this._arr[this._arr.length] = [a.toString()]
                }
            }
        };
        StringBuffer.prototype.indexOf = function(k) {
            var a = parseInt(k);
            var b = this._arr.length;
            if (isNaN(a) || a > b - 1 || a < 0) {
                return null
            }
            return this._arr[a]
        };
        StringBuffer.prototype.insert = function(k, a) {
            var b = parseInt(k);
            var c = this._arr.length;
            if (isNaN(b) || b < 0) {
                return null
            }
            if (b >= c) {
                this.append(a);
                return a
            }
            var d = [];
            for (var i = 0; i < c; i++) {
                if (i == b) {
                    if (a instanceof StringBuffer) {
                        var c = a._arr.length;
                        for (var j = 0; j < c; j++) {
                            d[d.length] = a._arr[j]
                        }
                    } else if (a instanceof Array) {
                        var c = a.length;
                        for (var j = 0; j < c; j++) {
                            d[d.length] = a[j]
                        }
                    } else {
                        d[d.length] = a
                    }
                }
                d[d.length] = this._arr[i]
            }
            this._arr = d;
            return a
        };
        StringBuffer.prototype.deleteCharAt = function(k) {
            var a = parseInt(k);
            var b = this._arr.length;
            var c = this.indexOf(a);
            if (!c) {
                return null
            }
            var d = [];
            for (var i = 0; i < b; i++) {
                if (i == a) {
                    continue
                }
                d[d.length] = this._arr[i]
            }
            this._arr = d;
            return c
        };
        StringBuffer.prototype.deleteAll = function() {
            this._arr = [];
            return this
        };
        StringBuffer.prototype.toString = function() {
            return this._arr.join(arguments[0] ? arguments[0] : "")
        };
        StringBuffer.prototype.length = function() {
            return this._arr.join("").length
        };
        StringBuffer.prototype.size = function() {
            return this._arr.join("").length
        };
        StringBuffer._initialized = true
    }
};
var HashMap = function() {
    this._data = {};
    this.clear = function() {
        delete this._data;
        this._data = {}
    };
    this.containsKey = function(a) {
        if (!a) {
            return false
        }
        for (var i in this._data) {
            if (i == a) {
                return true
            }
        }
        return false
    };
    this.containsValue = function(a) {
        if (!a) {
            return false
        }
        for (var i in this._data) {
            if (this._data[i] == a) {
                return true
            }
        }
        return false
    };
    this.entrySet = function() {
        var a = [];
        for (var b in this._data) {
            a.push({
                "key": b,
                "value": this._data[b]
            })
        }
        return a
    };
    this.equals = function(o) {
        if (o && o instanceof HashMap) {
            var a = this._data;
            var b = o._data;
            for (var c in this._data) {
                if (!o._data[c] || (o._data[c] && o._data[c] != this._data[c])) {
                    return false
                }
            }
            return true
        }
        return false
    };
    this.isEmpty = function() {
        var a = this.size();
        if (a == 0) {
            return true
        }
        return false
    };
    this.put = function(a, b) {
        if (!a || !b) {
            return false
        }
        this._data[a] = b;
        return true
    };
    this.get = function(a) {
        if (!a) {
            return null
        }
        var b = this._data[a];
        if (b) {
            return b
        }
        return null
    };
    this.size = function() {
        var i = 0;
        for (var a in this._data) {
            i++
        }
        return i
    };
    this.remove = function(a) {
        if (!a) {
            return null
        }
        var b = this._data[a];
        delete this._data[a];
        return b
    };
    this.keys = function() {
        var a = [];
        for (var b in this._data) {
            a.push(b)
        }
        return a
    };
    this.values = function() {
        var a = [];
        for (var b in this._data) {
            a.push(this._data[b])
        }
        return a
    };
    this.putAll = function(a) {
        if (a && a instanceof HashMap) {
            var b = a._data;
            for (var c in b) {
                this._data[c] = b[c]
            }
        }
    };
    this.removeAt = function(a) {
        if (isNaN(a)) {
            return null
        }
        var i = 0;
        for (var b in this._data) {
            if (i == a) {
                return this.remove(b)
            }
            i++
        }
        return null
    }
};
var MultiSelector = function(m, n, o) {
    this.option = {
        _defaultValue: [],
        _defaultFunction: []
    };
    this._init = function() {
        if (this._fillSelect()) {
            this._bindAllEvent()
        }
    };
    this._fillSelect = function() {
        if (typeof(m) == 'undefined' || typeof(n) == 'undefined') {
            return false
        }
        if (m.length == 0 || n.length == 0) {
            return false
        } {
            var c = [];
            var d = [];
            for (var i = 0; i < m.length; i++) {
                var e = [];
                $$(m[i]).find("option").each(function() {
                    var a = $$(this).val();
                    var b = $$(this).html();
                    e.push({
                        t: b,
                        v: a
                    })
                });
                c[i] = e;
                if (typeof(o) != 'undefined') {
                    if (typeof(o) == 'function') {
                        if (i == m.length - 1) {
                            d[i] = o
                        } else {
                            d[i] = null
                        }
                    } else {
                        if (o && o instanceof Array && o.length > 0 && typeof(o[i]) == 'function') {
                            d[i] = o[i]
                        } else {
                            d[i] = null
                        }
                    }
                } else {
                    d[i] = null
                }
            }
            this.option._defaultValue = c;
            this.option._defaultFunction = d
        } {
            var f = this._getOptionStr(m[0], n);
            $$(m[0]).html(f)
        }
        return true
    };
    this._bindAllEvent = function() {
        var l = this;
        for (var i = 0; i < m.length; i++) {
            $$(m[i]).unbind('change').change(function(e) {
                var a = m.indexOf(this);
                if (a < 0) {
                    alert('dom输入错误，请检查select_dom_array中的值');
                    return
                } {
                    for (var k = a + 1; k < m.length; k++) {
                        var b = l._getOptionStr(m[k], []);
                        $$(m[k]).html(b)
                    }
                } {
                    var c = a + 1;
                    if (m[c]) {
                        var d = l.findNextArray(this, $$(this).val());
                        if (d) {
                            var b = l._getOptionStr(m[c], d);
                            $$(m[c]).html(b)
                        }
                    }
                }
                if (l.option._defaultFunction[a]) {
                    var f = {};
                    for (var j = 0; j < m.length; j++) {
                        var g = {
                            t: "",
                            v: ""
                        };
                        var h = $$(m[j]).find("option:selected");
                        if (h) {
                            g = {
                                t: h.html(),
                                v: h.val()
                            }
                        }
                        f[m[j]] = g
                    }
                    l.option._defaultFunction[a](f)
                }
            })
        }
    };
    this._getOptionStr = function(a, b) {
        var c = new StringBuffer();
        var d = m.indexOf(a);
        var e = this.option._defaultValue[d].concat(b);
        for (var i = 0; i < e.length; i++) {
            c.append('<option value=' + e[i].v + '>' + e[i].t + '</option>')
        }
        return c.toString()
    };
    this.findNextArray = function(c, d) {
        var e = m.indexOf(c);
        if (e < 0) {
            alert('id输入错误，请检查select_dom_array中的值');
            return []
        }
        var f = [];
        var g = function(a, b) {
            for (var i = 0; i < b.length; i++) {
                if (a == e && b[i].v == d) {
                    f = b[i].opt_data_array;
                    return
                }
                if (b[i].opt_data_array && b[i].opt_data_array instanceof Array) {
                    a++;
                    g(a, b[i].opt_data_array);
                    a--
                }
            }
        };
        g(0, n);
        return f
    };
    this._init()
};MultiSelector.create = function(a, b, c) {
    var d = new MultiSelector(a, b, c);
    return d
};
var FormManager = {
    option: {
        contextId: ''
    },
    _initContextId: function(a) {
        var b = '';
        if (typeof(a) == 'string') {
            b = '#' + a
        } else if (typeof(a) == 'object' && a) {
            b = a
        } else {
            if (this.option.contextId) {
                b = this.option.contextId
            } else {
                b = document
            }
        }
        if (!b) {
            b = document
        }
        this.option.contextId = b
    },
    init: function(a) {
        var b = '';
        if (typeof(a) == 'object' && a.contextId) {
            b = a.contextId
        } else if (typeof(a) == 'string' && a.constructor == String) {
            b = a
        }
        this._initContextId(b)
    },
    getInputValueByName: function(a, b) {
        var c = this.getAllInputValue(b);
        if (c) {
            return c[a] || ''
        }
        return ''
    },
    getAllInputValue: function(e) {
        this._initContextId(e);
        var f = this.option.contextId;
        if (!f) {
            alert('请设置表单作用域');
            return null
        }
        var g = {};
        $$(f).find(':input').each(function() {
            var a = $$(this).attr("name");
            var b = $$(this).val();
            if (!a) {
                return
            }
            var c = false;
            switch (this.tagName.toLowerCase()) {
            case 'select':
                {
                    c = true;
                    break
                }
            case 'textarea':
                {
                    c = true;
                    break
                }
            case 'input':
                {
                    var d = $$(this).attr('type');
                    d = d ? d.toLowerCase() : 'text';
                    switch (d) {
                    case 'radio':
                        {
                            if ($$(this).is(":checked")) {
                                c = true
                            }
                            break
                        }
                    case 'checkbox':
                        {
                            if ($$(this).is(":checked")) {
                                c = true
                            }
                            break
                        }
                    case 'button':
                        {
                            break
                        }
                    default:
                        {
                            c = true;
                            break
                        }
                    }
                    break
                }
            }
            if (c) {
                if (typeof(g[a]) == 'undefined') {
                    g[a] = b
                } else {
                    if (g[a].constructor == Array) {
                        if (b.constructor == Array) {
                            g[a] = g[a].concat(b)
                        } else {
                            g[a].push(b)
                        }
                    } else {
                        if (b.constructor == Array) {
                            g[a] = [g[a]].concat(b)
                        } else {
                            g[a] = [g[a], b]
                        }
                    }
                }
            }
        });
        return g
    },
    setAllInputValue: function(f, g) {
        if (!f) {
            return false
        }
        this._initContextId(g);
        var h = this.option.contextId;
        if (!h) {
            alert('请设置表单作用域');
            return false
        }
        $$(h).find(':input').each(function() {
            var a = $$(this).attr("name");
            if (!a) {
                return
            }
            var b = f[a];
            if (typeof(b) != 'undefined') {
                if (typeof(b) == 'string' || typeof(b) == 'number' || typeof(b) == 'boolean') {
                    b = b.toString()
                }
                if (b.constructor == Array) {
                    b = b.join('|')
                }
            } else {
                b = ''
            }
            if (!b || b.constructor != String) {
                return
            }
            if (this.tagName.toLowerCase() == 'input') {
                var c = $$(this).attr('type');
                c = c ? c.toLowerCase() : 'text';
                switch (c) {
                case 'radio':
                case 'checkbox':
                    {
                        var d = $$(this).val();
                        if (!d) {
                            return
                        }
                        if (('|' + b + '|').indexOf('|' + d + '|') >= 0) {
                            $$(this).attr('checked', 'checked')
                        } else {
                            $$(this).removeAttr('checked')
                        }
                        return
                    }
                case 'button':
                    {
                        return
                    }
                }
            } else if (this.tagName.toLowerCase() == 'select') {
                if ($$(this).attr("multiple")) {
                    var e = b.split('|');
                    $$(this).find("option:selected").each(function() {
                        $$(this).removeAttr('selected')
                    });
                    for (var i = 0; i < e.length; i++) {
                        if (e[i]) {
                            $$(this).find("option[value='" + e[i] + "']").attr('selected', 'selected')
                        }
                    }
                    return
                }
            }
            $$(this).val(b)
        });
        return true
    }
};
var FloaterManager = function(n) {
    this.option = {
        'type': 'html',
        'width': 400,
        'height': 200,
        'border': 1,
        'isShowHeader': true,
        'isShowClose': true,
        'isAlignCenter': true,
        'isCanMove': true,
        'title': '标题',
        'content': '内容',
        'isAlignTop': false,
        'onOpenEvent': function() {
            return false
        },
        'onCloseEvent': function() {
            return false
        },
        'onAllCloseEvent': function() {
            return false
        },
        'isShowCover': true,
        'coverColor': '#E6F5FF',
        'styleStr': '',
        'style': '0'
    };
    this.config = {
        'id': '',
        'domobj_': null
    };
    var o = this;
    this.setOption = function(a) {
        if (a) {
            FloaterManager.tool.extend(o.option, a)
        }
        if (!o.option.isShowHeader) {
            o.option.title = '';
            o.option.isShowClose = false
        }
    };
    this.setConfig = function(a) {
        FloaterManager.tool.extend(o.config, a)
    };
    this._html = function() {
        var a = '';
        var b = o.option;
        if (b.type == 'html') {
            if (b.isShowHeader) {
                a += '<div class="floater_head">';
                a += '<div class="floater_title">' + b.title + '</div>';
                if (b.isShowClose) {
                    a += '<div class="close" onclick="FloaterManager.comm.close(\'' + o.config.id + '\');">关闭</div>'
                }
                a += '</div>'
            }
            a += '<div class="floater_content" style="overflow:hidden;">' + b.content + '</div>'
        } else if (b.type == 'url') {
            if (b.isShowHeader) {
                a += '<div class="floater_head">';
                a += '<div class="floater_title">' + b.title + '</div>';
                if (b.isShowClose) {
                    a += '<div class="close" onclick="FloaterManager.comm.close(\'' + o.config.id + '\');">关闭</div>'
                }
                a += '</div>'
            }
            a += '<div class="floater_content" style="overflow:hidden;"><iframe frameborder="0" width="100%" height="100%" style="margin:0px;" src="' + b.content + '"  scrolling="no"></iframe></div>'
        } else if (b.type == 'dom') {} else {
            alert('option.type设置错误！')
        }
        return a
    };
    this._addContent = function() {
        var a = o.option;
        var b = {
            'display': 'block',
            'position': 'absolute',
            'z-index': 1000 + o.config.id,
            'overflow-x': 'hidden'
        }; {
            if (!FloaterManager.tool.bom.isIE && a.border > 0) {
                b['width'] = a.width - a.border * 2;
                b['height'] = a.height - a.border * 2
            } else {
                b['width'] = a.width;
                b['height'] = a.height
            }
            if (b['height'] <= 0) {
                b['height'] = 'auto';
                b['overflow-y'] = 'auto'
            } else {
                b['overflow-y'] = 'hidden'
            }
        } {
            if (a.border > 0) {
                b['border-style'] = 'solid';
                b['border-width'] = a.border + 'px'
            } else {
                b['border'] = 'none'
            }
        }
        if (!document.getElementById('#coverdiv_' + o.config.id)) {
            var c = document.getElementsByTagName('body');
            if (!c || c.length == 0) {
                alert('未找到页面body元素');
                return
            }
            c = c[0];
            var d = document.createElement('div');
            d.setAttribute('id', 'coverdiv_' + o.config.id);
            if (!c.hasChildNodes()) {
                c.appendChild(d)
            } else {
                c.insertBefore(d, c.firstChild)
            }
        }
        FloaterManager.tool.setStyle(document.getElementById('coverdiv_' + o.config.id), b);
        document.getElementById('coverdiv_' + o.config.id).innerHTML = o._html();
        FloaterManager.tool.setAlignCenter(document.getElementById('coverdiv_' + o.config.id))
    };
    this._setStyleStr = function() {
        var a = '';
        if (o.option.styleStr) {
            a = o.option.styleStr
        } else {
            var b = o.option.style;
            if (b == 1) {
                a += '#coverdiv_' + o.config.id + ' {background-color:#FFFFFF; border-color:#99C2EE;}							 #coverdiv_' + o.config.id + ' .floater_head {background-image:url(http://ossweb-img.qq.com/images/comm/login_headbg_img.gif); background-repeat:repeat-x; height:29px; font-weight:bold; font-size:12px; border-bottom:solid 1px #438ECE;}							 #coverdiv_' + o.config.id + ' .floater_head .floater_title {color: #333333; line-height:25px; float:left; width:auto;  font-size: 14px;font-weight: bold;text-indent: 0px;text-align: left; padding-left: 10px;}							 #coverdiv_' + o.config.id + ' .floater_head .close { float: right;height: 20px;width: 20px; margin:5px 5px 0px auto; background:url(http://imgcache.qq.com/ptlogin/v4/style/0/images/icons.gif) no-repeat 0 -284px; cursor: pointer; text-indent:-99999px; overflow:hidden;}							 #coverdiv_' + o.config.id + ' .floater_content {margin:8px; font-size:10pt; background:none;}							 #coverdiv_' + o.config.id + ' .floater_content li.button button, #coverdiv_' + o.config.id + ' input.button  {text-align:center; margin-left:5px; border:0; background:url(http://imgcache.qq.com/ptlogin/v4/style/0/images/icons.gif) no-repeat -102px -130px; color: #2473A2; width:103px; height:28px; cursor:pointer; font-weight:bold; font-size:14px;}'
            } else if (b == 2) {
                a += '#coverdiv_' + o.config.id + ' {padding:0px;}							 #coverdiv_' + o.config.id + ' .floater_content {margin:0px; text-align:center;}							 #coverdiv_' + o.config.id + ' .floater_content input.button { padding:2px 5px;}							 #coverdiv_' + o.config.id + ' .floater_content button.button { padding:2px 5px;}'
            } else {
                a += '#coverdiv_' + o.config.id + ' {background-color:#FFFFFF; border-color:#B0CDEA;}							 #coverdiv_' + o.config.id + ' .floater_head {background-color:#e6f5ff; height:25px; width:100%;}							 #coverdiv_' + o.config.id + ' .floater_head .floater_title {float:left; font-weight:700; line-height:25px; padding-left:8px; font-size:14px; color: #333333;}							 #coverdiv_' + o.config.id + ' .floater_head .close {color:#8CC0E7; float: right;height: 25px;width: 30px; margin-right:8px; text-align:right; cursor: pointer; line-height:25px; font-weight:bold; font-size:12px;}							 #coverdiv_' + o.config.id + ' .floater_content {margin:8px;}							 #coverdiv_' + o.config.id + ' .floater_content input.button { padding:2px 5px;}							 #coverdiv_' + o.config.id + ' .floater_content button.button { padding:2px 5px;}'
            }
        }
        if (!document.getElementById('floaterStyleContent_' + o.config.id)) {
            var c = document.createElement('style');
            c.setAttribute('id', 'floaterStyleContent_' + o.config.id);
            c.setAttribute('type', 'text/css');
            c.setAttribute('media', 'screen');
            var d = document.getElementsByTagName('body');
            if (!d || d.length == 0) {
                alert('未找到页面body元素');
                return
            }
            d = d[0];
            if (!d.hasChildNodes()) {
                d.appendChild(c)
            } else {
                d.insertBefore(c, d.firstChild)
            }
        }
        var c = document.getElementById('floaterStyleContent_' + o.config.id);
        if (c.styleSheet) {
            c.styleSheet.cssText = a
        } else if (document.getBoxObjectFor) {
            c.innerHTML = a
        } else {
            c.appendChild(document.createTextNode(a))
        } {
            var e = document.getElementById('coverdiv_' + o.config.id);
            var f = e.getElementsByTagName('*');
            var g = null;
            var h = null;
            for (var i = 0; i < f.length; i++) {
                if (!g && f[i].className == 'floater_head') {
                    g = f[i]
                }
                if (!h && f[i].className == 'floater_content') {
                    h = f[i]
                }
            }
            if (o.option.height > 0) {
                var j = parseInt((FloaterManager.tool.getStyle(g, 'height') || '0'), 10);
                var k = parseInt((FloaterManager.tool.getStyle(h, 'margin') || '0'), 10) * 2;
                if (!j || isNaN(j)) {
                    j = 0
                }
                if (!k || isNaN(k)) {
                    k = 0
                }
                var l = o.option.height - j - k - o.option.border * 2;
                if (!FloaterManager.tool.bom.isIE) {
                    l -= 17
                }
                FloaterManager.tool.setStyle(h, {
                    'height': l + 'px'
                })
            }
            if (o.option.width > 0) {
                var k = parseInt((FloaterManager.tool.getStyle(h, 'margin') || '0'), 10) * 2;
                if (!k || isNaN(k)) {
                    k = 0
                }
                var m = o.option.width - k - o.option.border * 2;
                if (!FloaterManager.tool.bom.isIE) {
                    m -= 17
                }
                FloaterManager.tool.setStyle(h, {
                    'width': m + 'px'
                })
            }
        }
    };
    this.show = function(h) {
        if (typeof(h) == 'object' && h) {
            FloaterManager.tool.extend(o.option, h)
        } {
            if (o.option.type == 'dom') {
                o._showDialog(o.option.content);
                return
            }
        }
        var j = function() {
            FloaterManager.comm.addFloater(o);
            o._addContent();
            o._setStyleStr();
            if (o.option.isCanMove) {
                var d = document.getElementById('coverdiv_' + o.config.id);
                var e = d.getElementsByTagName('*');
                var f = null;
                for (var i = 0; i < e.length; i++) {
                    if (!f && e[i].className == 'floater_head') {
                        f = e[i];
                        break
                    }
                }
                FloaterManager.setMoveEvent(f, o)
            }
            if (o.option.isAlignTop) {
                FloaterManager.comm.setFloaterTopById(o.config.id)
            }
            o.option.onOpenEvent();
            if (o.option.isAlignCenter) {
                var g = function() {
                    var a = FloaterManager.comm.option.ALL_FLOATER;
                    var b = false;
                    for (var i = 0; i < a.length; i++) {
                        var c = a[i];
                        if (c.option.isAlignCenter) {
                            FloaterManager.tool.setAlignCenter(document.getElementById('coverdiv_' + c.config.id));
                            b = true
                        }
                    }
                    if (!b) {
                        FloaterManager.tool.unbind(window, 'resize', g);
                        FloaterManager.tool.unbind(window, 'scroll', g)
                    }
                };
                FloaterManager.tool.bind(window, 'resize', g);
                FloaterManager.tool.bind(window, 'scroll', g);
                g()
            }
        };
        if (o.option.isShowCover) {
            FloaterManager.cover.show(function() {
                j()
            },
            o.option.coverColor)
        } else {
            j()
        }
    };
    this.close = function(a) {
        if (typeof(a) == 'function') {
            var b = {};
            FloaterManager.tool.extend(b, o.option);
            FloaterManager.tool.extend(b, o.config);
            if (a(b)) {
                return
            }
        } {
            if (o.option.type == 'dom') {
                o._closeDialog();
                return
            }
        }
        var c = document.getElementById('coverdiv_' + o.config.id);
        var d = document.getElementById('floaterStyleContent_' + o.config.id);
        if (c) {
            c.parentNode.removeChild(c)
        }
        if (d) {
            d.parentNode.removeChild(d)
        }
        o.option.onCloseEvent();
        FloaterManager.comm.deleteFloaterById(o.config.id);
        if (FloaterManager.comm.getFloaterNum() <= 0) {
            FloaterManager.cover.hide(function() {
                o.option.onAllCloseEvent()
            })
        }
    };
    this._showDialog = function(h) {
        if (h) {
            var j = (typeof(h) == 'object') ? h: document.getElementById(h);
            o.config.domobj_ = j
        }
        var j = o.config.domobj_;
        if (!j) {
            alert('未设置要显示的对象或ID');
            return
        }
        var l = function() {
            {
                var d = FloaterManager.tool.bom.isIE6;
                if (d) {
                    var e = j.getElementsByTagName('select');
                    if (e.length > 0) {
                        for (var i = 0; i < e.length; i++) {
                            if (FloaterManager.cover.option.allSelectDisplayList) {
                                for (var k = 0; k < FloaterManager.cover.option.allSelectDisplayList.length; k++) {
                                    var f = FloaterManager.cover.option.allSelectDisplayList[k];
                                    if (f.dom == e[i]) {
                                        e[i].style.display = f.display
                                    }
                                }
                            }
                        }
                    }
                }
            }
            j.style.visibility = "visible";
            j.style.position = "absolute";
            j.style.display = 'block';
            FloaterManager.tool.setAlignCenter(j);
            if (o.option.isAlignCenter) {
                var g = function() {
                    var a = FloaterManager.comm.option.ALL_FLOATER;
                    var b = false;
                    for (var i = 0; i < a.length; i++) {
                        var c = a[i];
                        if (c.option.isAlignCenter && c.config.domobj_) {
                            FloaterManager.tool.setAlignCenter(c.config.domobj_);
                            b = true
                        }
                    }
                    if (!b || FloaterManager.comm.getFloaterNum() <= 0) {
                        FloaterManager.tool.unbind(window, 'resize', g);
                        FloaterManager.tool.unbind(window, 'scroll', g)
                    }
                };
                FloaterManager.tool.bind(window, 'resize', g);
                FloaterManager.tool.bind(window, 'scroll', g)
            }
            FloaterManager.comm.addFloater(o);
            FloaterManager.comm.setFloaterTopById(o.config.id);
            o.option.onOpenEvent()
        };
        if (o.option.isShowCover) {
            FloaterManager.cover.show(function() {
                l()
            },
            o.option.coverColor)
        } else {
            l()
        }
    };
    this._closeDialog = function() {
        var a = o.config.domobj_;
        a.style.display = 'none';
        o.option.onCloseEvent();
        FloaterManager.comm.deleteFloaterById(o.config.id);
        if (FloaterManager.comm.getFloaterNum() <= 0) {
            FloaterManager.cover.hide(function() {
                o.option.onAllCloseEvent()
            })
        }
    }; {
        this.alert = function(a) {
            if (typeof(a) == "undefined" || !a) {
                a = {}
            } else if (typeof(a) == "string") {
                a = {
                    'content': a,
                    'title': '警告',
                    'width': 265,
                    'height': -1
                }
            }
            a.content = a.content ? a.content: '&nbsp;';
            a.title = a.title ? a.title: '提示信息';
            a.isShowClose = false;
            a.isAlignTop = true;
            a.width = a.width ? a.width: 265;
            a.height = a.height ? a.height: -1;
            if (arguments.length == 2) {
                var b = arguments[1];
                if (typeof(b) == 'function') {
                    a.onCloseEvent = b
                }
            }
            var c = '<div class="alertcontentstyle">';
            c += '<div style="font-size:12px;">' + a.content + '</div>';
            c += '<div style="text-align:center; line-height:30px; margin-top:10px;"><input type="button" onclick="FloaterManager.comm.close(\'' + o.config.id + '\');" class="button" value="确定" /></div></div>';
            a.content = c;
            o.show(a)
        };
        this.confirm = function(a, b) {
            if (typeof(b) == "undefined" || !b) {
                b = {}
            }
            b.content = b.content ? b.content: '您确认该操作吗？';
            b.title = b.title ? b.title: '确认该操作';
            b.isShowClose = false;
            b.isAlignTop = true;
            b.width = b.width ? b.width: 265;
            b.height = b.height ? b.height: -1;
            var c = Math.floor(Math.random() * 1000);
            var d = '<div class="alertcontentstyle">';
            d += '<div style="font-size:12px;">' + b.content + '</div>';
            d += '<div style="text-align:center; line-height:30px; margin-top:10px;"><input type="button" id="confirmButton_' + c + '" class="button" value="确定" /><input type="button" onclick="FloaterManager.comm.close(\'' + o.config.id + '\');" class="button" value="取消" /></div></div>';
            b.content = d;
            o.show(b);
            $$("#confirmButton_" + c).click(function() {
                if (!a()) {
                    o.close()
                }
            })
        };
        this.ajaxLoading = function(a, b) {
            var c = '<div style="text-align:left; border:#39F 1px solid; background-color:#CFF; padding:10px 20px; white-space:nowrap; display:block; margin:0px;">';
            c += '<img src="http://ossweb-img.qq.com/images/comm/load.gif" style="width:16px; height:16px;" />';
            c += '<span style=" margin-left:5px; font-size:12px; display:inline-table; vertical-align:middle; color:#222222;">' + a + '</span>';
            c += '</div>';
            var d = {};
            d.content = c;
            d.style = 2;
            d.border = 0;
            d.isCanMove = false;
            d.isShowHeader = false;
            d.isAlignTop = true;
            d.width = '';
            d.height = -1;
            o.show(d);
            if (typeof(b) != "undefined" && !isNaN(b) && (b * 1 > 0)) {
                window.setTimeout(function() {
                    o.close()
                },
                b)
            }
        }
    }
    this._Floater = function(a) {
        if (a) {
            FloaterManager.tool.extend(o.option, a)
        }
        if (!o.config.id) {
            o.config.id = FloaterManager.comm.getId() * 1
        }
        if (!o.option.isShowHeader) {
            o.option.title = '';
            o.option.isShowClose = false
        }
        if (!o.option.isShowHeader) {
            o.option.isCanMove = false
        }
    };
    this._Floater(n)
}; {
    FloaterManager.init = function(a, b) {
        FloaterManager.comm.option.isOnlyoneFloater = typeof(b) != 'undefined' ? b: true;
        if (FloaterManager.comm.option.isOnlyoneFloater && FloaterManager.comm.getFloaterNum() > 0) {
            for (var i = 0; i < FloaterManager.comm.option.ALL_FLOATER.length; i++) {
                FloaterManager.comm.option.ALL_FLOATER[i].close()
            }
        }
        return new FloaterManager(a)
    };
    FloaterManager.comm = {
        option: {
            isOnlyoneFloater: true,
            ALL_FLOATER: [],
            maxId: 0
        },
        getId: function() {
            return++this.option.maxId
        },
        addFloater: function(a) {
            this.option.ALL_FLOATER.push(a);
            return this.option.ALL_FLOATER.length
        },
        deleteFloaterById: function(a) {
            var b = false;
            for (var i = 0; i < this.option.ALL_FLOATER.length; i++) {
                var c = this.option.ALL_FLOATER[i].config.id;
                if (c == a) {
                    this.option.ALL_FLOATER[i] = null;
                    b = true;
                    break
                }
            }
            if (b) {
                var d = [];
                for (var i = 0; i < this.option.ALL_FLOATER.length; i++) {
                    var e = this.option.ALL_FLOATER[i];
                    if (e) {
                        d.push(e)
                    }
                }
                this.option.ALL_FLOATER = d
            }
            return this.option.ALL_FLOATER.length
        },
        getAllFloater: function() {
            return this.option.ALL_FLOATER || []
        },
        getFloaterById: function(a) {
            for (var i = 0; i < this.option.ALL_FLOATER.length; i++) {
                var b = this.option.ALL_FLOATER[i].config.id;
                if (b == a) {
                    return this.option.ALL_FLOATER[i]
                }
            }
            return null
        },
        setFloaterTopById: function(a) {
            var b = 10000;
            var c = 1000; {
                for (var i = 0; i < this.option.ALL_FLOATER.length; i++) {
                    var d = this.option.ALL_FLOATER[i];
                    var e = d.config.id;
                    var f = 0;
                    if (d.option.type == 'dom') {
                        var g = null;
                        if (typeof(d.option.content) == 'object') {
                            g = d.option.content
                        } else if (typeof(d.option.content) == 'string') {
                            g = document.getElementById(d.option.content)
                        }
                        f = FloaterManager.tool.getStyle(g, 'z-index')
                    } else {
                        f = FloaterManager.tool.getStyle(document.getElementById("coverdiv_" + e), 'z-index')
                    }
                    if (!f || isNaN(f)) {
                        f = 0
                    }
                    if (f * 1 > 10000) {
                        if (f * 1 > b) {
                            b = f * 1
                        }
                    } else {
                        if (f * 1 > c) {
                            c = f * 1
                        }
                    }
                }
            } {
                var h = 0;
                var d = this.getFloaterById(a);
                var j = null;
                if (d.option.type == 'dom') {
                    var g = null;
                    if (typeof(d.option.content) == 'object') {
                        j = d.option.content
                    } else if (typeof(d.option.content) == 'string') {
                        j = document.getElementById(d.option.content)
                    }
                    h = FloaterManager.tool.getStyle(j, 'z-index')
                } else {
                    j = document.getElementById("coverdiv_" + a);
                    h = FloaterManager.tool.getStyle(j, 'z-index')
                }
                if (!h || isNaN(h)) {
                    h = 0
                }
                var k = h * 1;
                if (d.option.isAlignTop) {
                    if (h * 1 < 10000) {
                        k = this.getId() + 10000
                    }
                } else {
                    if (h * 1 < 1000) {
                        k = this.getId() + 1000
                    }
                }
                if (k > 10000) {
                    if (k * 1 < b) {
                        k = b
                    }
                } else {
                    if (k * 1 < c) {
                        k = c
                    }
                }
                var l = FloaterManager.tool.getStyle(j, 'z-index') || '0';
                if (l * 1 != k) {
                    FloaterManager.tool.setStyle(j, {
                        'z-index': k * 1 + 1
                    })
                }
            }
        },
        getFloaterNum: function() {
            return this.option.ALL_FLOATER.length
        },
        close: function(a) {
            var b = this.getFloaterById(a);
            if (!b) {
                return
            }
            b.close()
        }
    };
    FloaterManager.close = function(a) {
        var b = FloaterManager.comm.getAllFloater();
        for (var i = 0; i < b.length; i++) {
            var c = b[i];
            if (c instanceof FloaterManager) {
                c.close(a)
            }
        }
    };
    FloaterManager.setMoveEvent = function(g, h) {
        var i = h.config.id;
        if (!document.getElementById("coverdiv_" + i)) {
            return
        }
        var j = document.getElementById("coverdiv_" + i);
        var k = null;
        var l = null;
        var m = null;
        FloaterManager.tool.bind(g, 'mousedown',
        function(e) {
            {
                FloaterManager.comm.setFloaterTopById(i)
            }
            e = window.event ? window.event: e;
            var a = parseInt(FloaterManager.tool.getStyle(document.getElementById("coverdiv_" + i), 'top'), 10);
            var b = parseInt(FloaterManager.tool.getStyle(document.getElementById("coverdiv_" + i), 'left'), 10);
            l = {
                x: e.clientX,
                y: e.clientY
            };
            m = {
                x: a,
                y: b
            };
            j.setCapture ? j.setCapture() : function() {};
            j.onmousemove = n;
            j.onmouseup = o
        });
        var n = function(a) {
            k = window.event ? window.event: a;
            if (FloaterManager.tool.bom.isIE) {
                if (k.button != 1) {
                    o(k);
                    FloaterManager.tool.unbind(j, 'mousemove', n);
                    FloaterManager.tool.unbind(j, 'mouseup', o);
                    return
                }
            }
            var b = parseInt(FloaterManager.tool.getStyle(j, 'top'), 10);
            var c = parseInt(FloaterManager.tool.getStyle(j, 'left'), 10);
            m = {
                x: c,
                y: b
            };
            var d = k.clientX - l["x"] + m['x'];
            var e = k.clientY - l["y"] + m['y'];
            var f = document.body.clientWidth - parseInt(FloaterManager.tool.getStyle(j, 'width'), 10);
            if (f > 0) {
                d = d > f ? f: d
            }
            d = d < 0 ? 0 : d;
            e = e < 0 ? 0 : e;
            j.style.left = d + "px";
            j.style.top = e + "px";
            l = {
                x: k.clientX,
                y: k.clientY
            };
            return false
        };
        var o = function(a) {
            k = window.event ? window.event: a;
            j.onmousemove = null;
            j.onmouseup = null;
            if (k.clientX < 1 || k.clientY < 1 || k.clientX > document.body.clientWidth || k.clientY > document.body.clientHeight) {}
            j.releaseCapture ? j.releaseCapture() : function() {}
        }
    };
    FloaterManager.tool = {
        bom: (function() {
            var a = {};
            a.isIE = ((navigator.userAgent.indexOf('MSIE') == -1) ? false: true);
            a.isIE6 = ((a.isIE && !window.XMLHttpRequest && window.ActiveXObject) ? true: false);
            a.isFireFox = ((navigator.userAgent.toLowerCase().indexOf('firefox') == -1) ? false: true);
            return a
        })(),
        getStyle: function(a, b) {
            var c = (b == 'float' ? (typeof a.style.styleFloat != 'undefined' ? 'styleFloat': 'cssFloat') : b);
            String.prototype.camelize = function() {
                return this.replace(/\-(\w)/ig,
                function(B, A) {
                    return A.toUpperCase()
                })
            };
            var d = a.style[c.camelize()];
            if (!d) {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    var e = document.defaultView.getComputedStyle(a, null);
                    d = e ? e.getPropertyValue(b) : null
                } else if (a.currentStyle) {
                    d = a.currentStyle[c.camelize()]
                }
            }
            return d
        },
        setStyle: function(a, b) {
            String.prototype.camelize = function() {
                return this.replace(/\-(\w)/ig,
                function(B, A) {
                    return A.toUpperCase()
                })
            };
            for (var i in b) {
                if (i) {
                    a.style[i.camelize()] = b[i]
                }
            }
            return true
        },
        getStyleStr: function(a) {
            var b = [];
            for (var i in a) {
                if (i) {
                    b.push(i + ':' + a[i] + ';')
                }
            }
            return b.join(' ')
        },
        extend: function(a, b) {
            if (typeof(b) == 'object') {
                for (var i in b) {
                    a[i] = b[i]
                }
            }
            return a
        },
        bind: function(a, b, c) {
            if (a.addEventListener) {
                a.addEventListener(b, c, false)
            } else if (a.attachEvent) {
                a.attachEvent('on' + b, c)
            } else {
                a['on' + b] = c
            }
        },
        unbind: function(a, b, c) {
            if (a.removeEventListener) {
                a.removeEventListener(b, c, false)
            } else if (a.detachEvent) {
                a.detachEvent('on' + b, c)
            } else {
                a['on' + b] = null
            }
        },
        getY: function(e) {
            var t = e.offsetTop;
            while (e = e.offsetParent) t += e.offsetTop;
            return t
        },
        getMaxWidth: function() {
            var a = function() {
                var w = null;
                if (window.innerWidth && window.scrollMaxX) {
                    w = window.innerWidth + window.scrollMaxX
                } else if (document.body.scrollWidth > document.body.offsetWidth) {
                    w = document.body.scrollWidth
                } else {
                    w = document.body.offsetWidth
                }
                return w
            };
            var b = function() {
                return (window.innerWidth) ? window.innerWidth: (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth: document.body.offsetWidth
            };
            return (a() > b() ? a() : b())
        },
        getMaxHeight: function() {
            var a = function() {
                var h = null;
                if (window.innerHeight && window.scrollMaxY) {
                    h = window.innerHeight + window.scrollMaxY
                } else if (document.body.scrollHeight > document.body.offsetHeight) {
                    h = document.body.scrollHeight
                } else {
                    h = document.body.offsetHeight
                }
                return h
            };
            var b = function() {
                return (window.innerHeight) ? window.innerHeight: (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight: document.body.offsetHeight
            };
            return (a() > b() ? (a()) : (b() * 1 - 4))
        },
        setAlignCenter: function(a) {
            if (!a) {
                return
            }
            var b = function() {
                return (window.innerWidth) ? window.innerWidth: (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth: document.body.offsetWidth
            };
            var c = function() {
                return (window.innerHeight) ? window.innerHeight: (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight: document.body.offsetHeight
            };
            a.style.margin = '0px';
            a.style.left = (b() / 2 - a.clientWidth / 2) + "px";
            var d = document.body.scrollTop || document.documentElement.scrollTop;
            var f = c() / 2 + d - a.clientHeight / 2;
            var g = 0;
            try {
                if (d == 0 && window.parent && window.parent != window.self) {
                    var h = function() {
                        return (window.parent.innerHeight) ? window.parent.innerHeight: (window.parent.document.documentElement && window.parent.document.documentElement.clientHeight) ? window.parent.document.documentElement.clientHeight: window.parent.document.body.offsetHeight
                    };
                    var j = window.parent.document.body.scrollTop || window.parent.document.documentElement.scrollTop;
                    var k = h() / 2 + j - a.clientHeight / 2;
                    var l = window.location.href;
                    var m = window.parent.document.getElementsByTagName('iframe');
                    var n = null;
                    if (m && m.length > 0) {
                        for (var i = 0; i < m.length; i++) {
                            if (m[i].src && l.indexOf(m[i].src) >= 0) {
                                n = m[i];
                                break
                            }
                        }
                    }
                    var o = 0;
                    if (n) {
                        o = this.getY(n)
                    }
                    if (k > o) {
                        f = k - o
                    } else {
                        f = 0
                    }
                }
            } catch(e) {}
            if (f > (this.getMaxHeight() - a.clientHeight)) {
                f = this.getMaxHeight() - a.clientHeight - 10
            }
            if (f <= 0) {
                f = 0
            }
            a.style.top = f + 'px'
        }
    };
    FloaterManager.cover = {
        option: {
            alpha: 50,
            overflowX: '',
            allSelectDisplayList: null,
            timeInterval: null
        },
        show: function(a, b) {
            var c = this.createBackground(b);
            if (c) {
                var d = document.body;
                this.option.overflowX = d.style.overflowX;
                FloaterManager.tool.setStyle(d, {
                    overflowX: 'hidden'
                }); {
                    var e = FloaterManager.tool.bom.isIE6;
                    if (e) {
                        var f = document.getElementsByTagName('select');
                        if (f.length > 0) {
                            FloaterManager.cover.option.allSelectDisplayList = [];
                            for (var i = 0; i < f.length; i++) {
                                var g = f[i];
                                FloaterManager.cover.option.allSelectDisplayList.push({
                                    'dom': g,
                                    'display': g.style.display
                                });
                                g.style.display = 'none'
                            }
                        }
                    }
                }
                FloaterManager.tool.setStyle(c, {
                    'display': 'block'
                });
                if (typeof(a) == 'function') {
                    a()
                }
                if (typeof(FloaterManager.cover.adjust) == 'function') {
                    this.option.timeInterval = setInterval(function() {
                        FloaterManager.cover.adjust()
                    },
                    50)
                }
            }
        },
        hide: function(a) {
            var b = document.getElementById('coverbg');
            if (b) {
                var c = document.body;
                c.style.overflowX = this.option.overflowX;
                FloaterManager.tool.setStyle(b, {
                    'display': 'none'
                }); {
                    var d = FloaterManager.tool.bom.isIE6;
                    if (d) {
                        if (FloaterManager.cover.option.allSelectDisplayList) {
                            for (var i = 0; i < FloaterManager.cover.option.allSelectDisplayList.length; i++) {
                                var e = FloaterManager.cover.option.allSelectDisplayList[i];
                                e.dom.style.display = e.display
                            }
                            FloaterManager.cover.option.allSelectDisplayList = null
                        }
                    }
                }
                if (typeof(a) == 'function') {
                    a()
                }
            }
            if (this.option.timeInterval) {
                clearInterval(this.option.timeInterval);
                this.option.timeInterval = null
            }
        },
        adjust: function() {
            var a = document.getElementById('coverbg');
            if (a) {
                var b = FloaterManager.tool.getMaxWidth();
                var c = FloaterManager.tool.getMaxHeight(); {
                    b = document.documentElement.clientWidth;
                    c = document.documentElement.clientHeight;
                    var d = document.documentElement.offsetWidth;
                    var e = document.documentElement.offsetHeight;
                    var f = document.documentElement.scrollWidth;
                    var g = document.documentElement.scrollHeight;
                    if (e > c) {
                        c = e
                    }
                    if (d > b) {
                        b = d
                    }
                    if (g > c) {
                        c = g
                    }
                    if (f > b) {
                        b = f
                    }
                }
                if (b > screen.availWidth) {
                    b = screen.availWidth
                }
                if (c > FloaterManager.tool.getMaxHeight()) {
                    c = FloaterManager.tool.getMaxHeight()
                } {
                    if (FloaterManager.tool.bom.isFireFox) {
                        if (c > 5000) {
                            c = 5000
                        }
                        if (b > 3000) {
                            b = 3000
                        }
                    }
                }
                FloaterManager.tool.setStyle(a, {
                    'width': b + 'px',
                    'height': c + 'px'
                });
                var h = a.children[0];
                if (h) {
                    FloaterManager.tool.setStyle(h, {
                        'width': b + 'px',
                        'height': c + 'px'
                    })
                }
            }
        },
        createBackground: function(c) {
            c = c ? c: '#E6F5FF';
            var d = this.option.alpha;
            var f = document.body;
            if (f) {
                var g = document.getElementById('coverbg');
                if (!g) {
                    g = document.createElement('div');
                    g.setAttribute('id', 'coverbg');
                    FloaterManager.tool.setStyle(g, {
                        'position': 'absolute',
                        'display': 'none',
                        'z-Index': 998,
                        'left': '0px',
                        'top': '0px'
                    });
                    g.style.zIndex = 998;
                    var h = function(a, b) {
                        if (FloaterManager.tool.bom.isIE) {
                            a.style.filter = 'Alpha(opacity=' + b + ')'
                        } else {
                            a.style.opacity = b / 100
                        }
                    };
                    h(g, d);
                    var i = f.children[0];
                    if (i) {
                        f.insertBefore(g, i)
                    } else {
                        f.insertBefore(g)
                    }
                }
                var j = function() {
                    var a = g.children[0];
                    if (a) {
                        FloaterManager.tool.setStyle(a, {
                            'width': FloaterManager.tool.getMaxWidth() + 'px',
                            'height': FloaterManager.tool.getMaxHeight() + 'px'
                        });
                        return g
                    }
                    try {
                        a = document.createElement("iframe");
                        a.setAttribute("src", "about:blank");
                        a.setAttribute("scrolling", "no");
                        a.setAttribute("frameborder", "0");
                        a.setAttribute("allowtransparency", "true");
                        FloaterManager.tool.setStyle(a, {
                            'position': 'absolute',
                            'border': 0,
                            'z-Index': '997',
                            'top': '0',
                            'left': '0',
                            'width': FloaterManager.tool.getMaxWidth() + 'px',
                            'height': FloaterManager.tool.getMaxHeight() + 'px',
                            'filter': 'Alpha(Opacity=0,Style=0)',
                            'background-color': 'transparent'
                        });
                        a.style.zIndex = 997;
                        var b = FloaterManager.tool.bom.isIE6;
                        if (b) {
                            a.style.display = 'none'
                        }
                        g.appendChild(a);
                        return g
                    } catch(e) {}
                    return null
                };
                g = j();
                if (g) {
                    FloaterManager.tool.setStyle(g, {
                        'backgroundColor': c,
                        'width': FloaterManager.tool.getMaxWidth() + 'px',
                        'height': FloaterManager.tool.getMaxHeight() + 'px'
                    })
                }
                return g
            } else {
                alert('没找到body标签，请放到body之后引用')
            }
            return null
        }
    }
}
if (typeof(FileLoadManager) == 'undefined') {
    FileLoadManager = {}
}
FileLoadManager.ajaxRequest = function(i) {
    var j = {
        'url': '',
        'charset': 'gb2312',
        'cache': false,
        'postType': 'get',
        'dataType': 'object',
        'dataTypeName': '',
        'showLoadingStr': '请等待,数据正在加载中...',
        'isUseDefaultLoadType': false,
        'onLoadStartEvent': null,
        'onLoadingEvent': null,
        'onLoadSuccessEvent': null,
        'onLoadErrorEvent': null,
        'onLoadCompleteEvent': null
    };
    var k = {
        'isShowLoading': true
    };
    j = FileLoadManager.comm.extend(j, i); {
        if (!j.url) {
            alert('提交地址不能为空');
            reutrn
        }
        if (j.postType != "get" && j.postType != "post") {
            j.postType = 'get'
        }
    }
    var l = null; {
        if (!j.showLoadingStr || (typeof(j.onLoadSuccessEvent) != 'function' && typeof(j.onLoadCompleteEvent) != 'function')) {
            k.isShowLoading = false
        }
        if (k.isShowLoading) {
            if (typeof(FloaterManager) == 'undefined') {
                alert('因为使用到了FloaterManager对象，所以必须加载http://ossweb-img.qq.com/images/js/basic/floatermanager.js文件，\r\n或者参数中设置showLoadingStr:\'\'');
                return
            }
            l = FloaterManager.init(null, false)
        }
    } {
        if (typeof(j.onLoadStartEvent) == 'function') {
            if (j.onLoadStartEvent(j)) {
                return
            }
        }
        if (j.dataType == 'object') {
            if (j.dataTypeName) {
                window[j.dataTypeName] = undefined
            }
        }
    } {
        if (l) {
            l.ajaxLoading(j.showLoadingStr)
        }
        if (typeof(j.onLoadingEvent) == 'function') {
            if (j.onLoadingEvent(j)) {
                return
            }
        }
    } {
        var m = function() {
            if (typeof(j.onLoadSuccessEvent) != 'function' && typeof(j.onLoadCompleteEvent) != 'function' && !j.dataTypeName) {
                var b = {
                    'url': j.url,
                    'cache': false
                };
                FileLoadManager.comm.createScript(b);
                return
            } {
                {
                    var c = function() {};
                    if (typeof(j.onLoadCompleteEvent) == "function") {
                        c = j.onLoadCompleteEvent
                    }
                    j.onLoadCompleteEvent = function() {
                        if (typeof(l) == 'object' && l && k.isShowLoading) {
                            l.close()
                        }
                        c()
                    }
                } {
                    var d = null;
                    if (typeof(j.onLoadSuccessEvent) == "function") {
                        d = j.onLoadSuccessEvent
                    }
                    j.onLoadSuccessEvent = function() {
                        if (typeof(d) == "function") {
                            d()
                        }
                    }
                } {
                    var f = null;
                    if (typeof(j.onLoadErrorEvent) == "function") {
                        f = j.onLoadErrorEvent
                    }
                    j.onLoadErrorEvent = function() {
                        if (typeof(f) == "function") {
                            f()
                        }
                    }
                }
            }
            var g = function() {
                if (j.postType == 'get') {
                    FileLoadManager.comm.createScript(j)
                } else if (j.postType == 'post') {
                    FileLoadManager.comm.inputPost(j)
                }
            };
            if (j.postType == 'get' && FileLoadManager.comm.bom.isFireFox) {
                j.isUseDefaultLoadType = true
            }
            var h = /^(?:\w+:)?\/\/([^\/?#]+)/;
            if (h.test(j.url) && h.exec(j.url)[1] != location.host) {
                j.isUseDefaultLoadType = true;
                if (j.postType == 'post' && j.dataTypeName) {
                    j.postType = 'get'
                }
            }
            if (j.isUseDefaultLoadType) {
                g();
                return
            }
            try {
                FileLoadManager.comm.ajax({
                    'url': j.url,
                    'charset': j.charset,
                    'cache': j.cache,
                    'postType': j.postType,
                    'onLoadSuccessEvent': function() {
                        var a = false;
                        if (j.dataTypeName) {
                            if (j.dataType == 'object') {
                                if (typeof(window[j.dataTypeName]) == 'object') {
                                    a = true
                                }
                            } else if (j.dataType == 'function') {
                                a = true
                            }
                        } else {
                            a = true
                        }
                        if (a) {
                            if (typeof(j.onLoadSuccessEvent) == "function") {
                                j.onLoadSuccessEvent()
                            }
                            return
                        }
                        if (typeof(j.onLoadErrorEvent) == "function") {
                            j.onLoadErrorEvent()
                        } else {
                            alert('网络繁忙，请您稍后重试！')
                        }
                    },
                    'onLoadErrorEvent': function() {
                        if (typeof(j.onLoadErrorEvent) == "function") {
                            j.onLoadErrorEvent()
                        } else {
                            alert('网络繁忙，请您稍后重试！')
                        }
                    },
                    'onLoadCompleteEvent': function() {
                        j.onLoadCompleteEvent()
                    }
                })
            } catch(e) {
                g()
            }
        };
        setTimeout(function() {
            m()
        },
        500)
    }
};FileLoadManager.comm = {
    option: {
        maxId: 0
    },
    getId: function() {
        return++this.option.maxId
    },
    extend: function(a, b) {
        if (typeof(b) != 'object' || !b) {
            return a
        }
        for (var c in b) {
            a[c] = b[c]
        }
        return a
    },
    bom: {
        isIE: (navigator.userAgent.toLowerCase().indexOf("msie") != -1 ? true: false),
        isFireFox: (navigator.userAgent.toLowerCase().indexOf("firefox") != -1 ? true: false)
    },
    globalEval: function(b) {
        var c = function(a) {
            return (a || "").replace(/^\s+|\s+$/g, '').replace(/(^<script.*?>)|(<\/script>$)/img, '')
        };
        b = c(b);
        if (b) {
            try {
                var d = null;
                if (document.getElementsByTagName) {
                    d = document.getElementsByTagName('head')[0] || document.documentElement
                } else {
                    d = document.documentElement
                }
                var f = document.createElement("script");
                f.type = "text/javascript";
                if (FileLoadManager.comm.bom.isIE) {
                    f.text = b
                } else {
                    f.appendChild(document.createTextNode(b))
                }
                d.insertBefore(f, d.firstChild);
                d.removeChild(f)
            } catch(e) {
                throw b + '：为不可执行的javascript代码';
            }
        }
    },
    addListener: function(a, b, c, d) {
        if (window.addEventListener) {
            a.addEventListener(b, c, (d))
        } else if (window.attachEvent) {
            a.attachEvent("on" + b, c)
        }
    },
    removeListener: function(a, b, c, d) {
        if (window.removeEventListener) {
            a.removeEventListener(b, c, (d))
        } else if (window.detachEvent) {
            a.detachEvent("on" + b, c)
        }
    }
};FileLoadManager.comm.ajax = function(c) {
    var d = {
        'url': '',
        'charset': 'gb2312',
        'cache': true,
        'postType': 'get',
        'onLoadSuccessEvent': null,
        'onLoadErrorEvent': null,
        'onLoadCompleteEvent': null
    };
    FileLoadManager.comm.extend(d, c); {
        var f = function(s) {
            if (!s.url) {
                return ''
            }
            if (s.cache === false) {
                var a = +new Date;
                var b = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + a + "$2");
                s.url = b + ((b == s.url) ? (s.url.match(/\?/) ? "&": "?") + "_=" + a: "")
            }
            return s.url
        };
        var g = f(d);
        if (!g) {
            return
        }
        d.url = g
    } {
        if (typeof(d.onLoadSuccessEvent) != 'function') {
            d.onLoadSuccessEvent = function(a) {}
        }
        if (typeof(d.onLoadCompleteEvent) != 'function') {
            d.onLoadCompleteEvent = function(a) {}
        }
        if (typeof(d.onLoadErrorEvent) != 'function') {
            d.onLoadErrorEvent = function(a) {}
        }
    }
    var h = null;
    if (window.XMLHttpRequest) {
        h = new XMLHttpRequest();
        if (h.overrideMimeType) {
            h.overrideMimeType("text/html")
        }
    } else if (window.ActiveXObject) {
        var j = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
        for (var i = 0; i < j.length; i++) {
            try {
                h = new ActiveXObject(j[i]);
                break
            } catch(e) {}
        }
    }
    if (!h) {
        throw "XMLHttpRequest创建失败!";
        return
    } {
        h.__start = new Date().getTime();
        h.timeout = function() {
            if (h.complete) {
                h.timeout = null;
                return
            }
            var a = new Date().getTime() - h.__start;
            if (a > 30 * 1000) {
                d.onLoadErrorEvent(d);
                d.onLoadCompleteEvent(d);
                h.complete = true;
                return
            }
            setTimeout(h.timeout, 500)
        }
    }
    h.onreadystatechange = function() {
        if (h.readyState == 4) {
            if (h.status == 200) {
                var b = function() {
                    var a = h.responseText;
                    if (a) {
                        h.complete = true;
                        try {
                            FileLoadManager.comm.globalEval(a);
                            d.onLoadSuccessEvent(d)
                        } catch(e) {
                            d.onLoadErrorEvent(d)
                        }
                        d.onLoadCompleteEvent(d);
                        return
                    }
                };
                if (FileLoadManager.comm.bom.isFireFox) {
                    setTimeout(b, 1000)
                } else {
                    b()
                }
            } else {
                d.onLoadErrorEvent(d);
                d.onLoadCompleteEvent(d);
                h.complete = true
            }
        }
        return
    };
    h.timeout();
    if (d.postType == 'get') {
        try {
            h.open("http://d2.qq.com/cp/a20160225xktl/GET", d.url, true);
            h.setRequestHeader("Content-Type", "text/xml;charset=" + d.charset);
            h.send(null)
        } catch(e) {
            throw 'get方式提交失败';
            h.complete = true;
            return
        }
    } else if (d.postType == 'post') {
        var k = {
            url: d.url,
            data: null
        }; {
            var g = k.url || '';
            if (g && g.split("?").length <= 2) {
                if (g.split("?").length == 2) {
                    k = {
                        url: g.split("?")[0],
                        data: g.split("?")[1]
                    }
                }
            } else {
                alert("url 输入格式出错:" + d.url);
                return
            }
            if (!k.url) {
                alert("url 输入格式不能为空！");
                return
            }
        }
        if (!k.data) {
            k.data = ''
        }
        try {
            h.open("http://d2.qq.com/cp/a20160225xktl/POST", k.url, true);
            h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            h.send(k.data)
        } catch(e) {
            throw 'post方式提交失败';
            h.complete = true;
            return
        }
    }
};FileLoadManager.comm.inputPost = function(f) {
    var g = {
        'url': '',
        'charset': 'gb2312',
        'cache': false,
        'postType': 'post',
        'dataType': 'object',
        'dataTypeName': '',
        'onLoadSuccessEvent': null,
        'onLoadErrorEvent': null,
        'onLoadCompleteEvent': null
    };
    g = FileLoadManager.comm.extend(g, f);
    var h = {
        url: g.url,
        data: null
    }; {
        var j = h.url || '';
        if (j && j.split("?").length <= 2) {
            if (j.split("?").length == 2) {
                h = {
                    url: j.split("?")[0],
                    data: j.split("?")[1]
                }
            }
        } else {
            alert("url 输入格式出错:" + g.url);
            return
        }
        if (!h.url) {
            alert("url 输入格式不能为空！");
            return
        }
    } {
        var k = function(s) {
            if (!s.url) {
                return ''
            }
            if (!g.cache) {
                var a = +new Date;
                var b = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + a + "$2");
                s.url = b + ((b == s.url) ? (s.url.match(/\?/) ? "&": "?") + "_=" + a: "")
            }
            return s.url
        };
        var j = k(h);
        if (!j) {
            return
        }
        h.url = j
    }
    var l = null;
    if (document.getElementById('FILE_LOAD_TYPE_INPUTPOST')) {
        l = document.getElementById('FILE_LOAD_TYPE_INPUTPOST')
    } else {
        if (FileLoadManager.comm.bom.isIE) {
            l = document.createElement('<iframe id="FILE_LOAD_TYPE_INPUTPOST" name="FILE_LOAD_TYPE_INPUTPOST" src="about:blank" style="display:none;"></iframe>')
        } else {
            l = document.createElement('iframe');
            l.setAttribute("id", 'FILE_LOAD_TYPE_INPUTPOST');
            l.setAttribute("name", 'FILE_LOAD_TYPE_INPUTPOST');
            l.setAttribute("src", 'about:blank');
            l.style.display = 'none'
        }
        document.body.appendChild(l)
    }
    var m = document.createElement("form");
    m.setAttribute("method", g.postType);
    m.setAttribute("action", h.url);
    m.setAttribute("target", 'FILE_LOAD_TYPE_INPUTPOST');
    m.style.display = 'none';
    if (h.data) {
        var n = h.data.split('&');
        for (var i = 0; i < n.length; i++) {
            if (n[i]) {
                var o = n[i].split('=');
                if (o.length == 2 && o[0]) {
                    var p = document.createElement("input");
                    p.setAttribute("type", "hidden");
                    p.setAttribute("name", o[0]);
                    var q = o[1];
                    if (q) {
                        q = decodeURIComponent(o[1])
                    } else {
                        q = ''
                    }
                    p.setAttribute("value", q);
                    m.appendChild(p)
                }
            }
        }
    }
    document.body.appendChild(m);
    m.submit();
    var r = function() {
        if (typeof(FileLoadManager) == 'undefined') {
            return
        }
        FileLoadManager.comm.removeListener(l, "load", t);
        FileLoadManager.comm.removeListener(l, "error", u);
        if (m) {
            document.body.removeChild(m);
            m = null
        }
        l.setAttribute("src", 'about:blank')
    };
    var t = function() {
        var a = false;
        var b = true;
        try {
            for (var i in window['FILE_LOAD_TYPE_INPUTPOST']) {}
            var c = window['FILE_LOAD_TYPE_INPUTPOST'].document || window['FILE_LOAD_TYPE_INPUTPOST'].documentElement;
            var d = c['body'] ? c['body'].innerHTML: c.documentElement.textContent;
            if (d) {
                try {
                    FileLoadManager.comm.globalEval(d);
                    a = true;
                    if (typeof(g.onLoadSuccessEvent) == 'function') {
                        g.onLoadSuccessEvent(g)
                    }
                } catch(e) {}
            }
        } catch(e) {
            b = false
        }
        if (!b) {
            if (typeof(g.onLoadSuccessEvent) == 'function') {
                g.onLoadSuccessEvent(g)
            }
            if (typeof(g.onLoadCompleteEvent) == 'function') {
                g.onLoadCompleteEvent()
            }
            r();
            return
        }
        if (!a) {
            if (typeof(g.onLoadErrorEvent) == 'function') {
                g.onLoadErrorEvent(g)
            }
        }
        if (typeof(g.onLoadCompleteEvent) == 'function') {
            g.onLoadCompleteEvent()
        }
        r()
    };
    var u = function() {
        if (typeof(g.onLoadErrorEvent) == 'function') {
            g.onLoadErrorEvent()
        }
        if (typeof(g.onLoadCompleteEvent) == 'function') {
            g.onLoadCompleteEvent()
        }
        r()
    };
    FileLoadManager.comm.addListener(l, "load", t);
    FileLoadManager.comm.addListener(l, "error", u);
    setTimeout(function() {
        r()
    },
    10000)
};FileLoadManager.comm.createImage = function(a, b) {
    if (!a) {
        return null
    }
    var b = b || '';
    if (!b) {
        b = a.replace(/[\W]/gi, '');
        if (!b) {
            return null
        }
    }
    var c = null;
    if (document.getElementById(b)) {
        c = document.getElementById(b)
    } else {
        c = document.createElement('img');
        var d = null;
        if (document.getElementsByTagName) {
            d = document.getElementsByTagName('head')[0] || document.documentElement
        } else {
            d = document.documentElement
        }
        d.insertBefore(c, d.firstChild)
    } {
        c.setAttribute('id', b);
        c.setAttribute('src', a);
        c.setAttribute('style', 'display:none;');
        c.onload = c.onreadystatechange = function() {
            d.removeChild(c)
        }
    }
    return c
};FileLoadManager.comm.createScript = function(g) {
    var h = {
        'url': '',
        'charset': 'gb2312',
        'cache': true,
        'dataType': 'object',
        'dataTypeName': '',
        'onLoadStartEvent': null,
        'onLoadingEvent': null,
        'onLoadSuccessEvent': null,
        'onLoadErrorEvent': null,
        'onLoadCompleteEvent': null
    };
    var i = {
        'retryTimes': 10,
        'jsHandle': null
    };
    FileLoadManager.comm.extend(h, g); {
        var j = function(s) {
            if (!s.url) {
                return ''
            }
            if (s.cache === false) {
                var a = +new Date;
                var b = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + a + "$2");
                s.url = b + ((b == s.url) ? (s.url.match(/\?/) ? "&": "?") + "_=" + a: "")
            }
            return s.url
        };
        var k = j(h);
        if (!k) {
            return
        }
        h.url = k
    } {
        if (typeof(h.onLoadSuccessEvent) != 'function' && typeof(h.onLoadErrorEvent) != 'function' && typeof(h.onLoadCompleteEvent) != 'function' && !h.dataTypeName) {
            FileLoadManager.comm.createImage(h.url);
            return
        }
    } {
        if (typeof(h.onLoadStartEvent) == 'function') {
            if (h.onLoadStartEvent(h)) {
                return
            }
        }
    }
    var l = null;
    if (document.getElementsByTagName) {
        l = document.getElementsByTagName('head')[0] || document.documentElement
    } else {
        l = document.documentElement
    } {
        var m = i.jsHandle = document.createElement("script");
        m.src = h.url;
        m.type = 'text/javascript';
        if (h.charset) {
            m.charset = h.charset
        }
        if (typeof(h.onLoadSuccessEvent) != 'function') {
            h.onLoadSuccessEvent = function(a) {}
        }
        if (typeof(h.onLoadCompleteEvent) != 'function') {
            h.onLoadCompleteEvent = function(a) {}
        }
        if (typeof(h.onLoadErrorEvent) != 'function') {
            h.onLoadErrorEvent = function(a) {}
        }
        var n = FileLoadManager.comm.getId();
        var o = false;
        m.onerror = function() {
            h.onLoadErrorEvent(h);
            h.onLoadCompleteEvent(h)
        };
        m.onload = m.onreadystatechange = function() {
            if (!o && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                l.removeChild(m);
                o = true;
                window['FILE_LOAD_FLAG_' + n] = false;
                var c = false;
                var d = function(a, b) {
                    if (typeof(window[a.dataTypeName]) == 'object') {
                        a.onLoadSuccessEvent(a);
                        a.onLoadCompleteEvent(a);
                        window['FILE_LOAD_FLAG_' + n] = true;
                        return
                    }
                    window['FileLoadFlag_' + n] = window.setInterval(function() {
                        if (window['FILE_LOAD_FLAG_' + n]) {
                            clearInterval(window['FileLoadFlag_' + n]);
                            return
                        }
                        if (typeof(window[a.dataTypeName]) == 'object') {
                            a.onLoadSuccessEvent(a);
                            a.onLoadCompleteEvent(a);
                            window['FILE_LOAD_FLAG_' + n] = true;
                            clearInterval(window['FileLoadFlag_' + n]);
                            return
                        }
                        b.retryTimes--;
                        if (b.retryTimes <= 0) {
                            a.onLoadErrorEvent(a);
                            a.onLoadCompleteEvent(a);
                            window['FILE_LOAD_FLAG_' + n] = true;
                            clearInterval(window['FileLoadFlag_' + n])
                        }
                    },
                    1000)
                };
                var e = function(a, b) {
                    if (typeof(window[a.dataTypeName]) == 'function') {
                        a.onLoadSuccessEvent(a);
                        a.onLoadCompleteEvent(a);
                        window['FILE_LOAD_FLAG_' + n] = true;
                        return
                    }
                    window['FileLoadFlag_' + n] = window.setInterval(function() {
                        if (window['FILE_LOAD_FLAG_' + n]) {
                            clearInterval(window['FileLoadFlag_' + n]);
                            return
                        }
                        if (typeof(window[a.dataTypeName]) == 'function') {
                            a.onLoadSuccessEvent(a);
                            a.onLoadCompleteEvent(a);
                            window['FILE_LOAD_FLAG_' + n] = true;
                            clearInterval(window['FileLoadFlag_' + n]);
                            return
                        }
                        b.retryTimes--;
                        if (b.retryTimes <= 0) {
                            a.onLoadErrorEvent(a);
                            a.onLoadCompleteEvent(a);
                            window['FILE_LOAD_FLAG_' + n] = true;
                            clearInterval(window['FileLoadFlag_' + n])
                        }
                    },
                    1000)
                };
                if (h.dataType == 'object') {
                    if (h.dataTypeName) {
                        d(h, i)
                    } else {
                        c = true
                    }
                } else if (h.dataType == 'function') {
                    if (h.dataTypeName) {
                        e(h, i)
                    } else {
                        c = true
                    }
                }
                if (c) {
                    h.onLoadSuccessEvent(h);
                    h.onLoadCompleteEvent(h);
                    return
                }
                var f = +new Date();
                window['FILE_LOAD_TIMMER_FLAG_' + n] = window.setInterval(function() {
                    if (window['FILE_LOAD_FLAG_' + n]) {
                        clearInterval(window['FILE_LOAD_TIMMER_FLAG_' + n]);
                        return
                    }
                    var a = ( + new Date() - f) / 1000;
                    if (a >= 10) {
                        window['FILE_LOAD_FLAG_' + n] = true;
                        clearInterval(window['FileLoadFlag_' + n]);
                        clearInterval(window['FILE_LOAD_TIMMER_FLAG_' + n]);
                        h.onLoadErrorEvent(h);
                        h.onLoadCompleteEvent(h);
                        return
                    }
                },
                500)
            }
        }; {
            if (typeof(h.onLoadingEvent) == 'function') {
                if (h.onLoadingEvent(h)) {
                    return
                }
            }
        }
        l.appendChild(m);
        return
    }
};StringManager = {
    Utf8ToUnicode: function(a) {
        var b = "";
        var c = a.length;
        var d = 0;
        var e = c;
        var f = 0;
        var g, iCode1, iCode2;
        while (d < c) {
            g = a.charCodeAt(d);
            if ((g & 0x80) == 0) {
                if (e < 1) {
                    break
                }
                b += String.fromCharCode(g & 0x7F);
                d++;
                e -= 1
            } else if ((g & 0xE0) == 0xC0) {
                iCode1 = a.charCodeAt(d + 1);
                if (e < 2 || (iCode1 & 0xC0) != 0x80) {
                    break
                }
                b += String.fromCharCode(((g & 0x3F) << 6) | (iCode1 & 0x3F));
                d += 2;
                e -= 2
            } else if ((g & 0xF0) == 0xE0) {
                iCode1 = a.charCodeAt(d + 1);
                iCode2 = a.charCodeAt(d + 2);
                if (e < 3 || (iCode1 & 0xC0) != 0x80 || (iCode2 & 0xC0) != 0x80) {
                    break
                }
                b += String.fromCharCode(((g & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));
                d += 3;
                e -= 3
            } else {
                break
            }
        }
        if (e != 0) {
            return ""
        }
        return b
    }
}; {
    Math.add = function(a, b) {
        var c = a.toString(),
        str2 = b.toString();
        var d = 0,
        m2 = 0;
        try {
            d = c.split('.')[1].length
        } catch(e) {}
        try {
            m2 = str2.split('.')[1].length
        } catch(e) {}
        var m = Math.pow(10, Math.max(d, m2));
        return (Math.mul(a, m) + Math.mul(b, m)) / m
    };
    Math.sub = function(a, b) {
        return Math.add(a, -b)
    };
    Math.mul = function(a, b) {
        var c = a.toString(),
        str2 = b.toString();
        var m = 0;
        try {
            m += c.split(".")[1].length
        } catch(e) {}
        try {
            m += str2.split(".")[1].length
        } catch(e) {}
        return Number(c.replace('.', '')) * Number(str2.replace('.', '')) / Math.pow(10, m)
    };
    Math.div = function(a, b) {
        var c = a.toString(),
        str2 = b.toString();
        var d = 0,
        m2 = 0;
        try {
            d = c.split('.')[1].length
        } catch(e) {}
        try {
            m2 = str2.split('.')[1].length
        } catch(e) {}
        var m = Math.pow(10, Math.max(d, m2));
        a = Math.mul(a, Math.pow(10, m));
        b = Math.mul(b, Math.pow(10, m));
        return (a / b)
    };
    Number.prototype.toFixed = function(a, b) {
        b = b ? true: false;
        var c = this + ""; {
            if (arguments.length == 0 || isNaN(a) || a * 1 < 0 || typeof(a) != "number") {
                return c
            }
            a = Math.floor(a);
            if (a > 30) {
                alert("对不起，您的数字精度超过了限度，最长的保留小数位数为30位。");
                a = 30
            }
        } {
            var d = "",
            x = "",
            z = 0;
            var e = c.indexOf(".");
            if (e < 0) {
                d = c;
                x = "";
                z = a
            } else {
                d = c.substring(0, e);
                if (!d) {
                    d = "0"
                }
                var f = c.substr(e + 1);
                if (f) {
                    if (f.length <= a) {
                        x = f;
                        z = a - f.length
                    } else {
                        if (a == 0) {
                            x = ""
                        } else {
                            x = f.substr(0, a);
                            if (!b) {
                                var g = f.substr(a, 1);
                                if (g * 1 >= 5) {
                                    var h = [];
                                    for (var i = 0; i < a; i++) {
                                        h.push(x.charAt(i))
                                    }
                                    var k = 0;
                                    for (var j = a - 1; j >= 0; j--) {
                                        h[j]++;
                                        if (h[j] <= 9) {
                                            break
                                        }
                                        h[j] = 0;
                                        if (j == 0) {
                                            k = 1
                                        }
                                    }
                                    d = d * 1 + k;
                                    x = h.join('')
                                }
                            }
                        }
                        z = 0
                    }
                } else {
                    x = "";
                    z = a
                }
            }
            if (z > 0) {
                for (var i = 0; i < z; i++) {
                    x += "0"
                }
            }
            if (x) {
                return (d + "." + x)
            }
            return d
        }
    }
}
$namespace = function() {
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split(".");
        var c = window;
        for (var j = 0; j < b.length; j++) {
            c[b[j]] = c[b[j]] || {};
            c = c[b[j]]
        }
    }
    return c
};$extend = function(a, b) {
    if (typeof(b) != 'object' || !b) {
        return a
    }
    for (var c in b) {
        a[c] = b[c]
    }
    return a
};
if (typeof(Manager) == "undefined") {
    Manager = {}
};
if (typeof(Webplat) == "undefined") {
    Webplat = {}
}; {
    String.prototype.trim = function() {
        var a = arguments[0] || "\\s";
        var b = new RegExp("(^" + a + "*)|(" + a + "*$)", "g");
        return this.replace(b, "")
    };
    String.prototype.ltrim = function() {
        var a = arguments[0] || "\\s";
        var b = new RegExp("(^" + a + "*)", "g");
        return this.replace(b, "")
    };
    String.prototype.rtrim = function() {
        var a = arguments[0] || "\\s";
        var b = new RegExp("(" + a + "*$)", "g");
        return this.replace(b, "")
    };
    String.prototype.replaceAll = function(a, b) {
        var c = this.split(a);
        return c.join(b)
    };
    String.prototype.HtmlEncode = function() {
        var a = this.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("'", "&apos;").replaceAll("\"", "&quot;");
        return a
    };
    String.prototype.unHtmlEncode = function() {
        var a = this.replaceAll("&quot;", "\"").replaceAll("&apos;", "'").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&amp;", "&");
        return a
    };
    String.prototype.leftDel = function(a) {
        return this.substring(a, this.length)
    };
    String.prototype.rightDel = function(a) {
        return this.substring(0, this.length - a)
    };
    String.prototype.left = function(a) {
        return this.substring(0, a)
    };
    String.prototype.right = function(a) {
        return this.substring(this.length - a, this.length)
    };
    String.prototype.cLen = function() {
        return this.replace(/[\u00FF-\uFFFF]/g, "  ").length
    };
    String.prototype.cSubString = function(a, b) {
        var c = '';
        var d = 0;
        for (var i = 0; i < this.length; i++) {
            if (a <= d && d < b) {
                c += this.charAt(i)
            };
            d += (this.charCodeAt(i) <= 128 ? 1 : 2)
        };
        return c
    };
    String.prototype.cLeft = function(a) {
        return this.cSubString(0, a)
    };
    String.prototype.cRight = function(a) {
        return this.cSubString(this.cLen() - a, this.cLen())
    };
    String.prototype.cLeftDel = function(a) {
        return this.cSubString(a, this.cLen())
    };
    String.prototype.cRightDel = function(a) {
        return this.cSubString(0, this.cLen() - a)
    };
    String.prototype.showLeft = function(a) {
        var b = arguments[1] || "…";
        var c = this.cLeft(parseInt(a));
        if (c.cLen() < this.cLen()) {
            c += b
        }
        return c
    };
    String.prototype.formatText = function() {
        var a = this;
        if (!a) {
            return ""
        }
        a = a.replace(/ |　/ig, "");
        a = a.replace(/\r\n/ig, "\n");
        a = a.replace(/\n\n/ig, "\n");
        a = a.replace(/\n\n/ig, "\n");
        a = a.replace(/\n\n/ig, "\n");
        a = a.replace(/\n\n/ig, "\n");
        a = a.replace(/\n/ig, "\n\n　　");
        a = a.replace("\n\n", "");
        return a
    }
} {
    Array.prototype.contains = function(a) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === a) {
                return true
            }
        }
        return false
    };
    Array.prototype.uniquelize = function() {
        var a = [];
        for (var i = 0; i < this.length; i++) {
            if (!a.contains(this[i])) {
                a.push(this[i])
            }
        }
        return a
    };
    Array.complement = function(a, b) {
        return Array.minus(Array.union(a, b), Array.intersect(a, b))
    };
    Array.intersect = function(a, b) {
        return a.uniquelize().each(function(o) {
            return b.contains(o) ? o: null
        })
    };
    Array.minus = function(a, b) {
        a = a.uniquelize();
        b = b.uniquelize();
        var c = [];
        if (a.length == 0) {
            return b
        }
        if (b.length == 0) {
            return a
        }
        for (var i = 0; i < a.length; i++) {
            if (!b.contains(a[i])) {
                c.push(a[i])
            }
        }
        for (var i = 0; i < b.length; i++) {
            if (!a.contains(b[i])) {
                c.push(b[i])
            }
        }
        return c.uniquelize()
    };
    Array.union = function(a, b) {
        return a.concat(b).uniquelize()
    };
    Array.prototype.indexOf = function(o) {
        var a = this;
        for (var i = 0; i < a.length; i++) {
            if (a[i] === o) {
                return i
            }
        }
        return - 1
    };
    Array.prototype.defaultSort = function() {
        this.sort(function(a, b) {
            return a.localeCompare(b)
        });
        return this
    }
} {
    Function.prototype.runAfter = function(t) {
        var A = this;
        var B = Array.prototype.slice.call(arguments, 1);
        var f = function() {
            A.apply(null, B)
        };
        return setTimeout(f, t)
    };
    Function.prototype.runEach = function(t) {
        var A = this;
        var B = Array.prototype.slice.call(arguments, 1);
        var f = function() {
            A.apply(null, B)
        };
        return setInterval(f, t)
    }
}
function $E(x) {
    x = x.replace("#", "");
    return document.getElementById(x)
};
function getEvent() {
    if (document.all) {
        return window.event
    };
    func = getEvent.caller;
    while (func != null) {
        var A = func.arguments[0];
        if (A) {
            if ((A.constructor == Event || A.constructor == MouseEvent) || (typeof(A) == "object" && A.preventDefault && A.stopPropagation)) {
                return A
            }
        };
        func = func.caller
    };
    return null
};
function getTS(a, b) {
    a = arguments[0] || "M";
    b = arguments[1] || "1";
    var c = "",
    tf2 = "";
    var A = new Date();
    switch (a) {
    case "y":
        c = "";
        tf2 = parseInt(A.getFullYear() / b) * b;
        break;
    case "M":
        c = "yyyy";
        tf2 = parseInt(A.getMonth() / b) * b;
        break;
    case "d":
        c = "yyyyMM";
        tf2 = parseInt(A.getDate() / b) * b;
        break;
    case "h":
        c = "yyyyMMdd";
        tf2 = parseInt(A.getHours() / b) * b;
        break;
    case "m":
        c = "yyyyMMddhh";
        tf2 = parseInt(A.getMinutes() / b) * b;
        break;
    default:
        return "";
        break
    };
    return A.format(c) + tf2.toString()
};
function getKeyCode() {
    var a = getEvent();
    return window.event ? a.keyCode: a.which
};
function randomInt(a) {
    return Math.floor(Math.random() * a)
};
function getX(e) {
    var t = e.offsetLeft;
    while (e = e.offsetParent) t += e.offsetLeft;
    return t
}
function getY(e) {
    var t = e.offsetTop;
    while (e = e.offsetParent) t += e.offsetTop;
    return t
} {
    Date.prototype.format = function(a) {
        if (typeof(a) != 'string') {
            a = 'yyyy-MM-dd hh:mm:ss'
        }
        var b = a;
        b = b.replace(/yyyy|YYYY/, this.getFullYear());
        b = b.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : "0" + (this.getYear() % 100));
        b = b.replace(/MM/, this.getMonth() > 8 ? (this.getMonth() + 1).toString() : "0" + (this.getMonth() + 1));
        b = b.replace(/M/g, this.getMonth() + 1);
        b = b.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : "0" + this.getDate());
        b = b.replace(/d|D/g, this.getDate());
        b = b.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : "0" + this.getHours());
        b = b.replace(/h|H/g, this.getHours());
        b = b.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : "0" + this.getMinutes());
        b = b.replace(/m/g, this.getMinutes());
        b = b.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : "0" + this.getSeconds());
        b = b.replace(/s|S/g, this.getSeconds());
        return b
    };
    Date.prototype.compare = function(a) {
        if (typeof(a) != "object" && a.constructor != Date) {
            return - 2
        }
        var d = this.getTime() - a.getTime();
        if (d > 0) {
            return 1
        } else {
            if (d == 0) {
                return 0
            } else {
                return - 1
            }
        }
    };
    Date.prototype.dateAdd = function(a, b) {
        var c = this;
        if (typeof(b) == 'undefined' || isNaN(a)) {
            a = 1
        }
        if (typeof(b) != 'string') {
            b = 'd'
        }
        switch (b) {
        case "y":
            {
                c.setFullYear(c.getFullYear() + a);
                break
            }
        case "q":
            {
                c.setMonth(c.getMonth() + a * 3);
                break
            }
        case "m":
            {
                c.setMonth(c.getMonth() + a);
                break
            }
        case "w":
            {
                c.setDate(c.getDate() + a * 7);
                break
            }
        case "d":
            {
                c.setDate(c.getDate() + a);
                break
            }
        case "h":
            {
                c.setHours(c.getHours() + a);
                break
            }
        case "M":
            {
                c.setMinutes(c.getMinutes() + a);
                break
            }
        case "s":
            {
                c.setSeconds(c.getSeconds() + a);
                break
            }
        default:
            {
                c.setDate(c.getDate() + a);
                break
            }
        }
        return c
    };
    Date.getDateFromDateStr = function(a, b) {
        a = a + '';
        if (typeof(b) != 'string') {
            b = 'yyyy-MM-dd hh:mm:ss'
        }
        var c = {
            yearStr: '',
            monthStr: '',
            dateStr: '',
            hourStr: '00',
            minuteStr: '00',
            secondStr: '00'
        }; {
            var d = /(y{2,4})|(d{1,2})|(h{1,2})|(s{1,2})/ig;
            var e = b.match(d);
            for (var i = 0; i < e.length; i++) {
                e[i] = e[i].toLowerCase();
                var f = a.substr(b.indexOf(e[i]), e[i].length);
                if (f && !isNaN(f) && f * 1 == parseInt(f * 1, 10)) {
                    if (/y+/.test(e[i])) {
                        c.yearStr = f
                    }
                    if (/d+/.test(e[i])) {
                        c.dateStr = f
                    }
                    if (/h+/.test(e[i])) {
                        c.hourStr = f
                    }
                    if (/s+/.test(e[i])) {
                        c.secondStr = f
                    }
                }
            }
        } {
            var d = /M{1,2}/g;
            var e = b.match(d);
            if (e && e.length == 1) {
                var f = a.substr(b.indexOf(e[0]), e[0].length);
                if (f && !isNaN(f) && f * 1 == parseInt(f * 1, 10)) {
                    c.monthStr = f
                }
            }
            d = /m{1,2}/g;
            e = b.match(d);
            if (e && e.length == 1) {
                var f = a.substr(b.indexOf(e[0]), e[0].length);
                if (f && !isNaN(f) && f * 1 == parseInt(f * 1, 10)) {
                    c.minuteStr = f
                }
            }
        } {
            var g = new Date();
            if (!c.dateStr) {
                c.dateStr = String(g.getDate())
            }
            if (!c.monthStr) {
                c.monthStr = String(g.getMonth() + 1)
            }
            if (!c.yearStr) {
                c.yearStr = String(g.getFullYear())
            }
            var h = c.yearStr + '-' + c.monthStr + '-' + c.dateStr + ' ' + c.hourStr + ':' + c.minuteStr + ':' + c.secondStr
        }
        return new Date(c.yearStr * 1, (c.monthStr * 1 - 1), c.dateStr * 1, c.hourStr * 1, c.minuteStr * 1, c.secondStr * 1)
    };
    Date.prototype.isLeapYear = function() {
        return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)))
    }
}
var ValidateManager = {
    methods: {},
    simpleValidate: function(a, b) {
        if (!b) {
            return true
        }
        for (var c in b) {
            if (typeof(a[c]) == 'undefined') {
                throw '在对象中没有找到需要验证的属性:' + c;
                return false
            }
            if (typeof(a[c]) != 'number' && typeof(a[c]) != 'string') {
                throw '只能验证数字和字符串的信息' + c;
                return false
            }
            var d = a[c];
            var e = b[c];
            if (e.constructor == Array && e.length > 0) {
                for (var i = 0; i < e.length; i++) {
                    var f = e[i][0];
                    var g = e[i][1];
                    f = f.replace(new RegExp(c, 'gi'), '\"' + d + '\"');
                    var h = 'validate_result = (' + f + ');';
                    eval(h);
                    if (!validate_result) {
                        if (g) {
                            throw g;
                        }
                        return false
                    }
                }
            }
        }
        return true
    }
};
/*  |xGv00|1b3ab6e09d0432ab17409902677a187a */