(function(){
var $=function(id){return document.getElementById(id);};
var ICONS=(window.lucide&&lucide.icons)||{},names=Object.keys(ICONS).sort();
function kebab(n){return n.replace(/([a-z])([A-Z0-9])/g,'$1-$2').replace(/([0-9])([A-Z])/g,'$1-$2').toLowerCase();}
function nodes(n){var ic=ICONS[n];if(!ic)return[];return ic[0]==='svg'?(ic[2]||[]):ic;}
function inner(n){return nodes(n).map(function(x){var a=Object.keys(x[1]).filter(function(k){return k!=='key';}).map(function(k){return k+'="'+String(x[1][k]).replace(/"/g,'&quot;')+'"';}).join(' ');return'<'+x[0]+' '+a+'/>';}).join('');}
var S={icon:'Zap',size:300,rot:0,bw:2.3,fo:0,bc:'#111111',fc:'#111111',bg:'#ffbe18',rad:96,tr:false,gd:false,g2:'#ff5c8a',ga:135,tx:'',ts:56,ty:450,tc:'#111111',mg:0,mode:'icon',ff:'sans',fw:700,ls:0,uc:false,tz:100},EX={fmt:'png',res:2048},DEF=JSON.parse(JSON.stringify(S)),uid=0,hist=[],hi=0,ht=0;
var PRESETS=[
 {icon:'Zap',bg:'#ffbe18',bc:'#111111',fc:'#111111',fo:0,rad:96,size:300,rot:0,bw:2.3},
 {icon:'Rocket',bg:'#4f46e5',bc:'#ffffff',fc:'#ffffff',fo:20,rad:256,size:290,rot:0,bw:2},
 {icon:'Leaf',bg:'#14532d',bc:'#bbf7d0',fc:'#4ade80',fo:60,rad:128,size:300,rot:-15,bw:2},
 {icon:'Flame',bg:'#111111',bc:'#fb923c',fc:'#ef4444',fo:80,rad:96,size:300,rot:0,bw:1.8},
 {icon:'Heart',bg:'#fdf2f8',bc:'#be185d',fc:'#f9a8d4',fo:100,rad:256,size:280,rot:0,bw:2},
 {icon:'Cloud',bg:'#0ea5e9',bc:'#ffffff',fc:'#ffffff',fo:100,rad:0,size:320,rot:0,bw:1.5}];
function gAttrs(s,cy,cx){return'transform="translate('+(cx||256)+' '+(cy||256)+') rotate('+s.rot+') scale('+(s.size/24)+') translate(-12 -12)" stroke="'+s.bc+'" stroke-width="'+s.bw+'" stroke-linecap="round" stroke-linejoin="round" fill="'+s.fc+'" fill-opacity="'+(s.fo/100)+'"';}
var CV=document.createElement('canvas').getContext('2d');/*LAYOUT*/
var FONTS={
  sans:{n:'Modern',f:"'Inter','Helvetica Neue',Helvetica,Arial,sans-serif",w:700,ls:-1,uc:false},
  serif:{n:'Elegant',f:"'Playfair Display',Georgia,'Times New Roman',serif",w:600,ls:6,uc:true},
  mono:{n:'Tech',f:"'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace",w:700,ls:3,uc:true},
  rounded:{n:'Friendly',f:"'Nunito',ui-rounded,'SF Pro Rounded','Arial Rounded MT Bold',sans-serif",w:800,ls:0,uc:false},
  display:{n:'Impact',f:"'Archivo Black','Arial Black',Impact,sans-serif",w:900,ls:2,uc:true},
  script:{n:'Script',f:"'Pacifico','Snell Roundhand','Brush Script MT','Segoe Script',cursive",w:400,ls:0,uc:false}
};
if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){sched();});}
var EMBED_FONTS='';
(function(){
  var u='https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700;800&family=Nunito:wght@400;700;800;900&family=Pacifico&family=Playfair+Display:wght@400;600;700;900&display=swap';
  try{
    fetch(u).then(function(r){return r.text();}).then(function(css){
      var urls=[],re=/url\((https:\/\/[^)]+)\)/g,m;
      while((m=re.exec(css)))urls.push(m[1]);
      return Promise.all(urls.map(function(fu){
        return fetch(fu).then(function(r){return r.blob();}).then(function(b){
          return new Promise(function(res){var fr=new FileReader();fr.onload=function(){res([fu,fr.result]);};fr.readAsDataURL(b);});
        }).catch(function(){return[fu,fu];});
      })).then(function(pairs){
        pairs.forEach(function(p){css=css.split(p[0]).join(p[1]);});
        EMBED_FONTS=css;
      });
    }).catch(function(){});
  }catch(e){}
})();
function tw(t,s,fs){CV.font=s.fw+' '+fs+'px '+(FONTS[s.ff]||FONTS.sans).f;return CV.measureText(t).width+(s.ls/100*fs)*Math.max(0,t.length-1);}
function layout(s){var B=ibox(s.icon),sc=s.size/24,W=(B.w+s.bw)*sc,Hh=(B.h+s.bw)*sc,t=s.mode==='icon'?'':(s.uc?String(s.tx||'').toUpperCase():String(s.tx||'')),L={icon:s.mode!=='text',text:t,cx:256-(B.cx-12)*sc,cy:256-(B.cy-12)*sc,fs:0,ty:0,w:0};
  if(t){var w1=tw(t,s,100),target=s.mode==='text'?512*0.72*s.tz/100:W,fs=Math.max(12,Math.min(100*target/Math.max(w1,1),s.mode==='text'?300:Math.max(12,Math.min(W*0.6,(480-Hh*1.1)/0.72)))),cap=fs*0.72;L.fs=fs;L.w=tw(t,s,fs);
    if(s.mode==='text')L.ty=256+cap/2;else{var gap=Hh*0.1,H=Hh+gap+cap,top=256-H/2;L.cy=top+Hh/2-(B.cy-12)*sc;L.ty=top+Hh+gap+cap;}}
  return L;}
function txtEl(s,L){if(!L.text)return'';var F=FONTS[s.ff]||FONTS.sans,sp=s.ls/100*L.fs;return'<text x="'+(256+sp/2).toFixed(2)+'" y="'+L.ty.toFixed(2)+'" text-anchor="middle" font-family="'+F.f.replace(/"/g,"'")+'" font-weight="'+s.fw+'" font-size="'+L.fs.toFixed(2)+'" letter-spacing="'+sp.toFixed(2)+'" fill="'+s.tc+'">'+esc(L.text)+'</text>';}
/*END*/
var IB={};
function ibox(n){if(IB[n])return IB[n];var o={w:20,h:20,cx:12,cy:12};try{var sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('style','position:absolute;left:-9999px;width:0;height:0;visibility:hidden');sv.innerHTML='<g>'+inner(n)+'</g>';document.body.appendChild(sv);var b=sv.firstChild.getBBox();document.body.removeChild(sv);if(b.width>0&&b.height>0)o={w:b.width,h:b.height,cx:b.x+b.width/2,cy:b.y+b.height/2};}catch(e){}return IB[n]=o;}
function ic(n){return'<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+inner(n)+'</svg>';}
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function build(s,px,noText,embedCss){s=Object.assign({},DEF,s);var L=layout(s),id='bg'+(++uid),sc=1-2*s.mg/100,f=s.gd?'url(#'+id+')':s.bg;
  var styleBlock=(embedCss&&L.text&&EMBED_FONTS)?'<style>'+EMBED_FONTS+'</style>':'';
return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="'+(px||512)+'" height="'+(px||512)+'" shape-rendering="geometricPrecision"><defs>'+styleBlock+(s.gd?'<linearGradient id="'+id+'" gradientTransform="rotate('+s.ga+' .5 .5)"><stop offset="0" stop-color="'+s.bg+'"/><stop offset="1" stop-color="'+s.g2+'"/></linearGradient>':'')+'</defs><g transform="translate(256 256) scale('+sc+') translate(-256 -256)">'+(s.tr?'':'<rect width="512" height="512" rx="'+s.rad+'" fill="'+f+'"/>')+(L.icon?'<g '+gAttrs(s,L.cy,L.cx)+'>'+inner(s.icon)+'</g>':'')+(noText?'':txtEl(s,L))+'</g></svg>';}
/* scrubbers */
var SL=[['size','Size',100,460,1,' px'],['rot','Rotate',-180,180,1,'°'],['bw','Border width',0.5,4,0.1,' px'],['fo','Fill opacity',0,100,1,'%'],['rad','Roundness',0,256,1,'','slr'],['ga','Gradient angle',0,360,1,'°','slg'],['ls','Letter spacing',-10,40,1,'%','slt'],['tz','Text scale',50,130,1,'%','slt'],['mg','Export margin',0,30,1,'%','slm']],scr={};
SL.forEach(function(d){
  var k=d[0],mn=d[2],mx=d[3],st=d[4],el=document.createElement('div');
  el.className='scrub';el.tabIndex=0;el.setAttribute('role','slider');
  el.innerHTML='<div class="fill"></div><span>'+d[1]+'</span><span class="vl"></span>';$(d[6]||'sliders').appendChild(el);scr[k]=el;el.setAttribute('aria-label',d[1]);el.setAttribute('aria-valuemin',mn);el.setAttribute('aria-valuemax',mx);
  function set(v){v=Math.min(mx,Math.max(mn,Math.round(v/st)*st));S[k]=+v.toFixed(2);sched();}
  var sx=0,sy=0,sv=0,dr=false,act=false;
  el.addEventListener('pointerdown',function(e){if(e.target.tagName==='INPUT')return;sx=e.clientX;sy=e.clientY;sv=S[k];dr=true;act=false;if(e.pointerType==='mouse'){act=true;el.setPointerCapture(e.pointerId);el.classList.add('act');}});
  el.addEventListener('pointermove',function(e){if(!dr)return;var dx=e.clientX-sx,dy=e.clientY-sy;
    if(!act){if(Math.abs(dx)>4&&Math.abs(dx)>Math.abs(dy)){act=true;try{el.setPointerCapture(e.pointerId);}catch(err){}el.classList.add('act');}else if(Math.abs(dy)>6){dr=false;return;}else return;}
    set(sv+dx*(mx-mn)/el.getBoundingClientRect().width*(e.shiftKey?0.1:1));});
  function end(e){if(act){try{el.releasePointerCapture(e.pointerId);}catch(err){}}dr=false;act=false;el.classList.remove('act');}
  el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
  el.addEventListener('keydown',function(e){var m=e.shiftKey?10:1;
    if(e.key==='ArrowRight'||e.key==='ArrowUp'){set(S[k]+st*m);e.preventDefault();}
    if(e.key==='ArrowLeft'||e.key==='ArrowDown'){set(S[k]-st*m);e.preventDefault();}});
  el.addEventListener('dblclick',function(){var vl=el.querySelector('.vl'),inp=document.createElement('input'),done=false;inp.type='number';inp.value=S[k];inp.step=st;vl.replaceWith(inp);inp.focus();inp.select();
    function fin(ok){if(done)return;done=true;if(ok&&inp.value!=='')set(parseFloat(inp.value));var s=document.createElement('span');s.className='vl';inp.replaceWith(s);sched();}
    inp.addEventListener('blur',function(){fin(true);});inp.addEventListener('keydown',function(e){if(e.key==='Enter')fin(true);if(e.key==='Escape')fin(false);});});
});
/* color picker */
var H=0,Sa=0,V=1,cur=null,pop=$('pop'),sv=$('sv'),hue=$('hue');
function hsv2rgb(h,s,v){var f=function(n){var k=(n+h/60)%6;return v-v*s*Math.max(0,Math.min(k,4-k,1));};return[f(5),f(3),f(1)].map(function(x){return Math.round(x*255);});}
function hsv2hex(h,s,v){return'#'+hsv2rgb(h,s,v).map(function(x){return x.toString(16).padStart(2,'0');}).join('');}
function hex2hsv(c){var r=parseInt(c.slice(1,3),16)/255,g=parseInt(c.slice(3,5),16)/255,b=parseInt(c.slice(5,7),16)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn,h=0;if(d){h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360;}return[h,mx?d/mx:0,mx];}
function paintPop(){sv.style.backgroundColor=hsv2hex(H,1,1);var k=sv.firstChild;k.style.left=Sa*100+'%';k.style.top=(1-V)*100+'%';k.style.background=hsv2hex(H,Sa,V);
  hue.firstChild.style.left=H/360*100+'%';hue.firstChild.style.background=hsv2hex(H,1,1);if(document.activeElement!==$('hex'))$('hex').value=hsv2hex(H,Sa,V);}
function apply(){S[cur]=hsv2hex(H,Sa,V);paintPop();sched();}
function drag(el,fn){var on=false;el.addEventListener('pointerdown',function(e){on=true;el.setPointerCapture(e.pointerId);fn(e);});el.addEventListener('pointermove',function(e){if(on)fn(e);});el.addEventListener('pointerup',function(){on=false;});}
function frac(e,el){var r=el.getBoundingClientRect();return[Math.min(1,Math.max(0,(e.clientX-r.left)/r.width)),Math.min(1,Math.max(0,(e.clientY-r.top)/r.height))];}
drag(sv,function(e){var p=frac(e,sv);Sa=p[0];V=1-p[1];apply();});
drag(hue,function(e){H=frac(e,hue)[0]*359.99;apply();});
$('hex').addEventListener('input',function(){var v=this.value.trim();if(v[0]!=='#')v='#'+v;if(/^#[0-9a-f]{6}$/i.test(v)){var c=hex2hsv(v.toLowerCase());H=c[0];Sa=c[1];V=c[2];S[cur]=v.toLowerCase();paintPop();sched();}});
['#ffffff','#111111','#ef4444','#f97316','#ffbe18','#22c55e','#14b8a6','#0ea5e9','#4f46e5','#a855f7','#ec4899','#fdf2f8','#bbf7d0','#fde68a','#64748b','#78350f'].forEach(function(c){var b=document.createElement('button');b.style.background=c;b.title=c;b.addEventListener('click',function(){var h=hex2hsv(c);H=h[0];Sa=h[1];V=h[2];apply();});$('pal').appendChild(b);});
if(!window.EyeDropper)$('eye').style.display='none';
$('eye').addEventListener('click',function(){new EyeDropper().open().then(function(r){var h=hex2hsv(r.sRGBHex);H=h[0];Sa=h[1];V=h[2];apply();}).catch(function(){});});
document.querySelectorAll('.sw').forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();if(cur===b.dataset.k&&!pop.hidden){pop.hidden=true;return;}
  cur=b.dataset.k;var c=hex2hsv(S[cur]);H=c[0];Sa=c[1];V=c[2];pop.hidden=false;var r=b.getBoundingClientRect(),t=r.bottom+8;if(t+340>innerHeight)t=Math.max(8,r.top-346);
  pop.style.left=Math.max(8,Math.min(r.left,innerWidth-256))+'px';pop.style.top=t+'px';paintPop();});});
document.addEventListener('pointerdown',function(e){if(!pop.hidden&&!pop.contains(e.target)&&!e.target.closest('.sw'))pop.hidden=true;});
addEventListener('scroll',function(e){if(!pop.contains(e.target))pop.hidden=true;},true);
/* icons */
var list=[],shown=0,cachedIconImg=new Image(),cachedIconKey='';
function updateIconCache(){
  var k=[S.icon,S.bc,S.bw,S.fc,S.fo].join('|');
  if(k===cachedIconKey)return;
  cachedIconKey=k;
  var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512" fill="'+S.fc+'" fill-opacity="'+(S.fo/100)+'" stroke="'+S.bc+'" stroke-width="'+S.bw+'" stroke-linecap="round" stroke-linejoin="round">'+inner(S.icon)+'</svg>';
  cachedIconImg.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function more(){var g=$('icons');list.slice(shown,shown+150).forEach(function(n){var b=document.createElement('button');b.dataset.n=n;b.title=kebab(n);b.setAttribute('aria-label',kebab(n));b.innerHTML='<svg viewBox="0 0 24 24">'+inner(n)+'</svg>';if(n===S.icon)b.className='on';g.appendChild(b);});shown+=150;}
function listIcons(q){q=(q||'').toLowerCase().trim().replace(/\s+/g,'-');list=names.filter(function(n){return kebab(n).indexOf(q)>-1;});shown=0;$('icons').innerHTML='';
  if(!list.length)$('icons').innerHTML='<small>No icons found</small>';else more();$('icount').textContent=list.length+' / '+names.length;$('icons').scrollTop=0;}
$('icons').addEventListener('scroll',function(){if(this.scrollTop+this.clientHeight>this.scrollHeight-60&&shown<list.length)more();});
$('icons').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;S.icon=b.dataset.n;sched();});
$('q').addEventListener('input',function(){listIcons(this.value);});
/* render (in-place, rAF-batched) */
var raf=0,lastIcon='';
function sched(){clearTimeout(ht);ht=setTimeout(snap,350);if(!raf)raf=requestAnimationFrame(function(){raf=0;render();});}
function render(){
  var pg=$('pg'),pr=$('pr');
  if(lastIcon!==S.icon){pg.innerHTML=inner(S.icon);lastIcon=S.icon;
    var kb=kebab(S.icon);$('ilink').textContent=kb;$('ilink').href='https://lucide.dev/icons/'+kb;
    document.querySelectorAll('#icons button').forEach(function(b){b.classList.toggle('on',b.dataset.n===S.icon);});}
  updateIconCache();
  var L=layout(S);pg.style.display=L.icon?'':'none';pg.setAttribute('transform','translate('+L.cx+' '+L.cy+') rotate('+S.rot+') scale('+(S.size/24)+') translate(-12 -12)');
  pg.setAttribute('stroke',S.bc);pg.setAttribute('stroke-width',S.bw);pg.setAttribute('fill',S.fc);pg.setAttribute('fill-opacity',S.fo/100);
  pr.setAttribute('rx',S.rad);pr.setAttribute('fill',S.gd?'url(#pgr)':S.bg);pr.style.display=S.tr?'none':'';
  $('st1').setAttribute('stop-color',S.bg);$('st2').setAttribute('stop-color',S.g2);$('pgr').setAttribute('gradientTransform','rotate('+S.ga+' .5 .5)');
  var pt=$('pt'),F=FONTS[S.ff]||FONTS.sans;pt.textContent=L.text;pt.style.display=L.text?'':'none';
  if(L.text){var sp=S.ls/100*L.fs;pt.setAttribute('x',256+sp/2);pt.setAttribute('y',L.ty);pt.setAttribute('font-size',L.fs);pt.setAttribute('font-family',F.f);pt.setAttribute('font-weight',S.fw);pt.setAttribute('letter-spacing',sp);pt.setAttribute('fill',S.tc);}
  document.body.dataset.mode=S.mode;document.body.dataset.gd=S.gd?1:0;
  document.querySelectorAll('.ic-ctl').forEach(function(x){x.inert=S.mode==='text';});document.querySelectorAll('.tx-ctl').forEach(function(x){x.inert=S.mode==='icon';});
  [['#fonts','k',S.ff],['#fw','v',S.fw],['#mode','v',S.mode]].forEach(function(g){document.querySelectorAll(g[0]+' button').forEach(function(b){b.classList.toggle('on',b.dataset[g[1]]==g[2]);});});
  $('uc').classList.toggle('on',S.uc);$('uc').setAttribute('aria-pressed',S.uc);scr.tz.style.display=S.mode==='text'?'':'none';
  document.querySelectorAll('#grads button').forEach(function(b,i){var g=GR[i-1];b.classList.toggle('on',i===0?!S.gd:!!(S.gd&&g&&S.bg===g.a&&S.g2===g.b));});$('grads').firstChild.style.background=S.bg;
  if(S.mode==='text'&&$('panes').querySelector('.pane.on[data-pane=icon]')){document.querySelectorAll('[data-tab]').forEach(function(x){x.classList.toggle('on',x.dataset.tab==='text');x.setAttribute('aria-selected',x.dataset.tab==='text');});document.querySelectorAll('.pane').forEach(function(q){q.classList.toggle('on',q.dataset.pane==='text');});$('mt').textContent='Text';}
  if(document.activeElement!==$('tx'))$('tx').value=S.tx;
  document.querySelectorAll('#shape button').forEach(function(b){b.classList.toggle('on',+b.dataset.r===S.rad);});
  $('undo').disabled=hi<=0;$('redo').disabled=hi>=hist.length-1;if(document.body.classList.contains('mo'))$('mth').innerHTML=build(S,40);
  $('wrap').classList.toggle('tr',S.tr);$('tr').classList.toggle('on',S.tr);$('tr').setAttribute('aria-pressed',S.tr);
  SL.forEach(function(d){var k=d[0],el=scr[k],v=el.querySelector('.vl');el.querySelector('.fill').style.width=(S[k]-d[2])/(d[3]-d[2])*100+'%';el.setAttribute('aria-valuenow',S[k]);if(v)v.textContent=S[k]+d[5];});
  document.querySelectorAll('.sw').forEach(function(b){b.querySelector('i').style.background=S[b.dataset.k];b.querySelector('span').textContent=S[b.dataset.k];b.setAttribute('aria-label',b.parentNode.querySelector('label').textContent+' color '+S[b.dataset.k]);});
}
$('tr').addEventListener('click',function(){S.tr=!S.tr;sched();});
$('presets').innerHTML=PRESETS.map(function(p,i){return'<button class="pre" data-i="'+i+'">'+build(Object.assign({},DEF,p),48)+'</button>';}).join('');
$('presets').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;Object.assign(S,PRESETS[+b.dataset.i],{tr:false,gd:false});sched();});
function rc(){return'#'+Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0');}
$('rnd').addEventListener('click',function(){S.icon=names[Math.floor(Math.random()*names.length)];S.bg=rc();S.bc=rc();S.fc=rc();S.fo=Math.round(Math.random()*100);S.rot=Math.round(Math.random()*40-20);S.rad=[0,64,128,256][Math.floor(Math.random()*4)];S.tr=false;sched();});
/* immersive tilt */
var tilt=$('tilt');
if(!matchMedia('(prefers-reduced-motion:reduce)').matches&&matchMedia('(hover:hover)').matches){
  document.querySelector('.stage').addEventListener('pointermove',function(e){var r=this.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform='rotateY('+(x*8)+'deg) rotateX('+(-y*8)+'deg)';});
  document.querySelector('.stage').addEventListener('pointerleave',function(){tilt.style.transform='';});}
/* ultra-fast direct Canvas 2D export engine */
function seg(id,key,num){$(id).addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;this.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b);});EX[key]=num?+b.dataset.v:b.dataset.v;$('resw').style.display=EX.fmt==='svg'?'none':'';});}
seg('fmt','fmt');seg('res','res',true);
function msg(t){$('msg').textContent=t;clearTimeout(msg.t);msg.t=setTimeout(function(){$('msg').textContent='';},4000);}

