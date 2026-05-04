import { useState, useRef, useEffect } from "react";

const T = {
  bg:"#07080B", surface:"#0D0F16", card:"#12151F", cardHov:"#171B28",
  border:"#1E2235", text:"#F0F2FA", sub:"#8892AA", muted:"#4A5068",
  gold:"#F0C040", brand:"#6C5CE7", brandB:"#A29BFE",
};

const THEMES = [
  { id:"parfums",    label:"Parfums",       emoji:"🌸", color:"#E879C0", g:"135deg,#E879C0,#6C3483", bg:"radial-gradient(ellipse at top,#2D1B35 0%,#07080B 70%)", desc:"Fragrances & eaux de parfum",      type:"produit"    },
  { id:"coiffure",   label:"Coiffure",       emoji:"💇", color:"#F4A261", g:"135deg,#F4A261,#E76F51", bg:"radial-gradient(ellipse at top,#2B1A10 0%,#07080B 70%)", desc:"Coiffeurs & soins capillaires",    type:"prestation" },
  { id:"auto",       label:"Nettoyage Auto", emoji:"🚗", color:"#00CEC9", g:"135deg,#00CEC9,#0984E3", bg:"radial-gradient(ellipse at top,#0A1F2B 0%,#07080B 70%)", desc:"Lavage & entretien automobile",    type:"prestation" },
  { id:"telephone",  label:"Téléphones",     emoji:"📱", color:"#00E5A0", g:"135deg,#00E5A0,#0984E3", bg:"radial-gradient(ellipse at top,#071F1A 0%,#07080B 70%)", desc:"Réparation & vente de téléphones", type:"mixte"      },
  { id:"desserts",   label:"Desserts",       emoji:"🍰", color:"#FD79A8", g:"135deg,#FD79A8,#FDCB6E", bg:"radial-gradient(ellipse at top,#2B1020 0%,#07080B 70%)", desc:"Gâteaux, pâtisseries & sucreries",type:"produit"    },
  { id:"vetements",  label:"Vêtements",      emoji:"👗", color:"#A29BFE", g:"135deg,#A29BFE,#6C5CE7", bg:"radial-gradient(ellipse at top,#130F2B 0%,#07080B 70%)", desc:"Mode, prêt-à-porter & accessoires",type:"produit"    },
  { id:"nourriture", label:"Nourriture",     emoji:"🍽️", color:"#FDCB6E", g:"135deg,#FDCB6E,#E17055", bg:"radial-gradient(ellipse at top,#201508 0%,#07080B 70%)", desc:"Plats cuisinés & produits locaux", type:"produit"    },
];

const th = id => THEMES.find(t => t.id === id);

