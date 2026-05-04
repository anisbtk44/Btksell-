import { useState, useRef, useEffect } from "react";

const T = {
  bg:"#07080B", surface:"#0D0F16", card:"#12151F", cardHov:"#171B28",
  border:"#1E2235", text:"#F0F2FA", sub:"#8892AA", muted:"#4A5068",
  gold:"#F0C040", brand:"#6C5CE7", brandB:"#A29BFE",
};

const THEMES = [
  { id:"cosmetique", label:"Cosmétique",     emoji:"🧴", color:"#E879C0", g:"135deg,#E879C0,#6C3483", bg:"radial-gradient(ellipse at top,#2D1B35 0%,#07080B 70%)", desc:"Soins, maquillage & beauté",       type:"produit"    },
  { id:"coiffure",   label:"Coiffure",       emoji:"💇", color:"#F4A261", g:"135deg,#F4A261,#E76F51", bg:"radial-gradient(ellipse at top,#2B1A10 0%,#07080B 70%)", desc:"Coiffeurs & soins capillaires",    type:"prestation" },
  { id:"auto",       label:"Nettoyage Auto", emoji:"🚗", color:"#00CEC9", g:"135deg,#00CEC9,#0984E3", bg:"radial-gradient(ellipse at top,#0A1F2B 0%,#07080B 70%)", desc:"Lavage & entretien automobile",    type:"prestation" },
  { id:"telephone",  label:"Téléphones",     emoji:"📱", color:"#00E5A0", g:"135deg,#00E5A0,#0984E3", bg:"radial-gradient(ellipse at top,#071F1A 0%,#07080B 70%)", desc:"Réparation & vente de téléphones", type:"mixte"      },
  { id:"desserts",   label:"Desserts",       emoji:"🍰", color:"#FD79A8", g:"135deg,#FD79A8,#FDCB6E", bg:"radial-gradient(ellipse at top,#2B1020 0%,#07080B 70%)", desc:"Gâteaux, pâtisseries & sucreries",type:"produit"    },
  { id:"vetements",  label:"Vêtements",      emoji:"👗", color:"#A29BFE", g:"135deg,#A29BFE,#6C5CE7", bg:"radial-gradient(ellipse at top,#130F2B 0%,#07080B 70%)", desc:"Mode, prêt-à-porter & accessoires",type:"produit"    },
  { id:"nourriture", label:"Nourriture",     emoji:"🍽️", color:"#FDCB6E", g:"135deg,#FDCB6E,#E17055", bg:"radial-gradient(ellipse at top,#201508 0%,#07080B 70%)", desc:"Plats cuisinés & produits locaux", type:"produit"    },
];

const th = id => THEMES.find(t => t.id === id);

