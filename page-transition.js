/* Переход между страницами как в видео: старая страница плавно уходит вверх и тает в тёмной завесе,
   новая поднимается снизу и проявляется. Шапка остаётся на месте. */
(function(){
  var h=document.documentElement, leaving=false, anims=[], ov=null;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SKIP=/^(HEADER|FOOTER|SCRIPT|STYLE|LINK|NOSCRIPT)$/;
  var SKIPID={'zebra-intro':1,'zc-deco':1,'zc-defs':1,'scroll-progress':1,'zl-over':1,'pt-ov':1,'zc-lb':1};

  function movers(){
    var out=[];
    [].slice.call(document.body.children).forEach(function(k){
      if(SKIP.test(k.tagName)&&k.tagName!=='FOOTER') return;
      if(SKIPID[k.id]) return;
      if(getComputedStyle(k).position==='fixed') return;
      out.push(k);
    });
    return out;
  }
  /* блоки первого экрана: крупные блоки внутри контейнера */
  function firstScreen(){
    var list=[];
    movers().forEach(function(k){
      if(k.tagName==='FOOTER') return;
      var sub=[].slice.call(k.children).filter(function(c){ return !SKIP.test(c.tagName)&&getComputedStyle(c).position!=='fixed'; });
      if(sub.length>1&&sub.length<=24) list=list.concat(sub); else list.push(k);
    });
    return list.filter(function(el){ var r=el.getBoundingClientRect(); return r.height>0&&r.top<window.innerHeight*0.98&&r.bottom>0; }).slice(0,12);
  }

  function reveal(){
    try{ reveal2(); }catch(e){ h.classList.remove('pt-enter','pt-exit','pt-busy'); }
  }
  function reveal2(){
    h.classList.remove('pt-enter');
    if(h.classList.contains('zi-intro')) return;
    h.classList.add('pt-exit');
    setTimeout(function(){ h.classList.remove('pt-exit'); },700);
    if(reduce||!document.body.animate) return;
    firstScreen().forEach(function(el,i){
      el.animate([{opacity:0,transform:'translateY(7vh)'},{opacity:1,transform:'translateY(0)'}],
        {duration:800,delay:40+i*70,easing:'cubic-bezier(.2,.75,.25,1)',fill:'backwards'});
    });
  }

  if(h.classList.contains('pt-enter')){
    /* открываем страницу сразу, не дожидаясь загрузки всех картинок */
    setTimeout(reveal,30);
    setTimeout(function(){ h.classList.remove('pt-enter'); },1500);
  }

  window.addEventListener('pageshow',function(e){
    if(!e.persisted) return;
    leaving=false;
    anims.forEach(function(a){ try{a.cancel();}catch(x){} }); anims=[];
    if(ov){ ov.remove(); ov=null; }
    h.classList.remove('pt-enter','pt-exit','pt-busy');
  });
  function resetLeave(){
    leaving=false; h.classList.remove('pt-busy');
    anims.forEach(function(a){ try{a.cancel();}catch(x){} }); anims=[];
    if(ov){ ov.remove(); ov=null; }
  }

  function leave(href){
    if(reduce||!document.body.animate){ location.href=href; return; }
    h.classList.add('pt-busy');
    ov=document.createElement('div'); ov.id='pt-ov'; document.body.appendChild(ov);
    var D=640, E='cubic-bezier(.65,0,.35,1)';
    anims.push(ov.animate([{transform:'translateY(100vh)'},{transform:'translateY(-100vh)'}],{duration:D,easing:E,fill:'forwards'}));
    movers().forEach(function(el,i){
      anims.push(el.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-13vh)'}],
        {duration:D-60,delay:Math.min(i,6)*40,easing:E,fill:'forwards'}));
    });
    setTimeout(function(){ location.href=href; },D+60);
    /* если переход не состоялся, завеса снимается сама */
    setTimeout(resetLeave,D+3000);
  }

  document.addEventListener('click',function(e){
    if(leaving||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey) return;
    var a=e.target.closest?e.target.closest('a[href]'):null;
    if(!a) return;
    if((a.target&&a.target!=='_self')||a.hasAttribute('download')) return;
    var u; try{ u=new URL(a.href,location.href); }catch(x){ return; }
    if(u.protocol!==location.protocol||u.host!==location.host) return;
    if(u.pathname===location.pathname&&u.search===location.search) return;
    e.preventDefault(); leaving=true;
    try{ sessionStorage.setItem('zebra-pt','1'); }catch(x){}
    leave(u.href);
  });
})();
