/* Общий интерфейс: переключатель языка в углу и новый подвал с версией сайта */
(function(){
  var css=''
  /* переключатель языка */
  +'.language-switcher{position:relative!important;display:flex!important;align-items:center}'
  +'.language-switcher label{display:none!important}'
  +'.language-switcher select{position:absolute!important;opacity:0!important;pointer-events:none!important;width:1px!important;height:1px!important}'
  +'.ls-btn{display:inline-flex;align-items:center;gap:10px;height:46px;padding:0 14px 0 8px;border-radius:999px;border:1px solid rgba(255,255,255,.45);background:linear-gradient(135deg,rgba(255,255,255,.22),rgba(255,255,255,.08));color:#fff;font-family:Inter,system-ui,sans-serif;font-weight:800;font-size:.92rem;cursor:pointer;box-shadow:0 8px 22px rgba(0,50,50,.25);transition:background .3s,transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .3s,border-color .3s}'
  +'.ls-btn:hover{background:rgba(255,255,255,.28);transform:translateY(-2px);box-shadow:0 12px 28px rgba(0,50,50,.32)}'
  +'.ls-code{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#fff;color:#007a7a;font-weight:900;font-size:.74rem;letter-spacing:.02em}'
  +'.ls-chev{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;transition:transform .4s cubic-bezier(.2,.7,.2,1)}'
  +'.language-switcher.open .ls-chev{transform:rotate(180deg)}'
  +'.ls-menu{position:absolute;right:0;top:calc(100% + 12px);min-width:224px;padding:8px;border-radius:22px;background:#fff;box-shadow:0 26px 60px rgba(0,50,50,.45);opacity:0;visibility:hidden;transform:translateY(-10px) scale(.96);transform-origin:100% 0;transition:opacity .25s ease,transform .4s cubic-bezier(.2,.7,.2,1),visibility 0s .4s;z-index:10020}'
  +'.language-switcher.open .ls-menu{opacity:1;visibility:visible;transform:none;transition-delay:0s}'
  +'.ls-op{display:flex;align-items:center;gap:12px;width:100%;padding:9px 12px 9px 9px;border:0;border-radius:16px;background:transparent;color:#007a7a;font-family:Inter,system-ui,sans-serif;text-align:left;cursor:pointer;transition:background .2s}'
  +'.ls-op:hover{background:#e0f7f7}'
  +'.ls-op[aria-selected="true"]{background:#e8fbf8}'
  +'.ls-op .ls-code{background:#007a7a;color:#fff;width:34px;height:34px}'
  +'.ls-op b{flex:1;font-size:.98rem;font-weight:800}'
  +'.ls-op svg{width:18px;height:18px;fill:none;stroke:#007a7a;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round;opacity:0;transform:scale(.4);transition:opacity .25s,transform .4s cubic-bezier(.2,.9,.3,1.4)}'
  +'.ls-op[aria-selected="true"] svg{opacity:1;transform:none}'
  /* подвал */
  +'footer.ft-min{margin-top:60px!important;padding:26px 20px calc(26px + env(safe-area-inset-bottom,0px))!important;text-align:center!important;background:linear-gradient(180deg,rgba(0,60,60,0),rgba(0,50,50,.5))!important;border:none!important;border-radius:0!important}'
  +'footer.ft-min p{margin:0!important;color:#d6fbf4;font-weight:600;font-size:.95rem;letter-spacing:.02em}'
  +'@media(max-width:640px){.ls-btn .ls-name{display:none}.ls-btn{padding:0 10px 0 6px}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var L={en:['EN','English'],ru:['RU','Русский'],kk:['KZ','Қазақша']};
  function lang(){ var l=(document.documentElement.lang||'ru').slice(0,2); return L[l]?l:'ru'; }
  var CHECK='<svg viewBox="0 0 24 24"><path d="M5 12.8l4.6 4.6L19 7.6"/></svg>';
  var CHEV='<svg class="ls-chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>';

  function buildSwitcher(){
    var wrap=document.querySelector('.language-switcher');
    if(!wrap||wrap.getAttribute('data-ls')) return !!wrap&&!!wrap.getAttribute('data-ls');
    var sel=wrap.querySelector('select'); if(!sel) return false;
    wrap.setAttribute('data-ls','1'); wrap.setAttribute('data-no-translate','');
    var btn=document.createElement('button'); btn.type='button'; btn.className='ls-btn'; btn.setAttribute('aria-haspopup','listbox'); btn.setAttribute('aria-expanded','false');
    btn.innerHTML='<span class="ls-code"></span><span class="ls-name"></span>'+CHEV;
    var menu=document.createElement('div'); menu.className='ls-menu'; menu.setAttribute('role','listbox');
    ['en','ru','kk'].forEach(function(k){
      var o=document.createElement('button'); o.type='button'; o.className='ls-op'; o.setAttribute('role','option'); o.setAttribute('data-l',k);
      o.innerHTML='<span class="ls-code">'+L[k][0]+'</span><b>'+L[k][1]+'</b>'+CHECK;
      o.addEventListener('click',function(e){
        e.stopPropagation(); close();
        if(k===lang()) return;
        sel.value=k; sel.dispatchEvent(new Event('change',{bubbles:true}));
      });
      menu.appendChild(o);
    });
    wrap.appendChild(btn); wrap.appendChild(menu);
    function sync(){
      var l=lang(); btn.querySelector('.ls-code').textContent=L[l][0]; btn.querySelector('.ls-name').textContent=L[l][1];
      [].forEach.call(menu.children,function(o){ o.setAttribute('aria-selected',o.getAttribute('data-l')===l?'true':'false'); });
    }
    function open(v){ wrap.classList.toggle('open',v); btn.setAttribute('aria-expanded',v?'true':'false'); }
    function close(){ open(false); }
    btn.addEventListener('click',function(e){ e.stopPropagation(); open(!wrap.classList.contains('open')); });
    document.addEventListener('click',close);
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') close(); });
    new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    sync();
    return true;
  }

  function init(){
    var tries=0;
    (function wait(){ if(buildSwitcher()||++tries>60) return; setTimeout(wait,50); })();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
