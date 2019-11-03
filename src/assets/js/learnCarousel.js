// ====================== Carousel code

var L = "carousel", j = "bs.carousel", H = "." + j, R = ".data-api", x = g.fn[L],
    F = {
        interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0
    },
    U = {
        interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean", touch: "boolean"
    },
    W = "next", q = "prev", M = "left", K = "right",
    Q = {
        SLIDE: "slide" + H, SLID: "slid" + H, KEYDOWN: "keydown" + H, MOUSEENTER: "mouseenter" + H, MOUSELEAVE: "mouseleave" + H, TOUCHSTART: "touchstart" + H, TOUCHMOVE: "touchmove" + H, TOUCHEND: "touchend" + H, POINTERDOWN: "pointerdown" + H, POINTERUP: "pointerup" + H, DRAG_START: "dragstart" + H, LOAD_DATA_API: "load" + H + R, CLICK_DATA_API: "click" + H + R
    },
    B = "carousel", V = "active", Y = "slide", z = "carousel-item-right", X = "carousel-item-left", $ = "carousel-item-next", G = "carousel-item-prev", J = "pointer-event", Z = ".active", tt = ".active.carousel-item", et = ".carousel-item", nt = ".carousel-item img", it = ".carousel-item-next, .carousel-item-prev", ot = ".carousel-indicators", rt = "[data-slide], [data-slide-to]", st = '[data-ride="carousel"]',
    at = { TOUCH: "touch", PEN: "pen" },

    lt = function () {

        function r(t, e) {
            this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0,
                this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(ot), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent),
                this._addEventListeners()
        }

        var t = r.prototype;

        return t.next = function () {
            this._isSliding || this._slide(W)
        },

            t.nextWhenVisible = function () {
                !document.hidden && g(this._element).is(":visible") && "hidden" !== g(this._element).css("visibility") && this.next()
            },

            t.prev = function () {
                this._isSliding || this._slide(q)
            },

            t.pause = function (t) {
                t || (this._isPaused = !0), this._element.querySelector(it) && (_.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            },

            t.cycle = function (t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            },

            t.to = function (t) {
                var e = this; this._activeElement = this._element.querySelector(tt); var n = this._getItemIndex(this._activeElement); if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) g(this._element).one(Q.SLID, function () { return e.to(t) }); else { if (n === t) return this.pause(), void this.cycle(); var i = n < t ? W : q; this._slide(i, this._items[t]) }
            },

            t.dispose = function () {
                g(this._element).off(H), g.removeData(this._element, j), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            },

            t._getConfig = function (t) {
                return t = l({}, F, t), _.typeCheckConfig(L, t, U), t
            },

            t._handleSwipe = function () {
                var t = Math.abs(this.touchDeltaX); if (!(t <= 40)) { var e = t / this.touchDeltaX; 0 < e && this.prev(), e < 0 && this.next() }
            },

            t._addEventListeners = function () {
                var e = this; this._config.keyboard && g(this._element).on(Q.KEYDOWN, function (t) { return e._keydown(t) }), "hover" === this._config.pause && g(this._element).on(Q.MOUSEENTER, function (t) { return e.pause(t) }).on(Q.MOUSELEAVE, function (t) { return e.cycle(t) }), this._config.touch && this._addTouchEventListeners()
            },

            t._addTouchEventListeners = function () {
                var n = this; if (this._touchSupported) { var e = function (t) { n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = t.originalEvent.clientX : n._pointerEvent || (n.touchStartX = t.originalEvent.touches[0].clientX) }, i = function (t) { n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX), n._handleSwipe(), "hover" === n._config.pause && (n.pause(), n.touchTimeout && clearTimeout(n.touchTimeout), n.touchTimeout = setTimeout(function (t) { return n.cycle(t) }, 500 + n._config.interval)) }; g(this._element.querySelectorAll(nt)).on(Q.DRAG_START, function (t) { return t.preventDefault() }), this._pointerEvent ? (g(this._element).on(Q.POINTERDOWN, function (t) { return e(t) }), g(this._element).on(Q.POINTERUP, function (t) { return i(t) }), this._element.classList.add(J)) : (g(this._element).on(Q.TOUCHSTART, function (t) { return e(t) }), g(this._element).on(Q.TOUCHMOVE, function (t) { var e; (e = t).originalEvent.touches && 1 < e.originalEvent.touches.length ? n.touchDeltaX = 0 : n.touchDeltaX = e.originalEvent.touches[0].clientX - n.touchStartX }), g(this._element).on(Q.TOUCHEND, function (t) { return i(t) })) }
            },

            t._keydown = function (t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) { case 37: t.preventDefault(), this.prev(); break; case 39: t.preventDefault(), this.next() }
            },

            t._getItemIndex = function (t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(et)) : [], this._items.indexOf(t)
            },

            t._getItemByDirection = function (t, e) {
                var n = t === W, i = t === q, o = this._getItemIndex(e), r = this._items.length - 1; if ((i && 0 === o || n && o === r) && !this._config.wrap) return e; var s = (o + (t === q ? -1 : 1)) % this._items.length; return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            },

            t._triggerSlideEvent = function (t, e) {
                var n = this._getItemIndex(t), i = this._getItemIndex(this._element.querySelector(tt)), o = g.Event(Q.SLIDE, { relatedTarget: t, direction: e, from: i, to: n }); return g(this._element).trigger(o), o
            },

            t._setActiveIndicatorElement = function (t) {
                if (this._indicatorsElement) { var e = [].slice.call(this._indicatorsElement.querySelectorAll(Z)); g(e).removeClass(V); var n = this._indicatorsElement.children[this._getItemIndex(t)]; n && g(n).addClass(V) }
            },

            t._slide = function (t, e) {
                var n, i, o, r = this, s = this._element.querySelector(tt), a = this._getItemIndex(s), l = e || s && this._getItemByDirection(t, s), c = this._getItemIndex(l), h = Boolean(this._interval); if (o = t === W ? (n = X, i = $, M) : (n = z, i = G, K), l && g(l).hasClass(V)) this._isSliding = !1; else if (!this._triggerSlideEvent(l, o).isDefaultPrevented() && s && l) { this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(l); var u = g.Event(Q.SLID, { relatedTarget: l, direction: o, from: a, to: c }); if (g(this._element).hasClass(Y)) { g(l).addClass(i), _.reflow(l), g(s).addClass(n), g(l).addClass(n); var f = parseInt(l.getAttribute("data-interval"), 10); this._config.interval = f ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, f) : this._config.defaultInterval || this._config.interval; var d = _.getTransitionDurationFromElement(s); g(s).one(_.TRANSITION_END, function () { g(l).removeClass(n + " " + i).addClass(V), g(s).removeClass(V + " " + i + " " + n), r._isSliding = !1, setTimeout(function () { return g(r._element).trigger(u) }, 0) }).emulateTransitionEnd(d) } else g(s).removeClass(V), g(l).addClass(V), this._isSliding = !1, g(this._element).trigger(u); h && this.cycle() }
            },

            r._jQueryInterface = function (i) {
                return this.each(function () { var t = g(this).data(j), e = l({}, F, g(this).data()); "object" == typeof i && (e = l({}, e, i)); var n = "string" == typeof i ? i : e.slide; if (t || (t = new r(this, e), g(this).data(j, t)), "number" == typeof i) t.to(i); else if ("string" == typeof n) { if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"'); t[n]() } else e.interval && e.ride && (t.pause(), t.cycle()) })
            },

            r._dataApiClickHandler = function (t) {
                var e = _.getSelectorFromElement(this); if (e) {
                    var n = g(e)[0]; if (n && g(n).hasClass(B)) {
                        var i = l({}, g(n).data(), g(this).data()), o = this.getAttribute("data-slide-to"); o && (i.interval = !1), r._jQueryInterface.call(g(n), i), o && g(n).data(j).to(o),

                            t.preventDefault()
                    }
                }
            },

            s(r, null, [
                {
                    key: "VERSION",
                    get: function () {
                        return "4.3.1"
                    }
                },
                {
                    key: "Default",
                    get: function () {
                        return F
                    }
                }
            ]),
            r
    }();  // END IIFE lt()

    // ======================= END: Carousel