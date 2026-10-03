/* Заставка Zebra Coffee: логотип -> выбор языка -> круглая загрузка -> раскрытие сайта */
(function(){
  var box=document.getElementById('zebra-intro');
  if(!box) return;
  var T_OUT=9300, T_LANG=9800, CYCLE=2000, WAIT_MS=2700;
  var order=['en','ru','kk'];
  var copy={
    en:{t:'Choose your language',s:'Select a language to continue',b:'Continue',l:'Loading language'},
    ru:{t:'Выберите язык',s:'Выберите язык, чтобы продолжить',b:'Продолжить',l:'Загрузка языка'},
    kk:{t:'Тілді таңдаңыз',s:'Жалғастыру үшін тілді таңдаңыз',b:'Жалғастыру',l:'Тілді жүктеу'}
  };
  var stage=box.querySelector('svg.stage'), mark=box.querySelector('.zi-mark');
  var title=document.getElementById('zi-title'), sub=document.getElementById('zi-sub'), goTxt=document.getElementById('zi-gotxt');
  var chips=[].slice.call(box.querySelectorAll('.zi-chip'));
  var timers=[], cycle=null, shown=null, choice=null, idx=0, leaving=false, langOn=false;

  window.scrollTo(0,0);
  document.body.classList.add('zi-lock');

  /* мягкое свечение (один раз, без мигания) */
  var glow=stage.cloneNode(true);
  glow.removeAttribute('style'); glow.removeAttribute('aria-label'); glow.setAttribute('aria-hidden','true'); glow.setAttribute('class','zi-glow');
  glow.querySelectorAll('.zp').forEach(function(p){p.removeAttribute('class');p.removeAttribute('style');p.setAttribute('fill','#2fd3c2');});
  mark.insertBefore(glow,stage);

  /* буквы: чётные уходят вниз (новые приходят сверху), нечётные уходят вверх (новые приходят снизу) */
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
    var oc=old.querySelectorAll('.zr-c'), nc=nw.querySelectorAll('.zr-c'), STEP=26;
    [].forEach.call(oc,function(c,i){
      var d=(i%2===0)?'125%':'-125%';
      c.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY('+d+')',opacity:0}],{duration:560,delay:i*STEP,easing:'cubic-bezier(.65,0,.35,1)',fill:'forwards'});
    });
    [].forEach.call(nc,function(c,i){
      var d=(i%2===0)?'-125%':'125%';
      c.animate([{transform:'translateY('+d+')',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:640,delay:170+i*STEP,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});
    });
    setTimeout(function(){old.remove()},170+Math.max(oc.length,nc.length)*STEP+760);
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

  /* всегда начинаем с английского и крутим сами */
  shown='en'; roll(title,copy.en.t); roll(sub,copy.en.s); roll(goTxt,copy.en.b);

  function showLang(){
    if(langOn) return; langOn=true;
    box.classList.add('phase-out','lang-show');
    startCycle();
  }
  timers.push(setTimeout(function(){box.classList.add('phase-out')},T_OUT));
  timers.push(setTimeout(showLang,T_LANG));
  document.getElementById('zi-skip').addEventListener('click',function(){timers.forEach(clearTimeout);showLang();});

  chips.forEach(function(c){c.addEventListener('click',function(){pick(c.getAttribute('data-lang'))})});
  document.getElementById('zi-go').addEventListener('click',go);

  /* после выбора: круглая загрузка языка ~3 секунды */
  function go(){
    if(leaving) return; leaving=true; stopCycle();
    var lang=choice||'en';
    if(window.ZebraI18n) window.ZebraI18n.setLanguage(lang);
    try{sessionStorage.setItem('zebra-intro-seen','1')}catch(e){}
    box.classList.add('leaving');

    var wt=document.getElementById('zi-waitt'), ring=document.getElementById('zi-ringp'), pct=document.getElementById('zi-pct');
    var l=layer(copy[lang].l); wt.appendChild(l);
    [].forEach.call(l.querySelectorAll('.zr-c'),function(c,i){
      c.animate([{transform:'translateY(70%)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:600,delay:500+i*34,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});
    });
    setTimeout(function(){box.classList.add('loading')},420);

    var C=314.16, start=null, begin=620;
    function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
    setTimeout(function(){
      function step(now){
        if(start===null) start=now;
        var t=Math.min(1,(now-start)/WAIT_MS), p=ease(t);
        ring.style.strokeDashoffset=(C*(1-p)).toFixed(2);
        pct.textContent=Math.round(p*100)+'%';
        if(t<1) requestAnimationFrame(step); else setTimeout(open,380);
      }
      requestAnimationFrame(step);
    },begin);
  }

  /* раскрытие: светящаяся линия, затем половины экрана расходятся вверх и вниз */
  function open(){
    box.classList.add('opening');
    var seam=box.querySelector('.zi-seam'), top=box.querySelector('.zi-top'), bot=box.querySelector('.zi-bot');
    seam.animate([{opacity:0,transform:'scaleX(0)'},{opacity:1,transform:'scaleX(1)'}],{duration:650,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
    var ease='cubic-bezier(.76,0,.18,1)', delay=620, dur=1200;
    top.animate([{transform:'translateY(0)'},{transform:'translateY(-101%)'}],{duration:dur,delay:delay,easing:ease,fill:'forwards'});
    var last=bot.animate([{transform:'translateY(0)'},{transform:'translateY(101%)'}],{duration:dur,delay:delay,easing:ease,fill:'forwards'});
    seam.animate([{opacity:1},{opacity:0}],{duration:420,delay:delay+60,easing:'ease-out',fill:'forwards'});
    last.onfinish=function(){ box.remove(); document.body.classList.remove('zi-lock'); };
  }
})();
