import { useState, useEffect } from "react";
import { supabase } from './supabase'

/* ── Google Fonts ── */
const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Montserrat:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      * { font-family: 'Montserrat', system-ui, sans-serif; }
      .playfair { font-family: 'Playfair Display', Georgia, serif !important; }
      @keyframes compassSpin {
        0%   { transform: rotate(-30deg); }
        30%  { transform: rotate(200deg); }
        60%  { transform: rotate(170deg); }
        80%  { transform: rotate(182deg); }
        90%  { transform: rotate(178deg); }
        100% { transform: rotate(180deg); }
      }
      @keyframes fadeInUp {
        from { opacity:0; transform:translateY(18px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes pulseGlow {
        0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
        50%     { box-shadow: 0 0 0 16px rgba(201,168,76,0); }
      }
      @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
};

/* ── Splash Screen ── */
function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0); // 0=compass, 1=slogan, 2=fade

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 900);
    const t2 = setTimeout(() => setPhase(2), 2400);
    const t3 = setTimeout(() => onDone(), 3000);
    return () => [t1,t2,t3].forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9999,
      background:`radial-gradient(ellipse at 30% 20%, #1A3560 0%, #0D1F3C 45%, #060F1E 100%)`,
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      opacity: phase===2 ? 0 : 1,
      transition: phase===2 ? "opacity 0.6s ease" : "none",
    }}>

      {/* Arka dekor halkalar */}
      <div style={{ position:"absolute", width:340, height:340, borderRadius:"50%",
        border:"1px solid rgba(201,168,76,0.12)", top:"50%", left:"50%",
        transform:"translate(-50%,-50%)" }}/>
      <div style={{ position:"absolute", width:240, height:240, borderRadius:"50%",
        border:"1px solid rgba(201,168,76,0.18)", top:"50%", left:"50%",
        transform:"translate(-50%,-50%)" }}/>

      {/* Pusula kadranı */}
      <div style={{
        width:120, height:120, borderRadius:"50%", marginBottom:32, position:"relative",
        background:"rgba(255,255,255,0.06)",
        border:"1.5px solid rgba(201,168,76,0.35)",
        backdropFilter:"blur(12px)",
        animation:"pulseGlow 2.5s ease-in-out infinite",
        display:"flex", alignItems:"center", justifyContent:"center",
        overflow:"hidden",
      }}>
       {/* Pusula iğnesi */}
        <div style={{
          width:6, height:50, position:"absolute",
          top:10, left:57,
          transformOrigin:"bottom center",
          animation:"compassSpin 1.8s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}>
          <div style={{ width:6, height:25, background:"linear-gradient(180deg,#C9A84C,#E8C96A)", borderRadius:"3px 3px 0 0" }}/>
          <div style={{ width:6, height:25, background:"rgba(255,255,255,0.25)", borderRadius:"0 0 3px 3px" }}/>
        </div>
        {/* Merkez nokta */}
        <div style={{ width:10, height:10, borderRadius:"50%", zIndex:2,
          background:"linear-gradient(135deg,#C9A84C,#E8C96A)",
          boxShadow:"0 0 8px rgba(201,168,76,0.8)" }}/>
        {/* Yön harfleri */}
        {[{l:"N",top:8,left:"50%",tx:"-50%"},{l:"S",bottom:8,left:"50%",tx:"-50%"},
          {l:"E",right:10,top:"50%",ty:"-50%"},{l:"W",left:10,top:"50%",ty:"-50%"}
        ].map(({l,top,bottom,left,right,tx,ty})=>(
          <span key={l} style={{
            position:"absolute", top, bottom, left, right,
            transform:`translateX(${tx||"0"}) translateY(${ty||"0"})`,
            fontSize:10, fontWeight:800, color:"rgba(201,168,76,0.7)",
            fontFamily:"'Montserrat',sans-serif",
          }}>{l}</span>
        ))}
      </div>

      {/* Başlık */}
      <div className="playfair" style={{
        fontSize:32, fontWeight:800, color:C.white,
        letterSpacing:1, textAlign:"center", lineHeight:1.2,
        marginBottom:10,
        animation:"fadeInUp 0.7s ease 0.4s both",
        textShadow:"0 2px 20px rgba(201,168,76,0.3)",
      }}>
        Pusula<span style={{ color:"#C9A84C" }}> Amerika</span>
      </div>

      {/* Slogan */}
      <div style={{
        fontSize:13, color:"rgba(255,255,255,0.6)",
        letterSpacing:2, textTransform:"uppercase",
        fontWeight:500,
        animation: phase>=1 ? "fadeInUp 0.6s ease both" : "none",
        opacity: phase>=1 ? 1 : 0,
        transition:"opacity 0.4s",
      }}>
        Amerika'daki Yol Arkadaşınız
      </div>

      {/* Alt dekor çizgi */}
      <div style={{
        position:"absolute", bottom:48, left:"50%", transform:"translateX(-50%)",
        width:48, height:2, borderRadius:2,
        background:"linear-gradient(90deg,transparent,#C9A84C,transparent)",
        animation:"fadeInUp 0.6s ease 1.2s both",
      }}/>
    </div>
  );
}

const C = {
  // Navy — ana marka rengi (eski kırmızının yerine)
  red:      "#0D1F3C",
  redDark:  "#060F1E",
  redMid:   "#1A3560",
  redLight: "#EBF0FA",
  redPale:  "#F5F7FB",
  // Gold — vurgu rengi
  turq:     "#C9A84C",
  turqDark: "#A67C30",
  turqLight:"#FDF5DC",
  // Genel
  bg:       "#FFFFFF",
  bgSoft:   "#F0F4FA",
  border:   "#D4DCEE",
  text:     "#0D1F3C",
  textSub:  "#3A5080",
  textMute: "#7A93BB",
  gold:     "#C9A84C",
  white:    "#FFFFFF",
  glass:    "rgba(255,255,255,0.12)",
  glassBorder: "rgba(255,255,255,0.22)",
};

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

const categories = [
  { id:"restaurant",  icon:"🍽️", label:"Restoran",     labelEN:"Restaurant",   color:C.red      },
  { id:"lawyer",      icon:"⚖️", label:"Avukat",        labelEN:"Lawyer",       color:"#0D1F3C"  },
  { id:"doctor",      icon:"🏥", label:"Doktor",        labelEN:"Doctor",       color:C.turq     },
  { id:"homeservice", icon:"🔨", label:"Usta & Servis", labelEN:"Home Service", color:"#B45309"  },
  { id:"realestate",  icon:"🏠", label:"Emlak",         labelEN:"Real Estate",  color:"#6D28D9"  },
  { id:"market",      icon:"🛒", label:"Market",        labelEN:"Market",       color:"#047857"  },
  { id:"beauty",      icon:"💇", label:"Güzellik",      labelEN:"Beauty",       color:"#BE185D"  },
  { id:"accountant",  icon:"📊", label:"Muhasebe",      labelEN:"Accounting",   color:C.turqDark },
  { id:"jobs",        icon:"💼", label:"İş İlanları",   labelEN:"Jobs",         color:C.red      },
  { id:"events",      icon:"🎉", label:"Etkinlikler",   labelEN:"Events",       color:"#D97706"  },
  { id:"other",       icon:"➕", label:"Diğer",         labelEN:"Other",        color:"#64748B"  },
];
// Şehir yakınlık haritası (yakın şehir önerileri için)
const NEARBY_CITIES = {
  "Brooklyn":  ["Manhattan","Queens","Paterson"],
  "Manhattan": ["Brooklyn","Queens","Newark"],
  "Queens":    ["Brooklyn","Manhattan","Paterson"],
  "Paterson":  ["Newark","Manhattan","Brooklyn"],
  "Newark":    ["Paterson","Manhattan","Brooklyn"],
  "Houston":   ["Dallas","Austin","San Antonio"],
  "Miami":     ["Fort Lauderdale","Orlando","Tampa"],
  "L.A.":      ["Los Angeles","Pasadena","Long Beach"],
};

// Eyalete göre popüler şehirler
const STATE_CITIES = {
  "New York":       ["Brooklyn","Manhattan","Queens","Bronx","Staten Island","Buffalo","Albany"],
  "New Jersey":     ["Paterson","Newark","Jersey City","Hoboken","Trenton","Edison"],
  "California":     ["Los Angeles","San Francisco","San Diego","Pasadena","Long Beach","San Jose"],
  "Texas":          ["Houston","Dallas","Austin","San Antonio","Fort Worth","El Paso"],
  "Florida":        ["Miami","Orlando","Tampa","Fort Lauderdale","Jacksonville","Boca Raton"],
  "Illinois":       ["Chicago","Naperville","Aurora","Rockford","Evanston"],
  "Pennsylvania":   ["Philadelphia","Pittsburgh","Allentown","Erie","Reading"],
  "Ohio":           ["Columbus","Cleveland","Cincinnati","Toledo","Akron"],
  "Georgia":        ["Atlanta","Savannah","Augusta","Macon","Sandy Springs"],
  "North Carolina": ["Charlotte","Raleigh","Durham","Greensboro","Winston-Salem"],
  "Michigan":       ["Detroit","Grand Rapids","Ann Arbor","Lansing","Dearborn"],
  "Virginia":       ["Virginia Beach","Arlington","Richmond","Norfolk","Alexandria"],
  "Washington":     ["Seattle","Bellevue","Tacoma","Spokane","Redmond"],
  "Arizona":        ["Phoenix","Tucson","Scottsdale","Tempe","Mesa"],
  "Massachusetts":  ["Boston","Worcester","Cambridge","Springfield","Lowell"],
  "Indiana":        ["Indianapolis","Fort Wayne","Evansville","South Bend","Carmel"],
  "Tennessee":      ["Nashville","Memphis","Knoxville","Chattanooga","Clarksville"],
  "Missouri":       ["Kansas City","St. Louis","Springfield","Columbia","Independence"],
  "Maryland":       ["Baltimore","Rockville","Gaithersburg","Frederick","Annapolis"],
  "Colorado":       ["Denver","Colorado Springs","Aurora","Boulder","Fort Collins"],
  "Minnesota":      ["Minneapolis","Saint Paul","Rochester","Duluth","Bloomington"],
  "Wisconsin":      ["Milwaukee","Madison","Green Bay","Kenosha","Racine"],
  "Connecticut":    ["Bridgeport","New Haven","Hartford","Stamford","Waterbury"],
  "Nevada":         ["Las Vegas","Henderson","Reno","North Las Vegas","Sparks"],
};


// Çalışma saatleri yardımcısı
const NOW_HOUR = new Date().getHours();
const NOW_DAY  = new Date().getDay(); // 0=Pazar

function isOpenNow(hours) {
  if (!hours) return null;
  const todaySlot = hours[NOW_DAY];
  if (!todaySlot || !todaySlot.open) return false;
  const [fh] = todaySlot.from.split(":").map(Number);
  const [th] = todaySlot.to.split(":").map(Number);
  return NOW_HOUR >= fh && NOW_HOUR < th;
}

function nextOpenInfo(hours) {
  if (!hours) return null;
  for (let i = 1; i <= 7; i++) {
    const idx = (NOW_DAY + i) % 7;
    const s = hours[idx];
    if (s && s.open) {
      const dayNames = ["Pazar","Pzt","Salı","Çar","Per","Cum","Cmt"];
      return `${dayNames[idx]} ${s.from}'de açılıyor`;
    }
  }
  return "Yakında açılıyor";
}

// Varsayılan saat şablonları
const H_REST  = [0,1,2,3,4,5,6].map(d=>({ open: d!==0, from:"11:00", to:"22:00" }));
const H_OFFICE= [0,1,2,3,4,5,6].map(d=>({ open: d>=1&&d<=5, from:"09:00", to:"18:00" }));
const H_247   = [0,1,2,3,4,5,6].map(d=>({ open: true, from:"00:00", to:"23:59" }));
const H_BEAUTY= [0,1,2,3,4,5,6].map(d=>({ open: d!==0&&d!==1, from:"10:00", to:"19:00" }));

const businesses = [];

const jobs = [];

const events = [];


/* ── Yardımcılar ── */
const Stars = ({ r }) => (
  <span>{[1,2,3,4,5].map(i =>
    <span key={i} style={{ color: i<=Math.round(r) ? C.gold : "#EECDD0", fontSize:11 }}>★</span>
  )}</span>
);
const Tag = ({ label }) => (
  <span style={{ background:C.redPale, border:`1px solid ${C.border}`,
    borderRadius:6, padding:"2px 8px", fontSize:10, color:C.textSub, fontWeight:500 }}>
    {label}
  </span>
);
const SLabel = ({ children }) => (
  <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
    letterSpacing:1.8, textTransform:"uppercase", marginBottom:12 }}>
    {children}
  </div>
);

/* ── SVG Pusula Logosu ── */
const PusulaLogo = ({ size=40, dark=false }) => {
  const tc = dark ? C.white : C.red;
  const sc = dark ? "rgba(255,255,255,0.55)" : C.textMute;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="20" stroke={dark?"rgba(201,168,76,0.5)":"rgba(201,168,76,0.6)"} strokeWidth="1.5"
          fill={dark?"rgba(255,255,255,0.08)":"rgba(13,31,60,0.06)"}/>
        {/* Kuzey iğnesi — Altın */}
        <polygon points="22,5 25,22 22,19 19,22" fill="#C9A84C"/>
        {/* Güney iğnesi — Soluk */}
        <polygon points="22,39 19,22 22,25 25,22" fill={dark?"rgba(255,255,255,0.35)":"rgba(13,31,60,0.2)"}/>
        <circle cx="22" cy="22" r="3" fill="#C9A84C"/>
        <circle cx="22" cy="22" r="1.5" fill={dark?C.white:"#0D1F3C"}/>
        <text x="22" y="14.5" textAnchor="middle" fontSize="5.5" fontWeight="800"
          fontFamily="'Montserrat',sans-serif" fill={dark?"rgba(255,255,255,0.7)":"#C9A84C"}>N</text>
      </svg>
      <div>
        <div style={{ fontFamily:"'Playfair Display','Georgia',serif", fontSize:size>32?22:17,
          fontWeight:"800", color:tc, letterSpacing:0.5, lineHeight:1 }}>
          Pusula <span style={{ color:"#C9A84C" }}>Amerika</span>
        </div>
        <div style={{ fontSize:size>32?9:8, color:sc, letterSpacing:2.5,
          textTransform:"uppercase", marginTop:2, fontFamily:"'Montserrat',sans-serif",
          fontWeight:600 }}>Amerika Rehberi </div>
      </div>
    </div>
  );
};