function drawRoundedRect(c,x,y,w,h,r){
  r=Math.min(r,w/2,h/2);
  c.beginPath();
  c.moveTo(x+r,y);
  c.arcTo(x+w,y,x+w,y+h,r);
  c.arcTo(x+w,y+h,x,y+h,r);
  c.arcTo(x,y+h,x,y,r);
  c.arcTo(x,y,x+w,y,r);
  c.closePath();
}

function drawCanvasText(c,s,L){
  if(!L.text)return;
  var F=FONTS[s.ff]||FONTS.sans,sp=s.ls/100*L.fs;
  c.save();
  c.font=s.fw+' '+L.fs+'px '+F.f;
  c.fillStyle=s.tc;
  c.textBaseline='alphabetic';
  if(Math.abs(sp)<0.05){
    c.textAlign='center';
    c.fillText(L.text,256,L.ty);
  }else{
    c.textAlign='left';
    var chars=Array.from(L.text);
    var widths=chars.map(function(ch){return c.measureText(ch).width;});
    var totalW=widths.reduce(function(a,b){return a+b;},0)+sp*Math.max(0,chars.length-1);
    var curX=256-totalW/2;
    for(var i=0;i<chars.length;i++){
      c.fillText(chars[i],curX,L.ty);
      curX+=widths[i]+sp;
    }
  }
  c.restore();
}

