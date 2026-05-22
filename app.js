const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const grid=$("#grid"),cats=$("#cats"),search=$("#search"),sort=$("#sort"),categoryCards=$("#categoryCards");
const motoDialog=$("#motoDialog"),paymentDialog=$("#paymentDialog"),agencyDialog=$("#agencyDialog"),calcDialog=$("#calcDialog"),loadingDialog=$("#loadingDialog");
let active="Todas",selectedMoto=null,exactCalc=0,roundedCalc=0,paymentType="",selectedBank="",selectedInstallments="",creditDownPayment=0;
const q=n=>"Q"+Number(n||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const roundUp=(n,step=100)=>Math.ceil(Number(n||0)/step)*step;
function paths(n){const v=[n,String(n).toLowerCase(),String(n).toUpperCase()];const e=["webp","png","jpg","jpeg","WEBP","PNG","JPG","JPEG"];const f=["assets/img/motos","assets/img"];let a=[];f.forEach(x=>[...new Set(v)].forEach(y=>e.forEach(z=>a.push(`${x}/${y}.${z}`))));return a}
function img(el,name,alt){let p=paths(name),i=0;el.alt=alt||name;el.onerror=()=>{i++; if(i<p.length)el.src=p[i]; else{el.onerror=null;let d=document.createElement("div");d.className="no-img";d.textContent=alt||name;el.replaceWith(d)}};el.src=p[0]}
function priceHtml(m){return `${m.oldPrice?`<span class="oldPrice">${q(m.oldPrice)}</span>`:""}<span>${q(m.precio)}</span>${m.oldPrice?`<span class="discountTag">Oferta</span>`:""}`}

function categoryInfo(name,count){
  const icons={"Pasolas":"🛵","Trabajo":"🏍️","Línea Z":"⚡","Todo Terreno":"⛰️","ATV's":"🛞","Deportiva":"🏁","Vort-X":"💨","Café Racer":"☕"};
  return {icon:icons[name]||"🏍️", count};
}
function countsByCategory(){
  let c={Todas:motos.length};
  motos.forEach(m=>c[m.categoria]=(c[m.categoria]||0)+1);
  return c;
}
function buildCats(){
  let c=countsByCategory();
  cats.innerHTML=Object.entries(c).map(([k,v])=>`<button class="cat ${k==active?"active":""}" data-cat="${k}">${k} · ${v}</button>`).join("");
  $$(".cat").forEach(b=>b.onclick=()=>{active=b.dataset.cat;buildCats();buildCategoryCards();render();document.querySelector(".catalogHeader").scrollIntoView({behavior:"smooth",block:"start"})});
}
function buildCategoryCards(){
  const c=countsByCategory();
  const items=Object.entries(c).filter(([k])=>k!="Todas");
  categoryCards.innerHTML=items.map(([k,v])=>{
    const info=categoryInfo(k,v);
    return `<button class="categoryTile ${active==k?"active":""}" data-cat="${k}">
      <span class="tileIcon">${info.icon}</span>
      <span class="tileText"><b>${k}</b><small>${v} modelos</small></span>
    </button>`;
  }).join("");
  $$(".categoryTile").forEach(b=>b.onclick=()=>{active=b.dataset.cat;buildCats();buildCategoryCards();render()});
}
function list(){
  let s=search.value.toLowerCase().trim();
  let l=motos.filter(m=>(active=="Todas"||m.categoria==active)&&`${m.nombre} ${m.detalle} ${m.categoria} ${m.sku} ${m.codigo}`.toLowerCase().includes(s));
  if(sort.value=="priceAsc")l.sort((a,b)=>a.precio-b.precio);
  if(sort.value=="priceDesc")l.sort((a,b)=>b.precio-a.precio);
  if(sort.value=="nameAsc")l.sort((a,b)=>a.nombre.localeCompare(b.nombre));
  return l;
}
function cardHtml(m){
  return `<article class="card">
    <span class="tag">${m.categoria}</span>
    <div class="photo"><img loading="lazy"></div>
    <h3>${m.nombre}</h3>
    <p class="detail">${m.detalle}</p>
    <div class="price">${priceHtml(m)}</div>
    <button class="interest">Me interesa esto</button>
  </article>`;
}
function makeCard(m){
  const wrap=document.createElement("div");
  wrap.innerHTML=cardHtml(m);
  const c=wrap.firstElementChild;
  img(c.querySelector("img"),m.img,m.nombre);
  c.onclick=()=>openMoto(m);
  c.querySelector(".interest").onclick=e=>{e.stopPropagation();selectedMoto=m;openPayment()};
  return c;
}
function render(){
  const l=list();
  grid.innerHTML="";
  if(!l.length){grid.innerHTML=`<div class="emptyState">No encontramos motos con esa búsqueda.</div>`;return}
  if(active!="Todas" || search.value.trim()){
    const section=document.createElement("section");
    section.className="categorySection";
    section.innerHTML=`<div class="groupTitle"><div><span>${active=="Todas"?"Resultados":active}</span><h2>${l.length} modelos disponibles</h2></div></div><div class="grid"></div>`;
    const inner=section.querySelector(".grid");
    l.forEach(m=>inner.appendChild(makeCard(m)));
    grid.appendChild(section);
    return;
  }
  const groups={};
  l.forEach(m=>{(groups[m.categoria] ||= []).push(m)});
  Object.entries(groups).forEach(([cat,items])=>{
    const info=categoryInfo(cat,items.length);
    const section=document.createElement("section");
    section.className="categorySection";
    section.innerHTML=`<div class="groupTitle">
      <div class="groupName"><span class="groupIcon">${info.icon}</span><div><span>${cat}</span><h2>${items.length} modelos</h2></div></div>
      <button class="seeGroup" data-cat="${cat}">Ver solo esta categoría</button>
    </div><div class="grid"></div>`;
    section.querySelector(".seeGroup").onclick=()=>{active=cat;buildCats();buildCategoryCards();render();section.scrollIntoView({behavior:"smooth"})};
    const inner=section.querySelector(".grid");
    items.forEach(m=>inner.appendChild(makeCard(m)));
    grid.appendChild(section);
  });
}
function openMoto(m){selectedMoto=m;$("#modalCat").textContent=m.categoria;$("#modalName").textContent=m.nombre;$("#modalDetail").textContent=m.detalle;$("#modalPrice").textContent=q(m.precio);$("#modalOldWrap").innerHTML=m.oldPrice?`<span class="oldModal">${q(m.oldPrice)}</span> <span class="discountTag">Oferta</span>`:"";$("#modalSku").textContent=m.sku;$("#modalCode").textContent=m.codigo;let old=$("#modalImg"),clone=old.cloneNode();old.replaceWith(clone);img(clone,m.img,m.nombre);motoDialog.showModal()}
function resetPayment(){paymentType="";selectedBank="";selectedInstallments="";creditDownPayment=0;$("#paymentOptions").classList.remove("hidden");$("#creditStep").classList.add("hidden");$("#visaBankStep").classList.add("hidden");$("#visaInstallmentStep").classList.add("hidden")}
function paymentLabel(){return paymentType==="credito"?"crédito":paymentType==="visa"?"visa cuotas":paymentType==="contado"?"contado":"información"}
function openPayment(){if(!selectedMoto)return;resetPayment();$("#paymentMotoText").textContent=`Moto seleccionada: ${selectedMoto.nombre} - ${selectedMoto.detalle}`;paymentDialog.showModal()}
function openAgency(){ $("#agencyText").textContent=selectedMoto?`Consulta por ${selectedMoto.nombre} - ${selectedMoto.detalle} · Pago: ${paymentLabel()}`:"Te enviaremos a WhatsApp."; agencyDialog.showModal()}
function buildClientMessage(key,custom){
let a=agencias[key];
if(custom) return custom;
if(!selectedMoto){return `Hola, quiero información del catálogo de motocicletas.\nAgencia seleccionada: ${a.nombre}`}
let lines=[`Hola, me interesa esta moto:`,``,`Moto: ${selectedMoto.nombre}`,`Modelo: ${selectedMoto.detalle}`,`Precio de contado: ${q(selectedMoto.precio)}`,`Tipo de pago: ${paymentLabel()}`];
if(paymentType==="credito")lines.push(`Mínimo de enganche: ${q(creditDownPayment)}`);
if(paymentType==="visa"){lines.push(`Banco de tarjeta: ${selectedBank}`);lines.push(`Cuotas deseadas: ${selectedInstallments}`)}
if(paymentType==="contado")lines.push(`Deseo información para compra de contado.`);
lines.push(`Agencia seleccionada: ${a.nombre}`);
return lines.join("\n");
}
function wa(key,custom){let a=agencias[key];let msg=buildClientMessage(key,custom);try{agencyDialog.close()}catch(e){}try{calcDialog.close()}catch(e){}if(!loadingDialog.open)loadingDialog.showModal();setTimeout(()=>{try{loadingDialog.close()}catch(e){} const url=`https://wa.me/${a.telefono}?text=${encodeURIComponent(msg)}`; window.location.href=url;},1600)}
function calc(){let v=Number($("#calcValue").value||0);exactCalc=v*.15;roundedCalc=roundUp(exactCalc,100);$("#calcExact").textContent=q(exactCalc);$("#calcResult").textContent=q(roundedCalc)}
search.oninput=render;sort.onchange=render;$("#contactBtn").onclick=()=>{selectedMoto=null;openAgency()};$("#calcBtn").onclick=()=>calcDialog.showModal();$("#interestBtn").onclick=openPayment;$("#calcValue").oninput=calc;
$$("[data-close]").forEach(b=>b.onclick=()=>motoDialog.close());$$("[data-close-payment]").forEach(b=>b.onclick=()=>paymentDialog.close());$$("[data-close-agency]").forEach(b=>b.onclick=()=>agencyDialog.close());$$("[data-close-calc]").forEach(b=>b.onclick=()=>calcDialog.close());
$$("[data-agency]").forEach(b=>b.onclick=()=>wa(b.dataset.agency));$$("[data-calc-agency]").forEach(b=>b.onclick=()=>{let val=Number($("#calcValue").value||0);let a=agencias[b.dataset.calcAgency];wa(b.dataset.calcAgency,[`Hola, calculé un enganche.`,``,`Valor de la moto: ${q(val)}`,`15% calculado: ${q(exactCalc)}`,`Enganche redondeado: ${q(roundedCalc)}`,`Agencia seleccionada: ${a.nombre}`].join("\n"))});
$$("[data-pay]").forEach(b=>b.onclick=()=>{paymentType=b.dataset.pay;if(paymentType==="contado"){paymentDialog.close();openAgency()}if(paymentType==="credito"){creditDownPayment=roundUp(selectedMoto.precio*.15,100);$("#creditDownPayment").textContent=q(creditDownPayment);$("#paymentOptions").classList.add("hidden");$("#creditStep").classList.remove("hidden")}if(paymentType==="visa"){$("#paymentOptions").classList.add("hidden");$("#visaBankStep").classList.remove("hidden")}});
$("#creditNext").onclick=()=>{paymentDialog.close();openAgency()}
const banks=["BI","Proamérica","G&T","BAM","Bantrab","Occidente","Banrural","Ficohsa","Micoope","Otros"];$("#bankGrid").innerHTML=banks.map(b=>`<button class="bankBtn" data-bank="${b}">${b}</button>`).join("");$$("[data-bank]").forEach(b=>b.onclick=()=>{selectedBank=b.dataset.bank;$("#visaBankStep").classList.add("hidden");$("#visaInstallmentStep").classList.remove("hidden")});
const months=[6,10,12,15,18];$("#installmentGrid").innerHTML=months.map(m=>`<button class="bankBtn" data-months="${m}">${m} cuotas</button>`).join("");$$("[data-months]").forEach(b=>b.onclick=()=>{selectedInstallments=b.dataset.months;paymentDialog.close();openAgency()});
const heroLogo=$("#heroLogo"),logoList=["assets/img/logo-malacatan.png","assets/img/logo-sanpablo.png"];let logoIndex=0;setInterval(()=>{logoIndex=(logoIndex+1)%logoList.length;heroLogo.classList.remove("logoFade");void heroLogo.offsetWidth;heroLogo.src=logoList[logoIndex];heroLogo.classList.add("logoFade")},6500);
buildCats();buildCategoryCards();render();
