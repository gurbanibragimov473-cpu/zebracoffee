/* Меню: иллюстрации напитков, поиск, чипсы категорий, окно напитка */
(function(){
  function S(inner){ return '<svg viewBox="0 0 120 120" aria-hidden="true">'+inner+'</svg>'; }
  var STEAM='<g class="st" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"><path d="M46 30c-6-7 6-10 0-18"/><path d="M60 30c-6-7 6-10 0-18"/><path d="M74 30c-6-7 6-10 0-18"/></g>';
  var SHADOW='<ellipse cx="60" cy="108" rx="40" ry="6" fill="#002b2b" opacity=".28"/>';
  var ART={
    hot:S(STEAM+SHADOW+'<path d="M26 48h68v24c0 16-14 28-34 28S26 88 26 72z" fill="#fff"/><path d="M94 54h7c8 0 10 14 2 18-3 1-6 2-9 2" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><ellipse cx="60" cy="48" rx="34" ry="7" fill="#fff"/><ellipse cx="60" cy="48" rx="29" ry="5" fill="#8a5330"/><path d="M48 48c4-3 8-3 12 0s8 3 12 0" fill="none" stroke="#f3d9b8" stroke-width="2.5" stroke-linecap="round"/><path d="M34 62c2 14 12 22 26 22" fill="none" stroke="#a3e4d7" stroke-width="3" stroke-linecap="round" opacity=".8"/>'),
    tea:S(STEAM+SHADOW+'<path d="M26 48h68v24c0 16-14 28-34 28S26 88 26 72z" fill="#fff"/><path d="M94 54h7c8 0 10 14 2 18-3 1-6 2-9 2" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><ellipse cx="60" cy="48" rx="34" ry="7" fill="#fff"/><ellipse cx="60" cy="48" rx="29" ry="5" fill="#d98a3d"/><path d="M62 46l14 -4" stroke="#fff" stroke-width="2" fill="none"/><rect x="74" y="34" width="12" height="14" rx="2" fill="#a3e4d7" transform="rotate(10 80 41)"/>'),
    iced:S(SHADOW+'<path d="M34 24h52l-6 74c-.5 6-4 10-10 10H50c-6 0-9.5-4-10-10z" fill="#fff" fill-opacity=".28" stroke="#fff" stroke-width="3"/><path d="M38 50h44l-3.5 48c-.4 5-3.5 8-8 8H49.5c-4.5 0-7.6-3-8-8z" fill="#8a5330"/><path d="M38 50h44l-1.5 18c-14 6-27 6-41 0z" fill="#f3e3cc"/><rect x="46" y="38" width="15" height="15" rx="3" fill="#fff" fill-opacity=".75" transform="rotate(-12 53 45)"/><rect x="62" y="44" width="14" height="14" rx="3" fill="#fff" fill-opacity=".65" transform="rotate(14 69 51)"/><path d="M70 4l-9 56" stroke="#ff8fa3" stroke-width="6" stroke-linecap="round"/>'),
    lemonade:S(SHADOW+'<path d="M34 28h52l-6 70c-.5 6-4 10-10 10H50c-6 0-9.5-4-10-10z" fill="#fff" fill-opacity=".28" stroke="#fff" stroke-width="3"/><path d="M38 52h44l-3 46c-.4 5-3.5 8-8 8H49c-4.5 0-7.6-3-8-8z" fill="#ffe27a"/><path d="M38 52h44l-.8 10H38.8z" fill="#fff6c9"/><rect x="47" y="62" width="14" height="14" rx="3" fill="#fff" fill-opacity=".7" transform="rotate(-10 54 69)"/><rect x="63" y="74" width="14" height="14" rx="3" fill="#fff" fill-opacity=".7" transform="rotate(12 70 81)"/><path d="M76 30c6-10 18-10 20-6-4 8-12 12-20 6z" fill="#7bd88f"/><circle cx="88" cy="42" r="13" fill="#ffd54a"/><circle cx="88" cy="42" r="9.5" fill="#fff6c9"/><path d="M88 33v18M79 42h18M81.6 35.6l12.8 12.8M94.4 35.6L81.6 48.4" stroke="#ffd54a" stroke-width="1.6"/><path d="M62 6l-9 58" stroke="#ff8fa3" stroke-width="6" stroke-linecap="round"/>'),
    smoothie:S(SHADOW+'<path d="M36 46h48l-5 54c-.5 5-4 8-9 8H50c-5 0-8.5-3-9-8z" fill="#ff8fa3"/><path d="M36 46h48l-1.5 16c-14 5-31 5-45 0z" fill="#ffc2cd"/><path d="M32 42c0-12 12-20 28-20s28 8 28 20z" fill="#fff" fill-opacity=".92"/><rect x="30" y="40" width="60" height="8" rx="4" fill="#fff"/><path d="M68 2l4 32" stroke="#ffd166" stroke-width="6" stroke-linecap="round"/><circle cx="48" cy="80" r="6" fill="#d4506f"/><circle cx="68" cy="88" r="5" fill="#d4506f" opacity=".8"/>'),
    shake:S(SHADOW+'<path d="M36 52h48l-6 48c-.6 5-4 8-9 8H51c-5 0-8.4-3-9-8z" fill="#ffc2cd"/><path d="M36 52h48l-1.2 12c-14 5-32 5-46 0z" fill="#ffe3ea"/><path d="M33 52c-7-2-6-11 2-13 0-9 10-13 18-9 8-7 21-2 21 9 8 2 8 11 1 13z" fill="#fff"/><circle cx="62" cy="22" r="7" fill="#e5384f"/><path d="M62 16c2-6 6-8 10-8" stroke="#3f8a3a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M84 12l-14 28" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".9"/>'),
    matcha:S(STEAM+SHADOW+'<path d="M20 56h80c0 24-16 44-40 44S20 80 20 56z" fill="#fff"/><ellipse cx="60" cy="56" rx="40" ry="9" fill="#fff"/><ellipse cx="60" cy="56" rx="35" ry="7" fill="#7bbf5f"/><ellipse cx="56" cy="55" rx="16" ry="3" fill="#b7e3a0"/><path d="M42 92c8 6 28 6 36 0" fill="none" stroke="#a3e4d7" stroke-width="3" stroke-linecap="round" opacity=".8"/>'),
    bottle:S(SHADOW+'<rect x="48" y="6" width="24" height="12" rx="4" fill="#fff"/><path d="M50 18h20l8 22v58c0 6-4 10-10 10H52c-6 0-10-4-10-10V40z" fill="#fff" fill-opacity=".3" stroke="#fff" stroke-width="3"/><path d="M45 58h30v40c0 5-3 8-8 8H53c-5 0-8-3-8-8z" fill="#a3e4d7"/><rect x="44" y="64" width="32" height="24" fill="#fff"/><path d="M50 64l6 24M60 64l6 24M68 64l5 24" stroke="#007a7a" stroke-width="4"/>'),
    croissant:S(SHADOW+'<path d="M12 80c2-26 22-44 48-44s46 18 48 44c-8-6-14-4-20 3-6-9-14-9-20 0-6-9-14-9-20 0-6-7-12-9-20-3z" fill="#f2b665"/><path d="M36 44l8 36M52 38l4 42M68 38l-4 42M84 44l-8 36" stroke="#c98233" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M26 58c8-10 18-14 28-14" stroke="#ffd9a0" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>'),
    bowl:S(SHADOW+'<circle cx="46" cy="52" r="14" fill="#7bbf5f"/><circle cx="68" cy="48" r="13" fill="#5cb04a"/><circle cx="84" cy="56" r="10" fill="#ff6b6b"/><circle cx="58" cy="40" r="9" fill="#ffd54a"/><path d="M16 60h88c0 26-18 44-44 44S16 86 16 60z" fill="#fff"/><path d="M30 80c8 8 22 12 30 12" fill="none" stroke="#a3e4d7" stroke-width="3" stroke-linecap="round" opacity=".8"/>'),
    donut:S(SHADOW+'<circle cx="60" cy="62" r="40" fill="#e9a65c"/><circle cx="60" cy="58" r="36" fill="#ff8fa3"/><circle cx="60" cy="58" r="12" fill="#0a8f8f"/><g stroke-width="4" stroke-linecap="round"><path d="M38 40l6 -3" stroke="#fff"/><path d="M78 38l5 4" stroke="#ffd54a"/><path d="M34 62l6 2" stroke="#7bd88f"/><path d="M84 66l-5 4" stroke="#fff"/><path d="M52 82l4 -5" stroke="#ffd54a"/><path d="M72 80l-2 -6" stroke="#7bd88f"/></g>'),
    bag:S(SHADOW+'<path d="M26 44h68l6 60H20z" fill="#fff"/><path d="M44 44V32c0-10 8-14 16-14s16 4 16 14v12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M40 64l12 28M60 60l10 34M80 66l6 28" stroke="#007a7a" stroke-width="6" stroke-linecap="round"/>')
  };
  var ICON={
    all:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    flame:'<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',
    cup:'<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2"/><path d="M8 3c-1 1 1 2 0 3M12 3c-1 1 1 2 0 3"/>',
    star:'<path d="M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.7 6.7 19.6l1.1-6L3.4 9.4l6-.8z"/>',
    glass:'<path d="M7 4h10l-1 15a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z"/><path d="M7.5 9h9"/><path d="M14 2l-1 7"/>',
    leaf:'<path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14z"/><path d="M5 19c3-5 6-8 10-10"/>',
    bottle:'<path d="M10 3h4v3l2 3v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9l2-3z"/><path d="M8 13h8"/>',
    food:'<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10"/><path d="M16 21V3c-2 1-3 4-3 8h3"/>',
    cake:'<path d="M4 20h16M5 20v-7h14v7"/><path d="M5 13c2 2 4 2 7 0s5-2 7 0"/><path d="M12 8V5"/>',
    bag:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'
  };
  var CATI={all:'all',popular:'flame',coffee:'cup',hot_drinks:'cup',signature:'star',milkshakes:'glass',cold_coffee:'glass',seasonal:'leaf',lemonades:'glass',matcha:'leaf',bottled:'bottle',food:'food',desserts:'cake',merch:'bag'};
  function icon(n){ return '<svg viewBox="0 0 24 24" aria-hidden="true">'+(ICON[n]||ICON.cup)+'</svg>'; }

  function kind(it){
    var n=String(it&&it.name||'').toLowerCase(), c=it&&it.category;
    if(c==='merch'||/футбол|кружк|худи|шопер|термос|merch/.test(n)) return 'bag';
    if(/круассан|слойк|пирог|булочк|сэндвич|френч|достер|хот/.test(n)) return 'croissant';
    if(/боул|салат|каша|суп|боwl/.test(n)) return 'bowl';
    if(/пончик|донат|чизкейк|торт|десерт|маффин|печень|эклер|тирамису|медовик|брауни|урбеч/.test(n)||c==='desserts') return 'donut';
    if(/матча|matcha/.test(n)) return 'matcha';
    if(/смузи|smoothie/.test(n)) return 'smoothie';
    if(/коктейл|shake|фраппе|milk/.test(n)||c==='milkshakes') return 'shake';
    if(/лимонад|мохито|lemonade|mojito|тархун|бобба|bumble/.test(n)||c==='lemonades') return 'lemonade';
    if(/чай|tea/.test(n)) return 'tea';
    if(/cola|кола|sprite|fuse|water|вода|aura|burabay|сок|tropicana|напитки|шымбулак|aqua/.test(n)||c==='bottled') return 'bottle';
    if(/ice |iced|^ice|холодн|тоник|tonic/.test(n)||c==='cold_coffee') return 'iced';
    return 'hot';
  }

  var TXT={
    ph:{ru:'Найти в меню…',en:'Search the menu…',kk:'Мәзірден іздеу…'},
    cnt:{ru:'позиций в меню',en:'items on the menu',kk:'мәзірдегі позиция'},
    none:{ru:'Ничего не найдено',en:'Nothing found',kk:'Ештеңе табылмады'}
  };
  function L(){ var l=(document.documentElement.lang||'ru').slice(0,2); return TXT.ph[l]?l:'ru'; }
  function ready(f){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',f); else f(); }

  ready(function(){
    var wrap=document.querySelector('.category-select-wrapper'), dd=document.getElementById('categoryDropdown'), grid=document.getElementById('menuGrid');
    if(!wrap||!dd||!grid||typeof categoriesData==='undefined'||typeof menuItems==='undefined') return;

    /* шапка: рисунки по бокам, счётчик, бегущая лента */
    var hero=document.querySelector('.menu-hero');
    if(hero){
      var l=document.createElement('div'); l.className='mx-hero-art l'; l.innerHTML=ART.iced; hero.appendChild(l);
      var r=document.createElement('div'); r.className='mx-hero-art r'; r.innerHTML=ART.hot; hero.appendChild(r);
      var cnt=document.createElement('div'); cnt.className='mx-count'; cnt.setAttribute('data-no-translate','');
      cnt.innerHTML='<b>0</b> <span></span>'; hero.appendChild(cnt);
      var num=cnt.querySelector('b'), lab=cnt.querySelector('span'), total=menuItems.length;
      lab.textContent=TXT.cnt[L()];
      var t0=performance.now();
      (function step(t){ var p=Math.min(1,(t-t0)/1400), e=1-Math.pow(1-p,3); num.textContent=Math.round(total*e); if(p<1) requestAnimationFrame(step); })(t0);
      var rib=document.createElement('div'); rib.className='mx-ribbon'; rib.setAttribute('data-no-translate','');
      var one='<span>ZEBRA COFFEE</span><span>PAVLODAR</span><span>☕</span><span>ZEBRA COFFEE</span><span>PAVLODAR</span><span>☕</span>';
      rib.innerHTML='<div>'+one+one+one+one+'</div>';
      hero.parentNode.insertBefore(rib,hero.nextSibling);
    }

    /* поиск */
    var sw=document.createElement('div'); sw.className='mx-search'; sw.setAttribute('data-no-translate','');
    sw.innerHTML='<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/></svg><input type="search" autocomplete="off" aria-label="search"><button type="button" aria-label="clear">✕</button>';
    var inp=sw.querySelector('input'), clr=sw.querySelector('button');
    inp.placeholder=TXT.ph[L()];
    wrap.appendChild(sw);
    new MutationObserver(function(){ inp.placeholder=TXT.ph[L()]; if(lab) lab.textContent=TXT.cnt[L()]; }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

    /* чипсы категорий */
    var box=document.createElement('div'); box.className='mx-chips'; box.setAttribute('role','tablist');
    categoriesData.forEach(function(c){
      var b=document.createElement('button'); b.type='button'; b.className='mx-chip'; b.setAttribute('data-id',c.id);
      b.innerHTML=icon(CATI[c.id]||'cup')+'<span>'+c.name+'</span>';
      if(typeof currentCategory!=='undefined'&&currentCategory===c.id) b.classList.add('active');
      b.addEventListener('click',function(){
        if(inp.value){ inp.value=''; sw.classList.remove('has'); }
        [].forEach.call(box.children,function(x){x.classList.toggle('active',x===b)});
        dd.value=c.id;
        if(typeof onCategorySelectChange==='function') onCategorySelectChange(c.id);
        if(box.scrollWidth>box.clientWidth+4) box.scrollTo({left:b.offsetLeft-(box.clientWidth-b.offsetWidth)/2,behavior:'smooth'});
      });
      box.appendChild(b);
    });
    wrap.appendChild(box);

    function cardFor(item){
      var card=document.createElement('div'); card.className='menu-card'; card.onclick=function(){ openModal(item); };
      var base=item.promoPrice||item.price, fin=calculateDiscountedPrice(base), has=currentDiscount>0||item.promoPrice;
      var price=has?'<div><span class="old-price">'+item.price+' ₸</span><span class="final-price">'+fin+' ₸</span></div>':'<div><span class="final-price">'+fin+' ₸</span></div>';
      var sub='Подробнее о товаре';
      if(item.sizes) sub='Выберите размер • '+item.sizes.length+' варианта';
      else if(item.colors) sub='Выберите вариант • '+item.colors.length+' вида';
      else if(item.hasBeans||item.hasSugar||item.hasTemp||item.hasOrderType||item.hasPlantMilk) sub='Настройте напиток по своему вкусу';
      card.innerHTML='<div><div class="card-badge">Zebra Coffee</div><div class="card-title">'+item.name+'</div><div class="card-subtext">'+sub+'</div></div><div class="card-bottom">'+price+'</div>';
      return card;
    }
    function renderSearch(q){
      var pg=document.getElementById('paginationBox'); if(pg) pg.innerHTML='';
      grid.innerHTML='';
      var items=menuItems.filter(function(i){ return i.name.toLowerCase().indexOf(q)>-1; });
      if(!items.length){ grid.innerHTML='<div class="mx-empty">'+TXT.none[L()]+'</div>'; return; }
      items.slice(0,60).forEach(function(i){ grid.appendChild(cardFor(i)); });
    }
    inp.addEventListener('input',function(){
      var q=inp.value.trim().toLowerCase();
      sw.classList.toggle('has',!!inp.value);
      if(!q){ renderContent(); return; }
      renderSearch(q);
    });
    clr.addEventListener('click',function(){ inp.value=''; sw.classList.remove('has'); renderContent(); inp.focus(); });

    /* оформление карточек */
    var scheduled=false;
    function itemByName(name){
      var list=menuItems.filter(function(i){return i.name===name});
      if(!list.length) return null;
      var cur=list.filter(function(i){return typeof currentCategory!=='undefined'&&i.category===currentCategory});
      return cur[0]||list[0];
    }
    function decorate(){
      scheduled=false;
      [].slice.call(grid.querySelectorAll('.menu-card:not([data-mx])')).forEach(function(card,i){
        card.setAttribute('data-mx','1');
        var t=card.querySelector('.card-title'), it=t?itemByName(t.textContent):null, k=kind(it||{name:t?t.textContent:''});
        var art=document.createElement('div'); art.className='mx-art k-'+k;
        art.innerHTML=ART[k]+'<i class="bub b1"></i><i class="bub b2"></i><i class="bub b3"></i>';
        card.insertBefore(art,card.firstChild);
        var bottom=card.querySelector('.card-bottom');
        if(bottom){ var p=document.createElement('span'); p.className='card-plus'; p.textContent='+'; bottom.appendChild(p); }
        if(card.animate) card.animate([{opacity:0,transform:'translateY(34px) scale(.96)'},{opacity:1,transform:'none'}],{duration:760,delay:Math.min(i,11)*60,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});
      });
    }
    new MutationObserver(function(){ if(!scheduled){ scheduled=true; requestAnimationFrame(decorate); } }).observe(grid,{childList:true});
    decorate();

    /* окно напитка: иллюстрация в шапке и плавная смена цены */
    var modal=document.getElementById('productModal'), pr=document.getElementById('modalFinalPrice');
    if(modal){
      function hero2(){
        var h=modal.querySelector('.modal-header'); if(!h) return;
        var old=h.querySelector('.mx-mhero'); if(old) old.remove();
        var name=(document.getElementById('modalProductTitle')||{}).textContent||'';
        var it=(typeof selectedProduct!=='undefined'&&selectedProduct&&selectedProduct.name===name)?selectedProduct:itemByName(name);
        var k=kind(it||{name:name}), d=document.createElement('div'); d.className='mx-mhero'; d.innerHTML=ART[k];
        h.insertBefore(d,h.firstChild);
        var s=modal.querySelector('.modal-sheet'); if(s){ s.className=s.className.replace(/\bk-\w+\b/g,'').trim()+' k-'+k; }
      }
      new MutationObserver(function(){ if(modal.classList.contains('active')) setTimeout(hero2,0); }).observe(modal,{attributes:true,attributeFilter:['class']});
    }
    if(pr){
      var last=null, busy=false;
      new MutationObserver(function(){
        if(busy) return;
        var txt=pr.textContent, v=parseInt(txt.replace(/\D/g,''),10);
        if(isNaN(v)) return;
        if(last===null||!modal.classList.contains('active')){ last=v; return; }
        if(v===last) return;
        var from=last; last=v; busy=true;
        var t0=performance.now();
        (function step(t){
          var p=Math.min(1,(t-t0)/450), e=1-Math.pow(1-p,3);
          if(p<1){ pr.textContent=Math.round(from+(v-from)*e); requestAnimationFrame(step); }
          else { pr.textContent=txt; busy=false; }
        })(t0);
        pr.classList.remove('bump'); void pr.offsetWidth; pr.classList.add('bump');
      }).observe(pr,{childList:true,characterData:true,subtree:true});
    }
  });
})();