function paintToCanvas(s,px,mime,iconImg){
  var cv=document.createElement('canvas');
  cv.width=cv.height=px;
  var c=cv.getContext('2d',{alpha:mime!=='image/jpeg'});
  c.imageSmoothingEnabled=true;
  c.imageSmoothingQuality='high';
  if(mime==='image/jpeg'){
    c.fillStyle='#ffffff';
    c.fillRect(0,0,px,px);
  }
  var scale=px/512,sc=1-2*s.mg/100;
  c.save();
  c.scale(scale,scale);
  c.translate(256,256);
  c.scale(sc,sc);
  c.translate(-256,-256);
  if(!s.tr){
    drawRoundedRect(c,0,0,512,512,s.rad);
    if(s.gd){
      var rad=(s.ga-90)*Math.PI/180;
      var cx=256,cy=256,r=256*(Math.abs(Math.cos(rad))+Math.abs(Math.sin(rad)));
      var grd=c.createLinearGradient(cx-Math.cos(rad)*r,cy-Math.sin(rad)*r,cx+Math.cos(rad)*r,cy+Math.sin(rad)*r);
      grd.addColorStop(0,s.bg);
      grd.addColorStop(1,s.g2);
      c.fillStyle=grd;
    }else{
      c.fillStyle=s.bg;
    }
    c.fill();
  }
  var L=layout(s);
  if(L.icon&&iconImg&&iconImg.complete&&iconImg.naturalWidth>0){
    c.save();
    c.translate(L.cx,L.cy);
    c.rotate(s.rot*Math.PI/180);
    var isc=s.size/24;
    c.drawImage(iconImg,-12*isc,-12*isc,24*isc,24*isc);
    c.restore();
  }
  drawCanvasText(c,s,L);
  c.restore();
  return cv;
}