const LISTINGS = [
  { id:1,  themeId:"cosmetique", kind:"produit",    title:"Crème visage hydratante bio",      price:18,  unit:null,         seller:"Nadia B.",   city:"Nantes", emoji:"🧴", rating:4.9, reviews:42,  star:true,  desc:"Crème hydratante naturelle, peaux sensibles, fabriquée localement." },
  { id:2,  themeId:"cosmetique", kind:"produit",    title:"Sérum vitamine C maison",          price:22,  unit:null,         seller:"Amira K.",   city:"Nantes", emoji:"✨", rating:5.0, reviews:18,  star:true,  desc:"Sérum fait maison, anti-taches, formule naturelle et efficace." },
  { id:3,  themeId:"cosmetique", kind:"produit",    title:"Coffret maquillage complet",       price:45,  unit:null,         seller:"Inès R.",    city:"Nantes", emoji:"💄", rating:4.7, reviews:27,  star:false, desc:"Palette, fond de teint, mascara. Marques premium, neuf." },
  { id:4,  themeId:"cosmetique", kind:"prestation", title:"Maquillage événementiel",          price:60,  unit:"séance",     seller:"Yasmine B.", city:"Nantes", emoji:"💅", rating:4.9, reviews:34,  star:true,  desc:"Maquillage professionnel mariages, soirées. Déplacement possible." },
  { id:5,  themeId:"coiffure",   kind:"prestation", title:"Coupe + brushing femme",           price:35,  unit:"séance",     seller:"Samia L.",   city:"Nantes", emoji:"✂️", rating:4.9, reviews:88,  star:true,  desc:"Coupe moderne, brushing, conseils personnalisés. À domicile ou salon." },
  { id:6,  themeId:"coiffure",   kind:"prestation", title:"Box braids & cornrows",            price:80,  unit:"coiffure",   seller:"Aminata D.", city:"Nantes", emoji:"💆", rating:5.0, reviews:63,  star:true,  desc:"Tresses africaines soignées, durée 4-6h. Matériel fourni." },
  { id:7,  themeId:"coiffure",   kind:"prestation", title:"Coloration & mèches",              price:60,  unit:"séance",     seller:"Julie M.",   city:"Nantes", emoji:"🎨", rating:4.8, reviews:45,  star:false, desc:"Coloration végétale ou chimique, balayage, ombré hair." },
  { id:8,  themeId:"coiffure",   kind:"prestation", title:"Coupe homme + barbe",              price:25,  unit:"séance",     seller:"Youssef B.", city:"Nantes", emoji:"🪒", rating:4.9, reviews:112, star:true,  desc:"Coupe tendance + taille de barbe au rasoir." },
  { id:9,  themeId:"auto",       kind:"prestation", title:"Nettoyage intérieur complet",      price:60,  unit:"véhicule",   seller:"Karim M.",   city:"Nantes", emoji:"🧹", rating:4.8, reviews:52,  star:true,  desc:"Aspiration, shampoing sièges, plastiques, vitres. Résultat showroom." },
  { id:10, themeId:"auto",       kind:"prestation", title:"Lavage extérieur + cire",          price:35,  unit:"véhicule",   seller:"Tony V.",    city:"Nantes", emoji:"✨", rating:4.7, reviews:38,  star:false, desc:"Lavage haute pression, cire protectrice, jantes incluses." },
  { id:11, themeId:"auto",       kind:"prestation", title:"Detailing complet premium",        price:150, unit:"véhicule",   seller:"AutoGloss",  city:"Nantes", emoji:"🏎️", rating:5.0, reviews:24,  star:true,  desc:"Correction de peinture, polish, céramique. Comme neuf." },
  { id:12, themeId:"telephone",  kind:"produit",    title:"iPhone 14 Pro 256Go",              price:780, unit:null,         seller:"Sophie L.",  city:"Nantes", emoji:"📱", rating:4.9, reviews:8,   star:true,  desc:"Débloqué, batterie 97%, boîte d'origine. Parfait état." },
  { id:13, themeId:"telephone",  kind:"produit",    title:"Samsung Galaxy S23 128Go",         price:480, unit:null,         seller:"Lucas T.",   city:"Nantes", emoji:"📲", rating:4.8, reviews:15,  star:false, desc:"Très bon état, débloqué tous opérateurs, avec chargeur." },
  { id:14, themeId:"telephone",  kind:"prestation", title:"Réparation écran iPhone",          price:59,  unit:"réparation", seller:"TechFix",    city:"Nantes", emoji:"🔧", rating:4.9, reviews:134, star:true,  desc:"Écran original Apple, garantie 6 mois, réparation en 1h." },
  { id:15, themeId:"telephone",  kind:"prestation", title:"Changement batterie Samsung",      price:39,  unit:"réparation", seller:"MobileDoc",  city:"Nantes", emoji:"🔋", rating:4.8, reviews:76,  star:false, desc:"Batterie d'origine, garantie 1 an. Tous modèles Samsung." },
  { id:16, themeId:"desserts",   kind:"produit",    title:"Layer cake 3 étages commande",     price:45,  unit:"gâteau",     seller:"Fatou B.",   city:"Nantes", emoji:"🎂", rating:5.0, reviews:67,  star:true,  desc:"Gâteau personnalisé, thème au choix, ganache ou crème. 48h." },
  { id:17, themeId:"desserts",   kind:"produit",    title:"Macaron coffret 24 pièces",        price:28,  unit:"coffret",    seller:"Chloé P.",   city:"Nantes", emoji:"🫐", rating:4.9, reviews:43,  star:false, desc:"Macarons artisanaux, 8 parfums au choix." },
  { id:18, themeId:"desserts",   kind:"produit",    title:"Cheesecake New-York style",        price:22,  unit:"part",       seller:"Yasmina H.", city:"Nantes", emoji:"🍰", rating:4.8, reviews:31,  star:true,  desc:"Cheesecake onctueux, coulis fruits rouges. 6-8 parts." },
  { id:19, themeId:"desserts",   kind:"produit",    title:"Baklavas et gâteaux orientaux",    price:18,  unit:"boîte",      seller:"Nour M.",    city:"Nantes", emoji:"🍯", rating:4.9, reviews:55,  star:false, desc:"Baklavas au miel et pistache, cornes de gazelle. 500g." },
  { id:20, themeId:"vetements",  kind:"produit",    title:"Veste en cuir vintage taille M",   price:85,  unit:null,         seller:"Emma R.",    city:"Nantes", emoji:"🧥", rating:4.7, reviews:19,  star:false, desc:"Cuir véritable style biker, années 90. Très bon état." },
  { id:21, themeId:"vetements",  kind:"produit",    title:"Lot 5 robes été neuves S/M",       price:55,  unit:null,         seller:"Inès B.",    city:"Nantes", emoji:"👗", rating:4.8, reviews:14,  star:true,  desc:"5 robes neuves avec étiquettes, styles variés." },
  { id:22, themeId:"vetements",  kind:"prestation", title:"Retouche & couture sur mesure",    price:20,  unit:"pièce",      seller:"Nguyen T.",  city:"Nantes", emoji:"🪡", rating:4.9, reviews:42,  star:true,  desc:"Ourlets, rétrécissements, zippers. Résultat en 48h." },
  { id:23, themeId:"nourriture", kind:"produit",    title:"Couscous royal maison (4 pers)",   price:28,  unit:"plat",       seller:"Karima B.",  city:"Nantes", emoji:"🫕", rating:5.0, reviews:47,  star:true,  desc:"Couscous traditionnel, légumes et merguez." },
  { id:24, themeId:"nourriture", kind:"produit",    title:"Tajine agneau pruneaux",           price:24,  unit:"plat",       seller:"Fatima Z.",  city:"Nantes", emoji:"🍲", rating:4.9, reviews:38,  star:false, desc:"Tajine mijoté 3h, recette familiale, pour 2-3 personnes." },
  { id:25, themeId:"nourriture", kind:"produit",    title:"Plateau de fromages affinés",      price:22,  unit:null,         seller:"Fromagerie", city:"Nantes", emoji:"🧀", rating:4.9, reviews:29,  star:true,  desc:"Sélection 5 fromages affinés, noix et confiture." },
];

