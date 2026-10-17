import { build, icon, typed, esc, VO_OFFSET } from "./frame.mjs";

const durs = [8.2, 8.2, 12.9, 6.9, 9.6, 10.8, 9.2, 10.0, 8.9, 14.9];
const scenes = [];
const HD = `tl.fromTo($(".hd"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, 0.2);`;
const HDCSS = `@R .hd { position:absolute; left:140px; top:96px; }`;
const IP = "203.0.113.7";

// 01 HOOK
const chips1 = ["IP", "DNS", "pakiety", "routing", "TCP", "TLS", "HTTP"];
scenes.push({
  css: `
@R .br { left:360px; top:110px; width:1200px; height:520px; overflow:hidden; }
@R .top { height:110px; display:flex; align-items:center; gap:12px; padding:0 30px; border-bottom:1.5px solid var(--line); }
@R .top i { display:block; width:16px; height:16px; border-radius:50%; background:#2b3632; }
@R .addr { margin-left:30px; width:800px; height:76px; border-radius:38px; background:#0e1311; border:1.5px solid var(--line);
  display:flex; align-items:center; gap:16px; padding:0 26px; color:var(--muted); }
@R .addr .ic { width:30px; height:30px; flex:none; }
@R .addr .mono { color:var(--text); }
@R .sk { position:absolute; border-radius:16px; background:#18201d; }
@R .sk1 { left:48px; top:140px; width:1104px; height:170px; }
@R .sk2 { left:48px; top:340px; width:720px; height:30px; } @R .sk3 { left:48px; top:395px; width:900px; height:30px; } @R .sk4 { left:48px; top:450px; width:560px; height:30px; }
@R .chips { position:absolute; left:0; right:0; top:690px; display:flex; justify-content:center; gap:20px; }
@R .chip { padding:10px 26px; border-radius:18px; background:var(--panel); border:1.5px solid var(--line); color:var(--green); }
@R .q { position:absolute; left:0; right:0; top:830px; text-align:center; font-size:104px; }
`,
  html: `
<div class="card br">
  <div class="top"><i></i><i></i><i></i><div class="addr">${icon("lock")}<span class="mono">${typed("example.pl")}</span></div></div>
  <div class="sk sk1"></div><div class="sk sk2"></div><div class="sk sk3"></div><div class="sk sk4"></div>
</div>
<div class="chips">${chips1.map((c) => `<div class="chip mono">${c}</div>`).join("")}</div>
<h1 class="hd q">Co się dzieje po <span class="g">Enter</span>?</h1>`,
  js: `
tl.fromTo($(".br"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, 0.1);
type(".addr", V(0.3), 0.06);
tl.fromTo($(".sk"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: E, stagger: 0.1 }, V(2.0));
tl.fromTo($(".chip"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: E, stagger: 0.12 }, V(3.9));
tl.fromTo($(".q"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(6.0));
`,
});

// 02 IP
const devs = [
  ["laptop", "Laptop", "192.168.1.24"],
  ["smartphone", "Telefon", "192.168.1.31"],
  ["server", "Serwer", IP],
];
scenes.push({
  css: `${HDCSS}
@R .dv { top:280px; width:420px; height:330px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; color:var(--muted); }
@R .dv .ic { width:110px; height:110px; stroke-width:1.4; }
@R .dv .lb { color:var(--text); }
${devs.map((_, i) => `@R .dv${i} { left:${210 + i * 540}px; }`).join("\n")}
@R .home { position:absolute; left:0; right:0; top:690px; display:flex; justify-content:center; align-items:center; gap:24px; }
@R .home .ic { width:56px; height:56px; color:var(--yellow); stroke-width:1.6; }
@R .cap { position:absolute; left:0; right:0; top:830px; text-align:center; font-size:60px; font-weight:600; letter-spacing:-0.02em; }
`,
  html: `
<h1 class="hd">Każdy ma <span class="g">adres IP</span></h1>
${devs.map(([ic, n, ip], i) => `<div class="card dv dv${i}">${icon(ic)}<div class="lb">${n}</div><div class="mono g ip">${ip}</div></div>`).join("\n")}
<div class="home">${icon("house")}<span class="lb">adres IP działa jak adres domu</span></div>
<div class="cap">Komputery mówią <span class="y">liczbami</span>, nie nazwami</div>`,
  js: `${HD}
tl.fromTo($(".dv"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: E, stagger: 0.15 }, V(0.3));
tl.fromTo($(".ip"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E, stagger: 0.15 }, V(1.5));
tl.fromTo($(".home"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(3.2));
tl.fromTo($(".cap"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(4.9));
`,
});

