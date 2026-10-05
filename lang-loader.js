/* Загрузка при смене языка на сайте: круглый индикатор как в Android (без цифр) */
(function(){
  var TEXT={
    en:'Switching language\u2026',
    ru:'\u041c\u0435\u043d\u044f\u0435\u043c \u044f\u0437\u044b\u043a\u2026',
    kk:'\u0422\u0456\u043b \u0430\u0443\u044b\u0441\u044b\u043f \u0436\u0430\u0442\u044b\u0440\u2026'
  };
  var css='#zl-over{position:fixed;top:0;left:0;width:100%;height:100vh;height:100dvh;z-index:100000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;'
   +'background:radial-gradient(circle at 50% 30%,#00b8b8 0%,#008c8c 55%,#005f5f 100%);opacity:0;transition:opacity .3s ease;font-family:"Montserrat","Inter",system-ui,sans-serif;color:#fff;-webkit-font-smoothing:antialiased}'
   +'#zl-over.on{opacity:1}'
   +'#zl-over svg{display:block;animation:zl-rot 1.1s linear infinite}'
   +'#zl-over p{margin:0;font-size:clamp(15px,3.8vw,18px);font-weight:600;letter-spacing:.04em;color:rgba(255,255,255,.88)}'
   +'@keyframes zl-rot{to{transform:rotate(360deg)}}';
  function spinner(size){
    var NS='http://www.w3.org/2000/svg', n=60, r=44, s=document.createElementNS(NS,'svg');
    s.setAttribute('viewBox','0 0 100 100'); s.setAttribute('width',size); s.setAttribute('height',size); s.setAttribute('aria-hidden','true');
    for(var i=0;i<n;i++){
      var a0=(i*6+.8-90)*Math.PI/180, a1=((i+1)*6-.8-90)*Math.PI/180;
      var p=document.createElementNS(NS,'path');
      p.setAttribute('d','M'+(50+r*Math.cos(a0)).toFixed(2)+' '+(50+r*Math.sin(a0)).toFixed(2)+'A'+r+' '+r+' 0 0 1 '+(50+r*Math.cos(a1)).toFixed(2)+' '+(50+r*Math.sin(a1)).toFixed(2));
      p.setAttribute('fill','none'); p.setAttribute('stroke-width','9');
      if(i<5){ p.setAttribute('stroke','#ffffff'); p.setAttribute('stroke-opacity','.12'); }
      else { var k=(i-5)/(n-6); p.setAttribute('stroke','#ffffff'); p.setAttribute('stroke-opacity',(.2+.8*k).toFixed(2)); }
      s.appendChild(p);
    }
    return s;
  }
  var busy=false;
  window.ZebraLangLoader={
    run:function(lang,apply){
      if(busy){ apply(); return; }
      busy=true;
      var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
      var o=document.createElement('div'); o.id='zl-over'; o.setAttribute('data-no-translate',''); o.setAttribute('role','status');
      o.appendChild(spinner(72));
      var p=document.createElement('p'); p.textContent=TEXT[lang]||TEXT.en; o.appendChild(p);
      document.body.appendChild(o);
      void o.offsetWidth; o.classList.add('on');
      setTimeout(apply,360);
      setTimeout(function(){ o.classList.remove('on'); },1500);
      setTimeout(function(){ o.remove(); st.remove(); busy=false; },1900);
    }
  };
})();
