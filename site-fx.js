/* Украшения сайта: карандашные рисунки (зёрна, чашки, стаканы на вынос, логотип зебры) + анимация открытия страниц */
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var css=''
   +'#zc-deco{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;pointer-events:none;z-index:-1}'
   +'#zc-deco .zc{position:absolute;opacity:var(--o,.3);will-change:transform;animation:zc-float var(--dur,24s) ease-in-out var(--dl,0s) infinite alternate}'
   +'#zc-deco svg{display:block;width:100%;height:auto;overflow:visible}'
   +'@keyframes zc-float{0%{transform:translate3d(0,0,0) rotate(var(--r,0deg))}100%{transform:translate3d(var(--dx,40px),var(--dy,-60px),0) rotate(calc(var(--r,0deg) + var(--rr,18deg)))}}'
   +'html.rv-on .rv{opacity:0!important;transform:translateY(28px)!important}'
   +'html.rv-on .rv.in{opacity:1!important;transform:none!important;transition:opacity .9s cubic-bezier(.2,.7,.2,1) var(--rd,0s),transform .9s cubic-bezier(.2,.7,.2,1) var(--rd,0s)!important}'
   +'html.modal-open #zc-deco .zc,html.pt-busy #zc-deco .zc{animation-play-state:paused}'
   +'html,body{touch-action:manipulation}'
   +'@media (prefers-reduced-motion:reduce){#zc-deco .zc{animation:none}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var ZEBRA_PATHS='<path d="M114.25 3.07 L107.25 3.08 L100.50 4.17 L95.50 5.53 L90.25 7.47 L85.25 10.00 L81.25 12.55 L80.00 14.22 L80.58 15.23 L82.75 15.40 L87.25 14.78 L102.50 11.52 L107.00 11.25 L110.25 11.67 L114.25 13.12 L117.15 15.35 L120.25 19.50 L121.67 23.00 L122.60 28.00 L122.60 33.75 L121.48 41.25 L120.02 47.25 L116.87 56.75 L112.92 66.50 L100.75 91.75 L97.93 101.25 L97.80 105.50 L98.82 108.75 L101.00 111.17 L104.00 112.17 L107.50 112.10 L110.25 111.52 L115.50 109.33 L119.00 107.42 L122.25 105.13 L126.50 101.43 L132.32 94.50 L137.13 86.25 L139.38 81.25 L141.47 75.25 L143.83 65.75 L144.67 60.00 L145.13 52.25 L145.73 50.93 L146.40 52.50 L146.75 60.00 L145.92 69.50 L143.55 79.75 L143.55 80.90 L144.45 80.23 L146.22 76.75 L149.03 69.25 L150.75 61.50 L151.60 55.00 L151.62 44.25 L149.87 33.75 L147.23 26.25 L144.98 21.75 L142.70 18.25 L138.25 13.08 L134.75 10.27 L130.75 7.80 L127.25 6.13 L122.50 4.58Z"/><path d="M115.07 20.50 L114.57 19.40 L113.50 18.53 L109.25 17.33 L101.50 17.00 L95.00 17.60 L87.00 18.92 L77.00 21.27 L72.75 23.18 L71.77 24.12 L71.52 25.10 L72.52 26.10 L75.25 26.50 L88.25 27.00 L99.00 26.85 L106.25 25.80 L111.00 24.42 L114.13 22.55 L114.93 21.47Z"/><path d="M118.03 33.65 L117.20 32.70 L115.50 32.17 L107.25 32.17 L90.25 34.02 L77.25 36.62 L68.50 39.72 L63.25 42.78 L61.28 44.52 L59.78 46.50 L59.12 48.50 L59.27 50.25 L60.40 52.15 L62.50 53.57 L65.00 54.08 L69.00 53.58 L74.25 51.30 L81.75 48.78 L97.75 44.48 L107.00 41.23 L116.00 36.57 L117.73 34.93Z"/><path d="M114.33 48.57 L113.83 47.73 L112.50 47.33 L103.75 48.30 L98.75 49.40 L97.45 50.30 L97.12 51.23 L97.80 52.35 L100.25 53.48 L103.75 54.17 L107.25 54.15 L109.75 53.42 L112.00 52.02 L113.77 50.25Z"/><path d="M105.23 62.27 L103.00 60.37 L99.50 59.13 L91.25 57.90 L81.75 57.08 L74.25 58.07 L68.75 59.70 L64.25 61.70 L60.83 64.50 L59.25 67.25 L59.22 68.75 L59.68 70.00 L60.80 71.33 L62.00 72.12 L63.50 72.58 L65.25 72.58 L77.25 70.07 L80.73 69.63 L81.55 70.17 L80.50 71.38 L68.75 77.52 L66.03 79.55 L64.45 81.50 L63.63 83.25 L63.42 85.00 L63.97 86.75 L65.28 88.27 L66.75 89.02 L68.50 89.20 L70.50 88.85 L73.50 87.50 L83.50 81.83 L89.50 79.22 L93.50 77.03 L99.50 73.07 L104.25 68.50 L105.23 67.00 L105.90 65.00 L105.88 63.75Z"/><path d="M91.47 86.62 L90.00 86.35 L87.00 87.35 L73.25 93.67 L72.02 94.82 L71.48 96.00 L71.50 97.00 L72.15 98.50 L74.25 100.92 L77.75 103.38 L80.50 103.92 L83.00 103.02 L85.68 100.50 L88.15 96.50 L91.27 89.00 L91.67 87.52Z"/>';
  var G='fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"';
  var SHAPES={
    bean:'<svg viewBox="0 0 60 84"><g '+G+'><path d="M30 6C14 8 6 30 8 50c2 20 14 29 24 27 14-3 22-24 20-44C50 16 42 4 30 6z"/><path d="M32 9C17 13 10 32 12 50c2 17 12 26 22 23"/><path d="M30 8c-12 14 10 22-1 34s10 20 0 34"/><path d="M41 48l8-3M42 57l8-4M39 66l7-4" stroke-width="1.6"/></g></svg>',
    cup:'<svg viewBox="0 0 120 104"><g '+G+'><path d="M18 40h68v22c0 17-13 29-34 29S18 79 18 62z"/><path d="M20 42h64"/><path d="M86 46h9c9 0 11 15 2 19-3 1-7 2-11 2"/><path d="M6 93c24 9 76 9 104 0"/><path d="M10 90c26 11 72 11 98 0" stroke-width="1.6"/><path d="M34 26c-7-7 7-11 0-19M54 26c-7-7 7-11 0-19M74 26c-7-7 7-11 0-19"/><path d="M28 54c4 20 22 26 42 24M34 50l10 2M32 58l10 3" stroke-width="1.5"/></g></svg>',
    togo:'<svg viewBox="0 0 76 116"><g '+G+'><path d="M16 11c2-7 13-9 22-9s20 2 22 9"/><path d="M10 24h56l-2-13H12z"/><path d="M6 24h64"/><path d="M12 26l6 80c.3 4 3 6 7 6h26c4 0 6.700-2 7-6l6-80"/><path d="M15 50h46l-2 38H17z"/><path d="M22 52l-3 34M30 51l-3 36M38 51l-2 37M46 51l-1 37M54 52l1 35" stroke-width="1.8"/><path d="M26 100c8 3 16 3 24 0M24 20h28" stroke-width="1.4"/></g></svg>',
    glass:'<svg viewBox="0 0 76 126"><g '+G+'><path d="M12 16h52l-4 96c0 4-3 7-7 7H23c-4 0-7-3-7-7z"/><path d="M14 18h48"/><path d="M47 4l-9 74M52 5l-9 73"/><path d="M17 54c11 6 31 6 42 0M18 82c10 6 29 6 40 0" stroke-width="1.8"/><path d="M24 26h11v11H24zM39 33h10v10H39z"/><path d="M22 92l9 2M24 100l9 2M44 90l9-2" stroke-width="1.4"/></g></svg>',
    zebra:'<svg viewBox="55 0 100 108"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">'+ZEBRA_PATHS+'</g></svg>',
    steam:'<svg viewBox="0 0 34 80"><g '+G+'><path d="M16 74c-10-10 10-17 0-27s10-17 0-27 8-10 6-16"/><path d="M24 70c-7-7 7-12 0-19" stroke-width="1.6"/></g></svg>',
    spark:'<svg viewBox="0 0 34 34"><g '+G+'><path d="M17 3v28M3 17h28M8 8l18 18M26 8L8 26" stroke-width="1.8"/></g></svg>'
  };
  var KINDS=['bean','cup','zebra','togo','glass','bean','steam','togo','zebra','cup','glass','bean','spark','togo','bean','glass','zebra','cup'];
  var SIZES={bean:[48,78],cup:[100,150],zebra:[90,136],togo:[64,92],glass:[58,80],steam:[32,46],spark:[24,36]};

  function rng(seed){ return function(){ seed=(seed*16807)%2147483647; return (seed-1)/2147483646; }; }

  function ensureFilter(){
    if(document.getElementById('zc-defs')) return;
    var d=document.createElement('div'); d.id='zc-defs'; d.setAttribute('aria-hidden','true'); d.setAttribute('data-no-translate','');
    d.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
    d.innerHTML='<svg width="0" height="0"><defs><filter id="zc-pencil" x="-12%" y="-12%" width="124%" height="124%">'
     +'<feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" result="w"/>'
     +'<feDisplacementMap in="SourceGraphic" in2="w" scale="3.4" xChannelSelector="R" yChannelSelector="G" result="d"/>'
     +'<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="9" result="g"/>'
     +'<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.9 0 0 0 -0.32" result="ga"/>'
     +'<feComposite in="d" in2="ga" operator="in"/></filter></defs></svg>';
    document.body.appendChild(d);
  }

  function buildDeco(){
    var body=document.body; if(!body) return;
    var old=document.getElementById('zc-deco'); if(old) old.remove();
    var H=Math.max(body.scrollHeight,window.innerHeight), W=window.innerWidth, mobile=W<700;
    var n=Math.max(6,Math.min(mobile?9:16,Math.round(H/(mobile?560:420))));
    var r=rng(20261005), wrap=document.createElement('div');
    wrap.id='zc-deco'; wrap.setAttribute('aria-hidden','true'); wrap.setAttribute('data-no-translate','');
    for(var i=0;i<n;i++){
      var k=KINDS[i%KINDS.length], sz=SIZES[k], size=Math.round(sz[0]+r()*(sz[1]-sz[0]));
      var el=document.createElement('div'); el.className='zc';
      var left=(i%2===0)? r()*28+1 : r()*28+66;      /* рисунки у краёв, чтобы не мешать тексту */
      el.style.left=left.toFixed(1)+'%';
      el.style.top=((i+r()*.8)/n*100).toFixed(1)+'%';
      el.style.width=size+'px';
      el.style.color=(r()<.62)?'#ffffff':'#003f3f';
      el.style.setProperty('--o',(.4+r()*.25).toFixed(2));
      el.style.setProperty('--r',Math.round(r()*70-35)+'deg');
      el.style.setProperty('--rr',Math.round(r()*40-20)+'deg');
      el.style.setProperty('--dur',(20+r()*16).toFixed(1)+'s');
      el.style.setProperty('--dl',(-r()*18).toFixed(1)+'s');
      el.style.setProperty('--dx',Math.round(r()*140-70)+'px');
      el.style.setProperty('--dy',Math.round(-30-r()*90)+'px');
      el.innerHTML=SHAPES[k];
      wrap.appendChild(el);
    }
    body.insertBefore(wrap,body.firstChild);
  }

  /* мягкое появление блоков при прокрутке (только то, что ниже первого экрана) */
  function reveal(){
    if(reduce||!('IntersectionObserver' in window)) return;
    var SEL='.feature-box,.feature-card,.step-card,.address-card,.creator-card,.stat-card,.media-card,.quote-box,.story-card-horizontal,.faq-item,.home-gallery-item,.download-app-banner,.form-container-box,.discount-selector-box,.city-buttons-container';
    var els=[].slice.call(document.querySelectorAll(SEL)).filter(function(el){ return el.getBoundingClientRect().top>window.innerHeight*0.92; });
    if(!els.length) return;
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting) return;
        var el=e.target; io.unobserve(el); el.classList.add('in');
        setTimeout(function(){ el.classList.remove('rv','in'); el.style.removeProperty('--rd'); },1300);
      });
    },{threshold:.1,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){
      var i=el.parentNode?[].indexOf.call(el.parentNode.children,el):0;
      el.classList.add('rv'); el.style.setProperty('--rd',((i%4)*0.08).toFixed(2)+'s'); io.observe(el);
    });
    document.documentElement.classList.add('rv-on');
  }

  /* анимация открытия страницы: шапка опускается, блоки первого экрана выезжают по очереди */
  function pageEnter(){
    if(reduce||!document.body.animate) return;
    var skip=/^(HEADER|FOOTER|SCRIPT|STYLE|LINK|NOSCRIPT)$/;
    var list=[], kids=[].slice.call(document.body.children);
    kids.forEach(function(k){
      if(skip.test(k.tagName)||k.id==='zebra-intro'||k.id==='zc-deco'||k.id==='zc-defs'||k.id==='scroll-progress'||k.id==='zl-over') return;
      if(getComputedStyle(k).position==='fixed') return;
      var sub=[].slice.call(k.children).filter(function(c){ return !skip.test(c.tagName)&&getComputedStyle(c).position!=='fixed'; });
      if(sub.length>1&&sub.length<=24) list=list.concat(sub); else list.push(k);
    });
    list=list.filter(function(el){ var r=el.getBoundingClientRect(); return r.height>0&&r.top<window.innerHeight*0.95&&r.bottom>0; }).slice(0,12);
    var hd=document.querySelector('header');
    if(hd) hd.animate([{transform:'translateY(-100%)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:800,easing:'cubic-bezier(.2,.7,.2,1)'});
    list.forEach(function(el,i){
      el.animate([{opacity:0,transform:'translateY(34px) scale(.975)'},{opacity:1,transform:'translateY(0) scale(1)'}],
        {duration:950,delay:160+i*95,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});
    });
  }




  /* охрана прокрутки: если окон нет, блокировка снимается (после закрытия окон и возврата на страницу) */
  function idle(){
    return !document.querySelector('.modal-overlay.active,#zc-lb.show,#mxCart.show,#zebra-intro,#zl-over,#pt-ov');
  }
  function unlock(){
    if(!idle()) return;
    var h=document.documentElement,b=document.body;
    h.classList.remove('modal-open'); b.classList.remove('modal-open','zi-lock');
    if(h.style.overflow==='hidden') h.style.overflow='';
    if(b.style.overflow==='hidden') b.style.overflow='';
  }
  ['wheel','touchmove','keydown','mousedown'].forEach(function(ev){ window.addEventListener(ev,unlock,{passive:true,capture:true}); });
  window.addEventListener('pageshow',unlock);
  document.addEventListener('visibilitychange',function(){ if(!document.hidden) unlock(); });

  function init(){
    buildDeco(); reveal();
    if(document.documentElement.classList.contains('zi-intro')) window.addEventListener('zebra:opening',function(){ setTimeout(pageEnter,350); },{once:true});
    else if(!document.documentElement.classList.contains('pt-enter')) pageEnter();
    window.addEventListener('load',buildDeco);
    var t; window.addEventListener('resize',function(){ clearTimeout(t); t=setTimeout(buildDeco,300); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
