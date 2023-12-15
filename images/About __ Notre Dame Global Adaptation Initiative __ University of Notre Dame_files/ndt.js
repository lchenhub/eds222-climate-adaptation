/*!
 * Replace no-js on HTML with js
 */
document.documentElement.className = document.documentElement.className.replace(/(\s|^)no-js(\s|$)/, '$1' + 'js' + '$2');

/*!
 * https://github.com/jonathanstark/FastActive
 */
(function(a,c,d,f){if("ontouchstart"in c||c.a&&a instanceof DocumentTouch){var b=null,e=function(){b&&(b.classList.remove(d),b=null)};a.documentElement.classList.add("touch");a.documentElement.classList.remove("no-touch");a.body.addEventListener("touchstart",function(a){e();f(a)&&(b=a.target,b.classList.add(d))},!1);a.body.addEventListener("touchmove",e,!1)}else a.documentElement.className+=" no-touch"})(document,window,"tapped",function(a){return-1<["A","INPUT"].indexOf(a.target.tagName)});

/*!
 * General Helpers
 */
jQuery(function($){

  // Table overflow
  $('table').wrap('<div class="tablewrap"></div>'); // requires .tablewrap styles

  // PDF Download tracking
  $('a[href$=".pdf"]').on('click', function(e) {
    try{ ga( 'send', 'event', 'UserAction', 'PDF Download', this.href ); } catch(err){}
  });

  // External Link Tracking
  $("a[href*='://']:not([href*='"+location.hostname+"'])").on('click', function(e){
    try{ ga( 'send', 'event', 'UserAction', 'External Link', this.href ); } catch(err){}
  });

});

/*!
 * FitVids 1.2
 * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 * https://github.com/davatron5000/FitVids.js
 * NOTE: This version includes a non-Master fix that prevents videos from exceeding the embed size
 * Custom selectors: $("#thing-with-videos").fitVids({ customSelector: "iframe[src^='http://mycoolvideosite.com'], iframe[src^='http://myviiids.com']"});
 */
;(function($){'use strict';$.fn.fitVids=function(options){var settings={customSelector:null,ignore:null,maxWidth:false,maxWidthDefault:900};if(!document.getElementById('fit-vids-style')){var head=document.head||document.getElementsByTagName('head')[0];var css='.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';var div=document.createElement("div");div.innerHTML='<p>x</p><style id="fit-vids-style">'+css+'</style>';head.appendChild(div.childNodes[1]);} if(options){$.extend(settings,options);} return this.each(function(){var selectors=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]','object','embed'];if(settings.customSelector){selectors.push(settings.customSelector);} var ignoreList='.fitvidsignore';if(settings.ignore){ignoreList=ignoreList+', '+settings.ignore;} var $allVideos=$(this).find(selectors.join(','));$allVideos=$allVideos.not('object object');$allVideos=$allVideos.not(ignoreList);$allVideos.each(function(){var $this=$(this);if($this.parents(ignoreList).length>0){return;} if(this.tagName.toLowerCase()==='embed'&&$this.parent('object').length||$this.parent('.fluid-width-video-wrapper').length){return;} if((!$this.css('height')&&!$this.css('width'))&&(isNaN($this.attr('height'))||isNaN($this.attr('width')))) {$this.attr('height',9);$this.attr('width',16);} var height=(this.tagName.toLowerCase()==='object'||($this.attr('height')&&!isNaN(parseInt($this.attr('height'),10))))?parseInt($this.attr('height'),10):$this.height(),width=!isNaN(parseInt($this.attr('width'),10))?parseInt($this.attr('width'),10):$this.width(),aspectRatio=height/width;if(!$this.attr('id')){var videoID='fitvid'+Math.floor(Math.random()*999999);$this.attr('id',videoID);} $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top',(aspectRatio*100)+'%');if(settings.maxWidth&&(width||settings.maxWidthDefault)){$this.parent('.fluid-width-video-wrapper').wrap('<div class="max-width-video-wrapper"></div>').parent('.max-width-video-wrapper').css('max-width',width?width+"px":settings.maxWidthDefault+"px");} $this.removeAttr('height').removeAttr('width');});});};})(window.jQuery||window.Zepto);
jQuery(function($) {
  $("#content").fitVids({ maxWidth: true });
});