function dataURLToBlob(du){
  var arr=du.split(','),mime=arr[0].match(/:(.*?);/)[1],bin=atob(arr[1]),len=bin.length,u8=new Uint8Array(len);
  for(var i=0;i<len;i++)u8[i]=bin.charCodeAt(i);
  return new Blob([u8],{type:mime});
}

function triggerDownload(blob,name){
  var u=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=u;a.download=name;a.rel='noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(function(){URL.revokeObjectURL(u);},20000);
}

function raster(px,mime){
  return new Promise(function(res,rej){
    updateIconCache();
    var finish=function(){
      try{
        var cv=paintToCanvas(S,px,mime,cachedIconImg);
        var b=dataURLToBlob(cv.toDataURL(mime,0.95));
        res(b);
      }catch(e){rej(e);}
    };
    if(S.mode==='text'||(cachedIconImg.complete&&cachedIconImg.naturalWidth>0)){
      finish();
    }else{
      var img=new Image();
      var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512" fill="'+S.fc+'" fill-opacity="'+(S.fo/100)+'" stroke="'+S.bc+'" stroke-width="'+S.bw+'" stroke-linecap="round" stroke-linejoin="round">'+inner(S.icon)+'</svg>';
      img.onload=function(){cachedIconImg=img;finish();};
      img.onerror=rej;
      img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
    }
  });
}

