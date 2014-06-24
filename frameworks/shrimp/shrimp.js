/****
 ****
 **** Shrimp.JS
 **** http://shrimpjs.com
 **** Copyright (c) 2013 Kirill Murashov
 **** Licensed under the MIT license
 ****
 ****/

(function () {
	window.shrimp = {};
	/******
	 ****   UTILS
	 ******/
	function indexOf(array, item) {
        if (array == null) return -1;
        var i, l;
        for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
        return -1;
    };



	/******
	 ****   Великий прототип объекта DOM
	 ******/
	function Dom(el) {
        this.el = el;
    };
    Dom.prototype = {
        /*Simple DOM manipulation*/
        setClass: function (className) {
            this.attr('class', className);
            return this;
        },
        addClass: function (className) {
            var currClassName = this.attr('class');
            if (currClassName === null || "undefined" === typeof currClassName) {
                this.attr('class', className);
            } else if (currClassName.indexOf(className) < 0) {
                this.attr('class', currClassName + ' ' + className);
            }
            return this;
        },
        removeClass: function (className) {
            var reg = new RegExp(className, 'g'),
                currClassName = this.attr('class');

            this.attr('class', currClassName.replace(reg, ''));

            return this;
        },
        toggleClass: function (className) {
            var currClassName = this.attr('class');
            var currArrayClassName = currClassName !== null ? currClassName.split(' ') : [];
            var num = indexOf(currArrayClassName, className);
            if (num === -1) {
                this.addClass(className)
            } else {
                currArrayClassName.splice(num, 1);
                this.setClass(currArrayClassName.join(' '));
            }
            return this;
        },
        insert: function (targetEl, destination) {
            if (typeof targetEl === 'string') {
                targetEl = document.getElementById(targetEl);
            };

			if(!targetEl.el){
				targetEl = _dom(targetEl);
			}



			if(destination === 'top'){

			}else{
				targetEl.el.appendChild(this.el);
			}

            return this;
        },
        attr: function (attrName, attrVal) {
            if (typeof attrVal !== 'undefined') {
                this.el.setAttribute(attrName, attrVal);
                return this;
            } else {
                return this.el.getAttribute(attrName);
            }
        },
        del: function () {
            this.el.parentNode.removeChild(this.el);
			this.el = null;
            return 1;
        },
        css: function (cssRules) {
            for (var i in cssRules) {
                this.el.style[i] = cssRules[i];
            }
            return this;
        },
        style: function (styleName, styleVal) {
            this.el.style[styleName] = styleVal;
            return this;
		},
		getFirstChildrens: function(){

		}
    };

	/******
	 ****   Обработчики событий
	 ******/

	if(!!window.addEventListener){
		window._ready = function(callbackFunction){
			window.addEventListener('DOMContentLoaded',callbackFunction);
		};
		Dom.prototype.on = function(eventName,callback){
			if(indexOf(shrimp.events.utils.getAllEventNames(),eventName) !== -1){
				shrimp.events.bind(this);
			}
			this.el.addEventListener(eventName,callback,false);
		};
		Dom.prototype.off = function(eventName,callback){
			if(indexOf(shrimp.events.utils.getAllEventNames(),eventName) !== -1){
				shrimp.events.unbind(this);
			}
			this.el.removeEventListener(eventName,callback);
		};
		Dom.prototype.trigger = function(eventName,eventData){
			console.log('trigg '+eventName,eventData);
		};
	}else if(!!window.attachEvent){
		window._ready = function(callbackFunction){
			window.attachEvent('onload',callbackFunction);
		};
		Dom.prototype.on = function(eventName,callback){
			if(indexOf(shrimp.events.utils.getAllEventNames(),eventName) !== -1){
				shrimp.events.bind(this);
			}
			this.el.attachEvent('on'+eventName,callback);
		};
		Dom.prototype.off = function(eventName,callback){
			if(indexOf(shrimp.events.utils.getAllEventNames(),eventName) !== -1){
				shrimp.events.unbind(this);
			}
			this.el.detachEvent('on'+eventName,callback);
		};
		Dom.prototype.trigger = function(eventName,eventData){
			console.log('trigg '+eventName,eventData);
		};
	};

	/******
	 ****   Фабрика DOM объектов
	 ******/
	window._dom = function (id, context) {
        context = context ? (context.el || context) : document;
		if(typeof id !== 'string'){
			return new Dom(id);
		}
        if (id.substr(0, 1) == '.') {
            var className = id.substr(1);
            if (typeof context.getElementsByClassName === 'function') {
                var resultArray = [];
                var arrayOfElements = context.getElementsByClassName(className);
                for (var i in arrayOfElements) if (Object.prototype.hasOwnProperty.call(arrayOfElements, i) && typeof arrayOfElements[i] === 'object') {
                    resultArray.push(new Dom(arrayOfElements[i]));
                }
                return resultArray;
            } else {
                resultArray = [];
                arrayOfElements = context.getElementsByTagName('*');
                for (var i in arrayOfElements) if (Object.prototype.hasOwnProperty.call(arrayOfElements, i) && typeof arrayOfElements[i] === 'object') {
                    var currClassName = arrayOfElements[i].getAttribute('class');
                    var arrayOfClasses = currClassName === null ? [] : currClassName.split(' ');
                    if (indexOf(arrayOfClasses, className) !== -1) {
                        resultArray.push(new Dom(arrayOfElements[i]));
                    }
                }
                return resultArray;
            }
        } else if (id.substr(0, 1) == '#') {
            var el = context.getElementById(id.substr(1));
            return new Dom(el);
        } else {
            resultArray = [];
            arrayOfElements = context.getElementsByTagName(id);
            for (var i in arrayOfElements) if (Object.prototype.hasOwnProperty.call(arrayOfElements, i) && typeof arrayOfElements[i] === 'object') {
                resultArray.push(new Dom(arrayOfElements[i]));
            }
            return resultArray;
        }
    };




	/******
	 ****   Конструктор новых элементов
	 ******/
    window._newEl = function (tag, properties) {
        properties = properties || {};
        if ("string" == typeof tag) {
            var el = new Dom(document.createElement(tag));
        } else {
            el = new Dom(tag);
        }
        if (typeof properties.styles !== 'undefined') {
            el.css(properties.styles);
            delete properties.styles;
        };
        for (var i in properties) {
            el.attr(i, properties[i]);
        }
        return el;
    };
})();