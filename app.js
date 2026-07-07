const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const grid=$("#grid"),search=$("#search"),sort=$("#sort"),categoryCards=$("#categoryCards");
const motoDialog=$("#motoDialog"),paymentDialog=$("#paymentDialog"),agencyDialog=$("#agencyDialog"),calcDialog=$("#calcDialog"),loadingDialog=$("#loadingDialog"),colorDialog=$("#colorDialog");
let active="Todas",selectedMoto=null,selectedProduct=null,exactCalc=0,roundedCalc=0,paymentType="",selectedBank="",selectedInstallments="",creditDownPayment=0;
const q=n=>"Q"+Number(n||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const roundUp=(n,step=100)=>Math.ceil(Number(n||0)/step)*step;

function paths(n){
  const v=[n,String(n).toLowerCase(),String(n).toUpperCase()];
  const e=["jpeg","jpg","JPEG","JPG","webp","png","gif","WEBP","PNG","GIF"];
  const f=["assets/img/motos","assets/img"];
  let a=[];
  f.forEach(x=>[...new Set(v)].forEach(y=>e.forEach(z=>a.push(`${x}/${y}.${z}`))));
  return a;
}

function img(el,name,alt){let p=paths(name),i=0;el.alt=alt||name;el.onerror=()=>{i++; if(i<p.length)el.src=p[i]; else{el.onerror=null;let d=document.createElement("div");d.className="no-img";d.textContent=alt||name;el.replaceWith(d)}};el.src=p[0]}

// ---------- Colores: agrupar variantes del mismo modelo en una sola tarjeta ----------
const colorAbbrev={BLAN:"Blanco",BLANCO:"Blanco",NEG:"Negro",NEGRO:"Negro",N:"Negro",AZUL:"Azul",A:"Azul",ROJO:"Rojo",R:"Rojo",VERDE:"Verde",V:"Verde",GRIS:"Gris",G:"Gris",AMARILLO:"Amarillo",AM:"Amarillo",DORADO:"Dorado",NARANJA:"Naranja",TURQUESA:"Turquesa",MORADO:"Morado",ANARANJADO:"Naranja"};
function titleWord(w){const up=w.toUpperCase();if(colorAbbrev[up])return colorAbbrev[up];return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()}
function colorLabel(m){
  let base=m.nombre.toUpperCase();
  let full=m.detalle.toUpperCase();
  let suf=full.startsWith(base)?full.slice(base.length).trim():full;
  if(!suf)suf=full;
  return suf.split('/').map(seg=>seg.trim().split(/\s+/).filter(Boolean).map(titleWord).join(' ')).join(' / ');
}

const productsAll=(function(){
  const map=new Map();
  motos.forEach(m=>{
    if(!map.has(m.nombre))map.set(m.nombre,{nombre:m.nombre,categoria:m.categoria,variants:[]});
    map.get(m.nombre).variants.push(m);
  });
  return Array.from(map.values()).map(p=>{
    const precios=p.variants.map(v=>v.precio);
    const minP=Math.min(...precios),maxP=Math.max(...precios);
    const cheapest=p.variants.reduce((a,b)=>a.precio<=b.precio?a:b);
    const allAgotada=p.variants.every(v=>v.estado==="Agotada");
    const anyOldPrice=p.variants.some(v=>v.oldPrice);
    return {
      nombre:p.nombre,categoria:p.categoria,variants:p.variants,
      img:cheapest.img,detalle:cheapest.detalle,oldPrice:cheapest.oldPrice,
      precioMin:minP,precioMax:maxP,priceRange:minP!==maxP,anyOldPrice,
      estado:allAgotada?"Agotada":undefined,
      searchBlob:[p.nombre,p.categoria,...p.variants.flatMap(v=>[v.detalle,v.sku,v.codigo])].join(' ').toLowerCase()
    };
  });
})();

function priceHtml(p){
  if(p.priceRange)return `<span class="fromTag">Desde</span><span>${q(p.precioMin)}</span>`;
  return `${p.oldPrice?`<span class="oldPrice">${q(p.oldPrice)}</span>`:""}<span>${q(p.precioMin)}</span>${p.oldPrice?`<span class="discountTag">Oferta</span>`:""}`;
}

function categoryInfo(name,count){
  const icons={"Pasolas":"🛵","Trabajo":"🏍️","Línea Z":"⚡","Todo Terreno":"⛰️","ATV's":"🛞","Deportiva":"🏁","Vort-X":"💨","Café Racer":"☕"};
  return {icon:icons[name]||"🏍️", count};
}

function countsByCategory(){
  let c={Todas:productsAll.length};
  productsAll.forEach(p=>c[p.categoria]=(c[p.categoria]||0)+1);
  return c;
}

function buildCategoryCards(){
  const c=countsByCategory();
  const items=Object.entries(c);
  categoryCards.innerHTML=items.map(([k,v])=>{
    const info=categoryInfo(k,v);
    const displayIcon = k === "Todas" ? "✨" : info.icon;
    const displayLabel = k === "Todas" ? "Ver Todo" : k;
    return `<button class="categoryTile ${active==k?"active":""}" data-cat="${k}">
      <span class="tileIcon">${displayIcon}</span>
      <span class="tileText"><b>${displayLabel}</b><small>${v} modelos</small></span>
    </button>`;
  }).join("");

  $$(".categoryTile").forEach(b=>b.onclick=()=>{
    active=b.dataset.cat;
    buildCategoryCards();
    render();
    document.querySelector(".catalogHeader").scrollIntoView({behavior:"smooth",block:"start"});
  });
}

function list(){
  let s=search.value.toLowerCase().trim();
  let l=productsAll.filter(p=>(active=="Todas"||p.categoria==active)&&p.searchBlob.includes(s));
  if(sort.value=="priceAsc")l.sort((a,b)=>a.precioMin-b.precioMin);
  if(sort.value=="priceDesc")l.sort((a,b)=>b.precioMin-a.precioMin);
  if(sort.value=="nameAsc")l.sort((a,b)=>a.nombre.localeCompare(b.nombre));
  return l;
}

function cardHtml(p){
  const isAgotada = p.estado === "Agotada";
  const multi = p.variants.length>1;
  return `<article class="card ${isAgotada ? 'is-agotada' : ''}">
    ${isAgotada ? '<div class="badgeAgotado">Agotada</div>' : ''}
    <span class="tag">${p.categoria}</span>
    <div class="photo"><img loading="lazy"></div>
    <h3>${p.nombre}</h3>
    <p class="detail">${multi ? `${p.variants.length} colores disponibles` : (p.detalle)}</p>
    <div class="price">${priceHtml(p)}</div>
    <button class="interest" ${isAgotada ? 'disabled' : ''}>${isAgotada ? 'Agotada' : 'Me interesa esto'}</button>
  </article>`;
}

function makeCard(p){
  const wrap=document.createElement("div");
  wrap.innerHTML=cardHtml(p);
  const c=wrap.firstElementChild;
  img(c.querySelector("img"),p.img,p.nombre);

  if(p.estado !== "Agotada") {
    c.onclick=()=>openMoto(p);
    c.querySelector(".interest").onclick=e=>{e.stopPropagation();startInterest(p)};
  } else {
    c.onclick=()=>openMoto(p);
  }
  return c;
}

function updateDockSocials(currentLogoSrc) {
  const container = $("#dynamicSocialBtns");
  if(!container) return;
  let key = currentLogoSrc && currentLogoSrc.includes("sanpablo") ? "sanpablo" : "malacatan";
  const dataAgencia = agencias[key];
  let html = "";
  if(dataAgencia.facebook) html += `<button class="dockBtn fb" onclick="window.open('${dataAgencia.facebook}', '_blank')"><span>📘</span><b>Facebook</b></button>`;
  if(dataAgencia.tiktok) html += `<button class="dockBtn tk" onclick="window.open('${dataAgencia.tiktok}', '_blank')"><span>🎵</span><b>TikTok</b></button>`;
  container.innerHTML = html;
}

function render(){
  const l=list();
  grid.innerHTML="";
  if(search.value.trim() !== "") {
    $("#novedades").classList.add("hidden");
  } else {
    $("#novedades").classList.remove("hidden");
  }
  if(!l.length){grid.innerHTML=`<div class="emptyState">No encontramos motos con esa búsqueda.</div>`;return}
  if(active!="Todas" || search.value.trim()){
    const section=document.createElement("section");
    section.className="categorySection";
    section.innerHTML=`<div class="groupTitle"><div><span>${active=="Todas"?"Resultados":active}</span><h2>${l.length} modelos disponibles</h2></div></div><div class="grid"></div>`;
    const inner=section.querySelector(".grid");
    l.forEach(p=>inner.appendChild(makeCard(p)));
    grid.appendChild(section);
    return;
  }
  const groups={};
  l.forEach(p=>{(groups[p.categoria] ||= []).push(p)});
  Object.entries(groups).forEach(([cat,items])=>{
    const info=categoryInfo(cat,items.length);
    const section=document.createElement("section");
    section.className="categorySection";
    section.innerHTML=`<div class="groupTitle">
      <div class="groupName"><span class="groupIcon">${info.icon}</span><div><span>${cat}</span><h2>${items.length} modelos</h2></div></div>
      <button class="seeGroup" data-cat="${cat}">Ver solo esta categoría</button>
    </div><div class="grid"></div>`;
    section.querySelector(".seeGroup").onclick=()=>{active=cat;buildCategoryCards();render();section.scrollIntoView({behavior:"smooth"})};
    const inner=section.querySelector(".grid");
    items.forEach(p=>inner.appendChild(makeCard(p)));
    grid.appendChild(section);
  });
}

// ---------- Ficha técnica básica ----------
const specLabels={motor:"Motor",cilindrada:"Cilindrada",potencia:"Potencia máxima",torque:"Torque máximo",velocidadMax:"Velocidad máxima",transmision:"Transmisión",frenos:"Frenos",suspension:"Suspensión",arranque:"Sistema de arranque",rendimiento:"Rendimiento",cargaMax:"Capacidad de carga"};

function renderSpecs(nombre){
  const s=specs[nombre];
  const box=$("#specsBox");
  if(!s){box.innerHTML=`<p class="muted">Ficha técnica no disponible por el momento. Consulta con la agencia para más detalles.</p>`;return}
  let rows="";
  Object.keys(specLabels).forEach(k=>{
    if(s[k])rows+=`<div class="specRow"><span>${specLabels[k]}</span><b>${s[k]}</b></div>`;
  });
  box.innerHTML=`
    ${s.uso?`<p class="specUso">${s.uso}</p>`:""}
    ${rows?`<div class="specGrid">${rows}</div>`:""}
    ${s.nota?`<p class="specNota">⚠️ ${s.nota}</p>`:""}
    <a class="specLink" href="https://www.italika.com.gt/modelos/modelo.html?slung=${encodeURIComponent(nombre)}" target="_blank" rel="noopener">Ver ficha completa en italika.com.gt ↗</a>
  `;
}

function openMoto(p){
  selectedProduct=p;
  const multi=p.variants.length>1;
  $("#modalCat").textContent=p.categoria;
  $("#modalName").textContent=p.nombre;
  $("#modalDetail").textContent= multi ? `Disponible en: ${p.variants.map(v=>colorLabel(v)).join(' · ')}` : p.detalle;
  $("#modalPrice").innerHTML=priceHtml(p);
  $("#modalOldWrap").innerHTML=(!p.priceRange && p.oldPrice)?`<span class="oldModal">${q(p.oldPrice)}</span> <span class="discountTag">Oferta</span>`:"";
  $("#modalSku").textContent= multi ? "Varía según color" : p.variants[0].sku;
  $("#modalCode").textContent= multi ? "Varía según color" : p.variants[0].codigo;

  renderSpecs(p.nombre);

  let old=$("#modalImg"),clone=old.cloneNode();
  old.replaceWith(clone);
  img(clone,p.img,p.nombre);

  const interestBtn = $("#interestBtn");
  if(p.estado === "Agotada") {
    interestBtn.textContent = "Agotada temporalmente";
    interestBtn.style.background = "#6b7280";
    interestBtn.disabled = true;
  } else {
    interestBtn.textContent = "Me interesa esto";
    interestBtn.style.background = "";
    interestBtn.disabled = false;
  }

  motoDialog.showModal();
}

// ---------- Flujo: preguntar color antes de continuar ----------
function startInterest(p){
  if(!p || p.estado === "Agotada")return;
  selectedProduct=p;
  if(p.variants.length>1){
    try{motoDialog.close()}catch(e){}
    $("#colorMotoText").textContent=`${p.nombre} · elige el color que te interesa`;
    $("#colorGrid").innerHTML=p.variants.map((v,i)=>{
      const agot=v.estado==="Agotada";
      return `<button class="bankBtn colorOptBtn" ${agot?'disabled':''} data-idx="${i}">${colorLabel(v)}${agot?' (Agotado)':''}</button>`;
    }).join("");
    $$(".colorOptBtn").forEach(b=>b.onclick=()=>{
      selectedMoto=p.variants[Number(b.dataset.idx)];
      colorDialog.close();
      openPayment();
    });
    colorDialog.showModal();
  } else {
    selectedMoto=p.variants[0];
    openPayment();
  }
}

function resetPayment(){paymentType="";selectedBank="";selectedInstallments="";creditDownPayment=0;$("#paymentOptions").classList.remove("hidden");$("#creditStep").classList.add("hidden");$("#visaBankStep").classList.add("hidden");$("#visaInstallmentStep").classList.add("hidden")}
function paymentLabel(){return paymentType==="credito"?"crédito":paymentType==="visa"?"visa cuotas":paymentType==="contado"?"contado":"información"}
function openPayment(){if(!selectedMoto || selectedMoto.estado === "Agotada")return;resetPayment();try{motoDialog.close()}catch(e){}$("#paymentMotoText").textContent=`Moto seleccionada: ${selectedMoto.nombre} - ${colorLabel(selectedMoto)}`;paymentDialog.showModal()}
function openAgency(){ $("#agencyText").textContent=selectedMoto?`Consulta por ${selectedMoto.nombre} - ${colorLabel(selectedMoto)} · Pago: ${paymentLabel()}`:"Te enviaremos a WhatsApp."; agencyDialog.showModal()}

function hasColorChoice(m){return m && motos.filter(x=>x.nombre===m.nombre).length>1}

function buildClientMessage(key,custom){
  let a=agencias[key];
  if(custom) return custom;
  if(!selectedMoto){return `Hola, quiero información del catálogo de motocicletas.\nAgencia seleccionada: ${a.nombre}`}
  let lines=[`Hola, me interesa esta moto:`,``,`Moto: ${selectedMoto.nombre}`,`Modelo: ${selectedMoto.detalle}`];
  if(hasColorChoice(selectedMoto))lines.push(`Color deseado: ${colorLabel(selectedMoto)}`);
  lines.push(`Precio de contado: ${q(selectedMoto.precio)}`,`Tipo de pago: ${paymentLabel()}`);
  if(paymentType==="credito")lines.push(`Mínimo de enganche: ${q(creditDownPayment)}`);
  if(paymentType==="visa"){lines.push(`Banco de tarjeta: ${selectedBank}`);lines.push(`Cuotas deseadas: ${selectedInstallments}`)}
  if(paymentType==="contado")lines.push(`Deseo información para compra de contado.`);
  lines.push(`Agencia seleccionada: ${a.nombre}`);
  return lines.join("\n");
}

function wa(key,custom){let a=agencias[key];let msg=buildClientMessage(key,custom);try{agencyDialog.close()}catch(e){}try{calcDialog.close()}catch(e){}if(!loadingDialog.open)loadingDialog.showModal();setTimeout(()=>{try{loadingDialog.close()}catch(e){} const url=`https://wa.me/${a.telefono}?text=${encodeURIComponent(msg)}`; window.location.href=url;},1600)}
function calc(){let v=Number($("#calcValue").value||0);exactCalc=v*.15;roundedCalc=roundUp(exactCalc,100);$("#calcExact").textContent=q(exactCalc);$("#calcResult").textContent=q(roundedCalc)}

search.oninput=render;sort.onchange=render;$("#contactBtn").onclick=()=>{selectedMoto=null;openAgency()};$("#calcBtn").onclick=()=>calcDialog.showModal();$("#interestBtn").onclick=()=>startInterest(selectedProduct);$("#calcValue").oninput=calc;
$$("[data-close]").forEach(b=>b.onclick=()=>motoDialog.close());$$("[data-close-payment]").forEach(b=>b.onclick=()=>paymentDialog.close());$$("[data-close-agency]").forEach(b=>b.onclick=()=>agencyDialog.close());$$("[data-close-calc]").forEach(b=>b.onclick=()=>calcDialog.close());$$("[data-close-color]").forEach(b=>b.onclick=()=>colorDialog.close());
$$("[data-agency]").forEach(b=>b.onclick=()=>wa(b.dataset.agency));$$("[data-calc-agency]").forEach(b=>b.onclick=()=>{let val=Number($("#calcValue").value||0);let a=agencias[b.dataset.calcAgency];wa(b.dataset.calcAgency,[`Hola, calculé un enganche.`,``,`Valor de la moto: ${q(val)}`,`15% calculado: ${q(exactCalc)}`,`Enganche redondeado: ${q(roundedCalc)}`,`Agencia seleccionada: ${a.nombre}`].join("\n"))});
$$("[data-pay]").forEach(b=>b.onclick=()=>{paymentType=b.dataset.pay;if(paymentType==="contado"){paymentDialog.close();openAgency()}if(paymentType==="credito"){creditDownPayment=roundUp(selectedMoto.precio*.15,100);$("#creditDownPayment").textContent=q(creditDownPayment);$("#paymentOptions").classList.add("hidden");$("#creditStep").classList.remove("hidden")}if(paymentType==="visa"){$("#paymentOptions").classList.add("hidden");$("#visaBankStep").classList.remove("hidden")}});
$("#creditNext").onclick=()=>{paymentDialog.close();openAgency()}

const banks=["BI","Proamérica","G&T","BAM","Bantrab","Occidente","Banrural","Ficohsa","Micoope","Otros"];$("#bankGrid").innerHTML=banks.map(b=>`<button class="bankBtn" data-bank="${b}">${b}</button>`).join("");$$("[data-bank]").forEach(b=>b.onclick=()=>{selectedBank=b.dataset.bank;$("#visaBankStep").classList.add("hidden");$("#visaInstallmentStep").classList.remove("hidden")});
const months=[6,10,12,15,18];$("#installmentGrid").innerHTML=months.map(m=>`<button class="bankBtn" data-months="${m}">${m} cuotas</button>`).join("");$$("[data-months]").forEach(b=>b.onclick=()=>{selectedInstallments=b.dataset.months;paymentDialog.close();openAgency()});

const heroLogo=$("#heroLogo"),logoList=["assets/img/logo-malacatan.png","assets/img/logo-sanpablo.png"];let logoIndex=0;
setInterval(()=>{
  logoIndex=(logoIndex+1)%logoList.length;
  heroLogo.classList.remove("logoFade");
  void heroLogo.offsetWidth;
  heroLogo.src=logoList[logoIndex];
  heroLogo.classList.add("logoFade");
  updateDockSocials(logoList[logoIndex]);
},6500);

buildCategoryCards();render();updateDockSocials(logoList[0]);