$('dl').addEventListener('click',function(){
  var b=this,f=EX.fmt,name='luse-'+kebab(S.icon),t0=performance.now();
  var targetRes=EX.res;
  if(mob.matches&&targetRes>2048)targetRes=2048;
  var fname=name+(f==='svg'?'':'-'+targetRes)+'.'+f;
  if(f==='svg'){
    var svgBlob=new Blob([build(S,1024,false,true)],{type:'image/svg+xml;charset=utf-8'});
    triggerDownload(svgBlob,fname);
    msg('Exported SVG in '+Math.max(1,Math.round(performance.now()-t0))+' ms');
    return;
  }
  var mime={png:'image/png',webp:'image/webp',jpg:'image/jpeg'}[f];
  updateIconCache();
  if(S.mode==='text'||(cachedIconImg.complete&&cachedIconImg.naturalWidth>0)){
    try{
      var cv=paintToCanvas(S,targetRes,mime,cachedIconImg);
      var blob=dataURLToBlob(cv.toDataURL(mime,0.95));
      triggerDownload(blob,fname);
      msg('Exported '+(blob.size/1024|0)+' KB in '+Math.max(1,Math.round(performance.now()-t0))+' ms');
      return;
    }catch(e){
      if(targetRes>1024){
        try{
          var cv2=paintToCanvas(S,1024,mime,cachedIconImg);
          var blob2=dataURLToBlob(cv2.toDataURL(mime,0.95));
          triggerDownload(blob2,name+'-1024.'+f);
          msg('Exported '+(blob2.size/1024|0)+' KB in '+Math.max(1,Math.round(performance.now()-t0))+' ms');
          return;
        }catch(e2){}
      }
    }
  }
  $('dlt').textContent='Rendering…';b.disabled=true;
  raster(targetRes,mime).then(function(blob){
    triggerDownload(blob,fname);
    msg('Exported '+(blob.size/1024|0)+' KB in '+Math.max(1,Math.round(performance.now()-t0))+' ms');
  }).catch(function(){
    msg('Export failed – try a lower resolution.');
  }).then(function(){
    $('dlt').textContent='Export';b.disabled=false;
  });
});
$('cps').addEventListener('click',function(){try{navigator.clipboard.writeText(build(S,512,false,true)).then(function(){msg('SVG copied');},function(){msg('Clipboard blocked');});}catch(e){msg('Clipboard blocked');}});
$('cpp').addEventListener('click',function(){try{navigator.clipboard.write([new ClipboardItem({'image/png':raster(Math.min(EX.res,2048),'image/png')})]).then(function(){msg('PNG copied');},function(){msg('Clipboard blocked');});}catch(e){msg('Clipboard blocked');}});
/* features */

