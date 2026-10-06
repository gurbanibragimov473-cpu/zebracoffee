/* Меню: иллюстрации напитков, поиск, чипсы категорий, окно напитка */
(function(){
  function S(inner){ return '<svg viewBox="0 0 120 120" aria-hidden="true">'+inner+'</svg>'; }
  var STEAM='<g class="st" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"><path d="M46 30c-6-7 6-10 0-18"/><path d="M60 30c-6-7 6-10 0-18"/><path d="M74 30c-6-7 6-10 0-18"/></g>';
  var SHADOW='<ellipse cx="60" cy="108" rx="40" ry="6" fill="#002b2b" opacity=".28"/>';
  /* ---------- уникальные иллюстрации: форма + цвет напитка + украшения по названию ---------- */
  function H(s){ var h=2166136261; for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }
  var PAL=[
    [/американо|americano|эспрессо|espresso|доппио|doppio/,{l:'#2b1710',f:'#8a5330',c1:'#6f7f8f',c2:'#1f2b36',g:'bean'}],
    [/глинтвейн|mulled/,{l:'#8e1f3a',f:'',c1:'#c23a58',c2:'#4f0f22',g:'orange'}],
    [/какао|шоколад|choc|мокко|mocha/,{l:'#5a3320',f:'#ffffff',c1:'#a77352',c2:'#42251a',g:'marsh'}],
    [/капучино|cappuccino/,{l:'#b5773f',f:'#f6e8d2',c1:'#e0ad72',c2:'#8f5a2d',g:'bean'}],
    [/флэт|flat|уайт|white/,{l:'#a86a3a',f:'#f1dfc3',c1:'#d9b48c',c2:'#7a4c2c',g:'leaf'}],
    [/латте|latte|макиато|macchiato|кортадо|cortado/,{l:'#c9985f',f:'#f8ecd8',c1:'#ecc99a',c2:'#a06f3e',g:'bean'}],
    [/раф|raf|ваниль|vanilla|кокос|coconut|молочн|milk|сливоч/,{l:'#e7cfa6',f:'#fff7e6',c1:'#f3dfbd',c2:'#c9a06c',g:'star'}],
    [/клубник|strawberry|малин|raspberry|ягод|berry|гранат|вишн|cherry|роз/,{l:'#e5527a',f:'#ffd1dc',c1:'#ff94b2',c2:'#c23a63',g:'berry'}],
    [/манго|mango|апельсин|orange|персик|peach|маракуй|passion|ананас|pineapple|тропик|абрикос/,{l:'#ffa63d',f:'#ffe0a8',c1:'#ffc864',c2:'#e0701a',g:'orange'}],
    [/лайм|lime|мохито|mojito|тархун|огур|киви|kiwi|мят|базилик|basil|яблок|apple|зелен/,{l:'#7bd88f',f:'#e6ffe9',c1:'#8fe3a4',c2:'#2f9a5a',g:'mint'}],
    [/черник|blueberry|лаванд|lavender|ежевик|фиолет|таро|taro|голубик/,{l:'#8b6bd6',f:'#e5dcff',c1:'#ab93ea',c2:'#5c3fb0',g:'berry'}],
    [/матча|matcha/,{l:'#7bbf5f',f:'#c4ecaf',c1:'#9bd46f',c2:'#3f8a3a',g:'leaf'}],
    [/лимон|lemon|цитрус|citrus|имбир|ginger|мед/,{l:'#ffe27a',f:'#fff6c9',c1:'#ffd75e',c2:'#e89b1f',g:'lemon'}],
    [/cola|кола|pepsi/,{l:'#3a1d12',f:'#c9a58f',c1:'#d9483a',c2:'#6d1a12',g:'star'}],
    [/sprite|спрайт|fanta|фанта/,{l:'#d2f2a6',f:'#f4ffe0',c1:'#9ee06f',c2:'#3a9a3f',g:'lemon'}],
    [/вода|water|aqua|aura|burabay|шымбулак|fuse|чай|tea/,{l:'#d98a3d',f:'#ffe7c2',c1:'#e8b05f',c2:'#a0601e',g:'lemon'}]
  ];
  var FALL=[{l:'#b5773f',f:'#f3e2c8',c1:'#e0ad72',c2:'#8f5a2d',g:'bean'},{l:'#4fc6e8',f:'#d6f4ff',c1:'#6fd0ea',c2:'#2a89b0',g:'star'},{l:'#ff8fa3',f:'#ffd9e1',c1:'#ff9db0',c2:'#d4506f',g:'berry'},{l:'#a58be8',f:'#e5dcff',c1:'#b9a3f2',c2:'#5c3fb0',g:'star'},{l:'#7bd88f',f:'#e6ffe9',c1:'#8fe3a4',c2:'#2f9a5a',g:'mint'},{l:'#ffc15e',f:'#fff0cf',c1:'#ffd27d',c2:'#e08a1f',g:'lemon'}];
  function pal(name){
    for(var i=0;i<PAL.length;i++) if(PAL[i][0].test(name)) return PAL[i][1];
    return FALL[H(name)%FALL.length];
  }
  function S(inner){ return '<svg viewBox="0 0 120 120" aria-hidden="true">'+inner+'</svg>'; }
  var STEAM='<g class="st" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"><path d="M46 30c-6-7 6-10 0-18"/><path d="M60 30c-6-7 6-10 0-18"/><path d="M74 30c-6-7 6-10 0-18"/></g>';
  var SH='<ellipse cx="60" cy="108" rx="40" ry="6" fill="#002b2b" opacity=".28"/>';
  var STRAW=['#ff8fa3','#ffd166','#7bd88f','#6fd0ea','#ffffff','#a58be8'];
  function garnish(g,x,y,r){
    if(g==='lemon') return '<circle cx="'+x+'" cy="'+y+'" r="13" fill="#ffd54a"/><circle cx="'+x+'" cy="'+y+'" r="9.5" fill="#fff6c9"/><path d="M'+x+' '+(y-9)+'v18M'+(x-9)+' '+y+'h18M'+(x-6.4)+' '+(y-6.4)+'l12.8 12.8M'+(x+6.4)+' '+(y-6.4)+'l-12.8 12.8" stroke="#ffd54a" stroke-width="1.6"/>';
    if(g==='orange') return '<circle cx="'+x+'" cy="'+y+'" r="13" fill="#ff9a2e"/><circle cx="'+x+'" cy="'+y+'" r="9.5" fill="#ffd08a"/><path d="M'+x+' '+(y-9)+'v18M'+(x-9)+' '+y+'h18" stroke="#ff9a2e" stroke-width="1.6"/>';
    if(g==='mint') return '<path d="M'+(x-8)+' '+(y+4)+'c2-12 16-14 20-8-2 10-12 14-20 8z" fill="#5cc77a"/><path d="M'+(x-14)+' '+(y+8)+'c0-10 10-14 14-10-2 8-8 12-14 10z" fill="#7bd88f"/>';
    if(g==='berry') return '<circle cx="'+x+'" cy="'+y+'" r="8" fill="#d4244f"/><circle cx="'+(x+11)+'" cy="'+(y+4)+'" r="6" fill="#e5527a"/><path d="M'+x+' '+(y-7)+'c0-5 4-7 7-7" stroke="#3f8a3a" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    if(g==='star') return '<path d="M'+x+' '+(y-12)+'l3.600 7.600 8.400 1-6.200 5.700 1.600 8.300-7.400-4.200-7.400 4.200 1.600-8.300-6.200-5.700 8.400-1z" fill="#ffd166"/>';
    if(g==='leaf') return '<path d="M'+(x-12)+' '+(y+8)+'c0-14 10-20 22-20 0 14-8 20-22 20z" fill="#5cc77a"/><path d="M'+(x-10)+' '+(y+7)+'c5-5 9-8 16-12" stroke="#2f9a5a" stroke-width="1.6" fill="none"/>';
    if(g==='marsh') return '<rect x="'+(x-10)+'" y="'+(y-6)+'" width="13" height="11" rx="4" fill="#fff"/><rect x="'+(x+4)+'" y="'+(y-2)+'" width="11" height="10" rx="4" fill="#ffe3ea"/>';
    return '<ellipse cx="'+x+'" cy="'+y+'" rx="8" ry="11" fill="#6b3b1d" transform="rotate(25 '+x+' '+y+')"/><path d="M'+(x-3)+' '+(y-9)+'c-5 8 6 10 1 18" stroke="#c9a06c" stroke-width="2" fill="none" transform="rotate(25 '+x+' '+y+')"/>';
  }
  var LA={
    heart:'<path d="M60 52c-6-5-10-8-6-10 3-1 6 1 6 3 0-2 3-4 6-3 4 2 0 5-6 10z" fill="#8a5330"/>',
    leaf:'<path d="M46 47c9-6 19-6 28 0-9 4-19 4-28 0z" fill="#8a5330"/><path d="M60 43v8" stroke="#f3e2c8" stroke-width="1.4"/>',
    dots:'<circle cx="50" cy="47" r="2.6" fill="#8a5330"/><circle cx="60" cy="48" r="3" fill="#8a5330"/><circle cx="70" cy="47" r="2.6" fill="#8a5330"/>',
    swirl:'<path d="M48 48c4-5 9-5 12 0s8 5 12 0" fill="none" stroke="#8a5330" stroke-width="2.4" stroke-linecap="round"/>',
    none:''
  };
  var LAK=['heart','leaf','dots','swirl'];
  /* формы посуды */
  function cup(p,h){
    var f=p.f?'<ellipse cx="60" cy="47" rx="29" ry="5" fill="'+p.f+'"/>'+(LA[LAK[h%4]]||''):'';
    return S(STEAM+SH+'<path d="M26 48h68v24c0 16-14 28-34 28S26 88 26 72z" fill="#fff"/><path d="M94 54h7c8 0 10 14 2 18-3 1-6 2-9 2" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><ellipse cx="60" cy="48" rx="34" ry="7" fill="#fff"/><ellipse cx="60" cy="48" rx="29" ry="5" fill="'+p.l+'"/>'+f+'<path d="M34 62c2 14 12 22 26 22" fill="none" stroke="'+p.c1+'" stroke-width="3" stroke-linecap="round" opacity=".7"/>');
  }
  function espresso(p){
    return S(STEAM.replace('M46 30','M50 40').replace('M60 30','M62 40').replace('M74 30','M74 40')+SH+'<ellipse cx="60" cy="96" rx="44" ry="9" fill="#fff"/><ellipse cx="60" cy="94" rx="34" ry="6" fill="#e9f7f5"/><path d="M38 62h44v14c0 12-10 20-22 20S38 88 38 76z" fill="#fff"/><path d="M82 66h5c6 0 7 10 1 13-2 1-4 1-6 1" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><ellipse cx="60" cy="62" rx="22" ry="5" fill="#fff"/><ellipse cx="60" cy="62" rx="18" ry="3.600" fill="'+p.l+'"/><ellipse cx="55" cy="61.500" rx="8" ry="1.800" fill="'+(p.f||'#8a5330')+'"/>');
  }
  function mug(p,h){
    return S(STEAM+SH+'<path d="M30 40h50l-3 52c-.4 6-5 10-11 10H44c-6 0-10.600-4-11-10z" fill="#fff" fill-opacity=".3" stroke="#fff" stroke-width="3"/><path d="M33 52h44l-2.500 40c-.3 4-3.500 7-7.500 7H43c-4 0-7.200-3-7.500-7z" fill="'+p.l+'"/><path d="M80 48h8c10 0 12 18 2 22-3 1-7 2-10 2" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>'+garnish(p.g,78,36)+'<path d="M52 20l18 14" stroke="#c98a52" stroke-width="5" stroke-linecap="round"/>');
  }
  function tall(p,h){
    var st=STRAW[h%STRAW.length];
    return S(SH+'<path d="M34 24h52l-6 74c-.5 6-4 10-10 10H50c-6 0-9.500-4-10-10z" fill="#fff" fill-opacity=".28" stroke="#fff" stroke-width="3"/><path d="M38 50h44l-3.500 48c-.4 5-3.500 8-8 8H49.500c-4.500 0-7.600-3-8-8z" fill="'+p.l+'"/><path d="M38 50h44l-1.500 18c-14 6-27 6-41 0z" fill="'+(p.f||'#f3e3cc')+'"/><rect x="46" y="38" width="15" height="15" rx="3" fill="#fff" fill-opacity=".75" transform="rotate(-12 53 45)"/><rect x="62" y="44" width="14" height="14" rx="3" fill="#fff" fill-opacity=".65" transform="rotate(14 69 51)"/><path d="M70 4l-9 56" stroke="'+st+'" stroke-width="6" stroke-linecap="round"/>'+garnish(p.g,90,30));
  }
  function togo(p,h){
    var st=STRAW[(h>>3)%STRAW.length];
    return S(SH+'<path d="M46 6h30" stroke="'+st+'" stroke-width="6" stroke-linecap="round"/><path d="M62 6l-4 24" stroke="'+st+'" stroke-width="6" stroke-linecap="round"/><path d="M30 28c2-8 14-10 30-10s28 2 30 10z" fill="#fff"/><rect x="28" y="28" width="64" height="9" rx="4" fill="#fff"/><path d="M34 37h52l-5 62c-.4 5-4 9-9 9H48c-5 0-8.600-4-9-9z" fill="#fff"/><path d="M36 54h48l-1.600 22H37.600z" fill="'+p.c2+'"/><path d="M46 56l-3 18M58 56l-2 18M70 56l-1 18M80 56l1 18" stroke="#fff" stroke-width="3" opacity=".55"/><path d="M40 82c6 5 14 6 20 6" fill="none" stroke="'+p.l+'" stroke-width="5" stroke-linecap="round" opacity=".9"/>');
  }
  function shake(p,h){
    return S(SH+'<path d="M36 52h48l-6 48c-.6 5-4 8-9 8H51c-5 0-8.400-3-9-8z" fill="'+p.l+'"/><path d="M36 52h48l-1.200 12c-14 5-32 5-46 0z" fill="'+(p.f||'#fff')+'"/><path d="M33 52c-7-2-6-11 2-13 0-9 10-13 18-9 8-7 21-2 21 9 8 2 8 11 1 13z" fill="#fff"/><circle cx="62" cy="22" r="7" fill="#e5384f"/><path d="M62 16c2-6 6-8 10-8" stroke="#3f8a3a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M84 12l-14 28" stroke="'+STRAW[h%STRAW.length]+'" stroke-width="6" stroke-linecap="round"/>');
  }
  function smoothie(p,h){
    return S(SH+'<path d="M36 46h48l-5 54c-.5 5-4 8-9 8H50c-5 0-8.500-3-9-8z" fill="'+p.l+'"/><path d="M36 46h48l-1.500 16c-14 5-31 5-45 0z" fill="'+(p.f||'#fff')+'"/><path d="M32 42c0-12 12-20 28-20s28 8 28 20z" fill="#fff" fill-opacity=".92"/><rect x="30" y="40" width="60" height="8" rx="4" fill="#fff"/><path d="M68 2l4 32" stroke="'+STRAW[h%STRAW.length]+'" stroke-width="6" stroke-linecap="round"/>'+garnish(p.g,50,84));
  }
  function teapot(p,h){
    return S(STEAM.replace('M46 30','M40 34').replace('M60 30','M54 34').replace('M74 30','M68 34')+SH+'<path d="M24 62c0-16 14-26 32-26s32 10 32 26v14c0 14-10 24-32 24S24 90 24 76z" fill="#fff"/><path d="M88 54h8c8 0 10 16 0 20" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M24 60c-8-2-12-10-8-16" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><ellipse cx="56" cy="36" rx="18" ry="5" fill="#fff"/><circle cx="56" cy="28" r="5" fill="#fff"/><path d="M34 70c0 12 8 20 22 20" fill="none" stroke="'+p.l+'" stroke-width="4" stroke-linecap="round" opacity=".9"/><circle cx="92" cy="92" r="9" fill="'+p.c2+'" opacity=".0"/>'+garnish(p.g,98,96));
  }
  function bottle(p){
    return S(SH+'<rect x="48" y="6" width="24" height="12" rx="4" fill="#fff"/><path d="M50 18h20l8 22v58c0 6-4 10-10 10H52c-6 0-10-4-10-10V40z" fill="#fff" fill-opacity=".3" stroke="#fff" stroke-width="3"/><path d="M45 58h30v40c0 5-3 8-8 8H53c-5 0-8-3-8-8z" fill="'+p.l+'"/><rect x="44" y="64" width="32" height="24" fill="#fff"/><path d="M50 64l6 24M60 64l6 24M68 64l5 24" stroke="'+p.c2+'" stroke-width="4"/>');
  }
  function can(p){
    return S(SH+'<path d="M38 18h44l4 6v76c0 5-4 8-8 8H42c-4 0-8-3-8-8V24z" fill="'+p.c1+'"/><rect x="34" y="14" width="52" height="8" rx="3" fill="#e9eef0"/><path d="M34 54c14 12 38 12 52 0v22c-14 12-38 12-52 0z" fill="#fff"/><path d="M44 36l6-6M70 40l8-8" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/><rect x="34" y="102" width="52" height="6" rx="3" fill="#e9eef0"/>');
  }
  function croissant(p){
    return S(SH+'<path d="M12 80c2-26 22-44 48-44s46 18 48 44c-8-6-14-4-20 3-6-9-14-9-20 0-6-9-14-9-20 0-6-7-12-9-20-3z" fill="#f2b665"/><path d="M36 44l8 36M52 38l4 42M68 38l-4 42M84 44l-8 36" stroke="#c98233" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M26 58c8-10 18-14 28-14" stroke="#ffd9a0" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>');
  }
  function bowl(p,h){
    var cs=['#7bbf5f','#5cb04a','#ff6b6b','#ffd54a','#f0f0e0'];
    return S(SH+'<circle cx="46" cy="52" r="14" fill="'+cs[h%5]+'"/><circle cx="68" cy="48" r="13" fill="'+cs[(h>>2)%5]+'"/><circle cx="84" cy="56" r="10" fill="'+cs[(h>>4)%5]+'"/><circle cx="58" cy="40" r="9" fill="'+cs[(h>>6)%5]+'"/><path d="M16 60h88c0 26-18 44-44 44S16 86 16 60z" fill="#fff"/><path d="M30 80c8 8 22 12 30 12" fill="none" stroke="'+p.c1+'" stroke-width="3" stroke-linecap="round" opacity=".8"/>');
  }
  function donut(p,h){
    var gl=['#ff8fa3','#8a5330','#ffffff','#7bd88f','#a58be8'][h%5];
    return S(SH+'<circle cx="60" cy="62" r="40" fill="#e9a65c"/><circle cx="60" cy="58" r="36" fill="'+gl+'"/><circle cx="60" cy="58" r="12" fill="'+p.c2+'"/><g stroke-width="4" stroke-linecap="round"><path d="M38 40l6 -3" stroke="#fff"/><path d="M78 38l5 4" stroke="#ffd54a"/><path d="M34 62l6 2" stroke="#7bd88f"/><path d="M84 66l-5 4" stroke="#fff"/><path d="M52 82l4 -5" stroke="#ffd54a"/><path d="M72 80l-2 -6" stroke="#ff8fa3"/></g>');
  }
  function bag(){
    return S(SH+'<path d="M26 44h68l6 60H20z" fill="#fff"/><path d="M44 44V32c0-10 8-14 16-14s16 4 16 14v12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M40 64l12 28M60 60l10 34M80 66l6 28" stroke="#007a7a" stroke-width="6" stroke-linecap="round"/>');
  }
  function kind(it){
    var n=String(it&&it.name||'').toLowerCase(), c=it&&it.category;
    if(c==='merch'||/футбол|кружк|худи|шопер|термос|merch/.test(n)) return 'bag';
    if(/круассан|слойк|пирог|булочк|сэндвич|френч|достер|хот/.test(n)) return 'croissant';
    if(/боул|салат|каша|суп/.test(n)) return 'bowl';
    if(/пончик|донат|чизкейк|торт|десерт|маффин|печень|эклер|тирамису|медовик|брауни|урбеч/.test(n)||c==='desserts') return 'donut';
    if(/смузи|smoothie/.test(n)) return 'smoothie';
    if(/коктейл|shake|фраппе|milk/.test(n)||c==='milkshakes') return 'shake';
    if(/cola|кола|pepsi|sprite|спрайт|fanta|фанта|red bull|burn|энерг/.test(n)) return 'can';
    if(/вода|water|aqua|aura|burabay|шымбулак|сок|tropicana|напиток/.test(n)||c==='bottled') return 'bottle';
    if(/эспрессо|espresso|доппио|doppio|ристретто|lungo|лунго/.test(n)) return 'espresso';
    if(/глинтвейн|mulled|какао|шоколад|choc|пунш|сбитень|грог/.test(n)) return 'mug';
    if(/чай|tea|fuse/.test(n)&&!/ice|айс|холод|лимонад/.test(n)) return 'teapot';
    if(/лимонад|мохито|lemonade|mojito|тархун|бобба|bumble|тоник|tonic|ice|айс|холодн/.test(n)||c==='lemonades'||c==='cold_coffee') return /ice|айс|холодн|bumble|тоник|tonic/.test(n)?'togo':'tall';
    if(/матча|matcha/.test(n)) return 'tall';
    return 'cup';
  }
  var BUILD={cup:cup,espresso:espresso,mug:mug,tall:tall,togo:togo,shake:shake,smoothie:smoothie,teapot:teapot,bottle:bottle,can:can,croissant:croissant,bowl:bowl,donut:donut,bag:bag};
  var DECO=['<path d="M12 4c-8 12 8 14 0 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>','<ellipse cx="10" cy="14" rx="7" ry="11" fill="#fff" transform="rotate(25 10 14)"/>','<path d="M10 2v16M2 10h16" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>','<circle cx="10" cy="10" r="7" fill="none" stroke="#fff" stroke-width="2.4"/>'];
  /* итог: svg + цвета карточки */
  function make(it){
    var name=String(it&&it.name||'?'), lc=name.toLowerCase(), h=H(name), k=kind(it), p=pal(lc);
    if(k==='croissant') p={c1:'#f2b665',c2:'#b8702a',g:'bean'}; else if(k==='bag') p={c1:'#00c9c9',c2:'#005a5a',g:'bean',l:'#fff'};
    if(k==='can'&&!/cola|кола|pepsi/.test(lc)) { p=Object.assign({},p); }
    var svg=BUILD[k](p,h);
    return {svg:svg,c1:p.c1,c2:p.c2,rot:((h%13)-6)+'deg',deco:[h%4,(h>>3)%4],k:k};
  }
  var ART={hot:BUILD.cup({l:'#8a5330',f:'#f3e2c8',c1:'#e0ad72',c2:'#8f5a2d'},1),iced:BUILD.tall({l:'#8a5330',f:'#f3e3cc',c1:'#d9a875',c2:'#5a3320',g:'bean'},2)};

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
        var t=card.querySelector('.card-title'), it=t?itemByName(t.textContent):null;
        var mk=make(it||{name:t?t.textContent:'',category:'x'});
        var art=document.createElement('div'); art.className='mx-art k-'+mk.k;
        art.style.setProperty('--c1',mk.c1); art.style.setProperty('--c2',mk.c2); art.style.setProperty('--rot',mk.rot);
        art.innerHTML=mk.svg+'<i class="bub b1"></i><i class="bub b2"></i><i class="bub b3"></i>'
          +'<svg class="dc d1" viewBox="0 0 20 28" aria-hidden="true">'+DECO[mk.deco[0]]+'</svg><svg class="dc d2" viewBox="0 0 20 28" aria-hidden="true">'+DECO[mk.deco[1]]+'</svg>';
        card.insertBefore(art,card.firstChild);
        var bottom=card.querySelector('.card-bottom');
        if(bottom){ var p=document.createElement('span'); p.className='card-plus'; p.textContent='+'; bottom.appendChild(p); }
        if(card.animate) card.animate([{opacity:0,transform:'translateY(34px) scale(.96)'},{opacity:1,transform:'none'}],{duration:760,delay:Math.min(i,11)*60,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});
      });
    }
    new MutationObserver(function(){ if(!scheduled){ scheduled=true; requestAnimationFrame(decorate); } }).observe(grid,{childList:true});
    decorate();

    /* ================= окно напитка: светлое, премиальное ================= */
    var modal=document.getElementById('productModal');
    var T={
      add:{ru:'Добавить в корзину',en:'Add to cart',kk:'Себетке қосу'},
      cart:{ru:'Корзина',en:'Cart',kk:'Себет'},
      total:{ru:'Итого',en:'Total',kk:'Барлығы'},
      clear:{ru:'Очистить',en:'Clear',kk:'Тазалау'},
      app:{ru:'Заказать в приложении',en:'Order in the app',kk:'Қолданбада тапсырыс беру'},
      empty:{ru:'Корзина пуста',en:'Your cart is empty',kk:'Себет бос'},
      added:{ru:'Добавлено в корзину',en:'Added to cart',kk:'Себетке қосылды'},
      sugar:{ru:'Сахар',en:'Sugar',kk:'Қант'}
    };
    function t(k){ return T[k][L()]; }
    function catName(id){ var c=categoriesData.filter(function(x){return x.id===id})[0]; return c?c.name:''; }
    function unitPrice(){ var el=document.getElementById('modalFinalPrice'); return parseInt(((el&&el.textContent)||'0').replace(/\D/g,''),10)||0; }
    var qty=1, totalEl=null, qtyEl=null, addTxt=null;

    function buildFooter(){
      var f=modal.querySelector('.modal-footer'); if(!f||f.getAttribute('data-mx')) return;
      f.setAttribute('data-mx','1'); f.classList.add('mx-foot');
      f.innerHTML='<div class="mx-qty" data-no-translate><button type="button" class="mx-qm" aria-label="-">\u2212</button><span class="mx-qv">1</span><button type="button" class="mx-qp" aria-label="+">+</button></div>'
        +'<button type="button" class="mx-add" data-no-translate><span class="mx-add-t"></span><span class="mx-add-s">\u2014</span><span class="mx-add-p"><b id="mxTotal">0</b>\u00a0\u20b8</span></button>'
        +'<span id="modalFinalPrice" hidden>0</span>';
      totalEl=f.querySelector('#mxTotal'); qtyEl=f.querySelector('.mx-qv'); addTxt=f.querySelector('.mx-add-t');
      addTxt.textContent=t('add');
      f.querySelector('.mx-qm').addEventListener('click',function(){ setQty(qty-1); });
      f.querySelector('.mx-qp').addEventListener('click',function(){ setQty(qty+1); });
      f.querySelector('.mx-add').addEventListener('click',addToCart);
      new MutationObserver(refreshTotal).observe(f.querySelector('#modalFinalPrice'),{childList:true,characterData:true,subtree:true});
    }
    function setQty(n){ qty=Math.max(1,Math.min(20,n)); if(qtyEl) qtyEl.textContent=qty; refreshTotal(); }
    function refreshTotal(){
      if(!totalEl) return;
      var v=unitPrice()*qty;
      if(totalEl.textContent.replace(/\D/g,'')!==String(v)){
        totalEl.textContent=v.toLocaleString('ru-RU');
        if(totalEl.animate) totalEl.animate([{transform:'translateY(5px)',opacity:.4},{transform:'none',opacity:1}],{duration:260,easing:'cubic-bezier(.2,.8,.2,1)'});
      }
    }

    /* ---------- рисунки для окна ---------- */
    function cupSvg(ht,n){
      var y0=90-ht, yb=y0+9, id='szc'+n;
      var body='M10 '+yb+'H50L46 82Q45.5 88 40 88H20Q14.5 88 14 82Z';
      var s1=y0+ht*0.36, s2=y0+ht*0.70, lines='';
      for(var x=-12;x<70;x+=9) lines+='<line x1="'+x+'" y1="'+s2+'" x2="'+(x+14)+'" y2="'+s1+'"/>';
      return '<svg viewBox="0 0 60 90" aria-hidden="true"><defs><clipPath id="'+id+'"><path d="'+body+'"/></clipPath></defs>'
        +'<path class="cb" d="'+body+'"/><g clip-path="url(#'+id+')"><rect class="cs-bg" x="0" y="'+s1+'" width="60" height="'+(s2-s1)+'"/><g>'+lines+'</g></g>'
        +'<rect class="cl" x="6" y="'+y0+'" width="48" height="9" rx="3.5"/><rect class="cl" x="12" y="'+(y0-3.5)+'" width="36" height="5" rx="2.5"/></svg>';
    }
    var IC={
      milk:'<path d="M11 8h10l1 4v15a1.500 1.500 0 0 1-1.500 1.500h-9A1.500 1.500 0 0 1 10 27V12z"/><path d="M10 13h12M13 3.500h6V8h-6z"/>',
      free:'<path d="M16 5c5 6 7 9 7 12a7 7 0 0 1-14 0c0-3 2-6 7-12z"/><path d="M6 26L26 6"/>',
      coco:'<circle cx="16" cy="16" r="10.500"/><circle cx="16" cy="16" r="6.500"/><circle cx="14" cy="15" r=".9" fill="currentColor"/><circle cx="18" cy="15" r=".9" fill="currentColor"/><circle cx="16" cy="18.500" r=".9" fill="currentColor"/>',
      almond:'<path d="M16 4c6 5 8 12 3 21-1.500 2.500-5 2.500-6 0-5-9-3-16 3-21z"/><path d="M16 9v14"/>',
      oat:'<path d="M16 29V8"/><path d="M16 13c-4-1-5-4-5-7 3 0 5 3 5 7zM16 13c4-1 5-4 5-7-3 0-5 3-5 7zM16 20c-4-1-5-4-5-7 3 0 5 3 5 7zM16 20c4-1 5-4 5-7-3 0-5 3-5 7z"/>',
      soy:'<path d="M5 23C5 13 13 7 27 7c0 12-7 20-20 20z"/><circle cx="11" cy="21" r="1.800"/><circle cx="16.500" cy="16" r="1.800"/><circle cx="22" cy="11.500" r="1.800"/>',
      hazel:'<path d="M8 13c0-4 3-6.500 8-6.500S24 9 24 13z"/><path d="M8.500 13c0 8 3.500 14.500 7.500 14.500s7.500-6.500 7.500-14.500z"/><path d="M16 6.500V4"/>',
      banana:'<path d="M6 7c0 11 6 19 20 19l-1 3C12 29 4 21 4 10z"/><path d="M6 7l3-2"/>',
      blend:'<ellipse cx="11.500" cy="16" rx="5.500" ry="9" transform="rotate(-18 11.500 16)"/><path d="M12 8c-3 5 3 8 0 16" transform="rotate(-18 11.500 16)"/><ellipse cx="21" cy="16" rx="5.500" ry="9" transform="rotate(18 21 16)" fill="currentColor" fill-opacity=".22"/>',
      arab:'<ellipse cx="16" cy="17" rx="7.500" ry="11" transform="rotate(14 16 17)"/><path d="M17 7c-4 6 4 10 0 20" transform="rotate(14 16 17)"/><path d="M24 6c2 3 1 6-2 7" />',
      decaf:'<ellipse cx="16" cy="16" rx="7" ry="11" transform="rotate(-20 16 16)"/><path d="M16 6c-4 6 4 10 0 20" transform="rotate(-20 16 16)"/><path d="M5 27L27 5"/>'
    };
    function icon2(k){ return '<svg viewBox="0 0 32 32" aria-hidden="true">'+(IC[k]||IC.milk)+'</svg>'; }
    function milkKey(n){ n=n.toLowerCase(); return /безлакт/.test(n)?'free':/кокос/.test(n)?'coco':/миндал/.test(n)?'almond':/овсян/.test(n)?'oat':/соев/.test(n)?'soy':/фундук|фундуч/.test(n)?'hazel':/банан/.test(n)?'banana':'milk'; }
    function beanKey(n){ n=n.toLowerCase(); return /decaf/.test(n)?'decaf':/arabica/.test(n)?'arab':'blend'; }
    var CUBE='<svg viewBox="0 0 28 28" aria-hidden="true"><path class="fl" d="M4 8.500l10 5.500v11L4 19.500z"/><path class="fr" d="M24 8.500L14 14v11l10-5.500z"/><path class="ft" d="M14 3l10 5.500L14 14 4 8.500z"/></svg>';
    var SG={
      ru:['Без сахара','Чуть-чуть','Средне','Сладко','Очень сладко'],
      en:['No sugar','Just a bit','Medium','Sweet','Very sweet'],
      kk:['Қантсыз','Аздап','Орташа','Тәтті','Өте тәтті']
    };
    function sgText(v){ var i=v===0?0:v<=3?1:v<=6?2:v<=8?3:4; return SG[L()][i]; }

    function buildSugar(group){
      var range=document.getElementById('sugarRange'); if(!range||group.querySelector('.mx-sugar')) return;
      var box=document.createElement('div'); box.className='mx-sugar'; box.setAttribute('data-no-translate','');
      box.innerHTML='<div class="mx-sg-top"><b class="mx-sg-n">0</b><span class="mx-sg-t"></span></div><div class="mx-cubes"></div>';
      var cubes=box.querySelector('.mx-cubes'), num=box.querySelector('.mx-sg-n'), txt=box.querySelector('.mx-sg-t');
      for(var i=1;i<=10;i++){ var b=document.createElement('button'); b.type='button'; b.className='mx-cube'; b.setAttribute('data-v',i); b.setAttribute('aria-label',i); b.innerHTML=CUBE; cubes.appendChild(b); }
      function paint(v){
        [].forEach.call(cubes.children,function(c,idx){ c.classList.toggle('on',idx<v); });
        num.textContent=v; txt.textContent=sgText(v);
        if(num.animate) num.animate([{transform:'scale(1.25)'},{transform:'scale(1)'}],{duration:320,easing:'cubic-bezier(.32,.72,0,1)'});
      }
      function set(v){ v=Math.max(0,Math.min(10,v)); range.value=v; range.dispatchEvent(new Event('input',{bubbles:true})); paint(v); }
      cubes.addEventListener('click',function(e){
        var b=e.target.closest('.mx-cube'); if(!b) return;
        var v=+b.getAttribute('data-v'), cur=+range.value;
        set(v===cur?v-1:v);
      });
      /* протянуть палец по кубикам */
      var drag=false;
      function pick(e){ var t=document.elementFromPoint(e.clientX,e.clientY); var b=t&&t.closest&&t.closest('.mx-cube'); if(b) set(+b.getAttribute('data-v')); }
      cubes.addEventListener('pointerdown',function(e){ drag=true; });
      cubes.addEventListener('pointermove',function(e){ if(drag&&e.pointerType!=='mouse') pick(e); });
      window.addEventListener('pointerup',function(){ drag=false; });
      group.appendChild(box);
      paint(+range.value||0);
    }
    function buildTiles(flex,kind){
      if(flex.getAttribute('data-mx')) return; flex.setAttribute('data-mx','1');
      var btns=[].slice.call(flex.children).filter(function(x){return x.tagName==='BUTTON'});
      flex.classList.add('mx-tiles',btns.length===3?'k3':'k4');
      btns.forEach(function(b){
        var full=b.textContent.trim(), price='', name=full;
        var pm=full.match(/\(\s*(\+[^)]*)\)/); if(pm){ price=pm[1]; name=full.replace(pm[0],'').trim(); }
        b.setAttribute('data-name',name+(price?' ('+price+')':''));
        if(kind==='milk') name=name.replace(/\s*молоко\s*/i,'').trim()||name;
        else name=name.replace(/^Зерно\s+/i,'').trim();
        var key=kind==='milk'?milkKey(full):beanKey(full);
        b.classList.add('mx-tile');
        b.innerHTML='<span class="ti">'+icon2(key)+'</span><span class="tn">'+name+'</span>'+(price?'<span class="tp">'+price+'</span>':'');
      });
    }
    function buildSeg(flex){
      if(flex.getAttribute('data-mx')) return; flex.setAttribute('data-mx','1');
      flex.classList.add('mx-seg');
      var th=document.createElement('span'); th.className='mx-seg-th'; flex.insertBefore(th,flex.firstChild);
      function place(){
        var a=flex.querySelector('.mod-opt-btn.active'); if(!a){ th.style.width='0'; return; }
        th.style.width=a.offsetWidth+'px'; th.style.transform='translateX('+a.offsetLeft+'px)';
      }
      flex.addEventListener('click',function(){ requestAnimationFrame(place); });
      requestAnimationFrame(function(){ th.style.transition='none'; place(); requestAnimationFrame(function(){ th.style.transition=''; }); });
    }

    function enhance(){
      var h=modal.querySelector('.modal-header'); if(!h) return;
      var name=(document.getElementById('modalProductTitle')||{}).textContent||'';
      var it=(typeof selectedProduct!=='undefined'&&selectedProduct&&selectedProduct.name===name)?selectedProduct:itemByName(name);
      var mk=make(it||{name:name,category:'x'});
      var sh=modal.querySelector('.modal-sheet'); if(sh){ sh.style.setProperty('--c1',mk.c1); sh.style.setProperty('--c2',mk.c2); }
      var old=h.querySelector('.mx-mhero'); if(old) old.remove();
      var oldS=h.querySelector('.mx-msub'); if(oldS) oldS.remove();
      var d=document.createElement('div'); d.className='mx-mhero';
      var photo=it&&(it.img||it.image||it.photo);
      d.innerHTML=photo?'<img class="mx-photo" alt="" src="'+photo+'">':mk.svg;
      h.insertBefore(d,h.firstChild);
      var sub=document.createElement('div'); sub.className='mx-msub'; sub.textContent=it?catName(it.category):''; if(!sub.textContent) sub.style.display='none';
      var ttl=h.querySelector('h3'); if(ttl&&ttl.nextSibling) h.insertBefore(sub,ttl.nextSibling); else h.appendChild(sub);

      /* размеры: нарисованные стаканы разной высоты */
      var opts=[].slice.call(modal.querySelectorAll('.modal-size-option'));
      var letters=opts.length===2?['S','L']:opts.length===4?['S','M','L','XL']:['S','M','L'];
      opts.forEach(function(o,idx){
        if(o.querySelector('.sz-cup')) return;
        var ht=opts.length>1?46+idx*(26/(opts.length-1)):60;
        var cup=document.createElement('span'); cup.className='sz-cup'; cup.innerHTML=cupSvg(ht,idx);
        var l=document.createElement('span'); l.className='sz-l'; l.textContent=letters[Math.min(idx,letters.length-1)];
        o.insertBefore(l,o.firstChild); o.insertBefore(cup,o.firstChild);
      });
      /* группы выбора */
      [].forEach.call(modal.querySelectorAll('.modal-body > div'),function(g){
        var tt=g.querySelector('.mod-group-title'); if(!tt) return;
        var txt=tt.textContent.toLowerCase(), flex=g.querySelector('.mod-options-flex');
        if(/зерен|beans/.test(txt)&&flex) buildTiles(flex,'beans');
        else if(/молок|milk/.test(txt)&&flex) buildTiles(flex,'milk');
        else if(/температур|способ|подач|temperature|serving/.test(txt)&&flex&&flex.children.length<=3) buildSeg(flex);
        else if(/сахар|sugar/.test(txt)) buildSugar(g);
      });
      setQty(1);
      buildFooter();
      addTxt&&(addTxt.textContent=t('add'));
      refreshTotal();
    }
    if(modal){
      buildFooter();
      new MutationObserver(function(){ if(modal.classList.contains('active')) setTimeout(enhance,0); }).observe(modal,{attributes:true,attributeFilter:['class']});
      /* смахнуть окно вниз на телефоне: как в iOS, с сопротивлением и пружиной */
      var sheet=modal.querySelector('.modal-sheet'), sy=null, dy=0, t0=0;
      if(sheet){
        sheet.addEventListener('touchstart',function(e){
          if(window.innerWidth>650) return;
          var body=sheet.querySelector('.modal-body'), inHead=!!e.target.closest('.modal-header');
          if(!inHead&&body&&body.scrollTop>0) return;
          sy=e.touches[0].clientY; dy=0; t0=Date.now();
        },{passive:true});
        sheet.addEventListener('touchmove',function(e){
          if(sy===null) return; dy=e.touches[0].clientY-sy;
          if(dy>0){ sheet.style.transition='none'; sheet.style.transform='translateY('+(dy<120?dy:120+(dy-120)*.85)+'px)'; }
        },{passive:true});
        function end(close){
          sheet.style.transition='transform .55s cubic-bezier(.32,.72,0,1)'; sheet.style.transform='';
          setTimeout(function(){ sheet.style.transition=''; },580);
          if(close&&typeof closeModal==='function') closeModal();
        }
        sheet.addEventListener('touchend',function(){
          if(sy===null) return; var d=dy, v=d/Math.max(1,Date.now()-t0); sy=null;
          end(d>110||(v>.6&&d>40));
        });
        sheet.addEventListener('touchcancel',function(){ sy=null; end(false); });
      }
    }

    /* ================= корзина ================= */
    var KEY='zebra-cart-v1', cart=[];
    try{ cart=JSON.parse(localStorage.getItem(KEY)||'[]')||[]; }catch(e){ cart=[]; }
    function save(){ try{ localStorage.setItem(KEY,JSON.stringify(cart)); }catch(e){} }
    function sum(){ return cart.reduce(function(a,l){return a+l.unit*l.qty},0); }
    function cnt(){ return cart.reduce(function(a,l){return a+l.qty},0); }
    var BAG='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';
    var fab=document.createElement('button'); fab.type='button'; fab.id='mxCartBtn'; fab.setAttribute('data-no-translate','');
    fab.innerHTML=BAG+'<span class="mxc-n"></span><span class="mxc-w"></span><b class="mxc-s"></b>';
    document.body.appendChild(fab);
    var cp=document.createElement('div'); cp.id='mxCart'; cp.setAttribute('data-no-translate','');
    cp.innerHTML='<div class="mxc-bg"></div><div class="mxc-sheet" role="dialog" aria-modal="true"><div class="mxc-head"><b class="mxc-title"></b><button type="button" class="mxc-x" aria-label="close">\u2715</button></div><div class="mxc-list"></div><div class="mxc-foot"><div class="mxc-total"><span class="mxc-tl"></span><b class="mxc-tv"></b></div><div class="mxc-actions"><button type="button" class="mxc-clear"></button><a class="mxc-app" target="_blank" rel="noopener"></a></div></div></div>';
    document.body.appendChild(cp);
    var list=cp.querySelector('.mxc-list');
    var ios=/iPhone|iPad|iPod/.test(navigator.userAgent);
    cp.querySelector('.mxc-app').href=ios?'https://apps.apple.com/ru/app/zebra-coffee-kz/id6474022904':'https://play.google.com/store/apps/details?id=kz.zebra_coffee.app&hl=ru';

    function renderCart(){
      fab.classList.toggle('show',cart.length>0);
      fab.querySelector('.mxc-n').textContent=cnt();
      fab.querySelector('.mxc-w').textContent=t('cart');
      fab.querySelector('.mxc-s').textContent=sum().toLocaleString('ru-RU')+'\u00a0\u20b8';
      cp.querySelector('.mxc-title').textContent=t('cart');
      cp.querySelector('.mxc-tl').textContent=t('total');
      cp.querySelector('.mxc-tv').textContent=sum().toLocaleString('ru-RU')+'\u00a0\u20b8';
      cp.querySelector('.mxc-clear').textContent=t('clear');
      cp.querySelector('.mxc-app').textContent=t('app');
      if(!cart.length){ list.innerHTML='<div class="mxc-empty">'+t('empty')+'</div>'; return; }
      list.innerHTML=cart.map(function(l,i){
        return '<div class="mxc-line" data-i="'+i+'"><div class="mxc-info"><b>'+l.name+'</b>'+(l.opts?'<small>'+l.opts+'</small>':'')+'</div>'
          +'<div class="mxc-ctl"><button type="button" data-a="m">\u2212</button><span>'+l.qty+'</span><button type="button" data-a="p">+</button></div>'
          +'<div class="mxc-pr">'+(l.unit*l.qty).toLocaleString('ru-RU')+'\u00a0\u20b8</div><button type="button" class="mxc-del" data-a="d" aria-label="remove">\u2715</button></div>';
      }).join('');
    }
    function openCart(){
      renderCart();
      document.documentElement.classList.add('modal-open'); document.body.classList.add('modal-open');
      cp.classList.add('show');
    }
    function closeCart(){
      cp.classList.remove('show');
      if(!(modal&&modal.classList.contains('active'))){ document.documentElement.classList.remove('modal-open'); document.body.classList.remove('modal-open'); }
    }
    fab.addEventListener('click',openCart);
    cp.querySelector('.mxc-bg').addEventListener('click',closeCart);
    cp.querySelector('.mxc-x').addEventListener('click',closeCart);
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&cp.classList.contains('show')) closeCart(); });
    cp.querySelector('.mxc-clear').addEventListener('click',function(){ cart=[]; save(); renderCart(); closeCart(); });
    list.addEventListener('click',function(e){
      var b=e.target.closest('button[data-a]'); if(!b) return;
      var row=b.closest('.mxc-line'), i=+row.getAttribute('data-i'), l=cart[i]; if(!l) return;
      var a=b.getAttribute('data-a');
      if(a==='p') l.qty=Math.min(20,l.qty+1); else if(a==='m') l.qty=Math.max(1,l.qty-1); else if(a==='d') cart.splice(i,1);
      save(); renderCart(); if(!cart.length) closeCart();
    });

    function collectOpts(){
      var parts=[];
      var sz=modal.querySelector('.modal-size-option.active');
      if(sz){ var pl=sz.querySelector('.sz-l'), v=sz.querySelector('.modal-size-volume'); parts.push((pl?pl.textContent:'')+(v&&v.textContent?' '+v.textContent:'')); }
      [].forEach.call(modal.querySelectorAll('.mod-opt-btn.active'),function(b){ parts.push((b.getAttribute('data-name')||b.textContent).replace(/\s*\(\+[^)]*\)/,'').trim()); });
      [].forEach.call(modal.querySelectorAll('.mod-extra-option input:checked'),function(inp){
        if(inp.dataset.none) return;
        var n=inp.closest('.mod-extra-option').querySelector('.mod-extra-name'); if(n) parts.push(n.textContent.trim());
      });
      var sr=document.getElementById('sugarRange'); if(sr&&sr.value!=='0') parts.push(t('sugar')+' '+sr.value);
      return parts.filter(Boolean).join(' \u00b7 ');
    }
    function addToCart(){
      var name=(document.getElementById('modalProductTitle')||{}).textContent||'', opts=collectOpts(), unit=unitPrice();
      var f=cart.filter(function(l){ return l.name===name&&l.opts===opts&&l.unit===unit; })[0];
      if(f) f.qty=Math.min(20,f.qty+qty); else cart.push({name:name,opts:opts,unit:unit,qty:qty});
      save(); renderCart();
      if(typeof closeModal==='function') closeModal();
      if(typeof showToast==='function') showToast(t('added'));
      if(fab.animate) fab.animate([{transform:'translateX(-50%) scale(1)'},{transform:'translateX(-50%) scale(1.14)'},{transform:'translateX(-50%) scale(1)'}],{duration:480,delay:260,easing:'ease-out'});
    }
    renderCart();
    new MutationObserver(function(){
      if(addTxt) addTxt.textContent=t('add'); renderCart();
    }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  });
})();
