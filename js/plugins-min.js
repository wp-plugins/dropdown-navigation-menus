(function(a){a.fn.hoverIntent=function(b,c){var d={sensitivity:7,interval:100,timeout:0};d=a.extend(d,c?{over:b,out:c}:b);var e,f,g,h,i=function(a){e=a.pageX,f=a.pageY},j=function(b,c){c.hoverIntent_t=clearTimeout(c.hoverIntent_t);if(Math.abs(g-e)+Math.abs(h-f)<d.sensitivity)return a(c).unbind("mousemove",i),c.hoverIntent_s=1,d.over.apply(c,[b]);g=e,h=f,c.hoverIntent_t=setTimeout(function(){j(b,c)},d.interval)},k=function(a,b){return b.hoverIntent_t=clearTimeout(b.hoverIntent_t),b.hoverIntent_s=0,d.out.apply(b,[a])},l=function(b){var c=(b.type=="mouseover"?b.fromElement:b.toElement)||b.relatedTarget;while(c&&c!=this)try{c=c.parentNode}catch(b){c=this}if(c==this)return!1;var e=jQuery.extend({},b),f=this;f.hoverIntent_t&&(f.hoverIntent_t=clearTimeout(f.hoverIntent_t)),b.type=="mouseover"?(g=e.pageX,h=e.pageY,a(f).bind("mousemove",i),f.hoverIntent_s!=1&&(f.hoverIntent_t=setTimeout(function(){j(e,f)},d.interval))):(a(f).unbind("mousemove",i),f.hoverIntent_s==1&&(f.hoverIntent_t=setTimeout(function(){k(e,f)},d.timeout)))};return this.mouseover(l).mouseout(l)}})(jQuery),function(a){a.fn.superfish=function(b){var c=a.fn.superfish,d=c.c,e=a(['<span class="',d.arrowClass,'"> &#187;</span>'].join("")),f=function(){var b=a(this),c=h(b);clearTimeout(c.sfTimer),b.showSuperfishUl().siblings().hideSuperfishUl()},g=function(){var b=a(this),d=h(b),e=c.op;clearTimeout(d.sfTimer),d.sfTimer=setTimeout(function(){e.retainPath=a.inArray(b[0],e.$path)>-1,b.hideSuperfishUl(),e.$path.length&&b.parents(["li.",e.hoverClass].join("")).length<1&&f.call(e.$path)},e.delay)},h=function(a){var b=a.parents(["ul.",d.menuClass,":first"].join(""))[0];return c.op=c.o[b.serial],b},i=function(a){a.addClass(d.anchorClass).append(e.clone())};return this.each(function(){var e=this.serial=c.o.length,h=a.extend({},c.defaults,b);h.$path=a("li."+h.pathClass,this).slice(0,h.pathLevels).each(function(){a(this).addClass([h.hoverClass,d.bcClass].join(" ")).filter("li:has(ul)").removeClass(h.pathClass)}),c.o[e]=c.op=h,a("li:has(ul)",this)[a.fn.hoverIntent&&!h.disableHI?"hoverIntent":"hover"](f,g).each(function(){h.autoArrows&&i(a(">a:first-child",this))}).not("."+d.bcClass).hideSuperfishUl();var j=a("a",this);j.each(function(a){var b=j.eq(a).parents("li");j.eq(a).focus(function(){f.call(b)}).blur(function(){g.call(b)})}),h.onInit.call(this)}).each(function(){var b=[d.menuClass];c.op.dropShadows&&!(a.browser.msie&&a.browser.version<7)&&b.push(d.shadowClass),a(this).addClass(b.join(" "))})};var b=a.fn.superfish;b.o=[],b.op={},b.IE7fix=function(){var c=b.op;a.browser.msie&&a.browser.version>6&&c.dropShadows&&c.animation.opacity!=undefined&&this.toggleClass(b.c.shadowClass+"-off")},b.c={bcClass:"sf-breadcrumb",menuClass:"sf-js-enabled",anchorClass:"sf-with-ul",arrowClass:"sf-sub-indicator",shadowClass:"sf-shadow"},b.defaults={hoverClass:"sfHover",pathClass:"overideThisToUse",pathLevels:1,delay:800,animation:{opacity:"show"},speed:"normal",autoArrows:!0,dropShadows:!0,disableHI:!1,onInit:function(){},onBeforeShow:function(){},onShow:function(){},onHide:function(){}},a.fn.extend({hideSuperfishUl:function(){var c=b.op,d=c.retainPath===!0?c.$path:"";c.retainPath=!1;var e=a(["li.",c.hoverClass].join(""),this).add(this).not(d).removeClass(c.hoverClass).find(">ul").hide().css("visibility","hidden");return c.onHide.call(e),this},showSuperfishUl:function(){var a=b.op,c=b.c.shadowClass+"-off",d=this.addClass(a.hoverClass).find(">ul:hidden").css("visibility","visible");return b.IE7fix.call(d),a.onBeforeShow.call(d),d.animate(a.animation,a.speed,function(){b.IE7fix.call(d),a.onShow.call(d)}),this}})}(jQuery),(function(a){a.fn.supersubs=function(b){var c=a.extend({},a.fn.supersubs.defaults,b);return this.each(function(){var b=a(this),d=a.meta?a.extend({},c,b.data()):c,e=a('<li id="menu-fontsize">&#8212;</li>').css({padding:0,position:"absolute",top:"-999em",width:"auto"}).appendTo(b).width();a("#menu-fontsize").remove(),$ULs=b.find("ul"),$ULs.each(function(b){var c=$ULs.eq(b),f=c.children(),g=f.children("a"),h=f.css("white-space","nowrap").css("float"),i=c.add(f).add(g).css({"float":"none",width:"auto"}).end().end()[0].clientWidth/e;i+=d.extraWidth,i>d.maxWidth?i=d.maxWidth:i<d.minWidth&&(i=d.minWidth),i+="em",c.css("width",i),f.css({"float":h,width:"100%","white-space":"normal"}).each(function(){var b=a(">ul",this),c=b.css("left")!==undefined?"left":"right";b.css(c,i)})})})},a.fn.supersubs.defaults={minWidth:9,maxWidth:25,extraWidth:0}})(jQuery)