/*!
 * Video Placeholder
 * @author Erik Runyon
 * Updated 2014-03-11
 */
jQuery(function($) {
  $('.video')
    .append('<div class="play"></div>')
    .on('click', function(e) {
      e.preventDefault();

      var $this = $(this),
        ww = $(window).width(),
        id = this.getAttribute('data-id'),
        dw = this.getAttribute('data-width'),
        dh = this.getAttribute('data-height'),
        ratio = dh / dw,
        w = $this.width(),
        h = Math.floor(w * ratio),
        service = $this.hasClass('vimeo') ? 'vimeo' : 'youtube',
        baseurl = (service == "youtube") ? "//www.youtube.com/embed/" : "//player.vimeo.com/video/"
      ;
      try{ ga('send', 'event', 'Play Video', $this.attr('href')); } catch(err){}
      $this.parent().html('<iframe width="' + w + '" height="' + h + '" frameborder="0" src="' + baseurl + id + '?autoplay=1&amp;rel=0&amp;wmode=transparent&amp;vq=hd720" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
      $("#content").fitVids();
  });
});

/*!
 * Caption Fix
 * @author Erik Runyon
 * Updated 2016-11-09
 */
captionFix = function(){
  var $content = $('#content');
  $content.find('.image-right img, .image-left img, .image-default img').each(function(){
    var $this = $(this),
        $parent = $this.closest('p')
    ;
    if($parent.text().trim().length > 0 && !$parent.hasClass('nocap')) {
      $parent.css({ width: 'auto' }).css({ width: $this.outerWidth() }).addClass('captioned');
    }
  });
};
$(window).on('load resize', function(){ captionFix(); });

/*!
 * HTML5 Placeholder jQuery Plugin v2.0.7
 * @link http://mths.be/placeholder
 * @author Mathias Bynens <http://mathiasbynens.be/>
 * For IE 8 & 9
 */
;(function(f,h,$){var a='placeholder' in h.createElement('input'),d='placeholder' in h.createElement('textarea'),i=$.fn,c=$.valHooks,k,j;if(a&&d){j=i.placeholder=function(){return this};j.input=j.textarea=true}else{j=i.placeholder=function(){var l=this;l.filter((a?'textarea':':input')+'[placeholder]').not('.placeholder').bind({'focus.placeholder':b,'blur.placeholder':e}).data('placeholder-enabled',true).trigger('blur.placeholder');return l};j.input=a;j.textarea=d;k={get:function(m){var l=$(m);return l.data('placeholder-enabled')&&l.hasClass('placeholder')?'':m.value},set:function(m,n){var l=$(m);if(!l.data('placeholder-enabled')){return m.value=n}if(n==''){m.value=n;if(m!=h.activeElement){e.call(m)}}else{if(l.hasClass('placeholder')){b.call(m,true,n)||(m.value=n)}else{m.value=n}}return l}};a||(c.input=k);d||(c.textarea=k);$(function(){$(h).delegate('form','submit.placeholder',function(){var l=$('.placeholder',this).each(b);setTimeout(function(){l.each(e)},10)})});$(f).bind('beforeunload.placeholder',function(){$('.placeholder').each(function(){this.value=''})})}function g(m){var l={},n=/^jQuery\d+$/;$.each(m.attributes,function(p,o){if(o.specified&&!n.test(o.name)){l[o.name]=o.value}});return l}function b(m,n){var l=this,o=$(l);if(l.value==o.attr('placeholder')&&o.hasClass('placeholder')){if(o.data('placeholder-password')){o=o.hide().next().show().attr('id',o.removeAttr('id').data('placeholder-id'));if(m===true){return o[0].value=n}o.focus()}else{l.value='';o.removeClass('placeholder');l==h.activeElement&&l.select()}}}function e(){var q,l=this,p=$(l),m=p,o=this.id;if(l.value==''){if(l.type=='password'){if(!p.data('placeholder-textinput')){try{q=p.clone().attr({type:'text'})}catch(n){q=$('<input>').attr($.extend(g(this),{type:'text'}))}q.removeAttr('name').data({'placeholder-password':true,'placeholder-id':o}).bind('focus.placeholder',b);p.data({'placeholder-textinput':q,'placeholder-id':o}).before(q)}p=p.removeAttr('id').hide().prev().attr('id',o).show()}p.addClass('placeholder');p[0].value=p.attr('placeholder')}else{p.removeClass('placeholder')}}}(this,document,jQuery));
jQuery(function($){$('input, textarea').placeholder();});

/*!
 * Avoid `console` errors in browsers that lack a console.
 */
if (!(window.console && console.log)) {
  (function() {
    var noop = function() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = window.console = {};
    while (length--) {
      console[methods[length]] = noop;
    }
  }());
}

/*!
 * Normalized hide address bar for iOS & Android
 * (c) Scott Jehl, scottjehl.com
 * https://github.com/scottjehl/Hide-Address-Bar
 * MIT License
 */
(function( win ){ var doc = win.document; if( !location.hash && win.addEventListener ){ window.scrollTo( 0, 1 ); var scrollTop = 1, getScrollTop = function(){ return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0; }, bodycheck = setInterval(function(){ if( doc.body ){ clearInterval( bodycheck ); scrollTop = getScrollTop(); win.scrollTo( 0, scrollTop === 1 ? 0 : 1 ); }	 }, 15 ); win.addEventListener( "load", function(){ setTimeout(function(){ if( getScrollTop() < 20 ){ win.scrollTo( 0, scrollTop === 1 ? 0 : 1 ); } }, 0); } ); } })( this );

/*!
 * Mobile Nav
 * @author Erik Runyon
 * Updated 2014-03-13
 */
jQuery(function($){
  $('<div class="nav-mobile"></div>').insertBefore('.wrapper');

  var $wrapper = $('#wrapper'),
      $drawer = $('.nav-mobile'),
      $button = $('.nav-skip'),
      toggleDrawer = function(){
        $wrapper.toggleClass("active");
        $drawer.toggleClass("active");
        $button.toggleClass('toggled');
      }
  ;

  $('#search').clone().attr('id', 'search-mobile').appendTo($drawer).find('.search-input').attr('id', 'search-input-mobile').end().find('label').attr('for', 'search-input-mobile');
  $('#nav').clone().attr('id', 'nav-mobile').appendTo($drawer);

  $('#content').on('click', function(){ if($wrapper.hasClass('active')) toggleDrawer(); });
  $button.on('click', function(e){ e.preventDefault(); toggleDrawer(); });
  //$(window).on('resize', function(){ if($wrapper.hasClass('active')) toggleDrawer(); });
});

/*!
 * Search
 * @author Erik Runyon
 * Updated 2014-05-13
 */
 if($('.search-results').length){
  jQuery(function($){
    $('<p class="search-sort">Sort by: <select class="search-sort-select" id="sort-select"><option value="">Relevance</option><option value="date">Date</option></select></p>').insertBefore($('.search-results'));
    $('#sort-select').on('change', function(){
      var sort = $(this).val(),
          site = getURLParameter('as_sitesearch') ? getURLParameter('as_sitesearch') : '';
      window.location.href = window.location.origin + window.location.pathname + '?q=' + getURLParameter('q') + '&as_sitesearch=' + site + '&sort=' + sort;
    });
    if(GetURLParameter('sort') == 'date'){
      $('#sort-select').val('date');
    }
  });
}

function GetURLParameter(param){
  var sURLVariables = window.location.search.substring(1).split('&');
  for(var i = 0; i < sURLVariables.length; i++){
    var sParameterName = sURLVariables[i].split('=');
    if(sParameterName[0] == param){
      return sParameterName[1];
    }
  }
}
