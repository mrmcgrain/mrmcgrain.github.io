
function marquee(strip,track,items,toggle,speed,label){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,selected=null,last=0,position=0;
 const originals=[...items];
 originals.forEach(item=>{const copy=item.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.inert=true;copy.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));track.append(copy);});
 function update(){strip.dataset.paused=String(paused);if(toggle){toggle.textContent=paused?'Resume '+label:'Pause '+label;toggle.setAttribute('aria-pressed',String(paused));}originals.forEach((item,i)=>{const btn=item.querySelector('.review-select');if(btn){btn.setAttribute('aria-pressed',String(i===selected));}});const status=document.querySelector('#review-status');if(label==='scrolling'&&status)status.textContent=paused?'Client Love paused · take your time.':'35 stories of Client Love · scrolling automatically';}
 function resume(){paused=false;selected=null;position=strip.scrollLeft;update();}
 toggle?.addEventListener('click',()=>{if(paused)resume();else{paused=true;update();}});
 originals.forEach((item,i)=>item.addEventListener('click',()=>{if(paused)resume();else{paused=true;selected=i;update();}}));
 strip.addEventListener('touchstart',()=>{paused=true;update();},{passive:true});strip.addEventListener('wheel',()=>{paused=true;update();},{passive:true});strip.addEventListener('keydown',()=>{paused=true;update();});
 reduced.addEventListener('change',()=>{if(reduced.matches){paused=true;update();}});
 function frame(t){const dt=Math.min(t-last||0,40);last=t;if(!paused&&!document.hidden){const cycle=track.children[originals.length].offsetLeft-track.children[0].offsetLeft;position+=dt*speed;if(position>=cycle)position-=cycle;strip.scrollLeft=position;}requestAnimationFrame(frame);}update();requestAnimationFrame(frame);
}
const track=document.querySelector('.review-track');
const reviews=[...track.children];
function fitClientLove(){document.querySelectorAll('.review-select').forEach(card=>{const quote=card.querySelector('.review-quote');let low=4,high=19;for(let i=0;i<12;i++){const size=(low+high)/2;quote.style.fontSize=size+'px';if(quote.scrollHeight>quote.clientHeight+1)high=size;else low=size;}quote.style.fontSize=low+'px';});}
marquee(document.querySelector('#review-scroller'),document.querySelector('.review-track'),reviews,document.querySelector('#review-toggle'),.026,'scrolling');
const gallery=document.querySelector('#gallery');marquee(gallery,gallery,[...gallery.children],document.querySelector('#gallery-toggle'),.035,'photos');

fitClientLove();document.fonts.ready.then(fitClientLove);new ResizeObserver(fitClientLove).observe(document.querySelector("#review-scroller"));
