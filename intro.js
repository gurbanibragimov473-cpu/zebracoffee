/* Заставка Zebra Coffee: логотип -> выбор языка в стиле сайта -> круглая загрузка -> плавное открытие */
(function(){
  window.__ziOK=true;
  var box=document.getElementById('zebra-intro');
  if(!box) return;
  var html=document.documentElement;
  var T_OUT=9300, T_LANG=9700, CYCLE=2000, WAIT_MS=2900;
  var order=['en','ru','kk'];
  var copy={
    en:{t:'Welcome to Zebra Coffee',s:'Choose your language',b:'Continue',l:'Loading language\u2026'},
    ru:{t:'Добро пожаловать в Zebra Coffee',s:'Выберите язык',b:'Продолжить',l:'Загрузка языка\u2026'},
    kk:{t:'Zebra Coffee-ге қош келдіңіз',s:'Тілді таңдаңыз',b:'Жалғастыру',l:'Тіл жүктелуде\u2026'}
  };
  var stage=box.querySelector('svg.stage'), mark=box.querySelector('.zi-mark');
  var title=document.getElementById('zi-title'), sub=document.getElementById('zi-sub'), goTxt=document.getElementById('zi-gotxt');
  var opts=[].slice.call(box.querySelectorAll('.zi-op'));
  var sel=document.getElementById('zi-select'), field=document.getElementById('zi-field');
  var timers=[], cycle=null, shown='en', choice=null, idx=0, leaving=false, langOn=false;

  window.scrollTo(0,0);
  document.body.classList.add('zi-lock');

  /* мягкое свечение вокруг логотипа (один раз, без мигания) */
  var glow=stage.cloneNode(true);
  glow.removeAttribute('style'); glow.removeAttribute('aria-label'); glow.setAttribute('aria-hidden','true'); glow.setAttribute('class','zi-glow');
  glow.querySelectorAll('.zp').forEach(function(p){p.removeAttribute('class');p.removeAttribute('style');p.setAttribute('fill','#2fd3c2');});
  mark.insertBefore(glow,stage);

  /* круглый индикатор как в Android: сегменты, яркая "голова" и светлый разрыв */
  function spinner(size){
    var NS='http://www.w3.org/2000/svg', n=60, r=44, s=document.createElementNS(NS,'svg');
    s.setAttribute('viewBox','0 0 100 100'); s.setAttribute('width',size); s.setAttribute('height',size); s.setAttribute('aria-hidden','true');
    for(var i=0;i<n;i++){
      var a0=(i*6+.8-90)*Math.PI/180, a1=((i+1)*6-.8-90)*Math.PI/180;
      var p=document.createElementNS(NS,'path');
      p.setAttribute('d','M'+(50+r*Math.cos(a0)).toFixed(2)+' '+(50+r*Math.sin(a0)).toFixed(2)+'A'+r+' '+r+' 0 0 1 '+(50+r*Math.cos(a1)).toFixed(2)+' '+(50+r*Math.sin(a1)).toFixed(2));
      p.setAttribute('fill','none'); p.setAttribute('stroke-width','8'); p.setAttribute('stroke','#ffffff');
      p.setAttribute('stroke-opacity', i<5 ? '.14' : (.2+.8*((i-5)/(n-6))).toFixed(2));
      s.appendChild(p);
    }
    return s;
  }
  document.getElementById('zi-spin').appendChild(spinner(104));

  /* смена текста целиком и сразу, мягко */
  function swap(el,text){
    if(el.textContent===text) return;
    var out=el.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-6px)'}],{duration:200,easing:'cubic-bezier(.4,0,1,1)',fill:'forwards'});
    out.onfinish=function(){
      el.textContent=text; out.cancel();
      el.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:340,easing:'cubic-bezier(.2,.7,.2,1)'});
    };
  }
  var INFO={en:['EN','English','Hello'],ru:['RU','Русский','Привет'],kk:['KZ','Қазақша','Сәлем']};
  function show(l){
    if(shown===l) return; shown=l;
    swap(title,copy[l].t); swap(sub,copy[l].s); swap(goTxt,copy[l].b);
    /* пункт выбора тоже меняет язык вместе с текстом */
    swap(document.getElementById('zi-fbadge'),INFO[l][0]);
    swap(document.getElementById('zi-fname'),INFO[l][1]);
    swap(document.getElementById('zi-fhello'),INFO[l][2]);
    opts.forEach(function(o){o.setAttribute('aria-selected',o.getAttribute('data-lang')===l?'true':'false')});
  }
  function stopCycle(){ if(cycle){clearInterval(cycle);cycle=null;} }
  function startCycle(){ stopCycle(); cycle=setInterval(function(){ idx=(idx+1)%order.length; show(order[idx]); },CYCLE); }

  function setOpen(v){ if(v){ stopCycle(); if(!choice) choice=shown; } sel.classList.toggle('open',v); field.setAttribute('aria-expanded',v?'true':'false'); }
  function pick(l){
    choice=l; stopCycle(); idx=order.indexOf(l);
    show(l);
  }

  function showLang(){
    if(langOn) return; langOn=true;
    box.classList.add('phase-out','lang-show');
    startCycle();
  }
  timers.push(setTimeout(function(){box.classList.add('phase-out')},T_OUT));
  timers.push(setTimeout(showLang,T_LANG));

  field.addEventListener('click',function(e){ e.stopPropagation(); setOpen(!sel.classList.contains('open')); });
  opts.forEach(function(o){o.addEventListener('click',function(e){ e.stopPropagation(); pick(o.getAttribute('data-lang')); setOpen(false); });});
  box.addEventListener('click',function(){ setOpen(false); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') setOpen(false); });
  document.getElementById('zi-go').addEventListener('click',go);

  /* после выбора: круглая загрузка языка ~3 секунды */
  function go(){
    if(leaving) return; leaving=true; stopCycle();
    var lang=choice||shown||'en';
    if(window.ZebraI18n) window.ZebraI18n.setLanguage(lang);
    try{sessionStorage.setItem('zebra-intro-seen','1')}catch(e){}
    document.getElementById('zi-waitt').textContent=copy[lang].l;
    box.classList.add('leaving');
    setTimeout(function(){box.classList.add('loading')},450);
    setTimeout(open,450+WAIT_MS);
  }

  /* открытие: заставка мягко растворяется, значок увеличивается, шапка плавно опускается */
  function open(){
    html.classList.remove('zi-intro');
    var tc=document.getElementById('zi-tc'); if(tc) tc.setAttribute('content','#007a7a');
    html.classList.add('zi-opened'); setTimeout(function(){html.classList.remove('zi-opened')},1900);
    window.dispatchEvent(new Event('zebra:opening'));
    box.classList.add('opening');
    setTimeout(function(){ box.remove(); document.body.classList.remove('zi-lock'); },1350);
  }
})();