function Onboarding({ onDone }) {
  const [step, setStep]   = useState(0);
  const [sel, setSel]     = useState("");
  const [query, setQuery] = useState("");
  const filtered = US_STATES.filter(s => s.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.white }}>
      <div style={{
        background:`radial-gradient(ellipse at 20% 0%, #1A3560 0%, #0D1F3C 55%, #060F1E 100%)`,
        padding:"36px 24px 48px", position:"relative", overflow:"hidden" }}>
        {/* Dekor halkalar — glassmorphism */}
        <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200,
          borderRadius:"50%", border:"1px solid rgba(201,168,76,0.15)" }}/>
        <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120,
          borderRadius:"50%", border:"1px solid rgba(201,168,76,0.1)" }}/>
        <div style={{ position:"absolute", bottom:-50, left:-30, width:160, height:160,
          borderRadius:"50%", background:"rgba(255,255,255,0.03)" }}/>
        {/* Altın alt çizgi */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2,
          background:`linear-gradient(90deg,transparent,#C9A84C,transparent)` }}/>
        <div style={{ marginBottom:28, display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
          <img src="/logo.png" alt="Pusula Amerika" style={{ height:80, width:"auto", background:"transparent" }}/>
          <div className="playfair" style={{ fontSize:26, fontWeight:800, color:C.white, lineHeight:1.2 }}>
            Pusula<br/><span style={{ color:"#C9A84C" }}>Amerika</span>
          </div>
        </div>
        <div style={{ fontSize:10, color:"rgba(201,168,76,0.8)",
          letterSpacing:3, textTransform:"uppercase", marginBottom:8, fontWeight:600 }}>
          {step===0 ? "Hoş Geldiniz" : "Konumunuz"}
        </div>
        <div className="playfair" style={{ fontSize:22, fontWeight:"800", color:C.white, lineHeight:1.4 }}>
          {step===0 ? "Amerika'daki Türklerin Yol Arkadaşı"
                    : "Hangi eyalette\nyaşıyorsunuz?"}
        </div>
      </div>

      <div style={{ background:C.white, padding:"14px 24px 0",
        display:"flex", gap:6, justifyContent:"center" }}>
        {[0,1].map(i => (
          <div key={i} style={{ height:3, borderRadius:2, transition:"all 0.3s",
            width:i===step?32:10, background:i<=step?C.red:"#D4DCEE" }}/>
        ))}
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"24px" }}>
        {step===0 && (
          <>
            <div style={{ background:`linear-gradient(135deg,${C.redPale},#FFF5F6)`,
              border:`1px solid ${C.border}`, borderRadius:16,
              padding:"18px 16px", marginBottom:20, display:"flex", gap:14, alignItems:"center" }}>
              <div style={{ width:48, height:48, borderRadius:13, flexShrink:0,
                background:`linear-gradient(135deg,${C.red},${C.redDark})`,
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="26" height="26" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                  <polygon points="22,6 25,22 22,20 19,22" fill="white"/>
                  <polygon points="22,38 19,22 22,24 25,22" fill="rgba(255,255,255,0.35)"/>
                  <circle cx="22" cy="22" r="3" fill="white"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:3 }}>
                  Amerika'daki Türk Topluluğunu Keşfet
                </div>
                <div style={{ fontSize:12, color:C.textSub, lineHeight:1.5 }}>
                  50 eyalet · 2.400+ işletme · Türkçe destek
                </div>
              </div>
            </div>
            <SLabel>NE SUNUYORUZ</SLabel>
            {[
              { icon:"🍽️", title:"Restoran, Market & Daha Fazlası", sub:"Türk mutfağı, helal ürünler" },
              { icon:"⚖️", title:"Avukat, Doktor & Uzmanlar",        sub:"Türkçe profesyonel destek"  },
              { icon:"🔨", title:"Elektrikçi, Tesisatçı, Oto Servis",sub:"Güvenilir usta hizmetleri"  },
              { icon:"💼", title:"İş İlanları",                       sub:"150+ aktif ilan"            },
              { icon:"🎉", title:"Etkinlikler",                       sub:"Festival & topluluk buluşmaları"},
            ].map(f => (
              <div key={f.icon} style={{ display:"flex", alignItems:"center", gap:14,
                marginBottom:9, padding:"13px 16px",
                background:C.redPale, borderRadius:13, border:`1px solid ${C.border}` }}>
                <div style={{ width:40, height:40, borderRadius:11, flexShrink:0,
                  background:`linear-gradient(135deg,${C.red},${C.redDark})`,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:19 }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:1 }}>{f.title}</div>
                  <div style={{ fontSize:11, color:C.textSub }}>{f.sub}</div>
                </div>
              </div>
            ))}
          </>
        )}
        {step===1 && (
          <>
            <div style={{ display:"flex", alignItems:"center", gap:10,
              background:C.redPale, border:`1.5px solid ${C.border}`,
              borderRadius:13, padding:"11px 16px", marginBottom:14 }}>
              <span style={{ color:C.red, fontSize:15 }}>🔍</span>
              <input value={query} onChange={e=>setQuery(e.target.value)}
                placeholder="Eyalet ara... (ör: New York)" autoFocus
                style={{ background:"none", border:"none", outline:"none",
                  fontSize:14, color:C.text, flex:1 }}/>
              {query && <span onClick={()=>setQuery("")} style={{ color:C.textMute, cursor:"pointer" }}>✕</span>}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {filtered.map(st => {
                const active = sel===st;
                return (
                  <div key={st} onClick={()=>setSel(st)} style={{
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"13px 16px", borderRadius:12, cursor:"pointer",
                    background:active?C.red:C.redPale,
                    border:`1.5px solid ${active?C.redDark:C.border}`,
                    transition:"all 0.15s" }}>
                    <span style={{ fontSize:14, fontWeight:active?700:400,
                      color:active?C.white:C.text }}>{st}</span>
                    {active && <span style={{ color:C.white, fontSize:16 }}>✓</span>}
                  </div>
                );
              })}

            </div>
          </>
        )}
      </div>

      <div style={{ padding:"12px 24px 36px", background:C.white, borderTop:`1px solid ${C.border}` }}>
        {step===0 && (
          <>
            <button onClick={()=>setStep(1)} style={{ width:"100%", border:"none", borderRadius:13,
              padding:"15px", fontSize:15, fontWeight:700, cursor:"pointer", marginBottom:10,
              background:`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white }}>
              Başlayalım →
            </button>
            <button onClick={()=>onDone("")} style={{ width:"100%", background:"none",
              border:"none", fontSize:13, color:C.textMute, cursor:"pointer" }}>
              Şimdilik atla
            </button>
          </>
        )}
        {step===1 && (
          <>
            <button onClick={()=>sel&&onDone(sel)} style={{ width:"100%", border:"none", borderRadius:13,
              padding:"15px", fontSize:15, fontWeight:700, marginBottom:10,
              background:sel?`linear-gradient(135deg,${C.red},${C.redDark})`:"#D4DCEE",
              color:sel?C.white:C.textMute, cursor:sel?"pointer":"default" }}>
              {sel ? `${sel} — Keşfetmeye Başla 🧭` : "Eyalet seçin"}
            </button>
            <button onClick={()=>onDone("")} style={{ width:"100%", background:"none",
              border:"none", fontSize:13, color:C.textMute, cursor:"pointer" }}>
              Atla, sonra seçerim
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Home({ userState, userCity, onBusiness, onTab, favorites, toggleFav, onRegister, onNotifications, unreadCount, searchHistory, onAddSearchHistory, onClearHistory, lang, onLocationChange, dbBusinesses=[], dbJobs=[], dbEvents=[] }) {
  const [selCat,       setSelCat]       = useState(null);
  const [search,       setSearch]       = useState("");
  const [showFilters,  setShowFilters]  = useState(false);
  const [showOverlay,  setShowOverlay]  = useState(false);
  const [showLocModal, setShowLocModal] = useState(false);
  const [filterState,  setFilterState]  = useState("");
  const [filterCity,   setFilterCity]   = useState("");
  const [filterVerify, setFilterVerify] = useState(false);
  const [sortBy,       setSortBy]       = useState("default");

  const activeFilterCount = [
    filterState, filterCity, filterVerify, sortBy!=="default"
  ].filter(Boolean).length;

  const allBusinesses = [...businesses, ...dbBusinesses];
  const filtered = allBusinesses
    .filter(b => {
      if (selCat && b.cat !== selCat) return false;
      const q = search.toLocaleLowerCase("tr");
      if (search && !b.name.toLocaleLowerCase("tr").includes(q) &&
          !b.city.toLocaleLowerCase("tr").includes(q) &&
          !b.desc.toLocaleLowerCase("tr").includes(q) &&
          !b.tags.some(t=>t.toLocaleLowerCase("tr").includes(q))) return false;
      if (filterState && b.state !== filterState) return false;
      if (filterCity  && !b.city.toLowerCase().includes(filterCity.toLowerCase())) return false;
      if (filterVerify && !b.verified) return false;
      return true;
    })
    .sort((a,b) => {
      if (sortBy==="rating")  return b.rating  - a.rating;
      if (sortBy==="reviews") return b.reviews - a.reviews;
      if (sortBy==="onaylı") return (b.onaylı?0:1) - (a.onaylı?0:1);
      return 0;
    });

  // Yakın şehir önerisi: aranan şehirde sonuç yoksa
  const nearbyCities = filterCity && filtered.length===0
    ? (NEARBY_CITIES[Object.keys(NEARBY_CITIES).find(k=>k.toLowerCase()===filterCity.toLowerCase())] || [])
    : [];

  const featured = allBusinesses.filter(b=>b.verified && b.rating>=4.8).slice(0,4);
  const activeCat = categories.find(c=>c.id===selCat);
  const isFiltering = selCat || search.trim() || activeFilterCount > 0;

  const clearAll = () => {
    setSelCat(null); setSearch(""); setFilterState(""); setFilterCity("");
    setFilterVerify(false); setSortBy("default");
  };

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column",
      background:C.bgSoft, position:"relative" }}>

      {/* ── Header — Glassmorphism ── */}
      <div style={{
        background:`linear-gradient(135deg,${C.red} 0%,${C.redMid} 100%)`,
        borderBottom:"none", padding:"14px 18px 12px",
        boxShadow:"0 4px 20px rgba(13,31,60,0.18)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div onClick={clearAll} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
  <img src="/logo.png" alt="Pusula Amerika" style={{ height:38, width:"auto", background:"transparent" }}/>
  <div>
    <div className="playfair" style={{ fontSize:18, fontWeight:800, color:C.white, lineHeight:1 }}>
      Pusula <span style={{ color:"#C9A84C" }}>Amerika</span>
    </div>
    <div style={{ fontSize:9, color:"rgba(255,255,255,0.6)", letterSpacing:2, textTransform:"uppercase", marginTop:2 }}>
      Amerika Rehberi
    </div>
  </div>
</div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div onClick={()=>setShowLocModal(true)} style={{
              background:"rgba(255,255,255,0.13)",
              border:"1px solid rgba(255,255,255,0.22)",
              backdropFilter:"blur(8px)",
              borderRadius:8, padding:"4px 10px",
              fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.9)",
              cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
              📍 {userCity||userState||"Konum Seç"}
              <span style={{ fontSize:9, color:"rgba(255,255,255,0.6)" }}>✎</span>
            </div>
            <div onClick={onNotifications} style={{ width:34, height:34, borderRadius:10,
              background:"rgba(255,255,255,0.13)",
              border:"1px solid rgba(255,255,255,0.22)",
              backdropFilter:"blur(8px)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:15, cursor:"pointer", position:"relative" }}>
              🔔
              {unreadCount>0 && (
                <div style={{ position:"absolute", top:-4, right:-4, width:16, height:16,
                  borderRadius:"50%", background:"#C9A84C", border:"2px solid white",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:9, color:C.white, fontWeight:700 }}>{unreadCount}</div>
              )}
            </div>
          </div>
        </div>

        {/* Arama + Filtre butonu */}
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:10,
            background:"rgba(255,255,255,0.12)",
            border:"1.5px solid rgba(255,255,255,0.22)",
            backdropFilter:"blur(8px)",
            borderRadius:12, padding:"10px 14px" }}>
            <span style={{ color:"rgba(255,255,255,0.7)", fontSize:15 }}>🔍</span>
            <input value={search}
              onFocus={()=>{}}
              onChange={e=>{ setSearch(e.target.value); setShowOverlay(false); if(e.target.value) setSelCat(null); }}
              onKeyDown={e=>{ if(e.key==="Enter"&&search){ onAddSearchHistory(search); setShowOverlay(false); }}}
              placeholder={lang==="TR"?"İşletme ara...":"Search businesses..."}
              style={{ background:"none", border:"none", outline:"none",
                fontSize:14, color:C.white, flex:1 }}/>
            {search && <span onClick={()=>{setSearch("");setShowOverlay(false);}}
              style={{ color:"rgba(255,255,255,0.6)", cursor:"pointer" }}>✕</span>}
          </div>

          {/* Filtre butonu */}
          <div onClick={()=>setShowFilters(f=>!f)} style={{ position:"relative",
            width:44, height:44, borderRadius:12, flexShrink:0,
            background: showFilters ? "#C9A84C" : "rgba(255,255,255,0.13)",
            border:`1.5px solid ${showFilters ? "#C9A84C" : "rgba(255,255,255,0.22)"}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
  <line x1="4" y1="6" x2="20" y2="6"/>
  <circle cx="8" cy="6" r="2" fill="white"/>
  <line x1="4" y1="12" x2="20" y2="12"/>
  <circle cx="16" cy="12" r="2" fill="white"/>
  <line x1="4" y1="18" x2="20" y2="18"/>
  <circle cx="10" cy="18" r="2" fill="white"/>
</svg>
            {activeFilterCount>0 && (
              <div style={{ position:"absolute", top:-4, right:-4, width:16, height:16,
                borderRadius:"50%", background:"#C9A84C", border:"2px solid white",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:9, color:C.white, fontWeight:700 }}>
                {activeFilterCount}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Filtre paneli (açılır) ── */}
      {showFilters && (
        <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`,
          padding:"16px 18px" }}>

          {/* Eyalet */}
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
              letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>Eyalet</div>
            <select value={filterState} onChange={e=>setFilterState(e.target.value)}
              style={{ width:"100%", padding:"9px 12px", borderRadius:10,
                border:`1.5px solid ${filterState ? C.red : C.border}`,
                background:filterState ? C.redLight : C.redPale,
                fontSize:13, color:filterState ? C.red : C.textMute,
                outline:"none", fontWeight: filterState ? 700 : 400 }}>
              <option value="">Tüm eyaletler</option>
              {US_STATES.map(s=>(
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

        

          {/* Sıralama */}
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
              letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>Sıralama</div>
            <div style={{ display:"flex", gap:6 }}>
              {[
                { val:"default", label:"Varsayılan"     },
                { val:"rating",  label:"En Yüksek Puan" },
                { val:"reviews", label:"En Çok Yorum"   },
                
              ].map(s=>(
                <div key={s.val} onClick={()=>setSortBy(s.val)} style={{ flex:1,
                  padding:"7px 4px", borderRadius:9, textAlign:"center", cursor:"pointer",
                  fontSize:10, fontWeight:700,
                  background: sortBy===s.val ? C.red : C.redPale,
                  border:`1px solid ${sortBy===s.val ? C.red : C.border}`,
                  color: sortBy===s.val ? C.white : C.textSub }}>
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* Onaylı toggle + Temizle */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div onClick={()=>setFilterVerify(v=>!v)}
              style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
              <div style={{ width:40, height:22, borderRadius:11,
                background: filterVerify ? C.red : "#DDD", position:"relative",
                transition:"background 0.2s" }}>
                <div style={{ width:16, height:16, borderRadius:"50%", background:C.white,
                  position:"absolute", top:3,
                  left: filterVerify ? 21 : 3, transition:"left 0.2s",
                  boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}/>
              </div>
              <span style={{ fontSize:12, fontWeight:600, color:C.text }}>
                Sadece onaylı işletmeler
              </span>
            </div>
            {activeFilterCount > 0 && (
              <div onClick={clearAll} style={{ fontSize:11, color:C.red,
                fontWeight:700, cursor:"pointer" }}>
                Temizle ({activeFilterCount})
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Konum Değiştir Modalı ── */}
      {showLocModal && (
        <LocationModal
          currentState={userState} currentCity={userCity}
          onSave={(st,ct)=>{ onLocationChange(st,ct); setShowLocModal(false); }}
          onClose={()=>setShowLocModal(false)}/>
      )}

      {/* ── Arama Overlay ── */}
      {showOverlay && (
        <SearchOverlay
          history={searchHistory}
          onSelect={q=>{ setSearch(q); onAddSearchHistory(q); setShowOverlay(false); }}
          onClear={onClearHistory}
          onClose={()=>setShowOverlay(false)}/>
      )}

      <div style={{ flex:1, overflowY:"auto", paddingBottom:80 }}>

        {/* Ana sayfa içeriği — filtre/arama yokken */}
        {!isFiltering && (
          <>
            {/* Rehber şeridi */}
            <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`,
              padding:"13px 18px", display:"flex", alignItems:"center", gap:12 }}>
              <svg width="20" height="20" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
                <polygon points="22,5 25,22 22,19 19,22" fill="white"/>
                <polygon points="22,39 19,22 22,25 25,22" fill="rgba(255,255,255,0.4)"/>
                <circle cx="22" cy="22" r="3" fill="white"/>
              </svg>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:C.white }}>Amerika'da Türk İşletmeleri</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.65)" }}>2.400+ onaylı işletme · 50 eyalet</div>
              </div>
              <div onClick={onRegister} style={{ background:"rgba(255,255,255,0.18)",
                border:"1px solid rgba(255,255,255,0.3)", borderRadius:9,
                padding:"6px 12px", fontSize:10, fontWeight:700,
                color:C.white, cursor:"pointer", flexShrink:0 }}>
                + İşletme Ekle
              </div>
            </div>

            {/* Kategoriler */}
            <div style={{ padding:"16px 18px 16px", background:C.white,
              borderBottom:`1px solid ${C.border}` }}>
              <SLabel>KATEGORİLER</SLabel>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:9 }}>
                {categories.map(cat => {
                  const active = selCat===cat.id;
                  return (
                    <div key={cat.id} onClick={()=>{
                      if(cat.id==="jobs")   { onTab("jobs");   return; }
                      if(cat.id==="events") { onTab("events"); return; }
                      setSelCat(active?null:cat.id);
                    }} style={{
                      background:active?cat.color:C.redPale,
                      border:`1.5px solid ${active?cat.color:C.border}`,
                      borderRadius:13, padding:"12px 4px",
                      textAlign:"center", cursor:"pointer", transition:"all 0.15s" }}>
                      <div style={{ fontSize:21, marginBottom:5 }}>{cat.icon}</div>
                      <div style={{ fontSize:9, fontWeight:700, lineHeight:1.2,
                        color:active?C.white:C.textSub }}>{lang==="EN"?(cat.labelEN||cat.label):cat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Etkinlikler hızlı erişim */}
            <div style={{ padding:"16px 18px 0" }}>
              <div onClick={()=>onTab("events")} style={{ borderRadius:15, padding:"16px 20px",
                background:`linear-gradient(135deg,${C.turq},${C.turqDark})`,
                cursor:"pointer", position:"relative", overflow:"hidden",
                display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ position:"absolute", right:-10, bottom:-10, fontSize:56, opacity:0.1 }}>🎉</div>
                <div style={{ width:46, height:46, borderRadius:13, flexShrink:0,
                  background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.25)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🎉</div>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:C.white }}>Etkinlikler</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.75)", marginTop:2 }}>
                    Bu ay 50+ Türk topluluk etkinliği
                  </div>
                </div>
                <div style={{ marginLeft:"auto", fontSize:18, color:"rgba(255,255,255,0.6)" }}>›</div>
              </div>
            </div>

            {/* Öne Çıkan Etkinlikler */}
            <div style={{ padding:"18px 18px 0" }}>
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"center", marginBottom:12 }}>
                <SLabel>🎉 ÖNE ÇIKAN ETKİNLİKLER</SLabel>
                <div onClick={()=>onTab("events")} style={{ fontSize:12, color:C.red, fontWeight:600,
                  cursor:"pointer", marginTop:-12 }}>Tümü →</div>
              </div>
              <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:4 }}>
                {[...events, ...dbEvents].slice(0,4).map(ev => (
                  <div key={ev.id} style={{ flexShrink:0, width:160,
                    background:C.white, border:`1px solid ${C.border}`,
                    borderRadius:16, overflow:"hidden", cursor:"pointer",
                    boxShadow:"0 1px 4px rgba(13,31,60,0.07)" }}>
                    <div style={{ height:66,
                      background:`linear-gradient(135deg,#FFF8E1,#FFF3CD)`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:32, borderBottom:`1px solid ${C.border}`, position:"relative" }}>
                      {ev.img}
                      <div style={{ position:"absolute", top:6, right:6,
                        background: ev.free ? "#065F46" : C.turq,
                        borderRadius:6, padding:"2px 6px",
                        fontSize:8, fontWeight:700, color:C.white }}>
                        {ev.free ? "ÜCRETSİZ" : ev.price}
                      </div>
                    </div>
                    <div style={{ padding:"10px 12px" }}>
                      <div style={{ fontSize:11, fontWeight:700, color:C.text, marginBottom:3,
                        overflow:"hidden", textOverflow:"ellipsis",
                        display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
                        {ev.title}
                      </div>
                      <div style={{ fontSize:10, color:C.textMute, marginBottom:2 }}>📅 {ev.date}</div>
                      <div style={{ fontSize:10, color:C.textMute }}>📍 {ev.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Öne Çıkan İşletmeler */}
            <div style={{ padding:"18px 18px 0" }}>
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"center", marginBottom:12 }}>
                <SLabel>🏆 ÖNE ÇIKAN İŞLETMELER</SLabel>
                <div style={{ fontSize:12, color:C.red, fontWeight:600,
                  cursor:"pointer", marginTop:-12 }}>Tümü →</div>
              </div>
              <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:4 }}>
                {featured.map(b => (
                  <div key={b.id} onClick={()=>onBusiness(b)} style={{ flexShrink:0, width:148,
                    background:C.white, border:`1.5px solid #F59E0B`,
                    borderRadius:16, overflow:"hidden", cursor:"pointer",
                    boxShadow:"0 2px 8px rgba(245,158,11,0.15)" }}>
                    <div style={{ height:66,
                      background:`linear-gradient(135deg,#FFF8E1,#FFF3CD)`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:30, borderBottom:`1px solid #F59E0B`, position:"relative" }}>
                      {b.img}
                      <div style={{ position:"absolute", top:6, right:6,
                        background:"linear-gradient(135deg,#F59E0B,#D97706)",
                        borderRadius:6, padding:"2px 5px",
                        fontSize:8, fontWeight:700, color:C.white }}>⭐ ÖNE ÇIKAN</div>
                    </div>
                    <div style={{ padding:"10px 12px" }}>
                      <div style={{ fontSize:12, fontWeight:700, color:C.text, marginBottom:2,
                        whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                        {b.name}
                      </div>
                      <div style={{ fontSize:10, color:C.textMute, marginBottom:4 }}>📍 {b.city}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                        <Stars r={b.rating}/>
                        <span style={{ fontSize:10, fontWeight:700, color:C.text }}>{b.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Yakınımdaki İşletmeler */}
            {userState && (() => {
              const nearby = businesses.filter(b=>b.state===userState).slice(0,6);
              if (!nearby.length) return null;
              return (
                <div style={{ padding:"18px 18px 0" }}>
                  <div style={{ display:"flex", justifyContent:"space-between",
                    alignItems:"center", marginBottom:12 }}>
                    <SLabel>📍 YAKINIMDAKI İŞLETMELER</SLabel>
                    <div onClick={()=>setFilterState(userState)}
                      style={{ fontSize:12, color:C.red, fontWeight:600,
                        cursor:"pointer", marginTop:-12 }}>Tümü →</div>
                  </div>
                  <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:4 }}>
                    {nearby.map(b=>(
                      <div key={b.id} onClick={()=>onBusiness(b)} style={{ flexShrink:0, width:156,
                        background:C.white,
                        border:`1.5px solid ${b.onaylı?"#F59E0B":C.border}`,
                        borderRadius:14, padding:"12px", cursor:"pointer",
                        boxShadow: b.onaylı?"0 2px 8px rgba(245,158,11,0.18)":"0 1px 4px rgba(200,16,46,0.05)",
                        position:"relative" }}>
                        {b.onaylı && (
                          <div style={{ position:"absolute", top:8, right:8,
                            background:"linear-gradient(135deg,#F59E0B,#D97706)",
                            borderRadius:6, padding:"2px 6px",
                            fontSize:8, fontWeight:700, color:C.white }}>✅ONAYLANMIŞ</div>
                        )}
                        <div style={{ fontSize:26, marginBottom:8 }}>{b.img}</div>
                        <div style={{ fontSize:12, fontWeight:700, color:C.text,
                          marginBottom:3, whiteSpace:"nowrap",
                          overflow:"hidden", textOverflow:"ellipsis" }}>{b.name}</div>
                        <div style={{ fontSize:10, color:C.textMute, marginBottom:4 }}>📍 {b.city}</div>
                        <div style={{ display:"flex", alignItems:"center", gap:3, marginBottom:4 }}>
                          <Stars r={b.rating}/>
                          <span style={{ fontSize:10, fontWeight:700, color:C.text }}>{b.rating}</span>
                        </div>
                        {(() => {
                          const open = isOpenNow(b.hours);
                          if (open===null) return null;
                          return (
                            <span style={{
                              background: open?"#D1FAE5":"#FEE2E2",
                              color:       open?"#065F46":"#991B1B",
                              borderRadius:5, padding:"2px 6px",
                              fontSize:9, fontWeight:700 }}>
                              {open?"● Açık":"● Kapalı"}
                            </span>
                          );
                        })()}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </>
        )}

        {/* ── Sonuç listesi (filtre/arama/kategori aktifken) ── */}
        <div style={{ padding:"16px 18px 0" }}>
          {isFiltering && (
            <div style={{ display:"flex", justifyContent:"space-between",
              alignItems:"center", marginBottom:14 }}>
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
                  letterSpacing:1.5, textTransform:"uppercase", marginBottom:2 }}>
                  {activeCat ? `${activeCat.icon} ${activeCat.label}` : search ? `"${search}"` : "FİLTRELENDİ"}
                </div>
                <div onClick={()=>setSelCat(null)} style={{ display:"flex", alignItems:"center",
                gap:6, background:C.white, border:`1px solid ${C.border}`,
                borderRadius:20, padding:"6px 14px", fontSize:12, fontWeight:700,
                color:C.red, cursor:"pointer", marginBottom:6 }}>← Ana Menüye Dön</div>
              <div style={{ fontSize:12, color:C.textSub }}>
                  {filtered.length} işletme bulundu
                </div>
              </div>
            
            </div>
          )}

          
          {isFiltering && activeFilterCount>0 && (
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
              {filterState && (
                <div onClick={()=>setFilterState("")} style={{ display:"flex", alignItems:"center",
                  gap:4, background:C.red, borderRadius:20, padding:"4px 10px",
                  fontSize:10, fontWeight:700, color:C.white, cursor:"pointer" }}>
                  📍 {filterState} ✕
                </div>
              )}
              {filterCity && (
                <div onClick={()=>setFilterCity("")} style={{ display:"flex", alignItems:"center",
                  gap:4, background:C.red, borderRadius:20, padding:"4px 10px",
                  fontSize:10, fontWeight:700, color:C.white, cursor:"pointer" }}>
                  🏙 {filterCity} ✕
                </div>
              )}
              {filterVerify && (
                <div onClick={()=>setFilterVerify(false)} style={{ display:"flex", alignItems:"center",
                  gap:4, background:C.turq, borderRadius:20, padding:"4px 10px",
                  fontSize:10, fontWeight:700, color:C.white, cursor:"pointer" }}>
                  ✓ Onaylı ✕
                </div>
              )}
              {sortBy!=="default" && (
                <div onClick={()=>setSortBy("default")} style={{ display:"flex", alignItems:"center",
                  gap:4, background:"#64748B", borderRadius:20, padding:"4px 10px",
                  fontSize:10, fontWeight:700, color:C.white, cursor:"pointer" }}>
                  ↕ {sortBy==="rating"?"En Yüksek Puan":sortBy==="reviews"?"En Çok Yorum":"onaylı Önce"} ✕
                </div>
              )}
            </div>
          )}

          {filtered.length===0 ? (
            <div style={{ textAlign:"center", padding:"40px 20px" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🧭</div>
              <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:8 }}>
                {filterCity ? `"${filterCity}" şehrinde henüz işletme yok` : "Sonuç bulunamadı"}
              </div>
              <div style={{ fontSize:12, color:C.textMute, marginBottom:16, lineHeight:1.6 }}>
                {filterCity ? "Yakın şehirlere bakabilir ya da filtreleri temizleyebilirsin." : "Farklı bir arama dene ya da filtreleri temizle."}
              </div>
              {nearbyCities.length>0 ? (
                <div style={{ marginTop:16 }}>
                  <div style={{ fontSize:12, color:C.textMute, marginBottom:10 }}>
                    Yakın şehirlere bak:
                  </div>
                  <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
                    {nearbyCities.map(city=>(
                      <div key={city} onClick={()=>setFilterCity(city)} style={{
                        background:C.red, color:C.white, borderRadius:20,
                        padding:"6px 16px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                        📍 {city}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div onClick={clearAll} style={{ fontSize:12, color:C.red,
                  fontWeight:700, cursor:"pointer", marginTop:8 }}>
                  Filtreleri temizle →
                </div>
              )}
            </div>
          ) : (isFiltering ? filtered : businesses).map(b => (
            <div key={b.id} style={{ background:C.white, border:`1px solid ${C.border}`,
              borderRadius:16, padding:"14px 16px", marginBottom:10,
              display:"flex", gap:14, boxShadow:"0 1px 4px rgba(200,16,46,0.05)" }}>
              <div onClick={()=>onBusiness(b)} style={{ width:52, height:52, borderRadius:14,
                flexShrink:0, background:`linear-gradient(135deg,${C.redPale},#FFF5F6)`,
                border:`1px solid ${C.border}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:24, cursor:"pointer" }}>
                {b.img}
              </div>
              <div onClick={()=>onBusiness(b)} style={{ flex:1, minWidth:0, cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between",
                  alignItems:"flex-start", marginBottom:2 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:C.text,
                    flex:1, marginRight:6 }}>{b.name}</div>
                  <div style={{ display:"flex", gap:4, flexShrink:0 }}>
                    {b.onaylı && (
                      <span style={{ background:"linear-gradient(135deg,#F59E0B,#D97706)",
                        borderRadius:6, padding:"2px 6px",
                        fontSize:9, color:C.white, fontWeight:700 }}>✅ONAYLANMIŞ</span>
                    )}
                    {b.verified && (
                      <span style={{ background:"linear-gradient(135deg,#F59E0B,#D97706)", borderRadius:6, padding:"2px 8px",
                        fontSize:9, color:C.white, fontWeight:700 }}>✅ ONAYLANDI</span>
                    )}
                  </div>
                </div>
                <div style={{ fontSize:11, color:C.textMute, marginBottom:5 }}>
                  📍 {b.city}, {b.state}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:6 }}>
                  <Stars r={b.rating}/>
                  <span style={{ fontSize:12, fontWeight:700, color:C.text }}>{b.rating}</span>
                  <span style={{ fontSize:11, color:C.textMute }}>({b.reviews})</span>
                  {(() => {
                    const open = isOpenNow(b.hours);
                    if (open === null) return null;
                    return (
                      <span style={{
                        background: open ? "#D1FAE5" : "#FEE2E2",
                        color:       open ? "#065F46"  : "#991B1B",
                        borderRadius:6, padding:"2px 7px",
                        fontSize:9, fontWeight:700 }}>
                        {open ? "● Açık" : "● Kapalı"}
                      </span>
                    );
                  })()}
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                  {b.tags.map(t=><Tag key={t} label={t}/>)}
                </div>
              </div>
              <div onClick={()=>toggleFav(b.id)} style={{ flexShrink:0, fontSize:26,
                cursor:"pointer", paddingTop:2,
                color: favorites.includes(b.id) ? "#E11D48" : "#EECDD0" }}>
                {favorites.includes(b.id) ? "♥" : "♡"}
              </div>
            </div>
          ))}

          {!isFiltering && (
            <div onClick={onRegister} style={{ border:`2px dashed ${C.border}`,
              borderRadius:16, padding:"20px", textAlign:"center",
              background:C.redPale, cursor:"pointer", marginTop:4 }}>
              <div style={{ fontSize:22, marginBottom:8 }}>🏢</div>
              <div style={{ fontSize:13, fontWeight:600, color:C.text, marginBottom:4 }}>
                İşletmenizi Ekleyin
              </div>
              <div style={{ fontSize:11, color:C.textMute, marginBottom:14 }}>
                Ücretsiz listelenin, müşteri bulun
              </div>
              <div style={{ display:"inline-block",
                background:`linear-gradient(135deg,${C.red},${C.redDark})`,
                borderRadius:10, padding:"9px 22px", fontSize:12,
                fontWeight:700, color:C.white }}>
                Ücretsiz Ekle
              </div>
            </div>
          )}
          <div style={{ height:16 }}/>
        </div>
      </div>
    </div>
  );
}

function Favorites({ favorites, onBusiness, toggleFav, dbBusinesses=[] }) {
  const allBiz = [...businesses, ...dbBusinesses];
  const favList = allBiz.filter(b=>favorites.includes(b.id));

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.bgSoft }}>
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"16px 18px 14px" }}>
        <div style={{ fontSize:17, fontWeight:700, color:C.text, marginBottom:2 }}>Favorilerim</div>
        <div style={{ fontSize:11, color:C.textMute }}>{favList.length} kaydedilmiş işletme</div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"16px 18px" }}>
        {favList.length===0 ? (
          <div style={{ textAlign:"center", paddingTop:60 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>♡</div>
            <div style={{ fontSize:15, fontWeight:600, color:C.textSub, marginBottom:8 }}>
              Henüz favori yok
            </div>
            <div style={{ fontSize:13, color:C.textMute }}>
              İşletme kartlarındaki ♡ ikonuna tıklayarak favori ekleyin
            </div>
          </div>
        ) : favList.map(b => (
          <div key={b.id} style={{ background:C.white, border:`1px solid ${C.border}`,
            borderRadius:16, padding:"14px 16px", marginBottom:10,
            display:"flex", gap:14, boxShadow:"0 1px 4px rgba(200,16,46,0.05)" }}>
            <div onClick={()=>onBusiness(b)} style={{ width:52, height:52, borderRadius:14, flexShrink:0,
              background:`linear-gradient(135deg,${C.redPale},#FFF5F6)`,
              border:`1px solid ${C.border}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:24, cursor:"pointer" }}>
              {b.img}
            </div>
            <div onClick={()=>onBusiness(b)} style={{ flex:1, minWidth:0, cursor:"pointer" }}>
              <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:2 }}>{b.name}</div>
              <div style={{ fontSize:11, color:C.textMute, marginBottom:5 }}>📍 {b.city}, {b.state}</div>
              <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                <Stars r={b.rating}/>
                <span style={{ fontSize:12, fontWeight:700, color:C.text }}>{b.rating}</span>
                <span style={{ fontSize:11, color:C.textMute }}>({b.reviews})</span>
              </div>
            </div>
            <div onClick={()=>toggleFav(b.id)}
              style={{ flexShrink:0, fontSize:22, cursor:"pointer", paddingTop:2, color:C.red }}>
              ♥
            </div>
          </div>
        ))}
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

function Jobs({ onBack, onPost, extraJobs=[] }) {
  const allJobs = [...extraJobs, ...jobs];
  const filtered = allJobs;

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.bgSoft }}>
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"16px 18px 0" }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:C.red,
          fontSize:13, fontWeight:700, cursor:"pointer",
          padding:"0 0 12px", display:"flex", alignItems:"center", gap:6 }}>← Geri</button>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <div style={{ width:38, height:38, borderRadius:11,
            background:`linear-gradient(135deg,${C.red},${C.redDark})`,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:19 }}>💼</div>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:C.text }}>İş İlanları</div>
            <div style={{ fontSize:10, color:C.textMute }}>{allJobs.length} aktif ilan</div>
          </div>
          <div onClick={onPost} style={{ marginLeft:"auto",
            background:`linear-gradient(135deg,${C.red},${C.redDark})`,
            borderRadius:10, padding:"7px 14px",
            fontSize:11, fontWeight:700, color:C.white, cursor:"pointer" }}>+ İlan Ver</div>
        </div>

      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 18px" }}>
        {filtered.map(job => (
          <div key={job.id} style={{ background:C.white, border:`1px solid ${C.border}`,
            borderRadius:16, padding:"16px", marginBottom:10,
            position:"relative", overflow:"hidden",
            boxShadow:"0 1px 4px rgba(200,16,46,0.05)" }}>
            {job.urgent && <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
              background:`linear-gradient(90deg,${C.red},${C.redMid})` }}/>}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:3 }}>{job.title}</div>
                <div style={{ fontSize:12, color:C.red, fontWeight:600 }}>{job.company}</div>
              </div>
              {job.urgent && <span style={{ background:C.redLight, border:`1px solid ${C.border}`,
                borderRadius:6, padding:"2px 8px", fontSize:9, color:C.red,
                fontWeight:700, flexShrink:0, marginLeft:8 }}>ACİL</span>}
            </div>
            <div style={{ display:"flex", gap:14, marginBottom:8 }}>
              <span style={{ fontSize:11, color:C.textSub }}>📍 {job.location}</span>

            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            
              <span style={{ fontSize:11, color:C.textMute }}>{job.posted}</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12 }}>
              {job.tags.map(t=><Tag key={t} label={t}/>)}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              {job.phone && (
                <a href={`tel:${job.phone}`} style={{ flex:2,
                  background:`linear-gradient(135deg,${C.red},${C.redDark})`,
                  borderRadius:10, padding:"10px", textAlign:"center",
                  fontSize:12, fontWeight:700, color:C.white, cursor:"pointer",
                  textDecoration:"none", display:"block" }}>📞 İletişime Geç</a>
              )}
              <div onClick={()=>{if(navigator.share)navigator.share({title:job.title,text:`${job.company}`});}}
                style={{ flex:1, background:C.redPale, border:`1px solid ${C.border}`,
                borderRadius:10, padding:"10px", textAlign:"center",
                fontSize:12, color:C.textSub, cursor:"pointer" }}>📤 Paylaş</div>
            </div>
          </div>
        ))}
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

function Events({ onBack, onPost, dbEvents=[], rsvpList=[], onRsvpChange, initialEvent=null, onClearInitial }) {
  const [filter, setFilter] = useState("Tümü");
  const [rsvp, setRsvp] = useState(rsvpList||[]); // katılınan etkinlik id'leri
const [selectedEvent, setSelectedEvent] = useState(initialEvent);
const [photoView, setPhotoView] = useState(null);
  const toggleRsvp = id => {
  const newRsvp = rsvp.includes(id) ? rsvp.filter(x=>x!==id) : [...rsvp,id];
  setRsvp(newRsvp);
  onRsvpChange && onRsvpChange(newRsvp);
};
  const catList = ["Tümü","Ulusal Bayram","Kültür & Sanat","Yemek","Networking","Müzik"];
  const allEvents = [...events, ...dbEvents];
  const filtered = filter==="Tümü" ? allEvents : allEvents.filter(e=>e.cat===filter);
  if (selectedEvent) return (
    <div style={{ minHeight:"100vh", height:"100vh", display:"flex", flexDirection:"column", background:C.bgSoft, width:"100%" }}>
      <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`, padding:"20px 20px 32px" }}>
        <button onClick={()=>setSelectedEvent(null)} style={{ background:"none", border:"none",
          color:"rgba(255,255,255,0.75)", fontSize:13, fontWeight:700,
          cursor:"pointer", marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
          ← Geri
        </button>
        <div style={{ display:"flex", gap:14, alignItems:"center" }}>
          <div onClick={()=>{ if(selectedEvent.image_url||selectedEvent.imageUrl) setPhotoView(selectedEvent.image_url||selectedEvent.imageUrl); }}
            style={{ width:64, height:64, borderRadius:18, flexShrink:0,
            background:"rgba(255,255,255,0.2)", border:"2px solid rgba(255,255,255,0.4)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:32,
            overflow:"hidden", cursor:(selectedEvent.image_url||selectedEvent.imageUrl)?"zoom-in":"default" }}>
            {(selectedEvent.image_url||selectedEvent.imageUrl)
              ? <img src={selectedEvent.image_url||selectedEvent.imageUrl} alt={selectedEvent.title}
                  style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
              : selectedEvent.img}
          </div>
          <div>
            <div style={{ fontSize:18, fontWeight:700, color:C.white, lineHeight:1.3 }}>{selectedEvent.title}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.75)", marginTop:4 }}>{selectedEvent.org}</div>
          </div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"20px" }}>
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:"16px", marginBottom:14 }}>
          {[
            { icon:"📅", label:"Tarih", val:selectedEvent.date },
            { icon:"📍", label:"Konum", val:selectedEvent.location },
            { icon:"🏢", label:"Organizatör", val:selectedEvent.org },
            { icon:"👥", label:"Katılımcı", val:`${selectedEvent.attendees} kişi` },
            { icon:"💰", label:"Ücret", val:selectedEvent.free ? "Ücretsiz" : selectedEvent.price },
          ].map((row,i,arr)=>(
            <div key={row.label} style={{ display:"flex", gap:12, padding:"11px 0",
              borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none", alignItems:"flex-start" }}>
              <span style={{ fontSize:16 }}>{row.icon}</span>
              <div>
                <div style={{ fontSize:10, color:C.textMute, fontWeight:600, marginBottom:2 }}>{row.label}</div>
                <div style={{ fontSize:13, color:C.text }}>{row.val||"—"}</div>
              </div>
            </div>
          ))}
        </div>
        {selectedEvent.description && (
          <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:"16px", marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.textMute, letterSpacing:1.5, textTransform:"uppercase", marginBottom:10 }}>AÇIKLAMA</div>
            <div style={{ fontSize:13, color:C.text, lineHeight:1.7 }}>{selectedEvent.description}</div>
          </div>
        )}
        <button onClick={()=>{ const id=selectedEvent.id; setRsvp(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]); }}
          style={{ width:"100%", border:"none", borderRadius:13, padding:"14px", fontSize:14, fontWeight:700,
            cursor:"pointer", background:rsvp.includes(selectedEvent.id)
              ?`linear-gradient(135deg,#28a745,#1e7e34)`
              :`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white }}>
          {rsvp.includes(selectedEvent.id) ? "✓ Katılıyorum" : "Katıl"}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.bgSoft }}>
      <PhotoModal url={photoView} onClose={()=>setPhotoView(null)}/>
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"16px 18px 0" }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:C.red,
          fontSize:13, fontWeight:700, cursor:"pointer",
          padding:"0 0 12px", display:"flex", alignItems:"center", gap:6 }}>← Geri</button>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <div style={{ width:38, height:38, borderRadius:11,
            background:`linear-gradient(135deg,${C.red},${C.redDark})`,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:19 }}>🎉</div>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:C.text }}>Etkinlikler</div>
            <div style={{ fontSize:10, color:C.textMute }}>Türk topluluk etkinlikleri</div>
          </div>
          <div onClick={onPost} style={{ marginLeft:"auto",
            background:`linear-gradient(135deg,${C.red},${C.redDark})`,
            borderRadius:10, padding:"7px 14px",
            fontSize:11, fontWeight:700, color:C.white, cursor:"pointer" }}>+ Ekle</div>
        </div>
        <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:12 }}>
          {catList.map(c=>(
            <div key={c} onClick={()=>setFilter(c)} style={{ flexShrink:0,
              padding:"6px 13px", borderRadius:20, fontSize:11, fontWeight:600, cursor:"pointer",
              background:filter===c?C.red:C.redPale,
              border:`1px solid ${filter===c?C.red:C.border}`,
              color:filter===c?C.white:C.textSub }}>{c}</div>
          ))}
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 18px" }}>
        {filtered.map(ev => (
          <div key={ev.id} onClick={()=>setSelectedEvent(ev)} style={{ background:C.white, border:`1px solid ${C.border}`,
            borderRadius:16, overflow:"hidden", marginBottom:12,
            boxShadow:"0 1px 4px rgba(200,16,46,0.05)", cursor:"pointer" }}>
            <div style={{ height:4, background:
              ev.cat==="Ulusal Bayram"
                ? `linear-gradient(90deg,${C.red},${C.turq})`
                : `linear-gradient(90deg,${C.red},${C.redMid})` }}/>
            <div style={{ padding:"14px 16px" }}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div onClick={e=>{ e.stopPropagation(); if(ev.image_url||ev.imageUrl) setPhotoView(ev.image_url||ev.imageUrl); }}
                  style={{ width:52, height:52, borderRadius:14, flexShrink:0,
                  background:C.redPale, border:`1px solid ${C.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:24,
                  overflow:"hidden", cursor:(ev.image_url||ev.imageUrl)?"zoom-in":"default" }}>
                  {(ev.image_url||ev.imageUrl)
                    ? <img src={ev.image_url||ev.imageUrl} alt={ev.title}
                        style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                    : ev.img}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:4, lineHeight:1.3 }}>{ev.title}</div>
                  <div style={{ fontSize:11, color:C.red, fontWeight:600, marginBottom:4 }}>{ev.org}</div>
                  <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                    <span style={{ fontSize:11, color:C.textSub }}>📅 {ev.date}</span>
                    <span style={{ fontSize:11, color:C.textSub }}>📍 {ev.location}</span>
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <span style={{ fontSize:11, color:C.textMute }}>
                    👥 {ev.attendees + (rsvp.includes(ev.id)?1:0)}
                    {rsvp.includes(ev.id)&&<span style={{ color:C.red, fontWeight:700 }}> (Sen dahil)</span>}
                  </span>
                  <span style={{ background:ev.free?C.turqLight:C.redLight, borderRadius:6,
                    padding:"2px 8px", fontSize:10, fontWeight:700,
                    color:ev.free?C.turqDark:C.red }}>
                    {ev.free?"ÜCRETSİZ":ev.price}
                  </span>
                </div>
                <div onClick={()=>toggleRsvp(ev.id)} style={{
                  background:rsvp.includes(ev.id)
                    ?`linear-gradient(135deg,#28a745,#1e7e34)`
                    :`linear-gradient(135deg,${C.red},${C.redDark})`,
                  borderRadius:10, padding:"7px 16px",
                  fontSize:11, fontWeight:700, color:C.white, cursor:"pointer",
                  transition:"all 0.2s" }}>
                  {rsvp.includes(ev.id)?"✓ Katılıyorum":"Katıl"}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

const HOURS = ["Kapalı","07:00","08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00"];
const DAYS  = ["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"];
const Field = ({ label, value, onChange, placeholder, type="text", required }) => (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
        letterSpacing:0.5, marginBottom:6 }}>
        {label}{required && <span style={{ color:C.red }}> *</span>}
      </div>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
          borderRadius:11, border:`1.5px solid ${C.border}`,
          background:C.redPale, fontSize:14, color:C.text, outline:"none",
          fontFamily:"system-ui" }}
        onFocus={e=>e.target.style.borderColor=C.red}
        onBlur={e=>e.target.style.borderColor=C.border}/>
    </div>
  );
function RegisterBusiness({ onBack, onSuccess }) {
  const [step, setStep] = useState(0); // 0..3
  const [form, setForm] = useState({
    name:"", category:"", description:"",
    address:"", city:"", state:"", zip:"",
    phone:"", website:"", image:null, gallery:[],
    hours: DAYS.map(d=>({ day:d, open:true, from:"09:00", to:"18:00" })),
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const stepTitles = ["Temel Bilgiler","Konum & İletişim","Çalışma Saatleri","Açıklama & Etiketler"];
  const stepIcons  = ["🏢","📍","🕐","✏️"];

  /* Alan bileşenleri */ 

  const phoneValid = v => /^[\+\d\s\(\)\-]{7,20}$/.test(v.trim());

  const canNext = () => {
    if(step===0) return form.name.trim() && form.category;
    if(step===1) return form.address.trim() && form.state && form.phone.trim() && phoneValid(form.phone);
    return true;
  };

  if (submitted) return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:C.white, padding:32, textAlign:"center" }}>
      <div style={{ width:88, height:88, borderRadius:24, margin:"0 auto 24px",
        background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:42 }}>✓</div>
      <div style={{ fontSize:22, fontWeight:800, color:C.text, marginBottom:10 }}>
        Başvurunuz Alındı!
      </div>
      <div style={{ fontSize:14, color:C.textSub, lineHeight:1.7, marginBottom:8 }}>
        <span style={{ fontWeight:700, color:C.red }}>{form.name}</span> 24 saat içinde
        incelenerek yayına alınacak.
      </div>
      <div style={{ fontSize:12, color:C.textMute, marginBottom:32 }}>
        Onay bilgisi {form.phone} numarasına gönderilecek.
      </div>
      <button onClick={()=>onSuccess(form)} style={{ border:"none", borderRadius:13,
        padding:"14px 36px", fontSize:14, fontWeight:700, cursor:"pointer",
        background:`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white }}>
        Ana Sayfaya Dön
      </button>
    </div>
  );

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.white }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        padding:"20px 20px 28px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", bottom:-30, right:-30,
          width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
        <button onClick={onBack} style={{ background:"none", border:"none",
          color:"rgba(255,255,255,0.75)", fontSize:13, fontWeight:700,
          cursor:"pointer", marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
          ← Geri
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
          <div style={{ width:44, height:44, borderRadius:12,
            background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.28)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
            {stepIcons[step]}
          </div>
          <div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)",
              letterSpacing:2, textTransform:"uppercase", marginBottom:3 }}>
              Adım {step+1} / 4
            </div>
            <div style={{ fontSize:18, fontWeight:700, color:C.white }}>
              {stepTitles[step]}
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ background:"rgba(255,255,255,0.2)", borderRadius:4, height:4 }}>
          <div style={{ background:C.white, borderRadius:4, height:4,
            width:`${((step+1)/4)*100}%`, transition:"width 0.4s ease" }}/>
        </div>
      </div>

      {/* Form gövdesi */}
      <div style={{ flex:1, overflowY:"auto", padding:"22px 20px" }}>

        {/* ── Adım 0: Temel Bilgiler ── */}
        {step===0 && (
          <>
            {/* İşletme profil fotoğrafı */}
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <label style={{ cursor:"pointer", display:"inline-block", position:"relative" }}>
                <div style={{ width:90, height:90, borderRadius:"50%", margin:"0 auto",
                  background:C.redPale, border:`2px dashed ${C.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  overflow:"hidden", fontSize:40 }}>
                  {form.image
                    ? <img src={URL.createObjectURL(form.image)} alt="profil"
                        style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                    : (categories.find(c=>c.id===form.category)?.icon || "🏢")}
                </div>
                <div style={{ position:"absolute", bottom:0, right:0,
                  width:28, height:28, borderRadius:"50%",
                  background:`linear-gradient(135deg,${C.red},${C.redDark})`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:14, color:"white" }}>📷</div>
                <input type="file" accept="image/*" style={{ display:"none" }}
                  onChange={e=>{ if(e.target.files[0]) set("image", e.target.files[0]); }}/>
              </label>
              <div style={{ fontSize:11, color:C.textMute, marginTop:8 }}>
                {form.image ? "Fotoğraf seçildi ✓" : "Profil fotoğrafı ekle"}
              </div>
            </div>

            <Field label="İşletme / Meslek Adı" value={form.name}
              onChange={v=>set("name",v)} placeholder="örn. Bosphorus Kitchen, Av. Ali Yılmaz"
              required/>

            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
                letterSpacing:0.5, marginBottom:8 }}>
                Kategori <span style={{ color:C.red }}>*</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {categories.filter(c=>c.id!=="jobs"&&c.id!=="events").map(cat=>(
                  <div key={cat.id} onClick={()=>set("category",cat.id)} style={{
                    display:"flex", alignItems:"center", gap:10,
                    padding:"11px 14px", borderRadius:12, cursor:"pointer",
                    border:`1.5px solid ${form.category===cat.id ? cat.color : C.border}`,
                    background: form.category===cat.id ? cat.color+"18" : C.redPale,
                    transition:"all 0.15s" }}>
                    <span style={{ fontSize:18 }}>{cat.icon}</span>
                    <span style={{ fontSize:12, fontWeight:600,
                      color: form.category===cat.id ? cat.color : C.textSub }}>
                      {cat.label}
                    </span>
                    {form.category===cat.id && (
                      <span style={{ marginLeft:"auto", color:cat.color, fontWeight:700 }}>✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Adım 1: Konum & İletişim ── */}
        {step===1 && (
          <>
            <Field label="Açık Adres" value={form.address}
              onChange={v=>set("address",v)} placeholder="Sokak, No, Daire" required/>

            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
                letterSpacing:0.5, marginBottom:6 }}>ZIP</div>
              <input value={form.zip} onChange={e=>set("zip",e.target.value)}
                placeholder="10001"
                style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
                  borderRadius:11, border:`1.5px solid ${C.border}`,
                  background:C.redPale, fontSize:14, color:C.text, outline:"none" }}/>
            </div>

            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
                letterSpacing:0.5, marginBottom:6 }}>Eyalet <span style={{ color:C.red }}>*</span></div>
              <select value={form.state} onChange={e=>set("state",e.target.value)}
                style={{ width:"100%", padding:"11px 14px", borderRadius:11,
                  border:`1.5px solid ${C.border}`, background:C.redPale,
                  fontSize:14, color:form.state?C.text:C.textMute, outline:"none" }}>
                <option value="">Eyalet seçin...</option>
                {US_STATES.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <Field label="Telefon" value={form.phone} onChange={v=>set("phone",v)}
              placeholder="+1 (555) 000-0000" type="tel" required/>
            <Field label="Website" value={form.website} onChange={v=>set("website",v)}
              placeholder="www.orneksite.com"/>
          </>
        )}

        {/* ── Adım 2: Çalışma Saatleri ── */}
        {step===2 && (
          <>
            <div style={{ fontSize:12, color:C.textSub, marginBottom:16, lineHeight:1.6 }}>
              Açık olduğunuz günler ve saatler işletme profilinizde görünecek.
            </div>
            {form.hours.map((h,i) => (
              <div key={h.day} style={{ display:"flex", alignItems:"center", gap:10,
                padding:"12px 14px", borderRadius:12, marginBottom:8,
                background: h.open ? C.redPale : "#F5F5F5",
                border:`1.5px solid ${h.open ? C.border : "#E0E0E0"}`,
                transition:"all 0.2s" }}>
                {/* Gün toggle */}
                <div onClick={()=>set("hours", form.hours.map((x,j)=>j===i?{...x,open:!x.open}:x))}
                  style={{ width:42, height:24, borderRadius:12, cursor:"pointer",
                    background: h.open ? C.red : "#CCC",
                    position:"relative", transition:"background 0.2s", flexShrink:0 }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:C.white,
                    position:"absolute", top:3,
                    left: h.open ? 21 : 3, transition:"left 0.2s",
                    boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}/>
                </div>
                <span style={{ fontSize:12, fontWeight:700, width:28,
                  color: h.open ? C.text : C.textMute }}>{h.day}</span>

                {h.open ? (
                  <div style={{ display:"flex", alignItems:"center", gap:6, flex:1 }}>
                    <select value={h.from}
                      onChange={e=>set("hours",form.hours.map((x,j)=>j===i?{...x,from:e.target.value}:x))}
                      style={{ flex:1, padding:"5px 8px", borderRadius:8, fontSize:12,
                        border:`1px solid ${C.border}`, background:C.white, color:C.text, outline:"none" }}>
                      {HOURS.filter(t=>t!=="Kapalı").map(t=><option key={t}>{t}</option>)}
                    </select>
                    <span style={{ fontSize:11, color:C.textMute }}>–</span>
                    <select value={h.to}
                      onChange={e=>set("hours",form.hours.map((x,j)=>j===i?{...x,to:e.target.value}:x))}
                      style={{ flex:1, padding:"5px 8px", borderRadius:8, fontSize:12,
                        border:`1px solid ${C.border}`, background:C.white, color:C.text, outline:"none" }}>
                      {HOURS.filter(t=>t!=="Kapalı").map(t=><option key={t}>{t}</option>)}
                    </select>
                  </div>
                ) : (
                  <span style={{ fontSize:12, color:C.textMute, flex:1 }}>Kapalı</span>
                )}
              </div>
            ))}
          </>
        )}

        {/* ── Adım 3: Açıklama & Etiketler ── */}
        {step===3 && (
          <>
            {/* Açıklama */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
                letterSpacing:0.5, marginBottom:6 }}>İşletme Açıklaması</div>
              <textarea value={form.description}
                onChange={e=>set("description",e.target.value)}
                placeholder="Sunduğunuz hizmetleri, uzmanlık alanınızı ve müşterilerinize kendinizi tanıtın..."
                rows={4}
                style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
                  borderRadius:11, border:`1.5px solid ${C.border}`,
                  background:C.redPale, fontSize:14, color:C.text,
                  outline:"none", resize:"vertical", fontFamily:"system-ui",
                  lineHeight:1.6 }}
                onFocus={e=>e.target.style.borderColor=C.red}
                onBlur={e=>e.target.style.borderColor=C.border}/>
              <div style={{ fontSize:10, color:C.textMute, marginTop:4, textAlign:"right" }}>
                {form.description.length} / 400
              </div>
            </div>

             {/* Galeri Fotoğrafları */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
                letterSpacing:0.5, marginBottom:6 }}>Galeri Fotoğrafları</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:8 }}>
                {form.gallery.map((img,i)=>(
                  <div key={i} style={{ position:"relative", width:80, height:80 }}>
                    <img src={URL.createObjectURL(img)} alt=""
                      style={{ width:80, height:80, borderRadius:10, objectFit:"cover",
                        border:`1px solid ${C.border}` }}/>
                    <div onClick={()=>set("gallery", form.gallery.filter((_,j)=>j!==i))}
                      style={{ position:"absolute", top:2, right:2,
                        background:"rgba(0,0,0,0.6)", borderRadius:"50%",
                        width:20, height:20, display:"flex", alignItems:"center",
                        justifyContent:"center", cursor:"pointer", color:"white", fontSize:11 }}>✕</div>
                  </div>
                ))}
                {form.gallery.length < 6 && (
                  <label style={{ width:80, height:80, borderRadius:10,
                    border:`2px dashed ${C.border}`, background:C.redPale,
                    display:"flex", flexDirection:"column", alignItems:"center",
                    justifyContent:"center", cursor:"pointer", gap:4 }}>
                    <span style={{ fontSize:24 }}>📷</span>
                    <span style={{ fontSize:9, color:C.textMute }}>Ekle</span>
                    <input type="file" accept="image/*" multiple style={{ display:"none" }}
                      onChange={e=>{
                        const files = Array.from(e.target.files);
                        set("gallery", [...form.gallery, ...files].slice(0,6));
                      }}/>
                  </label>
                )}
              </div>
              <div style={{ fontSize:10, color:C.textMute }}>Max 6 fotoğraf</div>
            </div>
            
             {/* Etiketler */}
            <Field label="Etiketler (virgülle ayırın)" value={form.tags}
              onChange={v=>set("tags",v)}
              placeholder="örn. Lisanslı, 7/24, Ücretsiz Keşif, Türkçe Hizmet"/>
            {/* Özet önizleme */}
            {form.name && form.category && (
              <div style={{ background:C.redPale, border:`1px solid ${C.border}`,
                borderRadius:14, padding:"14px 16px", marginTop:4 }}>
                <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
                  letterSpacing:1.5, textTransform:"uppercase", marginBottom:10 }}>
                  ÖNİZLEME
                </div>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:46, height:46, borderRadius:12, flexShrink:0,
                    background:`linear-gradient(135deg,${C.redPale},#FFF5F6)`,
                    border:`1px solid ${C.border}`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
                    {categories.find(c=>c.id===form.category)?.icon || "🏢"}
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{form.name}</div>
                    {form.city && form.state && (
                      <div style={{ fontSize:11, color:C.textMute, marginTop:2 }}>
                        📍 {form.city}, {form.state}
                      </div>
                    )}
                    <div style={{ fontSize:11, color:C.turq, fontWeight:600, marginTop:2 }}>
                      {categories.find(c=>c.id===form.category)?.label}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Alt butonlar */}
      <div style={{ padding:"12px 20px 32px", background:C.white,
        borderTop:`1px solid ${C.border}` }}>
        <div style={{ display:"flex", gap:10 }}>
          {step>0 && (
            <button onClick={()=>setStep(s=>s-1)} style={{ flex:1, border:`1.5px solid ${C.border}`,
              borderRadius:13, padding:"14px", fontSize:14, fontWeight:700,
              cursor:"pointer", background:C.white, color:C.textSub }}>
              ← Geri
            </button>
          )}
          {step<3 ? (
            <button onClick={()=>canNext()&&setStep(s=>s+1)} style={{ flex:2, border:"none",
              borderRadius:13, padding:"14px", fontSize:14, fontWeight:700, cursor:"pointer",
              background: canNext()
                ? `linear-gradient(135deg,${C.red},${C.redDark})`
                : "#D4DCEE",
              color: canNext() ? C.white : C.textMute }}>
              Devam Et →
            </button>
          ) : (
            <button onClick={async ()=>{
  const { data: { user } } = await supabase.auth.getUser();
  
  let imageUrl = null;
  if (form.image) {
    const ext = form.image.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('events')
      .upload(fileName, form.image, { contentType: form.image.type });
    console.log("Upload data:", uploadData, "Error:", uploadError);
    if (uploadData) {
      const { data: urlData } = supabase.storage
        .from('events')
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
      console.log("Image URL:", imageUrl);
    }
  }

  await supabase.from("events").insert({
    title: form.title,
    org: form.org,
    date: form.date,
    location: form.location,
    state: form.state,
    zip: form.zip,
    category: form.cat,
    description: form.description,
    free: form.free,
    price: form.price,
    image_url: imageUrl,
    owner_id: user?.id || null,
  });
  setSubmitted(true);
  onSuccess && onSuccess({...form, imageUrl, image_url: imageUrl});
}} style={{ flex:2, border:"none",
              borderRadius:13, padding:"14px", fontSize:14, fontWeight:700, cursor:"pointer",
              background:`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white }}>
              🧭 Yayına Al
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function NotifPrefs() {
  const [prefs, setPrefs] = useState({
    yeniYorum:    true,
    etkinlik:     true,
    kampanya:     true,
    yeniIsletme:  false,
    isIlani:      true,
  });
  const [open, setOpen] = useState(false);
  const toggle = k => setPrefs(p=>({...p,[k]:!p[k]}));
  const items = [
    { key:"yeniYorum",   label:"Yorumlarıma yanıt", icon:"💬" },
    { key:"etkinlik",    label:"Yakındaki etkinlikler", icon:"🎉" },
    { key:"kampanya",    label:"İşletme kampanyaları", icon:"🔔" },
    { key:"yeniIsletme", label:"Yeni işletmeler", icon:"🏢" },
    { key:"isIlani",     label:"Yeni iş ilanları", icon:"💼" },
  ];
  return (
    <div style={{ background:C.white, border:`1px solid ${C.border}`,
      borderRadius:13, overflow:"hidden", marginBottom:12 }}>
      <div onClick={()=>setOpen(o=>!o)}
        style={{ padding:"13px 16px", display:"flex",
          alignItems:"center", justifyContent:"space-between", cursor:"pointer" }}>
        <div style={{ fontSize:13, fontWeight:600, color:C.text }}>🔔 Bildirim Tercihleri</div>
        <span style={{ fontSize:12, color:C.textMute }}>{open?"▲":"▼"}</span>
      </div>
      {open && (
        <div style={{ borderTop:`1px solid ${C.border}` }}>
          {items.map((item,i,arr)=>(
            <div key={item.key} onClick={()=>toggle(item.key)}
              style={{ display:"flex", alignItems:"center", gap:12,
                padding:"12px 16px", cursor:"pointer",
                borderBottom: i<arr.length-1?`1px solid ${C.border}`:"none",
                background: prefs[item.key]?"white":"#FAFAFA" }}>
              <span style={{ fontSize:16, filter:item.id==="profile"?"sepia(100%) saturate(0.3) brightness(1.8)":"none" }}>{item.icon}</span>
              <div style={{ flex:1, fontSize:13, color:C.text }}>{item.label}</div>
              <div style={{ width:44, height:24, borderRadius:12, position:"relative",
                background: prefs[item.key]?C.red:"#DDD",
                transition:"background 0.2s", cursor:"pointer" }}>
                <div style={{ position:"absolute", top:2,
                  left: prefs[item.key]?"calc(100% - 22px)":2,
                  width:20, height:20, borderRadius:"50%",
                  background:"white", transition:"left 0.2s",
                  boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}/>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function ContactPage() {
  return (
    <div style={{ minHeight:"100%", display:"flex", flexDirection:"column", background:C.bgSoft }}>
      
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        padding:"24px 24px 32px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-20, right:-20, width:120, height:120,
          borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
        <div style={{ position:"absolute", bottom:-30, left:-30, width:100, height:100,
          borderRadius:"50%", background:"rgba(201,168,76,0.1)" }}/>
        <div style={{ margin:"0 auto 16px" }}>
          <img src="/logo.png" alt="Pusula Amerika" style={{ height:55, width:"auto", background:"transparent" }}/>
        </div>
        <div className="playfair" style={{ fontSize:20, fontWeight:800, color:C.white,
          marginBottom:4 }}>Pusula <span style={{ color:"#C9A84C" }}>Amerika</span></div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", letterSpacing:1.5,
          textTransform:"uppercase" }}>Amerika'daki Türklerin Yol Arkadaşı</div>
      </div>

      <div style={{ padding:"24px 20px" }}>

        {/* Hakkında */}
        <div style={{ background:C.white, borderRadius:16, padding:"18px",
          marginBottom:16, border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textMute,
            letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>Hakkımızda</div>
          <div style={{ fontSize:13, color:C.textSub, lineHeight:1.8 }}>
            Pusula Amerika, Amerika'daki Türk toplumuna yönelik geliştirilmiş bir işletme rehberi ve topluluk platformudur. 
            Türkçe hizmet veren işletmeleri keşfetmek, iş ilanlarına ulaşmak ve topluluk etkinliklerini takip etmek için 
            doğru adrestesiniz.
          </div>
        </div>

        {/* İletişim */}
        <div style={{ background:C.white, borderRadius:16, padding:"18px",
          marginBottom:16, border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textMute,
            letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>İletişim</div>
          <a href="mailto:info@pusula-amerika.com" style={{ display:"flex", alignItems:"center",
            gap:12, padding:"10px 0", borderBottom:`1px solid ${C.border}`,
            textDecoration:"none" }}>
            <div style={{ width:36, height:36, borderRadius:10,
              background:`linear-gradient(135deg,${C.red},${C.redDark})`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>✉️</div>
            <div>
              <div style={{ fontSize:11, color:C.textMute, fontWeight:600 }}>E-posta</div>
              <div style={{ fontSize:13, color:C.red, fontWeight:700 }}>pusulaamerika@gmail.com</div>
            </div>
          </a>
        </div>

        {/* Sosyal Medya */}
        <div style={{ background:C.white, borderRadius:16, padding:"18px",
          marginBottom:16, border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textMute,
            letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>Sosyal Medya</div>
          {[
            { icon:<svg viewBox="0 0 24 24" width="20" height="20" fill="#E1306C"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>, label:"Instagram", handle:"@pusulaamerika", url:"https://instagram.com/pusulaamerika", color:"#E1306C" },
            { icon:<svg viewBox="0 0 24 24" width="20" height="20" fill="#000000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label:"X (Twitter)", handle:"@pusulaamerika", url:"https://x.com/pusulaamerika", color:"#000000" },
            { icon:<svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, label:"Facebook", handle:"Pusula Amerika", url:"https://facebook.com/pusulaamerika", color:"#1877F2" },
          ].map(s=>(
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
              style={{ display:"flex", alignItems:"center", gap:12,
                padding:"10px 0", borderBottom:`1px solid ${C.border}`,
                textDecoration:"none" }}>
              <div style={{ width:36, height:36, borderRadius:10, flexShrink:0,
                background:`${s.color}22`, border:`1px solid ${s.color}44`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{s.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, color:C.textMute, fontWeight:600 }}>{s.label}</div>
                <div style={{ fontSize:13, fontWeight:700, color:s.color }}>{s.handle}</div>
              </div>
              <span style={{ color:C.textMute, fontSize:14 }}>→</span>
            </a>
          ))}
        </div>

        {/* Versiyon */}
        <div style={{ textAlign:"center", padding:"16px 0", color:C.textMute, fontSize:11 }}>
          Pusula Amerika v1.0 · 2024
        </div>

      </div>
    </div>
  );
}
function ProfilePage({ userProfile, onEdit, favorites, onBusiness, loggedIn, onLogin, myBusiness, onMyBusiness, onRegisterBiz, lang, onLangChange, onAdmin, onLogout, dbBusinesses=[], reviews=[], myEvents=[], rsvpEvents=[], dbEvents=[], onGoEvents }) {
 const favList = [...businesses, ...(dbBusinesses||[])].filter(b => favorites.includes(b.id));
const [tab, setTab] = useState("info"); // info | favs | events
  // Giriş yapılmamışsa login kartı göster
  if (!loggedIn) return (     
    <div style={{ height:"100vh", display:"flex", flexDirection:"column",
      background:C.bgSoft, alignItems:"center", justifyContent:"center", padding:32 }}>
      <div style={{ width:80, height:80, borderRadius:22, margin:"0 auto 20px",
        background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:38 }}>👤</div>
      <div style={{ fontSize:20, fontWeight:800, color:C.text, marginBottom:8, textAlign:"center" }}>
        Profilinize Giriş Yapın
      </div>
      <div style={{ fontSize:13, color:C.textSub, lineHeight:1.7, marginBottom:28, textAlign:"center" }}>
        Favorilerinizi kaydedin, işletme ekleyin ve topluluğa katılın.
      </div>
      <button onClick={onLogin} style={{ width:"100%", border:"none", borderRadius:13,
        padding:"14px", fontSize:15, fontWeight:700, cursor:"pointer",
        background:`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white,
        marginBottom:12 }}>
        Giriş Yap / Kayıt Ol →
      </button>
      <div style={{ display:"flex", gap:16, marginTop:8 }}>
        {["İşletme Ekle","Yorum Yaz","Favoriler"].map(f=>(
          <div key={f} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{ width:40, height:40, borderRadius:11, background:C.redPale,
              border:`1px solid ${C.border}`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
              {f==="İşletme Ekle"?"🏢":f==="Yorum Yaz"?"✏️":"♥"}
            </div>
            <div style={{ fontSize:9, color:C.textMute, fontWeight:600 }}>{f}</div>
          </div>
        ))}
      </div>
    </div>
  );
  

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.bgSoft }}>
      {/* Header — kırmızı */}
      <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        padding:"28px 20px 48px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", bottom:-40, right:-40, width:130, height:130,
          borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
        <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.6)",
          letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>PROFİLİM</div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          {/* Avatar */}
          <div style={{ width:68, height:68, borderRadius:"50%", flexShrink:0,
            background:"rgba(255,255,255,0.2)", border:"2.5px solid rgba(255,255,255,0.4)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:28, overflow:"hidden" }}>
            {userProfile.photoURL
              ? <img src={userProfile.photoURL} alt="profil" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
              : (userProfile.avatar || "👤")}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:19, fontWeight:800, color:C.white, marginBottom:3 }}>
              {userProfile.name || "Kullanıcı"}
            </div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", marginBottom:4 }}>
              {userProfile.city && userProfile.state
                ? `📍 ${userProfile.city}, ${userProfile.state}`
                : "📍 Konum belirtilmedi"}
            </div>
            {userProfile.email && (
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)" }}>✉️ {userProfile.email}</div>
            )}
          </div>
          <div onClick={onEdit} style={{ background:"rgba(255,255,255,0.18)",
            border:"1px solid rgba(255,255,255,0.3)", borderRadius:10,
            padding:"8px 14px", fontSize:11, fontWeight:700, color:C.white, cursor:"pointer" }}>
            Düzenle
          </div>
        </div>
      </div>


      {/* Tab bar */}
      <div style={{ background:C.white, display:"flex",
        borderBottom:`1px solid ${C.border}` }}>
        {[{id:"info",label:"Bilgiler"},{id:"favs",label:`Favoriler (${favList.length})`},{id:"events",label:"Etkinliklerim"}].map(t=>(
          <div key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, padding:"12px",
            textAlign:"center", fontSize:12, fontWeight:700, cursor:"pointer",
            color: tab===t.id ? C.red : C.textMute,
            borderBottom: tab===t.id ? `2.5px solid ${C.red}` : "2.5px solid transparent" }}>
            {t.label}
          </div>
        ))}
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"18px" }}>

        {/* Bilgiler */}
        {tab==="info" && (
          <>
            <div style={{ background:C.white, border:`1px solid ${C.border}`,
              borderRadius:16, padding:"16px", marginBottom:12 }}>
              {[
                { icon:"👤", label:"Ad Soyad",  val: userProfile.name    || "—" },
                { icon:"📍", label:"Konum",     val: userProfile.city && userProfile.state ? `${userProfile.city}, ${userProfile.state}` : "—" },
                { icon:"✉️", label:"E-posta",   val: userProfile.email   || "—" },
                { icon:"📞", label:"Telefon",   val: userProfile.phone   || "—" },
              ].map((row,i,arr) => (
                <div key={row.label} style={{ display:"flex", alignItems:"center", gap:12,
                  padding:"10px 0",
                  borderBottom: i<arr.length-1 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize:16, width:22, textAlign:"center" }}>{row.icon}</span>
                  <div>
                    <div style={{ fontSize:10, color:C.textMute, fontWeight:600 }}>{row.label}</div>
                    <div style={{ fontSize:13, color: row.val==="—"?C.textMute:C.text,
                      fontWeight: row.val==="—"?400:600 }}>{row.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={onEdit} style={{ width:"100%", border:`1.5px solid ${C.border}`,
              borderRadius:13, padding:"13px", fontSize:13, fontWeight:700,
              cursor:"pointer", background:C.white, color:C.textSub, marginBottom:12 }}>
              ✏️ Profili Düzenle
            </button>
            <button onClick={onLogout} style={{ width:"100%", border:`1.5px solid #FCA5A5`,
              borderRadius:13, padding:"13px", fontSize:13, fontWeight:700,
              cursor:"pointer", background:"#FFF0F0", color:"#DC2626", marginBottom:12 }}>
              🚪 Çıkış Yap
            </button>


           
            {/* Bildirim Tercihleri */}
            <NotifPrefs/>

            {/* Admin erişimi (gizli — sadece gösterim amaçlı) */}
            {userProfile.email==="pusulaamerika@gmail.com" && <div onClick={onAdmin} style={{ background:C.white,
              border:`1px solid ${C.border}`, borderRadius:13, padding:"13px 16px",
              marginBottom:12, display:"flex", alignItems:"center", gap:12,
              cursor:"pointer" }}>
              <div style={{ width:36, height:36, borderRadius:10,
                background:"linear-gradient(135deg,#0D1F3C,#060F1E)",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🛡️</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.text }}>Admin Paneli</div>
                <div style={{ fontSize:11, color:C.textMute }}>İşletme onay yönetimi</div>
              </div>
              <div style={{ fontSize:12, color:C.textMute }}>→</div>
            </div>}

            {/* İşletme sahibi paneli */}
            {myBusiness && (
              <div onClick={onMyBusiness} style={{ background:C.white,
                border:`1px solid ${C.border}`, borderRadius:13, padding:"13px 16px",
                marginBottom:12, display:"flex", alignItems:"center", gap:12, cursor:"pointer" }}>
                <div style={{ width:36, height:36, borderRadius:10,
                  background:`linear-gradient(135deg,${C.red},${C.redDark})`,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🏢</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.text }}>İşletmem</div>
                  <div style={{ fontSize:11, color:C.textMute }}>{myBusiness.name}</div>
                </div>
                <div style={{ fontSize:12, color:C.textMute }}>→</div>
              </div>
            )}
            {/* İşletme ekle butonu */}
            <div onClick={onRegisterBiz} style={{ border:`2px dashed #F59E0B`,
              borderRadius:14, padding:"14px 16px", textAlign:"center",
              background:"#FFFBEB", cursor:"pointer", marginBottom:12 }}>
              <div style={{ fontSize:20, marginBottom:6 }}>🏢</div>
              <div style={{ fontSize:12, fontWeight:700, color:"#92400E", marginBottom:3 }}>
                İşletmenizi Ekleyin
              </div>
              <div style={{ fontSize:11, color:"#A16207" }}>
                Ücretsiz listelenin, müşteri bulun →
              </div>
            </div>
          </>
        )}
{/* Favoriler */}
        {tab==="favs" && (
          favList.length===0 ? (
            <div style={{ textAlign:"center", paddingTop:40 }}>
              <div style={{ fontSize:40, marginBottom:12 }}>♡</div>
              <div style={{ fontSize:14, color:C.textSub }}>Henüz favori eklenmedi</div>
            </div>
          ) : favList.map(b=>(
            <div key={b.id} onClick={()=>onBusiness(b)} style={{ background:C.white,
              border:`1px solid ${C.border}`, borderRadius:16, padding:"13px 16px",
              marginBottom:10, display:"flex", gap:12, cursor:"pointer" }}>
              <div style={{ width:46, height:46, borderRadius:12, flexShrink:0,
                background:`linear-gradient(135deg,${C.redPale},#FFF5F6)`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
                {b.img}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:2 }}>{b.name}</div>
                <div style={{ fontSize:11, color:C.textMute, marginBottom:4 }}>📍 {b.state}</div>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <Stars r={b.rating}/>
                  <span style={{ fontSize:11, fontWeight:700, color:C.text }}>{b.rating}</span>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Yorumlar */}
        {tab==="reviews" && (
          reviews.filter(r=>r.user===userProfile.name).length===0 ? (
            <div style={{ textAlign:"center", paddingTop:40 }}>
              <div style={{ fontSize:40, marginBottom:12 }}>💬</div>
              <div style={{ fontSize:14, color:C.textSub }}>Henüz yorum yapılmadı</div>
            </div>
          ) : reviews.filter(r=>r.user===userProfile.name).map((r,i)=>(
            <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`,
              borderRadius:16, padding:"13px 16px", marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <Stars r={r.stars}/>
                <span style={{ fontSize:11, color:C.textMute }}>{r.date}</span>
              </div>
              <div style={{ fontSize:13, color:C.text }}>{r.text}</div>
            </div>
          ))
        )}
        {/* Favoriler */}
        {tab==="favs" && (
          favList.length===0 ? (
            <div style={{ textAlign:"center", paddingTop:40 }}>
              <div style={{ fontSize:40, marginBottom:12 }}>♡</div>
              <div style={{ fontSize:14, color:C.textSub }}>Henüz favori eklenmedi</div>
            </div>
          ) : favList.map(b=>(
            <div key={b.id} onClick={()=>onBusiness(b)} style={{ background:C.white,
              border:`1px solid ${C.border}`, borderRadius:16, padding:"13px 16px",
              marginBottom:10, display:"flex", gap:12, cursor:"pointer",
              boxShadow:"0 1px 4px rgba(200,16,46,0.05)" }}>
              <div style={{ width:46, height:46, borderRadius:12, flexShrink:0,
                background:`linear-gradient(135deg,${C.redPale},#FFF5F6)`,
                border:`1px solid ${C.border}`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
                {b.img}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:2 }}>{b.name}</div>
                <div style={{ fontSize:11, color:C.textMute, marginBottom:4 }}>📍 {b.city}, {b.state}</div>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <Stars r={b.rating}/>
                  <span style={{ fontSize:11, fontWeight:700, color:C.text }}>{b.rating}</span>
                </div>
              </div>
              <span style={{ color:C.red, fontSize:18 }}>♥</span>
            </div>
          ))
        )}
       {/* Etkinliklerim */}
        {tab==="events" && (
          <div>
            {myEvents.length > 0 && (
              <>
                <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
                  letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>
                  ETKİNLİKLERİM ({myEvents.length})
                </div>
                {myEvents.map((ev,i)=>(
                  <div key={i} onClick={()=>onGoEvents&&onGoEvents(ev)} style={{ background:C.white, border:`1px solid ${C.border}`,
                    borderRadius:16, padding:"14px 16px", marginBottom:10, cursor:"pointer" }}>
                    <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                      <div style={{ width:46, height:46, borderRadius:12, flexShrink:0,
                        background:C.redPale, border:`1px solid ${C.border}`,
                        display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
                        {ev.img||"🎉"}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:2 }}>{ev.title}</div>
                        <div style={{ fontSize:11, color:C.textMute, marginBottom:2 }}>📅 {ev.date}</div>
                        <div style={{ fontSize:11, color:C.textMute }}>📍 {ev.location}</div>
                      </div>
                      <span style={{ background:"#D1FAE5", color:"#065F46",
                        borderRadius:8, padding:"3px 8px", fontSize:10, fontWeight:700 }}>
                        Aktif
                      </span>
                    </div>
                  </div>
                ))}
                <div style={{ height:16 }}/>
              </>
            )}
            <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
              letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>
              KATILACAĞIM ETKİNLİKLER ({rsvpEvents.length})
            </div>
            {rsvpEvents.length===0 ? (
              <div style={{ textAlign:"center", paddingTop:20 }}>
                <div style={{ fontSize:40, marginBottom:12 }}>🎉</div>
                <div style={{ fontSize:14, color:C.textSub, marginBottom:8 }}>Henüz katılım yok</div>
                <div style={{ fontSize:12, color:C.textMute }}>Etkinlikler sayfasından "Katıl" butonuna tıklayın</div>
              </div>
            ) : dbEvents.filter(ev=>rsvpEvents.includes(ev.id)).map((ev,i)=>(
              <div key={i} onClick={()=>onGoEvents&&onGoEvents(ev)} style={{ background:C.white, border:`1px solid ${C.border}`,
                borderRadius:16, padding:"14px 16px", marginBottom:10, cursor:"pointer" }}>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:46, height:46, borderRadius:12, flexShrink:0,
                    background:C.redPale, border:`1px solid ${C.border}`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
                    {ev.img||"🎉"}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:2 }}>{ev.title}</div>
                    <div style={{ fontSize:11, color:C.textMute, marginBottom:2 }}>📅 {ev.date}</div>
                    <div style={{ fontSize:11, color:C.textMute }}>📍 {ev.location}</div>
                  </div>
                  <span style={{ background:C.redLight, color:C.red,
                    borderRadius:8, padding:"3px 8px", fontSize:10, fontWeight:700 }}>
                    Katılıyorum
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}
function EditProfile({ profile, onSave, onBack }) {
  const [form, setForm] = useState({ ...profile });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const avatars = ["👤","👨","👩","👨‍💼","👩‍💼","🧑‍⚕️","👨‍🍳","👩‍🍳","🧑‍🔧"];

  const [photoPreview, setPhotoPreview] = useState(form.photoURL||null);
  const handlePhoto = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setPhotoPreview(ev.target.result); set("photoURL", ev.target.result); };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.white }}>
      <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        padding:"20px 20px 24px" }}>
        <button onClick={onBack} style={{ background:"none", border:"none",
          color:"rgba(255,255,255,0.75)", fontSize:13, fontWeight:700,
          cursor:"pointer", marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
          ← Geri
        </button>
        <div style={{ fontSize:18, fontWeight:700, color:C.white }}>Profili Düzenle</div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"22px 20px" }}>
        {/* Profil fotoğrafı yükleme */}
        <div style={{ marginBottom:20, display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
          <div style={{ width:80, height:80, borderRadius:"50%", overflow:"hidden",
            border:`2.5px solid ${C.border}`, background:C.redPale,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:36, flexShrink:0 }}>
            {photoPreview
              ? <img src={photoPreview} alt="profil" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
              : (form.avatar||"👤")}
          </div>
          <label style={{ display:"flex", alignItems:"center", gap:6,
            background:C.redPale, border:`1px solid ${C.border}`,
            borderRadius:10, padding:"7px 16px", fontSize:12, fontWeight:700,
            color:C.red, cursor:"pointer" }}>
            📷 Fotoğraf Yükle
            <input type="file" accept="image/*" onChange={handlePhoto} style={{ display:"none" }}/>
          </label>
        </div>
        {/* Avatar seçimi */}
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:10 }}>Avatar Seç</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {avatars.map(a=>(
              <div key={a} onClick={()=>{ set("avatar",a); setPhotoPreview(null); set("photoURL",""); }}
                style={{ width:44, height:44,
                borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:22, cursor:"pointer",
                background: form.avatar===a && !photoPreview ? C.red : C.redPale,
                border:`2px solid ${form.avatar===a && !photoPreview ? C.red : C.border}` }}>
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Ad Soyad */}
        {[
          { key:"name",  label:"Ad Soyad",  placeholder:"Ahmet Yılmaz",       required:true  },
          { key:"city",  label:"Şehir",     placeholder:"Brooklyn"                           },
          { key:"email", label:"E-posta",   placeholder:"ornek@email.com",     type:"email"  },
          { key:"phone", label:"Telefon",   placeholder:"+1 (555) 000-0000",   type:"tel"    },
        ].map(f=>(
          <div key={f.key} style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
              letterSpacing:0.5, marginBottom:6 }}>
              {f.label}{f.required && <span style={{ color:C.red }}> *</span>}
            </div>
            <input type={f.type||"text"} value={form[f.key]||""}
              onChange={e=>set(f.key,e.target.value)}
              placeholder={f.placeholder}
              style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
                borderRadius:11, border:`1.5px solid ${C.border}`,
                background:C.redPale, fontSize:14, color:C.text,
                outline:"none", fontFamily:"system-ui" }}/>
          </div>
        ))}

        {/* Eyalet */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>Eyalet</div>
          <select value={form.state||""} onChange={e=>set("state",e.target.value)}
            style={{ width:"100%", padding:"11px 14px", borderRadius:11,
              border:`1.5px solid ${C.border}`, background:C.redPale,
              fontSize:14, color:form.state?C.text:C.textMute, outline:"none" }}>
            <option value="">Eyalet seçin...</option>
            {US_STATES.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div style={{ padding:"12px 20px 32px", background:C.white,
        borderTop:`1px solid ${C.border}` }}>
        <button onClick={async()=>{
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase.from("profiles").upsert({
              id: user.id,
              name: form.name,
              email: form.email,
              state: form.state,
              city: form.city,
              avatar: form.avatar,
            });
          }
          onSave(form);
        }} style={{ width:"100%", border:"none",
          borderRadius:13, padding:"14px", fontSize:14, fontWeight:700,
          cursor:"pointer", background:`linear-gradient(135deg,${C.red},${C.redDark})`,
          color:C.white }}>
          Kaydet ✓
        </button>
      </div>
    </div>
  );
}

function BusinessDetail({ business, onBack, favorites, toggleFav, reviews, onAddReview, onReport, onReportReview, onViewUser, lang, isOwner, onBusiness }) {
  const [activeTab, setActiveTab] = useState("info");
  const [photoView, setPhotoView] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [starHover, setStarHover] = useState(0);
  const [newReview, setNewReview] = useState({ stars:0, text:"" });
  const [ownerReplies, setOwnerReplies] = useState({
    0: "Teşekkürler! Sizi tekrar görmek isteriz 🙏",
  });
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyDraft, setReplyDraft] = useState("");

  const bizReviews = reviews.filter(r=>r.bizId===business.id);
  const avgRating = bizReviews.length
    ? parseFloat((bizReviews.reduce((s,r)=>s+(r.stars||0),0)/bizReviews.length).toFixed(1))
    : business.rating;
  const isFav = favorites.includes(business.id);
  const todayKey = new Date().toDateString();
  const alreadyReviewed = bizReviews.some(r=>r.user==="Sen" && r.date==="Az önce") ||
    reviews.some(r=>r.bizId===business.id && r.user==="Sen" && r.todayKey===todayKey);

  const submitReview = () => {
    if(!newReview.stars) return;
    if(alreadyReviewed) return;
    onAddReview({ bizId:business.id, ...newReview, date:"Az önce", user:"Sen", todayKey });
    setNewReview({ stars:0, text:"" });
    setShowReviewForm(false);
    setActiveTab("reviews");
  };

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.bgSoft }}>
      <PhotoModal url={photoView} onClose={()=>setPhotoView(null)}/>

      {/* Header */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"14px 18px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <button onClick={onBack} style={{ background:"none", border:"none",
            color:C.red, fontSize:13, fontWeight:700, cursor:"pointer",
            display:"flex", alignItems:"center", gap:6 }}>← Geri</button>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {onReport && (
              <div onClick={onReport} style={{ fontSize:12, color:C.textMute,
                cursor:"pointer", padding:"4px 8px", borderRadius:8,
                border:`1px solid ${C.border}`, background:C.redPale }}>
                🚩 Rapor
              </div>
            )}
            <div onClick={()=>toggleFav(business.id)} style={{ cursor:"pointer",
              fontSize:28, color:isFav?"#E11D48":"#EECDD0" }}>
              {isFav?"♥":"♡"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto" }}>
        {/* İşletme özet kartı */}
        <div style={{ background:C.white, padding:"0 0 0", borderBottom:`1px solid ${C.border}` }}>

          {/* Fotoğraf Galerisi */}
          {(business.gallery_urls?.length > 0 || business.gallery?.length > 0) && (
            <div style={{ padding:"0 0 0", overflowX:"auto", display:"flex",
              borderBottom:`1px solid ${C.border}` }}>
              {(business.gallery_urls || business.gallery).map((g,i)=>(
                <div key={i} onClick={()=>setPhotoView(typeof g === 'string' ? g : null)}
                  style={{ flexShrink:0,
                  width: i===0 ? 220 : 130,
                  height: i===0 ? 160 : 130,
                  background: i%2===0
                    ? `linear-gradient(135deg,${C.redPale},#FFF5F6)`
                    : `linear-gradient(135deg,${C.turqLight},#EEF9FF)`,
                  borderRight:`1px solid ${C.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize: i===0 ? 56 : 40,
                  cursor:"pointer", position:"relative", overflow:"hidden" }}>
                  {typeof g === 'string' && g.startsWith('http')
                    ? <img src={g} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                    : g}
                  {i===0 && business.onaylı && (
                    <div style={{ position:"absolute", top:10, left:10,
                      background:"linear-gradient(135deg,#F59E0B,#D97706)",
                      borderRadius:8, padding:"3px 8px",
                      fontSize:9, fontWeight:700, color:C.white }}>✅ONAYLANMIŞ</div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ padding:"16px 18px 0" }}>
          <div style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:12 }}>
            <div onClick={()=>{ if(business.image_url) setPhotoView(business.image_url); }}
              style={{ width:56, height:56, borderRadius:14, flexShrink:0,
              background:`linear-gradient(135deg,${C.redPale},#FFF5F6)`,
              border:`1px solid ${C.border}`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:26,
              overflow:"hidden", cursor:business.image_url?"zoom-in":"default" }}>
              {business.image_url
                ? <img src={business.image_url} alt={business.name}
                    style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                : business.img}
            </div>
              <div style={{ flex:1 }}>
              <div style={{ fontSize:17, fontWeight:700, color:C.text, marginBottom:3,
                display:"flex", alignItems:"center", gap:8 }}>
                {business.name}
                {business.verified && (
                  <span title="Pusula ekibi tarafından kimliği doğrulanmış işletme"
                    style={{ display:"inline-flex", alignItems:"center", gap:3,
                      background:`linear-gradient(135deg,${C.turq},#0096C7)`,
                      borderRadius:8, padding:"2px 7px",
                      fontSize:9, fontWeight:700, color:C.white, cursor:"help",
                      flexShrink:0 }}>✓ ONAYLI</span>
                )}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
                <div style={{ fontSize:11, color:C.textMute }}>
                  📍 {business.city}, {business.state}
                </div>
                {/* Açık/Kapalı badge */}
                {(() => {
                  const open = isOpenNow(business.hours);
                  if (open === null) return null;
                  return (
                    <span style={{
                      background: open ? "#D1FAE5" : "#FEE2E2",
                      color:       open ? "#065F46"  : "#991B1B",
                      borderRadius:6, padding:"2px 8px",
                      fontSize:10, fontWeight:700 }}>
                      {open ? "● Açık" : "● Kapalı"}
                    </span>
                  );
                })()}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <Stars r={avgRating}/>
                <span style={{ fontSize:13, fontWeight:800, color:C.text }}>{avgRating}</span>
                <span style={{ fontSize:11, color:C.textMute }}>
                  ({business.reviews + bizReviews.length} yorum)
                </span>
              </div>
            </div>
          </div>

          {/* Eylemler */}
          <div style={{ display:"flex", gap:10, marginBottom:14 }}>
            <a href={`tel:${business.phone}`} style={{ flex:2, textDecoration:"none",
              background:`linear-gradient(135deg,${C.red},${C.redDark})`,
              borderRadius:12, padding:"12px", textAlign:"center", cursor:"pointer",
              display:"block" }}>
              <div style={{ fontSize:17, marginBottom:2 }}>📞</div>
              <div style={{ fontSize:11, fontWeight:700, color:C.white }}>Hemen Ara</div>
            </a>
            <a href={`https://wa.me/${business.phone.replace(/\D/g,"")}`}
              target="_blank" rel="noopener noreferrer"
              style={{ flex:1, textDecoration:"none", background:C.white,
                border:`1px solid ${C.border}`, borderRadius:12, padding:"12px",
                textAlign:"center", display:"block" }}>
              <div style={{ fontSize:17, marginBottom:2 }}>💬</div>
              <div style={{ fontSize:11, color:C.textSub }}>WhatsApp</div>
            </a>
            <div onClick={()=>{
              const shareText = `${business.name}\n📍 ${business.address}\n📞 ${business.phone}\n\nPusula uygulamasından paylaşıldı — pusula.app`;
              if (navigator.share) {
                navigator.share({ title:business.name, text:shareText });
              } else {
                navigator.clipboard?.writeText(shareText);
                alert("Kopyalandı! ✓");
              }
            }} style={{ flex:1, background:C.white, border:`1px solid ${C.border}`,
              borderRadius:12, padding:"12px", textAlign:"center", cursor:"pointer" }}>
              <div style={{ fontSize:17, marginBottom:2 }}>📤</div>
              <div style={{ fontSize:11, color:C.textSub }}>Paylaş</div>
            </div>
          </div>

          {/* Etiketler */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, paddingBottom:14 }}>
            {business.tags.map(t=>(
              <span key={t} style={{ background:C.redPale, border:`1px solid ${C.border}`,
                borderRadius:20, padding:"5px 13px", fontSize:11,
                color:C.textSub, fontWeight:600 }}>{t}</span>
            ))}
          </div>

          {/* Bu işletme sizin mi? Sahiplen */}
         
          {!isOwner && (
            <div style={{ background:`linear-gradient(135deg,#FFF8E1,#FFF3CD)`,
              border:"1px solid #FDE68A", borderRadius:13, padding:"12px 14px",
              marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:18 }}>🏢</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#92400E", marginBottom:2 }}>
                  Bu işletme sizin mi?
                </div>
                <div style={{ fontSize:11, color:"#B45309" }}>
                  Bilgileri güncelleyin, yorumlara yanıt verin.
                </div>
              </div>
              <div style={{ background:`linear-gradient(135deg,#F59E0B,#D97706)`,
                borderRadius:9, padding:"7px 12px",
                fontSize:11, fontWeight:700, color:C.white, cursor:"pointer",
                flexShrink:0 }}>Sahiplen</div>
            </div>
          )}

          {/* Tab bar */}
          <div style={{ display:"flex", marginTop:4 }}>
            {[{id:"info",label:"Bilgi"},{id:"gallery",label:`Galeri (${business.gallery?.length||0})`},{id:"reviews",label:`Yorumlar (${bizReviews.length})`}].map(t=>(
              <div key={t.id} onClick={()=>setActiveTab(t.id)} style={{ flex:1,
                padding:"10px 4px", textAlign:"center", fontSize:11, fontWeight:700,
                cursor:"pointer", color: activeTab===t.id ? C.red : C.textMute,
                borderBottom: activeTab===t.id ? `2.5px solid ${C.red}` : "2.5px solid transparent" }}>
                {t.label}
              </div>
            ))}
          </div>
          {isOwner && (
            <div onClick={async()=>{
              const reason = prompt("Kaldırma sebebi:");
              if (!reason) return;
              await supabase.from("removal_requests").insert({
                business_id: business.id,
                business_name: business.name,
                reason: reason,
              });
              alert("Kaldırma isteğiniz alındı.");
            }} style={{ textAlign:"center", padding:"8px", marginTop:8,
              fontSize:11, color:"#EF4444", cursor:"pointer", textDecoration:"underline" }}>
              🗑️ İşletmeyi kaldır
            </div>
          )}
          </div>
        </div>

        {/* Bilgi */}
        {activeTab==="info" && (
          <div style={{ padding:"16px 18px" }}>
            <div style={{ background:C.white, border:`1px solid ${C.border}`,
              borderRadius:16, overflow:"hidden" }}>

              {/* Telefon — tıklanabilir */}
              <a href={`tel:${business.phone}`}
                style={{ display:"flex", alignItems:"center", gap:14,
                  padding:"14px 16px", borderBottom:`1px solid ${C.border}`,
                  textDecoration:"none" }}>
                <div style={{ width:36, height:36, borderRadius:10, flexShrink:0,
                  background:`linear-gradient(135deg,${C.red},${C.redDark})`,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
                  📞
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:10, color:C.textMute, fontWeight:600, marginBottom:2 }}>Telefon</div>
                  <div style={{ fontSize:13, color:C.red, fontWeight:700 }}>{business.phone}</div>
                </div>
                <div style={{ fontSize:12, color:C.textMute }}>Ara →</div>
              </a>

              {/* Adres — Google Maps'e bağlı */}
              <a href={`https://maps.google.com/?q=${encodeURIComponent(business.address)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", gap:14,
                  padding:"14px 16px", borderBottom:`1px solid ${C.border}`,
                  textDecoration:"none" }}>
                <div style={{ width:36, height:36, borderRadius:10, flexShrink:0,
                  background:`linear-gradient(135deg,${C.turq},${C.turqDark})`,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
                  📍
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:10, color:C.textMute, fontWeight:600, marginBottom:2 }}>Adres</div>
                  <div style={{ fontSize:13, color:C.turq, fontWeight:600, lineHeight:1.4 }}>
                    {business.address}
                  </div>
                </div>
                <div style={{ fontSize:12, color:C.textMute }}>Harita →</div>
              </a>

              {/* Çalışma saatleri — dinamik */}
              <div style={{ padding:"14px 16px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10 }}>
                  <div style={{ width:36, height:36, borderRadius:10, flexShrink:0,
                    background:`linear-gradient(135deg,#F59E0B,#D97706)`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
                    🕐
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:10, color:C.textMute, fontWeight:600, marginBottom:2 }}>Çalışma Saatleri</div>
                    {(() => {
                      const open = isOpenNow(business.hours);
                      if (open === null) return <div style={{ fontSize:13, color:C.text, fontWeight:600 }}>Bilgi yok</div>;
                      if (open) {
                        const today = business.hours[NOW_DAY];
                        return <div style={{ fontSize:13, fontWeight:700, color:"#065F46" }}>● Şu an açık · {today.from}–{today.to}</div>;
                      } else {
                        return <div style={{ fontSize:13, fontWeight:700, color:"#991B1B" }}>● Kapalı · {nextOpenInfo(business.hours)}</div>;
                      }
                    })()}
                  </div>
                </div>
                {/* Haftalık tablo */}
                {business.hours && (
                  <div style={{ background:C.bgSoft, borderRadius:10, overflow:"hidden" }}>
                    {["Paz","Pzt","Salı","Çar","Per","Cum","Cmt"].map((day,i)=>{
                      const s = business.hours[i];
                      const isToday = i === NOW_DAY;
                      return (
                        <div key={day} style={{ display:"flex", alignItems:"center",
                          padding:"8px 12px", gap:10,
                          background: isToday ? C.redLight : "transparent",
                          borderBottom: i<6 ? `1px solid ${C.border}` : "none" }}>
                          <div style={{ width:32, fontSize:11, fontWeight: isToday?700:500,
                            color: isToday?C.red:C.textSub }}>{day}</div>
                          {s?.open
                            ? <div style={{ fontSize:12, color:C.text, flex:1 }}>{s.from} – {s.to}</div>
                            : <div style={{ fontSize:12, color:C.textMute, flex:1 }}>Kapalı</div>}
                          {isToday && (
                            <div style={{ fontSize:10, fontWeight:700,
                              color: isOpenNow(business.hours)?"#065F46":"#991B1B" }}>
                              {isOpenNow(business.hours)?"Açık":"Kapalı"}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Açıklama */}
            {business.desc && (
              <div style={{ background:C.white, border:`1px solid ${C.border}`,
                borderRadius:16, padding:"14px 16px", marginTop:10 }}>
                <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
                  letterSpacing:1.2, textTransform:"uppercase", marginBottom:8 }}>
                  HAKKINDA
                </div>
                <div style={{ fontSize:13, color:C.text, lineHeight:1.7 }}>
                  {business.desc}
                </div>
              </div>
            )}

            {/* Benzer İşletmeler */}
            {(() => {
              const similar = businesses
                .filter(b => b.id !== business.id && b.cat === business.cat)
                .slice(0, 4);
              if (!similar.length) return null;
              return (
                <div style={{ marginTop:14 }}>
                  <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
                    letterSpacing:1.5, textTransform:"uppercase", marginBottom:10 }}>
                    BENZERİ İŞLETMELER
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {similar.map(b=>{
                      const open = isOpenNow(b.hours);
                      return (
                        <div key={b.id} onClick={()=>onBusiness&&onBusiness(b)} style={{ background:C.white, border:`1.5px solid ${b.onaylı?"#F59E0B":C.border}`,
                          borderRadius:14, padding:"12px 14px",
                          display:"flex", gap:12, alignItems:"center",
                          cursor:"pointer",
                          boxShadow: b.onaylı?"0 2px 8px rgba(245,158,11,0.15)":"none" }}>
                          <div style={{ width:44, height:44, borderRadius:12, flexShrink:0,
                            background:`linear-gradient(135deg,${C.redPale},#FFF5F6)`,
                            border:`1px solid ${C.border}`,
                            display:"flex", alignItems:"center",
                            justifyContent:"center", fontSize:22 }}>
                            {b.img}
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                              <div style={{ fontSize:13, fontWeight:700, color:C.text,
                                whiteSpace:"nowrap", overflow:"hidden",
                                textOverflow:"ellipsis" }}>{b.name}</div>
                              {b.onaylı && (
                                <span style={{ background:"linear-gradient(135deg,#F59E0B,#D97706)",
                                  borderRadius:5, padding:"1px 6px",
                                  fontSize:8, fontWeight:700, color:C.white,
                                  flexShrink:0 }}>✅</span>
                              )}
                            </div>
                            <div style={{ fontSize:11, color:C.textMute, marginBottom:3 }}>
                              📍 {b.city}, {b.state}
                            </div>
                            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                              <Stars r={b.rating}/>
                              <span style={{ fontSize:11, fontWeight:700, color:C.text }}>{b.rating}</span>
                              <span style={{ fontSize:10, color:C.textMute }}>({b.reviews})</span>
                              {open !== null && (
                                <span style={{
                                  background: open?"#D1FAE5":"#FEE2E2",
                                  color:       open?"#065F46":"#991B1B",
                                  borderRadius:5, padding:"1px 6px",
                                  fontSize:9, fontWeight:700 }}>
                                  {open?"● Açık":"● Kapalı"}
                                </span>
                              )}
                            </div>
                          </div>
                          <div style={{ fontSize:16, color:C.textMute, flexShrink:0 }}>→</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Galeri */}
        {activeTab==="gallery" && (
          <div style={{ padding:"16px 18px" }}>
            {(!(business.gallery_urls?.length > 0) && !(business.gallery?.length > 0)) ? (
              <div style={{ textAlign:"center", padding:"40px 0" }}>
                <div style={{ fontSize:40, marginBottom:12 }}>📷</div>
                <div style={{ fontSize:14, color:C.textMute }}>Henüz fotoğraf yok</div>
              </div>
            ) : (
              <>
                <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
                  letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>
                  FOTOĞRAFLAR ({(business.gallery_urls||business.gallery).length})
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {(business.gallery_urls||business.gallery).map((g,i)=>(
                    <div key={i} onClick={()=>{ if(typeof g==='string'&&g.startsWith('http')) setPhotoView(g); }}
                      style={{
                      gridColumn: i===0 ? "span 2" : "span 1",
                      height: i===0 ? 180 : 120,
                      borderRadius:16, overflow:"hidden",
                      background: i%3===0
                        ? `linear-gradient(135deg,${C.redPale},#FFF0F2)`
                        : i%3===1
                        ? `linear-gradient(135deg,#EEF9FF,#DCF0FF)`
                        : `linear-gradient(135deg,#FFFBEB,#FEF3C7)`,
                      border:`1px solid ${C.border}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize: i===0 ? 60 : 44, cursor:"pointer",
                      position:"relative" }}>
                      {typeof g==='string'&&g.startsWith('http')
                        ? <img src={g} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                        : g}
                      {i===0 && (
                        <div style={{ position:"absolute", bottom:10, right:10,
                          background:"rgba(0,0,0,0.4)", borderRadius:8,
                          padding:"3px 8px", fontSize:10, color:C.white, fontWeight:700 }}>
                          Kapak
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:14, padding:"13px 16px",
                  background:C.white, border:`1px solid ${C.border}`,
                  borderRadius:14, textAlign:"center" }}>
                  <div style={{ fontSize:12, color:C.textMute, marginBottom:6 }}>
                    İşletme sahibi misiniz?
                  </div>
                  <div style={{ fontSize:13, fontWeight:700, color:C.red, cursor:"pointer" }}>
                    📷 Fotoğraf Ekle
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Yorumlar */}
        {activeTab==="reviews" && (
          <div style={{ padding:"16px 18px" }}>

            {/* Yorum yaz butonu */}
            {!showReviewForm && (
              alreadyReviewed ? (
                <div style={{ background:"#FEF3C7", border:"1px solid #F59E0B",
                  borderRadius:13, padding:"13px", marginBottom:14,
                  textAlign:"center", fontSize:13, color:"#92400E", fontWeight:600 }}>
                  ✅ Bu işletme için bugün yorum yaptınız
                </div>
              ) : (
                <button onClick={()=>setShowReviewForm(true)} style={{ width:"100%",
                  border:"none", borderRadius:13, padding:"13px", marginBottom:14,
                  fontSize:13, fontWeight:700, cursor:"pointer",
                  background:`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white }}>
                  ✏️ Yorum Yaz
                </button>
              )
            )}

            {/* Yorum formu */}
            {showReviewForm && (
              <div style={{ background:C.white, border:`1.5px solid ${C.border}`,
                borderRadius:16, padding:"16px", marginBottom:14 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:12 }}>
                  Puanınız
                </div>
                {/* Yıldız seçimi */}
                <div style={{ display:"flex", gap:6, marginBottom:14 }}>
                  {[1,2,3,4,5].map(s=>(
                    <span key={s}
                      onMouseEnter={()=>setStarHover(s)}
                      onMouseLeave={()=>setStarHover(0)}
                      onClick={()=>setNewReview(r=>({...r,stars:s}))}
                      style={{ fontSize:32, cursor:"pointer", transition:"transform 0.1s",
                        transform: (starHover||newReview.stars)>=s?"scale(1.15)":"scale(1)",
                        color:(starHover||newReview.stars)>=s ? C.gold : "#EECDD0" }}>★</span>
                  ))}
                </div>
                <textarea value={newReview.text}
                  onChange={e=>setNewReview(r=>({...r,text:e.target.value}))}
                  placeholder="Deneyiminizi paylaşın... (isteğe bağlı)"
                  rows={3}
                  style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
                    borderRadius:11, border:`1.5px solid ${C.border}`,
                    background:C.redPale, fontSize:14, color:C.text,
                    outline:"none", resize:"none", fontFamily:"system-ui",
                    lineHeight:1.6, marginBottom:10 }}/>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={submitReview} style={{ flex:2, border:"none",
                    borderRadius:11, padding:"11px", fontSize:13, fontWeight:700,
                    cursor:"pointer",
                    background: newReview.stars
                      ? `linear-gradient(135deg,${C.red},${C.redDark})`
                      : "#D4DCEE",
                    color: newReview.stars ? C.white : C.textMute }}>
                    Gönder
                  </button>
                  <button onClick={()=>setShowReviewForm(false)} style={{ flex:1,
                    border:`1px solid ${C.border}`, borderRadius:11, padding:"11px",
                    fontSize:13, color:C.textSub, cursor:"pointer", background:C.white }}>
                    İptal
                  </button>
                </div>
              </div>
            )}

            {/* Yorum listesi */}
            {bizReviews.length===0 && (
              <div style={{ textAlign:"center", padding:"30px 0",
                color:C.textMute, fontSize:13 }}>
                Henüz yorum yok — ilk yorumu sen yap!
              </div>
            )}
            {bizReviews.map((r,i)=>(
              <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`,
                borderRadius:16, padding:"14px 16px", marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between",
                  alignItems:"flex-start", marginBottom:6 }}>
                  <div onClick={()=>onViewUser&&onViewUser({name:r.user,avatar:r.avatar||"👤",helpfulCount:0})}
                    style={{ display:"flex", alignItems:"center", gap:8,
                      cursor:onViewUser?"pointer":"default" }}>
                    <div style={{ width:32, height:32, borderRadius:"50%",
                      background:`linear-gradient(135deg,${C.red},${C.redDark})`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:14, color:C.white, fontWeight:700 }}>
                      {r.avatar||r.user[0]}
                    </div>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:C.red }}>{r.user}</div>
                      <div style={{ fontSize:10, color:C.textMute }}>{r.date}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ display:"flex", gap:2 }}>
                      {[1,2,3,4,5].map(s=>(
                        <span key={s} style={{ fontSize:13,
                          color:s<=r.stars?C.gold:"#EECDD0" }}>★</span>
                      ))}
                    </div>
                    {onReportReview && (
                      <div onClick={onReportReview}
                        style={{ fontSize:11, color:C.textMute, cursor:"pointer",
                          padding:"2px 6px", borderRadius:6,
                          border:`1px solid ${C.border}` }}>🚩</div>
                    )}
                  </div>
                </div>
                {r.text && (
                  <div style={{ fontSize:13, color:C.text, lineHeight:1.6, marginTop:6 }}>
                    {r.text}
                  </div>
                )}

                {/* İşletme Yanıtı */}
                {ownerReplies[i] && (
                  <div style={{ marginTop:10, marginLeft:8,
                    borderLeft:`3px solid ${C.red}`,
                    paddingLeft:10, background:C.redLight,
                    borderRadius:"0 10px 10px 0", padding:"9px 12px 9px 12px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                      <div style={{ width:20, height:20, borderRadius:"50%", flexShrink:0,
                        background:`linear-gradient(135deg,${C.red},${C.redDark})`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:10 }}>🏢</div>
                      <span style={{ fontSize:11, fontWeight:700, color:C.red }}>
                        {business.name} · İşletme Sahibi
                      </span>
                    </div>
                    <div style={{ fontSize:12, color:C.text, lineHeight:1.5 }}>
                      {ownerReplies[i]}
                    </div>
                    {isOwner && (
                      <div onClick={()=>{ setOwnerReplies(p=>{const n={...p};delete n[i];return n;}); }}
                        style={{ fontSize:10, color:C.textMute, cursor:"pointer",
                          marginTop:5, textDecoration:"underline" }}>
                        Yanıtı sil
                      </div>
                    )}
                  </div>
                )}

                {/* İşletme sahibiyse yanıt yaz butonu */}
                {isOwner && !ownerReplies[i] && (
                  replyingTo===i ? (
                    <div style={{ marginTop:10 }}>
                      <textarea
                        value={replyDraft}
                        onChange={e=>setReplyDraft(e.target.value)}
                        placeholder="Yoruma yanıt yazın..."
                        rows={2}
                        style={{ width:"100%", border:`1.5px solid ${C.red}`,
                          borderRadius:10, padding:"9px 12px", fontSize:12,
                          fontFamily:"system-ui", resize:"none", outline:"none",
                          boxSizing:"border-box", color:C.text }}/>
                      <div style={{ display:"flex", gap:8, marginTop:6 }}>
                        <button onClick={()=>{
                          if(replyDraft.trim()){
                            setOwnerReplies(p=>({...p,[i]:replyDraft.trim()}));
                            setReplyDraft(""); setReplyingTo(null);
                          }
                        }} style={{ flex:1, border:"none", borderRadius:9,
                          padding:"9px", fontSize:12, fontWeight:700,
                          cursor:"pointer",
                          background:`linear-gradient(135deg,${C.red},${C.redDark})`,
                          color:C.white }}>
                          Yanıtla ✓
                        </button>
                        <button onClick={()=>{ setReplyingTo(null); setReplyDraft(""); }}
                          style={{ border:`1px solid ${C.border}`, borderRadius:9,
                            padding:"9px 14px", fontSize:12, fontWeight:700,
                            cursor:"pointer", background:C.white, color:C.textSub }}>
                          İptal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div onClick={()=>{ setReplyingTo(i); setReplyDraft(""); }}
                      style={{ marginTop:8, display:"inline-flex", alignItems:"center",
                        gap:5, fontSize:11, fontWeight:700, color:C.red,
                        cursor:"pointer", padding:"4px 10px",
                        background:C.redLight, borderRadius:8,
                        border:`1px solid ${C.border}` }}>
                      💬 Yanıtla
                    </div>
                  )
                )}
              </div>
            ))}
            <div style={{ height:16 }}/>
          </div>
        )}
      </div>
    </div>
  );
}

function AuthScreen({ onAuth, onBack }) {
  const [mode, setMode]   = useState("login"); // login | signup
  const [form, setForm]   = useState({ name:"", email:"", password:"", state:"" });
  const [error, setError] = useState("");
  const [showTerms,   setShowTerms]   = useState(false);
const [showPrivacy, setShowPrivacy] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = async () => {
    if (!form.email || !form.password) { setError("E-posta ve şifre zorunludur."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Geçerli bir e-posta adresi girin."); return; }
    if (mode==="signup" && !form.name) { setError("Ad soyad zorunludur."); return; }
    if (form.password.length < 6) { setError("Şifre en az 6 karakter olmalıdır."); return; }
    setError("");

    if (mode==="signup") {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      if (error) { setError(error.message); return; }
      await supabase.from("profiles").insert({
        id: data.user.id,
        name: form.name,
        email: form.email,
        state: form.state,
        city: "",
        avatar: "👤",
      });
      onAuth({
        name: form.name,
        email: form.email,
        avatar: "👤",
        state: form.state,
        city: "", phone: "", reviewCount: 0, bizCount: 0,
      });
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) { setError("E-posta veya şifre hatalı."); return; }
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();
      onAuth({
        name: profile?.name || form.email.split("@")[0],
        email: form.email,
        avatar: profile?.avatar || "👤",
        state: profile?.state || "",
        city: profile?.city || "",
        phone: "", reviewCount: 0, bizCount: 0,
      });
    }
  };

  if (showTerms) return (
    <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0,
      background:"rgba(0,0,0,0.5)", zIndex:300,
      display:"flex", alignItems:"flex-end", justifyContent:"center" }}
      onClick={()=>setShowTerms(false)}>
      <div onClick={e=>e.stopPropagation()}
        style={{ background:C.white, borderRadius:"20px 20px 0 0",
          width:"100%", maxWidth:430, maxHeight:"90vh",
          display:"flex", flexDirection:"column" }}>
        <div style={{ width:36, height:4, borderRadius:2, background:C.border, margin:"14px auto 0" }}/>
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`,
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontSize:16, fontWeight:700, color:C.text }}>Kullanım Şartları</div>
          <div onClick={()=>setShowTerms(false)} style={{ fontSize:20, color:C.textMute, cursor:"pointer" }}>✕</div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"20px" }}>
          {[
            { title:"1. Hizmet Kapsamı", text:"Pusula Amerika, Amerika'daki Türk topluluğuna yönelik bir işletme rehberi, iş ilanları ve etkinlik platformudur. Platform yalnızca bilgi amaçlıdır. Pusula Amerika, listelenen işletmelerin hizmet kalitesini garanti etmez." },
            { title:"2. Kullanıcı Sorumlulukları", text:"Kullanıcılar platforma ekledikleri bilgilerin doğruluğundan sorumludur. Yanlış, yanıltıcı, hakaret içeren veya zararlı içerik paylaşmak kesinlikle yasaktır. İhlal durumunda hesap askıya alınabilir veya kalıcı olarak silinebilir." },
            { title:"3. Yaş Sınırı (COPPA)", text:"Platform yalnızca 13 yaş ve üzeri kullanıcılara yöneliktir. 13 yaşın altındaki bireylerden bilerek veri toplanmamaktadır. Ebeveynler, çocuklarının hesap açtığını fark ederlerse pusulaamerika@gmail.com adresine bildirebilir." },
            { title:"4. İşletme Listelemeleri", text:"İşletme bilgileri admin onayına tabidir. Pusula Amerika, uygunsuz, yanlış veya yanıltıcı içerikleri önceden haber vermeksizin kaldırma hakkını saklı tutar. Onay süreci 24-48 saat içinde tamamlanır." },
            { title:"5. Ödeme ve İade Şartları", text:"Premium üyelik ve öne çıkarma hizmetleri için alınan ödemeler Stripe altyapısı üzerinden işlenir. Satın alımlar dijital hizmet niteliğinde olduğundan iade yapılmamaktadır. Ancak teknik hata kaynaklı çifte ödeme durumlarında 7 iş günü içinde iade sağlanır. Abonelikler bir sonraki fatura döneminden önce iptal edilebilir." },
            { title:"6. DMCA İçerik Kaldırma", text:"Telif hakkınızı ihlal ettiğini düşündüğünüz içerikler için pusulaamerika@gmail.com adresine DMCA kaldırma talebi gönderebilirsiniz. Talebinizde içeriğin URL'si, hak sahibi bilgileriniz ve imzalı beyanınız yer almalıdır. Geçerli talepler 5 iş günü içinde işleme alınır." },
            { title:"7. Fikri Mülkiyet", text:"Platformdaki tüm içerikler, görseller, logolar ve marka unsurları Pusula Amerika'ya aittir. Kullanıcıların paylaştığı içerikler için platform, dünya genelinde ücretsiz, devredilebilir bir lisans hakkı edinir. Bu hak, içerik silindiğinde sona erer." },
            { title:"8. Sorumluluk Reddi", text:"Pusula Amerika, üçüncü taraf işletmelerin hizmetlerinden, web sitelerinden veya ürünlerinden doğan zararlardan sorumlu değildir. Platform maksimum sorumluluk tutarı, kullanıcının son 12 ayda ödediği toplam tutar ile sınırlıdır." },
            { title:"9. Yargı Yetkisi", text:"Bu kullanım şartları Virginia Eyaleti kanunlarına tabidir. Herhangi bir anlaşmazlık durumunda Virginia federal veya eyalet mahkemeleri yetkilidir. Kullanıcılar bu yargı yetkisini kabul etmiş sayılır." },
            { title:"10. Değişiklikler", text:"Kullanım şartları önceden haber verilmeksizin güncellenebilir. Güncel şartlar her zaman uygulama üzerinden erişilebilir olacaktır. Platforma erişmeye devam etmek, güncel şartları kabul etmek anlamına gelir." },
          ].map((s,i)=>(
            <div key={i} style={{ marginBottom:20 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6 }}>{s.title}</div>
              <div style={{ fontSize:12, color:C.textSub, lineHeight:1.8 }}>{s.text}</div>
            </div>
          ))}
          <div style={{ fontSize:11, color:C.textMute, marginTop:8, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
            Son güncelleme: Mart 2026 · İletişim: pusulaamerika@gmail.com · Virginia, ABD
          </div>
        </div>
        <div style={{ padding:"12px 20px 32px", borderTop:`1px solid ${C.border}` }}>
          <button onClick={()=>setShowTerms(false)} style={{ width:"100%", border:"none",
            borderRadius:13, padding:"13px", fontSize:14, fontWeight:700,
            cursor:"pointer", background:`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white }}>
            Anladım ✓
          </button>
        </div>
      </div>
    </div>
  );

  if (showPrivacy) return (
    <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0,
      background:"rgba(0,0,0,0.5)", zIndex:300,
      display:"flex", alignItems:"flex-end", justifyContent:"center" }}
      onClick={()=>setShowPrivacy(false)}>
      <div onClick={e=>e.stopPropagation()}
        style={{ background:C.white, borderRadius:"20px 20px 0 0",
          width:"100%", maxWidth:430, maxHeight:"90vh",
          display:"flex", flexDirection:"column" }}>
        <div style={{ width:36, height:4, borderRadius:2, background:C.border, margin:"14px auto 0" }}/>
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`,
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontSize:16, fontWeight:700, color:C.text }}>Gizlilik Politikası</div>
          <div onClick={()=>setShowPrivacy(false)} style={{ fontSize:20, color:C.textMute, cursor:"pointer" }}>✕</div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"20px" }}>
          {[
            { title:"1. Toplanan Bilgiler", text:"Hesap oluştururken ad, e-posta adresi ve eyalet/şehir bilgisi toplanır. İşletme sahipleri ek olarak işletme adı, adres, telefon ve açıklama bilgisi sağlar. Ödeme işlemlerinde kart bilgileri yalnızca Stripe tarafından işlenir; Pusula Amerika ödeme bilgilerini saklamaz." },
            { title:"2. Bilgilerin Kullanımı", text:"Toplanan bilgiler; hesap yönetimi, işletme listeleme, iş ilanları, etkinlik duyuruları ve platform iyileştirme amacıyla kullanılır. Kişisel bilgileriniz üçüncü taraflara satılmaz veya kiralanmaz. Yalnızca yasal zorunluluk halinde yetkili makamlarla paylaşılabilir." },
            { title:"3. Çerez Politikası", text:"Platform, oturum yönetimi için zorunlu çerezler kullanır. Analitik amaçlı anonim kullanım verileri toplanabilir. Reklam amaçlı üçüncü taraf çerezi kullanılmamaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda bazı özellikler çalışmayabilir." },
            { title:"4. Veri Güvenliği", text:"Tüm veriler Supabase altyapısında AES-256 şifreleme ile saklanır. SSL/TLS protokolü ile veri transferi şifrelenir. Şüpheli erişim durumunda kullanıcılar e-posta ile bilgilendirilir. Veri ihlali durumunda Virginia Veri İhlali Bildirimi Kanunu gereği yetkili makamlar ve etkilenen kullanıcılar bilgilendirilir." },
            { title:"5. Veri Saklama Süresi", text:"Aktif hesaplar için veriler hesap silinene kadar saklanır. Silinen hesaplara ait veriler 30 gün içinde sistemden kalıcı olarak kaldırılır. Yasal yükümlülükler kapsamındaki kayıtlar kanunun öngördüğü süre boyunca saklanabilir." },
            { title:"6. Kullanıcı Hakları", text:"Hesabınızı ve tüm verilerinizi istediğiniz zaman silebilirsiniz. Verilerinizin bir kopyasını talep edebilirsiniz. Yanlış bilgilerin düzeltilmesini isteyebilirsiniz. Tüm talepler için pusulaamerika@gmail.com adresine yazabilirsiniz. Talepler 30 gün içinde yanıtlanır." },
            { title:"7. CCPA (Kaliforniya) Hakları", text:"Kaliforniya sakinleri; kişisel verilerinin ne şekilde kullanıldığını öğrenme, silinmesini talep etme ve satışına itiraz etme haklarına sahiptir. Pusula Amerika kişisel veri satmamaktadır. CCPA talepleri için pusulaamerika@gmail.com adresine ulaşabilirsiniz." },
            { title:"8. GDPR (AB) Hakları", text:"Avrupa Birliği sakinleri; verilere erişim, düzeltme, silme, işlemeyi kısıtlama ve taşınabilirlik haklarına sahiptir. Veri işlemenin yasal dayanağı açık rıza ve meşru menfaattir. Şikayetler için ilgili ülkenin veri koruma otoritesine başvurulabilir." },
            { title:"9. Çocukların Gizliliği", text:"13 yaşın altındaki bireylerden bilerek veri toplanmamaktadır. Bir çocuğun hesap açtığını fark ederseniz pusulaamerika@gmail.com adresine bildirin; hesap ve ilgili veriler derhal silinecektir." },
            { title:"10. Yargı Yetkisi ve Geçerli Hukuk", text:"Bu gizlilik politikası Virginia Eyaleti kanunlarına ve federal ABD gizlilik yasalarına tabidir. Anlaşmazlıklarda Virginia mahkemeleri yetkilidir." },
          ].map((s,i)=>(
            <div key={i} style={{ marginBottom:20 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6 }}>{s.title}</div>
              <div style={{ fontSize:12, color:C.textSub, lineHeight:1.8 }}>{s.text}</div>
            </div>
          ))}
          <div style={{ fontSize:11, color:C.textMute, marginTop:8, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
            Son güncelleme: Mart 2026 · İletişim: pusulaamerika@gmail.com · Virginia, ABD
          </div>
        </div>
        <div style={{ padding:"12px 20px 32px", borderTop:`1px solid ${C.border}` }}>
          <button onClick={()=>setShowPrivacy(false)} style={{ width:"100%", border:"none",
            borderRadius:13, padding:"13px", fontSize:14, fontWeight:700,
            cursor:"pointer", background:`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white }}>
            Anladım ✓
          </button>
        </div>
      </div>
    </div>
  );

  if (showPrivacy) return (
    <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0,
      background:"rgba(0,0,0,0.5)", zIndex:300,
      display:"flex", alignItems:"flex-end", justifyContent:"center" }}
      onClick={()=>setShowPrivacy(false)}>
      <div onClick={e=>e.stopPropagation()}
        style={{ background:C.white, borderRadius:"20px 20px 0 0",
          width:"100%", maxWidth:430, maxHeight:"85vh",
          display:"flex", flexDirection:"column" }}>
        <div style={{ width:36, height:4, borderRadius:2, background:C.border, margin:"14px auto 0" }}/>
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`,
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontSize:16, fontWeight:700, color:C.text }}>Gizlilik Politikası</div>
          <div onClick={()=>setShowPrivacy(false)} style={{ fontSize:20, color:C.textMute, cursor:"pointer" }}>✕</div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"20px" }}>
          {[
            { title:"1. Toplanan Bilgiler", text:"Ad, e-posta adresi, konum (eyalet/şehir) ve işletme bilgileri toplanmaktadır. Ödeme bilgileri Pusula Amerika tarafından saklanmaz." },
            { title:"2. Bilgilerin Kullanımı", text:"Toplanan bilgiler; hesap yönetimi, işletme listeleme, iş ilanları ve platform iyileştirme amacıyla kullanılır. Üçüncü taraflarla satılmaz." },
            { title:"3. Veri Güvenliği", text:"Tüm veriler Supabase altyapısında şifreli olarak saklanır. SSL/TLS şifreleme kullanılmaktadır." },
            { title:"4. Çerezler", text:"Platform, kullanıcı deneyimini iyileştirmek için oturum çerezleri kullanır. Üçüncü taraf reklam çerezi kullanılmamaktadır." },
            { title:"5. Kullanıcı Hakları", text:"Hesabınızı ve verilerinizi istediğiniz zaman silebilirsiniz. Veri talepleriniz için pusulaamerika@gmail.com adresine ulaşabilirsiniz." },
            { title:"6. CCPA & GDPR", text:"Kaliforniya ve AB kullanıcıları, kişisel verilerinin silinmesini ve aktarılmamasını talep etme hakkına sahiptir." },
          ].map((s,i)=>(
            <div key={i} style={{ marginBottom:18 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6 }}>{s.title}</div>
              <div style={{ fontSize:12, color:C.textSub, lineHeight:1.7 }}>{s.text}</div>
            </div>
          ))}
          <div style={{ fontSize:11, color:C.textMute, marginTop:8 }}>
            Son güncelleme: Mart 2026 · pusulaamerika@gmail.com
          </div>
        </div>
        <div style={{ padding:"12px 20px 32px", borderTop:`1px solid ${C.border}` }}>
          <button onClick={()=>setShowPrivacy(false)} style={{ width:"100%", border:"none",
            borderRadius:13, padding:"13px", fontSize:14, fontWeight:700,
            cursor:"pointer", background:`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white }}>
            Anladım ✓
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.white }}>
      <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        padding:"32px 24px 40px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", bottom:-40, right:-40, width:130, height:130,
          borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
        {onBack && (
          <button onClick={onBack} style={{ background:"none", border:"none",
            color:"rgba(255,255,255,0.75)", fontSize:13, fontWeight:700,
            cursor:"pointer", marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
            ← Geri
          </button>
        )}
        <div style={{ marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
  <img src="/logo.png" alt="Pusula Amerika" style={{ height:60, width:"auto", background:"transparent" }}/>
  <div className="playfair" style={{ fontSize:22, fontWeight:800, color:C.white }}>
    Pusula <span style={{ color:"#C9A84C" }}>Amerika</span>
  </div>
</div>
        <div style={{ fontSize:20, fontWeight:800, color:C.white, marginBottom:4 }}>
          {mode==="login" ? "Hoş Geldiniz" : "Hesap Oluştur"}
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)" }}>
          {mode==="login" ? "Hesabınıza giriş yapın" : "Amerika Rehberi'ne katılın"}
        </div>
      </div>

      {/* Tab */}
      <div style={{ display:"flex", background:C.white, borderBottom:`1px solid ${C.border}` }}>
        {[{id:"login",label:"Giriş Yap"},{id:"signup",label:"Kayıt Ol"}].map(t=>(
          <div key={t.id} onClick={()=>{ setMode(t.id); setError(""); }}
            style={{ flex:1, padding:"13px", textAlign:"center", fontSize:13,
              fontWeight:700, cursor:"pointer",
              color: mode===t.id ? C.red : C.textMute,
              borderBottom: mode===t.id ? `2.5px solid ${C.red}` : "2.5px solid transparent" }}>
            {t.label}
          </div>
        ))}
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"24px 20px" }}>
        {error && (
          <div style={{ background:"#FFF0F2", border:`1px solid ${C.border}`,
            borderRadius:10, padding:"10px 14px", marginBottom:16,
            fontSize:12, color:C.red, fontWeight:600 }}>
            ⚠️ {error}
          </div>
        )}

        {mode==="signup" && (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
              letterSpacing:0.5, marginBottom:6 }}>Ad Soyad *</div>
            <input value={form.name} onChange={e=>set("name",e.target.value)}
              placeholder="Ahmet Yılmaz"
              style={{ width:"100%", boxSizing:"border-box", padding:"12px 14px",
                borderRadius:11, border:`1.5px solid ${C.border}`,
                background:C.redPale, fontSize:14, color:C.text, outline:"none" }}/>
          </div>
        )}

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>E-posta *</div>
          <input type="email" value={form.email} onChange={e=>set("email",e.target.value)}
            placeholder="ornek@email.com"
            style={{ width:"100%", boxSizing:"border-box", padding:"12px 14px",
              borderRadius:11, border:`1.5px solid ${C.border}`,
              background:C.redPale, fontSize:14, color:C.text, outline:"none" }}/>
        </div>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>Şifre *</div>
          <input type="password" value={form.password} onChange={e=>set("password",e.target.value)}
            placeholder="••••••••"
            style={{ width:"100%", boxSizing:"border-box", padding:"12px 14px",
              borderRadius:11, border:`1.5px solid ${C.border}`,
              background:C.redPale, fontSize:14, color:C.text, outline:"none" }}/>
        </div>

        {mode==="signup" && (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
              letterSpacing:0.5, marginBottom:6 }}>Eyalet</div>
            <select value={form.state} onChange={e=>set("state",e.target.value)}
              style={{ width:"100%", padding:"12px 14px", borderRadius:11,
                border:`1.5px solid ${C.border}`, background:C.redPale,
                fontSize:14, color:form.state?C.text:C.textMute, outline:"none" }}>
              <option value="">Eyalet seçin (isteğe bağlı)</option>
              {US_STATES.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}

        {mode==="login" && (
          <div style={{ textAlign:"right", marginBottom:16 }}>
            <span style={{ fontSize:12, color:C.red, fontWeight:600, cursor:"pointer" }}>
              Şifremi unuttum
            </span>
          </div>
        )}

        <div style={{ background:C.redPale, border:`1px solid ${C.border}`,
          borderRadius:12, padding:"12px 14px", marginBottom:20,
          display:"flex", gap:10, alignItems:"center" }}>
          <span style={{ fontSize:20 }}>🔒</span>
          <div style={{ fontSize:11, color:C.textSub, lineHeight:1.5 }}>
            Bilgileriniz güvende. Üçüncü taraflarla asla paylaşılmaz.
          </div>
        </div>
      </div>

      <div style={{ padding:"12px 20px 32px", background:C.white,
        borderTop:`1px solid ${C.border}` }}>
        <button onClick={handleSubmit} style={{ width:"100%", border:"none",
          borderRadius:13, padding:"14px", fontSize:15, fontWeight:700,
          cursor:"pointer", marginBottom:12,
          background:`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white }}>
          {mode==="login" ? "Giriş Yap →" : "Kayıt Ol →"}
        </button>
        {mode==="signup" && (
          <div style={{ fontSize:10, color:C.textMute, textAlign:"center", marginBottom:10, lineHeight:1.6 }}>
            Kayıt olarak{" "}
            <span onClick={()=>setShowTerms(true)} style={{ color:C.red, cursor:"pointer", textDecoration:"underline" }}>Kullanım Şartları</span>
            {" "}ve{" "}
            <span onClick={()=>setShowPrivacy(true)} style={{ color:C.red, cursor:"pointer", textDecoration:"underline" }}>Gizlilik Politikası</span>
            'nı kabul etmiş sayılırsınız.
          </div>
        )}
        <div style={{ textAlign:"center", fontSize:12, color:C.textMute }}>
          {mode==="login" ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}
          {" "}
          <span onClick={()=>{ setMode(mode==="login"?"signup":"login"); setError(""); }}
            style={{ color:C.red, fontWeight:700, cursor:"pointer" }}>
            {mode==="login" ? "Kayıt Ol" : "Giriş Yap"}
          </span>
        </div>
      </div>
    </div>
  );
}

function PostJob({ onBack, onSuccess, userName }) {
  const [form, setForm] = useState({
    title:"", company:"", type:"Tam Zamanlı", location:"",
    state:"", description:"", tags:"", phone:"",
  });
  const [submitted, setSubmitted] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const canSubmit = form.title && form.company && form.location && form.state;

  if (submitted) return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:C.white, padding:32, textAlign:"center" }}>
      <div style={{ width:80, height:80, borderRadius:22, margin:"0 auto 20px",
        background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:38 }}>💼</div>
      <div style={{ fontSize:21, fontWeight:800, color:C.text, marginBottom:10 }}>İlan Yayınlandı!</div>
      <div style={{ fontSize:13, color:C.textSub, lineHeight:1.7, marginBottom:32 }}>
        <span style={{ fontWeight:700, color:C.red }}>"{form.title}"</span> ilanınız
        yayına alındı. Başvurular geldiğinde bildirim alacaksınız.
      </div>
      <button onClick={()=>onSuccess(form)} style={{ border:"none", borderRadius:13,
        padding:"14px 36px", fontSize:14, fontWeight:700, cursor:"pointer",
        background:`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white }}>
        İlanlara Dön
      </button>
    </div>
  );

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.white }}>
      <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        padding:"20px 20px 24px" }}>
        <button onClick={onBack} style={{ background:"none", border:"none",
          color:"rgba(255,255,255,0.75)", fontSize:13, fontWeight:700,
          cursor:"pointer", marginBottom:14, display:"flex", alignItems:"center", gap:6 }}>
          ← Geri
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:42, height:42, borderRadius:12,
            background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.3)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>💼</div>
          <div>
            <div style={{ fontSize:18, fontWeight:700, color:C.white }}>İş İlanı Ver</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)" }}>
              Türk topluluğuna ulaşın
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"20px" }}>
        {[
          { key:"title",   label:"İlan Başlığı *", placeholder:"Türkçe Satış Temsilcisi" },
          { key:"company", label:"Firma / Kurum *", placeholder:"Şirket adınız"          },
        ].map(f=>(
          <div key={f.key} style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
              letterSpacing:0.5, marginBottom:6 }}>{f.label}</div>
            <input value={form[f.key]} onChange={e=>set(f.key,e.target.value)}
              placeholder={f.placeholder}
              style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
                borderRadius:11, border:`1.5px solid ${C.border}`,
                background:C.redPale, fontSize:14, color:C.text, outline:"none" }}/>
          </div>
        ))}

       

        {/* Eyalet */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>Eyalet *</div>
          <select value={form.state} onChange={e=>set("state",e.target.value)}
            style={{ width:"100%", padding:"11px 14px", borderRadius:11,
              border:`1.5px solid ${C.border}`, background:C.redPale,
              fontSize:14, color:form.state?C.text:C.textMute, outline:"none" }}>
            <option value="">Seçin...</option>
            {US_STATES.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>

         {/* Şehir */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>Şehir *</div>
          <input value={form.location} onChange={e=>set("location",e.target.value)}
            placeholder={form.state ? `${form.state} şehrini girin` : "Önce eyalet seçin"}
            disabled={!form.state}
            style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
              borderRadius:11, border:`1.5px solid ${C.border}`,
              background: form.state ? C.redPale : "#F0F0F0",
              fontSize:14, color:C.text, outline:"none" }}/>
        </div>

        {/* Çalışma tipi */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:8 }}>Çalışma Tipi</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {["Tam Zamanlı","Yarı Zamanlı","Serbest","Remote"].map(t=>(
              <div key={t} onClick={()=>set("type",t)} style={{ padding:"7px 14px",
                borderRadius:20, fontSize:11, fontWeight:700, cursor:"pointer",
                background: form.type===t ? C.red : C.redPale,
                border:`1px solid ${form.type===t ? C.red : C.border}`,
                color: form.type===t ? C.white : C.textSub }}>{t}</div>
            ))}
          </div>
        </div>

    

        {/* Açıklama */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>İş Tanımı</div>
          <textarea value={form.description} onChange={e=>set("description",e.target.value)}
            placeholder="Aranan özellikleri, görevleri ve avantajları açıklayın..."
            rows={4}
            style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
              borderRadius:11, border:`1.5px solid ${C.border}`,
              background:C.redPale, fontSize:14, color:C.text,
              outline:"none", resize:"vertical", fontFamily:"system-ui", lineHeight:1.6 }}/>
        </div>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>İletişim Telefonu *</div>
          <input value={form.phone} onChange={e=>set("phone",e.target.value)}
            placeholder="+1 (212) 555-0101" type="tel"
            style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
              borderRadius:11, border:`1.5px solid ${C.border}`,
              background:C.redPale, fontSize:14, color:C.text, outline:"none" }}/>
        </div>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>Etiketler</div>
          <input value={form.tags} onChange={e=>set("tags",e.target.value)}
            placeholder="Türkçe, Satış, Excel, Sürücü Ehliyeti..."
            style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
              borderRadius:11, border:`1.5px solid ${C.border}`,
              background:C.redPale, fontSize:14, color:C.text, outline:"none" }}/>
        </div>
      </div>

      <div style={{ padding:"12px 20px 32px", background:C.white,
        borderTop:`1px solid ${C.border}` }}>
        <button onClick={async()=>{ if(!canSubmit) return;
  const { data: { user } } = await supabase.auth.getUser();
  
  let imageUrl = null;
  if (form.image) {
    const ext = form.image.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('events')
      .upload(fileName, form.image, { contentType: form.image.type });
    console.log("Upload data:", uploadData, "Error:", uploadError);
    if (uploadData) {
      const { data: urlData } = supabase.storage
        .from('events')
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
      console.log("Image URL:", imageUrl);
    }
  }

  await supabase.from("events").insert({
    title: form.title,
    org: form.org,
    date: form.date,
    location: form.location,
    state: form.state,
    zip: form.zip,
    category: form.cat,
    description: form.description,
    free: form.free,
    price: form.price,
    image_url: imageUrl,
    owner_id: user?.id || null,
  });
  setSubmitted(true);
  onSuccess && onSuccess({...form, imageUrl, image_url: imageUrl});
}} style={{ width:"100%",
          border:"none", borderRadius:13, padding:"14px", fontSize:14, fontWeight:700,
          cursor:canSubmit?"pointer":"default",
          background: canSubmit
            ? `linear-gradient(135deg,${C.red},${C.redDark})`
            : "#D4DCEE",
          color: canSubmit ? C.white : C.textMute }}>
          💼 İlanı Yayınla
        </button>
      </div>
    </div>
  );
}

function PostEvent({ onBack, onSuccess }) {
  const [form, setForm] = useState({
    title:"", org:"", date:"", location:"", state:"", zip:"",
    cat:"Kültür & Sanat", free:true, price:"", description:"", image:null,
  });
  const [submitted, setSubmitted] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const canSubmit = form.title && form.org && form.date && form.location;
  const catOpts = ["Ulusal Bayram","Kültür & Sanat","Yemek","Networking","Müzik","Spor","Diğer"];

  if (submitted) return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.white }}>
      <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        padding:"28px 24px 32px", textAlign:"center" }}>
        <div style={{ width:72, height:72, borderRadius:20, margin:"0 auto 16px",
          background:"rgba(255,255,255,0.2)",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:34 }}>🎉</div>
        <div style={{ fontSize:20, fontWeight:800, color:C.white, marginBottom:6 }}>
          Etkinlik Eklendi!
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.75)", lineHeight:1.6 }}>
          <span style={{ fontWeight:700 }}>"{form.title}"</span> incelendikten sonra yayına alınacak.
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"20px 18px" }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:14, textAlign:"center" }}>
          Daha fazla kişiye ulaşmak ister misiniz? 🚀
        </div>

        {[
          { icon:"🔔", title:"Bildirim Gönder", desc:`Tüm ${form.state||"bölge"} kullanıcılarına bildirim git`, price:"$15", color:C.turq },
          { icon:"✅", title:"Öne Çıkar", desc:"Ana sayfada 7 gün üst sırada görün", price:"$25", color:"#F59E0B" },
          { icon:"🚀", title:"Tam Paket", desc:"Bildirim + Öne çıkarma + Bu haftanın etkinliği rozeti", price:"$40", color:C.red, best:true },
        ].map(pkg=>(
          <div key={pkg.title} style={{ background:C.white,
            border:`2px solid ${pkg.best?pkg.color:C.border}`,
            borderRadius:16, padding:"14px 16px", marginBottom:10,
            position:"relative", overflow:"hidden" }}>
            {pkg.best && (
              <div style={{ position:"absolute", top:10, right:10,
                background:`linear-gradient(135deg,${C.red},${C.redDark})`,
                borderRadius:6, padding:"2px 8px",
                fontSize:9, fontWeight:700, color:C.white }}>🔥 EN İYİ</div>
            )}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
              <div style={{ width:40, height:40, borderRadius:11, flexShrink:0,
                background:`${pkg.color}22`, border:`1px solid ${pkg.color}44`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>
                {pkg.icon}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{pkg.title}</div>
                <div style={{ fontSize:11, color:C.textSub, lineHeight:1.4 }}>{pkg.desc}</div>
              </div>
              <div style={{ fontSize:15, fontWeight:800, color:pkg.color, flexShrink:0 }}>{pkg.price}</div>
            </div>
            <button style={{ width:"100%", border:"none", borderRadius:10,
              padding:"10px", fontSize:12, fontWeight:700, cursor:"pointer",
              background:pkg.best?`linear-gradient(135deg,${C.red},${C.redDark})`:`${pkg.color}22`,
              color:pkg.best?C.white:pkg.color }}>
              {pkg.title} — {pkg.price} Satın Al
            </button>
          </div>
        ))}
      </div>

      <div style={{ padding:"12px 18px 28px", borderTop:`1px solid ${C.border}` }}>
        <button onClick={onBack} style={{ width:"100%", background:"none",
          border:`1.5px solid ${C.border}`, borderRadius:13, padding:"13px",
          fontSize:13, color:C.textSub, cursor:"pointer", fontWeight:600 }}>
          Şimdilik atla, etkinliklere dön
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.white }}>
      <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        padding:"20px 20px 24px" }}>
        <button onClick={onBack} style={{ background:"none", border:"none",
          color:"rgba(255,255,255,0.75)", fontSize:13, fontWeight:700,
          cursor:"pointer", marginBottom:14, display:"flex", alignItems:"center", gap:6 }}>
          ← Geri
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:42, height:42, borderRadius:12,
            background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.3)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🎉</div>
          <div>
            <div style={{ fontSize:18, fontWeight:700, color:C.white }}>Etkinlik Ekle</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)" }}>
              Türk topluluğuyla paylaşın
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"20px" }}>
        {[
          { key:"title", label:"Etkinlik Adı *", placeholder:"Türk Film Festivali" },
          { key:"org",   label:"Organizatör *",  placeholder:"Dernek / Kurum adı"  },
        ].map(f=>(
          <div key={f.key} style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
              letterSpacing:0.5, marginBottom:6 }}>{f.label}</div>
            <input value={form[f.key]} onChange={e=>set(f.key,e.target.value)}
              placeholder={f.placeholder}
              style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
                borderRadius:11, border:`1.5px solid ${C.border}`,
                background:C.redPale, fontSize:14, color:C.text, outline:"none" }}/>
          </div>
        ))}

        {/* Tarih */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>Tarih *</div>
          <input type="date" value={form.date} onChange={e=>set("date",e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
              borderRadius:11, border:`1.5px solid ${C.border}`,
              background:C.redPale, fontSize:14, color:C.text, outline:"none" }}/>
        </div>

        {/* Mekan */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>Mekan / Adres *</div>
          <input value={form.location} onChange={e=>set("location",e.target.value)}
            placeholder="örn. 143 Atlantic Ave, Brooklyn"
            style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
              borderRadius:11, border:`1.5px solid ${C.border}`,
              background:C.redPale, fontSize:14, color:C.text, outline:"none" }}/>
        </div>

        {/* Eyalet */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>Eyalet</div>
          <select value={form.state} onChange={e=>set("state",e.target.value)}
            style={{ width:"100%", padding:"11px 14px", borderRadius:11,
              border:`1.5px solid ${C.border}`, background:C.redPale,
              fontSize:14, color:form.state?C.text:C.textMute, outline:"none" }}>
            <option value="">Seçin...</option>
            {US_STATES.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {/* Fotoğraf */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>Etkinlik Fotoğrafı</div>
          {form.image ? (
            <div style={{ position:"relative" }}>
              <img src={URL.createObjectURL(form.image)} alt="etkinlik"
                style={{ width:"100%", height:160, objectFit:"cover",
                  borderRadius:11, border:`1.5px solid ${C.border}` }}/>
              <div onClick={()=>set("image",null)}
                style={{ position:"absolute", top:8, right:8,
                  background:"rgba(0,0,0,0.6)", borderRadius:"50%",
                  width:28, height:28, display:"flex", alignItems:"center",
                  justifyContent:"center", cursor:"pointer", color:"white", fontSize:14 }}>✕</div>
            </div>
          ) : (
            <label style={{ display:"flex", flexDirection:"column", alignItems:"center",
              justifyContent:"center", gap:8, padding:"24px",
              border:`2px dashed ${C.border}`, borderRadius:11,
              background:C.redPale, cursor:"pointer" }}>
              <span style={{ fontSize:32 }}>📷</span>
              <span style={{ fontSize:12, color:C.textSub, fontWeight:600 }}>Fotoğraf Seç</span>
              <span style={{ fontSize:10, color:C.textMute }}>JPG, PNG — max 5MB</span>
              <input type="file" accept="image/*" style={{ display:"none" }}
                onChange={e=>{ if(e.target.files[0]) set("image", e.target.files[0]); }}/>
            </label>
          )}
        </div>
        {/* Zip Code */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>Zip Code</div>
          <input value={form.zip} onChange={e=>set("zip",e.target.value)}
            placeholder="örn. 10001"
            maxLength={10}
            style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
              borderRadius:11, border:`1.5px solid ${C.border}`,
              background:C.redPale, fontSize:14, color:C.text, outline:"none" }}/>
        </div>

        {/* Kategori */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:8 }}>Kategori</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {catOpts.map(c=>(
              <div key={c} onClick={()=>set("cat",c)} style={{ padding:"6px 12px",
                borderRadius:20, fontSize:11, fontWeight:700, cursor:"pointer",
                background: form.cat===c ? C.red : C.redPale,
                border:`1px solid ${form.cat===c ? C.red : C.border}`,
                color: form.cat===c ? C.white : C.textSub }}>{c}</div>
            ))}
          </div>
        </div>

        {/* Ücretsiz / Ücretli toggle */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:8 }}>Giriş Ücreti</div>
          <div style={{ display:"flex", gap:8 }}>
            {[{v:true,l:"Ücretsiz"},{v:false,l:"Ücretli"}].map(o=>(
              <div key={String(o.v)} onClick={()=>set("free",o.v)} style={{ flex:1,
                padding:"10px", borderRadius:11, textAlign:"center",
                fontSize:12, fontWeight:700, cursor:"pointer",
                background: form.free===o.v ? C.red : C.redPale,
                border:`1px solid ${form.free===o.v ? C.red : C.border}`,
                color: form.free===o.v ? C.white : C.textSub }}>{o.l}</div>
            ))}
          </div>
          {!form.free && (
            <input value={form.price} onChange={e=>set("price",e.target.value)}
              placeholder="örn. $25" style={{ marginTop:8, width:"100%",
                boxSizing:"border-box", padding:"11px 14px", borderRadius:11,
                border:`1.5px solid ${C.border}`, background:C.redPale,
                fontSize:14, color:C.text, outline:"none" }}/>
          )}
        </div>

        {/* Açıklama */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textSub,
            letterSpacing:0.5, marginBottom:6 }}>Etkinlik Açıklaması</div>
          <textarea value={form.description} onChange={e=>set("description",e.target.value)}
            placeholder="Etkinlik hakkında detaylı bilgi verin..."
            rows={4}
            style={{ width:"100%", boxSizing:"border-box", padding:"11px 14px",
              borderRadius:11, border:`1.5px solid ${C.border}`,
              background:C.redPale, fontSize:14, color:C.text,
              outline:"none", resize:"vertical", fontFamily:"system-ui", lineHeight:1.6 }}/>
        </div>
      </div>

      <div style={{ padding:"12px 20px 32px", background:C.white,
        borderTop:`1px solid ${C.border}` }}>
        <button onClick={async()=>{ if(!canSubmit) return;
  const { data: { user } } = await supabase.auth.getUser();
  let imageUrl = null;
  if (form.image) {
    const ext = form.image.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('events')
      .upload(fileName, form.image, { contentType: form.image.type });
    console.log("Upload data:", uploadData);
console.log("Upload error:", JSON.stringify(uploadError));
    if (uploadData) {
      const { data: urlData } = supabase.storage.from('events').getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }
  }
  await supabase.from("events").insert({
    title: form.title,
    org: form.org,
    date: form.date,
    location: form.location,
    state: form.state,
    zip: form.zip,
    category: form.cat,
    description: form.description,
    free: form.free,
    price: form.price,
    image_url: imageUrl,
    owner_id: user?.id || null,
  });
  setSubmitted(true);
  onSuccess && onSuccess({...form, imageUrl, image_url: imageUrl});
}} style={{ width:"100%",
          border:"none", borderRadius:13, padding:"14px", fontSize:14, fontWeight:700,
          cursor:canSubmit?"pointer":"default",
          background: canSubmit
            ? `linear-gradient(135deg,${C.red},${C.redDark})`
            : "#D4DCEE",
          color: canSubmit ? C.white : C.textMute }}>
          🎉 Etkinliği Ekle
        </button>
      </div>
    </div>
  );
}

function BusinessOwnerProfile({ business, onBack, reviews, onEdit, onUpdate }) {
  const bizReviews = reviews.filter(r=>r.bizId===business.id);
  const avgRating = bizReviews.length
    ? (bizReviews.reduce((s,r)=>s+r.stars,0)/bizReviews.length).toFixed(1)
    : business.rating;

    const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: business.name||"",
    phone: business.phone||"",
    address: business.address||"",
    desc: business.desc||business.description||"",
    hours: business.hours || DAYS.map(d=>({ day:d, open:true, from:"09:00", to:"18:00" })),
  });

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.bgSoft }}>
      <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        padding:"20px 20px 28px" }}>
        <button onClick={onBack} style={{ background:"none", border:"none",
          color:"rgba(255,255,255,0.75)", fontSize:13, fontWeight:700,
          cursor:"pointer", marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
          ← Geri
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div onClick={()=>{ if(business.image_url) setPhotoView(business.image_url); }}
              style={{ width:58, height:58, borderRadius:16, flexShrink:0,
              background:"rgba(255,255,255,0.2)", border:"2px solid rgba(255,255,255,0.4)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:28,
              overflow:"hidden", cursor:business.image_url?"zoom-in":"default" }}>
              {business.image_url
                ? <img src={business.image_url} alt={business.name}
                    style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                : business.img}
            </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ fontSize:18, fontWeight:700, color:C.white }}>{business.name}</div>
              {business.onaylı && (
                <span style={{ background:"linear-gradient(135deg,#F59E0B,#D97706)",
                  borderRadius:6, padding:"2px 8px", fontSize:9, fontWeight:700, color:C.white }}>
                  ✅ONAYLANMIŞ
                </span>
              )}
            </div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", marginTop:3 }}>
              📍 {business.city}, {business.state}
            </div>
          </div>
          <div onClick={()=>setEditing(e=>!e)} style={{ background:"rgba(255,255,255,0.18)",
            border:"1px solid rgba(255,255,255,0.3)", borderRadius:9,
            padding:"7px 12px", fontSize:11, fontWeight:700,
            color:C.white, cursor:"pointer" }}>{editing?"İptal":"Düzenle"}</div>
        </div>
      </div>

      {/* İstatistikler */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`,
        display:"flex", marginBottom:1 }}>
        {[
          { n:avgRating, l:"Ortalama Puan", icon:"✅" },
          { n:business.reviews + bizReviews.length, l:"Toplam Yorum", icon:"💬" },
          { n:"—", l:"Bu Ay Görüntülenme", icon:"👁" },
        ].map((s,i,arr)=>(
          <div key={s.l} style={{ flex:1, padding:"14px 8px", textAlign:"center",
            borderRight: i<arr.length-1?`1px solid ${C.border}`:"none" }}>
            <div style={{ fontSize:9, marginBottom:3 }}>{s.icon}</div>
            <div style={{ fontSize:16, fontWeight:800, color:C.red }}>{s.n}</div>
            <div style={{ fontSize:9, color:C.textMute, fontWeight:600, lineHeight:1.3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"16px 18px" }}>

        {editing && (
          <div style={{ background:C.white, border:`1px solid ${C.border}`,
            borderRadius:16, padding:"16px", marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.textMute,
              letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>BİLGİLERİ GÜNCELLE</div>
            {[
              { key:"name", label:"İşletme Adı", placeholder:"İşletme adı" },
              { key:"phone", label:"Telefon", placeholder:"+1 (555) 000-0000" },
              { key:"address", label:"Adres", placeholder:"Adres" },
            ].map(f=>(
              <div key={f.key} style={{ marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.textSub, marginBottom:4 }}>{f.label}</div>
                <input value={editForm[f.key]} onChange={e=>setEditForm(p=>({...p,[f.key]:e.target.value}))}
                  placeholder={f.placeholder}
                  style={{ width:"100%", boxSizing:"border-box", padding:"10px 12px",
                    borderRadius:10, border:`1.5px solid ${C.border}`,
                    background:C.redPale, fontSize:13, color:C.text, outline:"none" }}/>
              </div>
            ))}
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.textSub, marginBottom:4 }}>Açıklama</div>
              <textarea value={editForm.desc} onChange={e=>setEditForm(p=>({...p,desc:e.target.value}))}
                rows={3} style={{ width:"100%", boxSizing:"border-box", padding:"10px 12px",
                  borderRadius:10, border:`1.5px solid ${C.border}`,
                  background:C.redPale, fontSize:13, color:C.text, outline:"none", resize:"vertical" }}/>
            </div>
            {/* Çalışma Saatleri */}
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.textSub, marginBottom:8 }}>Çalışma Saatleri</div>
              {editForm.hours.map((h,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <div style={{ width:32, fontSize:10, fontWeight:700, color:C.textSub }}>{h.day?.slice(0,3)||DAYS[i]?.slice(0,3)}</div>
                  <div onClick={()=>setEditForm(p=>({ ...p, hours: p.hours.map((x,j)=>j===i?{...x,open:!x.open}:x) }))}
                    style={{ width:36, height:20, borderRadius:10, cursor:"pointer",
                      background: h.open ? C.red : "#E5E7EB", position:"relative", transition:"all 0.2s" }}>
                    <div style={{ width:16, height:16, borderRadius:"50%", background:C.white,
                      position:"absolute", top:2, left: h.open ? 18 : 2, transition:"all 0.2s" }}/>
                  </div>
                  {h.open && <>
                    <input type="time" value={h.from} onChange={e=>setEditForm(p=>({ ...p, hours: p.hours.map((x,j)=>j===i?{...x,from:e.target.value}:x) }))}
                      style={{ padding:"3px 6px", borderRadius:6, border:`1px solid ${C.border}`, fontSize:11 }}/>
                    <span style={{ fontSize:10, color:C.textMute }}>—</span>
                    <input type="time" value={h.to} onChange={e=>setEditForm(p=>({ ...p, hours: p.hours.map((x,j)=>j===i?{...x,to:e.target.value}:x) }))}
                      style={{ padding:"3px 6px", borderRadius:6, border:`1px solid ${C.border}`, fontSize:11 }}/>
                  </>}
                  {!h.open && <span style={{ fontSize:11, color:C.textMute }}>Kapalı</span>}
                </div>
              ))}
            </div>

            <button onClick={async()=>{
              await supabase.from("businesses").update({
                name: editForm.name,
                phone: editForm.phone,
                address: editForm.address,
                description: editForm.desc,
                hours: editForm.hours,
              }).eq("id", business.id);
              setEditing(false);
              alert("Bilgiler güncellendi!");
            }} style={{ width:"100%", border:"none", borderRadius:11, padding:"12px",
              fontSize:13, fontWeight:700, cursor:"pointer",
              background:`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white }}>
              Kaydet ✓
            </button>
          </div>
        )}
      
        <div style={{ background:C.white, border:`1px solid ${C.border}`,
          borderRadius:16, overflow:"hidden", marginBottom:14 }}>
          <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`,
            fontSize:10, fontWeight:700, color:C.textMute, letterSpacing:1.5,
            textTransform:"uppercase" }}>İŞLETME BİLGİLERİ</div>
          {[
            { icon:"📞", label:"Telefon",  val:business.phone   },
            { icon:"📍", label:"Adres",    val:business.address },
            { icon:"📝", label:"Açıklama", val:business.desc    },
          ].map((row,i,arr)=>(
            <div key={row.label} style={{ display:"flex", gap:12, padding:"12px 16px",
              borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none",
              alignItems:"flex-start" }}>
              <span style={{ fontSize:15, marginTop:1 }}>{row.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:10, color:C.textMute, fontWeight:600, marginBottom:2 }}>
                  {row.label}
                </div>
                <div style={{ fontSize:13, color:C.text, lineHeight:1.5 }}>{row.val||"—"}</div>
              </div>
            </div>
          ))}
        </div>

        {/* onaylı yükseltme kartı */}
        {!business.onaylı && (
          <div style={{ background:`linear-gradient(135deg,#FEF3C7,#FDE68A)`,
            border:"1.5px solid #F59E0B", borderRadius:16, padding:"16px",
            marginBottom:14 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#92400E", marginBottom:12 }}>
              ✅ Onaylanmış Firmaya Geç — $9.99/ay
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:14 }}>
              {/* Ücretsiz */}
              <div style={{ flex:1, background:"rgba(255,255,255,0.5)",
                borderRadius:12, padding:"12px 10px" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#92400E",
                  marginBottom:8, textAlign:"center" }}>Ücretsiz</div>
                {[
                  ["✅","Temel listeleme"],
                  ["✅","Telefon & adres"],
                  ["❌","Fotoğraf galerisi"],
                  ["❌","Arama'da üst sıra"],
                  ["❌","İstatistikler"],
                  ["❌","Bildirim gönderme"],
                ].map(([ic,tx])=>(
                  <div key={tx} style={{ fontSize:10, color:"#78350F",
                    marginBottom:4, display:"flex", gap:4, alignItems:"center" }}>
                    <span>{ic}</span><span>{tx}</span>
                  </div>
                ))}
              </div>
              {/* onaylı */}
              <div style={{ flex:1, background:"linear-gradient(135deg,#F59E0B22,#D9770622)",
                border:"1.5px solid #F59E0B", borderRadius:12, padding:"12px 10px" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#92400E",
                  marginBottom:8, textAlign:"center" }}>✅ onaylı</div>
                {[
                  ["✅","Temel listeleme"],
                  ["✅","Telefon & adres"],
                  ["✅","Fotoğraf galerisi"],
                  ["✅","Arama'da üst sıra"],
                  ["✅","İstatistikler"],
                  ["✅","Bildirim gönderme"],
                ].map(([ic,tx])=>(
                  <div key={tx} style={{ fontSize:10, color:"#78350F",
                    marginBottom:4, display:"flex", gap:4, alignItems:"center",
                    fontWeight:600 }}>
                    <span>{ic}</span><span>{tx}</span>
                  </div>
                ))}
              </div>
            </div>
            <button style={{ width:"100%", border:"none", borderRadius:11,
              padding:"11px", fontSize:13, fontWeight:700, cursor:"pointer",
              background:"linear-gradient(135deg,#F59E0B,#D97706)", color:C.white }}>
              $9.99/ay veya $99.99/yıl — Onaylanmış Firmaya Geç 🚀 🚀
            </button>
          </div>
        )}

        {/* Son yorumlar */}
        <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
          letterSpacing:1.5, textTransform:"uppercase", marginBottom:10 }}>
          SON YORUMLAR ({bizReviews.length})
        </div>
        {bizReviews.length===0 ? (
          <div style={{ textAlign:"center", padding:"20px 0",
            fontSize:13, color:C.textMute }}>Henüz yorum yok</div>
        ) : bizReviews.slice(0,3).map((r,i)=>(
          <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`,
            borderRadius:14, padding:"12px 14px", marginBottom:8 }}>
            <div style={{ display:"flex", justifyContent:"space-between",
              alignItems:"center", marginBottom:6 }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.text }}>{r.user}</div>
              <div style={{ display:"flex", gap:2 }}>
                {[1,2,3,4,5].map(s=>(
                  <span key={s} style={{ fontSize:12, color:s<=r.stars?C.gold:"#EECDD0" }}>★</span>
                ))}
              </div>
            </div>
            {r.text && <div style={{ fontSize:12, color:C.text, lineHeight:1.5 }}>{r.text}</div>}
            <div style={{ fontSize:10, color:C.textMute, marginTop:4 }}>{r.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsScreen({ onBack, notifications, onMarkRead, onNavigate }) {
  const unread = notifications.filter(n=>!n.read).length;
  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.bgSoft }}>
      <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`, padding:"20px 20px 24px" }}>
        <button onClick={onBack} style={{ background:"none", border:"none",
          color:"rgba(255,255,255,0.75)", fontSize:13, fontWeight:700,
          cursor:"pointer", marginBottom:14, display:"flex", alignItems:"center", gap:6 }}>
          ← Geri
        </button>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:18, fontWeight:700, color:C.white }}>Bildirimler</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)" }}>
              {unread>0 ? `${unread} okunmamış bildirim` : "Tüm bildirimler okundu"}
            </div>
          </div>
          {unread>0 && (
            <div onClick={onMarkRead} style={{ background:"rgba(255,255,255,0.18)",
              border:"1px solid rgba(255,255,255,0.3)", borderRadius:9,
              padding:"6px 12px", fontSize:11, fontWeight:700, color:C.white, cursor:"pointer" }}>
              Tümünü Oku
            </div>
          )}
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto" }}>
        {notifications.length===0 ? (
          <div style={{ textAlign:"center", paddingTop:60 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔔</div>
            <div style={{ fontSize:15, fontWeight:600, color:C.textSub }}>Henüz bildirim yok</div>
            <div style={{ fontSize:13, color:C.textMute, marginTop:6 }}>İşletme güncellemeleri burada görünecek</div>
          </div>
        ) : notifications.map((n,i)=>(
          <div key={i} onClick={()=>onNavigate&&onNavigate(n)} style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}`,
            background:n.read?C.white:C.redLight, display:"flex", gap:12, alignItems:"flex-start", cursor:"pointer" }}>
            <div style={{ width:42, height:42, borderRadius:12, flexShrink:0,
              background:n.read?`linear-gradient(135deg,${C.redPale},#FFF5F6)`:`linear-gradient(135deg,${C.red},${C.redDark})`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>
              {n.icon}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:n.read?500:700, color:C.text, marginBottom:3, lineHeight:1.4 }}>{n.title}</div>
              <div style={{ fontSize:11, color:C.textMute }}>{n.body}</div>
              <div style={{ fontSize:10, color:C.textMute, marginTop:4 }}>{n.time}</div>
            </div>
            {!n.read && <div style={{ width:8, height:8, borderRadius:"50%", background:C.red, flexShrink:0, marginTop:6 }}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

function LocationModal({ currentState, currentCity, onSave, onClose }) {
  const [selState, setSelState] = useState(currentState||"");
  const [selCity,  setSelCity]  = useState(currentCity||"");
  const [stateQ,   setStateQ]   = useState("");
  const [step,     setStep]     = useState(currentState?"city":"state"); // state | city

  const filteredStates = US_STATES.filter(s=>s.toLowerCase().includes(stateQ.trim().toLowerCase()));
  const citySuggestions = STATE_CITIES[selState] || [];

  return (
    <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0,
      background:"rgba(0,0,0,0.5)", zIndex:200,
      display:"flex", alignItems:"flex-end", justifyContent:"center" }}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()}
        style={{ background:C.white, borderRadius:"20px 20px 0 0",
          width:"100%", maxWidth:430, maxHeight:"85vh",
          display:"flex", flexDirection:"column" }}>

        {/* Handle */}
        <div style={{ width:36, height:4, borderRadius:2, background:C.border,
          margin:"14px auto 0" }}/>

        {/* Header */}
        <div style={{ padding:"16px 20px 12px",
          borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ fontSize:16, fontWeight:700, color:C.text }}>
              Eyalet Seç
            </div>
            <div onClick={onClose} style={{ fontSize:20, color:C.textMute, cursor:"pointer" }}>✕</div>
          </div>
          {/* Step indicator */}
          <div style={{ display:"flex", gap:6, marginTop:10 }}>
            {["state"].map((s,i)=>(
              <div key={s}
                style={{ display:"flex", alignItems:"center", gap:6,
                  padding:"5px 12px", borderRadius:20,
                  background:C.red, border:`1px solid ${C.red}` }}>
                <span style={{ fontSize:11, fontWeight:700, color:C.white }}>
                  Eyalet
                </span>
                {selState&&<span style={{ fontSize:10, color:C.white, fontWeight:700 }}>{selState}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", padding:"14px 20px" }}>
          {step==="state" && (
            <>
              <div style={{ display:"flex", alignItems:"center", gap:10,
                background:C.redPale, border:`1.5px solid ${C.border}`,
                borderRadius:12, padding:"10px 14px", marginBottom:12 }}>
                <span style={{ color:C.red }}>🔍</span>
                <input value={stateQ} onChange={e=>setStateQ(e.target.value)}
                  placeholder="Eyalet ara..." autoFocus
                  style={{ background:"none", border:"none", outline:"none",
                    fontSize:13, color:C.text, flex:1 }}/>
                {stateQ&&<span onClick={()=>setStateQ("")} style={{ color:C.textMute, cursor:"pointer" }}>✕</span>}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {filteredStates.map(st=>(
                  <div key={st} onClick={()=>{ setSelState(st); setSelCity(""); setStep("city"); }}
                    style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"12px 14px", borderRadius:11, cursor:"pointer",
                      background:selState===st?C.red:C.redPale,
                      border:`1.5px solid ${selState===st?C.redDark:C.border}` }}>
                    <span style={{ fontSize:13, fontWeight:selState===st?700:400,
                      color:selState===st?C.white:C.text }}>{st}</span>
                    {selState===st && <span style={{ color:C.white }}>✓</span>}
                  </div>
                ))}
              </div>
            </>
          )}

          {step==="city" && (
            <>
              <div style={{ background:C.redLight, borderRadius:11, padding:"10px 14px",
                marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                <span>📍</span>
                <span style={{ fontSize:12, color:C.text }}>
                  Eyalet: <strong style={{ color:C.red }}>{selState}</strong>
                  <span onClick={()=>setStep("state")}
                    style={{ marginLeft:8, fontSize:11, color:C.textMute,
                      cursor:"pointer", textDecoration:"underline" }}>değiştir</span>
                </span>
              </div>
              {/* Şehir önerileri */}
              {citySuggestions.length>0 && (
                <>
                  <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
                    letterSpacing:1.5, textTransform:"uppercase", marginBottom:10 }}>
                    {selState.toUpperCase()} ŞEHİRLERİ
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:16 }}>
                    {citySuggestions.map(c=>(
                      <div key={c} onClick={()=>setSelCity(c)}
                        style={{ padding:"8px 16px", borderRadius:20, fontSize:12,
                          fontWeight:600, cursor:"pointer",
                          background:selCity===c?C.red:C.redPale,
                          border:`1px solid ${selCity===c?C.red:C.border}`,
                          color:selCity===c?C.white:C.textSub }}>
                        {c}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {/* Serbest yazma */}
              <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
                letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>
                VEYA YAZIN
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10,
                background:C.redPale, border:`1.5px solid ${selCity&&!citySuggestions.includes(selCity)?C.red:C.border}`,
                borderRadius:12, padding:"10px 14px" }}>
                <span style={{ color:C.red }}>🏙️</span>
                <input value={selCity} onChange={e=>setSelCity(e.target.value)}
                  placeholder="Şehir adı girin..."
                  style={{ background:"none", border:"none", outline:"none",
                    fontSize:13, color:C.text, flex:1 }}/>
                {selCity&&<span onClick={()=>setSelCity("")}
                  style={{ color:C.textMute, cursor:"pointer" }}>✕</span>}
              </div>
            </>
          )}
        </div>

        {/* Footer buton */}
        <div style={{ padding:"12px 20px 32px",
          borderTop:`1px solid ${C.border}` }}>
          <button onClick={()=>onSave(selState, selCity)}
            style={{ width:"100%", border:"none", borderRadius:13,
              padding:"13px", fontSize:14, fontWeight:700, cursor:"pointer",
              background:selState?`linear-gradient(135deg,${C.red},${C.redDark})`:"#D4DCEE",
              color:selState?C.white:C.textMute }}>
            {selState ? `${selCity||selState} — Kaydet ✓` : "Eyalet seçin"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SearchOverlay({ history, onSelect, onClear, onClose }) {
  const suggestions = [
    {icon:"🍽️",label:"Restoran"},{icon:"⚖️",label:"Avukat"},
    {icon:"🏥",label:"Doktor"},{icon:"🔨",label:"Usta"},
    {icon:"💇",label:"Güzellik"},{icon:"📊",label:"Muhasebe"},
    {icon:"🏠",label:"Emlak"},{icon:"🛒",label:"Market"},
  ];
  return (
    <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0,
      background:"rgba(15,25,35,0.4)", zIndex:100 }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()}
        style={{ background:C.white, borderRadius:"0 0 20px 20px",
          boxShadow:"0 8px 32px rgba(0,0,0,0.15)" }}>
        {history.length>0 && (
          <div style={{ padding:"14px 18px 6px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.textMute, letterSpacing:1.5, textTransform:"uppercase" }}>Son Aramalar</div>
              <div onClick={onClear} style={{ fontSize:11, color:C.red, fontWeight:700, cursor:"pointer" }}>Temizle</div>
            </div>
            {history.slice(0,4).map((h,i)=>(
              <div key={i} onClick={()=>onSelect(h)}
                style={{ display:"flex", alignItems:"center", gap:10,
                  padding:"9px 0", borderBottom:`1px solid ${C.border}`, cursor:"pointer" }}>
                <span style={{ color:C.textMute, fontSize:14 }}>🕐</span>
                <span style={{ fontSize:13, color:C.text, flex:1 }}>{h}</span>
                <span style={{ color:C.textMute, fontSize:12 }}>→</span>
              </div>
            ))}
          </div>
        )}
              </div>
    </div>
  );
}

function UserProfilePage({ user, reviews, onBack }) {
  const userReviews = reviews.filter(r=>r.user===user.name);
  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.bgSoft, width:"100%" }}>
      <div style={{ background:`linear-gradient(135deg,${C.red},${C.redDark})`,
        padding:"20px 20px 32px" }}>
        <button onClick={onBack} style={{ background:"none", border:"none",
          color:"rgba(255,255,255,0.75)", fontSize:13, fontWeight:700,
          cursor:"pointer", marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
          ← Geri
        </button>
        <div style={{ textAlign:"center" }}>
          <div style={{ width:64, height:64, borderRadius:"50%", margin:"0 auto 12px",
            background:"rgba(255,255,255,0.2)", border:"3px solid rgba(255,255,255,0.5)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:30 }}>
            {user.avatar||"👤"}
          </div>
          <div style={{ fontSize:18, fontWeight:700, color:C.white }}>{user.name}</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)", marginTop:4 }}>
            Topluluk Üyesi
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:24, marginTop:14 }}>
            {[{n:userReviews.length,l:"Yorum"},{n:user.helpfulCount||0,l:"Faydalı"}].map(s=>(
              <div key={s.l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:18, fontWeight:800, color:C.white }}>{s.n}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.65)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"18px" }}>
        <div style={{ fontSize:10, fontWeight:700, color:C.textMute,
          letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>
          YORUMLAR ({userReviews.length})
        </div>
        {userReviews.length===0 ? (
          <div style={{ textAlign:"center", padding:"32px 0" }}>
            <div style={{ fontSize:32, marginBottom:8 }}>💬</div>
            <div style={{ fontSize:13, color:C.textMute }}>Henüz yorum yok</div>
          </div>
        ) : userReviews.map((r,i)=>{
          const biz = businesses.find(b=>b.id===r.bizId);
          return (
            <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`,
              borderRadius:14, padding:"13px 16px", marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                <div style={{ width:32, height:32, borderRadius:9, flexShrink:0,
                  background:`linear-gradient(135deg,${C.redPale},#FFF5F6)`,
                  border:`1px solid ${C.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
                  {biz?.img||"🏢"}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:C.text }}>{biz?.name||"İşletme"}</div>
                  <div style={{ fontSize:10, color:C.textMute }}>📍 {biz?.city}</div>
                </div>
                <div style={{ display:"flex", gap:2 }}>
                  {[1,2,3,4,5].map(s=>(
                    <span key={s} style={{ fontSize:11, color:s<=r.stars?"#F59E0B":"#EECDD0" }}>★</span>
                  ))}
                </div>
              </div>
              {r.text && <div style={{ fontSize:12, color:C.text, lineHeight:1.5 }}>{r.text}</div>}
              <div style={{ fontSize:10, color:C.textMute, marginTop:6 }}>{r.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PhotoModal({ url, onClose }) {
  if (!url) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", top:0, left:0, right:0, bottom:0,
      background:"rgba(0,0,0,0.9)", zIndex:500,
      display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ position:"relative", maxWidth:430, width:"100%" }}>
        <img src={url} alt="" style={{ width:"100%", borderRadius:16, objectFit:"contain", maxHeight:"80vh" }}/>
        <div onClick={onClose} style={{ position:"absolute", top:-16, right:-16,
          width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.2)",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", fontSize:18, color:"white" }}>✕</div>
      </div>
    </div>
  );
}

function ReportModal({ type, onClose }) {
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const reasons = type==="business"
    ? ["Yanlış bilgi","Kapanmış işletme","Spam / Reklam","Uygunsuz içerik","Diğer"]
    : ["Hakaret / Küfür","Spam","Sahte yorum","Alakasız","Diğer"];

  if (submitted) return (
    <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0,
      background:"rgba(0,0,0,0.5)", zIndex:200, display:"flex",
      alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ background:C.white, borderRadius:20, padding:28,
        textAlign:"center", maxWidth:340, width:"100%" }}>
        <div style={{ fontSize:40, marginBottom:12 }}>✅</div>
        <div style={{ fontSize:16, fontWeight:700, color:C.text, marginBottom:8 }}>Raporunuz Alındı</div>
        <div style={{ fontSize:13, color:C.textSub, marginBottom:20, lineHeight:1.6 }}>
          Ekibimiz en kısa sürede inceleyecek. Teşekkürler.
        </div>
        <button onClick={onClose} style={{ width:"100%", border:"none", borderRadius:12,
          padding:"12px", fontSize:13, fontWeight:700, cursor:"pointer",
          background:`linear-gradient(135deg,${C.red},${C.redDark})`, color:C.white }}>Kapat</button>
      </div>
    </div>
  );

  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0,
      background:"rgba(0,0,0,0.5)", zIndex:200,
      display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()}
        style={{ background:C.white, borderRadius:"20px 20px 0 0",
          padding:"24px 20px 36px", width:"100%", maxWidth:430 }}>
        <div style={{ width:36, height:4, borderRadius:2, background:C.border, margin:"0 auto 20px" }}/>
        <div style={{ fontSize:16, fontWeight:700, color:C.text, marginBottom:4 }}>
          {type==="business"?"İşletmeyi Raporla":"Yorumu Raporla"}
        </div>
        <div style={{ fontSize:12, color:C.textMute, marginBottom:18 }}>Neden şikayet ediyorsunuz?</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
          {reasons.map(r=>(
            <div key={r} onClick={()=>setReason(r)}
              style={{ display:"flex", alignItems:"center", gap:12,
                padding:"12px 14px", borderRadius:12, cursor:"pointer",
                border:`1.5px solid ${reason===r?C.red:C.border}`,
                background:reason===r?C.redLight:C.white }}>
              <div style={{ width:18, height:18, borderRadius:"50%",
                border:`2px solid ${reason===r?C.red:C.border}`,
                background:reason===r?C.red:"transparent",
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {reason===r&&<div style={{ width:7, height:7, borderRadius:"50%", background:C.white }}/>}
              </div>
              <span style={{ fontSize:13, color:reason===r?C.red:C.text, fontWeight:reason===r?700:500 }}>{r}</span>
            </div>
          ))}
        </div>
        <button onClick={()=>reason&&setSubmitted(true)}
          style={{ width:"100%", border:"none", borderRadius:12, padding:"13px",
            fontSize:14, fontWeight:700, cursor:reason?"pointer":"default",
            background:reason?`linear-gradient(135deg,${C.red},${C.redDark})`:"#D4DCEE",
            color:reason?C.white:C.textMute }}>
          Raporla
        </button>
      </div>
    </div>
  );
}

function AdminPanel({ onBack, pendingBiz }) {
  const [tab, setTab]   = useState("pending");
  const [items, setItems] = useState(pendingBiz);
  const [removeReqs, setRemoveReqs] = useState([]);

  useEffect(() => {
    const fetchRemoval = async () => {
      const { data } = await supabase.from("removal_requests").select("*");
      if (data) setRemoveReqs(data.map(r=>({
        id: r.id,
        bizId: r.business_id,
        name: r.business_name,
        reason: r.reason,
        date: new Date(r.created_at).toLocaleDateString("tr-TR"),
      })));
    };
    fetchRemoval();
  }, []);
  const approve = async id => {
    await supabase.from("businesses").update({ verified: true, status:"approved" }).eq("id", id);
    setItems(p=>p.map(x=>x.id===id?{...x,status:"approved",verified:true}:x));
  };
  const reject = async id => {
    await supabase.from("businesses").update({ verified: false, status:"rejected" }).eq("id", id);
    setItems(p=>p.map(x=>x.id===id?{...x,status:"rejected",verified:false}:x));
  };
  const removeApprove = async id => {
    await supabase.from("businesses").delete().eq("id", id);
    setRemoveReqs(p=>p.filter(x=>x.id!==id));
    setItems(p=>p.filter(x=>x.id!==id));
  };
  const pending  = items.filter(x=>!x.status && x.verified!==true);
  const approved = items.filter(x=>x.status==="approved" || x.verified===true);
  const rejected = items.filter(x=>x.status==="rejected");
  const listMap  = {pending, approved, rejected};
  const current  = listMap[tab]||pending;

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:C.bgSoft }}>
      <div style={{ background:"linear-gradient(135deg,#0D1F3C,#060F1E)", padding:"20px 20px 24px" }}>
        <button onClick={onBack} style={{ background:"none", border:"none",
          color:"rgba(255,255,255,0.7)", fontSize:13, fontWeight:700,
          cursor:"pointer", marginBottom:14, display:"flex", alignItems:"center", gap:6 }}>← Çıkış</button>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
          <div style={{ width:42, height:42, borderRadius:12,
            background:"rgba(255,255,255,0.15)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🛡️</div>
          <div>
            <div style={{ fontSize:18, fontWeight:700, color:C.white }}>Admin Paneli</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)" }}>Pusula Yönetim</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {[
            {n:items.length,       l:"Toplam",    icon:"📋"},
            {n:pending.length,     l:"Bekleyen",  icon:"⏳"},
            {n:approved.length,    l:"Onaylı",    icon:"✅"},
            {n:removeReqs.length,  l:"Kaldırma",  icon:"🗑️"},
          ].map(s=>(
            <div key={s.l} style={{ flex:1, background:"rgba(255,255,255,0.08)",
              borderRadius:12, padding:"10px 6px", textAlign:"center" }}>
              <div style={{ fontSize:12, marginBottom:3 }}>{s.icon}</div>
              <div style={{ fontSize:16, fontWeight:800, color:C.white }}>{s.n}</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.55)", fontWeight:600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, display:"flex" }}>
        {[
          {id:"pending",  label:`Bekleyen (${pending.length})`},
          {id:"approved", label:`Onaylı (${approved.length})`},
          {id:"rejected", label:`Reddedilen (${rejected.length})`},
          {id:"remove",   label:`🗑️ Kaldırma (${removeReqs.length})`},
        ].map(t=>(
          <div key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1,
            padding:"12px 2px", textAlign:"center", fontSize:10, fontWeight:700,
            cursor:"pointer", color:tab===t.id?"#0D1F3C":C.textMute,
            borderBottom:tab===t.id?"2.5px solid #0D1F3C":"2.5px solid transparent" }}>
            {t.label}
          </div>
        ))}
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"14px 18px" }}>
        {/* Kaldırma talepleri */}
        {tab==="remove" ? (
          removeReqs.length===0 ? (
            <div style={{ textAlign:"center", padding:"40px 0" }}>
              <div style={{ fontSize:36, marginBottom:10 }}>✅</div>
              <div style={{ fontSize:13, color:C.textMute }}>Bekleyen kaldırma talebi yok</div>
            </div>
          ) : removeReqs.map(req=>(
            <div key={req.id} style={{ background:C.white, border:`1px solid #FEE2E2`,
              borderRadius:16, padding:"14px 16px", marginBottom:10 }}>
              <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:4 }}>{req.name}</div>
              <div style={{ fontSize:12, color:C.textSub, marginBottom:4 }}>
                📝 Sebep: {req.reason}
              </div>
              <div style={{ fontSize:11, color:C.textMute, marginBottom:12 }}>🕐 {req.date}</div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>removeApprove(req.id)} style={{ flex:1, border:"none",
                  borderRadius:10, padding:"10px", fontSize:12, fontWeight:700,
                  cursor:"pointer", background:"#FEE2E2", color:"#991B1B" }}>
                  🗑️ Kaldır
                </button>
                <button onClick={()=>setRemoveReqs(p=>p.filter(x=>x.id!==req.id))}
                  style={{ flex:1, border:"none", borderRadius:10, padding:"10px",
                    fontSize:12, fontWeight:700, cursor:"pointer",
                    background:"#D1FAE5", color:"#065F46" }}>
                  ❌ Reddet
                </button>
              </div>
            </div>
          ))
        ) : current.length===0 ? (
          <div style={{ textAlign:"center", padding:"40px 0" }}>
            <div style={{ fontSize:36, marginBottom:10 }}>
              {tab==="pending"?"⏳":tab==="approved"?"✅":"❌"}
            </div>
            <div style={{ fontSize:13, color:C.textMute }}>Bu listede kayıt yok</div>
          </div>
        ) : current.map(biz=>(
          <div key={biz.id} style={{ background:C.white, border:`1px solid ${C.border}`,
            borderRadius:16, padding:"14px 16px", marginBottom:10,
            boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10 }}>
              <div style={{ width:44, height:44, borderRadius:12, flexShrink:0,
                background:`linear-gradient(135deg,${C.redPale},#FFF5F6)`,
                border:`1px solid ${C.border}`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
                {biz.img||"🏢"}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:2 }}>{biz.name}</div>
                <div style={{ fontSize:11, color:C.textMute, marginBottom:3 }}>📍 {biz.city}, {biz.state}</div>
                <div style={{ fontSize:11, color:C.textMute }}>📞 {biz.phone}</div>
              </div>
              {biz.status && (
                <span style={{
                  background:biz.status==="approved"?"#D1FAE5":"#FEE2E2",
                  color:      biz.status==="approved"?"#065F46":"#991B1B",
                  borderRadius:8, padding:"3px 10px", fontSize:10, fontWeight:700 }}>
                  {biz.status==="approved"?"✅ Onaylı":"❌ Reddedildi"}
                </span>
              )}
            </div>
            <div style={{ fontSize:12, color:C.textSub, lineHeight:1.5,
              background:C.redPale, borderRadius:10, padding:"9px 12px", marginBottom:biz.status?0:10 }}>
              {biz.desc||"Açıklama yok"}
            </div>
            {!biz.status && (
              <div style={{ display:"flex", gap:8, marginTop:10 }}>
                <button onClick={()=>approve(biz.id)} style={{ flex:1, border:"none",
                  borderRadius:10, padding:"10px", fontSize:12, fontWeight:700,
                  cursor:"pointer", background:"#D1FAE5", color:"#065F46" }}>✅ Onayla</button>
                <button onClick={()=>reject(biz.id)} style={{ flex:1, border:"none",
                  borderRadius:10, padding:"10px", fontSize:12, fontWeight:700,
                  cursor:"pointer", background:"#FEE2E2", color:"#991B1B" }}>❌ Reddet</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PusulaApp() {
  const [showSplash,  setShowSplash]  = useState(true);
  const [dbBusinesses, setDbBusinesses] = useState([]);
  const [dbJobs,       setDbJobs]       = useState([]);
  const [dbEvents,     setDbEvents]     = useState([]);
  const [screen,      setScreen]      = useState("onboarding");
  const [tab,         setTab]         = useState("home");
  const [business,    setBusiness]    = useState(null);
  const [bizHistory,  setBizHistory]  = useState([]); // FIX 3: navigation stack
  const [userState,   setUserState]   = useState("");
  const [userCity,    setUserCity]    = useState(""); // FIX: onboarding city
  const [favorites,   setFavorites]   = useState([]);
  const [subScreen,   setSubScreen]   = useState(null);
  const [loggedIn,    setLoggedIn]    = useState(false);
  const [lang,        setLang]        = useState("TR");
  const [reportModal, setReportModal] = useState(null);
  const [viewUser,    setViewUser]    = useState(null);
  const [searchHistory, setSearchHistory] = useState(["Restoran","Avukat","Brooklyn"]);
  const [extraJobs,   setExtraJobs]   = useState([]); // FIX 4: dynamic jobs
useEffect(() => {
    const fetchData = async () => {
      const { data: biz } = await supabase.from("businesses").select("*");
      const { data: job } = await supabase.from("jobs").select("*");
      const { data: evt } = await supabase.from("events").select("*");
      const { data: rev } = await supabase.from("reviews").select("*");
      if (biz) setDbBusinesses(biz.map(b=>({
        ...b, cat: b.category, desc: b.description,
        img: categories.find(c=>c.id===b.category)?.icon || "🏢",
        onaylı: b.featured, rating: b.rating||0, reviews: b.reviews||0,
        tags: b.tags||[], gallery: [categories.find(c=>c.id===b.category)?.icon||"🏢"],
      })));
      if (job) setDbJobs(job.map(j=>({
        ...j, posted: new Date(j.created_at).toLocaleDateString("tr-TR"),
        urgent: false, tags: j.tags||[],
      })));
      if (evt) setDbEvents(evt.map(e=>({
        ...e, cat: e.category, img: "🎉", attendees: 0,
        free: e.free, price: e.price||null,
      })));
      if (rev) setReviews(rev.map(r=>({
        bizId: r.business_id,
        stars: r.rating,
        text: r.comment,
        user: r.user_name,
        avatar: "👤",
        date: new Date(r.created_at).toLocaleDateString("tr-TR"),
      })));
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: prof } = await supabase.from("profiles").select("favorites").eq("id", user.id).single();
        if (prof?.favorites) setFavorites(prof.favorites);
      }
    };
    fetchData();
  }, []);
  const [notifications, setNotifications] = useState([
    { icon:"✅", title:"Bosphorus Kitchen yorumunuza yanıt verdi", body:"\"Teşekkürler, sizi tekrar görmek isteriz!\"", time:"2 saat önce",   read:false },
    { icon:"🔔", title:"Yeni iş ilanı: Türkçe Satış Temsilcisi",   body:"Paterson, NJ · $45K–$60K",                   time:"5 saat önce",   read:false },
    { icon:"✅", title:"İşletmeniz onaylandı",                      body:"Pusula rehberine eklendi.",                   time:"1 gün önce",    read:false },
    { icon:"💬", title:"Yorumunuz beğenildi",                       body:"Dr. Ayşe Kaya yorumunuz 3 kişi faydalı buldu.", time:"2 gün önce",  read:true  },
    { icon:"🎉", title:"Yakınınızda yeni etkinlik",                  body:"Türk Film Festivali · Brooklyn",              time:"3 gün önce",   read:true  },
  ]);

  const [reviews, setReviews] = useState([]);

  const [userProfile, setUserProfile] = useState({
    name:"", avatar:"👤", city:"", state:"", email:"", phone:"",
    reviewCount:0, bizCount:0,
  });
  const [myBusiness, setMyBusiness] = useState(null);
const [myEvents, setMyEvents] = useState([]);
const [rsvpEvents, setRsvpEvents] = useState([]);
const [selectedEventFromProfile, setSelectedEventFromProfile] = useState(null);

  const pendingBiz = dbBusinesses.filter(b=>b.status==="pending" || (!b.status && !b.verified));

  const unreadCount = notifications.filter(n=>!n.read).length;

    const toggleFav = async id => {
    const newFavs = favorites.includes(id) ? favorites.filter(x=>x!==id) : [...favorites,id];
    setFavorites(newFavs);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").update({ favorites: newFavs }).eq("id", user.id);
    }
  };

  // FIX 7: Yorum bildirimi işletme adını gösteriyor
  const addReview = async r => {
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from("reviews").insert({
      business_id: r.bizId,
      user_id: user?.id || null,
      user_name: r.user,
      rating: r.rating,
      comment: r.text,
    });

    setReviews(prev=>[r,...prev]);
    setUserProfile(p=>({...p, reviewCount:(p.reviewCount||0)+1}));
    const biz = businesses.find(b=>b.id===r.bizId);
    setNotifications(prev=>[
      { icon:"💬",
        title:`${biz?.name||"İşletme"} için yorumunuz yayınlandı`,
        body: r.text?.slice(0,50)||"",
        time:"Az önce", read:false },
      ...prev
    ]);
  };

  const handleAuth = profile => {
    setUserProfile(p=>({...p,...profile}));
    setLoggedIn(true);
    if (profile.state) setUserState(profile.state);
    setScreen("main");
  };

  // FIX 2: Arama geçmişi temizle düzeltildi
  const addSearchHistory = q => {
    if (!q.trim()) return;
    setSearchHistory(prev=>[q,...prev.filter(h=>h!==q)].slice(0,8));
  };
  const clearSearchHistory = () => setSearchHistory([]);

  const markAllRead = () => setNotifications(prev=>prev.map(n=>({...n,read:true})));

  // FIX 3: Benzer işletmeler navigation stack
  const openBusiness = (b) => {
    if (business) setBizHistory(prev=>[...prev, business]);
    setBusiness(b);
  };
  const goBackBusiness = () => {
    if (bizHistory.length > 0) {
      const prev = bizHistory[bizHistory.length-1];
      setBizHistory(h=>h.slice(0,-1));
      setBusiness(prev);
    } else {
      setBusiness(null);
    }
  };

  // FIX 4: Yeni ilan dinamik listeye ekleniyor
  const addJob = async (form) => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data } = await supabase.from("jobs").insert({
      title: form.title,
      company: form.company,
      location: `${form.location}, ${form.state}`,
      state: form.state,
      type: form.type,
      phone: form.phone,
      description: form.description,
      tags: form.tags ? form.tags.split(",").map(t=>t.trim()).filter(Boolean) : [],
      owner_id: user?.id || null,
    }).select().single();

    const newJob = {
      id: data?.id || Date.now(),
      title: form.title,
      company: form.company,
      location: `${form.location}, ${form.state}`,
      type: form.type,
      tags: form.tags ? form.tags.split(",").map(t=>t.trim()).filter(Boolean) : [],
      phone: form.phone,
      posted: "Az önce",
      urgent: false,
    };
    setExtraJobs(prev=>[newJob,...prev]);
    setNotifications(prev=>[
      { icon:"💼", title:`"${form.title}" ilanınız yayınlandı`, body:`${form.company} · ${form.location}`, time:"Az önce", read:false },
      ...prev
    ]);
  };

  // FIX 1: İşletme kaydı setMyBusiness'ı dolduruyor
  const handleRegisterBiz = async (form) => {
    const catInfo = categories.find(c=>c.id===form.category)||{};
    const { data: { user } } = await supabase.auth.getUser();

    let imageUrl = null;
    if (form.image) {
      const ext = form.image.name.split('.').pop();
      const fileName = `${Date.now()}.${ext}`;
      const { data: uploadData } = await supabase.storage
        .from('business')
        .upload(fileName, form.image, { contentType: form.image.type });
      if (uploadData) {
        const { data: urlData } = supabase.storage.from('business').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
    }

    const galleryUrls = [];
    for (const img of form.gallery) {
      const ext = img.name.split('.').pop();
      const fileName = `gallery_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { data: uploadData } = await supabase.storage
        .from('business')
        .upload(fileName, img, { contentType: img.type });
      if (uploadData) {
        const { data: urlData } = supabase.storage.from('business').getPublicUrl(fileName);
        galleryUrls.push(urlData.publicUrl);
      }
    }

    const { data, error } = await supabase.from("businesses").insert({
      name: form.name,
      category: form.category,
      state: form.state,
      city: form.city,
      tags: form.tags ? form.tags.split(",").map(t=>t.trim()).filter(Boolean) : [],
      verified: false,
      featured: false,
      phone: form.phone,
      address: `${form.address}, ${form.city}, ${form.state} ${form.zip}`,
      description: form.description,
      hours: form.hours.map(h=>({ open:h.open, from:h.from, to:h.to })),
      image_url: imageUrl,
      gallery_urls: galleryUrls,
      owner_id: user?.id || null,
    }).select().single();

    const newBiz = {
      id: data?.id || Date.now(),
      name: form.name,
      cat: form.category,
      state: form.state,
      city: form.city,
      rating: 0,
      reviews: 0,
      tags: form.tags ? form.tags.split(",").map(t=>t.trim()).filter(Boolean) : [],
      verified: false,
      onaylı: false,
      img: catInfo.icon||"🏢",
      image_url: imageUrl,
      gallery_urls: galleryUrls,
      phone: form.phone,
      address: `${form.address}, ${form.city}, ${form.state} ${form.zip}`,
      desc: form.description,
      hours: form.hours.map(h=>({ open:h.open, from:h.from, to:h.to })),
      gallery: [catInfo.icon||"🏢"],
    };

    setMyBusiness(newBiz);
    setUserProfile(p=>({...p, bizCount:(p.bizCount||0)+1}));
    setNotifications(prev=>[
      { icon:"⏳", title:`"${form.name}" incelemeye alındı`, body:"24 saat içinde onaylanacak.", time:"Az önce", read:false },
      ...prev
    ]);
    setScreen("main");
    // Yeni işletmeyi listeye ekle
    setDbBusinesses(prev=>[...prev, newBiz]);
  };

  const W = ({children}) => (
    <div style={{ minHeight:"100vh",
      fontFamily:"'Montserrat',system-ui,sans-serif",
      position:"relative", overflowY:"auto", width:"100%" }}>
      <FontInjector/>
      {showSplash && <SplashScreen onDone={()=>setShowSplash(false)}/>}
      {children}
    </div>
  );

  // Full-screen routes
  // FIX: Onboarding artık eyalet+şehir alıyor
  if (screen==="onboarding")  return <W><Onboarding onDone={st=>{ setUserState(st); setScreen("main"); }}/></W>;
  if (screen==="auth")        return <W><AuthScreen onAuth={handleAuth} onBack={()=>setScreen("main")}/></W>;
  if (screen==="register")    return <W><RegisterBusiness onBack={()=>setScreen("main")} onSuccess={handleRegisterBiz}/></W>;
  if (screen==="editprofile") return <W><EditProfile profile={userProfile} onBack={()=>setScreen("main")} onSave={p=>{setUserProfile(p);setScreen("main");}}/></W>;
  if (screen==="postjob")     return <W><PostJob onBack={()=>setScreen("main")} onSuccess={(form)=>{ addJob(form); setSubScreen("jobs"); setScreen("main"); }} userName={userProfile.name}/></W>;
  if (screen==="postevent")   return <W><PostEvent onBack={()=>setScreen("main")} onSuccess={(form)=>{
  const newEvent = {...form, id:Date.now(), img:"🎉", attendees:0, cat:form.cat||"Kültür & Sanat", image_url:form.image_url||form.imageUrl||null};
  setMyEvents(prev=>[...prev, newEvent]);
  setDbEvents(prev=>[...prev, newEvent]);
  setSubScreen("events"); setScreen("main");
}}/></W>;
  if (screen==="notifications") return <W><NotificationsScreen notifications={notifications} onBack={()=>setScreen("main")} onMarkRead={markAllRead} onNavigate={n=>{
    setScreen("main");
    if (n.icon==="💼") setSubScreen("jobs");
    else if (n.icon==="🎉") setSubScreen("events");
    else if (n.icon==="⏳" || n.icon==="🏢") setScreen("bizprofile");
  }}/></W>;
  if (screen==="admin")       return <W><AdminPanel onBack={()=>setScreen("main")} pendingBiz={pendingBiz}/></W>;
  if (screen==="bizprofile")  return <W><BusinessOwnerProfile business={myBusiness||businesses[0]} onBack={()=>setScreen("main")} reviews={reviews} onEdit={()=>setScreen("register")}/></W>;
  if (viewUser)               return <W><UserProfilePage user={viewUser} reviews={reviews} onBack={()=>setViewUser(null)}/></W>;

  if (subScreen==="jobs")   return <W><Jobs   onBack={()=>setSubScreen(null)} onPost={loggedIn?()=>setScreen("postjob"):()=>setScreen("auth")} extraJobs={[...extraJobs,...dbJobs]}/></W>;
  if (subScreen==="events") return <W><Events onBack={()=>setSubScreen(null)} onPost={loggedIn?()=>setScreen("postevent"):()=>setScreen("auth")} dbEvents={dbEvents} rsvpList={rsvpEvents} onRsvpChange={setRsvpEvents} initialEvent={selectedEventFromProfile} onClearInitial={()=>setSelectedEventFromProfile(null)}/></W>;

  if (business) return (
    <W>
      <BusinessDetail
        business={business} onBack={goBackBusiness}
        favorites={favorites} toggleFav={toggleFav}
        reviews={reviews} onAddReview={loggedIn?addReview:()=>setScreen("auth")}
        onReport={()=>setReportModal({type:"business"})}
        onReportReview={()=>setReportModal({type:"review"})}
        onViewUser={setViewUser}
        onBusiness={openBusiness}
        isOwner={myBusiness && myBusiness.id===business.id}
        lang={lang}
              dbBusinesses={dbBusinesses}
              dbJobs={dbJobs}
              dbEvents={dbEvents}/>
      {reportModal && <ReportModal type={reportModal.type} onClose={()=>setReportModal(null)}/>}
    </W>
  );

  const navItems = [
    { id:"home",    icon:"🏠", label:lang==="TR"?"Ana Sayfa":"Home"    },
    { id:"contact", icon:"📬", label:"İletişim" },
    { id:"profile", icon:"👤", label:lang==="TR"?"Profil":"Profile"    },
  ];

  return (
    <div style={{ height:"100vh", width:"100%",
      fontFamily:"'Montserrat',system-ui,sans-serif", background:C.bgSoft,
      display:"flex", flexDirection:"column", position:"relative" }}>
      <FontInjector/>
      {showSplash && <SplashScreen onDone={()=>setShowSplash(false)}/>}
      <div style={{ flex:1, overflowY:"auto" }}>
        {tab==="home"
          ? <Home userState={userState} userCity={userCity} onBusiness={openBusiness}
              onTab={setSubScreen} favorites={favorites} toggleFav={toggleFav}
              onRegister={loggedIn?()=>setScreen("register"):()=>setScreen("auth")}
              onNotifications={()=>setScreen("notifications")} unreadCount={unreadCount}
              searchHistory={searchHistory} onAddSearchHistory={addSearchHistory}
              onClearHistory={clearSearchHistory}
              onLocationChange={(st,ct)=>{ setUserState(st); setUserCity(ct); }}
              lang={lang}
              dbBusinesses={dbBusinesses}
              dbJobs={dbJobs}
              dbEvents={dbEvents}/>
          : tab==="favs"
          ? <Favorites favorites={favorites} onBusiness={openBusiness} toggleFav={toggleFav} dbBusinesses={dbBusinesses}
              reviews={reviews}/>
          : tab==="profile"
          ? <ProfilePage userProfile={userProfile}
              loggedIn={loggedIn} onLogin={()=>setScreen("auth")}
              onEdit={()=>setScreen("editprofile")}
              favorites={favorites} onBusiness={openBusiness}
              myBusiness={myBusiness}
              onMyBusiness={()=>setScreen("bizprofile")}
              onRegisterBiz={loggedIn?()=>setScreen("register"):()=>setScreen("auth")}
              myEvents={myEvents}
              onGoEvents={(ev)=>{ setSelectedEventFromProfile(ev); setSubScreen("events"); }}
              rsvpEvents={rsvpEvents}
dbEvents={[...events, ...dbEvents]}
              lang={lang} onLangChange={setLang}
              onAdmin={()=>setScreen("admin")}
              onLogout={async()=>{ await supabase.auth.signOut(); setLoggedIn(false); setScreen("main"); }}
              dbBusinesses={dbBusinesses}
              reviews={reviews}/>
          : tab==="contact"
          ? <ContactPage/>
          : null}
      </div>
      <div style={{
        background:C.red,
        borderTop:"1px solid rgba(255,255,255,0.85)",
        padding:"8px 12px 16px", display:"flex",
        boxShadow:"0 -4px 20px rgba(13,31,60,0.2)" }}>
        {navItems.map(item=>(
          <div key={item.id} onClick={()=>setTab(item.id)} style={{
            flex:1, display:"flex", flexDirection:"column",
            alignItems:"center", gap:3, padding:"8px 4px",
            borderRadius:12, cursor:"pointer",
            background:tab===item.id?"rgba(201,168,76,0.18)":"transparent" }}>
            <span style={{ fontSize:item.id==="favs"?22:20,
              filter: tab===item.id ? "none" : "grayscale(0%) opacity(0.85)" }}>
              {item.icon}
            </span>
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:0.3,
              color:tab===item.id?"#C9A84C":"rgba(255,255,255,0.5)" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
