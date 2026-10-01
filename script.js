const KEY='461f0ba0-441f-448d-a5b8-a2887b7c7203',EP='https://api.web3forms.com/submit';
const $=(s,r=document)=>r.querySelector(s);
$('#yr').textContent=new Date().getFullYear();

// fade sections in as they scroll into view
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.08});
  document.querySelectorAll('.rv').forEach(e=>io.observe(e));
}else{document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'))}

// contact page: tabs show one quote form at a time (contact.html#gardens opens that tab)
function pick(p){
  document.querySelectorAll('.cform').forEach(x=>x.hidden=x.dataset.p!==p);
  document.querySelectorAll('[data-cf]').forEach(b=>b.setAttribute('aria-selected',b.dataset.cf===p));
}
if($('.cform')){const h=location.hash.slice(1);pick(['rubbish','gardens','pressure'].includes(h)?h:'rubbish')}

document.addEventListener('click',e=>{
  const t=e.target.closest('button,a');if(!t)return;
  if(t.classList.contains('menu')){const o=$('#nav').classList.toggle('open');t.setAttribute('aria-expanded',o)}
  if(t.dataset.sc)$('#'+t.dataset.sc).scrollIntoView({behavior:'smooth'});
  if(t.dataset.cf)pick(t.dataset.cf);
});

// quote forms: sent through Web3Forms
document.addEventListener('submit',async e=>{
  e.preventDefault();
  const f=e.target,m=f.querySelector('.msg'),b=f.querySelector('.sub');
  if(f.querySelector('[name=botcheck]').checked)return;
  const d=new FormData();
  d.append('access_key',KEY);
  d.append('from_name','OzTeen Services website');
  d.append('subject','New quote request: '+f.dataset.svc);
  d.append('Service',f.dataset.svc);
  f.querySelectorAll('.f').forEach(g=>{
    const lg=g.querySelector('legend');
    if(lg){const v=[...g.querySelectorAll('input:checked')].map(i=>i.value);if(v.length)d.append(lg.textContent,v.join(', '))}
    else{const i=g.querySelector('input,textarea');if(i&&i.value)d.append(g.querySelector('label').textContent,i.value)}
  });
  b.disabled=true;m.textContent='Sending...';
  try{
    const r=await fetch(EP,{method:'POST',body:d,headers:{Accept:'application/json'}});
    const j=await r.json();
    if(r.ok&&j.success){f.reset();m.textContent='Thanks! We will send your same-day quote soon.'}
    else{m.textContent='Something went wrong. Please try again.'}
  }catch(x){m.textContent='Could not send. Please try again.'}
  b.disabled=false;
});
