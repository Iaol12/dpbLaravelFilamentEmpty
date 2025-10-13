var namespaces_default = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: "http://www.w3.org/1999/xhtml",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
function namespace_default(u) {
	var d = u += "", f = d.indexOf(":");
	return f >= 0 && (d = u.slice(0, f)) !== "xmlns" && (u = u.slice(f + 1)), namespaces_default.hasOwnProperty(d) ? {
		space: namespaces_default[d],
		local: u
	} : u;
}
function creatorInherit(t) {
	return function() {
		var u = this.ownerDocument, d = this.namespaceURI;
		return d === "http://www.w3.org/1999/xhtml" && u.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? u.createElement(t) : u.createElementNS(d, t);
	};
}
function creatorFixed(t) {
	return function() {
		return this.ownerDocument.createElementNS(t.space, t.local);
	};
}
function creator_default(t) {
	var p = namespace_default(t);
	return (p.local ? creatorFixed : creatorInherit)(p);
}
function none() {}
function selector_default(t) {
	return t == null ? none : function() {
		return this.querySelector(t);
	};
}
function select_default$2(t) {
	typeof t != "function" && (t = selector_default(t));
	for (var u = this._groups, d = u.length, f = Array(d), p = 0; p < d; ++p) for (var m = u[p], g = m.length, _ = f[p] = Array(g), v, y, b = 0; b < g; ++b) (v = m[b]) && (y = t.call(v, v.__data__, b, m)) && ("__data__" in v && (y.__data__ = v.__data__), _[b] = y);
	return new Selection$1(f, this._parents);
}
function array(t) {
	return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function empty() {
	return [];
}
function selectorAll_default(t) {
	return t == null ? empty : function() {
		return this.querySelectorAll(t);
	};
}
function arrayAll(t) {
	return function() {
		return array(t.apply(this, arguments));
	};
}
function selectAll_default$1(t) {
	t = typeof t == "function" ? arrayAll(t) : selectorAll_default(t);
	for (var u = this._groups, d = u.length, f = [], p = [], m = 0; m < d; ++m) for (var h = u[m], g = h.length, _, v = 0; v < g; ++v) (_ = h[v]) && (f.push(t.call(_, _.__data__, v, h)), p.push(_));
	return new Selection$1(f, p);
}
function matcher_default(t) {
	return function() {
		return this.matches(t);
	};
}
function childMatcher(t) {
	return function(u) {
		return u.matches(t);
	};
}
var find = Array.prototype.find;
function childFind(t) {
	return function() {
		return find.call(this.children, t);
	};
}
function childFirst() {
	return this.firstElementChild;
}
function selectChild_default(t) {
	return this.select(t == null ? childFirst : childFind(typeof t == "function" ? t : childMatcher(t)));
}
var filter = Array.prototype.filter;
function children() {
	return Array.from(this.children);
}
function childrenFilter(t) {
	return function() {
		return filter.call(this.children, t);
	};
}
function selectChildren_default(t) {
	return this.selectAll(t == null ? children : childrenFilter(typeof t == "function" ? t : childMatcher(t)));
}
function filter_default$1(t) {
	typeof t != "function" && (t = matcher_default(t));
	for (var u = this._groups, d = u.length, f = Array(d), p = 0; p < d; ++p) for (var m = u[p], h = m.length, g = f[p] = [], _, v = 0; v < h; ++v) (_ = m[v]) && t.call(_, _.__data__, v, m) && g.push(_);
	return new Selection$1(f, this._parents);
}
function sparse_default(t) {
	return Array(t.length);
}
function enter_default() {
	return new Selection$1(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(t, u) {
	this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = u;
}
EnterNode.prototype = {
	constructor: EnterNode,
	appendChild: function(t) {
		return this._parent.insertBefore(t, this._next);
	},
	insertBefore: function(t, u) {
		return this._parent.insertBefore(t, u);
	},
	querySelector: function(t) {
		return this._parent.querySelector(t);
	},
	querySelectorAll: function(t) {
		return this._parent.querySelectorAll(t);
	}
};
function constant_default$2(t) {
	return function() {
		return t;
	};
}
function bindIndex(t, u, d, f, p, m) {
	for (var h = 0, g, _ = u.length, v = m.length; h < v; ++h) (g = u[h]) ? (g.__data__ = m[h], f[h] = g) : d[h] = new EnterNode(t, m[h]);
	for (; h < _; ++h) (g = u[h]) && (p[h] = g);
}
function bindKey(t, u, d, f, p, m, h) {
	var g, _, v = /* @__PURE__ */ new Map(), y = u.length, b = m.length, x = Array(y), S;
	for (g = 0; g < y; ++g) (_ = u[g]) && (x[g] = S = h.call(_, _.__data__, g, u) + "", v.has(S) ? p[g] = _ : v.set(S, _));
	for (g = 0; g < b; ++g) S = h.call(t, m[g], g, m) + "", (_ = v.get(S)) ? (f[g] = _, _.__data__ = m[g], v.delete(S)) : d[g] = new EnterNode(t, m[g]);
	for (g = 0; g < y; ++g) (_ = u[g]) && v.get(x[g]) === _ && (p[g] = _);
}
function datum(t) {
	return t.__data__;
}
function data_default(t, u) {
	if (!arguments.length) return Array.from(this, datum);
	var d = u ? bindKey : bindIndex, f = this._parents, p = this._groups;
	typeof t != "function" && (t = constant_default$2(t));
	for (var m = p.length, h = Array(m), g = Array(m), _ = Array(m), v = 0; v < m; ++v) {
		var y = f[v], b = p[v], x = b.length, S = arraylike(t.call(y, y && y.__data__, v, f)), C = S.length, w = g[v] = Array(C), T = h[v] = Array(C), E = _[v] = Array(x);
		d(y, b, w, T, E, S, u);
		for (var D = 0, O = 0, k, A; D < C; ++D) if (k = w[D]) {
			for (D >= O && (O = D + 1); !(A = T[O]) && ++O < C;);
			k._next = A || null;
		}
	}
	return h = new Selection$1(h, f), h._enter = g, h._exit = _, h;
}
function arraylike(t) {
	return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function exit_default() {
	return new Selection$1(this._exit || this._groups.map(sparse_default), this._parents);
}
function join_default(t, u, d) {
	var f = this.enter(), p = this, m = this.exit();
	return typeof t == "function" ? (f = t(f), f &&= f.selection()) : f = f.append(t + ""), u != null && (p = u(p), p &&= p.selection()), d == null ? m.remove() : d(m), f && p ? f.merge(p).order() : p;
}
function merge_default$1(t) {
	for (var u = t.selection ? t.selection() : t, d = this._groups, f = u._groups, p = d.length, m = f.length, h = Math.min(p, m), g = Array(p), _ = 0; _ < h; ++_) for (var v = d[_], y = f[_], b = v.length, x = g[_] = Array(b), S, C = 0; C < b; ++C) (S = v[C] || y[C]) && (x[C] = S);
	for (; _ < p; ++_) g[_] = d[_];
	return new Selection$1(g, this._parents);
}
function order_default() {
	for (var t = this._groups, u = -1, d = t.length; ++u < d;) for (var f = t[u], p = f.length - 1, m = f[p], h; --p >= 0;) (h = f[p]) && (m && h.compareDocumentPosition(m) ^ 4 && m.parentNode.insertBefore(h, m), m = h);
	return this;
}
function sort_default(t) {
	t ||= ascending$1;
	function u(u, d) {
		return u && d ? t(u.__data__, d.__data__) : !u - !d;
	}
	for (var d = this._groups, f = d.length, p = Array(f), m = 0; m < f; ++m) {
		for (var h = d[m], g = h.length, _ = p[m] = Array(g), v, y = 0; y < g; ++y) (v = h[y]) && (_[y] = v);
		_.sort(u);
	}
	return new Selection$1(p, this._parents).order();
}
function ascending$1(t, u) {
	return t < u ? -1 : t > u ? 1 : t >= u ? 0 : NaN;
}
function call_default() {
	var t = arguments[0];
	return arguments[0] = this, t.apply(null, arguments), this;
}
function nodes_default() {
	return Array.from(this);
}
function node_default() {
	for (var t = this._groups, u = 0, d = t.length; u < d; ++u) for (var f = t[u], p = 0, m = f.length; p < m; ++p) {
		var h = f[p];
		if (h) return h;
	}
	return null;
}
function size_default() {
	let t = 0;
	for (let u of this) ++t;
	return t;
}
function empty_default() {
	return !this.node();
}
function each_default(t) {
	for (var u = this._groups, d = 0, f = u.length; d < f; ++d) for (var p = u[d], m = 0, h = p.length, g; m < h; ++m) (g = p[m]) && t.call(g, g.__data__, m, p);
	return this;
}
function attrRemove$1(t) {
	return function() {
		this.removeAttribute(t);
	};
}
function attrRemoveNS$1(t) {
	return function() {
		this.removeAttributeNS(t.space, t.local);
	};
}
function attrConstant$1(t, u) {
	return function() {
		this.setAttribute(t, u);
	};
}
function attrConstantNS$1(t, u) {
	return function() {
		this.setAttributeNS(t.space, t.local, u);
	};
}
function attrFunction$1(t, u) {
	return function() {
		var d = u.apply(this, arguments);
		d == null ? this.removeAttribute(t) : this.setAttribute(t, d);
	};
}
function attrFunctionNS$1(t, u) {
	return function() {
		var d = u.apply(this, arguments);
		d == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, d);
	};
}
function attr_default$1(t, d) {
	var f = namespace_default(t);
	if (arguments.length < 2) {
		var p = this.node();
		return f.local ? p.getAttributeNS(f.space, f.local) : p.getAttribute(f);
	}
	return this.each((d == null ? f.local ? attrRemoveNS$1 : attrRemove$1 : typeof d == "function" ? f.local ? attrFunctionNS$1 : attrFunction$1 : f.local ? attrConstantNS$1 : attrConstant$1)(f, d));
}
function window_default(t) {
	return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function styleRemove$1(t) {
	return function() {
		this.style.removeProperty(t);
	};
}
function styleConstant$1(t, u, d) {
	return function() {
		this.style.setProperty(t, u, d);
	};
}
function styleFunction$1(t, u, d) {
	return function() {
		var f = u.apply(this, arguments);
		f == null ? this.style.removeProperty(t) : this.style.setProperty(t, f, d);
	};
}
function style_default$1(t, u, d) {
	return arguments.length > 1 ? this.each((u == null ? styleRemove$1 : typeof u == "function" ? styleFunction$1 : styleConstant$1)(t, u, d ?? "")) : styleValue(this.node(), t);
}
function styleValue(t, u) {
	return t.style.getPropertyValue(u) || window_default(t).getComputedStyle(t, null).getPropertyValue(u);
}
function propertyRemove(t) {
	return function() {
		delete this[t];
	};
}
function propertyConstant(t, u) {
	return function() {
		this[t] = u;
	};
}
function propertyFunction(t, u) {
	return function() {
		var d = u.apply(this, arguments);
		d == null ? delete this[t] : this[t] = d;
	};
}
function property_default(t, u) {
	return arguments.length > 1 ? this.each((u == null ? propertyRemove : typeof u == "function" ? propertyFunction : propertyConstant)(t, u)) : this.node()[t];
}
function classArray(t) {
	return t.trim().split(/^|\s+/);
}
function classList(t) {
	return t.classList || new ClassList(t);
}
function ClassList(t) {
	this._node = t, this._names = classArray(t.getAttribute("class") || "");
}
ClassList.prototype = {
	add: function(t) {
		this._names.indexOf(t) < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
	},
	remove: function(t) {
		var u = this._names.indexOf(t);
		u >= 0 && (this._names.splice(u, 1), this._node.setAttribute("class", this._names.join(" ")));
	},
	contains: function(t) {
		return this._names.indexOf(t) >= 0;
	}
};
function classedAdd(t, u) {
	for (var d = classList(t), f = -1, p = u.length; ++f < p;) d.add(u[f]);
}
function classedRemove(t, u) {
	for (var d = classList(t), f = -1, p = u.length; ++f < p;) d.remove(u[f]);
}
function classedTrue(t) {
	return function() {
		classedAdd(this, t);
	};
}
function classedFalse(t) {
	return function() {
		classedRemove(this, t);
	};
}
function classedFunction(t, u) {
	return function() {
		(u.apply(this, arguments) ? classedAdd : classedRemove)(this, t);
	};
}
function classed_default(t, u) {
	var d = classArray(t + "");
	if (arguments.length < 2) {
		for (var f = classList(this.node()), p = -1, m = d.length; ++p < m;) if (!f.contains(d[p])) return !1;
		return !0;
	}
	return this.each((typeof u == "function" ? classedFunction : u ? classedTrue : classedFalse)(d, u));
}
function textRemove() {
	this.textContent = "";
}
function textConstant$1(t) {
	return function() {
		this.textContent = t;
	};
}
function textFunction$1(t) {
	return function() {
		this.textContent = t.apply(this, arguments) ?? "";
	};
}
function text_default$1(t) {
	return arguments.length ? this.each(t == null ? textRemove : (typeof t == "function" ? textFunction$1 : textConstant$1)(t)) : this.node().textContent;
}
function htmlRemove() {
	this.innerHTML = "";
}
function htmlConstant(t) {
	return function() {
		this.innerHTML = t;
	};
}
function htmlFunction(t) {
	return function() {
		this.innerHTML = t.apply(this, arguments) ?? "";
	};
}
function html_default(t) {
	return arguments.length ? this.each(t == null ? htmlRemove : (typeof t == "function" ? htmlFunction : htmlConstant)(t)) : this.node().innerHTML;
}
function raise() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function raise_default() {
	return this.each(raise);
}
function lower() {
	this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
	return this.each(lower);
}
function append_default(t) {
	var u = typeof t == "function" ? t : creator_default(t);
	return this.select(function() {
		return this.appendChild(u.apply(this, arguments));
	});
}
function constantNull() {
	return null;
}
function insert_default(t, u) {
	var d = typeof t == "function" ? t : creator_default(t), f = u == null ? constantNull : typeof u == "function" ? u : selector_default(u);
	return this.select(function() {
		return this.insertBefore(d.apply(this, arguments), f.apply(this, arguments) || null);
	});
}
function remove() {
	var t = this.parentNode;
	t && t.removeChild(this);
}
function remove_default$1() {
	return this.each(remove);
}
function selection_cloneShallow() {
	var t = this.cloneNode(!1), u = this.parentNode;
	return u ? u.insertBefore(t, this.nextSibling) : t;
}
function selection_cloneDeep() {
	var t = this.cloneNode(!0), u = this.parentNode;
	return u ? u.insertBefore(t, this.nextSibling) : t;
}
function clone_default(t) {
	return this.select(t ? selection_cloneDeep : selection_cloneShallow);
}
function datum_default(t) {
	return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function contextListener(t) {
	return function(u) {
		t.call(this, u, this.__data__);
	};
}
function parseTypenames$1(t) {
	return t.trim().split(/^|\s+/).map(function(t) {
		var u = "", d = t.indexOf(".");
		return d >= 0 && (u = t.slice(d + 1), t = t.slice(0, d)), {
			type: t,
			name: u
		};
	});
}
function onRemove(t) {
	return function() {
		var u = this.__on;
		if (u) {
			for (var d = 0, f = -1, p = u.length, m; d < p; ++d) m = u[d], (!t.type || m.type === t.type) && m.name === t.name ? this.removeEventListener(m.type, m.listener, m.options) : u[++f] = m;
			++f ? u.length = f : delete this.__on;
		}
	};
}
function onAdd(t, u, d) {
	return function() {
		var f = this.__on, p, m = contextListener(u);
		if (f) {
			for (var h = 0, g = f.length; h < g; ++h) if ((p = f[h]).type === t.type && p.name === t.name) {
				this.removeEventListener(p.type, p.listener, p.options), this.addEventListener(p.type, p.listener = m, p.options = d), p.value = u;
				return;
			}
		}
		this.addEventListener(t.type, m, d), p = {
			type: t.type,
			name: t.name,
			value: u,
			listener: m,
			options: d
		}, f ? f.push(p) : this.__on = [p];
	};
}
function on_default$1(t, u, d) {
	var f = parseTypenames$1(t + ""), p, m = f.length, h;
	if (arguments.length < 2) {
		var g = this.node().__on;
		if (g) {
			for (var _ = 0, v = g.length, y; _ < v; ++_) for (p = 0, y = g[_]; p < m; ++p) if ((h = f[p]).type === y.type && h.name === y.name) return y.value;
		}
		return;
	}
	for (g = u ? onAdd : onRemove, p = 0; p < m; ++p) this.each(g(f[p], u, d));
	return this;
}
function dispatchEvent(t, u, d) {
	var f = window_default(t), p = f.CustomEvent;
	typeof p == "function" ? p = new p(u, d) : (p = f.document.createEvent("Event"), d ? (p.initEvent(u, d.bubbles, d.cancelable), p.detail = d.detail) : p.initEvent(u, !1, !1)), t.dispatchEvent(p);
}
function dispatchConstant(t, u) {
	return function() {
		return dispatchEvent(this, t, u);
	};
}
function dispatchFunction(t, u) {
	return function() {
		return dispatchEvent(this, t, u.apply(this, arguments));
	};
}
function dispatch_default$1(t, u) {
	return this.each((typeof u == "function" ? dispatchFunction : dispatchConstant)(t, u));
}
function* iterator_default() {
	for (var t = this._groups, u = 0, d = t.length; u < d; ++u) for (var f = t[u], p = 0, m = f.length, h; p < m; ++p) (h = f[p]) && (yield h);
}
var root = [null];
function Selection$1(t, u) {
	this._groups = t, this._parents = u;
}
function selection() {
	return new Selection$1([[document.documentElement]], root);
}
function selection_selection() {
	return this;
}
Selection$1.prototype = selection.prototype = {
	constructor: Selection$1,
	select: select_default$2,
	selectAll: selectAll_default$1,
	selectChild: selectChild_default,
	selectChildren: selectChildren_default,
	filter: filter_default$1,
	data: data_default,
	enter: enter_default,
	exit: exit_default,
	join: join_default,
	merge: merge_default$1,
	selection: selection_selection,
	order: order_default,
	sort: sort_default,
	call: call_default,
	nodes: nodes_default,
	node: node_default,
	size: size_default,
	empty: empty_default,
	each: each_default,
	attr: attr_default$1,
	style: style_default$1,
	property: property_default,
	classed: classed_default,
	text: text_default$1,
	html: html_default,
	raise: raise_default,
	lower: lower_default,
	append: append_default,
	insert: insert_default,
	remove: remove_default$1,
	clone: clone_default,
	datum: datum_default,
	on: on_default$1,
	dispatch: dispatch_default$1,
	[Symbol.iterator]: iterator_default
};
var selection_default = selection;
function select_default(t) {
	return typeof t == "string" ? new Selection$1([[document.querySelector(t)]], [document.documentElement]) : new Selection$1([[t]], root);
}
function sourceEvent_default(t) {
	let u;
	for (; u = t.sourceEvent;) t = u;
	return t;
}
function pointer_default(t, u) {
	if (t = sourceEvent_default(t), u === void 0 && (u = t.currentTarget), u) {
		var d = u.ownerSVGElement || u;
		if (d.createSVGPoint) {
			var f = d.createSVGPoint();
			return f.x = t.clientX, f.y = t.clientY, f = f.matrixTransform(u.getScreenCTM().inverse()), [f.x, f.y];
		}
		if (u.getBoundingClientRect) {
			var p = u.getBoundingClientRect();
			return [t.clientX - p.left - u.clientLeft, t.clientY - p.top - u.clientTop];
		}
	}
	return [t.pageX, t.pageY];
}
function ascending(t, u) {
	return t == null || u == null ? NaN : t < u ? -1 : t > u ? 1 : t >= u ? 0 : NaN;
}
function descending(t, u) {
	return t == null || u == null ? NaN : u < t ? -1 : u > t ? 1 : u >= t ? 0 : NaN;
}
function bisector(t) {
	let u, d, f;
	t.length === 2 ? (u = t === ascending || t === descending ? t : zero$1, d = t, f = t) : (u = ascending, d = (u, d) => ascending(t(u), d), f = (u, d) => t(u) - d);
	function p(t, f, p = 0, m = t.length) {
		if (p < m) {
			if (u(f, f) !== 0) return m;
			do {
				let u = p + m >>> 1;
				d(t[u], f) < 0 ? p = u + 1 : m = u;
			} while (p < m);
		}
		return p;
	}
	function m(t, f, p = 0, m = t.length) {
		if (p < m) {
			if (u(f, f) !== 0) return m;
			do {
				let u = p + m >>> 1;
				d(t[u], f) <= 0 ? p = u + 1 : m = u;
			} while (p < m);
		}
		return p;
	}
	function h(t, u, d = 0, m = t.length) {
		let h = p(t, u, d, m - 1);
		return h > d && f(t[h - 1], u) > -f(t[h], u) ? h - 1 : h;
	}
	return {
		left: p,
		center: h,
		right: m
	};
}
function zero$1() {
	return 0;
}
function number$3(t) {
	return t === null ? NaN : +t;
}
var ascendingBisect = bisector(ascending);
const bisectRight = ascendingBisect.right;
ascendingBisect.left, bisector(number$3).center;
var bisect_default = bisectRight, e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
function tickSpec(t, u, d) {
	let f = (u - t) / Math.max(0, d), p = Math.floor(Math.log10(f)), m = f / 10 ** p, h = m >= e10 ? 10 : m >= e5 ? 5 : m >= e2 ? 2 : 1, g, _, v;
	return p < 0 ? (v = 10 ** -p / h, g = Math.round(t * v), _ = Math.round(u * v), g / v < t && ++g, _ / v > u && --_, v = -v) : (v = 10 ** p * h, g = Math.round(t / v), _ = Math.round(u / v), g * v < t && ++g, _ * v > u && --_), _ < g && .5 <= d && d < 2 ? tickSpec(t, u, d * 2) : [
		g,
		_,
		v
	];
}
function tickIncrement(t, u, d) {
	return u = +u, t = +t, d = +d, tickSpec(t, u, d)[2];
}
function tickStep(t, u, d) {
	u = +u, t = +t, d = +d;
	let f = u < t, p = f ? tickIncrement(u, t, d) : tickIncrement(t, u, d);
	return (f ? -1 : 1) * (p < 0 ? 1 / -p : p);
}
function max(t, u) {
	let d;
	if (u === void 0) for (let u of t) u != null && (d < u || d === void 0 && u >= u) && (d = u);
	else {
		let f = -1;
		for (let p of t) (p = u(p, ++f, t)) != null && (d < p || d === void 0 && p >= p) && (d = p);
	}
	return d;
}
function min(t, u) {
	let d;
	if (u === void 0) for (let u of t) u != null && (d > u || d === void 0 && u >= u) && (d = u);
	else {
		let f = -1;
		for (let p of t) (p = u(p, ++f, t)) != null && (d > p || d === void 0 && p >= p) && (d = p);
	}
	return d;
}
function initRange(t, u) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			this.range(t);
			break;
		default:
			this.range(u).domain(t);
			break;
	}
	return this;
}
function define_default(t, u, d) {
	t.prototype = u.prototype = d, d.constructor = t;
}
function extend(t, u) {
	var d = Object.create(t.prototype);
	for (var f in u) d[f] = u[f];
	return d;
}
function Color() {}
var darker = .7, brighter = 1 / darker, reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = /* @__PURE__ */ RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = /* @__PURE__ */ RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = /* @__PURE__ */ RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = /* @__PURE__ */ RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = /* @__PURE__ */ RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = /* @__PURE__ */ RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`), named = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
define_default(Color, color, {
	copy(t) {
		return Object.assign(new this.constructor(), this, t);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: color_formatHex,
	formatHex: color_formatHex,
	formatHex8: color_formatHex8,
	formatHsl: color_formatHsl,
	formatRgb: color_formatRgb,
	toString: color_formatRgb
});
function color_formatHex() {
	return this.rgb().formatHex();
}
function color_formatHex8() {
	return this.rgb().formatHex8();
}
function color_formatHsl() {
	return hslConvert(this).formatHsl();
}
function color_formatRgb() {
	return this.rgb().formatRgb();
}
function color(t) {
	var u, d;
	return t = (t + "").trim().toLowerCase(), (u = reHex.exec(t)) ? (d = u[1].length, u = parseInt(u[1], 16), d === 6 ? rgbn(u) : d === 3 ? new Rgb(u >> 8 & 15 | u >> 4 & 240, u >> 4 & 15 | u & 240, (u & 15) << 4 | u & 15, 1) : d === 8 ? rgba(u >> 24 & 255, u >> 16 & 255, u >> 8 & 255, (u & 255) / 255) : d === 4 ? rgba(u >> 12 & 15 | u >> 8 & 240, u >> 8 & 15 | u >> 4 & 240, u >> 4 & 15 | u & 240, ((u & 15) << 4 | u & 15) / 255) : null) : (u = reRgbInteger.exec(t)) ? new Rgb(u[1], u[2], u[3], 1) : (u = reRgbPercent.exec(t)) ? new Rgb(u[1] * 255 / 100, u[2] * 255 / 100, u[3] * 255 / 100, 1) : (u = reRgbaInteger.exec(t)) ? rgba(u[1], u[2], u[3], u[4]) : (u = reRgbaPercent.exec(t)) ? rgba(u[1] * 255 / 100, u[2] * 255 / 100, u[3] * 255 / 100, u[4]) : (u = reHslPercent.exec(t)) ? hsla(u[1], u[2] / 100, u[3] / 100, 1) : (u = reHslaPercent.exec(t)) ? hsla(u[1], u[2] / 100, u[3] / 100, u[4]) : named.hasOwnProperty(t) ? rgbn(named[t]) : t === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(t) {
	return new Rgb(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function rgba(t, u, d, f) {
	return f <= 0 && (t = u = d = NaN), new Rgb(t, u, d, f);
}
function rgbConvert(t) {
	return t instanceof Color || (t = color(t)), t ? (t = t.rgb(), new Rgb(t.r, t.g, t.b, t.opacity)) : new Rgb();
}
function rgb(t, u, d, f) {
	return arguments.length === 1 ? rgbConvert(t) : new Rgb(t, u, d, f ?? 1);
}
function Rgb(t, u, d, f) {
	this.r = +t, this.g = +u, this.b = +d, this.opacity = +f;
}
define_default(Rgb, rgb, extend(Color, {
	brighter(t) {
		return t = t == null ? brighter : brighter ** +t, new Rgb(this.r * t, this.g * t, this.b * t, this.opacity);
	},
	darker(t) {
		return t = t == null ? darker : darker ** +t, new Rgb(this.r * t, this.g * t, this.b * t, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: rgb_formatHex,
	formatHex: rgb_formatHex,
	formatHex8: rgb_formatHex8,
	formatRgb: rgb_formatRgb,
	toString: rgb_formatRgb
}));
function rgb_formatHex() {
	return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
	return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
	let t = clampa(this.opacity);
	return `${t === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function clampa(t) {
	return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function clampi(t) {
	return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function hex(t) {
	return t = clampi(t), (t < 16 ? "0" : "") + t.toString(16);
}
function hsla(t, u, d, f) {
	return f <= 0 ? t = u = d = NaN : d <= 0 || d >= 1 ? t = u = NaN : u <= 0 && (t = NaN), new Hsl(t, u, d, f);
}
function hslConvert(t) {
	if (t instanceof Hsl) return new Hsl(t.h, t.s, t.l, t.opacity);
	if (t instanceof Color || (t = color(t)), !t) return new Hsl();
	if (t instanceof Hsl) return t;
	t = t.rgb();
	var u = t.r / 255, d = t.g / 255, f = t.b / 255, p = Math.min(u, d, f), m = Math.max(u, d, f), h = NaN, g = m - p, _ = (m + p) / 2;
	return g ? (h = u === m ? (d - f) / g + (d < f) * 6 : d === m ? (f - u) / g + 2 : (u - d) / g + 4, g /= _ < .5 ? m + p : 2 - m - p, h *= 60) : g = _ > 0 && _ < 1 ? 0 : h, new Hsl(h, g, _, t.opacity);
}
function hsl(t, u, d, f) {
	return arguments.length === 1 ? hslConvert(t) : new Hsl(t, u, d, f ?? 1);
}
function Hsl(t, u, d, f) {
	this.h = +t, this.s = +u, this.l = +d, this.opacity = +f;
}
define_default(Hsl, hsl, extend(Color, {
	brighter(t) {
		return t = t == null ? brighter : brighter ** +t, new Hsl(this.h, this.s, this.l * t, this.opacity);
	},
	darker(t) {
		return t = t == null ? darker : darker ** +t, new Hsl(this.h, this.s, this.l * t, this.opacity);
	},
	rgb() {
		var t = this.h % 360 + (this.h < 0) * 360, u = isNaN(t) || isNaN(this.s) ? 0 : this.s, d = this.l, f = d + (d < .5 ? d : 1 - d) * u, p = 2 * d - f;
		return new Rgb(hsl2rgb(t >= 240 ? t - 240 : t + 120, p, f), hsl2rgb(t, p, f), hsl2rgb(t < 120 ? t + 240 : t - 120, p, f), this.opacity);
	},
	clamp() {
		return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let t = clampa(this.opacity);
		return `${t === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
	}
}));
function clamph(t) {
	return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function clampt(t) {
	return Math.max(0, Math.min(1, t || 0));
}
function hsl2rgb(t, u, d) {
	return (t < 60 ? u + (d - u) * t / 60 : t < 180 ? d : t < 240 ? u + (d - u) * (240 - t) / 60 : u) * 255;
}
var constant_default$1 = (t) => () => t;
function linear(t, u) {
	return function(d) {
		return t + d * u;
	};
}
function exponential(t, u, d) {
	return t **= +d, u = u ** +d - t, d = 1 / d, function(f) {
		return (t + f * u) ** +d;
	};
}
function gamma(t) {
	return (t = +t) == 1 ? nogamma : function(u, d) {
		return d - u ? exponential(u, d, t) : constant_default$1(isNaN(u) ? d : u);
	};
}
function nogamma(t, u) {
	var d = u - t;
	return d ? linear(t, d) : constant_default$1(isNaN(t) ? u : t);
}
var rgb_default = (function t(u) {
	var d = gamma(u);
	function f(t, u) {
		var f = d((t = rgb(t)).r, (u = rgb(u)).r), p = d(t.g, u.g), m = d(t.b, u.b), h = nogamma(t.opacity, u.opacity);
		return function(u) {
			return t.r = f(u), t.g = p(u), t.b = m(u), t.opacity = h(u), t + "";
		};
	}
	return f.gamma = t, f;
})(1);
function numberArray_default(t, u) {
	u ||= [];
	var d = t ? Math.min(u.length, t.length) : 0, f = u.slice(), p;
	return function(m) {
		for (p = 0; p < d; ++p) f[p] = t[p] * (1 - m) + u[p] * m;
		return f;
	};
}
function isNumberArray(t) {
	return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function genericArray(t, u) {
	var d = u ? u.length : 0, f = t ? Math.min(d, t.length) : 0, p = Array(f), m = Array(d), h;
	for (h = 0; h < f; ++h) p[h] = value_default(t[h], u[h]);
	for (; h < d; ++h) m[h] = u[h];
	return function(t) {
		for (h = 0; h < f; ++h) m[h] = p[h](t);
		return m;
	};
}
function date_default(t, u) {
	var d = /* @__PURE__ */ new Date();
	return t = +t, u = +u, function(f) {
		return d.setTime(t * (1 - f) + u * f), d;
	};
}
function number_default(t, u) {
	return t = +t, u = +u, function(d) {
		return t * (1 - d) + u * d;
	};
}
function object_default(t, u) {
	var d = {}, f = {}, p;
	for (p in (typeof t != "object" || !t) && (t = {}), (typeof u != "object" || !u) && (u = {}), u) p in t ? d[p] = value_default(t[p], u[p]) : f[p] = u[p];
	return function(t) {
		for (p in d) f[p] = d[p](t);
		return f;
	};
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(t) {
	return function() {
		return t;
	};
}
function one(t) {
	return function(u) {
		return t(u) + "";
	};
}
function string_default(t, u) {
	var d = reA.lastIndex = reB.lastIndex = 0, f, p, m, h = -1, g = [], _ = [];
	for (t += "", u += ""; (f = reA.exec(t)) && (p = reB.exec(u));) (m = p.index) > d && (m = u.slice(d, m), g[h] ? g[h] += m : g[++h] = m), (f = f[0]) === (p = p[0]) ? g[h] ? g[h] += p : g[++h] = p : (g[++h] = null, _.push({
		i: h,
		x: number_default(f, p)
	})), d = reB.lastIndex;
	return d < u.length && (m = u.slice(d), g[h] ? g[h] += m : g[++h] = m), g.length < 2 ? _[0] ? one(_[0].x) : zero(u) : (u = _.length, function(t) {
		for (var d = 0, f; d < u; ++d) g[(f = _[d]).i] = f.x(t);
		return g.join("");
	});
}
function value_default(t, u) {
	var d = typeof u, f;
	return u == null || d === "boolean" ? constant_default$1(u) : (d === "number" ? number_default : d === "string" ? (f = color(u)) ? (u = f, rgb_default) : string_default : u instanceof color ? rgb_default : u instanceof Date ? date_default : isNumberArray(u) ? numberArray_default : Array.isArray(u) ? genericArray : typeof u.valueOf != "function" && typeof u.toString != "function" || isNaN(u) ? object_default : number_default)(t, u);
}
function round_default(t, u) {
	return t = +t, u = +u, function(d) {
		return Math.round(t * (1 - d) + u * d);
	};
}
var degrees = 180 / Math.PI, identity$2 = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function decompose_default(t, u, d, f, p, m) {
	var h, g, _;
	return (h = Math.sqrt(t * t + u * u)) && (t /= h, u /= h), (_ = t * d + u * f) && (d -= t * _, f -= u * _), (g = Math.sqrt(d * d + f * f)) && (d /= g, f /= g, _ /= g), t * f < u * d && (t = -t, u = -u, _ = -_, h = -h), {
		translateX: p,
		translateY: m,
		rotate: Math.atan2(u, t) * degrees,
		skewX: Math.atan(_) * degrees,
		scaleX: h,
		scaleY: g
	};
}
var svgNode;
function parseCss(t) {
	let u = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
	return u.isIdentity ? identity$2 : decompose_default(u.a, u.b, u.c, u.d, u.e, u.f);
}
function parseSvg(t) {
	return t == null || (svgNode ||= document.createElementNS("http://www.w3.org/2000/svg", "g"), svgNode.setAttribute("transform", t), !(t = svgNode.transform.baseVal.consolidate())) ? identity$2 : (t = t.matrix, decompose_default(t.a, t.b, t.c, t.d, t.e, t.f));
}
function interpolateTransform(t, u, d, f) {
	function p(t) {
		return t.length ? t.pop() + " " : "";
	}
	function m(t, f, p, m, h, g) {
		if (t !== p || f !== m) {
			var _ = h.push("translate(", null, u, null, d);
			g.push({
				i: _ - 4,
				x: number_default(t, p)
			}, {
				i: _ - 2,
				x: number_default(f, m)
			});
		} else (p || m) && h.push("translate(" + p + u + m + d);
	}
	function h(t, u, d, m) {
		t === u ? u && d.push(p(d) + "rotate(" + u + f) : (t - u > 180 ? u += 360 : u - t > 180 && (t += 360), m.push({
			i: d.push(p(d) + "rotate(", null, f) - 2,
			x: number_default(t, u)
		}));
	}
	function g(t, u, d, m) {
		t === u ? u && d.push(p(d) + "skewX(" + u + f) : m.push({
			i: d.push(p(d) + "skewX(", null, f) - 2,
			x: number_default(t, u)
		});
	}
	function _(t, u, d, f, m, h) {
		if (t !== d || u !== f) {
			var g = m.push(p(m) + "scale(", null, ",", null, ")");
			h.push({
				i: g - 4,
				x: number_default(t, d)
			}, {
				i: g - 2,
				x: number_default(u, f)
			});
		} else (d !== 1 || f !== 1) && m.push(p(m) + "scale(" + d + "," + f + ")");
	}
	return function(u, d) {
		var f = [], p = [];
		return u = t(u), d = t(d), m(u.translateX, u.translateY, d.translateX, d.translateY, f, p), h(u.rotate, d.rotate, f, p), g(u.skewX, d.skewX, f, p), _(u.scaleX, u.scaleY, d.scaleX, d.scaleY, f, p), u = d = null, function(t) {
			for (var u = -1, d = p.length, m; ++u < d;) f[(m = p[u]).i] = m.x(t);
			return f.join("");
		};
	};
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)"), interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")"), epsilon2 = 1e-12;
function cosh(t) {
	return ((t = Math.exp(t)) + 1 / t) / 2;
}
function sinh(t) {
	return ((t = Math.exp(t)) - 1 / t) / 2;
}
function tanh(t) {
	return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
var zoom_default$1 = (function t(u, d, f) {
	function p(t, p) {
		var m = t[0], h = t[1], g = t[2], _ = p[0], v = p[1], y = p[2], b = _ - m, x = v - h, S = b * b + x * x, C, w;
		if (S < epsilon2) w = Math.log(y / g) / u, C = function(t) {
			return [
				m + t * b,
				h + t * x,
				g * Math.exp(u * t * w)
			];
		};
		else {
			var T = Math.sqrt(S), E = (y * y - g * g + f * S) / (2 * g * d * T), D = (y * y - g * g - f * S) / (2 * y * d * T), O = Math.log(Math.sqrt(E * E + 1) - E);
			w = (Math.log(Math.sqrt(D * D + 1) - D) - O) / u, C = function(t) {
				var f = t * w, p = cosh(O), _ = g / (d * T) * (p * tanh(u * f + O) - sinh(O));
				return [
					m + _ * b,
					h + _ * x,
					g * p / cosh(u * f + O)
				];
			};
		}
		return C.duration = w * 1e3 * u / Math.SQRT2, C;
	}
	return p.rho = function(u) {
		var d = Math.max(.001, +u), f = d * d, p = f * f;
		return t(d, f, p);
	}, p;
})(Math.SQRT2, 2, 4);
function constants(t) {
	return function() {
		return t;
	};
}
function number$2(t) {
	return +t;
}
var unit = [0, 1];
function identity$1(t) {
	return t;
}
function normalize(t, u) {
	return (u -= t = +t) ? function(d) {
		return (d - t) / u;
	} : constants(isNaN(u) ? NaN : .5);
}
function clamper(t, u) {
	var d;
	return t > u && (d = t, t = u, u = d), function(d) {
		return Math.max(t, Math.min(u, d));
	};
}
function bimap(t, u, d) {
	var f = t[0], p = t[1], m = u[0], h = u[1];
	return p < f ? (f = normalize(p, f), m = d(h, m)) : (f = normalize(f, p), m = d(m, h)), function(t) {
		return m(f(t));
	};
}
function polymap(t, u, d) {
	var f = Math.min(t.length, u.length) - 1, p = Array(f), m = Array(f), h = -1;
	for (t[f] < t[0] && (t = t.slice().reverse(), u = u.slice().reverse()); ++h < f;) p[h] = normalize(t[h], t[h + 1]), m[h] = d(u[h], u[h + 1]);
	return function(u) {
		var d = bisect_default(t, u, 1, f) - 1;
		return m[d](p[d](u));
	};
}
function copy(t, u) {
	return u.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function transformer() {
	var t = unit, u = unit, d = value_default, f, p, m, h = identity$1, g, _, v;
	function y() {
		var d = Math.min(t.length, u.length);
		return h !== identity$1 && (h = clamper(t[0], t[d - 1])), g = d > 2 ? polymap : bimap, _ = v = null, b;
	}
	function b(p) {
		return p == null || isNaN(p = +p) ? m : (_ ||= g(t.map(f), u, d))(f(h(p)));
	}
	return b.invert = function(d) {
		return h(p((v ||= g(u, t.map(f), number_default))(d)));
	}, b.domain = function(u) {
		return arguments.length ? (t = Array.from(u, number$2), y()) : t.slice();
	}, b.range = function(t) {
		return arguments.length ? (u = Array.from(t), y()) : u.slice();
	}, b.rangeRound = function(t) {
		return u = Array.from(t), d = round_default, y();
	}, b.clamp = function(t) {
		return arguments.length ? (h = t ? !0 : identity$1, y()) : h !== identity$1;
	}, b.interpolate = function(t) {
		return arguments.length ? (d = t, y()) : d;
	}, b.unknown = function(t) {
		return arguments.length ? (m = t, b) : m;
	}, function(t, u) {
		return f = t, p = u, y();
	};
}
function continuous() {
	return transformer()(identity$1, identity$1);
}
function nice(t, u) {
	t = t.slice();
	var d = 0, f = t.length - 1, p = t[d], m = t[f], h;
	return m < p && (h = d, d = f, f = h, h = p, p = m, m = h), t[d] = u.floor(p), t[f] = u.ceil(m), t;
}
var t0 = /* @__PURE__ */ new Date(), t1 = /* @__PURE__ */ new Date();
function timeInterval(t, u, d, f) {
	function p(u) {
		return t(u = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+u)), u;
	}
	return p.floor = (u) => (t(u = /* @__PURE__ */ new Date(+u)), u), p.ceil = (d) => (t(d = /* @__PURE__ */ new Date(d - 1)), u(d, 1), t(d), d), p.round = (t) => {
		let u = p(t), d = p.ceil(t);
		return t - u < d - t ? u : d;
	}, p.offset = (t, d) => (u(t = /* @__PURE__ */ new Date(+t), d == null ? 1 : Math.floor(d)), t), p.range = (d, f, m) => {
		let h = [];
		if (d = p.ceil(d), m = m == null ? 1 : Math.floor(m), !(d < f) || !(m > 0)) return h;
		let g;
		do
			h.push(g = /* @__PURE__ */ new Date(+d)), u(d, m), t(d);
		while (g < d && d < f);
		return h;
	}, p.filter = (d) => timeInterval((u) => {
		if (u >= u) for (; t(u), !d(u);) u.setTime(u - 1);
	}, (t, f) => {
		if (t >= t) if (f < 0) for (; ++f <= 0;) for (; u(t, -1), !d(t););
		else for (; --f >= 0;) for (; u(t, 1), !d(t););
	}), d && (p.count = (u, f) => (t0.setTime(+u), t1.setTime(+f), t(t0), t(t1), Math.floor(d(t0, t1))), p.every = (t) => (t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? p.filter(f ? (u) => f(u) % t === 0 : (u) => p.count(0, u) % t === 0) : p)), p;
}
const millisecond = timeInterval(() => {}, (t, u) => {
	t.setTime(+t + u);
}, (t, u) => u - t);
millisecond.every = (t) => (t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? timeInterval((u) => {
	u.setTime(Math.floor(u / t) * t);
}, (u, d) => {
	u.setTime(+u + d * t);
}, (u, d) => (d - u) / t) : millisecond), millisecond.range;
const durationSecond = 1e3, durationMinute = durationSecond * 60, durationHour = durationMinute * 60, durationDay = durationHour * 24, durationWeek = durationDay * 7, durationMonth = durationDay * 30, durationYear = durationDay * 365, second = timeInterval((t) => {
	t.setTime(t - t.getMilliseconds());
}, (t, u) => {
	t.setTime(+t + u * durationSecond);
}, (t, u) => (u - t) / durationSecond, (t) => t.getUTCSeconds());
second.range;
const timeMinute = timeInterval((t) => {
	t.setTime(t - t.getMilliseconds() - t.getSeconds() * durationSecond);
}, (t, u) => {
	t.setTime(+t + u * durationMinute);
}, (t, u) => (u - t) / durationMinute, (t) => t.getMinutes());
timeMinute.range;
const utcMinute = timeInterval((t) => {
	t.setUTCSeconds(0, 0);
}, (t, u) => {
	t.setTime(+t + u * durationMinute);
}, (t, u) => (u - t) / durationMinute, (t) => t.getUTCMinutes());
utcMinute.range;
const timeHour = timeInterval((t) => {
	t.setTime(t - t.getMilliseconds() - t.getSeconds() * durationSecond - t.getMinutes() * durationMinute);
}, (t, u) => {
	t.setTime(+t + u * durationHour);
}, (t, u) => (u - t) / durationHour, (t) => t.getHours());
timeHour.range;
const utcHour = timeInterval((t) => {
	t.setUTCMinutes(0, 0, 0);
}, (t, u) => {
	t.setTime(+t + u * durationHour);
}, (t, u) => (u - t) / durationHour, (t) => t.getUTCHours());
utcHour.range;
const timeDay = timeInterval((t) => t.setHours(0, 0, 0, 0), (t, u) => t.setDate(t.getDate() + u), (t, u) => (u - t - (u.getTimezoneOffset() - t.getTimezoneOffset()) * durationMinute) / durationDay, (t) => t.getDate() - 1);
timeDay.range;
const utcDay = timeInterval((t) => {
	t.setUTCHours(0, 0, 0, 0);
}, (t, u) => {
	t.setUTCDate(t.getUTCDate() + u);
}, (t, u) => (u - t) / durationDay, (t) => t.getUTCDate() - 1);
utcDay.range;
const unixDay = timeInterval((t) => {
	t.setUTCHours(0, 0, 0, 0);
}, (t, u) => {
	t.setUTCDate(t.getUTCDate() + u);
}, (t, u) => (u - t) / durationDay, (t) => Math.floor(t / durationDay));
unixDay.range;
function timeWeekday(t) {
	return timeInterval((u) => {
		u.setDate(u.getDate() - (u.getDay() + 7 - t) % 7), u.setHours(0, 0, 0, 0);
	}, (t, u) => {
		t.setDate(t.getDate() + u * 7);
	}, (t, u) => (u - t - (u.getTimezoneOffset() - t.getTimezoneOffset()) * durationMinute) / durationWeek);
}
const timeSunday = timeWeekday(0), timeMonday = timeWeekday(1), timeTuesday = timeWeekday(2), timeWednesday = timeWeekday(3), timeThursday = timeWeekday(4), timeFriday = timeWeekday(5), timeSaturday = timeWeekday(6);
timeSunday.range, timeMonday.range, timeTuesday.range, timeWednesday.range, timeThursday.range, timeFriday.range, timeSaturday.range;
function utcWeekday(t) {
	return timeInterval((u) => {
		u.setUTCDate(u.getUTCDate() - (u.getUTCDay() + 7 - t) % 7), u.setUTCHours(0, 0, 0, 0);
	}, (t, u) => {
		t.setUTCDate(t.getUTCDate() + u * 7);
	}, (t, u) => (u - t) / durationWeek);
}
const utcSunday = utcWeekday(0), utcMonday = utcWeekday(1), utcTuesday = utcWeekday(2), utcWednesday = utcWeekday(3), utcThursday = utcWeekday(4), utcFriday = utcWeekday(5), utcSaturday = utcWeekday(6);
utcSunday.range, utcMonday.range, utcTuesday.range, utcWednesday.range, utcThursday.range, utcFriday.range, utcSaturday.range;
const timeMonth = timeInterval((t) => {
	t.setDate(1), t.setHours(0, 0, 0, 0);
}, (t, u) => {
	t.setMonth(t.getMonth() + u);
}, (t, u) => u.getMonth() - t.getMonth() + (u.getFullYear() - t.getFullYear()) * 12, (t) => t.getMonth());
timeMonth.range;
const utcMonth = timeInterval((t) => {
	t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
}, (t, u) => {
	t.setUTCMonth(t.getUTCMonth() + u);
}, (t, u) => u.getUTCMonth() - t.getUTCMonth() + (u.getUTCFullYear() - t.getUTCFullYear()) * 12, (t) => t.getUTCMonth());
utcMonth.range;
const timeYear = timeInterval((t) => {
	t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, u) => {
	t.setFullYear(t.getFullYear() + u);
}, (t, u) => u.getFullYear() - t.getFullYear(), (t) => t.getFullYear());
timeYear.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : timeInterval((u) => {
	u.setFullYear(Math.floor(u.getFullYear() / t) * t), u.setMonth(0, 1), u.setHours(0, 0, 0, 0);
}, (u, d) => {
	u.setFullYear(u.getFullYear() + d * t);
}), timeYear.range;
const utcYear = timeInterval((t) => {
	t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, u) => {
	t.setUTCFullYear(t.getUTCFullYear() + u);
}, (t, u) => u.getUTCFullYear() - t.getUTCFullYear(), (t) => t.getUTCFullYear());
utcYear.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : timeInterval((u) => {
	u.setUTCFullYear(Math.floor(u.getUTCFullYear() / t) * t), u.setUTCMonth(0, 1), u.setUTCHours(0, 0, 0, 0);
}, (u, d) => {
	u.setUTCFullYear(u.getUTCFullYear() + d * t);
}), utcYear.range;
function ticker(t, u, d, f, p, m) {
	let h = [
		[
			second,
			1,
			durationSecond
		],
		[
			second,
			5,
			5 * durationSecond
		],
		[
			second,
			15,
			15 * durationSecond
		],
		[
			second,
			30,
			30 * durationSecond
		],
		[
			m,
			1,
			durationMinute
		],
		[
			m,
			5,
			5 * durationMinute
		],
		[
			m,
			15,
			15 * durationMinute
		],
		[
			m,
			30,
			30 * durationMinute
		],
		[
			p,
			1,
			durationHour
		],
		[
			p,
			3,
			3 * durationHour
		],
		[
			p,
			6,
			6 * durationHour
		],
		[
			p,
			12,
			12 * durationHour
		],
		[
			f,
			1,
			durationDay
		],
		[
			f,
			2,
			2 * durationDay
		],
		[
			d,
			1,
			durationWeek
		],
		[
			u,
			1,
			durationMonth
		],
		[
			u,
			3,
			3 * durationMonth
		],
		[
			t,
			1,
			durationYear
		]
	];
	function g(t, u, d) {
		let f = u < t;
		f && ([t, u] = [u, t]);
		let p = d && typeof d.range == "function" ? d : _(t, u, d), m = p ? p.range(t, +u + 1) : [];
		return f ? m.reverse() : m;
	}
	function _(u, d, f) {
		let p = Math.abs(d - u) / f, m = bisector(([, , t]) => t).right(h, p);
		if (m === h.length) return t.every(tickStep(u / durationYear, d / durationYear, f));
		if (m === 0) return millisecond.every(Math.max(tickStep(u, d, f), 1));
		let [g, _] = h[p / h[m - 1][2] < h[m][2] / p ? m - 1 : m];
		return g.every(_);
	}
	return [g, _];
}
var [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute), [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);
function localDate(t) {
	if (0 <= t.y && t.y < 100) {
		var u = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
		return u.setFullYear(t.y), u;
	}
	return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function utcDate(t) {
	if (0 <= t.y && t.y < 100) {
		var u = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
		return u.setUTCFullYear(t.y), u;
	}
	return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function newDate(t, u, d) {
	return {
		y: t,
		m: u,
		d,
		H: 0,
		M: 0,
		S: 0,
		L: 0
	};
}
function formatLocale(t) {
	var u = t.dateTime, d = t.date, f = t.time, p = t.periods, m = t.days, h = t.shortDays, g = t.months, _ = t.shortMonths, v = formatRe(p), y = formatLookup(p), b = formatRe(m), x = formatLookup(m), S = formatRe(h), C = formatLookup(h), w = formatRe(g), T = formatLookup(g), E = formatRe(_), D = formatLookup(_), O = {
		a: H,
		A: U,
		b: W,
		B: G,
		c: null,
		d: formatDayOfMonth,
		e: formatDayOfMonth,
		f: formatMicroseconds,
		g: formatYearISO,
		G: formatFullYearISO,
		H: formatHour24,
		I: formatHour12,
		j: formatDayOfYear,
		L: formatMilliseconds,
		m: formatMonthNumber,
		M: formatMinutes,
		p: K,
		q,
		Q: formatUnixTimestamp,
		s: formatUnixTimestampSeconds,
		S: formatSeconds,
		u: formatWeekdayNumberMonday,
		U: formatWeekNumberSunday,
		V: formatWeekNumberISO,
		w: formatWeekdayNumberSunday,
		W: formatWeekNumberMonday,
		x: null,
		X: null,
		y: formatYear,
		Y: formatFullYear,
		Z: formatZone,
		"%": formatLiteralPercent
	}, k = {
		a: J,
		A: Y,
		b: X,
		B: Z,
		c: null,
		d: formatUTCDayOfMonth,
		e: formatUTCDayOfMonth,
		f: formatUTCMicroseconds,
		g: formatUTCYearISO,
		G: formatUTCFullYearISO,
		H: formatUTCHour24,
		I: formatUTCHour12,
		j: formatUTCDayOfYear,
		L: formatUTCMilliseconds,
		m: formatUTCMonthNumber,
		M: formatUTCMinutes,
		p: Q,
		q: $,
		Q: formatUnixTimestamp,
		s: formatUnixTimestampSeconds,
		S: formatUTCSeconds,
		u: formatUTCWeekdayNumberMonday,
		U: formatUTCWeekNumberSunday,
		V: formatUTCWeekNumberISO,
		w: formatUTCWeekdayNumberSunday,
		W: formatUTCWeekNumberMonday,
		x: null,
		X: null,
		y: formatUTCYear,
		Y: formatUTCFullYear,
		Z: formatUTCZone,
		"%": formatLiteralPercent
	}, A = {
		a: F,
		A: I,
		b: L,
		B: R,
		c: z,
		d: parseDayOfMonth,
		e: parseDayOfMonth,
		f: parseMicroseconds,
		g: parseYear,
		G: parseFullYear,
		H: parseHour24,
		I: parseHour24,
		j: parseDayOfYear,
		L: parseMilliseconds,
		m: parseMonthNumber,
		M: parseMinutes,
		p: P,
		q: parseQuarter,
		Q: parseUnixTimestamp,
		s: parseUnixTimestampSeconds,
		S: parseSeconds,
		u: parseWeekdayNumberMonday,
		U: parseWeekNumberSunday,
		V: parseWeekNumberISO,
		w: parseWeekdayNumberSunday,
		W: parseWeekNumberMonday,
		x: B,
		X: V,
		y: parseYear,
		Y: parseFullYear,
		Z: parseZone,
		"%": parseLiteralPercent
	};
	O.x = j(d, O), O.X = j(f, O), O.c = j(u, O), k.x = j(d, k), k.X = j(f, k), k.c = j(u, k);
	function j(t, u) {
		return function(d) {
			var f = [], p = -1, m = 0, h = t.length, g, _, v;
			for (d instanceof Date || (d = /* @__PURE__ */ new Date(+d)); ++p < h;) t.charCodeAt(p) === 37 && (f.push(t.slice(m, p)), (_ = pads[g = t.charAt(++p)]) == null ? _ = g === "e" ? " " : "0" : g = t.charAt(++p), (v = u[g]) && (g = v(d, _)), f.push(g), m = p + 1);
			return f.push(t.slice(m, p)), f.join("");
		};
	}
	function M(t, u) {
		return function(d) {
			var f = newDate(1900, void 0, 1), p = N(f, t, d += "", 0), m, h;
			if (p != d.length) return null;
			if ("Q" in f) return new Date(f.Q);
			if ("s" in f) return new Date(f.s * 1e3 + ("L" in f ? f.L : 0));
			if (u && !("Z" in f) && (f.Z = 0), "p" in f && (f.H = f.H % 12 + f.p * 12), f.m === void 0 && (f.m = "q" in f ? f.q : 0), "V" in f) {
				if (f.V < 1 || f.V > 53) return null;
				"w" in f || (f.w = 1), "Z" in f ? (m = utcDate(newDate(f.y, 0, 1)), h = m.getUTCDay(), m = h > 4 || h === 0 ? utcMonday.ceil(m) : utcMonday(m), m = utcDay.offset(m, (f.V - 1) * 7), f.y = m.getUTCFullYear(), f.m = m.getUTCMonth(), f.d = m.getUTCDate() + (f.w + 6) % 7) : (m = localDate(newDate(f.y, 0, 1)), h = m.getDay(), m = h > 4 || h === 0 ? timeMonday.ceil(m) : timeMonday(m), m = timeDay.offset(m, (f.V - 1) * 7), f.y = m.getFullYear(), f.m = m.getMonth(), f.d = m.getDate() + (f.w + 6) % 7);
			} else ("W" in f || "U" in f) && ("w" in f || (f.w = "u" in f ? f.u % 7 : "W" in f ? 1 : 0), h = "Z" in f ? utcDate(newDate(f.y, 0, 1)).getUTCDay() : localDate(newDate(f.y, 0, 1)).getDay(), f.m = 0, f.d = "W" in f ? (f.w + 6) % 7 + f.W * 7 - (h + 5) % 7 : f.w + f.U * 7 - (h + 6) % 7);
			return "Z" in f ? (f.H += f.Z / 100 | 0, f.M += f.Z % 100, utcDate(f)) : localDate(f);
		};
	}
	function N(t, u, d, f) {
		for (var p = 0, m = u.length, h = d.length, g, _; p < m;) {
			if (f >= h) return -1;
			if (g = u.charCodeAt(p++), g === 37) {
				if (g = u.charAt(p++), _ = A[g in pads ? u.charAt(p++) : g], !_ || (f = _(t, d, f)) < 0) return -1;
			} else if (g != d.charCodeAt(f++)) return -1;
		}
		return f;
	}
	function P(t, u, d) {
		var f = v.exec(u.slice(d));
		return f ? (t.p = y.get(f[0].toLowerCase()), d + f[0].length) : -1;
	}
	function F(t, u, d) {
		var f = S.exec(u.slice(d));
		return f ? (t.w = C.get(f[0].toLowerCase()), d + f[0].length) : -1;
	}
	function I(t, u, d) {
		var f = b.exec(u.slice(d));
		return f ? (t.w = x.get(f[0].toLowerCase()), d + f[0].length) : -1;
	}
	function L(t, u, d) {
		var f = E.exec(u.slice(d));
		return f ? (t.m = D.get(f[0].toLowerCase()), d + f[0].length) : -1;
	}
	function R(t, u, d) {
		var f = w.exec(u.slice(d));
		return f ? (t.m = T.get(f[0].toLowerCase()), d + f[0].length) : -1;
	}
	function z(t, d, f) {
		return N(t, u, d, f);
	}
	function B(t, u, f) {
		return N(t, d, u, f);
	}
	function V(t, u, d) {
		return N(t, f, u, d);
	}
	function H(t) {
		return h[t.getDay()];
	}
	function U(t) {
		return m[t.getDay()];
	}
	function W(t) {
		return _[t.getMonth()];
	}
	function G(t) {
		return g[t.getMonth()];
	}
	function K(t) {
		return p[+(t.getHours() >= 12)];
	}
	function q(t) {
		return 1 + ~~(t.getMonth() / 3);
	}
	function J(t) {
		return h[t.getUTCDay()];
	}
	function Y(t) {
		return m[t.getUTCDay()];
	}
	function X(t) {
		return _[t.getUTCMonth()];
	}
	function Z(t) {
		return g[t.getUTCMonth()];
	}
	function Q(t) {
		return p[+(t.getUTCHours() >= 12)];
	}
	function $(t) {
		return 1 + ~~(t.getUTCMonth() / 3);
	}
	return {
		format: function(t) {
			var u = j(t += "", O);
			return u.toString = function() {
				return t;
			}, u;
		},
		parse: function(t) {
			var u = M(t += "", !1);
			return u.toString = function() {
				return t;
			}, u;
		},
		utcFormat: function(t) {
			var u = j(t += "", k);
			return u.toString = function() {
				return t;
			}, u;
		},
		utcParse: function(t) {
			var u = M(t += "", !0);
			return u.toString = function() {
				return t;
			}, u;
		}
	};
}
var pads = {
	"-": "",
	_: " ",
	0: "0"
}, numberRe = /^\s*\d+/, percentRe = /^%/, requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(t, u, d) {
	var f = t < 0 ? "-" : "", p = (f ? -t : t) + "", m = p.length;
	return f + (m < d ? Array(d - m + 1).join(u) + p : p);
}
function requote(t) {
	return t.replace(requoteRe, "\\$&");
}
function formatRe(t) {
	return RegExp("^(?:" + t.map(requote).join("|") + ")", "i");
}
function formatLookup(t) {
	return new Map(t.map((t, u) => [t.toLowerCase(), u]));
}
function parseWeekdayNumberSunday(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 1));
	return f ? (t.w = +f[0], d + f[0].length) : -1;
}
function parseWeekdayNumberMonday(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 1));
	return f ? (t.u = +f[0], d + f[0].length) : -1;
}
function parseWeekNumberSunday(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 2));
	return f ? (t.U = +f[0], d + f[0].length) : -1;
}
function parseWeekNumberISO(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 2));
	return f ? (t.V = +f[0], d + f[0].length) : -1;
}
function parseWeekNumberMonday(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 2));
	return f ? (t.W = +f[0], d + f[0].length) : -1;
}
function parseFullYear(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 4));
	return f ? (t.y = +f[0], d + f[0].length) : -1;
}
function parseYear(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 2));
	return f ? (t.y = +f[0] + (+f[0] > 68 ? 1900 : 2e3), d + f[0].length) : -1;
}
function parseZone(t, u, d) {
	var f = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(u.slice(d, d + 6));
	return f ? (t.Z = f[1] ? 0 : -(f[2] + (f[3] || "00")), d + f[0].length) : -1;
}
function parseQuarter(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 1));
	return f ? (t.q = f[0] * 3 - 3, d + f[0].length) : -1;
}
function parseMonthNumber(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 2));
	return f ? (t.m = f[0] - 1, d + f[0].length) : -1;
}
function parseDayOfMonth(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 2));
	return f ? (t.d = +f[0], d + f[0].length) : -1;
}
function parseDayOfYear(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 3));
	return f ? (t.m = 0, t.d = +f[0], d + f[0].length) : -1;
}
function parseHour24(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 2));
	return f ? (t.H = +f[0], d + f[0].length) : -1;
}
function parseMinutes(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 2));
	return f ? (t.M = +f[0], d + f[0].length) : -1;
}
function parseSeconds(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 2));
	return f ? (t.S = +f[0], d + f[0].length) : -1;
}
function parseMilliseconds(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 3));
	return f ? (t.L = +f[0], d + f[0].length) : -1;
}
function parseMicroseconds(t, u, d) {
	var f = numberRe.exec(u.slice(d, d + 6));
	return f ? (t.L = Math.floor(f[0] / 1e3), d + f[0].length) : -1;
}
function parseLiteralPercent(t, u, d) {
	var f = percentRe.exec(u.slice(d, d + 1));
	return f ? d + f[0].length : -1;
}
function parseUnixTimestamp(t, u, d) {
	var f = numberRe.exec(u.slice(d));
	return f ? (t.Q = +f[0], d + f[0].length) : -1;
}
function parseUnixTimestampSeconds(t, u, d) {
	var f = numberRe.exec(u.slice(d));
	return f ? (t.s = +f[0], d + f[0].length) : -1;
}
function formatDayOfMonth(t, u) {
	return pad(t.getDate(), u, 2);
}
function formatHour24(t, u) {
	return pad(t.getHours(), u, 2);
}
function formatHour12(t, u) {
	return pad(t.getHours() % 12 || 12, u, 2);
}
function formatDayOfYear(t, u) {
	return pad(1 + timeDay.count(timeYear(t), t), u, 3);
}
function formatMilliseconds(t, u) {
	return pad(t.getMilliseconds(), u, 3);
}
function formatMicroseconds(t, u) {
	return formatMilliseconds(t, u) + "000";
}
function formatMonthNumber(t, u) {
	return pad(t.getMonth() + 1, u, 2);
}
function formatMinutes(t, u) {
	return pad(t.getMinutes(), u, 2);
}
function formatSeconds(t, u) {
	return pad(t.getSeconds(), u, 2);
}
function formatWeekdayNumberMonday(t) {
	var u = t.getDay();
	return u === 0 ? 7 : u;
}
function formatWeekNumberSunday(t, u) {
	return pad(timeSunday.count(timeYear(t) - 1, t), u, 2);
}
function dISO(t) {
	var u = t.getDay();
	return u >= 4 || u === 0 ? timeThursday(t) : timeThursday.ceil(t);
}
function formatWeekNumberISO(t, u) {
	return t = dISO(t), pad(timeThursday.count(timeYear(t), t) + (timeYear(t).getDay() === 4), u, 2);
}
function formatWeekdayNumberSunday(t) {
	return t.getDay();
}
function formatWeekNumberMonday(t, u) {
	return pad(timeMonday.count(timeYear(t) - 1, t), u, 2);
}
function formatYear(t, u) {
	return pad(t.getFullYear() % 100, u, 2);
}
function formatYearISO(t, u) {
	return t = dISO(t), pad(t.getFullYear() % 100, u, 2);
}
function formatFullYear(t, u) {
	return pad(t.getFullYear() % 1e4, u, 4);
}
function formatFullYearISO(t, u) {
	var d = t.getDay();
	return t = d >= 4 || d === 0 ? timeThursday(t) : timeThursday.ceil(t), pad(t.getFullYear() % 1e4, u, 4);
}
function formatZone(t) {
	var u = t.getTimezoneOffset();
	return (u > 0 ? "-" : (u *= -1, "+")) + pad(u / 60 | 0, "0", 2) + pad(u % 60, "0", 2);
}
function formatUTCDayOfMonth(t, u) {
	return pad(t.getUTCDate(), u, 2);
}
function formatUTCHour24(t, u) {
	return pad(t.getUTCHours(), u, 2);
}
function formatUTCHour12(t, u) {
	return pad(t.getUTCHours() % 12 || 12, u, 2);
}
function formatUTCDayOfYear(t, u) {
	return pad(1 + utcDay.count(utcYear(t), t), u, 3);
}
function formatUTCMilliseconds(t, u) {
	return pad(t.getUTCMilliseconds(), u, 3);
}
function formatUTCMicroseconds(t, u) {
	return formatUTCMilliseconds(t, u) + "000";
}
function formatUTCMonthNumber(t, u) {
	return pad(t.getUTCMonth() + 1, u, 2);
}
function formatUTCMinutes(t, u) {
	return pad(t.getUTCMinutes(), u, 2);
}
function formatUTCSeconds(t, u) {
	return pad(t.getUTCSeconds(), u, 2);
}
function formatUTCWeekdayNumberMonday(t) {
	var u = t.getUTCDay();
	return u === 0 ? 7 : u;
}
function formatUTCWeekNumberSunday(t, u) {
	return pad(utcSunday.count(utcYear(t) - 1, t), u, 2);
}
function UTCdISO(t) {
	var u = t.getUTCDay();
	return u >= 4 || u === 0 ? utcThursday(t) : utcThursday.ceil(t);
}
function formatUTCWeekNumberISO(t, u) {
	return t = UTCdISO(t), pad(utcThursday.count(utcYear(t), t) + (utcYear(t).getUTCDay() === 4), u, 2);
}
function formatUTCWeekdayNumberSunday(t) {
	return t.getUTCDay();
}
function formatUTCWeekNumberMonday(t, u) {
	return pad(utcMonday.count(utcYear(t) - 1, t), u, 2);
}
function formatUTCYear(t, u) {
	return pad(t.getUTCFullYear() % 100, u, 2);
}
function formatUTCYearISO(t, u) {
	return t = UTCdISO(t), pad(t.getUTCFullYear() % 100, u, 2);
}
function formatUTCFullYear(t, u) {
	return pad(t.getUTCFullYear() % 1e4, u, 4);
}
function formatUTCFullYearISO(t, u) {
	var d = t.getUTCDay();
	return t = d >= 4 || d === 0 ? utcThursday(t) : utcThursday.ceil(t), pad(t.getUTCFullYear() % 1e4, u, 4);
}
function formatUTCZone() {
	return "+0000";
}
function formatLiteralPercent() {
	return "%";
}
function formatUnixTimestamp(t) {
	return +t;
}
function formatUnixTimestampSeconds(t) {
	return Math.floor(t / 1e3);
}
var locale, timeFormat;
defaultLocale({
	dateTime: "%x, %X",
	date: "%-m/%-d/%Y",
	time: "%-I:%M:%S %p",
	periods: ["AM", "PM"],
	days: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	shortDays: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	months: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	shortMonths: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	]
});
function defaultLocale(t) {
	return locale = formatLocale(t), timeFormat = locale.format, locale.parse, locale.utcFormat, locale.utcParse, locale;
}
function date(t) {
	return new Date(t);
}
function number$1(t) {
	return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function calendar(t, u, d, f, p, m, h, g, _, v) {
	var y = continuous(), b = y.invert, x = y.domain, S = v(".%L"), C = v(":%S"), w = v("%I:%M"), T = v("%I %p"), E = v("%a %d"), D = v("%b %d"), O = v("%B"), k = v("%Y");
	function A(t) {
		return (_(t) < t ? S : g(t) < t ? C : h(t) < t ? w : m(t) < t ? T : f(t) < t ? p(t) < t ? E : D : d(t) < t ? O : k)(t);
	}
	return y.invert = function(t) {
		return new Date(b(t));
	}, y.domain = function(t) {
		return arguments.length ? x(Array.from(t, number$1)) : x().map(date);
	}, y.ticks = function(u) {
		var d = x();
		return t(d[0], d[d.length - 1], u ?? 10);
	}, y.tickFormat = function(t, u) {
		return u == null ? A : v(u);
	}, y.nice = function(t) {
		var d = x();
		return (!t || typeof t.range != "function") && (t = u(d[0], d[d.length - 1], t ?? 10)), t ? x(nice(d, t)) : y;
	}, y.copy = function() {
		return copy(y, calendar(t, u, d, f, p, m, h, g, _, v));
	}, y;
}
function time() {
	return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function identity_default(t) {
	return t;
}
var top = 1, right = 2, bottom = 3, left = 4, epsilon = 1e-6;
function translateX(t) {
	return "translate(" + t + ",0)";
}
function translateY(t) {
	return "translate(0," + t + ")";
}
function number(t) {
	return (u) => +t(u);
}
function center(t, u) {
	return u = Math.max(0, t.bandwidth() - u * 2) / 2, t.round() && (u = Math.round(u)), (d) => +t(d) + u;
}
function entering() {
	return !this.__axis;
}
function axis(t, u) {
	var d = [], f = null, p = null, m = 6, h = 6, g = 3, _ = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : .5, v = t === top || t === left ? -1 : 1, y = t === left || t === right ? "x" : "y", b = t === top || t === bottom ? translateX : translateY;
	function x(x) {
		var S = f ?? (u.ticks ? u.ticks.apply(u, d) : u.domain()), C = p ?? (u.tickFormat ? u.tickFormat.apply(u, d) : identity_default), w = Math.max(m, 0) + g, T = u.range(), E = +T[0] + _, D = +T[T.length - 1] + _, O = (u.bandwidth ? center : number)(u.copy(), _), k = x.selection ? x.selection() : x, A = k.selectAll(".domain").data([null]), j = k.selectAll(".tick").data(S, u).order(), M = j.exit(), N = j.enter().append("g").attr("class", "tick"), P = j.select("line"), F = j.select("text");
		A = A.merge(A.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), j = j.merge(N), P = P.merge(N.append("line").attr("stroke", "currentColor").attr(y + "2", v * m)), F = F.merge(N.append("text").attr("fill", "currentColor").attr(y, v * w).attr("dy", t === top ? "0em" : t === bottom ? "0.71em" : "0.32em")), x !== k && (A = A.transition(x), j = j.transition(x), P = P.transition(x), F = F.transition(x), M = M.transition(x).attr("opacity", epsilon).attr("transform", function(t) {
			return isFinite(t = O(t)) ? b(t + _) : this.getAttribute("transform");
		}), N.attr("opacity", epsilon).attr("transform", function(t) {
			var u = this.parentNode.__axis;
			return b((u && isFinite(u = u(t)) ? u : O(t)) + _);
		})), M.remove(), A.attr("d", t === left || t === right ? h ? "M" + v * h + "," + E + "H" + _ + "V" + D + "H" + v * h : "M" + _ + "," + E + "V" + D : h ? "M" + E + "," + v * h + "V" + _ + "H" + D + "V" + v * h : "M" + E + "," + _ + "H" + D), j.attr("opacity", 1).attr("transform", function(t) {
			return b(O(t) + _);
		}), P.attr(y + "2", v * m), F.attr(y, v * w).text(C), k.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === right ? "start" : t === left ? "end" : "middle"), k.each(function() {
			this.__axis = O;
		});
	}
	return x.scale = function(t) {
		return arguments.length ? (u = t, x) : u;
	}, x.ticks = function() {
		return d = Array.from(arguments), x;
	}, x.tickArguments = function(t) {
		return arguments.length ? (d = t == null ? [] : Array.from(t), x) : d.slice();
	}, x.tickValues = function(t) {
		return arguments.length ? (f = t == null ? null : Array.from(t), x) : f && f.slice();
	}, x.tickFormat = function(t) {
		return arguments.length ? (p = t, x) : p;
	}, x.tickSize = function(t) {
		return arguments.length ? (m = h = +t, x) : m;
	}, x.tickSizeInner = function(t) {
		return arguments.length ? (m = +t, x) : m;
	}, x.tickSizeOuter = function(t) {
		return arguments.length ? (h = +t, x) : h;
	}, x.tickPadding = function(t) {
		return arguments.length ? (g = +t, x) : g;
	}, x.offset = function(t) {
		return arguments.length ? (_ = +t, x) : _;
	}, x;
}
function axisLeft(t) {
	return axis(left, t);
}
var noop = { value: () => {} };
function dispatch() {
	for (var t = 0, u = arguments.length, d = {}, f; t < u; ++t) {
		if (!(f = arguments[t] + "") || f in d || /[\s.]/.test(f)) throw Error("illegal type: " + f);
		d[f] = [];
	}
	return new Dispatch(d);
}
function Dispatch(t) {
	this._ = t;
}
function parseTypenames(t, u) {
	return t.trim().split(/^|\s+/).map(function(t) {
		var d = "", f = t.indexOf(".");
		if (f >= 0 && (d = t.slice(f + 1), t = t.slice(0, f)), t && !u.hasOwnProperty(t)) throw Error("unknown type: " + t);
		return {
			type: t,
			name: d
		};
	});
}
Dispatch.prototype = dispatch.prototype = {
	constructor: Dispatch,
	on: function(t, u) {
		var d = this._, f = parseTypenames(t + "", d), p, m = -1, h = f.length;
		if (arguments.length < 2) {
			for (; ++m < h;) if ((p = (t = f[m]).type) && (p = get$1(d[p], t.name))) return p;
			return;
		}
		if (u != null && typeof u != "function") throw Error("invalid callback: " + u);
		for (; ++m < h;) if (p = (t = f[m]).type) d[p] = set$1(d[p], t.name, u);
		else if (u == null) for (p in d) d[p] = set$1(d[p], t.name, null);
		return this;
	},
	copy: function() {
		var t = {}, u = this._;
		for (var d in u) t[d] = u[d].slice();
		return new Dispatch(t);
	},
	call: function(t, u) {
		if ((p = arguments.length - 2) > 0) for (var d = Array(p), f = 0, p, m; f < p; ++f) d[f] = arguments[f + 2];
		if (!this._.hasOwnProperty(t)) throw Error("unknown type: " + t);
		for (m = this._[t], f = 0, p = m.length; f < p; ++f) m[f].value.apply(u, d);
	},
	apply: function(t, u, d) {
		if (!this._.hasOwnProperty(t)) throw Error("unknown type: " + t);
		for (var f = this._[t], p = 0, m = f.length; p < m; ++p) f[p].value.apply(u, d);
	}
};
function get$1(t, u) {
	for (var d = 0, f = t.length, p; d < f; ++d) if ((p = t[d]).name === u) return p.value;
}
function set$1(t, u, d) {
	for (var f = 0, p = t.length; f < p; ++f) if (t[f].name === u) {
		t[f] = noop, t = t.slice(0, f).concat(t.slice(f + 1));
		break;
	}
	return d != null && t.push({
		name: u,
		value: d
	}), t;
}
var dispatch_default = dispatch;
const nonpassivecapture = {
	capture: !0,
	passive: !1
};
function noevent_default$1(t) {
	t.preventDefault(), t.stopImmediatePropagation();
}
function nodrag_default(t) {
	var u = t.document.documentElement, d = select_default(t).on("dragstart.drag", noevent_default$1, nonpassivecapture);
	"onselectstart" in u ? d.on("selectstart.drag", noevent_default$1, nonpassivecapture) : (u.__noselect = u.style.MozUserSelect, u.style.MozUserSelect = "none");
}
function yesdrag(t, u) {
	var d = t.document.documentElement, f = select_default(t).on("dragstart.drag", null);
	u && (f.on("click.drag", noevent_default$1, nonpassivecapture), setTimeout(function() {
		f.on("click.drag", null);
	}, 0)), "onselectstart" in d ? f.on("selectstart.drag", null) : (d.style.MozUserSelect = d.__noselect, delete d.__noselect);
}
var frame = 0, timeout = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance == "object" && performance.now ? performance : Date, setFrame = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
	setTimeout(t, 17);
};
function now() {
	return clockNow ||= (setFrame(clearNow), clock.now() + clockSkew);
}
function clearNow() {
	clockNow = 0;
}
function Timer() {
	this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
	constructor: Timer,
	restart: function(t, u, d) {
		if (typeof t != "function") throw TypeError("callback is not a function");
		d = (d == null ? now() : +d) + (u == null ? 0 : +u), !this._next && taskTail !== this && (taskTail ? taskTail._next = this : taskHead = this, taskTail = this), this._call = t, this._time = d, sleep();
	},
	stop: function() {
		this._call && (this._call = null, this._time = Infinity, sleep());
	}
};
function timer(t, u, d) {
	var f = new Timer();
	return f.restart(t, u, d), f;
}
function timerFlush() {
	now(), ++frame;
	for (var t = taskHead, u; t;) (u = clockNow - t._time) >= 0 && t._call.call(void 0, u), t = t._next;
	--frame;
}
function wake() {
	clockNow = (clockLast = clock.now()) + clockSkew, frame = timeout = 0;
	try {
		timerFlush();
	} finally {
		frame = 0, nap(), clockNow = 0;
	}
}
function poke() {
	var t = clock.now(), u = t - clockLast;
	u > pokeDelay && (clockSkew -= u, clockLast = t);
}
function nap() {
	for (var t, u = taskHead, d, f = Infinity; u;) u._call ? (f > u._time && (f = u._time), t = u, u = u._next) : (d = u._next, u._next = null, u = t ? t._next = d : taskHead = d);
	taskTail = t, sleep(f);
}
function sleep(t) {
	frame || (timeout &&= clearTimeout(timeout), t - clockNow > 24 ? (t < Infinity && (timeout = setTimeout(wake, t - clock.now() - clockSkew)), interval &&= clearInterval(interval)) : (interval ||= (clockLast = clock.now(), setInterval(poke, pokeDelay)), frame = 1, setFrame(wake)));
}
function timeout_default(t, u, d) {
	var f = new Timer();
	return u = u == null ? 0 : +u, f.restart((d) => {
		f.stop(), t(d + u);
	}, u, d), f;
}
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt"), emptyTween = [];
function schedule_default(t, u, d, f, p, m) {
	var h = t.__transition;
	if (!h) t.__transition = {};
	else if (d in h) return;
	create(t, d, {
		name: u,
		index: f,
		group: p,
		on: emptyOn,
		tween: emptyTween,
		time: m.time,
		delay: m.delay,
		duration: m.duration,
		ease: m.ease,
		timer: null,
		state: 0
	});
}
function init(t, u) {
	var d = get(t, u);
	if (d.state > 0) throw Error("too late; already scheduled");
	return d;
}
function set(t, u) {
	var d = get(t, u);
	if (d.state > 3) throw Error("too late; already running");
	return d;
}
function get(t, u) {
	var d = t.__transition;
	if (!d || !(d = d[u])) throw Error("transition not found");
	return d;
}
function create(t, u, d) {
	var f = t.__transition, p;
	f[u] = d, d.timer = timer(m, 0, d.time);
	function m(t) {
		d.state = 1, d.timer.restart(h, d.delay, d.time), d.delay <= t && h(t - d.delay);
	}
	function h(m) {
		var v, y, b, x;
		if (d.state !== 1) return _();
		for (v in f) if (x = f[v], x.name === d.name) {
			if (x.state === 3) return timeout_default(h);
			x.state === 4 ? (x.state = 6, x.timer.stop(), x.on.call("interrupt", t, t.__data__, x.index, x.group), delete f[v]) : +v < u && (x.state = 6, x.timer.stop(), x.on.call("cancel", t, t.__data__, x.index, x.group), delete f[v]);
		}
		if (timeout_default(function() {
			d.state === 3 && (d.state = 4, d.timer.restart(g, d.delay, d.time), g(m));
		}), d.state = 2, d.on.call("start", t, t.__data__, d.index, d.group), d.state === 2) {
			for (d.state = 3, p = Array(b = d.tween.length), v = 0, y = -1; v < b; ++v) (x = d.tween[v].value.call(t, t.__data__, d.index, d.group)) && (p[++y] = x);
			p.length = y + 1;
		}
	}
	function g(u) {
		for (var f = u < d.duration ? d.ease.call(null, u / d.duration) : (d.timer.restart(_), d.state = 5, 1), m = -1, h = p.length; ++m < h;) p[m].call(t, f);
		d.state === 5 && (d.on.call("end", t, t.__data__, d.index, d.group), _());
	}
	function _() {
		for (var p in d.state = 6, d.timer.stop(), delete f[u], f) return;
		delete t.__transition;
	}
}
function interrupt_default(t, u) {
	var d = t.__transition, f, p, m = !0, h;
	if (d) {
		for (h in u = u == null ? null : u + "", d) {
			if ((f = d[h]).name !== u) {
				m = !1;
				continue;
			}
			p = f.state > 2 && f.state < 5, f.state = 6, f.timer.stop(), f.on.call(p ? "interrupt" : "cancel", t, t.__data__, f.index, f.group), delete d[h];
		}
		m && delete t.__transition;
	}
}
function interrupt_default$1(t) {
	return this.each(function() {
		interrupt_default(this, t);
	});
}
function tweenRemove(t, u) {
	var d, f;
	return function() {
		var p = set(this, t), m = p.tween;
		if (m !== d) {
			f = d = m;
			for (var h = 0, g = f.length; h < g; ++h) if (f[h].name === u) {
				f = f.slice(), f.splice(h, 1);
				break;
			}
		}
		p.tween = f;
	};
}
function tweenFunction(t, u, d) {
	var f, p;
	if (typeof d != "function") throw Error();
	return function() {
		var m = set(this, t), h = m.tween;
		if (h !== f) {
			p = (f = h).slice();
			for (var g = {
				name: u,
				value: d
			}, _ = 0, v = p.length; _ < v; ++_) if (p[_].name === u) {
				p[_] = g;
				break;
			}
			_ === v && p.push(g);
		}
		m.tween = p;
	};
}
function tween_default(t, u) {
	var d = this._id;
	if (t += "", arguments.length < 2) {
		for (var f = get(this.node(), d).tween, p = 0, m = f.length, h; p < m; ++p) if ((h = f[p]).name === t) return h.value;
		return null;
	}
	return this.each((u == null ? tweenRemove : tweenFunction)(d, t, u));
}
function tweenValue(t, u, d) {
	var f = t._id;
	return t.each(function() {
		var t = set(this, f);
		(t.value ||= {})[u] = d.apply(this, arguments);
	}), function(t) {
		return get(t, f).value[u];
	};
}
function interpolate_default(t, u) {
	var d;
	return (typeof u == "number" ? number_default : u instanceof color ? rgb_default : (d = color(u)) ? (u = d, rgb_default) : string_default)(t, u);
}
function attrRemove(t) {
	return function() {
		this.removeAttribute(t);
	};
}
function attrRemoveNS(t) {
	return function() {
		this.removeAttributeNS(t.space, t.local);
	};
}
function attrConstant(t, u, d) {
	var f, p = d + "", m;
	return function() {
		var h = this.getAttribute(t);
		return h === p ? null : h === f ? m : m = u(f = h, d);
	};
}
function attrConstantNS(t, u, d) {
	var f, p = d + "", m;
	return function() {
		var h = this.getAttributeNS(t.space, t.local);
		return h === p ? null : h === f ? m : m = u(f = h, d);
	};
}
function attrFunction(t, u, d) {
	var f, p, m;
	return function() {
		var h, g = d(this), _;
		return g == null ? void this.removeAttribute(t) : (h = this.getAttribute(t), _ = g + "", h === _ ? null : h === f && _ === p ? m : (p = _, m = u(f = h, g)));
	};
}
function attrFunctionNS(t, u, d) {
	var f, p, m;
	return function() {
		var h, g = d(this), _;
		return g == null ? void this.removeAttributeNS(t.space, t.local) : (h = this.getAttributeNS(t.space, t.local), _ = g + "", h === _ ? null : h === f && _ === p ? m : (p = _, m = u(f = h, g)));
	};
}
function attr_default(t, d) {
	var f = namespace_default(t), p = f === "transform" ? interpolateTransformSvg : interpolate_default;
	return this.attrTween(t, typeof d == "function" ? (f.local ? attrFunctionNS : attrFunction)(f, p, tweenValue(this, "attr." + t, d)) : d == null ? (f.local ? attrRemoveNS : attrRemove)(f) : (f.local ? attrConstantNS : attrConstant)(f, p, d));
}
function attrInterpolate(t, u) {
	return function(d) {
		this.setAttribute(t, u.call(this, d));
	};
}
function attrInterpolateNS(t, u) {
	return function(d) {
		this.setAttributeNS(t.space, t.local, u.call(this, d));
	};
}
function attrTweenNS(t, u) {
	var d, f;
	function p() {
		var p = u.apply(this, arguments);
		return p !== f && (d = (f = p) && attrInterpolateNS(t, p)), d;
	}
	return p._value = u, p;
}
function attrTween(t, u) {
	var d, f;
	function p() {
		var p = u.apply(this, arguments);
		return p !== f && (d = (f = p) && attrInterpolate(t, p)), d;
	}
	return p._value = u, p;
}
function attrTween_default(t, d) {
	var f = "attr." + t;
	if (arguments.length < 2) return (f = this.tween(f)) && f._value;
	if (d == null) return this.tween(f, null);
	if (typeof d != "function") throw Error();
	var p = namespace_default(t);
	return this.tween(f, (p.local ? attrTweenNS : attrTween)(p, d));
}
function delayFunction(t, u) {
	return function() {
		init(this, t).delay = +u.apply(this, arguments);
	};
}
function delayConstant(t, u) {
	return u = +u, function() {
		init(this, t).delay = u;
	};
}
function delay_default(t) {
	var u = this._id;
	return arguments.length ? this.each((typeof t == "function" ? delayFunction : delayConstant)(u, t)) : get(this.node(), u).delay;
}
function durationFunction(t, u) {
	return function() {
		set(this, t).duration = +u.apply(this, arguments);
	};
}
function durationConstant(t, u) {
	return u = +u, function() {
		set(this, t).duration = u;
	};
}
function duration_default(t) {
	var u = this._id;
	return arguments.length ? this.each((typeof t == "function" ? durationFunction : durationConstant)(u, t)) : get(this.node(), u).duration;
}
function easeConstant(t, u) {
	if (typeof u != "function") throw Error();
	return function() {
		set(this, t).ease = u;
	};
}
function ease_default(t) {
	var u = this._id;
	return arguments.length ? this.each(easeConstant(u, t)) : get(this.node(), u).ease;
}
function easeVarying(t, u) {
	return function() {
		var d = u.apply(this, arguments);
		if (typeof d != "function") throw Error();
		set(this, t).ease = d;
	};
}
function easeVarying_default(t) {
	if (typeof t != "function") throw Error();
	return this.each(easeVarying(this._id, t));
}
function filter_default(t) {
	typeof t != "function" && (t = matcher_default(t));
	for (var u = this._groups, d = u.length, f = Array(d), p = 0; p < d; ++p) for (var m = u[p], h = m.length, g = f[p] = [], _, v = 0; v < h; ++v) (_ = m[v]) && t.call(_, _.__data__, v, m) && g.push(_);
	return new Transition(f, this._parents, this._name, this._id);
}
function merge_default(t) {
	if (t._id !== this._id) throw Error();
	for (var u = this._groups, d = t._groups, f = u.length, p = d.length, m = Math.min(f, p), h = Array(f), g = 0; g < m; ++g) for (var _ = u[g], v = d[g], y = _.length, b = h[g] = Array(y), x, S = 0; S < y; ++S) (x = _[S] || v[S]) && (b[S] = x);
	for (; g < f; ++g) h[g] = u[g];
	return new Transition(h, this._parents, this._name, this._id);
}
function start(t) {
	return (t + "").trim().split(/^|\s+/).every(function(t) {
		var u = t.indexOf(".");
		return u >= 0 && (t = t.slice(0, u)), !t || t === "start";
	});
}
function onFunction(t, u, d) {
	var f, p, m = start(u) ? init : set;
	return function() {
		var h = m(this, t), g = h.on;
		g !== f && (p = (f = g).copy()).on(u, d), h.on = p;
	};
}
function on_default(t, u) {
	var d = this._id;
	return arguments.length < 2 ? get(this.node(), d).on.on(t) : this.each(onFunction(d, t, u));
}
function removeFunction(t) {
	return function() {
		var u = this.parentNode;
		for (var d in this.__transition) if (+d !== t) return;
		u && u.removeChild(this);
	};
}
function remove_default() {
	return this.on("end.remove", removeFunction(this._id));
}
function select_default$1(t) {
	var u = this._name, d = this._id;
	typeof t != "function" && (t = selector_default(t));
	for (var f = this._groups, p = f.length, m = Array(p), g = 0; g < p; ++g) for (var _ = f[g], v = _.length, y = m[g] = Array(v), b, x, S = 0; S < v; ++S) (b = _[S]) && (x = t.call(b, b.__data__, S, _)) && ("__data__" in b && (x.__data__ = b.__data__), y[S] = x, schedule_default(y[S], u, d, S, y, get(b, d)));
	return new Transition(m, this._parents, u, d);
}
function selectAll_default(t) {
	var u = this._name, d = this._id;
	typeof t != "function" && (t = selectorAll_default(t));
	for (var f = this._groups, p = f.length, m = [], h = [], g = 0; g < p; ++g) for (var _ = f[g], v = _.length, b, x = 0; x < v; ++x) if (b = _[x]) {
		for (var S = t.call(b, b.__data__, x, _), C, w = get(b, d), T = 0, E = S.length; T < E; ++T) (C = S[T]) && schedule_default(C, u, d, T, S, w);
		m.push(S), h.push(b);
	}
	return new Transition(m, h, u, d);
}
var Selection = selection_default.prototype.constructor;
function selection_default$1() {
	return new Selection(this._groups, this._parents);
}
function styleNull(t, u) {
	var d, f, p;
	return function() {
		var m = styleValue(this, t), h = (this.style.removeProperty(t), styleValue(this, t));
		return m === h ? null : m === d && h === f ? p : p = u(d = m, f = h);
	};
}
function styleRemove(t) {
	return function() {
		this.style.removeProperty(t);
	};
}
function styleConstant(t, u, d) {
	var f, p = d + "", m;
	return function() {
		var h = styleValue(this, t);
		return h === p ? null : h === f ? m : m = u(f = h, d);
	};
}
function styleFunction(t, u, d) {
	var f, p, m;
	return function() {
		var h = styleValue(this, t), g = d(this), _ = g + "";
		return g ?? (_ = g = (this.style.removeProperty(t), styleValue(this, t))), h === _ ? null : h === f && _ === p ? m : (p = _, m = u(f = h, g));
	};
}
function styleMaybeRemove(t, u) {
	var d, f, p, m = "style." + u, h = "end." + m, g;
	return function() {
		var _ = set(this, t), v = _.on, y = _.value[m] == null ? g ||= styleRemove(u) : void 0;
		(v !== d || p !== y) && (f = (d = v).copy()).on(h, p = y), _.on = f;
	};
}
function style_default(t, u, d) {
	var f = (t += "") == "transform" ? interpolateTransformCss : interpolate_default;
	return u == null ? this.styleTween(t, styleNull(t, f)).on("end.style." + t, styleRemove(t)) : typeof u == "function" ? this.styleTween(t, styleFunction(t, f, tweenValue(this, "style." + t, u))).each(styleMaybeRemove(this._id, t)) : this.styleTween(t, styleConstant(t, f, u), d).on("end.style." + t, null);
}
function styleInterpolate(t, u, d) {
	return function(f) {
		this.style.setProperty(t, u.call(this, f), d);
	};
}
function styleTween(t, u, d) {
	var f, p;
	function m() {
		var m = u.apply(this, arguments);
		return m !== p && (f = (p = m) && styleInterpolate(t, m, d)), f;
	}
	return m._value = u, m;
}
function styleTween_default(t, u, d) {
	var f = "style." + (t += "");
	if (arguments.length < 2) return (f = this.tween(f)) && f._value;
	if (u == null) return this.tween(f, null);
	if (typeof u != "function") throw Error();
	return this.tween(f, styleTween(t, u, d ?? ""));
}
function textConstant(t) {
	return function() {
		this.textContent = t;
	};
}
function textFunction(t) {
	return function() {
		this.textContent = t(this) ?? "";
	};
}
function text_default(t) {
	return this.tween("text", typeof t == "function" ? textFunction(tweenValue(this, "text", t)) : textConstant(t == null ? "" : t + ""));
}
function textInterpolate(t) {
	return function(u) {
		this.textContent = t.call(this, u);
	};
}
function textTween(t) {
	var u, d;
	function f() {
		var f = t.apply(this, arguments);
		return f !== d && (u = (d = f) && textInterpolate(f)), u;
	}
	return f._value = t, f;
}
function textTween_default(t) {
	var u = "text";
	if (arguments.length < 1) return (u = this.tween(u)) && u._value;
	if (t == null) return this.tween(u, null);
	if (typeof t != "function") throw Error();
	return this.tween(u, textTween(t));
}
function transition_default$1() {
	for (var t = this._name, u = this._id, d = newId(), f = this._groups, p = f.length, m = 0; m < p; ++m) for (var h = f[m], g = h.length, _, v = 0; v < g; ++v) if (_ = h[v]) {
		var y = get(_, u);
		schedule_default(_, t, d, v, h, {
			time: y.time + y.delay + y.duration,
			delay: 0,
			duration: y.duration,
			ease: y.ease
		});
	}
	return new Transition(f, this._parents, t, d);
}
function end_default() {
	var t, u, d = this, f = d._id, p = d.size();
	return new Promise(function(m, h) {
		var g = { value: h }, _ = { value: function() {
			--p === 0 && m();
		} };
		d.each(function() {
			var d = set(this, f), p = d.on;
			p !== t && (u = (t = p).copy(), u._.cancel.push(g), u._.interrupt.push(g), u._.end.push(_)), d.on = u;
		}), p === 0 && m();
	});
}
var id = 0;
function Transition(t, u, d, f) {
	this._groups = t, this._parents = u, this._name = d, this._id = f;
}
function transition(t) {
	return selection_default().transition(t);
}
function newId() {
	return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition.prototype = {
	constructor: Transition,
	select: select_default$1,
	selectAll: selectAll_default,
	selectChild: selection_prototype.selectChild,
	selectChildren: selection_prototype.selectChildren,
	filter: filter_default,
	merge: merge_default,
	selection: selection_default$1,
	transition: transition_default$1,
	call: selection_prototype.call,
	nodes: selection_prototype.nodes,
	node: selection_prototype.node,
	size: selection_prototype.size,
	empty: selection_prototype.empty,
	each: selection_prototype.each,
	on: on_default,
	attr: attr_default,
	attrTween: attrTween_default,
	style: style_default,
	styleTween: styleTween_default,
	text: text_default,
	textTween: textTween_default,
	remove: remove_default,
	tween: tween_default,
	delay: delay_default,
	duration: duration_default,
	ease: ease_default,
	easeVarying: easeVarying_default,
	end: end_default,
	[Symbol.iterator]: selection_prototype[Symbol.iterator]
};
function cubicInOut(t) {
	return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var defaultTiming = {
	time: null,
	delay: 0,
	duration: 250,
	ease: cubicInOut
};
function inherit(t, u) {
	for (var d; !(d = t.__transition) || !(d = d[u]);) if (!(t = t.parentNode)) throw Error(`transition ${u} not found`);
	return d;
}
function transition_default(t) {
	var u, d;
	t instanceof Transition ? (u = t._id, t = t._name) : (u = newId(), (d = defaultTiming).time = now(), t = t == null ? null : t + "");
	for (var f = this._groups, p = f.length, m = 0; m < p; ++m) for (var h = f[m], g = h.length, _, v = 0; v < g; ++v) (_ = h[v]) && schedule_default(_, t, u, v, h, d || inherit(_, u));
	return new Transition(f, this._parents, t, u);
}
selection_default.prototype.interrupt = interrupt_default$1, selection_default.prototype.transition = transition_default;
var constant_default = (t) => () => t;
function ZoomEvent(t, { sourceEvent: u, target: d, transform: f, dispatch: p }) {
	Object.defineProperties(this, {
		type: {
			value: t,
			enumerable: !0,
			configurable: !0
		},
		sourceEvent: {
			value: u,
			enumerable: !0,
			configurable: !0
		},
		target: {
			value: d,
			enumerable: !0,
			configurable: !0
		},
		transform: {
			value: f,
			enumerable: !0,
			configurable: !0
		},
		_: { value: p }
	});
}
function Transform(t, u, d) {
	this.k = t, this.x = u, this.y = d;
}
Transform.prototype = {
	constructor: Transform,
	scale: function(t) {
		return t === 1 ? this : new Transform(this.k * t, this.x, this.y);
	},
	translate: function(t, u) {
		return t === 0 & u === 0 ? this : new Transform(this.k, this.x + this.k * t, this.y + this.k * u);
	},
	apply: function(t) {
		return [t[0] * this.k + this.x, t[1] * this.k + this.y];
	},
	applyX: function(t) {
		return t * this.k + this.x;
	},
	applyY: function(t) {
		return t * this.k + this.y;
	},
	invert: function(t) {
		return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
	},
	invertX: function(t) {
		return (t - this.x) / this.k;
	},
	invertY: function(t) {
		return (t - this.y) / this.k;
	},
	rescaleX: function(t) {
		return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
	},
	rescaleY: function(t) {
		return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
	},
	toString: function() {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	}
};
var identity = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(t) {
	for (; !t.__zoom;) if (!(t = t.parentNode)) return identity;
	return t.__zoom;
}
function nopropagation(t) {
	t.stopImmediatePropagation();
}
function noevent_default(t) {
	t.preventDefault(), t.stopImmediatePropagation();
}
function defaultFilter(t) {
	return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function defaultExtent() {
	var t = this;
	return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function defaultTransform() {
	return this.__zoom || identity;
}
function defaultWheelDelta(t) {
	return -t.deltaY * (t.deltaMode === 1 ? .05 : t.deltaMode ? 1 : .002) * (t.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(t, u, d) {
	var f = t.invertX(u[0][0]) - d[0][0], p = t.invertX(u[1][0]) - d[1][0], m = t.invertY(u[0][1]) - d[0][1], h = t.invertY(u[1][1]) - d[1][1];
	return t.translate(p > f ? (f + p) / 2 : Math.min(0, f) || Math.max(0, p), h > m ? (m + h) / 2 : Math.min(0, m) || Math.max(0, h));
}
function zoom_default() {
	var t = defaultFilter, u = defaultExtent, d = defaultConstrain, f = defaultWheelDelta, p = defaultTouchable, m = [0, Infinity], h = [[-Infinity, -Infinity], [Infinity, Infinity]], g = 250, _ = zoom_default$1, v = dispatch_default("start", "zoom", "end"), y, b, x, S = 500, C = 150, w = 0, T = 10;
	function E(t) {
		t.property("__zoom", defaultTransform).on("wheel.zoom", N, { passive: !1 }).on("mousedown.zoom", P).on("dblclick.zoom", F).filter(p).on("touchstart.zoom", I).on("touchmove.zoom", L).on("touchend.zoom touchcancel.zoom", R).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	E.transform = function(t, u, d, f) {
		var p = t.selection ? t.selection() : t;
		p.property("__zoom", defaultTransform), t === p ? p.interrupt().each(function() {
			j(this, arguments).event(f).start().zoom(null, typeof u == "function" ? u.apply(this, arguments) : u).end();
		}) : A(t, u, d, f);
	}, E.scaleBy = function(t, u, d, f) {
		E.scaleTo(t, function() {
			var t = this.__zoom.k, d = typeof u == "function" ? u.apply(this, arguments) : u;
			return t * d;
		}, d, f);
	}, E.scaleTo = function(t, f, p, m) {
		E.transform(t, function() {
			var t = u.apply(this, arguments), m = this.__zoom, g = p == null ? k(t) : typeof p == "function" ? p.apply(this, arguments) : p, _ = m.invert(g), v = typeof f == "function" ? f.apply(this, arguments) : f;
			return d(O(D(m, v), g, _), t, h);
		}, p, m);
	}, E.translateBy = function(t, f, p, m) {
		E.transform(t, function() {
			return d(this.__zoom.translate(typeof f == "function" ? f.apply(this, arguments) : f, typeof p == "function" ? p.apply(this, arguments) : p), u.apply(this, arguments), h);
		}, null, m);
	}, E.translateTo = function(t, f, p, m, g) {
		E.transform(t, function() {
			var t = u.apply(this, arguments), g = this.__zoom, _ = m == null ? k(t) : typeof m == "function" ? m.apply(this, arguments) : m;
			return d(identity.translate(_[0], _[1]).scale(g.k).translate(typeof f == "function" ? -f.apply(this, arguments) : -f, typeof p == "function" ? -p.apply(this, arguments) : -p), t, h);
		}, m, g);
	};
	function D(t, u) {
		return u = Math.max(m[0], Math.min(m[1], u)), u === t.k ? t : new Transform(u, t.x, t.y);
	}
	function O(t, u, d) {
		var f = u[0] - d[0] * t.k, p = u[1] - d[1] * t.k;
		return f === t.x && p === t.y ? t : new Transform(t.k, f, p);
	}
	function k(t) {
		return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2];
	}
	function A(t, d, f, p) {
		t.on("start.zoom", function() {
			j(this, arguments).event(p).start();
		}).on("interrupt.zoom end.zoom", function() {
			j(this, arguments).event(p).end();
		}).tween("zoom", function() {
			var t = this, m = arguments, h = j(t, m).event(p), g = u.apply(t, m), v = f == null ? k(g) : typeof f == "function" ? f.apply(t, m) : f, y = Math.max(g[1][0] - g[0][0], g[1][1] - g[0][1]), b = t.__zoom, x = typeof d == "function" ? d.apply(t, m) : d, S = _(b.invert(v).concat(y / b.k), x.invert(v).concat(y / x.k));
			return function(t) {
				if (t === 1) t = x;
				else {
					var u = S(t), d = y / u[2];
					t = new Transform(d, v[0] - u[0] * d, v[1] - u[1] * d);
				}
				h.zoom(null, t);
			};
		});
	}
	function j(t, u, d) {
		return !d && t.__zooming || new M(t, u);
	}
	function M(t, d) {
		this.that = t, this.args = d, this.active = 0, this.sourceEvent = null, this.extent = u.apply(t, d), this.taps = 0;
	}
	M.prototype = {
		event: function(t) {
			return t && (this.sourceEvent = t), this;
		},
		start: function() {
			return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
		},
		zoom: function(t, u) {
			return this.mouse && t !== "mouse" && (this.mouse[1] = u.invert(this.mouse[0])), this.touch0 && t !== "touch" && (this.touch0[1] = u.invert(this.touch0[0])), this.touch1 && t !== "touch" && (this.touch1[1] = u.invert(this.touch1[0])), this.that.__zoom = u, this.emit("zoom"), this;
		},
		end: function() {
			return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
		},
		emit: function(t) {
			var u = select_default(this.that).datum();
			v.call(t, this.that, new ZoomEvent(t, {
				sourceEvent: this.sourceEvent,
				target: E,
				type: t,
				transform: this.that.__zoom,
				dispatch: v
			}), u);
		}
	};
	function N(u, ...p) {
		if (!t.apply(this, arguments)) return;
		var g = j(this, p).event(u), _ = this.__zoom, v = Math.max(m[0], Math.min(m[1], _.k * 2 ** f.apply(this, arguments))), y = pointer_default(u);
		if (g.wheel) (g.mouse[0][0] !== y[0] || g.mouse[0][1] !== y[1]) && (g.mouse[1] = _.invert(g.mouse[0] = y)), clearTimeout(g.wheel);
		else if (_.k === v) return;
		else g.mouse = [y, _.invert(y)], interrupt_default(this), g.start();
		noevent_default(u), g.wheel = setTimeout(b, C), g.zoom("mouse", d(O(D(_, v), g.mouse[0], g.mouse[1]), g.extent, h));
		function b() {
			g.wheel = null, g.end();
		}
	}
	function P(u, ...f) {
		if (x || !t.apply(this, arguments)) return;
		var p = u.currentTarget, m = j(this, f, !0).event(u), g = select_default(u.view).on("mousemove.zoom", b, !0).on("mouseup.zoom", S, !0), _ = pointer_default(u, p), v = u.clientX, y = u.clientY;
		nodrag_default(u.view), nopropagation(u), m.mouse = [_, this.__zoom.invert(_)], interrupt_default(this), m.start();
		function b(t) {
			if (noevent_default(t), !m.moved) {
				var u = t.clientX - v, f = t.clientY - y;
				m.moved = u * u + f * f > w;
			}
			m.event(t).zoom("mouse", d(O(m.that.__zoom, m.mouse[0] = pointer_default(t, p), m.mouse[1]), m.extent, h));
		}
		function S(t) {
			g.on("mousemove.zoom mouseup.zoom", null), yesdrag(t.view, m.moved), noevent_default(t), m.event(t).end();
		}
	}
	function F(f, ...p) {
		if (t.apply(this, arguments)) {
			var m = this.__zoom, _ = pointer_default(f.changedTouches ? f.changedTouches[0] : f, this), v = m.invert(_), y = m.k * (f.shiftKey ? .5 : 2), b = d(O(D(m, y), _, v), u.apply(this, p), h);
			noevent_default(f), g > 0 ? select_default(this).transition().duration(g).call(A, b, _, f) : select_default(this).call(E.transform, b, _, f);
		}
	}
	function I(u, ...d) {
		if (t.apply(this, arguments)) {
			var f = u.touches, p = f.length, m = j(this, d, u.changedTouches.length === p).event(u), h, g, _, v;
			for (nopropagation(u), g = 0; g < p; ++g) _ = f[g], v = pointer_default(_, this), v = [
				v,
				this.__zoom.invert(v),
				_.identifier
			], m.touch0 ? !m.touch1 && m.touch0[2] !== v[2] && (m.touch1 = v, m.taps = 0) : (m.touch0 = v, h = !0, m.taps = 1 + !!y);
			y &&= clearTimeout(y), h && (m.taps < 2 && (b = v[0], y = setTimeout(function() {
				y = null;
			}, S)), interrupt_default(this), m.start());
		}
	}
	function L(t, ...u) {
		if (this.__zooming) {
			var f = j(this, u).event(t), p = t.changedTouches, m = p.length, g, _, v, y;
			for (noevent_default(t), g = 0; g < m; ++g) _ = p[g], v = pointer_default(_, this), f.touch0 && f.touch0[2] === _.identifier ? f.touch0[0] = v : f.touch1 && f.touch1[2] === _.identifier && (f.touch1[0] = v);
			if (_ = f.that.__zoom, f.touch1) {
				var b = f.touch0[0], x = f.touch0[1], S = f.touch1[0], C = f.touch1[1], w = (w = S[0] - b[0]) * w + (w = S[1] - b[1]) * w, T = (T = C[0] - x[0]) * T + (T = C[1] - x[1]) * T;
				_ = D(_, Math.sqrt(w / T)), v = [(b[0] + S[0]) / 2, (b[1] + S[1]) / 2], y = [(x[0] + C[0]) / 2, (x[1] + C[1]) / 2];
			} else if (f.touch0) v = f.touch0[0], y = f.touch0[1];
			else return;
			f.zoom("touch", d(O(_, v, y), f.extent, h));
		}
	}
	function R(t, ...u) {
		if (this.__zooming) {
			var d = j(this, u).event(t), f = t.changedTouches, p = f.length, m, h;
			for (nopropagation(t), x && clearTimeout(x), x = setTimeout(function() {
				x = null;
			}, S), m = 0; m < p; ++m) h = f[m], d.touch0 && d.touch0[2] === h.identifier ? delete d.touch0 : d.touch1 && d.touch1[2] === h.identifier && delete d.touch1;
			if (d.touch1 && !d.touch0 && (d.touch0 = d.touch1, delete d.touch1), d.touch0) d.touch0[1] = this.__zoom.invert(d.touch0[0]);
			else if (d.end(), d.taps === 2 && (h = pointer_default(h, this), Math.hypot(b[0] - h[0], b[1] - h[1]) < T)) {
				var g = select_default(this).on("dblclick.zoom");
				g && g.apply(this, arguments);
			}
		}
	}
	return E.wheelDelta = function(t) {
		return arguments.length ? (f = typeof t == "function" ? t : constant_default(+t), E) : f;
	}, E.filter = function(u) {
		return arguments.length ? (t = typeof u == "function" ? u : constant_default(!!u), E) : t;
	}, E.touchable = function(t) {
		return arguments.length ? (p = typeof t == "function" ? t : constant_default(!!t), E) : p;
	}, E.extent = function(t) {
		return arguments.length ? (u = typeof t == "function" ? t : constant_default([[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]]), E) : u;
	}, E.scaleExtent = function(t) {
		return arguments.length ? (m[0] = +t[0], m[1] = +t[1], E) : [m[0], m[1]];
	}, E.translateExtent = function(t) {
		return arguments.length ? (h[0][0] = +t[0][0], h[1][0] = +t[1][0], h[0][1] = +t[0][1], h[1][1] = +t[1][1], E) : [[h[0][0], h[0][1]], [h[1][0], h[1][1]]];
	}, E.constrain = function(t) {
		return arguments.length ? (d = t, E) : d;
	}, E.duration = function(t) {
		return arguments.length ? (g = +t, E) : g;
	}, E.interpolate = function(t) {
		return arguments.length ? (_ = t, E) : _;
	}, E.on = function() {
		var t = v.on.apply(v, arguments);
		return t === v ? E : t;
	}, E.clickDistance = function(t) {
		return arguments.length ? (w = (t = +t) * t, E) : Math.sqrt(w);
	}, E.tapDistance = function(t) {
		return arguments.length ? (T = +t, E) : T;
	}, E;
}
function createTimeline(t, u, d = {}) {
	(function() {
		let d = select_default(t), f = d.node().clientWidth || 1e3, p = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 20
		}, m = Math.max(f, 900), h = Math.round(m / 2), g = d.append("svg").attr("width", "100%").attr("height", 740).attr("viewBox", `0 0 ${m} 740`), _ = (Array.isArray(u) && u.length > 0 ? u : [
			{
				id: 1,
				date: "2022-01-15",
				title: "Project Kickoff",
				lane: "main"
			},
			{
				id: 2,
				date: "2022-04-02",
				title: "Design Review",
				lane: "main"
			},
			{
				id: 3,
				date: "2022-07-10",
				title: "MVP Launch",
				lane: "main"
			},
			{
				id: 4,
				date: "2022-10-20",
				title: "Post-MVP Study",
				lane: "main"
			},
			{
				id: 5,
				date: "2023-02-18",
				title: "v1.0 Release",
				lane: "main"
			},
			{
				id: 6,
				date: "2023-06-05",
				title: "Scale Up",
				lane: "main"
			}
		]).map((t) => ({
			...t,
			date: new Date(t.date)
		})), v = [], y = [], b = min(_, (t) => t.date), x = max(_, (t) => t.date), S = (x - b) * .1, C = time().domain([new Date(b - S), new Date(x + S)]).range([740 - p.bottom, p.top]), w = Math.min(420, Math.round(m * .6)), T = g.append("g").attr("class", "root"), E = Array.from(new Set(_.map((t) => t.lane || "main")));
		E.indexOf("main") === -1 && E.unshift("main");
		let D = {};
		D.main = h;
		let O = 1, k = 1;
		E.forEach((t) => {
			t !== "main" && ((O + k) % 2 == 1 ? (D[t] = h - 220 * O, O += 1) : (D[t] = h + 220 * k, k += 1));
		});
		let A = T.append("g").attr("class", "sections"), j = T.append("g").attr("class", "lanes"), M = axisLeft(C).ticks(timeMonth.every(6)).tickSize(8).tickPadding(8).tickFormat(timeFormat("%b %Y")), N = j.selectAll("g.lane-axis").data(E).enter().append("g").attr("class", "lane-axis").attr("transform", (t) => `translate(${D[t]}, 0)`).each(function() {
			select_default(this).call(M);
		}), P = A.selectAll("g.section").data(v).enter().append("g").attr("class", "section");
		P.append("rect").attr("class", "section-fill").attr("x", h - w / 2).attr("y", (t) => C(t.start)).attr("width", w).attr("height", (t) => Math.max(4, C(t.end) - C(t.start))), P.each(function(t) {
			let u = select_default(this);
			u.append("line").attr("class", "section-boundary").attr("x1", h - w / 2 + 6).attr("x2", h + w / 2 - 6).attr("y1", C(t.start)).attr("y2", C(t.start)), u.append("line").attr("class", "section-boundary").attr("x1", h - w / 2 + 6).attr("x2", h + w / 2 - 6).attr("y1", C(t.end)).attr("y2", C(t.end)), u.append("text").attr("x", h).attr("y", C(t.start) - 8).attr("text-anchor", "middle").attr("fill", "#2b2b2b").attr("font-size", "12px").text(t.label);
		});
		let F = T.append("g").attr("class", "branch-regions").selectAll("g.branch").data(y).enter().append("g").attr("class", "branch");
		F.append("path").attr("class", "branch-region").attr("d", function(t) {
			let u = D[t.lane || "main"] || h, d = t.side === "left" ? -1 : 1, f = u + d * (t.offset || 80), p = C(t.start), m = C(t.end);
			return `M ${u} ${p + 10} L ${u + d * 10} ${p + 10} L ${f} ${p + 10} L ${f} ${m - 10} L ${u + d * 10} ${m - 10} L ${u} ${m - 10}`;
		});
		let I = T.append("g").attr("class", "events"), L = I.selectAll("g.event").data(_, (t) => t.id).enter().append("g").attr("class", "event").attr("transform", function(t, u) {
			let d = D[t.lane || "main"] || h, f = C(t.date);
			return `translate(${d}, ${f})`;
		}).on("mouseover", z).on("mousemove", B).on("mouseout", V);
		L.append("circle").attr("class", "node").attr("r", 8), L.append("text").attr("class", "label").attr("x", function(t, u) {
			let d = D[t.lane || "main"] || h;
			return (d < h ? -1 : d > h ? 1 : u % 2 == 0 ? -1 : 1) * 16;
		}).attr("dy", "0.32em").attr("text-anchor", function(t, u) {
			let d = D[t.lane || "main"] || h;
			return d < h ? "end" : d > h ? "start" : u % 2 == 0 ? "end" : "start";
		}).attr("font-size", "12px").attr("fill", "#222").text((t) => t.title);
		let R = select_default("body").append("div").attr("class", "tooltip").style("display", "none");
		function z(t, u) {
			R.style("display", "block").html(`<strong>${u.title}</strong><div style="margin-top:6px">${u.date.toDateString()}</div>`);
		}
		function B(t) {
			R.style("left", t.pageX + 12 + "px").style("top", t.pageY + 12 + "px");
		}
		function V() {
			R.style("display", "none");
		}
		let H = zoom_default().scaleExtent([.6, 6]).translateExtent([[-1e3, -1e3], [2e3, 2e3]]).on("zoom", (t) => {
			let u = t.transform.rescaleY(C);
			N.each(function() {
				select_default(this).call(M.scale(u));
			}), L.attr("transform", function(t) {
				return `translate(${D[t.lane || "main"] || h}, ${u(t.date)})`;
			}), P.selectAll("rect").attr("y", (t) => u(t.start)).attr("height", (t) => Math.max(2, u(t.end) - u(t.start))), P.selectAll(".section-boundary").filter((t, u) => u % 2 == 0).attr("y1", (t) => u(t.start)).attr("y2", (t) => u(t.start)), P.selectAll(".section-boundary").filter((t, u) => u % 2 == 1).attr("y1", (t) => u(t.end)).attr("y2", (t) => u(t.end)), P.selectAll("text").attr("y", (t) => u(t.start) - 8), F.selectAll("path.branch-region").attr("d", function(t) {
				let d = D[t.lane || "main"] || h, f = t.side === "left" ? -1 : 1, p = d + f * (t.offset || 80), m = u(t.start), g = u(t.end);
				return `M ${d} ${m + 10} L ${d + f * 10} ${m + 10} L ${p} ${m + 10} L ${p} ${g - 10} L ${d + f * 10} ${g - 10} L ${d} ${g - 10}`;
			});
		});
		g.call(H);
		function U() {
			let t = d.node().clientWidth || 900, u = Math.max(t, 900);
			h = Math.round(u / 2), g.attr("viewBox", `0 0 ${u} 740`), D.main = h;
			let f = 1, p = 1;
			E.forEach((t) => {
				t !== "main" && ((f + p) % 2 == 1 ? (D[t] = h - 220 * f, f += 1) : (D[t] = h + 220 * p, p += 1));
			}), N.attr("transform", (t) => `translate(${D[t]}, 0)`).each(function() {
				select_default(this).call(M);
			}), I.selectAll("g.event").attr("transform", function(t) {
				return `translate(${D[t.lane || "main"] || h}, ${C(t.date)})`;
			}), P.selectAll("rect").attr("x", h - w / 2).attr("width", w), P.selectAll(".section-boundary").attr("x1", h - w / 2 + 6).attr("x2", h + w / 2 - 6), P.selectAll("text").attr("x", h), F.selectAll("path.branch-region").attr("d", function(t) {
				let u = D[t.lane || "main"] || h, d = t.side === "left" ? -1 : 1, f = u + d * (t.offset || 80), p = C(t.start), m = C(t.end);
				return `M ${u} ${p + 10} L ${u + d * 10} ${p + 10} L ${f} ${p + 10} L ${f} ${m - 10} L ${u + d * 10} ${m - 10} L ${u} ${m - 10}`;
			});
		}
		window.addEventListener("resize", U);
	})();
}
export { createTimeline };
