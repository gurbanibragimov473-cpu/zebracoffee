/* Просмотр фото: по нажатию фото открывается, фон затемняется */
(function(){
  var imgs=[].slice.call(document.querySelectorAll('.card-img-box img'));
  if(!imgs.length) return;
  var css='#zc-lb{position:fixed;top:0;left:0;width:100%;height:100%;z-index:100001;display:none;align-items:center;justify-content:center;padding:20px;font-family:Inter,system-ui,sans-serif;touch-action:pan-y}'
   +'#zc-lb.show{display:flex}'
   +'#zc-lb .lb-bg{position:absolute;inset:0;background:rgba(0,22,22,.9);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;transition:opacity .5s ease}'
   +'#zc-lb.on .lb-bg{opacity:1}'
   +'#zc-lb .lb-fig{position:relative;z-index:1;margin:0;max-width:min(94vw,1100px);display:flex;flex-direction:column;align-items:center;gap:14px}'
   +'#zc-lb .lb-img{display:block;max-width:100%;max-height:76vh;max-height:76dvh;border-radius:20px;object-fit:contain;background:#003a3a;box-shadow:0 30px 90px rgba(0,0,0,.65);transform-origin:center}'
   +'#zc-lb .lb-cap{color:#d6fbf4;font-weight:700;font-size:clamp(.95rem,3.4vw,1.1rem);text-align:center;opacity:0;transform:translateY(8px);transition:opacity .5s ease .25s,transform .5s ease .25s}'
   +'#zc-lb.on .lb-cap{opacity:1;transform:none}'
   +'#zc-lb button{position:absolute;z-index:2;width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.12);color:#fff;display:grid;place-items:center;cursor:pointer;opacity:0;transition:opacity .5s ease,background .25s,color .25s,transform .3s cubic-bezier(.2,.7,.2,1)}'
   +'#zc-lb.on button{opacity:1}'
   +'#zc-lb button:hover{background:#fff;color:#007a7a;transform:scale(1.08)}'
   +'#zc-lb button svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}'
   +'#zc-lb .lb-x{top:max(16px,env(safe-area-inset-top,0px));right:16px}'
   +'#zc-lb .lb-prev,#zc-lb .lb-next{top:50%;margin-top:-24px}'
   +'#zc-lb .lb-prev{left:14px}#zc-lb .lb-next{right:14px}'
   +'#zc-lb .lb-count{position:absolute;z-index:2;left:50%;bottom:max(16px,env(safe-area-inset-bottom,0px));transform:translateX(-50%);color:#fff;font-weight:800;letter-spacing:.12em;font-size:.85rem;opacity:0;transition:opacity .5s ease}'
   +'#zc-lb.on .lb-count{opacity:.85}'
   +'@media (max-width:600px){#zc-lb .lb-prev,#zc-lb .lb-next{width:42px;height:42px;margin-top:-21px}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var lb=null, img, cap, count, idx=0, open=false, busy=false;
  var X='<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>', L='<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>', R='<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';

  function build(){
    lb=document.createElement('div'); lb.id='zc-lb'; lb.setAttribute('data-no-translate',''); lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true');
    lb.innerHTML='<div class="lb-bg"></div><figure class="lb-fig"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>'
      +'<button type="button" class="lb-x" aria-label="Close">'+X+'</button><button type="button" class="lb-prev" aria-label="Previous">'+L+'</button><button type="button" class="lb-next" aria-label="Next">'+R+'</button><div class="lb-count"></div>';
    document.body.appendChild(lb);
    img=lb.querySelector('.lb-img'); cap=lb.querySelector('.lb-cap'); count=lb.querySelector('.lb-count');
    lb.querySelector('.lb-bg').addEventListener('click',close);
    lb.querySelector('.lb-fig').addEventListener('click',function(e){ if(e.target===this) close(); });
    lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
    lb.querySelector('.lb-x').addEventListener('click',close);
    lb.querySelector('.lb-prev').addEventListener('click',function(e){ e.stopPropagation(); go(-1); });
    lb.querySelector('.lb-next').addEventListener('click',function(e){ e.stopPropagation(); go(1); });
    var sx=null;
    lb.addEventListener('touchstart',function(e){ sx=e.touches[0].clientX; },{passive:true});
    lb.addEventListener('touchend',function(e){ if(sx===null) return; var dx=e.changedTouches[0].clientX-sx; sx=null; if(Math.abs(dx)>60) go(dx<0?1:-1); },{passive:true});
    document.addEventListener('keydown',function(e){
      if(!open) return;
      if(e.key==='Escape') close(); else if(e.key==='ArrowLeft') go(-1); else if(e.key==='ArrowRight') go(1);
    });
  }
  function setContent(i){
    idx=(i+imgs.length)%imgs.length;
    var t=imgs[idx], card=t.closest('.creator-card'), h=card&&card.querySelector('h2');
    img.src=t.currentSrc||t.src; img.alt=t.alt||'';
    cap.textContent=h?h.textContent:(t.alt||'');
    count.textContent=(idx+1)+' / '+imgs.length;
  }
  function flipFrom(t){
    var from=t.getBoundingClientRect(), to=img.getBoundingClientRect();
    if(!to.width||!img.animate) return;
    var s=from.width/to.width, dx=from.left+from.width/2-(to.left+to.width/2), dy=from.top+from.height/2-(to.top+to.height/2);
    img.animate([{transform:'translate('+dx+'px,'+dy+'px) scale('+s+')',opacity:.2},{opacity:1,offset:.25},{transform:'none',opacity:1}],{duration:560,easing:'cubic-bezier(.2,.8,.2,1)'});
  }
  function show(i){
    if(!lb) build();
    open=true; setContent(i);
    document.documentElement.style.overflow='hidden';
    lb.classList.add('show');
    var run=function(){ void lb.offsetWidth; lb.classList.add('on'); flipFrom(imgs[idx]); };
    if(img.complete&&img.naturalWidth) requestAnimationFrame(run); else { img.onload=function(){ img.onload=null; run(); }; }
  }
  function go(d){
    if(busy) return; busy=true;
    var out=img.animate([{opacity:1,transform:'translateX(0)'},{opacity:0,transform:'translateX('+(-d*40)+'px)'}],{duration:180,easing:'ease-in',fill:'forwards'});
    out.onfinish=function(){
      setContent(idx+d); out.cancel();
      var enter=function(){ img.animate([{opacity:0,transform:'translateX('+(d*40)+'px)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.2,.8,.2,1)'}); busy=false; };
      if(img.complete&&img.naturalWidth) enter(); else img.onload=function(){ img.onload=null; enter(); };
    };
  }
  function close(){
    if(!open) return; open=false;
    var t=imgs[idx], r=t.getBoundingClientRect(), inView=r.bottom>0&&r.top<window.innerHeight;
    lb.classList.remove('on');
    if(inView&&img.animate){
      var to=img.getBoundingClientRect(), s=r.width/to.width, dx=r.left+r.width/2-(to.left+to.width/2), dy=r.top+r.height/2-(to.top+to.height/2);
      img.animate([{transform:'none',opacity:1},{opacity:.2,offset:.8},{transform:'translate('+dx+'px,'+dy+'px) scale('+s+')',opacity:0}],{duration:460,easing:'cubic-bezier(.5,0,.2,1)',fill:'forwards'});
    }
    setTimeout(function(){ lb.classList.remove('show'); document.documentElement.style.overflow=''; [].forEach.call(img.getAnimations?img.getAnimations():[],function(a){a.cancel()}); },500);
  }
  imgs.forEach(function(t,i){
    var box=t.closest('.card-img-box')||t;
    box.addEventListener('click',function(){ show(i); });
    box.setAttribute('role','button'); box.setAttribute('tabindex','0');
    box.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); show(i); } });
  });
})();
