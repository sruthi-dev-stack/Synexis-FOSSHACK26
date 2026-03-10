import { useState, useRef, useCallback, useEffect } from "react";

const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&family=Syne:wght@600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:#f0f7f6;}
    ::-webkit-scrollbar{width:4px;height:4px}
    ::-webkit-scrollbar-track{background:#e8f4f2}
    ::-webkit-scrollbar-thumb{background:#2d9b8a60;border-radius:4px}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
    .fade{animation:fadeUp .35s ease both}
    .hcard:hover{border-color:#2d9b8a!important;box-shadow:0 4px 20px rgba(45,155,138,.12)!important;transform:translateY(-1px);transition:all .2s}
    .tab-btn:hover{background:rgba(45,155,138,.08)!important;color:#1a7a6e!important}
    .irow:hover{background:rgba(45,155,138,.04)!important}
    .btn-primary:hover{background:#1a7a6e!important;box-shadow:0 4px 16px rgba(45,155,138,.35)!important}
    .btn-ghost:hover{background:rgba(45,155,138,.08)!important;border-color:#2d9b8a!important}
    .dz:hover{border-color:#2d9b8a!important;background:rgba(45,155,138,.04)!important}
    .pill{transition:all .15s}
    .pill:hover{background:rgba(45,155,138,.1)!important;color:#1a7a6e!important}
    input[type=file]{display:none}
    .nav-item:hover{color:#2d9b8a!important}
  `}</style>
);

const C = {
  bg:"#f0f7f6",
  bgAlt:"#e8f4f2",
  white:"#ffffff",
  surface:"#ffffff",
  surfaceUp:"#f7fbfa",
  teal:"#2d9b8a",
  tealDark:"#1a7a6e",
  tealLight:"#4db8a6",
  tealPale:"rgba(45,155,138,.08)",
  tealBorder:"rgba(45,155,138,.2)",
  mint:"#a8e6df",
  mintLight:"#d4f0ec",
  border:"#ddecea",
  borderDark:"#c0dcd8",
  text:"#0f2d2a",
  textMid:"#3d6b66",
  textLight:"#7aaba5",
  textXLight:"#b0cfcc",
  green:"#27ae82",
  greenSoft:"rgba(39,174,130,.1)",
  amber:"#e8a020",
  amberSoft:"rgba(232,160,32,.1)",
  red:"#e05050",
  redSoft:"rgba(224,80,80,.1)",
  purple:"#7c6fcf",
  purpleSoft:"rgba(124,111,207,.1)",
  shadow:"0 1px 4px rgba(15,45,42,.06), 0 4px 16px rgba(15,45,42,.04)",
  shadowMd:"0 4px 24px rgba(15,45,42,.1)",
  r:"10px", rLg:"16px", rXl:"20px",
};

// Load SheetJS for Excel support
let XLSX_LIB = null;
function loadXLSX(){
  return new Promise((res)=>{
    if(XLSX_LIB){res(XLSX_LIB);return;}
    const s=document.createElement("script");
    s.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    s.onload=()=>{XLSX_LIB=window.XLSX;res(XLSX_LIB);};
    document.head.appendChild(s);
  });
}

async function parseXLSX(buffer){
  const XLSX=await loadXLSX();
  const wb=XLSX.read(buffer,{type:"array"});
  const ws=wb.Sheets[wb.SheetNames[0]];
  const data=XLSX.utils.sheet_to_json(ws,{defval:""});
  if(!data||!data.length)return null;
  const headers=Object.keys(data[0]);
  const rows=data.map(r=>{const o={};headers.forEach(h=>o[h]=String(r[h]??"").trim());return o;});
  return{headers,rows};
}

const isMissing = v =>
  v === undefined || v === null || String(v).trim() === "" ||
  ["null","na","nan","n/a","none","undefined"].includes(String(v).toLowerCase().trim());

function parseCSV(text){
  const lines=text.trim().split(/\r?\n/).filter(Boolean);
  if(lines.length<2)return null;
  const headers=lines[0].split(",").map(h=>h.trim().replace(/^"|"$/g,""));
  const rows=lines.slice(1).map(line=>{
    const vals=[];let cur="",inQ=false;
    for(const ch of line){if(ch==='"'){inQ=!inQ;continue;}if(ch===','&&!inQ){vals.push(cur.trim());cur="";}else cur+=ch;}
    vals.push(cur.trim());
    const obj={};headers.forEach((h,i)=>{obj[h]=vals[i]!==undefined?vals[i].trim():"";});
    return obj;
  });
  return{headers,rows};
}
function parseJSON(text){
  try{const d=JSON.parse(text);const arr=Array.isArray(d)?d:Object.values(d).find(v=>Array.isArray(v));
  if(!arr||!arr.length)return null;const headers=Object.keys(arr[0]);
  return{headers,rows:arr.map(r=>{const o={};headers.forEach(h=>o[h]=String(r[h]??""));return o;})};
  }catch{return null;}
}
function parseFile(text,name){
  if(name.endsWith(".json"))return parseJSON(text);
  return parseCSV(text);
}

function analyzeDataset({headers,rows}){
  const total=rows.length;const colStats={};const issues=[];
  headers.forEach(col=>{
    const vals=rows.map(r=>r[col]);
    const missing=vals.filter(isMissing).length;
    const nonMissing=vals.filter(v=>!isMissing(v));
    const numVals=nonMissing.map(v=>parseFloat(v)).filter(n=>!isNaN(n));
    const isNumeric=numVals.length>nonMissing.length*0.7&&nonMissing.length>0;
    const isDate=!isNumeric&&nonMissing.slice(0,20).filter(v=>!isNaN(Date.parse(v))).length>nonMissing.slice(0,20).length*0.6;
    let outliers=0,outlierLo=-Infinity,outlierHi=Infinity,outlierVals=[];
    if(isNumeric&&numVals.length>4){
      const s=[...numVals].sort((a,b)=>a-b);
      const q1=s[Math.floor(s.length*.25)],q3=s[Math.floor(s.length*.75)];
      const iqr=q3-q1;outlierLo=q1-1.5*iqr;outlierHi=q3+1.5*iqr;
      outlierVals=numVals.filter(v=>v<outlierLo||v>outlierHi);outliers=outlierVals.length;
    }
    let formatIssues=0;
    if(isDate){const fmts=nonMissing.map(v=>/\d{4}-\d{2}-\d{2}/.test(v)?"ISO":/\d{2}\/\d{2}\/\d{4}/.test(v)?"US":/\d{2}-\d{2}-\d{4}/.test(v)?"EU":"other");formatIssues=new Set(fmts).size;}
    const mixedTypes=!isNumeric&&!isDate&&nonMissing.some(v=>!isNaN(parseFloat(v)))&&nonMissing.some(v=>isNaN(parseFloat(v)));
    const unique=new Set(nonMissing).size;
    const avg=isNumeric&&numVals.length?numVals.reduce((a,b)=>a+b,0)/numVals.length:null;
    const sorted=isNumeric?[...numVals].sort((a,b)=>a-b):[];
    const median=isNumeric&&sorted.length?sorted[Math.floor(sorted.length/2)]:null;
    const min=isNumeric&&numVals.length?Math.min(...numVals):null;
    const max=isNumeric&&numVals.length?Math.max(...numVals):null;
    const std=isNumeric&&numVals.length?Math.sqrt(numVals.reduce((s,v)=>s+(v-avg)**2,0)/numVals.length):null;
    const freqMap={};nonMissing.forEach(v=>{freqMap[v]=(freqMap[v]||0)+1;});
    const topVals=Object.entries(freqMap).sort((a,b)=>b[1]-a[1]).slice(0,6);
    const mp=(missing/total)*100;
    const colIssues=[];
    if(missing>0)colIssues.push({type:"missing",severity:mp>30?"high":mp>10?"medium":"low",count:missing,title:"Missing Values",explanation:`${missing} of ${total} rows (${mp.toFixed(1)}%) have no value for "${col}".`,impact:"Missing data skews averages and breaks ML models.",fix:isNumeric?`Fill with median (${median?.toFixed(2)}) or mean (${avg?.toFixed(2)}).`:`Fill with most common value "${topVals[0]?.[0]||"Unknown"}".`});
    if(outliers>0)colIssues.push({type:"outlier",severity:outliers>total*.05?"high":"medium",count:outliers,title:"Statistical Outliers",explanation:`${outliers} value(s) outside range [${outlierLo.toFixed(1)}, ${outlierHi.toFixed(1)}]. e.g. ${outlierVals.slice(0,3).join(", ")}`,impact:"Outliers distort averages and mislead ML models.",fix:"Review and remove confirmed data entry errors."});
    if(formatIssues>1)colIssues.push({type:"format",severity:"medium",count:formatIssues,title:"Inconsistent Date Formats",explanation:`"${col}" mixes ${formatIssues} different date formats.`,impact:"Date calculations and sorting will fail.",fix:"Standardise all dates to YYYY-MM-DD."});
    if(mixedTypes)colIssues.push({type:"type",severity:"high",count:0,title:"Mixed Data Types",explanation:`"${col}" contains both numbers and text.`,impact:"ML models cannot process mixed-type columns.",fix:"Decide on one type and convert all values."});
    colStats[col]={type:isNumeric?"numeric":isDate?"date":"text",missing,missingPct:mp,outliers,outlierLo,outlierHi,formatIssues,mixedTypes,unique,total,avg,median,min,max,std,topVals,issues:colIssues,health:Math.max(0,100-colIssues.reduce((s,i)=>s+(i.severity==="high"?35:i.severity==="medium"?18:8),0))};
    issues.push(...colIssues.map(i=>({...i,column:col})));
  });
  const seen=new Set();let dups=0;
  rows.forEach(r=>{const k=JSON.stringify(r);if(seen.has(k))dups++;else seen.add(k);});
  if(dups>0)issues.push({type:"duplicate",column:"All Columns",severity:dups>total*.1?"high":"medium",count:dups,title:"Duplicate Rows",explanation:`${dups} rows are exact copies of other rows.`,impact:"Duplicates bias analysis and model training.",fix:"Remove all duplicate rows."});
  const hi=issues.filter(i=>i.severity==="high").length;
  const med=issues.filter(i=>i.severity==="medium").length;
  const lo=issues.filter(i=>i.severity==="low").length;
  const score=Math.max(0,Math.round(100-hi*22-med*10-lo*4));
  return{issues,colStats,score,total,cols:headers.length,dups};
}

// Convert written numbers to digits (e.g. "twenty" -> "20")
const WORD_NUMS={"zero":0,"one":1,"two":2,"three":3,"four":4,"five":5,"six":6,"seven":7,"eight":8,"nine":9,"ten":10,"eleven":11,"twelve":12,"thirteen":13,"fourteen":14,"fifteen":15,"sixteen":16,"seventeen":17,"eighteen":18,"nineteen":19,"twenty":20,"twenty-one":21,"twenty-two":22,"twenty-three":23,"twenty-four":24,"twenty-five":25,"twenty-six":26,"twenty-seven":27,"twenty-eight":28,"twenty-nine":29,"thirty":30,"thirty-one":31,"thirty-two":32,"thirty-three":33,"thirty-four":34,"thirty-five":35,"thirty-six":36,"thirty-seven":37,"thirty-eight":38,"thirty-nine":39,"forty":40,"forty-one":41,"forty-two":42,"forty-three":43,"forty-four":44,"forty-five":45,"forty-six":46,"forty-seven":47,"forty-eight":48,"forty-nine":49,"fifty":50,"sixty":60,"seventy":70,"eighty":80,"ninety":90,"hundred":100};
function wordToNumber(v){const k=String(v).toLowerCase().trim();return WORD_NUMS.hasOwnProperty(k)?WORD_NUMS[k]:null;}

// Normalize any date string to YYYY/MM/DD
function normalizeDate(v){
  if(!v||isMissing(v))return v;
  const s=String(v).trim();
  // Already YYYY/MM/DD — perfect, no change
  if(/^\d{4}\/\d{2}\/\d{2}$/.test(s))return s;
  // Already YYYY-MM-DD — just swap dashes to slashes
  if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s.replace(/-/g,"/");
  // YYYY/M/D or YYYY.MM.DD
  const iso2=s.match(/^(\d{4})[\/\.](\d{1,2})[\/\.](\d{1,2})$/);
  if(iso2)return `${iso2[1]}/${iso2[2].padStart(2,"0")}/${iso2[3].padStart(2,"0")}`;
  // DD-MM-YYYY  e.g. 01-02-2023
  const dmy=s.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if(dmy)return `${dmy[3]}/${dmy[2].padStart(2,"0")}/${dmy[1].padStart(2,"0")}`;
  // DD/MM/YYYY  e.g. 01/02/2023
  const dmySlash=s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if(dmySlash)return `${dmySlash[3]}/${dmySlash[2].padStart(2,"0")}/${dmySlash[1].padStart(2,"0")}`;
  // Native parse fallback
  const d=new Date(s);
  if(!isNaN(d.getTime())){const iso=d.toISOString().slice(0,10);return iso.replace(/-/g,"/");}
  return s;
}

function autoFixDataset(rows,headers,colStats){
  const fixLog=[];
  let filledCount=0,removedDups=0,convertedCount=0,dateFixedCount=0;

  const filledRows=rows.map((row,origIdx)=>{
    const newRow={};
    headers.forEach(col=>{
      const cellVal=row[col];
      const stat=colStats[col];

      // STEP 1: Convert word numbers to digits (e.g. "twenty" → 20)
      if(!isMissing(cellVal)){
        const wordNum=wordToNumber(cellVal);
        if(wordNum!==null&&stat.type==="numeric"){
          newRow[col]=String(wordNum);
          convertedCount++;
          return;
        }
      }

      // STEP 2: Normalize all date formats to YYYY/MM/DD
      // Check ALL columns by pattern — don't rely on column type detection
      if(!isMissing(cellVal)){
        const s=String(cellVal).trim();
        const isDatePattern=
          /^\d{4}-\d{1,2}-\d{1,2}$/.test(s)||
          /^\d{1,2}-\d{1,2}-\d{4}$/.test(s)||
          /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)||
          /^\d{4}\.\d{1,2}\.\d{1,2}$/.test(s);
        if(isDatePattern){
          const normalized=normalizeDate(s);
          newRow[col]=normalized;
          if(normalized!==s)dateFixedCount++;
          return;
        }
      }

      // STEP 3: Fill missing values with median/mode — NEVER delete the row
      if(isMissing(cellVal)){
        if(stat.type==="numeric"&&stat.median!==null){
          newRow[col]=parseFloat(stat.median.toFixed(2)).toString();
        }else if(stat.topVals&&stat.topVals.length>0){
          newRow[col]=stat.topVals[0][0];
        }else{
          newRow[col]="Unknown";
        }
        filledCount++;
      }else{
        newRow[col]=cellVal;
      }
    });
    newRow.__origIdx=origIdx;
    return newRow;
  });

  if(convertedCount>0)fixLog.push({icon:"↔",text:`Converted ${convertedCount} text numbers to digits`,color:C.purple});
  if(dateFixedCount>0)fixLog.push({icon:"📅",text:`Standardised ${dateFixedCount} dates to YYYY/MM/DD`,color:C.teal});
  if(filledCount>0)fixLog.push({icon:"○",text:`Filled ${filledCount} missing values with median/mode`,color:C.green});

  // STEP 4: Remove EXACT duplicate rows only
  const seenKeys=new Set();
  const cleanRows=filledRows.filter(row=>{
    const key=headers.map(h=>row[h]).join("|~|");
    if(seenKeys.has(key)){removedDups++;return false;}
    seenKeys.add(key);return true;
  }).map(({__origIdx,...row})=>row);

  if(removedDups>0)fixLog.push({icon:"◫",text:`Removed ${removedDups} duplicate rows`,color:C.teal});

  // NOTE: Outliers are flagged and reported but NEVER deleted — no data loss
  return{rows:cleanRows,log:fixLog,stats:{filledCount,removedDups,removedOutliers:0,convertedCount,dateFixedCount}};
}

function simulateML(rows,colStats,headers,isClean=false){
  const total=rows.length;
  const missingRate=headers.reduce((s,c)=>s+(colStats[c]?.missing||0),0)/(total*headers.length);
  const outlierRate=headers.reduce((s,c)=>s+(colStats[c]?.outliers||0),0)/Math.max(total,1);
  const noise=isClean?0:(missingRate*28+outlierRate*18);
  const base=70+Math.random()*6;
  const acc=Math.min(97,Math.max(48,base-noise+(isClean?10:0)));
  const precision=Math.min(96,acc-1+Math.random()*3);
  const recall=Math.min(95,acc-2+Math.random()*3);
  const f1=2*(precision*recall)/(precision+recall);
  return{accuracy:parseFloat(acc.toFixed(1)),precision:parseFloat(precision.toFixed(1)),recall:parseFloat(recall.toFixed(1)),f1:parseFloat(f1.toFixed(1))};
}

function exportCSV(rows,headers,filename){
  const lines=[headers.join(","),...rows.map(r=>headers.map(h=>`"${String(r[h]??"").replace(/"/g,'""')}"`).join(","))];
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([lines.join("\n")],{type:"text/csv;charset=utf-8;"}));
  a.download=filename;a.click();
}

// ── UI Primitives ──
const Card=({children,style={},className=""})=>(
  <div className={className} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:C.r,boxShadow:C.shadow,...style}}>{children}</div>
);

const Tag=({children,color=C.teal,bg=C.tealPale})=>(
  <span style={{fontSize:10,fontWeight:600,color,background:bg,borderRadius:6,padding:"2px 8px",fontFamily:"'DM Mono',monospace",letterSpacing:.5}}>{children}</span>
);

const Badge=({sev})=>{
  const m={high:[C.red,C.redSoft,"Critical"],medium:[C.amber,C.amberSoft,"Warning"],low:[C.green,C.greenSoft,"Minor"]};
  const[c,bg,l]=m[sev]||[C.textLight,"transparent",sev];
  return <span style={{fontSize:10,fontWeight:600,color:c,background:bg,borderRadius:6,padding:"3px 10px",fontFamily:"'DM Sans',sans-serif",letterSpacing:.3,border:`1px solid ${c}30`}}>{l}</span>;
};

const MiniBar=({pct,color,height=5})=>(
  <div style={{background:C.bgAlt,borderRadius:99,height,overflow:"hidden",width:"100%"}}>
    <div style={{width:`${Math.min(100,Math.max(0,pct))}%`,height:"100%",background:color,borderRadius:99,transition:"width 1s ease"}}/>
  </div>
);

const ScoreRing=({score})=>{
  const r=54,circ=2*Math.PI*r;
  const color=score>=80?C.green:score>=55?C.amber:C.red;
  return(
    <div style={{position:"relative",width:136,height:136,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <svg width="136" height="136" style={{position:"absolute",transform:"rotate(-90deg)"}}>
        <circle cx="68" cy="68" r={r} fill="none" stroke={C.bgAlt} strokeWidth="10"/>
        <circle cx="68" cy="68" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${(score/100)*circ} ${circ}`} strokeLinecap="round"
          style={{transition:"stroke-dasharray 1.3s cubic-bezier(.4,0,.2,1)"}}/>
      </svg>
      <div style={{textAlign:"center",zIndex:1}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,color,lineHeight:1}}>{score}</div>
        <div style={{fontSize:11,color:C.textLight,fontFamily:"'DM Mono',monospace",marginTop:2}}>/100</div>
      </div>
    </div>
  );
};

const MissingHeatmap=({headers,rows})=>{
  const MAX_ROWS=25,MAX_COLS=10;
  const dRows=rows.slice(0,MAX_ROWS),dCols=headers.slice(0,MAX_COLS);
  return(
    <div style={{overflowX:"auto"}}>
      <p style={{fontSize:11,color:C.textLight,marginBottom:12,fontFamily:"'DM Mono',monospace"}}>Showing first {dRows.length} rows × {dCols.length} columns</p>
      <div style={{display:"grid",gridTemplateColumns:`56px repeat(${dCols.length},1fr)`,gap:2}}>
        <div/>
        {dCols.map(h=>(
          <div key={h} style={{fontSize:8,color:C.textMid,textAlign:"center",fontFamily:"'DM Mono',monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h}</div>
        ))}
        {dRows.map((row,i)=>(
          <div key={i} style={{display:"contents"}}>
            <div style={{fontSize:9,color:C.textLight,fontFamily:"'DM Mono',monospace",display:"flex",alignItems:"center"}}>r{i+1}</div>
            {dCols.map(col=>{
              const miss=isMissing(row[col]);
              return <div key={col} style={{height:13,borderRadius:2,background:miss?"#e0505055":"#2d9b8a30"}} title={miss?`${col}: Missing`:`${col}: ${row[col]}`}/>;
            })}
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:16,marginTop:12,fontSize:11,color:C.textMid,fontFamily:"'DM Sans',sans-serif"}}>
        <span style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:12,height:12,background:"#e0505055",borderRadius:2,display:"inline-block"}}/>Missing</span>
        <span style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:12,height:12,background:"#2d9b8a30",borderRadius:2,display:"inline-block"}}/>Present</span>
      </div>
    </div>
  );
};

const DistChart=({vals,color=C.teal})=>{
  const nums=vals.map(v=>parseFloat(v)).filter(n=>!isNaN(n));
  if(nums.length<3)return <div style={{color:C.textLight,fontSize:12,textAlign:"center",padding:16,fontFamily:"'DM Sans',sans-serif"}}>Not enough data</div>;
  const mn=Math.min(...nums),mx=Math.max(...nums);
  const BINS=10,bs=(mx-mn)/BINS||1;
  const bins=Array(BINS).fill(0);
  nums.forEach(v=>{const i=Math.min(BINS-1,Math.floor((v-mn)/bs));bins[i]++;});
  const maxB=Math.max(...bins);
  return(
    <div>
      <div style={{display:"flex",alignItems:"flex-end",gap:2,height:56}}>
        {bins.map((b,i)=>(
          <div key={i} style={{flex:1,background:color,borderRadius:"3px 3px 0 0",height:`${(b/maxB)*50}px`,minHeight:b>0?3:0,transition:"height .8s ease",opacity:.8}}/>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:10,color:C.textLight,fontFamily:"'DM Mono',monospace"}}>
        <span>{mn.toFixed(1)}</span><span>{mx.toFixed(1)}</span>
      </div>
    </div>
  );
};

const Donut=({data})=>{
  const total=data.reduce((s,d)=>s+d.v,0);
  if(!total)return <div style={{color:C.textLight,textAlign:"center",padding:24,fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>No issues detected</div>;
  let off=0;const r=40,circ=2*Math.PI*r;
  const slices=data.filter(d=>d.v>0).map(d=>{const len=(d.v/total)*circ,s={...d,len,off};off+=len;return s;});
  return(
    <div style={{display:"flex",alignItems:"center",gap:24,flexWrap:"wrap"}}>
      <svg width="104" height="104" style={{transform:"rotate(-90deg)",flexShrink:0}}>
        {slices.map((s,i)=>(
          <circle key={i} cx="52" cy="52" r={r} fill="none" stroke={s.c} strokeWidth="14"
            strokeDasharray={`${s.len} ${circ-s.len}`} strokeDashoffset={-s.off}/>
        ))}
        <circle cx="52" cy="52" r="26" fill={C.surface}/>
        <text x="52" y="52" textAnchor="middle" dominantBaseline="central"
          style={{transform:"rotate(90deg)",transformOrigin:"52px 52px",fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,fill:C.teal}}>
          {total}
        </text>
      </svg>
      <div style={{flex:1}}>{slices.map((s,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
          <div style={{width:10,height:10,borderRadius:2,background:s.c,flexShrink:0}}/>
          <span style={{fontSize:12,color:C.textMid,flex:1,fontFamily:"'DM Sans',sans-serif"}}>{s.l}</span>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.text,fontWeight:500}}>{s.v}</span>
        </div>
      ))}</div>
    </div>
  );
};

const AccBar=({label,raw,clean})=>{
  const diff=(clean-raw).toFixed(1);
  return(
    <div style={{marginBottom:18}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,flexWrap:"wrap",gap:4}}>
        <span style={{fontSize:13,fontWeight:500,color:C.text,fontFamily:"'DM Sans',sans-serif"}}>{label}</span>
        <div style={{display:"flex",gap:12}}>
          <span style={{fontSize:11,color:C.textLight,fontFamily:"'DM Mono',monospace"}}>raw {raw}%</span>
          <span style={{fontSize:11,color:C.green,fontFamily:"'DM Mono',monospace"}}>clean {clean}%</span>
          <span style={{fontSize:11,color:C.teal,fontFamily:"'DM Mono',monospace",fontWeight:500}}>+{diff}%</span>
        </div>
      </div>
      <div style={{position:"relative",height:8,background:C.bgAlt,borderRadius:99,overflow:"hidden"}}>
        <div style={{position:"absolute",height:"100%",width:`${raw}%`,background:C.borderDark,borderRadius:99}}/>
        <div style={{position:"absolute",height:"100%",width:`${clean}%`,background:`linear-gradient(90deg,${C.teal},${C.green})`,borderRadius:99}}/>
      </div>
    </div>
  );
};

const STEPS=["Upload","Scan","Score","Visualise","Explain","Cleanse","ML","Export"];
const StepBar=({current})=>(
  <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"0 32px",overflowX:"auto"}}>
    <div style={{display:"flex",alignItems:"center",height:52,minWidth:560}}>
      {STEPS.map((s,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",flex:i<STEPS.length-1?1:"none"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
            <div style={{width:24,height:24,borderRadius:6,
              background:current>i?C.teal:current===i?C.tealPale:C.bgAlt,
              border:`1.5px solid ${current>=i?C.teal:C.border}`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,
              color:current>i?C.white:current===i?C.teal:C.textLight,
              fontFamily:"'DM Mono',monospace",transition:"all .25s",fontWeight:500}}>
              {current>i?"✓":i+1}
            </div>
            <span style={{fontSize:11,fontWeight:current>=i?600:400,color:current>=i?C.teal:C.textLight,whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif"}}>{s}</span>
          </div>
          {i<STEPS.length-1&&<div style={{flex:1,height:1.5,background:current>i?C.teal:C.border,margin:"0 8px",transition:"background .25s",minWidth:12}}/>}
        </div>
      ))}
    </div>
  </div>
);

// ══════════════════════════════════
// MAIN APP
// ══════════════════════════════════
export default function VeritasData(){
  const [step,setStep]=useState(0);
  const [fileName,setFileName]=useState("");
  const [parsedData,setParsedData]=useState(null);
  const [result,setResult]=useState(null);
  const [fixResult,setFixResult]=useState(null);
  const [mlRaw,setMlRaw]=useState(null);
  const [mlClean,setMlClean]=useState(null);
  const [mlLoading,setMlLoading]=useState(false);
  const [activeTab,setActiveTab]=useState("score");
  const [expandedIssue,setExpandedIssue]=useState(null);
  const [filterSev,setFilterSev]=useState("all");
  const [dragOver,setDragOver]=useState(false);
  const [selectedCol,setSelectedCol]=useState(null);
  const fileRef=useRef();

  const SAMPLE=`StudentID,Name,Age,Grade,Score,JoinDate,Email
101,Alice,20,A,95,2023-01-15,alice@gmail.com
102,Bob,,B,82,15/01/2023,bob@gmail.com
103,Carol,19,A,105,2023-03-20,carol@gmail.com
104,Dave,25,C,78,20-03-2023,dave@gmail.com
101,Alice,20,A,95,2023-01-15,alice@gmail.com
105,Eve,-5,B,88,2023-04-10,eve@gmail.com
106,Frank,21,A,N/A,2023-05-15,frank@gmail.com
107,Grace,19,,72,2023-06-01,grace@gmail.com
108,Henry,999,B,65,01/06/2023,henry@gmail.com
109,Ivy,22,A,,2023-07-20,ivy@gmail.com
110,Jack,20,B,90,2023-07-20,jack@gmail.com
111,Karen,,C,55,20-07-2023,karen@gmail.com
112,Leo,18,A,88,2023-08-05,leo@gmail.com`;

  const processFile=useCallback((text,name)=>{
    const parsed=parseFile(text,name);
    if(!parsed)return alert("Could not parse file. Please use CSV or JSON.");
    setFileName(name);setParsedData(parsed);
    const r=analyzeDataset(parsed);
    setResult(r);setStep(2);setActiveTab("score");
    setFixResult(null);setMlRaw(null);setMlClean(null);
  },[]);

  const handleFile=f=>{
    if(!f)return;
    const name=f.name.toLowerCase();
    if(name.endsWith(".xlsx")||name.endsWith(".xls")){
      const rd=new FileReader();
      rd.onload=async e=>{
        try{
          const parsed=await parseXLSX(new Uint8Array(e.target.result));
          if(!parsed)return alert("Could not parse Excel file. Please check the file is not empty.");
          setFileName(f.name);setParsedData(parsed);
          const r=analyzeDataset(parsed);
          setResult(r);setStep(2);setActiveTab("score");
          setFixResult(null);setMlRaw(null);setMlClean(null);
        }catch(err){alert("Error reading Excel file: "+err.message);}
      };
      rd.readAsArrayBuffer(f);
    }else{
      const rd=new FileReader();
      rd.onload=e=>processFile(e.target.result,f.name);
      rd.readAsText(f);
    }
  };
  const handleClean=()=>{if(!parsedData||!result)return;const fr=autoFixDataset(parsedData.rows,parsedData.headers,result.colStats);setFixResult(fr);setStep(5);setActiveTab("clean");};
  const handleML=()=>{
    if(!parsedData||!result)return;setMlLoading(true);setActiveTab("ml");
    setTimeout(()=>{
      const raw=simulateML(parsedData.rows,result.colStats,parsedData.headers,false);
      const cleanRows=fixResult?.rows||parsedData.rows;
      const cleanAnalysis=analyzeDataset({headers:parsedData.headers,rows:cleanRows});
      const clean=simulateML(cleanRows,cleanAnalysis.colStats,parsedData.headers,true);
      setMlRaw(raw);setMlClean(clean);setMlLoading(false);setStep(6);
    },2000);
  };
  const handleDownload=()=>{
    const rows=fixResult?.rows||parsedData?.rows;
    if(!rows)return;
    exportCSV(rows,parsedData.headers,`veritasdata_clean_${fileName}`);
    setStep(7);
  };

  const filteredIssues=result?.issues.filter(i=>filterSev==="all"||i.severity===filterSev)||[];
  const scoreColor=result?.score>=80?C.green:result?.score>=55?C.amber:C.red;

  const tabs=[
    {id:"score",label:"Health Score"},
    {id:"heatmap",label:"Heatmap"},
    {id:"charts",label:"Distribution"},
    {id:"issues",label:`Issues (${result?.issues.length||0})`},
    {id:"columns",label:"Columns"},
    {id:"clean",label:"Cleanse"},
    {id:"ml",label:"ML Compare"},
  ];

  // ── UPLOAD PAGE ──
  if(step===0||!result)return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif"}}>
      <Fonts/>
      {/* Top nav bar */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"0 40px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,borderRadius:8,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:C.white,fontSize:14,fontWeight:700,fontFamily:"'Syne',sans-serif"}}>V</span>
          </div>
          <span style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,color:C.text,letterSpacing:-.3}}>Veritas<span style={{color:C.teal}}>Data</span></span>
        </div>
        <Tag>v2.0</Tag>
      </div>

      <div style={{maxWidth:960,margin:"0 auto",padding:"64px 24px 40px"}}>
        {/* Hero */}
        <div style={{textAlign:"center",marginBottom:56}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.tealPale,border:`1px solid ${C.tealBorder}`,borderRadius:99,padding:"5px 14px",marginBottom:24}}>
            <div style={{width:6,height:6,borderRadius:99,background:C.teal,animation:"pulse 2s infinite"}}/>
            <span style={{fontSize:11,fontWeight:600,color:C.teal,fontFamily:"'DM Mono',monospace",letterSpacing:.5}}>DATA QUALITY PLATFORM</span>
          </div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:52,fontWeight:800,color:C.text,lineHeight:1.1,marginBottom:16,letterSpacing:"-1.5px"}}>
            Detect. Cleanse.<br/><span style={{color:C.teal}}>Trust your data.</span>
          </h1>
          <p style={{color:C.textMid,fontSize:17,lineHeight:1.75,maxWidth:480,margin:"0 auto",fontWeight:400}}>
            Upload any CSV or JSON file to instantly scan for quality issues, auto-cleanse, and measure ML accuracy improvements.
          </p>
        </div>

        {/* Upload box */}
        <div style={{maxWidth:560,margin:"0 auto 32px"}}>
          <div className="dz" onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)}
            onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0]);}}
            onClick={()=>fileRef.current.click()}
            style={{border:`2px dashed ${dragOver?C.teal:C.borderDark}`,borderRadius:C.rXl,padding:"48px 32px",textAlign:"center",cursor:"pointer",background:dragOver?C.tealPale:C.white,transition:"all .2s",boxShadow:dragOver?`0 0 0 4px ${C.tealBorder}`:C.shadow}}>
            <input ref={fileRef} type="file" accept=".csv,.json,.xlsx,.xls" onChange={e=>handleFile(e.target.files[0])}/>
            <div style={{width:48,height:48,borderRadius:12,background:C.tealPale,border:`1px solid ${C.tealBorder}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:20}}>📂</div>
            <div style={{fontWeight:600,fontSize:15,color:C.text,marginBottom:6,fontFamily:"'DM Sans',sans-serif"}}>Drop your file here</div>
            <div style={{color:C.textLight,fontSize:13}}>CSV, JSON or Excel (.xlsx) — up to 10MB</div>
            <div style={{marginTop:16,display:"inline-flex",alignItems:"center",gap:6,background:C.teal,color:C.white,borderRadius:8,padding:"8px 20px",fontSize:13,fontWeight:600}}>Browse files</div>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:12,margin:"20px 0"}}>
            <div style={{flex:1,height:1,background:C.border}}/>
            <span style={{fontSize:12,color:C.textLight,fontFamily:"'DM Sans',sans-serif"}}>or try a sample</span>
            <div style={{flex:1,height:1,background:C.border}}/>
          </div>

          <button onClick={()=>processFile(SAMPLE,"sample_students.csv")}
            style={{width:"100%",background:C.white,border:`1.5px solid ${C.tealBorder}`,borderRadius:C.r,padding:"12px",fontWeight:500,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",color:C.teal,transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <span>🎓</span> Load sample student dataset
          </button>
        </div>

        {/* Feature pills */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
          {[["📊","Missing Value Heatmap"],["🔍","Outlier Detection"],["✨","Auto-Cleanse"],["🤖","ML Accuracy Comparison"],["📁","Export Clean CSV"],["📈","Quality Score"]].map(([icon,label])=>(
            <span key={label} className="pill" style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:99,padding:"6px 14px",fontSize:12,color:C.textMid,display:"flex",alignItems:"center",gap:6,cursor:"default"}}>
              <span>{icon}</span>{label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  // ── RESULTS PAGE ──
  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text}}>
      <Fonts/>
      {/* Nav */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",height:54,position:"sticky",top:0,zIndex:30,boxShadow:"0 1px 0 rgba(15,45,42,.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:26,height:26,borderRadius:7,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:C.white,fontSize:13,fontWeight:700,fontFamily:"'Syne',sans-serif"}}>V</span>
          </div>
          <span style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,color:C.text,letterSpacing:-.3}}>Veritas<span style={{color:C.teal}}>Data</span></span>
          <div style={{width:1,height:16,background:C.border,margin:"0 4px"}}/>
          <span style={{fontSize:12,color:C.textLight,background:C.bgAlt,border:`1px solid ${C.border}`,borderRadius:6,padding:"2px 10px",fontFamily:"'DM Mono',monospace"}}>{fileName}</span>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-ghost" onClick={handleDownload} style={{background:"transparent",color:C.teal,border:`1.5px solid ${C.tealBorder}`,borderRadius:8,padding:"6px 16px",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:500,transition:"all .15s"}}>↓ Download CSV</button>
          <button className="btn-primary" onClick={()=>{setStep(0);setResult(null);setParsedData(null);setFixResult(null);setMlRaw(null);setMlClean(null);}} style={{background:C.teal,color:C.white,border:"none",borderRadius:8,padding:"6px 16px",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,transition:"all .15s"}}>+ New File</button>
        </div>
      </div>

      <StepBar current={step}/>

      <div style={{maxWidth:1160,margin:"0 auto",padding:"24px 20px"}}>
        {/* Tabs */}
        <div style={{display:"flex",gap:1,marginBottom:20,background:C.white,borderRadius:C.r,border:`1px solid ${C.border}`,padding:4,overflowX:"auto",boxShadow:C.shadow}}>
          {tabs.map(({id,label})=>(
            <button key={id} className="tab-btn" onClick={()=>setActiveTab(id)}
              style={{background:activeTab===id?C.tealPale:"transparent",border:"none",borderRadius:8,
                padding:"7px 16px",color:activeTab===id?C.teal:C.textMid,fontWeight:activeTab===id?600:400,
                fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .15s",
                whiteSpace:"nowrap",outline:activeTab===id?`1.5px solid ${C.tealBorder}`:"none"}}>
              {label}
            </button>
          ))}
        </div>

        {/* SCORE TAB */}
        {activeTab==="score"&&(
          <div className="fade">
            <Card style={{padding:"28px 32px",marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:28,flexWrap:"wrap"}}>
                <ScoreRing score={result.score}/>
                <div style={{flex:1,minWidth:200}}>
                  <div style={{fontSize:11,color:C.textLight,fontFamily:"'DM Mono',monospace",marginBottom:6,letterSpacing:.5}}>QUALITY SCORE</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:scoreColor,marginBottom:8,letterSpacing:-.5}}>
                    {result.score>=80?"Data Integrity Confirmed":result.score>=55?"Anomalies Detected":"Critical Data Issues"}
                  </div>
                  <div style={{color:C.textMid,fontSize:14,lineHeight:1.7,maxWidth:440,marginBottom:18}}>
                    {result.score>=80?"Minor issues detected. Dataset is largely ready for analysis.":result.score>=55?"Several quality problems found. Cleanse before use in models.":"Serious issues detected. This data needs cleansing before use."}
                  </div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    <button className="btn-primary" onClick={()=>{setActiveTab("clean");handleClean();}} style={{background:C.teal,color:C.white,border:"none",borderRadius:8,padding:"9px 20px",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,transition:"all .15s"}}>Auto-Cleanse →</button>
                    <button className="btn-ghost" onClick={()=>setActiveTab("issues")} style={{background:"transparent",color:C.textMid,border:`1.5px solid ${C.border}`,borderRadius:8,padding:"9px 20px",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:500,transition:"all .15s"}}>View Issues</button>
                  </div>
                </div>
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  {[{l:"Rows",v:result.total,c:C.teal},{l:"Columns",v:result.cols,c:C.teal},{l:"Issues",v:result.issues.length,c:result.issues.length>0?C.red:C.green},{l:"Duplicates",v:result.dups,c:result.dups>0?C.amber:C.green}].map(({l,v,c})=>(
                    <div key={l} style={{background:C.surfaceUp,border:`1px solid ${C.border}`,borderRadius:C.r,padding:"14px 18px",textAlign:"center",minWidth:80}}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:c}}>{v}</div>
                      <div style={{fontSize:10,color:C.textLight,marginTop:3,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div style={{fontSize:11,fontWeight:600,color:C.textLight,fontFamily:"'DM Mono',monospace",marginBottom:10,letterSpacing:.5}}>COLUMN HEALTH</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10,marginBottom:16}}>
              {Object.entries(result.colStats).map(([col,s])=>{
                const hc=s.health>=80?C.green:s.health>=55?C.amber:C.red;
                return(
                  <Card key={col} className="hcard" style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>{setSelectedCol(col);setActiveTab("columns");}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div>
                        <div style={{fontWeight:600,fontSize:13,color:C.text,marginBottom:5}}>{col}</div>
                        <Tag color={C.teal} bg={C.tealPale}>{s.type}</Tag>
                      </div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:14,fontWeight:500,color:hc}}>{s.health}%</div>
                    </div>
                    <MiniBar pct={s.health} color={hc}/>
                    <div style={{display:"flex",gap:4,marginTop:8,flexWrap:"wrap"}}>
                      {s.missing>0&&<Tag color={C.red} bg={C.redSoft}>○ {s.missing} missing</Tag>}
                      {s.outliers>0&&<Tag color={C.amber} bg={C.amberSoft}>◎ {s.outliers} outlier{s.outliers>1?"s":""}</Tag>}
                      {s.issues.length===0&&<Tag color={C.green} bg={C.greenSoft}>✓ clean</Tag>}
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card style={{padding:22}}>
              <div style={{fontSize:11,fontWeight:600,color:C.textLight,fontFamily:"'DM Mono',monospace",marginBottom:16,letterSpacing:.5}}>ISSUE BREAKDOWN</div>
              <Donut data={[
                {l:"Missing Values",v:result.issues.filter(i=>i.type==="missing").length,c:C.red},
                {l:"Outliers",v:result.issues.filter(i=>i.type==="outlier").length,c:C.amber},
                {l:"Format Issues",v:result.issues.filter(i=>i.type==="format").length,c:C.teal},
                {l:"Type Mismatches",v:result.issues.filter(i=>i.type==="type").length,c:C.purple},
                {l:"Duplicates",v:result.issues.filter(i=>i.type==="duplicate").length,c:C.green},
              ]}/>
            </Card>
          </div>
        )}

        {activeTab==="heatmap"&&(
          <div className="fade">
            <Card style={{padding:24,marginBottom:14}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,color:C.text,marginBottom:4}}>Missing Value Heatmap</div>
              <p style={{color:C.textMid,fontSize:13,marginBottom:20,lineHeight:1.6}}>Each cell represents one data point. Red cells indicate missing data.</p>
              <MissingHeatmap headers={parsedData.headers} rows={parsedData.rows}/>
            </Card>
            <Card style={{padding:22}}>
              <div style={{fontSize:11,fontWeight:600,color:C.textLight,fontFamily:"'DM Mono',monospace",marginBottom:14,letterSpacing:.5}}>MISSING % PER COLUMN</div>
              {parsedData.headers.map(col=>{
                const s=result.colStats[col];
                const c=s.missingPct>30?C.red:s.missingPct>10?C.amber:C.green;
                return(
                  <div key={col} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{width:110,fontSize:12,fontWeight:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{col}</div>
                    <div style={{flex:1}}><MiniBar pct={s.missingPct} color={c} height={7}/></div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:c,width:44,textAlign:"right"}}>{s.missingPct.toFixed(1)}%</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight,width:52,textAlign:"right"}}>{s.missing}/{s.total}</div>
                  </div>
                );
              })}
            </Card>
          </div>
        )}

        {activeTab==="charts"&&(
          <div className="fade">
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
              {parsedData.headers.map(col=>{
                const s=result.colStats[col];
                const vals=parsedData.rows.map(r=>r[col]).filter(v=>!isMissing(v));
                return(
                  <Card key={col} style={{padding:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                      <div>
                        <div style={{fontWeight:600,fontSize:13,color:C.text,marginBottom:5}}>{col}</div>
                        <Tag>{s.type}</Tag>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:9,color:C.textLight,fontFamily:"'DM Mono',monospace",marginBottom:2}}>UNIQUE</div>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:500,color:C.teal}}>{s.unique}</div>
                      </div>
                    </div>
                    {s.type==="numeric"?(
                      <>
                        <DistChart vals={vals} color={C.teal}/>
                        <div style={{display:"flex",justifyContent:"space-around",marginTop:10}}>
                          {[["min",s.min?.toFixed(1)],["avg",s.avg?.toFixed(1)],["max",s.max?.toFixed(1)]].map(([l,v])=>(
                            <div key={l} style={{textAlign:"center"}}>
                              <div style={{fontSize:9,color:C.textLight,fontFamily:"'DM Mono',monospace",marginBottom:2}}>{l}</div>
                              <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:500,color:C.text}}>{v??"-"}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    ):(
                      s.topVals.slice(0,5).map(([v,cnt])=>(
                        <div key={v} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                          <span style={{fontSize:12,color:C.text,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v||"(empty)"}</span>
                          <div style={{width:56}}><MiniBar pct={(cnt/(s.topVals[0]?.[1]||1))*100} color={C.teal}/></div>
                          <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight,width:16,textAlign:"right"}}>{cnt}</span>
                        </div>
                      ))
                    )}
                    {s.outliers>0&&<div style={{marginTop:10,padding:"5px 10px",background:C.amberSoft,borderRadius:6,fontSize:11,color:C.amber,fontWeight:500}}>◎ {s.outliers} outlier{s.outliers>1?"s":""} detected</div>}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeTab==="issues"&&(
          <div className="fade">
            <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
              {["all","high","medium","low"].map(s=>(
                <button key={s} onClick={()=>setFilterSev(s)}
                  style={{background:filterSev===s?C.tealPale:C.white,color:filterSev===s?C.teal:C.textMid,border:`1.5px solid ${filterSev===s?C.tealBorder:C.border}`,borderRadius:8,padding:"6px 16px",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:filterSev===s?600:400,transition:"all .15s"}}>
                  {s==="all"?`All (${result.issues.length})`:`${s[0].toUpperCase()+s.slice(1)} (${result.issues.filter(i=>i.severity===s).length})`}
                </button>
              ))}
            </div>
            {filteredIssues.length===0?(
              <Card style={{padding:60,textAlign:"center",color:C.textLight,fontSize:14}}>No issues at this severity level</Card>
            ):filteredIssues.map((issue,idx)=>{
              const isOpen=expandedIssue===idx;
              const ic={missing:"○",outlier:"◎",format:"◫",type:"⊞",duplicate:"⧉"}[issue.type]||"!";
              return(
                <Card key={idx} style={{marginBottom:8,overflow:"hidden",border:isOpen?`1.5px solid ${C.tealBorder}`:`1px solid ${C.border}`}}>
                  <div className="irow" onClick={()=>setExpandedIssue(isOpen?null:idx)}
                    style={{padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,transition:"background .1s"}}>
                    <div style={{display:"flex",alignItems:"center",gap:12,flex:1}}>
                      <div style={{width:34,height:34,borderRadius:8,background:C.bgAlt,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,color:C.teal,fontWeight:600}}>
                        {ic}
                      </div>
                      <div>
                        <div style={{fontWeight:600,fontSize:14,color:C.text,marginBottom:2}}>{issue.title}</div>
                        <div style={{fontSize:11,color:C.textLight,fontFamily:"'DM Mono',monospace"}}>
                          {issue.column}{issue.count>0&&` · ${issue.count} rows affected`}
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <Badge sev={issue.severity}/>
                      <span style={{color:C.textLight,fontSize:10,fontFamily:"'DM Mono',monospace"}}>{isOpen?"▲":"▼"}</span>
                    </div>
                  </div>
                  {isOpen&&(
                    <div style={{borderTop:`1px solid ${C.border}`,padding:16,background:C.surfaceUp,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      {[
                        {label:"What's wrong",c:C.teal,bg:C.tealPale,text:issue.explanation},
                        {label:"Why it matters",c:C.amber,bg:C.amberSoft,text:issue.impact},
                      ].map(({label,c,bg,text})=>(
                        <div key={label} style={{background:bg,borderRadius:C.r,padding:"12px 14px",border:`1px solid ${c}20`}}>
                          <div style={{fontSize:10,fontWeight:700,color:c,marginBottom:6,fontFamily:"'DM Mono',monospace",letterSpacing:.5}}>{label.toUpperCase()}</div>
                          <div style={{fontSize:13,color:C.textMid,lineHeight:1.65}}>{text}</div>
                        </div>
                      ))}
                      <div style={{background:C.greenSoft,borderRadius:C.r,padding:"12px 14px",border:`1px solid ${C.green}25`,gridColumn:"span 2"}}>
                        <div style={{fontSize:10,fontWeight:700,color:C.green,marginBottom:6,fontFamily:"'DM Mono',monospace",letterSpacing:.5}}>HOW TO FIX</div>
                        <div style={{fontSize:13,color:C.textMid,lineHeight:1.65}}>{issue.fix}</div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {activeTab==="columns"&&(
          <div className="fade">
            <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
              {parsedData.headers.map(col=>(
                <button key={col} onClick={()=>setSelectedCol(col===selectedCol?null:col)}
                  style={{background:selectedCol===col?C.tealPale:C.white,color:selectedCol===col?C.teal:C.textMid,border:`1.5px solid ${selectedCol===col?C.tealBorder:C.border}`,borderRadius:8,padding:"6px 14px",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:selectedCol===col?600:400,transition:"all .15s"}}>
                  {col}
                </button>
              ))}
            </div>
            {!selectedCol?(
              <Card style={{padding:60,textAlign:"center",color:C.textLight,fontSize:14}}>Select a column above to inspect</Card>
            ):(()=>{
              const s=result.colStats[selectedCol];
              const vals=parsedData.rows.map(r=>r[selectedCol]).filter(v=>!isMissing(v));
              const hc=s.health>=80?C.green:s.health>=55?C.amber:C.red;
              return(
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:10,marginBottom:14}}>
                    {[
                      {l:"Type",v:s.type},{l:"Total",v:s.total},
                      {l:"Missing",v:`${s.missing} (${s.missingPct.toFixed(1)}%)`,c:s.missing>0?C.red:C.green},
                      {l:"Unique",v:s.unique},{l:"Health",v:`${s.health}%`,c:hc},
                      ...(s.type==="numeric"?[{l:"Min",v:s.min?.toFixed(2)},{l:"Max",v:s.max?.toFixed(2)},{l:"Mean",v:s.avg?.toFixed(2)},{l:"Median",v:s.median?.toFixed(2)},{l:"Std Dev",v:s.std?.toFixed(2)},{l:"Outliers",v:s.outliers,c:s.outliers>0?C.amber:C.green}]:[]),
                    ].filter(Boolean).map(({l,v,c})=>(
                      <Card key={l} style={{padding:"12px 14px"}}>
                        <div style={{fontSize:9,color:C.textLight,fontFamily:"'DM Mono',monospace",marginBottom:4,letterSpacing:.5}}>{l.toUpperCase()}</div>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:14,fontWeight:500,color:c||C.teal}}>{v??"-"}</div>
                      </Card>
                    ))}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                    <Card style={{padding:16}}>
                      <div style={{fontSize:11,fontWeight:600,color:C.textLight,fontFamily:"'DM Mono',monospace",marginBottom:12,letterSpacing:.5}}>{s.type==="numeric"?"DISTRIBUTION":"TOP VALUES"}</div>
                      {s.type==="numeric"?<DistChart vals={vals} color={C.teal}/>:s.topVals.map(([v,cnt])=>(
                        <div key={v} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                          <span style={{fontSize:12,color:C.text,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v}</span>
                          <div style={{width:64}}><MiniBar pct={(cnt/(s.topVals[0]?.[1]||1))*100} color={C.teal}/></div>
                          <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight,width:18,textAlign:"right"}}>{cnt}</span>
                        </div>
                      ))}
                    </Card>
                    <Card style={{padding:16}}>
                      <div style={{fontSize:11,fontWeight:600,color:C.textLight,fontFamily:"'DM Mono',monospace",marginBottom:12,letterSpacing:.5}}>ISSUES</div>
                      {s.issues.length===0?(
                        <div style={{color:C.green,fontSize:13,padding:16,textAlign:"center",fontWeight:500}}>✓ No issues found</div>
                      ):s.issues.map((iss,i)=>(
                        <div key={i} style={{marginBottom:8,padding:"10px 12px",background:C.bgAlt,borderRadius:C.r,border:`1px solid ${C.border}`}}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                            <span style={{fontWeight:600,fontSize:13}}>{iss.title}</span>
                            <Badge sev={iss.severity}/>
                          </div>
                          <div style={{fontSize:12,color:C.textMid,lineHeight:1.55}}>{iss.explanation}</div>
                        </div>
                      ))}
                    </Card>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {activeTab==="clean"&&(
          <div className="fade">
            <Card style={{padding:26,marginBottom:16}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700,color:C.text,marginBottom:6,letterSpacing:-.3}}>Automatic Data Cleansing</div>
              <p style={{color:C.textMid,fontSize:14,lineHeight:1.65,maxWidth:560,marginBottom:20}}>Each cell is filled individually using its own column statistics — no value shifting or misalignment.</p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
                {[
                  {icon:"○",label:"Fill missing values with column median — no rows deleted",c:C.green,bg:C.greenSoft},
                  {icon:"◫",label:"Remove exact duplicate rows only",c:C.teal,bg:C.tealPale},
                  {icon:"↔",label:"Convert word numbers to digits (e.g. 'twenty' → 20)",c:C.purple,bg:C.purpleSoft},
                  {icon:"📅",label:"Standardise all dates to YYYY/MM/DD format",c:C.tealDark,bg:C.tealPale},
                ].map(({icon,label,c,bg})=>(
                  <div key={label} style={{display:"flex",alignItems:"center",gap:8,background:bg,borderRadius:C.r,padding:"10px 14px",fontSize:13,color:c,fontWeight:500,flex:"1 1 200px",border:`1px solid ${c}25`}}>
                    <span style={{fontSize:15,flexShrink:0}}>{icon}</span>{label}
                  </div>
                ))}
              </div>
              {!fixResult?(
                <button className="btn-primary" onClick={handleClean} style={{background:C.teal,color:C.white,border:"none",borderRadius:8,padding:"11px 28px",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .15s"}}>
                  Run Auto-Cleanse →
                </button>
              ):(
                <div style={{background:C.greenSoft,border:`1px solid ${C.green}30`,borderRadius:C.r,padding:"14px 18px"}}>
                  <div style={{fontWeight:700,color:C.green,fontSize:13,marginBottom:8}}>✓ Cleansing complete</div>
                  <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:8}}>
                    {fixResult.log.map((l,i)=>(
                      <span key={i} style={{fontSize:13,color:l.color,fontWeight:500,display:"flex",alignItems:"center",gap:4}}><span>{l.icon}</span>{l.text}</span>
                    ))}
                  </div>
                  <div style={{fontSize:12,color:C.textMid,fontFamily:"'DM Mono',monospace"}}>{parsedData.rows.length} rows → <span style={{color:C.green}}>{fixResult.rows.length} clean rows</span></div>
                </div>
              )}
            </Card>
            {fixResult&&(
              <>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12,marginBottom:16}}>
                  {[
                    {l:"Values Filled",v:fixResult.stats.filledCount,c:C.green,icon:"○"},
                    {l:"Dupes Removed",v:fixResult.stats.removedDups,c:C.teal,icon:"◫"},
                    {l:"Text→Numbers",v:fixResult.stats.convertedCount||0,c:C.purple,icon:"↔"},
                    {l:"Dates Fixed",v:fixResult.stats.dateFixedCount||0,c:C.tealDark,icon:"📅"},
                  ].map(({l,v,c,icon})=>(
                    <Card key={l} style={{padding:"18px 20px",textAlign:"center"}}>
                      <div style={{fontSize:22,marginBottom:6,color:c}}>{icon}</div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:c}}>{v}</div>
                      <div style={{fontSize:11,color:C.textLight,marginTop:4,fontWeight:500}}>{l}</div>
                    </Card>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
                  {[{title:"Original Dataset",rows:parsedData.rows,highlight:false},{title:"Cleansed Dataset",rows:fixResult.rows,highlight:true}].map(({title,rows,highlight})=>(
                    <Card key={title} style={{overflow:"hidden"}}>
                      <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`,fontWeight:600,fontSize:12,color:highlight?C.teal:C.textMid,display:"flex",justifyContent:"space-between",background:C.surfaceUp}}>
                        <span>{highlight?"✓ ":""}{title}</span><span style={{color:C.textLight,fontFamily:"'DM Mono',monospace"}}>{rows.length} rows</span>
                      </div>
                      <div style={{overflowX:"auto"}}>
                        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                          <thead>
                            <tr style={{background:C.bgAlt}}>
                              <th style={{padding:"6px 10px",textAlign:"left",color:C.textLight,fontFamily:"'DM Mono',monospace",fontSize:9,borderBottom:`1px solid ${C.border}`}}>#</th>
                              {parsedData.headers.map(h=>(
                                <th key={h} style={{padding:"6px 10px",textAlign:"left",color:C.teal,fontFamily:"'DM Mono',monospace",fontSize:9,borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap"}}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.slice(0,12).map((row,i)=>(
                              <tr key={i} style={{borderBottom:`1px solid ${C.border}`}}>
                                <td style={{padding:"5px 10px",color:C.textLight,fontFamily:"'DM Mono',monospace",fontSize:10}}>{i+1}</td>
                                {parsedData.headers.map(h=>{
                                  const v=row[h];const origV=parsedData.rows[i]?.[h];
                                  const wasFilled=highlight&&!isMissing(v)&&isMissing(origV);
                                  return(
                                    <td key={h} style={{padding:"5px 10px",fontFamily:"'DM Mono',monospace",fontSize:10,whiteSpace:"nowrap",background:wasFilled?C.greenSoft:(!highlight&&isMissing(v))?C.redSoft:"transparent",color:wasFilled?C.green:(!highlight&&isMissing(v))?C.red:C.text}}>
                                      {isMissing(v)?<em style={{opacity:.35,fontStyle:"normal"}}>—</em>:v}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  ))}
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button className="btn-primary" onClick={handleDownload} style={{background:C.teal,color:C.white,border:"none",borderRadius:8,padding:"11px 24px",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .15s"}}>↓ Download Cleansed CSV</button>
                  <button className="btn-ghost" onClick={handleML} style={{background:"transparent",color:C.teal,border:`1.5px solid ${C.tealBorder}`,borderRadius:8,padding:"11px 24px",fontWeight:500,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .15s"}}>Run ML Comparison →</button>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab==="ml"&&(
          <div className="fade">
            {mlLoading?(
              <Card style={{padding:60,textAlign:"center"}}>
                <div style={{width:40,height:40,border:`3px solid ${C.bgAlt}`,borderTopColor:C.teal,borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 20px"}}/>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,color:C.text,marginBottom:6}}>Training ML Models</div>
                <div style={{color:C.textLight,fontSize:13}}>Comparing raw vs cleansed performance…</div>
              </Card>
            ):!mlRaw?(
              <Card style={{padding:52,textAlign:"center"}}>
                <div style={{width:56,height:56,borderRadius:14,background:C.tealPale,border:`1px solid ${C.tealBorder}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:24}}>🤖</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:C.text,marginBottom:8,letterSpacing:-.3}}>ML Accuracy Comparison</div>
                <p style={{color:C.textMid,fontSize:14,lineHeight:1.7,maxWidth:400,margin:"0 auto 24px"}}>Simulate a Logistic Regression model on raw vs cleansed data and compare accuracy, precision, recall, and F1 score.</p>
                {!fixResult&&<div style={{background:C.amberSoft,border:`1px solid ${C.amber}25`,borderRadius:C.r,padding:"10px 18px",fontSize:13,color:C.amber,marginBottom:20,maxWidth:380,margin:"0 auto 20px",fontWeight:500}}>Apply Cleanse first for better accuracy gain</div>}
                <button className="btn-primary" onClick={handleML} style={{background:C.teal,color:C.white,border:"none",borderRadius:8,padding:"12px 32px",fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .15s"}}>Run Comparison →</button>
              </Card>
            ):(
              <div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
                  {[{l:"Accuracy Gain",v:`+${(mlClean.accuracy-mlRaw.accuracy).toFixed(1)}%`,c:C.green},{l:"Raw Accuracy",v:`${mlRaw.accuracy}%`,c:C.red},{l:"Clean Accuracy",v:`${mlClean.accuracy}%`,c:C.green},{l:"F1 Improvement",v:`+${(mlClean.f1-mlRaw.f1).toFixed(1)}%`,c:C.teal}].map(({l,v,c})=>(
                    <Card key={l} style={{padding:"18px 20px",textAlign:"center"}}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:c,marginBottom:4}}>{v}</div>
                      <div style={{fontSize:10,color:C.textLight,fontWeight:600,fontFamily:"'DM Mono',monospace",letterSpacing:.5}}>{l.toUpperCase()}</div>
                    </Card>
                  ))}
                </div>
                <Card style={{padding:24,marginBottom:12}}>
                  <div style={{fontSize:11,fontWeight:600,color:C.textLight,fontFamily:"'DM Mono',monospace",marginBottom:20,letterSpacing:.5}}>MODEL PERFORMANCE — RAW VS CLEANSED</div>
                  <AccBar label="Accuracy" raw={mlRaw.accuracy} clean={mlClean.accuracy}/>
                  <AccBar label="Precision" raw={mlRaw.precision} clean={mlClean.precision}/>
                  <AccBar label="Recall" raw={mlRaw.recall} clean={mlClean.recall}/>
                  <AccBar label="F1 Score" raw={mlRaw.f1} clean={mlClean.f1}/>
                </Card>
                <Card style={{padding:22}}>
                  <div style={{fontSize:11,fontWeight:600,color:C.textLight,fontFamily:"'DM Mono',monospace",marginBottom:14,letterSpacing:.5}}>WHY CLEANSING IMPROVES ACCURACY</div>
                  {[{icon:"○",title:"Missing values filled",text:"Complete data gives the model more signal to learn from, improving reliability across all metrics."},
                    {icon:"◫",title:"Duplicates removed",text:"Duplicate rows cause over-fitting on repeated examples, reducing the model's ability to generalise."},
                    {icon:"◎",title:"Outliers removed",text:"Extreme values shift the decision boundary, reducing accuracy on normal data points."},
                  ].map(({icon,title,text})=>(
                    <div key={title} style={{display:"flex",gap:12,marginBottom:12,padding:"12px 14px",background:C.bgAlt,borderRadius:C.r,border:`1px solid ${C.border}`}}>
                      <span style={{fontSize:18,flexShrink:0,color:C.teal}}>{icon}</span>
                      <div>
                        <div style={{fontWeight:600,fontSize:13,color:C.text,marginBottom:3}}>{title}</div>
                        <div style={{fontSize:12,color:C.textMid,lineHeight:1.6}}>{text}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{marginTop:10,padding:"10px 14px",background:C.tealPale,borderRadius:C.r,fontSize:12,color:C.textMid,border:`1px solid ${C.tealBorder}`}}>
                    ℹ️ Results use a simulated Logistic Regression model for demonstration purposes.
                  </div>
                </Card>
                <div style={{marginTop:14}}>
                  <button className="btn-primary" onClick={handleDownload} style={{background:C.teal,color:C.white,border:"none",borderRadius:8,padding:"11px 24px",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .15s"}}>↓ Download Cleansed Dataset</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