// 03 DNS
const dns = [
  ["serwer główny", ".", 8.57],
  ["serwer domeny", ".pl", 9.54],
  ["serwer strony", "example.pl", 10.67],
];
const svY = (i) => 330 + i * 170;
scenes.push({
  css: `${HDCSS}
@R .sub { position:absolute; left:144px; top:226px; color:var(--muted); }
@R .nm, @R .an { left:140px; width:620px; height:140px; display:flex; align-items:center; justify-content:center; font-size:60px; }
@R .nm { top:400px; } @R .an { top:640px; color:var(--green); border-color:rgba(62,224,143,.6); }
@R .sv { left:1000px; width:780px; height:130px; display:flex; align-items:center; justify-content:space-between; padding:0 40px; }
${dns.map((_, i) => `@R .sv${i} { top:${svY(i)}px; }`).join("\n")}
@R .wire .wa { stroke:var(--green); }
`,
  html: `
<h1 class="hd">DNS zamienia <span class="g">nazwę na numer</span></h1>
<div class="sub lb">książka telefoniczna internetu</div>
<svg class="wire" viewBox="0 0 1920 1080">
  ${dns.map((_, i) => `<path class="w${i}" pathLength="1" d="M760 470 C 880 470, 880 ${svY(i) + 65}, 1000 ${svY(i) + 65}"/>`).join("")}
  <path class="wa" pathLength="1" d="M1000 ${svY(2) + 65} C 880 ${svY(2) + 65}, 880 710, 760 710"/>
</svg>
<div class="card nm mono">example.pl</div>
${dns.map(([n, t], i) => `<div class="card sv sv${i}"><span class="lb">${n}</span><span class="mono y">${t}</span></div>`).join("\n")}
<div class="card an mono">${IP}</div>`,
  js: `${HD}
tl.fromTo($(".nm"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(0.6));
tl.fromTo($(".sub"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(4.8));
tl.fromTo($(".sv"), { opacity: 0, x: 24 }, { opacity: 0.45, x: 0, duration: 0.6, ease: E, stagger: 0.12 }, V(7.2));
${dns
  .map(
    ([, , t], i) => `draw(".w${i}", V(${t}) - 0.3, 0.45);
tl.to($(".sv${i}"), { opacity: 1, borderColor: "rgba(62,224,143,.6)", duration: 0.4, ease: "power2.out" }, V(${t}));`,
  )
  .join("\n")}
draw(".wa", V(11.1), 0.5);
tl.fromTo($(".an"), { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, V(11.4));
`,
});

