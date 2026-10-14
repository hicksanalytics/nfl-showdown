/* Subjective field-interest priors, not measured ownership or optimal-lineup probabilities. */
window.DESK_OWNERSHIP={date:'2026-10-12',source:'Analyst assumptions informed by current salaries, Weeks 1–4 logs and public pregame coverage; no calibrated ownership feed.',sources:[['Bills injury report','https://www.buffalobills.com/news/buffalo-bills-injury-report-vs-rams-week-5'],['Rams Ferguson IR update','https://www.therams.com/news/rams-injury-updates-bills-week-5-2026-jaylen-watson-aaron-donald-terrance-ferguson-monday-night-football'],['DraftKings public slate preview','https://dknetwork.draftkings.com/2026/10/11/bills-vs-rams-nfl-dfs-showdown-picks-and-strategy-for-monday-night-football-2/'],['DraftKings public value discussion','https://dknetwork.draftkings.com/2026/10/12/rams-vs-bills-nfl-dfs-value-picks-for-monday-night-football/']],
priors:{
 'Josh Allen':[24,55,'Rushing TDs and name recognition make him a likely field anchor.'],
 'Puka Nacua':[23,43,'Week 4 return, 12 targets and 30.7 DK points draw Captain interest.'],
 'Kyren Williams':[15,38,'Recent 36.7 DK game and receiving work attract ceiling seekers.'],
 'Davante Adams':[12,34,'Adams TD concentration can beat Puka; his biggest weeks came without Puka.'],
 'James Cook III':[8,22,'Expensive relative to passing-game usage; Buffalo rushing dominance is the pivot story.'],
 'Matthew Stafford':[7,52,'Natural FLEX partner for popular Rams receiver Captains; needs passing TDs.'],
 'Keon Coleman':[4,33,'Recent 26.6 DK game and Palmer absence attract value seekers; Moore matters.'],
 'Dalton Kincaid':[2,24,'Early-season ceiling versus two quiet weeks; Buffalo middle-field passing pivot.'],
 'Tyler Higbee':[2,40,'Ferguson IR and $4,400 salary are widely discussed; likely value chalk.'],
 'Khalil Shakir':[1,24,'Short-area receptions; more field interest if Moore is ruled out.'],
 'Harrison Mevis':[0.5,22,'Accessible salary; useful in a Rams drives-stall script.'],
 'Tyler Bass':[0.4,20,'Salary relief; Buffalo drives stalling short of TDs is the payoff.'],
 'Rams':[0.3,10,'Pressure and turnovers; runs against a clean shootout assumption.'],
 'Bills':[0.2,9,'Stafford turnovers create upside, but points allowed can hurt.'],
 'Skyler Bell':[0.1,16,'Cheap players can become popular; verify routes, targets and your imported salaries.'],
 'DJ Moore':[1,12,'Questionable shoulder and recent low output suppress interest; active/full-role only.'],
 'Blake Corum':[0.1,6,'Kyren touchdown or workload diversion; limited role makes this fragile.'],
 'Ty Johnson':[0.1,9,'Passing-down opportunity when Buffalo chases; carries are limited.'],
 'Dawson Knox':[0.05,5,'Low-volume TD pivot; usually needs a score to matter.'],
 'Colby Parkinson':[0.05,5,'Cleared in injury report; TE touchdown pivot from popular Higbee.'],
 'Konata Mumpfield':[0.05,3,'Deep-play upside, but Puka returning shrinks the Week 3 opportunity.'],
 'Jordan Whittington':[0.02,2,'Needs a meaningful route role or broken-play touchdown.'],
 'Davis Allen':[0.02,2,'Cheap TE; a touchdown and actual playing time are needed.'],
 'Ray Davis':[0.02,2,'Secondary back; needs an unexpected workload or touchdown.'],
 'Tutu Atwell':[0.02,1,'Deep-threat punt; verify active status and offensive routes.'],
 'Max Klare':[0.01,1,'Thin role; do not infer opportunity from a cheap salary.'],
 'Greg Dortch':[0.01,1,'Thin role; confirm active status and offensive usage.'],
 'Jackson Hawes':[0.01,0.5,'Blocking TE profile; requires rare receiving production.']},
builds:[
 {title:'Cook Captain · Buffalo rushing control',names:['James Cook III','Josh Allen','Davante Adams','Tyler Higbee','Tyler Bass','Bills'],story:'Cook converts the rushing workload into multiple scores; Adams is the Rams receiving answer. Allen retains multiple scoring paths.',risk:'Allen can take Cook’s goal-line TDs. Bass needs stalled drives while Cook needs touchdowns; Bills D/ST still has to create sacks or turnovers.'},
 {title:'Adams Captain · Rams passing TDs',names:['Davante Adams','Matthew Stafford','Josh Allen','Dalton Kincaid','Tyler Higbee','Blake Corum'],story:'Adams captures the Rams passing TDs instead of Puka. Stafford and Allen supply scoring; Corum supplies a less popular rushing touchdown; Higbee is a popular value retained in the core.',risk:'Corum needs a meaningful contribution. Puka can capture the receiving ceiling and turn the Adams Captain fade into a losing bet.'},
 {title:'Kincaid Captain · Buffalo passing concentration',names:['Dalton Kincaid','Josh Allen','Puka Nacua','Kyren Williams','Ty Johnson','Bills'],story:'Kincaid rebounds with receptions and multiple TDs. Puka/Kyren keep the Rams competitive; Johnson benefits from Buffalo dropbacks.',risk:'A thin Captain bet after two quiet games. Bills D/ST needs sacks or a turnover despite Rams production; a clean offensive game hurts this build.'}
 ]};
window.OwnershipModel={estimate(players,mooreOut=false){
 const rows=players.map(p=>{const off=/^(out|inactive|ir)\b/i.test(p.status||'')||(mooreOut&&p.name==='DJ Moore'),prior=DESK_OWNERSHIP.priors[p.name]||[0,0,'No established offensive role in this snapshot. Low interest does not establish upside.'];let [c,f]=prior;
 if(mooreOut){if(p.name==='Keon Coleman'){c*=1.4;f*=1.25}if(p.name==='Khalil Shakir')f*=1.2;if(p.name==='Dalton Kincaid')f*=1.15;if(p.name==='Skyler Bell')f*=1.5;}
 return {...p,off,c:off?0:c,f:off?0:f,reason:prior[2]};});
 const total=rows.reduce((s,p)=>s+p.c,0);for(const p of rows)p.cpt=total?100*p.c/total:0;
 let remaining=500,open=rows.filter(p=>p.f>0);for(const p of rows)p.flex=0;
 while(open.length&&remaining>0.000001){const weight=open.reduce((s,p)=>s+p.f,0),capped=open.filter(p=>remaining*p.f/weight>100-p.cpt);if(!capped.length){for(const p of open)p.flex=remaining*p.f/weight;break}for(const p of capped){p.flex=100-p.cpt;remaining-=p.flex;}open=open.filter(p=>!capped.includes(p));}
 return rows;
}};
