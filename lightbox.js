/* Просмотр фото: по нажатию фото открывается целиком, фон затемняется (без стрелок и без скачивания) */
(function(){
  var imgs=[].slice.call(document.querySelectorAll('main img, .container img, section img, .creator-magazine-grid img')).filter(function(i,k,a){
    return a.indexOf(i)===k && !i.closest('header,footer,.logo-container') && !i.classList.contains('logo-img');
  });
  if(!imgs.length) return;
  var css='[data-zoom]{cursor:zoom-in}'
   +'#zc-lb{position:fixed;top:0;left:0;width:100%;height:100%;z-index:100001;display:none;align-items:center;justify-content:center;padding:20px;font-family:Inter,system-ui,sans-serif}'
   +'#zc-lb.show{display:flex}'
   +'#zc-lb .lb-bg{position:absolute;inset:0;background:rgba(0,20,20,.92);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;transition:opacity .5s ease}'
   +'#zc-lb.on .lb-bg{opacity:1}'
   +'#zc-lb .lb-fig{position:relative;z-index:1;margin:0;max-width:min(94vw,1100px);display:flex;flex-direction:column;align-items:center;gap:14px}'
   +'#zc-lb .lb-img{display:block;max-width:100%;max-height:82vh;max-height:82dvh;border-radius:20px;object-fit:contain;background:#003a3a;box-shadow:0 30px 90px rgba(0,0,0,.65);-webkit-user-drag:none;user-select:none}'
   +'#zc-lb .lb-cap{color:#d6fbf4;font-weight:700;font-size:clamp(.95rem,3.4vw,1.1rem);text-align:center;opacity:0;transform:translateY(8px);transition:opacity .5s ease .25s,transform .5s ease .25s}'
   +'#zc-lb.on .lb-cap{opacity:1;transform:none}'
   +'#zc-lb .lb-x{position:absolute;z-index:2;top:max(16px,env(safe-area-inset-top,0px));right:16px;width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.12);color:#fff;display:grid;place-items:center;cursor:pointer;opacity:0;transition:opacity .5s ease,background .25s,color .25s,transform .35s cubic-bezier(.2,.7,.2,1)}'
   +'#zc-lb.on .lb-x{opacity:1}'
   +'#zc-lb .lb-x:hover{background:#fff;color:#007a7a;transform:rotate(90deg) scale(1.08)}'
   +'#zc-lb .lb-x svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var lb=null,img,cap,cur=null,open=false;
  function build(){
    lb=document.createElement('div'); lb.id='zc-lb'; lb.setAttribute('data-no-translate',''); lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true');
    lb.innerHTML='<div class="lb-bg"></div><figure class="lb-fig"><img class="lb-img" alt="" draggable="false"><figcaption class="lb-cap"></figcaption></figure><button type="button" class="lb-x" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
    document.body.appendChild(lb);
    img=lb.querySelector('.lb-img'); cap=lb.querySelector('.lb-cap');
    lb.addEventListener('click',function(e){ if(e.target.closest('.lb-img')) return; close(); });
    lb.addEventListener('contextmenu',function(e){ e.preventDefault(); });
    document.addEventListener('keydown',function(e){ if(open&&e.key==='Escape') close(); });
  }
  function show(t){
    if(!lb) build();
    cur=t; open=true;
    var card=t.closest('.creator-card'), h=card&&card.querySelector('h2');
    img.src=t.currentSrc||t.src; img.alt=t.alt||'';
    cap.textContent=h?h.textContent:(t.alt||'');
    document.documentElement.style.overflow='hidden';
    lb.classList.add('show');
    var run=function(){
      void lb.offsetWidth; lb.classList.add('on');
      var from=t.getBoundingClientRect(), to=img.getBoundingClientRect();
      if(to.width&&img.animate){
        var s=from.width/to.width, dx=from.left+from.width/2-(to.left+to.width/2), dy=from.top+from.height/2-(to.top+to.height/2);
        img.animate([{transform:'translate('+dx+'px,'+dy+'px) scale('+s+')',opacity:.2},{opacity:1,offset:.25},{transform:'none',opacity:1}],{duration:560,easing:'cubic-bezier(.2,.8,.2,1)'});
      }
    };
    if(img.complete&&img.naturalWidth) requestAnimationFrame(run); else img.onload=function(){ img.onload=null; run(); };
  }
  function close(){
    if(!open) return; open=false;
    var r=cur.getBoundingClientRect(), inView=r.bottom>0&&r.top<window.innerHeight;
    lb.classList.remove('on');
    if(inView&&img.animate){
      var to=img.getBoundingClientRect(), s=r.width/to.width, dx=r.left+r.width/2-(to.left+to.width/2), dy=r.top+r.height/2-(to.top+to.height/2);
      img.animate([{transform:'none',opacity:1},{opacity:.2,offset:.8},{transform:'translate('+dx+'px,'+dy+'px) scale('+s+')',opacity:0}],{duration:460,easing:'cubic-bezier(.5,0,.2,1)',fill:'forwards'});
    }
    setTimeout(function(){ lb.classList.remove('show'); document.documentElement.style.overflow=''; (img.getAnimations?img.getAnimations():[]).forEach(function(a){a.cancel()}); },500);
  }
  imgs.forEach(function(t){
    t.setAttribute('data-zoom','1'); t.setAttribute('tabindex','0'); t.setAttribute('role','button'); t.setAttribute('draggable','false');
    t.addEventListener('click',function(e){ e.preventDefault(); show(t); });
    t.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); show(t); } });
  });
  /* на странице автора фото лежит внутри блока: нажатие на весь блок */
  [].forEach.call(document.querySelectorAll('.card-img-box'),function(b){
    var t=b.querySelector('img'); if(t) b.addEventListener('click',function(e){ if(e.target!==t) show(t); });
  });
})();