// 04 PAKIETY
scenes.push({
  css: `${HDCSS}
@R .blk { left:160px; top:330px; width:440px; height:440px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px; color:var(--muted); }
@R .blk .ic { width:120px; height:120px; stroke-width:1.3; }
@R .blk .lb { color:var(--text); }
@R .pk { top:330px; width:150px; height:150px; display:flex; align-items:center; justify-content:center; color:var(--green); }
${[0, 1, 2, 3, 4, 5].map((i) => `@R .pk${i} { left:${760 + i * 174}px; }`).join("\n")}
@R .dt { left:760px; top:560px; width:1020px; height:230px; padding:34px 50px; display:flex; flex-direction:column; justify-content:center; gap:22px; border-color:rgba(245,197,24,.5); }
@R .dt .row { display:flex; gap:40px; font-size:52px; }
`,
  html: `
<h1 class="hd">Dane lecą w <span class="g">pakietach</span></h1>
<div class="card blk">${icon("file-code")}<div class="lb">strona</div></div>
${[0, 1, 2, 3, 4, 5].map((i) => `<div class="card pk pk${i} mono">#${i + 1}</div>`).join("")}
<div class="card dt">
  <div class="row mono"><span class="muted">od</span><span>192.168.1.24</span></div>
  <div class="row mono"><span class="muted">do</span><span class="y">${IP}</span></div>
</div>`,
  js: `${HD}
tl.fromTo($(".blk"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, 0.35);
tl.to($(".blk"), { opacity: 0.35, duration: 0.5 }, V(2.5));
${[0, 1, 2, 3, 4, 5]
  .map((i) => `tl.fromTo($(".pk${i}"), { opacity: 0, x: ${305 - (760 + i * 174) - 75}, y: 145, scale: 0.6 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7, ease: IO }, V(2.5) + ${i} * 0.08);`)
  .join("\n")}
tl.to($(".pk0"), { borderColor: "rgba(245,197,24,.8)", duration: 0.4 }, V(4.0));
tl.fromTo($(".dt"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(4.1));
`,
});

// 05 ROUTING
const nodes = [
  ["router", "Twój router"],
  ["building-2", "Dostawca"],
  ["network", "Centrum danych"],
  ["server", "Serwer"],
];
const nx = (i) => 240 + i * 480;
const hops = [
  [0, 1.7],
  [1, 3.1],
  [2, 5.1],
  [3, 5.9],
];
const wave = Array.from({ length: 6 }, (_, k) => `Q ${795 + k * 55 + 27.5} ${k % 2 ? 575 : 515}, ${795 + (k + 1) * 55} 545`).join(" ");
scenes.push({
  css: `${HDCSS}
@R .nd { position:absolute; top:470px; width:150px; height:150px; border-radius:50%; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; justify-content:center; color:var(--muted); }
@R .nd .ic { width:68px; height:68px; stroke-width:1.5; }
@R .nl { position:absolute; top:650px; width:400px; text-align:center; }
${nodes.map((_, i) => `@R .nd${i} { left:${nx(i) - 75}px; } @R .nl${i} { left:${nx(i) - 200}px; }`).join("\n")}
@R .wl { position:absolute; left:760px; top:400px; width:400px; text-align:center; color:var(--muted); }
@R .dot { position:absolute; left:${nx(0) - 16}px; top:529px; width:32px; height:32px; border-radius:50%; background:var(--yellow); }
@R .cap { position:absolute; left:0; right:0; top:820px; text-align:center; font-size:56px; font-weight:600; letter-spacing:-0.02em; }
`,
  html: `
<h1 class="hd">Pakiety skaczą przez <span class="g">routery</span></h1>
<svg class="wire" viewBox="0 0 1920 1080">
  <path class="l0" pathLength="1" d="M315 545 L645 545"/>
  <path class="l1" pathLength="1" d="M795 545 ${wave} L1125 545"/>
  <path class="l2" pathLength="1" d="M1275 545 L1605 545"/>
</svg>
<div class="wl lb">pod oceanem</div>
${nodes.map(([ic, n], i) => `<div class="nd nd${i}">${icon(ic)}</div><div class="nl nl${i} lb">${n}</div>`).join("\n")}
<div class="dot"></div>
<div class="cap">Router zna tylko <span class="y">następny krok</span></div>`,
  js: `${HD}
tl.fromTo([$(".nd"), $(".nl")], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E, stagger: 0.08 }, V(0.4));
tl.fromTo($(".dot"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, V(1.6));
${hops
  .map(([n, t], k) => {
    const lit = `tl.to($(".nd${n}"), { color: "#3ee08f", borderColor: "rgba(62,224,143,.6)", duration: 0.4 }, V(${t}));`;
    if (k === 0) return lit;
    const prev = hops[k - 1][1];
    const d = Math.min(0.9, t - prev - 0.1);
    return `draw(".l${n - 1}", V(${t}) - ${d}, ${d});
tl.to($(".dot"), { x: ${nx(n) - nx(0)}, duration: ${d}, ease: IO }, V(${t}) - ${d});
${lit}`;
  })
  .join("\n")}
tl.fromTo($(".wl"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, V(4.2));
tl.fromTo($(".cap"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(6.5));
`,
});

// 06 TCP
const hs = [
  ["SYN", 420, 1, 4.19],
  ["SYN-ACK", 510, -1, 4.8],
  ["ACK", 600, 1, 5.74],
];
const slot = (n) => 1100 + (n - 1) * 126;
scenes.push({
  css: `${HDCSS}
@R .hh { top:250px; width:300px; height:100px; display:flex; align-items:center; justify-content:center; gap:20px; }
@R .hh .ic { width:48px; height:48px; color:var(--muted); stroke-width:1.5; }
@R .h0 { left:180px; } @R .h1 { left:1440px; }
@R .wire .ar { stroke:var(--green); }
@R .wire .hd2 { fill:var(--green); }
@R .al { position:absolute; left:760px; width:400px; text-align:center; color:var(--yellow); }
${hs.map(([, y], i) => `@R .al${i} { top:${y - 64}px; }`).join("\n")}
@R .pl { position:absolute; left:180px; top:740px; color:var(--muted); }
@R .p { top:720px; width:110px; height:90px; display:flex; align-items:center; justify-content:center; font-size:48px; }
${[1, 2, 3, 4].map((n) => `@R .p${n} { left:${slot(n)}px; }`).join("\n")}
@R .p3x { left:${slot(3)}px; color:var(--muted); }
@R .p3 { color:var(--yellow); border-color:rgba(245,197,24,.6); }
`,
  html: `
<h1 class="hd"><span class="g">TCP</span> pilnuje porządku</h1>
<div class="card hh h0">${icon("laptop")}<span class="lb">Ty</span></div>
<div class="card hh h1">${icon("server")}<span class="lb">Serwer</span></div>
<svg class="wire" viewBox="0 0 1920 1080">
  <path class="life" d="M330 350 L330 650"/><path class="life" d="M1590 350 L1590 650"/>
  ${hs
    .map(([, y, dir], i) => {
      const [a, b] = dir > 0 ? [360, 1560] : [1560, 360];
      const hx = b - dir * 22;
      return `<path class="ar ar${i}" pathLength="1" d="M${a} ${y} L${b} ${y}"/><polygon class="hd2 ah${i}" points="${b},${y} ${hx},${y - 12} ${hx},${y + 12}"/>`;
    })
    .join("")}
</svg>
${hs.map(([t], i) => `<div class="al al${i} mono">${t}</div>`).join("")}
<div class="pl lb">pakiety</div>
<div class="card p p3x mono">3</div>
${[1, 2, 3, 4].map((n) => `<div class="card p p${n} mono">${n}</div>`).join("")}`,
  js: `${HD}
tl.fromTo($(".hh"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E, stagger: 0.12 }, V(0.9));
tl.fromTo($(".life"), { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.12 }, V(1.2));
tl.set($(".hd2"), { opacity: 0 }, 0);
${hs
  .map(
    ([, , , t], i) => `draw(".ar${i}", V(${t}) - 0.1, 0.55);
tl.to($(".ah${i}"), { opacity: 1, duration: 0.15 }, V(${t}) + 0.4);
tl.fromTo($(".al${i}"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, V(${t}));`,
  )
  .join("\n")}
tl.fromTo($(".pl"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, V(6.9));
[[1, 7.1], [2, 7.35], [4, 7.75]].forEach(function (p) {
  tl.fromTo($(".p" + p[0]), { opacity: 0, x: 400 - [0, ${slot(1)}, ${slot(2)}, 0, ${slot(4)}][p[0]] }, { opacity: 1, x: 0, duration: 0.9, ease: IO }, V(p[1]));
});
tl.fromTo($(".p3x"), { opacity: 0, x: ${400 - slot(3)}, y: 0 }, { opacity: 1, x: ${820 - slot(3)}, duration: 0.6, ease: "power1.in" }, V(7.55));
tl.to($(".p3x"), { opacity: 0, y: 80, duration: 0.5, ease: "power2.in" }, V(8.15));
tl.fromTo($(".p3"), { opacity: 0, x: ${400 - slot(3)} }, { opacity: 1, x: 0, duration: 0.9, ease: IO }, V(8.9));
`,
});

// 07 HTTPS
scenes.push({
  css: `${HDCSS}
@R .ab { left:460px; top:250px; width:1000px; height:110px; display:flex; align-items:center; gap:24px; padding:0 40px; font-size:52px; }
@R .ab .ic { width:46px; height:46px; color:var(--muted); stroke-width:1.8; flex:none; }
@R .nd { top:520px; width:300px; height:180px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; color:var(--muted); }
@R .nd .ic { width:64px; height:64px; stroke-width:1.5; }
@R .nd .lb { color:var(--text); }
@R .n0 { left:160px; } @R .n1 { left:1460px; }
@R .key { position:absolute; top:520px; width:64px; height:64px; color:var(--yellow); }
@R .key .ic { width:64px; height:64px; stroke-width:1.6; }
@R .k0 { left:500px; } @R .k1 { left:1356px; }
@R .msg { position:absolute; left:500px; top:640px; padding:8px 22px; border-radius:16px; background:var(--panel); border:1.5px solid rgba(62,224,143,.5); color:var(--green); }
@R .eye { position:absolute; left:760px; top:420px; display:flex; align-items:center; gap:22px; }
@R .eye .ic { width:60px; height:60px; color:var(--yellow); stroke-width:1.6; }
`,
  html: `
<h1 class="hd"><span class="g">HTTPS</span> szyfruje połączenie</h1>
<div class="card ab mono">${icon("lock")}<span><span class="g">https://</span>example.pl</span></div>
<svg class="wire" viewBox="0 0 1920 1080"><path class="ln" pathLength="1" d="M460 610 L1460 610"/></svg>
<div class="card nd n0">${icon("laptop")}<span class="lb">Ty</span></div>
<div class="card nd n1">${icon("server")}<span class="lb">Serwer</span></div>
<div class="key k0">${icon("key-round")}</div><div class="key k1">${icon("key-round")}</div>
<div class="eye">${icon("eye-off")}<span class="lb y">nikt po drodze nie przeczyta</span></div>
<div class="msg mono">8f#Qx!2@Lp</div>`,
  js: `${HD}
tl.fromTo($(".ab"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, 0.4);
tl.fromTo($(".nd"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E, stagger: 0.12 }, V(1.2));
draw(".ln", V(1.5), 0.6);
tl.fromTo($(".k0"), { opacity: 0, x: 0 }, { opacity: 1, x: 300, duration: 1.0, ease: IO }, V(2.3));
tl.fromTo($(".k1"), { opacity: 0, x: 0 }, { opacity: 1, x: -300, duration: 1.0, ease: IO }, V(2.3));
tl.to([$(".k0"), $(".k1")], { opacity: 0, duration: 0.3 }, V(3.4));
tl.to($(".ab .ic"), { color: "#3ee08f", duration: 0.4 }, V(4.3));
tl.to($(".ab"), { borderColor: "rgba(62,224,143,.6)", duration: 0.4 }, V(4.3));
tl.fromTo($(".ab .ic"), { scale: 1 }, { scale: 1.15, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }, V(4.3));
tl.fromTo($(".msg"), { opacity: 0, x: 0 }, { opacity: 1, x: 640, duration: 1.6, ease: IO }, V(5.6));
tl.fromTo($(".eye"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(6.5));
`,
});

// 08 HTTP
scenes.push({
  css: `${HDCSS}
@R .t0 { left:140px; top:280px; width:760px; height:380px; } @R .t1 { left:1020px; top:280px; width:760px; height:380px; }
@R .verb { color:var(--yellow); }
@R .st200 { color:var(--green); display:inline-block; }
@R .r { opacity:0; }
@R .wire .ar { stroke:var(--green); }
@R .wire .ah { fill:var(--green); }
@R .cap { position:absolute; left:0; right:0; top:760px; text-align:center; color:var(--muted); }
`,
  html: `
<h1 class="hd"><span class="g">HTTP</span>: prośba i odpowiedź</h1>
<div class="term t0"><div class="bar"><i></i><i></i><i></i><span class="mono muted">żądanie</span></div>
  <div class="body"><div class="mono l1"><span class="verb">${typed("GET")}</span>${typed(" / HTTP/1.1")}</div><div class="mono l2">${typed("Host: example.pl")}</div></div></div>
<svg class="wire" viewBox="0 0 1920 1080"><path class="ar" pathLength="1" d="M910 470 L1000 470"/><polygon class="ah" points="1010,470 994,460 994,480"/></svg>
<div class="term t1"><div class="bar"><i></i><i></i><i></i><span class="mono muted">odpowiedź</span></div>
  <div class="body">
    <div class="mono r r1">HTTP/1.1 <span class="st200">200 OK</span></div>
    <div class="mono r r2 muted">Content-Type: text/html</div>
    <div class="mono r r3">${esc("<!doctype html>…")}</div>
  </div></div>
<div class="cap lb">200 = OK · 404 = nie znaleziono</div>`,
  js: `${HD}
tl.fromTo($(".t0"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(0.2));
type(".l1", V(1.1), 0.05);
type(".l2", V(1.8), 0.045);
tl.fromTo($(".verb"), { opacity: 1 }, { opacity: 0.4, duration: 0.2, yoyo: true, repeat: 1 }, V(2.9));
draw(".ar", V(4.0), 0.4);
tl.fromTo($(".ah"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, V(4.35));
tl.fromTo($(".t1"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(4.6));
tl.fromTo($(".r1"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, V(5.8));
tl.fromTo($(".st200"), { scale: 1 }, { scale: 1.12, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, V(6.1));
tl.fromTo($(".cap"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(6.8));
tl.fromTo($(".r2"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, V(7.5));
tl.fromTo($(".r3"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, V(7.85));
`,
});

// 09 RENDER
const res = [
  ["file-code", "HTML", 0.9],
  ["paintbrush", "CSS", 2.74],
  ["braces", "JS", 3.38],
  ["image", "obrazki", 3.93],
];
scenes.push({
  css: `${HDCSS}
@R .rc { left:140px; width:360px; height:104px; display:flex; align-items:center; gap:22px; padding:0 30px; color:var(--muted); }
@R .rc .ic { width:44px; height:44px; stroke-width:1.6; }
@R .rc .lb { color:var(--text); }
${res.map((_, i) => `@R .rc${i} { top:${290 + i * 128}px; }`).join("\n")}
@R .bw { left:600px; top:280px; width:1180px; height:620px; overflow:hidden; }
@R .bw .top { height:80px; display:flex; align-items:center; gap:12px; padding:0 28px; border-bottom:1.5px solid var(--line); }
@R .bw .top i { display:block; width:16px; height:16px; border-radius:50%; background:#2b3632; }
@R .e { position:absolute; border-radius:14px; }
@R .nav { left:40px; top:110px; width:1100px; height:56px; background:#1a2420; }
@R .hero { left:40px; top:200px; width:520px; height:330px; background:rgba(62,224,143,.10); border:1.5px solid rgba(62,224,143,.35);
  display:flex; align-items:center; justify-content:center; color:var(--green); }
@R .hero .ic { width:90px; height:90px; stroke-width:1.3; }
@R .t1 { left:610px; top:210px; width:500px; height:44px; background:#26332e; }
@R .t2 { left:610px; top:284px; width:440px; height:26px; background:#1d2723; }
@R .t3 { left:610px; top:330px; width:480px; height:26px; background:#1d2723; }
@R .t4 { left:610px; top:376px; width:380px; height:26px; background:#1d2723; }
@R .btn { left:610px; top:446px; width:230px; height:64px; border-radius:32px; background:var(--green); }
@R .tm { position:absolute; left:140px; top:830px; display:flex; align-items:baseline; gap:24px; }
@R .tm .mono { font-size:60px; }
`,
  html: `
<h1 class="hd">Przeglądarka <span class="g">składa stronę</span></h1>
${res.map(([ic, n], i) => `<div class="card rc rc${i}">${icon(ic)}<span class="lb">${n}</span></div>`).join("\n")}
<div class="card bw"><div class="top"><i></i><i></i><i></i></div>
  <div class="e nav"></div><div class="e hero">${icon("image")}</div>
  <div class="e t1"></div><div class="e t2"></div><div class="e t3"></div><div class="e t4"></div><div class="e btn"></div>
</div>
<div class="tm"><span class="mono y">&lt;1 s</span><span class="lb muted">od Enter do gotowej strony</span></div>`,
  js: `${HD}
tl.fromTo($(".bw"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, 0.4);
${res
  .map(
    ([, , t], i) => `tl.fromTo($(".rc${i}"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: E }, V(${t}));
tl.to($(".rc${i}"), { color: "#3ee08f", borderColor: "rgba(62,224,143,.5)", duration: 0.4 }, V(${t}) + 0.2);`,
  )
  .join("\n")}
tl.fromTo($(".e"), { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5, ease: E, stagger: 0.1 }, V(4.6));
tl.fromTo($(".tm"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(6.4));
`,
});

// 10 PODSUMOWANIE
const sum = [
  ["IP", 0.1],
  ["DNS", 0.97],
  ["pakiety", 1.99],
  ["routing", 2.79],
  ["TCP", 3.42],
  ["szyfrowanie", 4.45],
  ["HTTP", 5.01],
];
scenes.push({
  exit: 0.9,
  css: `
@R .ls { position:absolute; inset:0; }
@R .row { position:absolute; left:140px; right:140px; top:240px; display:flex; flex-wrap:wrap; gap:26px 22px; }
@R .sc { padding:18px 36px; border-radius:22px; background:var(--panel); border:1.5px solid var(--line); font-size:60px; color:var(--green); }
@R .ft { position:absolute; left:140px; top:620px; font-size:108px; }
@R .fin { position:absolute; inset:0; }
@R .gl { position:absolute; left:900px; top:150px; width:120px; height:120px; color:var(--green); }
@R .gl .ic { width:120px; height:120px; stroke-width:1.2; }
@R .fh { position:absolute; left:0; right:0; top:330px; text-align:center; font-size:104px; }
@R .cmd { position:absolute; left:500px; top:530px; width:920px; height:116px; border-radius:24px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; padding:0 44px; font-size:56px; }
@R .fn { position:absolute; left:0; right:0; top:700px; text-align:center; color:var(--muted); }
`,
  html: `
<div class="ls">
  <div class="row">${sum.map(([t], i) => `<div class="sc sc${i} mono">${t}</div>`).join("")}</div>
  <h1 class="hd ft">Tak działa <span class="g">internet</span>.</h1>
</div>
<div class="fin">
  <div class="gl">${icon("globe")}</div>
  <h1 class="hd fh">Sprawdź <span class="g">sam</span></h1>
  <div class="cmd mono"><span class="g">$</span>&nbsp;${typed("nslookup example.pl")}</div>
  <div class="fn lb">pokaże adres IP strony</div>
</div>`,
  js: `
${sum.map(([, w], i) => `tl.fromTo($(".sc${i}"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(${w}));`).join("\n")}
tl.fromTo($(".ft"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(6.7));
tl.to($(".ls"), { opacity: 0, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" }, V(8.3));
tl.fromTo($(".gl"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7, ease: E }, V(8.7));
tl.fromTo($(".fh"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(8.85));
tl.fromTo($(".cmd"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(9.6));
type(".cmd", V(10.6), 0.05);
tl.fromTo($(".fn"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, V(11.9));
`,
});

build({
  title: "Jak działa Internet",
  durs,
  scenes,
  sfx: (st) => [
    ["typing", st[0] + VO_OFFSET + 0.3, 0.65, 0.3, 14],
    ...[8.57, 9.54, 10.67].map((t) => ["click-soft", st[2] + VO_OFFSET + t, 0.365, 0.45, 13]),
    ...[4.19, 4.8, 5.74].map((t) => ["click-soft", st[5] + VO_OFFSET + t, 0.365, 0.45, 13]),
    ["typing", st[7] + VO_OFFSET + 1.1, 1.5, 0.3, 14],
    ["chime", st[9] + VO_OFFSET + 8.7, 2.5, 0.22, 15],
    ["typing", st[9] + VO_OFFSET + 10.6, 0.95, 0.3, 14],
  ],
});