const REPLIES = [
  "Bonjour ! Je suis disponible 😊",
  "Oui, c'est encore disponible ! Quand souhaitez-vous passer ?",
  "Je peux faire une petite réduction cette semaine.",
  "Pas de problème, je me déplace dans votre quartier à Nantes.",
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
          <span style={{ background:"#ffffff18", color:"#fff", borderRadius:20, padding:"2px 10px", fontSize:10, fontWeight:700 }}>📍 Nantes</span>
        </div>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontSize:80, marginBottom:18, filter:`drop-shadow(0 0 28px ${sc.color}66)`, lineHeight:1 }}>{sc.emoji}</div>
          <div style={{ background:`${sc.color}22`, border:`1px solid ${sc.color}44`, color:sc.color, borderRadius:30, padding:"4px 16px", fontSize:11, fontWeight:800, letterSpacing:1, textTransform:"uppercase", display:"inline-block", marginBottom:14 }}>{sc.label}</div>
          <h2 style={{ fontWeight:900, fontSize:26, color:T.text, margin:"0 0 10px", lineHeight:1.2 }}>{sc.desc}</h2>
          <p style={{ color:T.sub, fontSize:13.5, lineHeight:1.7, maxWidth:340 }}>Achetez​​​​​​​​​​​​​​​​