$('shape').addEventListener('click',function(e){var b=e.target.closest('button');if(b){S.rad=+b.dataset.r;sched();}});
$('tx').addEventListener('input',function(){S.tx=this.value;sched();});
function snap(){ht=0;var j=JSON.stringify(S);if(j===hist[hi])return;hist=hist.slice(0,hi+1);hist.push(j);if(hist.length>80)hist.shift();hi=hist.length-1;render();}
function go(d){if(ht){clearTimeout(ht);snap();}var n=hi+d;if(n<0||n>=hist.length)return;hi=n;Object.assign(S,DEF,JSON.parse(hist[hi]));lastIcon='';render();}
$('undo').addEventListener('click',function(){go(-1);});$('redo').addEventListener('click',function(){go(1);});
document.addEventListener('keydown',function(e){if(!(e.metaKey||e.ctrlKey)||e.target.tagName==='INPUT')return;var k=e.key.toLowerCase();if(k==='z'){e.preventDefault();go(e.shiftKey?1:-1);}else if(k==='y'){e.preventDefault();go(1);}});
var SAVED=[];try{SAVED=JSON.parse(localStorage.getItem('sg-saved')||'[]');}catch(e){}
function paintSaved(){$('saved').innerHTML=SAVED.length?SAVED.map(function(d,i){return'<span class="sv"><button class="pre" data-i="'+i+'" aria-label="Open saved design '+(i+1)+'">'+build(d,48)+'</button><b data-d="'+i+'" role="button" aria-label="Delete saved design">'+ic('X')+'</b></span>';}).join(''):'<small style="color:var(--mute)">Nothing saved yet</small>';}
function persist(){try{localStorage.setItem('sg-saved',JSON.stringify(SAVED));}catch(e){msg('Saving is unavailable here');}}
$('save').addEventListener('click',function(){SAVED.unshift(JSON.parse(JSON.stringify(S)));SAVED=SAVED.slice(0,24);persist();paintSaved();msg('Saved on this device');});
$('saved').addEventListener('click',function(e){var d=e.target.closest('b'),b=e.target.closest('button');if(d){SAVED.splice(+d.dataset.d,1);persist();paintSaved();}else if(b){Object.assign(S,DEF,SAVED[+b.dataset.i]);lastIcon='';sched();}});
paintSaved();
$('share').addEventListener('click',function(){var u=location.href.split('#')[0]+'#d='+encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(S)))));try{navigator.clipboard.writeText(u).then(function(){msg('Link copied');},function(){msg('Clipboard blocked');});}catch(e){msg('Clipboard blocked');}});
(function(){var m=/d=([^&]+)/.exec(location.hash);if(!m)return;try{Object.assign(S,DEF,JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(m[1]))))));}catch(e){}})();
$('fav').addEventListener('click',function(){if(!window.JSZip){msg('Zip library unavailable');return;}var z=new JSZip(),b=this;b.disabled=true;msg('Building favicon pack…');
  Promise.all([16,32,48,64,128,180,192,256,512].map(function(n){return raster(n,'image/png').then(function(bl){z.file('favicon-'+n+'.png',bl);});})).then(function(){z.file('icon.svg',build(S,512,false,true));return z.generateAsync({type:'blob'});}).then(function(bl){triggerDownload(bl,'luse-favicons.zip');msg('Favicon pack ready');}).catch(function(){msg('Pack failed');}).then(function(){b.disabled=false;});});
