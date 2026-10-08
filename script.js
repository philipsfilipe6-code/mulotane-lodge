const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],W='https://wa.me/258848885557?text=';
const ph=(f,a,c='')=>`<div class="ph ${c}"><img src="img/${f}.webp" alt="${a}" loading="lazy" onerror="fb(this)"></div>`;

const IC=(n,c='')=>`<svg class="i ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

/* ===== Conteúdo ===== */
const rooms=[['quarto-twin','Quarto Duplo (2 camas)'],['quarto1','Quarto de Casal'],['suite-redonda','Suíte com Cama Redonda'],['suite-chaise','Suíte Premium']];
$('#rooms').innerHTML=rooms.map(([i,n])=>`<article class="card p0 rv">${ph(i,n)}<div class="in"><h3>${n}</h3><div class="amen">${[['pool','Piscina'],['coffee','Pequeno-almoço incluído'],['wifi','Wi-Fi'],['snow','Ar-condicionado'],['car','Estacionamento']].map(a=>`<span>${IC(a[0])}${a[1]}</span>`).join('')}</div><p class="price" style="margin:10px 0 14px">Preço sob consulta</p><a class="btn" href="${W}${encodeURIComponent('Olá Mulotane Lodge, quero ver disponibilidade: '+n)}">${IC('wa')}Ver Disponibilidade</a></div></article>`).join('');
$$('.tab').forEach(b=>b.onclick=()=>{$$('.tab').forEach(x=>x.classList.toggle('on',x===b));$$('.pane').forEach(p=>p.classList.toggle('hidden',p.dataset.p!==b.dataset.t))});
const dishes=[['Caril de Camarão','Camarão em molho cremoso de coco, com arroz.','1.800 MT','al','🌶️','caril'],['Matapa com Caranguejo','Folhas de mandioca piladas com amendoim e coco.','1.500 MT','al','🥜','matapa'],['Frango Zambeziano','Frango da terra grelhado com piri-piri.','1.400 MT','al','🌶️','frango'],['Pequeno-almoço Mulotane','Ovos, pão, fruta e café. Incluído na estadia.','Incluído','pa','','pequeno'],['Matapa Vegetariana','Matapa com coco, sem carne nem peixe.','Sob consulta','al','🌱🥜','matapa-veg'],['Sumo natural da época','Fruta fresca da região.','Sob consulta','be','🌱','sumo']];
const cats={all:'Todos',pa:'Pequeno-almoço 06:30-10:00',al:'Almoço/Jantar',be:'Bebidas',ve:'Vegetariano'};let cat='all';
const slug=s=>s.split(' ')[0].toLowerCase();
function rm(){$('#chips').innerHTML=Object.entries(cats).map(([k,v])=>`<button data-k="${k}" class="chip ${k===cat?'on':''}">${v}</button>`).join('');
 $$('.chip').forEach(c=>c.onclick=()=>{cat=c.dataset.k;rm()});
 $('#menu').innerHTML=dishes.filter(d=>cat==='all'||d[3]===cat||(cat==='ve'&&d[4].includes('🌱'))).map((d,i)=>`<article class="card p0" style="animation:pin .5s ${i*70}ms backwards">${ph('prato-'+d[5],d[0])}<div class="in"><div class="dish"><h3>${d[0]}</h3><span class="price">${d[2]}</span></div><p class="am">${d[1]}</p><p>${d[4]}</p></div></article>`).join('')}
rm();
$('#exps').innerHTML=[['Jantar à Luz de Velas na Piscina','jantar'],['Churrasco Tradicional para Grupos','churrasco'],['Aula de Matapa com Mamãs da Comunidade','aula']].map(([n,i])=>`<article class="card p0">${ph(i,n)}<div class="in"><h3>${n}</h3><a class="btn" href="${W}${encodeURIComponent('Olá Mulotane Lodge, quero saber mais sobre: '+n)}">${IC('wa')}Perguntar</a></div></article>`).join('');
$('#rb').onclick=()=>{const d=$('#rd').value||'[data]',p=$('#rp').value||'[nº]';open(W+encodeURIComponent(`Olá, quero reservar mesa no restaurante Mulotane para ${d} - ${p} pessoas`),'_blank')};
const g=[['natureza1','c2 rw2'],['piscina','rw2'],['quarto1',''],['entrada',''],['natureza2','rw2'],['suite-redonda','c2'],['balanco',''],['teambuilding','']];
$('#gal').innerHTML=g.map(([i,c])=>`<button class="${c}">${ph(i,'Foto do Mulotane Lodge')}</button>`).join('');
$$('#gal button').forEach(b=>b.onclick=()=>{const im=b.querySelector('img');if(im){$('#lbi').src=im.src;$('#lb').classList.remove('hidden')}});
$('#lb').onclick=()=>$('#lb').classList.add('hidden');addEventListener('keydown',e=>e.key==='Escape'&&$('#lb').classList.add('hidden'));
const t=[['Great get away place for families or couples.','Yakubu A.'],['The service was great. The food was superb','Ipyana M.']];let ti=0;
function st(i){ti=i;$('#tc').innerHTML=`<p>"${t[i][0]}"</p><b>${t[i][1]}</b>`;$('#td').innerHTML=t.map((_,k)=>`<button aria-label="Testemunho ${k+1}" class="${k===i?'on':''}" onclick="st(${k})"></button>`).join('')}
st(0);setInterval(()=>st((ti+1)%t.length),6000);

/* ===== Interação e efeitos ===== */
$('#mb').onclick=()=>$('#nav').classList.toggle('open');$$('#nav a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('open'));
$('#yr').textContent=new Date().getFullYear();
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
$$('.rv').forEach(el=>{const s=[...el.parentElement.children].filter(c=>c.classList.contains('rv'));el.style.transitionDelay=s.indexOf(el)*120+'ms';io.observe(el)});
const prog=$('#prog'),hi=$('.hero-img');
addEventListener('scroll',()=>{const y=scrollY;prog.style.width=y/(document.documentElement.scrollHeight-innerHeight)*100+'%';if(!reduce&&hi&&y<innerHeight)hi.style.translate='0 '+y*.25+'px'},{passive:true});
(function(){if(reduce)return;const c=$('#leaves'),x=c.getContext('2d');let W2,H,L=[];const cl=['#9DBBA0','#B7C9A8','#D9CBA3','#7A9E7E'];
 const rs=()=>{W2=c.width=c.offsetWidth;H=c.height=c.offsetHeight};
 const mk=i=>({x:Math.random()*W2,y:i?Math.random()*H:-20,s:5+Math.random()*7,v:.3+Math.random()*.6,a:Math.random()*6,w:.01+Math.random()*.02,r:Math.random()*6,c:cl[Math.random()*4|0],o:.25+Math.random()*.35});
 rs();addEventListener('resize',rs);L=Array.from({length:innerWidth<640?9:16},()=>mk(1));let on=true;new IntersectionObserver(e=>on=e[0].isIntersecting).observe(c);
 (function f(){if(on){x.clearRect(0,0,W2,H);L.forEach((l,i)=>{l.y+=l.v;l.a+=l.w;l.x+=Math.sin(l.a)*.6;l.r+=.01;if(l.y>H+20)L[i]=mk();x.save();x.translate(l.x,l.y);x.rotate(l.r);x.globalAlpha=l.o;x.fillStyle=l.c;x.beginPath();x.ellipse(0,0,l.s,l.s/2.2,0,0,6.3);x.fill();x.restore()})}requestAnimationFrame(f)})()})();

const up=$('#up');addEventListener('scroll',()=>up.classList.toggle('show',scrollY>700),{passive:true});up.onclick=()=>scrollTo({top:0,behavior:'smooth'});
