/* Exact salary-constrained selection; integer half-cent/half-point units avoid rounding ties. */
window.WeeklyOptimals={solve(input,cap=50000){
 const players=input.filter(p=>Number.isFinite(p.points)&&Number.isFinite(p.salary)&&p.salary>=0).slice().sort((a,b)=>a.name.localeCompare(b.name));
 const teams=[...new Set(players.map(p=>p.team))];
 if(teams.length!==2||players.length<6)return null;
 if(new Set(players.map(p=>p.team+'|'+p.name)).size!==players.length)throw Error('Duplicate players in salary pool.');
 const limit=Math.round(cap*200);let best=null;
 for(let c=0;c<players.length;c++){
  const captain=players[c],cost=Math.round(captain.salary*300);if(cost>limit)continue;
  const dp=Array.from({length:6},()=>new Map());
  dp[0].set(cost*4+(1<<teams.indexOf(captain.team)),{cost,mask:1<<teams.indexOf(captain.team),score:Math.round(captain.points*100)*3,picks:[]});
  for(let i=0;i<players.length;i++){
   if(i===c)continue;const p=players[i],price=Math.round(p.salary*200),mask=1<<teams.indexOf(p.team),points=Math.round(p.points*100)*2;
   for(let n=4;n>=0;n--)for(const s of dp[n].values()){
    const total=s.cost+price;if(total>limit)continue;
    const m=s.mask|mask,k=total*4+m,score=s.score+points,old=dp[n+1].get(k);
    if(!old||score>old.score)dp[n+1].set(k,{cost:total,mask:m,score,picks:[...s.picks,i]});
   }
  }
  for(const s of dp[5].values())if(s.mask===3&&(!best||s.score>best.units||(s.score===best.units&&s.cost<best.cost)))best={units:s.score,cost:s.cost,captain,flex:s.picks.map(i=>players[i])};
 }
 return best?{captain:best.captain,flex:best.flex,points:best.units/200,salary:best.cost/200}:null;
}};