var dq=matchMedia('(prefers-color-scheme:dark)'),th='system';try{th=localStorage.getItem('sg-th')||'system';}catch(e){}if(th!=='light'&&th!=='dark'&&th!=='system')th='system';
function eff(){return(th==='light'||th==='dark')?th:(dq.matches?'dark':'light');}
function setTh(){
  var e=eff(),icMap={system:'Monitor',light:'Sun',dark:'Moon'},lbMap={system:'System',light:'Light',dark:'Dark'};
  document.documentElement.setAttribute('data-theme',e);
  $('thm').innerHTML=ic(icMap[th]||'Monitor');
  var l='Appearance: '+(lbMap[th]||'System');
  $('thm').setAttribute('aria-label',l);
  $('thm').title=l;
  document.querySelectorAll('#tlist .topt').forEach(function(b){
    var on=b.dataset.th===th;
    b.classList.toggle('on',on);
    b.setAttribute('aria-checked',on?'true':'false');
  });
}
function tmo(on){document.body.classList.toggle('tmo',on);if(on){imo(false);mo(false);setTimeout(function(){$('txx').focus({preventScroll:true});},60);}}
$('thm').addEventListener('click',function(){tmo(!document.body.classList.contains('tmo'));});
$('txx').addEventListener('click',function(){tmo(false);});
$('tscrim').addEventListener('pointerdown',function(){tmo(false);});
$('tlist').addEventListener('click',function(e){
  var b=e.target.closest('.topt');
  if(!b)return;
  th=b.dataset.th;
  try{localStorage.setItem('sg-th',th);}catch(err){}
  setTh();
  setTimeout(function(){tmo(false);},160);
});
if(dq.addEventListener)dq.addEventListener('change',function(){if(th==='system')setTh();});setTh();
var GR=[{a:'#ff9a3c',b:'#ff3d81',g:135,k:'#ffffff'},{a:'#22d3ee',b:'#2563eb',g:135,k:'#ffffff'},{a:'#34d399',b:'#6366f1',g:150,k:'#ffffff'},{a:'#a855f7',b:'#4338ca',g:135,k:'#ffffff'},{a:'#ffe5d0',b:'#ffb199',g:135,k:'#3b1d12'},{a:'#2a2a3c',b:'#0b0b12',g:160,k:'#ffffff'},{a:'#d9f99d',b:'#34d399',g:135,k:'#06402b'},{a:'#f9a8d4',b:'#f43f5e',g:135,k:'#ffffff'}],GN=['Sunset','Ocean','Aurora','Grape','Peach','Midnight','Mint','Candy'];
$('grads').innerHTML='<button class="pre" aria-label="Solid background" title="Solid"></button>'+GR.map(function(g,i){return'<button class="pre" title="'+GN[i]+'" aria-label="'+GN[i]+' gradient" style="background:linear-gradient(135deg,'+g.a+','+g.b+')"></button>';}).join('');
$('grads').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var i=[].indexOf.call(this.children,b)-1;if(i<0)S.gd=false;else{var g=GR[i];S.gd=true;S.bg=g.a;S.g2=g.b;S.ga=g.g;S.bc=S.fc=S.tc=g.k;}sched();});
$('fonts').innerHTML=Object.keys(FONTS).map(function(k){var f=FONTS[k];return'<button class="fchip" data-k="'+k+'" style="font-family:'+f.f+';font-weight:'+f.w+'"><b>Aa</b><small>'+f.n+'</small></button>';}).join('');
$('fonts').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var f=FONTS[b.dataset.k];S.ff=b.dataset.k;S.fw=f.w;S.ls=f.ls;S.uc=f.uc;sched();});
$('fw').addEventListener('click',function(e){var b=e.target.closest('button');if(b){S.fw=+b.dataset.v;sched();}});
$('uc').addEventListener('click',function(){S.uc=!S.uc;sched();});
$('mode').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;S.mode=b.dataset.v;if(S.mode!=='icon'&&!S.tx)S.tx='Brand';sched();});
document.querySelectorAll('[data-ic]').forEach(function(el){el.insertAdjacentHTML('afterbegin',ic(el.dataset.ic));});
var mob=matchMedia('(max-width:1024px)'),TT={icon:'Icon',adjust:'Adjust',style:'Style',text:'Text',export:'Export'};
function mo(on){var pn=$('panes');document.body.classList.toggle('mo',on);pn.setAttribute('role',on?'dialog':'group');if(on){imo(false);tmo(false);pn.setAttribute('aria-modal','true');render();}else pn.removeAttribute('aria-modal');document.querySelectorAll('[data-tab]').forEach(function(x){x.classList.toggle('open',on&&x.classList.contains('on'));});pop.hidden=true;if(on)setTimeout(function(){$('mx').focus({preventScroll:true});},60);}
document.querySelectorAll('[data-tab]').forEach(function(t){t.addEventListener('click',function(){var was=t.classList.contains('on'),open=document.body.classList.contains('mo');
  document.querySelectorAll('[data-tab]').forEach(function(x){x.classList.toggle('on',x===t);x.setAttribute('aria-selected',x===t);});
  document.querySelectorAll('.pane').forEach(function(q){q.classList.toggle('on',q.dataset.pane===t.dataset.tab);});
  $('mt').textContent=TT[t.dataset.tab];$('panes').scrollTop=0;
  if(mob.matches)mo(!(was&&open));else pop.hidden=true;});});