const LISTINGS = [
  { id:1,  themeId:"parfums",   kind:"produit",    title:"Chanel N°5 EDP 100ml",           price:95,  unit:null,         seller:"Nadia B.",   city:"Lyon", emoji:"🫧", rating:4.9, reviews:42,  star:true,  desc:"Authentique, flacon complet, reçu en cadeau jamais ouvert." },
  { id:2,  themeId:"parfums",   kind:"produit",    title:"Dior Sauvage EDT 60ml",          price:70,  unit:null,         seller:"Karim S.",   city:"Lyon", emoji:"🌿", rating:4.8, reviews:31,  star:false, desc:"Flacon aux 3/4 plein, très bon état." },
  { id:3,  themeId:"parfums",   kind:"produit",    title:"Parfum oud fait maison",         price:35,  unit:null,         seller:"Amira K.",   city:"Lyon", emoji:"🌸", rating:5.0, reviews:18,  star:true,  desc:"Oud artisanal, senteur orientale unique, 50ml." },
  { id:4,  themeId:"parfums",   kind:"produit",    title:"Coffret YSL Black Opium",        price:80,  unit:null,         seller:"Inès R.",    city:"Lyon", emoji:"🖤", rating:4.7, reviews:27,  star:false, desc:"Coffret neuf sous blister, jamais utilisé." },
  { id:5,  themeId:"coiffure",  kind:"prestation", title:"Coupe + brushing femme",         price:35,  unit:"séance",     seller:"Samia L.",   city:"Lyon", emoji:"✂️", rating:4.9, reviews:88,  star:true,  desc:"Coupe moderne, brushing, conseils personnalisés." },
  { id:6,  themeId:"coiffure",  kind:"prestation", title:"Box braids & cornrows",          price:80,  unit:"coiffure",   seller:"Aminata D.", city:"Lyon", emoji:"💆", rating:5.0, reviews:63,  star:true,  desc:"Tresses africaines soignées, durée 4-6h. Matériel fourni." },
  { id:7,  themeId:"coiffure",  kind:"prestation", title:"Coloration & mèches",            price:60,  unit:"séance",     seller:"Julie M.",   city:"Lyon", emoji:"🎨", rating:4.8, reviews:45,  star:false, desc:"Coloration végétale ou chimique, balayage, ombré hair." },
  { id:8,  themeId:"coiffure",  kind:"prestation", title:"Coupe homme + barbe",            price:25,  unit:"séance",     seller:"Youssef B.", city:"Lyon", emoji:"🪒", rating:4.9, reviews:112, star:true,  desc:"Coupe tendance + taille de barbe au rasoir." },
  { id:9,  themeId:"auto",      kind:"prestation", title:"Nettoyage intérieur complet",    price:60,  unit:"véhicule",   seller:"Karim M.",   city:"Lyon", emoji:"🧹", rating:4.8, reviews:52,  star:true,  desc:"Aspiration, shampoing sièges, plastiques, vitres." },
  { id:10, themeId:"auto",      kind:"prestation", title:"Lavage extérieur + cire",        price:35,  unit:"véhicule",   seller:"Tony V.",    city:"Lyon", emoji:"✨", rating:4.7, reviews:38,  star:false, desc:"Lavage haute pression, cire protectrice, jantes incluses." },
  { id:11, themeId:"auto",      kind:"prestation", title:"Detailing complet premium",      price:150, unit:"véhicule",   seller:"AutoGloss",  city:"Lyon", emoji:"🏎️", rating:5.0, reviews:24,  star:true,  desc:"Correction de peinture, polish, céramique. Comme neuf." },
  { id:12, themeId:"telephone", kind:"produit",    title:"iPhone 14 Pro 256Go",            price:780, unit:null,         seller:"Sophie L.",  city:"Lyon", emoji:"📱", rating:4.9, reviews:8,   star:true,  desc:"Débloqué, batterie 97%, boîte d'origine. Parfait état." },
  { id:13, themeId:"telephone", kind:"produit",    title:"Samsung Galaxy S23 128Go",       price:480, unit:null,         seller:"Lucas T.",   city:"Lyon", emoji:"📲", rating:4.8, reviews:15,  star:false, desc:"Très bon état, débloqué tous opérateurs, avec chargeur." },
  { id:14, themeId:"telephone", kind:"prestation", title:"Réparation écran iPhone",        price:59,  unit:"réparation", seller:"TechFix",    city:"Lyon", emoji:"🔧", rating:4.9, reviews:134, star:true,  desc:"Écran original Apple, garantie 6 mois, réparation en 1h." },
  { id:15, themeId:"telephone", kind:"prestation", title:"Changement batterie Samsung",    price:39,  unit:"réparation", seller:"MobileDoc",  city:"Lyon", emoji:"🔋", rating:4.8, reviews:76,  star:false, desc:"Batterie d'origine, garantie 1 an. Tous modèles Samsung." },
  { id:16, themeId:"desserts",  kind:"produit",    title:"Layer cake 3 étages commande",   price:45,  unit:"gâteau",     seller:"Fatou B.",   city:"Lyon", emoji:"🎂", rating:5.0, reviews:67,  star:true,  desc:"Gâteau personnalisé, thème au choix. 48h de délai." },
  { id:17, themeId:"desserts",  kind:"produit",    title:"Macaron coffret 24 pièces",      price:28,  unit:"coffret",    seller:"Chloé P.",   city:"Lyon", emoji:"🫐", rating:4.9, reviews:43,  star:false, desc:"Macarons artisanaux, 8 parfums au choix." },
  { id:18, themeId:"desserts",  kind:"produit",    title:"Cheesecake New-York style",      price:22,  unit:"part",       seller:"Yasmina H.", city:"Lyon", emoji:"🍰", rating:4.8, reviews:31,  star:true,  desc:"Cheesecake onctueux, coulis fruits rouges. 6-8 parts." },
  { id:19, themeId:"desserts",  kind:"produit",    title:"Baklavas et gâteaux orientaux",  price:18,  unit:"boîte",      seller:"Nour M.",    city:"Lyon", emoji:"🍯", rating:4.9, reviews:55,  star:false, desc:"Baklavas au miel et pistache, cornes de gazelle. 500g." },
  { id:20, themeId:"vetements", kind:"produit",    title:"Veste en cuir vintage taille M", price:85,  unit:null,         seller:"Emma R.",    city:"Lyon", emoji:"🧥", rating:4.7, reviews:19,  star:false, desc:"Cuir véritable style biker, années 90. Très bon état." },
  { id:21, themeId:"vetements", kind:"produit",    title:"Lot 5 robes été neuves S/M",     price:55,  unit:null,         seller:"Inès B.",    city:"Lyon", emoji:"👗", rating:4.8, reviews:14,  star:true,  desc:"5 robes neuves avec étiquettes, styles variés." },
  { id:22, themeId:"vetements", kind:"prestation", title:"Retouche & couture sur mesure",  price:20,  unit:"pièce",      seller:"Nguyen T.",  city:"Lyon", emoji:"🪡", rating:4.9, reviews:42,  star:true,  desc:"Ourlets, rétrécissements, zippers. Résultat en 48h." },
  { id:23, themeId:"nourriture",kind:"produit",    title:"Couscous royal maison (4 pers)", price:28,  unit:"plat",       seller:"Karima B.",  city:"Lyon", emoji:"🫕", rating:5.0, reviews:47,  star:true,  desc:"Couscous traditionnel, légumes et merguez." },
  { id:24, themeId:"nourriture",kind:"produit",    title:"Tajine agneau pruneaux",         price:24,  unit:"plat",       seller:"Fatima Z.",  city:"Lyon", emoji:"🍲", rating:4.9, reviews:38,  star:false, desc:"Tajine mijoté 3h, recette familiale, pour 2-3 personnes." },
  { id:25, themeId:"nourriture",kind:"produit",    title:"Plateau de fromages affinés",    price:22,  unit:null,         seller:"Fromagerie", city:"Lyon", emoji:"🧀", rating:4.9, reviews:29,  star:true,  desc:"Sélection 5 fromages affinés, noix et confiture." },
];

