/* Заставка Zebra Coffee: логотип -> выбор языка -> перелёт логотипа в шапку */
(function(){
  var box=document.getElementById('zebra-intro');
  if(!box) return;
  var T_OUT=9400, T_LANG=10100, CYCLE=2000;
  var order=['en','ru','kk'];
  var copy={
    en:{t:'Choose your language',s:'Select a language to continue',b:'Continue'},
    ru:{t:'Выберите язык',s:'Выберите язык, чтобы продолжить',b:'Продолжить'},
    kk:{t:'Тілді таңдаңыз',s:'Жалғастыру үшін тілді таңдаңыз',b:'Жалғастыру'}
  };
  var stage=box.querySelector('svg.stage'), logoWrap=box.querySelector('.zi-logo');
  var title=document.getElementById('zi-title'), sub=document.getElementById('zi-sub'), goTxt=document.getElementById('zi-gotxt');
  var chips=[].slice.call(box.querySelectorAll('.zi-chip'));
  var timers=[], cycle=null, shown=null, choice=null, idx=0, leaving=false, langOn=false;

  window.scrollTo(0,0);
  document.body.classList.add('zi-lock');

  /* мягкое свечение: копия логотипа с размытием, появляется один раз (без мигания) */
  var glow=stage.cloneNode(true);
  glow.removeAttribute('style'); glow.removeAttribute('aria-label'); glow.setAttribute('aria-hidden','true'); glow.setAttribute('class','zi-glow');
  glow.querySelectorAll('.zp').forEach(function(p){p.removeAttribute('class');p.removeAttribute('style');p.setAttribute('fill','#2fd3c2');});
  logoWrap.insertBefore(glow,stage);

  /* смена текста по буквам: старые уходят вверх, новые приходят снизу */
  function layer(text){
    var l=document.createElement('span'); l.className='zr-layer';
    text.split(' ').forEach(function(w,i,a){
      var wd=document.createElement('span'); wd.className='zr-w';
      for(var k=0;k<w.length;k++){var c=document.createElement('span');c.className='zr-c';c.textContent=w[k];wd.appendChild(c);}
      l.appendChild(wd); if(i<a.length-1) l.appendChild(document.createTextNode(' '));
    });
    return l;
  }
  function roll(el,text){
    var old=el.querySelector('.zr-layer.cur');
    [].slice.call(el.querySelectorAll('.zr-layer:not(.cur)')).forEach(function(n){n.remove()});
    var nw=layer(text); nw.classList.add('cur'); el.appendChild(nw);
    if(!old) return;
    old.classList.remove('cur');
    var oc=old.querySelectorAll('.zr-c'), nc=nw.querySelectorAll('.zr-c'), STEP=24;
    [].forEach.call(oc,function(c,i){
      c.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(-125%)',opacity:0}],{duration:520,delay:i*STEP,easing:'cubic-bezier(.65,0,.35,1)',fill:'forwards'});
    });
    [].forEach.call(nc,function(c,i){
      c.animate([{transform:'translateY(125%)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:600,delay:150+i*STEP,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});
    });
    setTimeout(function(){old.remove()},150+Math.max(oc.length,nc.length)*STEP+700);
  }
  function show(l){
    if(shown===l) return; shown=l;
    roll(title,copy[l].t); roll(sub,copy[l].s); roll(goTxt,copy[l].b);
  }
  function stopCycle(){ if(cycle){clearInterval(cycle);cycle=null;} }
  function startCycle(){ stopCycle(); cycle=setInterval(function(){ idx=(idx+1)%order.length; show(order[idx]); },CYCLE); }

  function pick(l){
    choice=l; stopCycle(); idx=order.indexOf(l);
    chips.forEach(function(c){c.setAttribute('aria-pressed',c.getAttribute('data-lang')===l?'true':'false')});
    show(l);
  }

  /* начальное состояние: английский; если язык уже выбирали раньше, он выбран заранее */
  var saved=null; try{saved=localStorage.getItem('zebra-coffee-language')}catch(e){}
  if(saved && copy[saved]){ shown=saved; idx=order.indexOf(saved); choice=saved;
    chips.forEach(function(c){c.setAttribute('aria-pressed',c.getAttribute('data-lang')===saved?'true':'false')});
    roll(title,copy[saved].t); roll(sub,copy[saved].s); roll(goTxt,copy[saved].b);
  } else { shown='en'; roll(title,copy.en.t); roll(sub,copy.en.s); roll(goTxt,copy.en.b); }

  function showLang(){
    if(langOn) return; langOn=true;
    box.classList.add('phase-out','lang-show');
    if(!choice) startCycle();
  }
  timers.push(setTimeout(function(){box.classList.add('phase-out')},T_OUT));
  timers.push(setTimeout(showLang,T_LANG));
  document.getElementById('zi-skip').addEventListener('click',function(){timers.forEach(clearTimeout);showLang();});

  chips.forEach(function(c){c.addEventListener('click',function(){pick(c.getAttribute('data-lang'))})});
  document.getElementById('zi-go').addEventListener('click',go);

  function finish(){
    box.remove(); document.body.classList.remove('zi-lock');
  }

  /* перелёт: логотип из центра встаёт на место в шапке (слева сверху) */
  function go(){
    if(leaving) return; leaving=true; stopCycle();
    var lang=choice||'en';
    if(window.ZebraI18n) window.ZebraI18n.setLanguage(lang);
    try{sessionStorage.setItem('zebra-intro-seen','1')}catch(e){}
    box.classList.add('leaving');

    var img=document.querySelector('header .logo-img');
    var bg=box.querySelector('.zi-bg');
    var r=stage.getBoundingClientRect();
    if(!img || !img.getBoundingClientRect().width || !r.width){
      bg.animate([{opacity:1},{opacity:0}],{duration:700,fill:'forwards'}).onfinish=finish; return;
    }

    var f=stage.cloneNode(true);
    f.removeAttribute('style'); f.setAttribute('class','zi-fly'); f.setAttribute('aria-hidden','true');
    var heads=[], texts=[];
    f.querySelectorAll('.zp').forEach(function(p){
      var h=p.classList.contains('h');
      p.removeAttribute('class'); p.removeAttribute('style'); p.setAttribute('fill','#fff'); p.setAttribute('stroke','none');
      (h?heads:texts).push(p);
    });
    f.style.left=r.left+'px'; f.style.top=r.top+'px'; f.style.width=r.width+'px'; f.style.height=r.height+'px';
    box.appendChild(f);

    var u=r.width/209, x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
    heads.forEach(function(p){var b=p.getBBox(); x0=Math.min(x0,b.x);y0=Math.min(y0,b.y);x1=Math.max(x1,b.x+b.width);y1=Math.max(y1,b.y+b.height);});

    var ir=img.getBoundingClientRect(), nw=img.naturalWidth||148, nh=img.naturalHeight||174;
    var k=Math.min(ir.width/nw, ir.height/nh);
    var ox=ir.left+(ir.width-nw*k)/2, oy=ir.top+(ir.height-nh*k)/2;
    var cx=ox+(14+134)/2*k*(nw/148), cy=oy+(14+160)/2*k*(nh/174), ch=(160-14)*k*(nh/174);
    var s=ch/((y1-y0)*u);
    var dx=cx-r.left-s*((x0+x1)/2)*u, dy=cy-r.top-s*((y0+y1)/2)*u;

    img.style.opacity='0';
    f.animate([{opacity:0},{opacity:1}],{duration:420,easing:'ease-out',fill:'forwards'});
    var move=f.animate(
      [{transform:'translate(0px,0px) scale(1)'},{transform:'translate('+dx+'px,'+dy+'px) scale('+s+')'}],
      {duration:1400,delay:380,easing:'cubic-bezier(.72,0,.16,1)',fill:'both'});
    texts.forEach(function(p){p.animate([{opacity:1},{opacity:0}],{duration:560,delay:520,easing:'ease-in',fill:'forwards'});});
    bg.animate([{opacity:1},{opacity:0}],{duration:1000,delay:700,easing:'ease',fill:'forwards'});

    move.onfinish=function(){
      img.style.transition='opacity .3s ease'; img.style.opacity='';
      var out=f.animate([{opacity:1},{opacity:0}],{duration:300,easing:'ease',fill:'forwards'});
      out.onfinish=function(){ img.style.transition=''; finish(); };
    };
  }
})();
