/* Полоса прокрутки сверху: показывает, как далеко пролистана страница */
(function(){
  var st=document.createElement('style');
  st.textContent='#scroll-progress{position:fixed;top:0;left:0;width:100%;height:3px;z-index:10001;pointer-events:none;transform-origin:0 50%;transform:scaleX(0);opacity:0;background:linear-gradient(90deg,#8ffbef,#2fd3c2 60%,#fff);box-shadow:0 0 12px rgba(95,245,228,.75);border-radius:0 3px 3px 0;transition:opacity .3s ease;will-change:transform}';
  document.head.appendChild(st);
  var bar=document.createElement('div');
  bar.id='scroll-progress'; bar.setAttribute('aria-hidden','true'); bar.setAttribute('data-no-translate','');
  document.body.appendChild(bar);
  var ticking=false;
  function update(){
    ticking=false;
    var d=document.documentElement, max=d.scrollHeight-window.innerHeight;
    var y=window.pageYOffset||d.scrollTop||0;
    var p=max>0?Math.min(1,Math.max(0,y/max)):0;
    bar.style.transform='scaleX('+p+')';
    bar.style.opacity=p>0.002?'1':'0';
  }
  function req(){ if(!ticking){ ticking=true; requestAnimationFrame(update); } }
  window.addEventListener('scroll',req,{passive:true});
  window.addEventListener('resize',req);
  window.addEventListener('load',req);
  update();
})();