const REPLIES = [
  "Bonjour ! Je suis disponible 😊",
  "Oui, c'est encore disponible ! Quand souhaitez-vous passer ?",
  "Je peux faire une petite réduction cette semaine.",
  "Pas de problème, je me déplace dans votre quartier.",
  "Avec plaisir ! Je vous envoie plus de photos si vous voulez.",
];

function Stars({ rating, reviews }) {
  return (
    <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:11 }}>
      <span>{[1,2,3,4,5].map(i=><span key={i} style={{ color:i<=Math.round(rating)?T.gold:T.muted }}>★</span>)}</span>
      <span style={{ color:T.sub }}>{rating} <span style={{ color:T.muted }}>({reviews})</span></span>
    </span>
  );
}

function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("acheteur");
  const [idx, setIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [nom, setNom] = useState("");
  useEffect(() => {
    const iv = setInterval(() => setIdx(i => (i+1) % THEMES.length), 2800);
    return () => clearInterval(iv);
  }, []);
  const sc = THEMES[idx];
  return (
    <div style={{ minHeight:"100vh", display:"flex", fontFamily:"'DM Sans',sans-serif", background:T.bg, overflow:"hidden" }}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"36px 44px", background:sc.bg, transition:"background 1.2s ease", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"15%", left:"10%", width:380, height:380, borderRadius:"50%", background:`${sc.color}15`, filter:"blur(70px)", transition:"background 1.2s", pointerEvents:"none" }}/>
        <div style={{ display:"flex", alignItems:"center", gap:10, position:"relative" }}>
          <div style={{ width:34, height:34, borderRadius:10, background:`linear-gradient(${sc.g})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>🛒</div>
          <span style={{ fontWeight:900, fontSize:20, color:T.text, letterSpacing:"-0.5px" }}>Btk <span style={{ color:sc.color }}>Sell</span></span>
        </div>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontSize:80, marginBottom:18, filter:`drop-shadow(0 0 28px ${sc.color}66)`, lineHeight:1 }}>{sc.emoji}</div>
          <div style={{ background:`${sc.color}22`, border:`1px solid ${sc.color}44`, color:sc.color, borderRadius:30, padding:"4px 16px", fontSize:11, fontWeight:800, letterSpacing:1, textTransform:"uppercase", display:"inline-block", marginBottom:14 }}>{sc.label}</div>
          <h2 style={{ fontWeight:900, fontSize:26, color:T.text, margin:"0 0 10px", lineHeight:1.2 }}>{sc.desc}</h2>
          <p style={{ color:T.sub, fontSize:13.5, lineHeight:1.7, maxWidth:340 }}>Achetez, vendez et proposez vos services près de chez vous.</p>
        </div>
        <div style={{ display:"flex", gap:7, position:"relative" }}>
          {THEMES.map((t,i) => <button key={t.id} onClick={()=>setIdx(i)} style={{ width:i===idx?22:7, height:7, borderRadius:4, background:i===idx?sc.color:T.muted, border:"none", cursor:"pointer", padding:0, transition:"all .35s ease" }}/>)}
        </div>
      </div>
      <div style={{ width:420, display:"flex", flexDirection:"column", justifyContent:"center", padding:"44px 40px", background:T.surface, borderLeft:`1px solid ${T.border}`, overflowY:"auto" }}>
        <div style={{ display:"flex", background:T.card, borderRadius:12, padding:3, marginBottom:28, border:`1px solid ${T.border}` }}>
          {[["login","Connexion"],["register","Inscription"]].map(([m,l])=>(
            <button key={m} onClick={()=>setMode(m)} style={{ flex:1, padding:"8px", borderRadius:9, background:mode===m?sc.color:"transparent", border:"none", color:mode===m?"#fff":T.sub, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .18s" }}>{l}</button>
          ))}
        </div>
        <h1 style={{ fontWeight:900, fontSize:22, color:T.text, margin:"0 0 4px" }}>{mode==="login"?"Bon retour 👋":"Créer un compte"}</h1>
        <p style={{ color:T.muted, fontSize:12.5, margin:"0 0 24px" }}>{mode==="login"?"Connectez-vous à votre compte":"Rejoignez la communauté locale"}</p>
        {mode==="register" && (
          <div style={{ marginBottom:18 }}>
            <label style={{ fontSize:10, color:T.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:.7, display:"block", marginBottom:7 }}>Je suis…</label>
            <div style={{ display:"flex", gap:8 }}>
              {[["acheteur","🛍️ Acheteur"],["vendeur","🏪 Vendeur"]].map(([r,l])=>(
                <button key={r} onClick={()=>setRole(r)} style={{ flex:1, padding:"11px 8px", borderRadius:11, cursor:"pointer", background:role===r?`${sc.color}18`:T.card, border:`1.5px solid ${role===r?sc.color:T.border}`, color:role===r?sc.color:T.sub, fontWeight:800, fontSize:12.5, fontFamily:"'DM Sans',sans-serif" }}>{l}</button>
              ))}
            </div>
          </div>
        )}
        <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
          {mode==="register" && <InputField label="Nom complet" placeholder="Ex: Yasmine Benali" value={nom} onChange={setNom} icon="👤" color={sc.color}/>}
          <InputField label="Email" placeholder="votre@email.com" value={email} onChange={setEmail} icon="✉️" type="email" color={sc.color}/>
          <InputField label="Mot de passe" placeholder="••••••••" value={pwd} onChange={setPwd} icon="🔒" type="password" color={sc.color}/>
          {mode==="register" && (
            <div>
              <label style={{ fontSize:10, color:T.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:.7, display:"block", marginBottom:7 }}>Mes intérêts</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {THEMES.map(t=>(
                  <button key={t.id} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:20, padding:"4px 11px", fontSize:11, fontWeight:700, color:T.sub, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=t.color;e.currentTarget.style.color=t.color;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.sub;}}
                  >{t.emoji} {t.label}</button>
                ))}
              </div>
            </div>
          )}
          <button onClick={onLogin} style={{ background:`linear-gradient(${sc.g})`, border:"none", borderRadius:11, padding:"12px", color:"#fff", fontSize:13.5, fontWeight:800, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:`0 5px 18px ${sc.color}44`, marginTop:2 }}>
            {mode==="login"?"Se connecter →":"Créer mon compte →"}
          </button>
          {mode==="login" && (
            <div style={{ textAlign:"center", fontSize:12, color:T.muted }}>
              Pas de compte ?{" "}
              <button onClick={()=>setMode("register")} style={{ background:"none", border:"none", color:sc.color, cursor:"pointer", fontWeight:700, fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>S'inscrire gratuitement</button>
            </div>
          )}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ flex:1, height:1, background:T.border }}/><span style={{ fontSize:11, color:T.muted }}>ou</span><div style={{ flex:1, height:1, background:T.border }}/></div>
          <div style={{ display:"flex", gap:8 }}>
            {[["G","#DB4437"],["f","#1877F2"],["🍎","#fff"]].map(([ic,c])=>(
              <button key={ic} style={{ flex:1, background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"9px", display:"flex", alignItems:"center", justifyContent:"center", color:c, fontWeight:900, fontSize:13, cursor:"pointer" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=c}
                onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}
              >{ic}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, placeholder, value, onChange, icon, type="text", color }) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <label style={{ fontSize:10, color:T.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:.7, display:"block", marginBottom:5 }}>{label}</label>
      <div style={{ position:"relative" }}>
        <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:13 }}>{icon}</span>
        <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
          style={{ width:"100%", background:T.card, border:`1px solid ${focus?color:T.border}`, borderRadius:10, padding:"10px 12px 10px 36px", color:T.text, fontSize:12.5, fontFamily:"'DM Sans',sans-serif", outline:"none", boxSizing:"border-box", transition:"all .15s", boxShadow:focus?`0 0 0 3px ${color}18`:"none" }}
        />
      </div>
    </div>
  );
}

function Card({ l, onChat, onView }) {
  const theme = th(l.themeId);
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ background:hov?T.cardHov:T.card, borderRadius:15, border:`1px solid ${hov?theme.color+"55":T.border}`, transition:"all .2s", transform:hov?"translateY(-4px)":"none", boxShadow:hov?`0 10px 28px ${theme.color}22`:"none", display:"flex", flexDirection:"column", overflow:"hidden", fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ height:95, display:"flex", alignItems:"center", justifyContent:"center", fontSize:42, position:"relative", backgroundImage:`linear-gradient(${theme.g})` }}>
        <div style={{ position:"absolute", inset:0, background:"#07080Bbb" }}/>
        <span style={{ position:"relative", filter:`drop-shadow(0 2px 8px ${theme.color}88)` }}>{l.emoji}</span>
        <span style={{ position:"absolute", top:7, left:8, background:l.kind==="prestation"?theme.color:T.surface, color:l.kind==="prestation"?"#fff":T.sub, border:l.kind!=="prestation"?`1px solid ${T.border}`:"none", borderRadius:20, padding:"2px 8px", fontSize:9, fontWeight:800, textTransform:"uppercase" }}>{l.kind==="prestation"?"✦ Service":"Produit"}</span>
        {l.star && <span style={{ position:"absolute", top:7, right:8, background:"#F0C04018", color:T.gold, border:`1px solid #F0C04044`, borderRadius:20, padding:"2px 8px", fontSize:9, fontWeight:800 }}>⭐ Vedette</span>}
      </div>
      <div style={{ padding:"11px 13px 13px", display:"flex", flexDirection:"column", gap:4, flex:1 }}>
        <div style={{ fontWeight:800, fontSize:13, color:T.text, lineHeight:1.3 }}>{l.title}</div>
        <div style={{ fontSize:10.5, color:T.muted }}>{l.seller} · 📍 {l.city}</div>
        <Stars rating={l.rating} reviews={l.reviews}/>
        <div style={{ marginTop:"auto", paddingTop:9, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div><span style={{ fontWeight:900, fontSize:18, color:theme.color }}>{l.price} €</span>{l.unit&&<span style={{ color:T.muted, fontSize:10 }}> /{l.unit}</span>}</div>
          <div style={{ display:"flex", gap:5 }}>
            <button onClick={()=>onView(l)} style={{ background:"transparent", border:`1px solid ${T.border}`, color:T.sub, borderRadius:8, padding:"4px 10px", fontSize:10.5, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Voir</button>
            <button onClick={()=>onChat(l)} style={{ background:theme.color, border:"none", color:"#fff", borderRadius:8, padding:"4px 12px", fontSize:10.5, fontWeight:800, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>💬 Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chat({ l, onClose }) {
  const theme = th(l.themeId);
  const [msgs, setMsgs] = useState([{ from:"seller", text:`Bonjour ! Je suis ${l.seller} 👋`, time:"maintenant" }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({ behavior:"smooth" }); },[msgs,typing]);
  const send = () => {
    if (!input.trim()) return;
    const now=new Date(), t=`${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
    setMsgs(m=>[...m,{ from:"me", text:input.trim(), time:t }]);
    setInput(""); setTyping(true);
    setTimeout(()=>{ setTyping(false); const t2=new Date(); setMsgs(m=>[...m,{ from:"seller", text:REPLIES[Math.floor(Math.random()*REPLIES.length)], time:`${t2.getHours()}:${String(t2.getMinutes()).padStart(2,"0")}` }]); }, 1000+Math.random()*600);
  };
  return (
    <div style={{ position:"fixed", right:0, top:0, bottom:0, width:300, background:T.surface, borderLeft:`1.5px solid ${theme.color}44`, display:"flex", flexDirection:"column", zIndex:200, boxShadow:`-5px 0 28px ${theme.color}18`, fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ backgroundImage:`linear-gradient(${theme.g})`, padding:"13px 13px 10px", display:"flex", alignItems:"center", gap:9, position:"relative" }}>
        <div style={{ position:"absolute", inset:0, background:"#07080Baa" }}/>
        <div style={{ position:"relative", fontSize:24 }}>{l.emoji}</div>
        <div style={{ position:"relative", flex:1 }}>
          <div style={{ fontWeight:800, fontSize:12, color:"#fff" }}>{l.title}</div>
          <div style={{ fontSize:10.5, color:"#ffffff88" }}>{l.seller}</div>
          <div style={{ fontSize:11.5, fontWeight:900, color:"#fff" }}>{l.price} €{l.unit?` /${l.unit}`:""}</div>
        </div>
        <button onClick={onClose} style={{ position:"relative", background:"#ffffff18", border:"none", color:"#fff", borderRadius:7, width:26, height:26, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
      </div>
      <div style={{ padding:"5px 13px", background:T.card, borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:"#4ADE80", boxShadow:"0 0 5px #4ADE80" }}/>
        <span style={{ fontSize:10.5, color:T.muted }}>{l.seller} en ligne</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"12px 11px", display:"flex", flexDirection:"column", gap:7 }}>
        {msgs.map((m,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:m.from==="me"?"flex-end":"flex-start" }}>
            <div style={{ maxWidth:"80%", background:m.from==="me"?theme.color:T.card, color:"#fff", borderRadius:m.from==="me"?"13px 13px 4px 13px":"13px 13px 13px 4px", padding:"7px 10px", fontSize:12, lineHeight:1.5, border:m.from!=="me"?`1px solid ${T.border}`:"none" }}>
              <div>{m.text}</div>
              <div style={{ fontSize:9, color:"#ffffff55", textAlign:"right", marginTop:2 }}>{m.time}</div>
            </div>
          </div>
        ))}
        {typing && <div style={{ display:"flex" }}><div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:"13px 13px 13px 4px", padding:"7px 12px" }}><span style={{ color:T.muted, letterSpacing:3, fontSize:15 }}>···</span></div></div>}
        <div ref={endRef}/>
      </div>
      <div style={{ padding:"9px 11px", background:T.card, borderTop:`1px solid ${T.border}`, display:"flex", gap:6 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Message…" style={{ flex:1, background:T.surface, border:`1px solid ${input?theme.color:T.border}`, borderRadius:9, padding:"8px 11px", color:T.text, fontSize:12, fontFamily:"'DM Sans',sans-serif", outline:"none" }}/>
        <button onClick={send} style={{ background:theme.color, border:"none", borderRadius:9, width:36, height:36, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>➤</button>
      </div>
    </div>
  );
}

function Modal({ l, onClose, onChat }) {
  if (!l) return null;
  const theme = th(l.themeId);
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"#000c", zIndex:150, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:T.card, borderRadius:18, width:"100%", maxWidth:400, border:`1px solid ${theme.color}55`, overflow:"hidden", boxShadow:`0 18px 50px ${theme.color}33`, fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ height:120, display:"flex", alignItems:"center", justifyContent:"center", fontSize:56, position:"relative", backgroundImage:`linear-gradient(${theme.g})` }}>
          <div style={{ position:"absolute", inset:0, background:"#07080Bcc" }}/><span style={{ position:"relative" }}>{l.emoji}</span>
          <span style={{ position:"absolute", bottom:9, left:12, background:l.kind==="prestation"?theme.color:T.surface, color:l.kind==="prestation"?"#fff":T.sub, border:l.kind!=="prestation"?`1px solid ${T.border}`:"none", borderRadius:20, padding:"2px 10px", fontSize:9.5, fontWeight:800 }}>{l.kind==="prestation"?"✦ Service":"Produit"}</span>
        </div>
        <div style={{ padding:"16px 18px" }}>
          <div style={{ fontWeight:900, fontSize:16, color:T.text, marginBottom:3 }}>{l.title}</div>
          <div style={{ fontSize:11.5, color:T.muted, marginBottom:6 }}>{l.seller} · 📍 {l.city} · {th(l.themeId)?.label}</div>
          <Stars rating={l.rating} reviews={l.reviews}/>
          <p style={{ color:T.sub, fontSize:12.5, lineHeight:1.7, margin:"11px 0 15px" }}>{l.desc}</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div><span style={{ fontWeight:900, fontSize:22, color:theme.color }}>{l.price} €</span>{l.unit&&<span style={{ color:T.muted, fontSize:11 }}> /{l.unit}</span>}</div>
            <div style={{ display:"flex", gap:7 }}>
              <button onClick={onClose} style={{ background:"transparent", border:`1px solid ${T.border}`, color:T.sub, borderRadius:10, padding:"8px 14px", fontFamily:"'DM Sans',sans-serif", fontWeight:700, cursor:"pointer", fontSize:11.5 }}>Fermer</button>
              <button onClick={()=>{onClose();onChat(l);}} style={{ backgroundImage:`linear-gradient(${theme.g})`, border:"none", color:"#fff", borderRadius:10, padding:"8px 16px", fontWeight:800, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11.5 }}>💬 Contacter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTheme, setActiveTheme] = useState(null);
  const [kindFilter, setKindFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [chat, setChat] = useState(null);
  const [modal, setModal] = useState(null);
  const [tab, setTab] = useState("browse");
  const [city, setCity] = useState("Lyon");

  if (!loggedIn) return <Auth onLogin={()=>setLoggedIn(true)}/>;

  const theme = activeTheme ? th(activeTheme) : null;
  const listings = LISTINGS.filter(l =>
    (!activeTheme || l.themeId===activeTheme) &&
    (kindFilter==="all" || l.kind===kindFilter) &&
    (!search || l.title.toLowerCase().includes(search.toLowerCase()) || l.seller.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'DM Sans',sans-serif" }}>
      <nav style={{ position:"sticky", top:0, zIndex:50, background:`${T.surface}ee`, backdropFilter:"blur(12px)", borderBottom:`1px solid ${T.border}`, padding:"0 18px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", height:52, display:"flex", alignItems:"center", gap:11 }}>
          <button onClick={()=>{setActiveTheme(null);setTab("browse");setSearch("");}} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:7 }}>
            <div style={{ width:26, height:26, borderRadius:7, background:"linear-gradient(135deg,#6C5CE7,#A29BFE)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>🛒</div>
            <span style={{ fontWeight:900, fontSize:16, letterSpacing:"-0.5px", color:T.text }}>Btk <span style={{ color:T.brand }}>Sell</span></span>
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:4, background:T.card, borderRadius:8, padding:"4px 9px", border:`1px solid ${T.border}` }}>
            <span style={{ fontSize:11 }}>📍</span>
            <select value={city} onChange={e=>setCity(e.target.value)} style={{ background:"transparent", border:"none", color:T.text, fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, cursor:"pointer", outline:"none" }}>
              {["Lyon","Paris","Marseille","Toulouse","Bordeaux"].map(c=><option key={c} value={c} style={{ background:T.card }}>{c}</option>)}
            </select>
          </div>
          <div style={{ flex:1, position:"relative" }}>
            <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:12, color:T.muted }}>🔍</span>
            <input value={search} onChange={e=>{setSearch(e.target.value);if(e.target.value)setActiveTheme(null);}} placeholder="Rechercher…" style={{ width:"100%", background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:"6px 11px 6px 29px", color:T.text, fontFamily:"'DM Sans',sans-serif", fontSize:12, outline:"none", boxSizing:"border-box" }}/>
          </div>
          {[["browse","🛍️ Parcourir"],["sell","➕ Publier"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{ background:tab===id?T.brand:"transparent", border:`1px solid ${tab===id?T.brand:T.border}`, color:tab===id?"#fff":T.sub, borderRadius:9, padding:"5px 13px", fontWeight:800, fontSize:11.5, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap" }}>{label}</button>
          ))}
          <div style={{ width:28, height:28, borderRadius:"50%", background:`linear-gradient(135deg,${T.brand},${T.brandB})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, cursor:"pointer" }}>👤</div>
        </div>
      </nav>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"20px 18px", paddingRight:chat?328:18, transition:"padding-right .3s" }}>
        {tab==="sell" ? (
          <div style={{ maxWidth:500, margin:"0 auto" }}>
            <h2 style={{ fontWeight:900, fontSize:18, color:T.text, marginBottom:4 }}>📢 Déposer une annonce</h2>
            <p style={{ color:T.muted, fontSize:12.5, marginBottom:20 }}>Vendez un produit ou proposez un service local</p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div>
                <label style={{ fontSize:10, color:T.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:.6, display:"block", marginBottom:7 }}>Catégorie</label>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {THEMES.map(t=>(
                    <button key={t.id} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:20, padding:"4px 11px", fontSize:11, fontWeight:700, color:T.sub, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=t.color;e.currentTarget.style.color=t.color;}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.sub;}}
                    >{t.emoji} {t.label}</button>
                  ))}
                </div>
              </div>
              {[["Titre","Ex: Parfum Dior Sauvage 60ml","text"],["Prix (€)","Ex: 45","number"],["Description","Décrivez votre offre…","textarea"],["Ville","Ex: Lyon","text"]].map(([label,ph,type])=>(
                <div key={label}>
                  <label style={{ fontSize:10, color:T.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:.6, display:"block", marginBottom:4 }}>{label}</label>
                  {type==="textarea"?<textarea placeholder={ph} rows={3} style={{ width:"100%", background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"9px 12px", color:T.text, fontSize:12.5, fontFamily:"'DM Sans',sans-serif", outline:"none", resize:"vertical", boxSizing:"border-box" }}/>
                  :<input type={type} placeholder={ph} style={{ width:"100%", background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"9px 12px", color:T.text, fontSize:12.5, fontFamily:"'DM Sans',sans-serif", outline:"none", boxSizing:"border-box" }}/>}
                </div>
              ))}
              <div style={{ border:`1.5px dashed ${T.brand}44`, borderRadius:11, padding:"22px", textAlign:"center", color:T.muted, cursor:"pointer" }}>
                <div style={{ fontSize:22, marginBottom:5 }}>📷</div>
                <div style={{ fontSize:11.5 }}>Ajouter des photos<br/><span style={{ color:T.brand, fontWeight:700 }}>Cliquer pour importer</span></div>
              </div>
              <button style={{ background:"linear-gradient(135deg,#6C5CE7,#A29BFE)", border:"none", borderRadius:11, padding:"12px", color:"#fff", fontSize:13, fontWeight:800, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>🚀 Publier sur Btk Sell</button>
            </div>
          </div>
        ) : (
          <>
            {!activeTheme && !search ? (
              <>
                <div style={{ marginBottom:24, paddingTop:4 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4 }}>
                    <div style={{ width:3, height:20, borderRadius:3, background:"linear-gradient(#6C5CE7,#A29BFE)" }}/>
                    <h1 style={{ fontWeight:900, fontSize:19, margin:0 }}>Bienvenue sur <span style={{ color:T.brand }}>Btk Sell</span> 🛒</h1>
                  </div>
                  <p style={{ color:T.muted, fontSize:12.5, margin:"0 0 0 10px" }}>Produits & services locaux à {city} — 7 catégories</p>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:10, marginBottom:30 }}>
                  {THEMES.map(t => {
                    const count = LISTINGS.filter(l=>l.themeId===t.id).length;
                    return (
                      <button key={t.id} onClick={()=>setActiveTheme(t.id)}
                        style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"14px 13px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"flex-start", gap:6, textAlign:"left", fontFamily:"'DM Sans',sans-serif", transition:"all .18s" }}
                        onMouseEnter={e=>{ e.currentTarget.style.border=`1px solid ${t.color}66`; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 5px 18px ${t.color}22`; }}
                        onMouseLeave={e=>{ e.currentTarget.style.border=`1px solid ${T.border}`; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}
                      >
                        <div style={{ width:38, height:38, borderRadius:10, backgroundImage:`linear-gradient(${t.g})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, position:"relative" }}>
                          <div style={{ position:"absolute", inset:0, borderRadius:10, background:"#07080B55" }}/><span style={{ position:"relative" }}>{t.emoji}</span>
                        </div>
                        <div style={{ fontWeight:800, fontSize:12, color:T.text, lineHeight:1.3 }}>{t.label}</div>
                        <div style={{ display:"flex", justifyContent:"space-between", width:"100%", alignItems:"center" }}>
                          <span style={{ fontSize:10.5, color:T.muted }}>{count} annonces</span>
                          <span style={{ fontSize:8.5, fontWeight:800, textTransform:"uppercase", letterSpacing:.4, color:t.type==="prestation"?"#F4A261":t.type==="produit"?"#A29BFE":T.muted }}>{t.type==="prestation"?"✦ Services":t.type==="produit"?"Produits":"Mixte"}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:13 }}>
                    <div style={{ width:3, height:16, borderRadius:3, background:T.gold }}/>
                    <h2 style={{ fontWeight:800, fontSize:14, color:T.text, margin:0 }}>⭐ Annonces vedettes</h2>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))", gap:11 }}>
                    {LISTINGS.filter(l=>l.star).map(l=><Card key={l.id} l={l} onChat={setChat} onView={setModal}/>)}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:14, flexWrap:"wrap" }}>
                  <button onClick={()=>{setActiveTheme(null);setSearch("");setKindFilter("all");}} style={{ background:"none", border:"none", color:T.muted, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11.5, fontWeight:700, padding:0 }}>← Accueil</button>
                  {theme && <><span style={{ color:T.border }}>›</span><span style={{ fontSize:11.5, fontWeight:800, color:theme.color }}>{theme.emoji} {theme.label}</span></>}
                  {search && <span style={{ fontSize:11.5, color:T.muted }}>« {search} »</span>}
                </div>
                <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
                  {[["all","Tout"],["prestation","✦ Services"],["produit","Produits"]].map(([k,label])=>(
                    <button key={k} onClick={()=>setKindFilter(k)} style={{ background:kindFilter===k?(theme?.color||T.brand):"transparent", border:`1px solid ${kindFilter===k?(theme?.color||T.brand):T.border}`, color:kindFilter===k?"#fff":T.sub, borderRadius:20, padding:"4px 13px", fontSize:11, fontWeight:800, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>{label}</button>
                  ))}
                  <span style={{ marginLeft:"auto", color:T.muted, fontSize:11 }}>{listings.length} annonce{listings.length!==1?"s":""} · {city}</span>
                </div>
                {listings.length===0
                  ? <div style={{ textAlign:"center", padding:"40px 0", color:T.muted }}><div style={{ fontSize:32, marginBottom:8 }}>🔍</div><div>Aucune annonce trouvée</div></div>
                  : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))", gap:11 }}>
                      {listings.map(l=><Card key={l.id} l={l} onChat={setChat} onView={setModal}/>)}
                    </div>
                }
              </>
            )}
          </>
        )}
      </div>
      {modal && <Modal l={modal} onClose={()=>setModal(null)} onChat={setChat}/>}
      {chat && <Chat l={chat} onClose={()=>setChat(null)}/>}
    </div>
  );
}