function imo(on){document.body.classList.toggle('imo',on);if(on){tmo(false);mo(false);setTimeout(function(){$('ix').focus({preventScroll:true});},60);}}
$('inf').addEventListener('click',function(){imo(!document.body.classList.contains('imo'));});
$('ix').addEventListener('click',function(){imo(false);});
$('iscrim').addEventListener('pointerdown',function(){imo(false);});
$('mx').addEventListener('click',function(){mo(false);});$('scrim').addEventListener('pointerdown',function(){mo(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(document.body.classList.contains('tmo'))tmo(false);else if(document.body.classList.contains('imo'))imo(false);else if(document.body.classList.contains('mo'))mo(false);}});
if(mob.addEventListener)mob.addEventListener('change',function(){mo(false);});
document.addEventListener('keydown',function(e){if(e.key!=='Tab'||!document.body.classList.contains('mo'))return;var f=[].slice.call($('panes').querySelectorAll('button,input,[tabindex="0"],a[href]')).filter(function(x){return x.offsetParent;});if(!f.length)return;var a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}});
hist=[JSON.stringify(S)];
if(!names.length)$('icons').innerHTML='<small>Icon library failed to load.</small>';
if(names.length&&names.indexOf(S.icon)<0)S.icon=names[0];
listIcons('');render();
})();
