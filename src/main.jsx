import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, AlertCircle, ArrowRight, BarChart3, Bell, Building2, Check,
  ChevronDown, ChevronRight, CircleHelp, ClipboardCheck, Cloud,
  Database, FileCheck2, FileText, Filter, Gauge, Globe2, LayoutDashboard,
  Lightbulb, LockKeyhole, Menu, MessageSquareText, MoreHorizontal, PackageCheck,
  Rocket, Search, Settings, ShieldCheck, Sparkles, Target, TestTube2,
  TrendingUp, Users, WalletCards, X, Zap
} from "lucide-react";
import "./styles.css";

const workflow = [
  { key: "challenge", label: "Challenge", icon: FileText },
  { key: "discover", label: "Discover", icon: Search },
  { key: "evaluate", label: "Evaluate", icon: ClipboardCheck },
  { key: "pilot", label: "Pilot", icon: TestTube2 },
  { key: "validate", label: "Validate", icon: ShieldCheck },
  { key: "procure", label: "Procure", icon: PackageCheck },
  { key: "scale", label: "Scale", icon: TrendingUp },
];

const challenges = [
  {
    id: 1,
    title: "AI-Based Waste Collection Optimization",
    department: "Municipal Corporation",
    status: "Accepting Applications",
    statusTone: "blue",
    applicants: 26,
    due: "18 Oct 2026",
    sector: "Smart Cities",
    description: "Optimize collection routes and predict demand using AI-assisted planning."
  },
  {
    id: 2,
    title: "Smart Water Leakage Detection",
    department: "Water Resources",
    status: "Evaluation",
    statusTone: "amber",
    applicants: 18,
    due: "08 Oct 2026",
    sector: "Water",
    description: "Detect leakage early using sensors, analytics and anomaly detection."
  },
  {
    id: 3,
    title: "Digital Rural Health Monitoring",
    department: "Health Department",
    status: "Pilot",
    statusTone: "green",
    applicants: 13,
    due: "Pilot • Day 42",
    sector: "HealthTech",
    description: "Remote monitoring workflow for rural frontline health programs."
  },
  {
    id: 4,
    title: "AI Crop Advisory for Small Farmers",
    department: "Agriculture Department",
    status: "Draft",
    statusTone: "purple",
    applicants: 0,
    due: "Not published",
    sector: "AgriTech",
    description: "Localized crop advisory using weather, soil and crop-stage signals."
  },
  {
    id: 5,
    title: "Predictive Road Maintenance",
    department: "Public Works",
    status: "Evaluation",
    statusTone: "amber",
    applicants: 17,
    due: "22 Oct 2026",
    sector: "Mobility",
    description: "Prioritize road repairs based on field data and deterioration patterns."
  },
  {
    id: 6,
    title: "School Attendance Risk Prediction",
    department: "Education Department",
    status: "Accepting Applications",
    statusTone: "blue",
    applicants: 12,
    due: "28 Oct 2026",
    sector: "Education",
    description: "Flag attendance-risk patterns so departments can intervene earlier."
  }
];

const startups = [
  { name:"GreenTech Innovations", sector:"AI + Waste Management", location:"Bengaluru", match:94, founded:2023, pilots:4, team:28 },
  { name:"AquaSense Technologies", sector:"IoT + Water Management", location:"Pune", match:91, founded:2022, pilots:6, team:41 },
  { name:"HealthAI Labs", sector:"AI + Healthcare", location:"Delhi", match:88, founded:2021, pilots:3, team:35 },
  { name:"AgriVision Labs", sector:"AI + Agriculture", location:"Hyderabad", match:86, founded:2024, pilots:5, team:22 },
  { name:"CivicRoute AI", sector:"AI + Mobility", location:"Mumbai", match:83, founded:2022, pilots:4, team:19 },
  { name:"SecureGov Cloud", sector:"Cybersecurity + SaaS", location:"Noida", match:81, founded:2020, pilots:7, team:52 },
];

const evalScores = [
  ["Technical Feasibility", 88],
  ["Innovation", 92],
  ["Cost Effectiveness", 84],
  ["Social Impact", 90],
  ["Scalability", 86],
  ["Cybersecurity", 82],
];

function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);

  // Auto close sidebar on mobile resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setSidebarOpen(false); // on desktop sidebar is always visible via CSS, state doesn't matter
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [activeChallenge, setActiveChallenge] = useState(challenges[0]);
  const [activeStartup, setActiveStartup] = useState(startups[0]);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [dark, setDark] = useState(false);

  const notify = (msg) => {
    setToast(msg);
    window.clearTimeout(window.__pxToast);
    window.__pxToast = window.setTimeout(() => setToast(""), 2200);
  };

  const go = (p) => {
    setPage(p);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const openChallenge = (c) => {
    setActiveChallenge(c);
    setModal("challenge");
  };

  const openStartup = (s) => {
    setActiveStartup(s);
    setModal("startup");
  };

  const filteredChallenges = useMemo(() => {
    return challenges.filter(c => {
      const matchText = `${c.title} ${c.department} ${c.sector}`.toLowerCase().includes(query.toLowerCase());
      const matchFilter = filter === "All" || c.status === filter;
      return matchText && matchFilter;
    });
  }, [query, filter]);

  return (
    <div className={dark ? "app dark" : "app"}>
      <div className="topbar">
        <div className="brand-wrap">
          <button className="icon-button hamburger-btn" onClick={() => setSidebarOpen(v=>!v)} aria-label="Toggle menu"><Menu size={19}/></button>
          <div className="logo">PX</div>
          <div>
            <div className="brand">Procure<span>X</span></div>
            <div className="brand-sub">Innovation Procurement Platform</div>
          </div>
        </div>
        <div className="top-actions">
          <div className="demo-pill"><span className="pulse-dot"/> DEMO MODE</div>
          <button className="icon-button" onClick={() => notify("3 demo notifications") }><Bell size={18}/><span className="notif-dot"/></button>
          <button className="icon-button" onClick={() => setDark(v=>!v)} title="Toggle theme"><Cloud size={18}/></button>
          <div className="profile-chip">
            <div className="avatar">AO</div>
            <div className="profile-copy"><b>Admin Officer</b><span>Department of Innovation & Public Services</span></div>
            <ChevronDown size={15} className="muted"/>
          </div>
        </div>
      </div>

      <div className="shell">
        {/* Dark overlay - only on mobile when sidebar is open */}
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{display: sidebarOpen ? 'block' : 'none'}}
        />
        <aside className={sidebarOpen ? "sidebar open" : "sidebar"} style={window.innerWidth > 900 ? {position:'sticky',transform:'none',height:'calc(100vh - 72px)',top:'72px'} : {}}>
          <div className="side-heading">WORKSPACE</div>
          <NavItem active={page==="dashboard"} label="Dashboard" icon={LayoutDashboard} onClick={()=>go("dashboard")} closeSidebar={()=>setSidebarOpen(false)} />
          <NavItem active={page==="challenges"} label="Challenges" icon={Target} onClick={()=>go("challenges")} closeSidebar={()=>setSidebarOpen(false)} />
          <NavItem active={page==="startups"} label="Startups" icon={Rocket} onClick={()=>go("startups")} closeSidebar={()=>setSidebarOpen(false)} />
          <NavItem active={page==="evaluations"} label="Evaluations" icon={ClipboardCheck} onClick={()=>go("evaluations")} closeSidebar={()=>setSidebarOpen(false)} />
          <NavItem active={page==="pilots"} label="Pilots" icon={TestTube2} onClick={()=>go("pilots")} closeSidebar={()=>setSidebarOpen(false)} />
          <NavItem active={page==="procurement"} label="Procurement" icon={PackageCheck} onClick={()=>go("procurement")} closeSidebar={()=>setSidebarOpen(false)} />
          <NavItem active={page==="analytics"} label="Analytics" icon={BarChart3} onClick={()=>go("analytics")} closeSidebar={()=>setSidebarOpen(false)} />

          <div className="side-heading second">GOVERNANCE</div>
          <NavItem label="Audit & Transparency" icon={FileCheck2} onClick={()=>notify("Audit view opened in demo")} closeSidebar={()=>setSidebarOpen(false)} />
          <NavItem label="Compliance Center" icon={ShieldCheck} onClick={()=>notify("Compliance center opened in demo")} closeSidebar={()=>setSidebarOpen(false)} />
          <NavItem label="Settings" icon={Settings} onClick={()=>notify("Settings opened in demo")} closeSidebar={()=>setSidebarOpen(false)} />

          <div className="side-card">
            <div className="side-card-icon"><Sparkles size={16}/></div>
            <b>Need a quick tour?</b>
            <span>Follow the full 2-minute demo journey.</span>
            <button onClick={()=>go("dashboard")}>Start tour <ArrowRight size={13}/></button>
          </div>
        </aside>

        <main className="main">
          {page === "dashboard" && <Dashboard go={go} notify={notify} openChallenge={openChallenge}/>}
          {page === "challenges" && <Challenges data={filteredChallenges} query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} openChallenge={openChallenge} notify={notify} openCreate={()=>setModal("create")} />}
          {page === "startups" && <Startups openStartup={openStartup} notify={notify} />}
          {page === "evaluations" && <Evaluations go={go} notify={notify}/>}
          {page === "pilots" && <Pilots notify={notify}/>}
          {page === "procurement" && <Procurement notify={notify}/>}
          {page === "analytics" && <Analytics/>}
        </main>
      </div>

      {modal === "create" && <CreateModal close={()=>setModal(null)} notify={notify}/>}
      {modal === "challenge" && <ChallengeModal item={activeChallenge} close={()=>setModal(null)} go={go}/>}
      {modal === "startup" && <StartupModal item={activeStartup} close={()=>setModal(null)} go={go}/>}
      {toast && <div className="toast"><Check size={16}/>{toast}</div>}
    </div>
  );
}

function NavItem({active,label,icon:Icon,onClick,closeSidebar}) {
  return (
    <button
      className={active ? "nav-item active" : "nav-item"}
      onClick={() => { onClick && onClick(); closeSidebar && closeSidebar(); }}
    >
      <Icon size={18}/>
      <span className="nav-label">{label}</span>
      {active && <span className="nav-active-bar"/>}
    </button>
  );
}

function PageHead({eyebrow,title,sub,action}) {
  return <div className="page-head" style={{flexWrap:'wrap',gap:'12px'}}>
    <div style={{flex:1,minWidth:0}}><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{sub}</p></div>
    {action && <div style={{flexShrink:0}}>{action}</div>}
  </div>
}

function Dashboard({go,notify,openChallenge}) {
  return <>
    <PageHead eyebrow="GOVERNMENT WORKSPACE" title="Innovation Procurement Dashboard" sub="Turn departmental problems into tested, evidence-backed startup solutions." action={
      <button className="primary-button" onClick={()=>go("challenges")}><Target size={17}/> Create Challenge</button>
    }/>

    <div className="hero-card">
      <div className="hero-left">
        <div className="hero-kicker"><Sparkles size={15}/> ACTIVE DEMO JOURNEY</div>
        <h2>From <span>problem</span> to <span>proven solution</span>.</h2>
        <p>ProcureX creates one transparent journey for challenge definition, startup discovery, controlled pilots, evidence validation and procurement readiness.</p>
        <div className="hero-buttons">
          <button className="light-button" onClick={()=>go("challenges")}>Explore Challenges <ArrowRight size={16}/></button>
          <button className="ghost-light" onClick={()=>notify("Product tour simulated")}>How it works</button>
        </div>
      </div>
      <div className="hero-orbit">
        <div className="orbit-line orbit-a"/><div className="orbit-line orbit-b"/>
        <div className="orbit-node node-gov"><Building2 size={19}/><span>Govt.</span></div>
        <div className="orbit-node node-px"><div className="mini-logo">PX</div><span>ProcureX</span></div>
        <div className="orbit-node node-start"><Rocket size={19}/><span>Startup</span></div>
      </div>
    </div>

    <div className="kpi-grid">
      <Metric icon={Target} label="Active Challenges" value="12" delta="+3 this month" tone="blue"/>
      <Metric icon={Users} label="Startup Applications" value="86" delta="+18% vs last month" tone="purple"/>
      <Metric icon={TestTube2} label="Active Pilots" value="8" delta="2 ending soon" tone="amber"/>
      <Metric icon={ShieldCheck} label="Successful Pilots" value="5" delta="+2 validated" tone="green"/>
      <Metric icon={PackageCheck} label="Procurement Ready" value="3" delta="Evidence complete" tone="navy"/>
    </div>

    <div className="section-grid">
      <div className="panel">
        <div className="panel-head"><div><h3>Procurement Journey</h3><span>Live demo state for the featured challenge</span></div><span className="status-chip green">68% complete</span></div>
        <div className="journey">
          {workflow.map((w,i)=>{
            const I=w.icon; const active=i===4; const done=i<4;
            return <React.Fragment key={w.key}>
              <div className={done ? "journey-stage done" : active ? "journey-stage active" : "journey-stage"}>
                <div className="journey-icon"><I size={16}/></div>
                <span>{w.label}</span>
                {done && <small>Done</small>}{active && <small>Current</small>}
              </div>
              {i<workflow.length-1 && <ChevronRight className="journey-arrow" size={15}/>}
            </React.Fragment>
          })}
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><div><h3>Action Center</h3><span>Demo shortcuts</span></div></div>
        <div className="action-grid">
          <QuickAction icon={Search} text="Find Startups" onClick={()=>go("startups")}/>
          <QuickAction icon={ClipboardCheck} text="Review Proposals" onClick={()=>go("evaluations")}/>
          <QuickAction icon={TestTube2} text="Open Pilots" onClick={()=>go("pilots")}/>
          <QuickAction icon={PackageCheck} text="Procurement Queue" onClick={()=>go("procurement")}/>
        </div>
      </div>
    </div>

    <div className="panel">
      <div className="panel-head"><div><h3>Recent Challenges</h3><span>Priority government innovation opportunities</span></div><button className="text-button" onClick={()=>go("challenges")}>View all <ArrowRight size={14}/></button></div>
      <div className="challenge-cards">
        {challenges.slice(0,3).map(c=><ChallengeCard key={c.id} item={c} onOpen={openChallenge}/>)}
      </div>
    </div>
  </>;
}

function Metric({icon:Icon,label,value,delta,tone}) {
  return <div className="metric-card"><div className={`metric-icon ${tone}`}><Icon size={18}/></div><div className="metric-copy"><span>{label}</span><b>{value}</b><small>{delta}</small></div></div>
}
function QuickAction({icon:Icon,text,onClick}) {
  return <button className="quick-action" onClick={onClick}><span className="quick-icon"><Icon size={17}/></span><span>{text}</span><ChevronRight size={14}/></button>
}
function ChallengeCard({item,onOpen}) {
  return <div className="challenge-card">
    <div className="card-top"><span className={`status-chip ${item.statusTone}`}>{item.status}</span><button className="kebab"><MoreHorizontal size={17}/></button></div>
    <h4>{item.title}</h4><p>{item.description}</p>
    <div className="challenge-meta"><span><Building2 size={13}/>{item.department}</span><span><Users size={13}/>{item.applicants} applicants</span></div>
    <div className="card-foot"><span>{item.due}</span><button className="outline-button" onClick={()=>onOpen(item)}>View Details <ChevronRight size={14}/></button></div>
  </div>
}

function Challenges({data,query,setQuery,filter,setFilter,openChallenge,notify,openCreate}) {
  return <>
    <PageHead eyebrow="CHALLENGE STUDIO" title="Government Challenges" sub="Create outcome-based problem statements and manage innovation demand." action={<button className="primary-button" onClick={openCreate}><Target size={17}/> New Challenge</button>}/>
    <div className="toolbar panel" style={{flexWrap:'wrap'}}>
      <div className="search-box" style={{flex:'1 1 200px'}}><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search challenges..." /></div>
      <div className="filter-wrap"><Filter size={15}/><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Accepting Applications</option><option>Evaluation</option><option>Pilot</option><option>Draft</option></select></div>
      <button className="outline-button" onClick={()=>notify("Advanced filters simulated")}>Advanced filters</button>
    </div>
    <div className="mini-stat-row">
      <span><b>38</b> total challenges</span><span><b>12</b> active</span><span><b>8</b> in evaluation/pilot</span><span><b>6</b> sectors represented</span>
    </div>
    <div className="challenge-grid">
      {data.map(c=><ChallengeCard key={c.id} item={c} onOpen={openChallenge}/>)}
    </div>
  </>;
}

function Startups({openStartup,notify}) {
  return <>
    <PageHead eyebrow="STARTUP DISCOVERY" title="Startup Discovery Engine" sub="Match government challenges with eligible and relevant startup capabilities." action={<button className="primary-button" onClick={()=>notify("Invite flow simulated")}><Rocket size={17}/> Invite Startup</button>}/>
    <div className="match-banner">
      <div className="match-icon"><Sparkles size={18}/></div>
      <div><b>AI-Based Matching</b><span>18 startups match the featured waste-management challenge. Matching is simulated for this prototype.</span></div>
      <button className="light-blue-button" onClick={()=>notify("Matching explanation simulated")}>Why these matches?</button>
    </div>
    <div className="toolbar panel" style={{flexWrap:'wrap'}}>
      <div className="search-box" style={{flex:'1 1 200px'}}><Search size={17}/><input placeholder="Search by technology or sector..." /></div>
      {["All Sectors","AI","IoT","Health","Water"].map((x,i)=><button key={x} className={i===0?"filter-pill selected":"filter-pill"} onClick={()=>notify(`${x} filter selected`)}>{x}</button>)}
      <button className="outline-button" onClick={()=>notify("Location and stage filters simulated")}>More filters <ChevronDown size={14}/></button>
    </div>
    <div className="startup-grid">
      {startups.map(s=><StartupCard key={s.name} item={s} onOpen={openStartup} onInvite={()=>notify(`Invite sent to ${s.name}`)}/>)}
    </div>
  </>;
}
function StartupCard({item,onOpen,onInvite}) {
  return <div className="startup-card">
    <div className="startup-top"><div className="startup-avatar">{item.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div><span className="verified"><Check size={12}/> DPIIT Verified</span></div>
    <h4>{item.name}</h4><p>{item.sector}</p>
    <div className="startup-location"><Globe2 size={13}/>{item.location}</div>
    <div className="match-score"><div><span>Challenge match</span><b>{item.match}%</b></div><div className="score-track"><span style={{width:`${item.match}%`}}/></div></div>
    <div className="startup-stats"><span><b>{item.pilots}</b><small>pilots</small></span><span><b>{item.team}</b><small>team</small></span><span><b>{item.founded}</b><small>founded</small></span></div>
    <div className="card-foot"><button className="outline-button" onClick={()=>onOpen(item)}>View Profile</button><button className="primary-small" onClick={onInvite}>Invite</button></div>
  </div>
}

function Evaluations({go,notify}) {
  return <>
    <PageHead eyebrow="EXPERT REVIEW" title="Evaluation Dashboard" sub="Structured scoring for technical, financial, impact and security criteria." action={<span className="status-chip amber">1 proposal awaiting action</span>}/>
    <div className="evaluation-grid">
      <div className="panel">
        <div className="panel-head"><div><h3>GreenTech Innovations</h3><span>AI-Based Waste Collection Optimization</span></div><span className="status-chip blue">Shortlisted</span></div>
        <div className="score-summary"><div className="overall"><span>Overall Score</span><b>87</b><small>/100</small></div><div className="score-ring"><div><b>87</b><span>Strong fit</span></div></div></div>
        <div className="score-table">{evalScores.map(([name,score])=><div className="score-row" key={name}><span>{name}</span><div className="score-bar"><i style={{width:`${score}%`}}/></div><b>{score}</b></div>)}</div>
        <div className="review-note"><MessageSquareText size={15}/><span>Final approval remains with the authorised government evaluation committee.</span></div>
        <div className="button-row"><button className="outline-button" onClick={()=>notify("Clarification request simulated")}>Request Clarification</button><button className="danger-button" onClick={()=>notify("Demo rejection recorded")}>Reject</button><button className="success-button" onClick={()=>{notify("Approved for pilot");go("pilots")}}>Approve for Pilot <ArrowRight size={15}/></button></div>
      </div>
      <div className="panel">
        <div className="panel-head"><div><h3>Evaluation Controls</h3><span>Transparency and consistency</span></div></div>
        {[
          [ShieldCheck,"Eligibility verification","Complete"],
          [Users,"Expert review","Complete"],
          [LockKeyhole,"Cybersecurity review","Complete"],
          [FileCheck2,"Conflict declaration","Complete"],
          [Activity,"Impact scoring","In progress"],
        ].map(([I,t,s],i)=><div className="control-row" key={t}><span className={`control-icon ${i===4?"amber":"green"}`}><I size={15}/></span><div><b>{t}</b><small>{s}</small></div><Check size={15} className={i===4?"muted":"success"}/></div>)}
        <div className="info-box"><CircleHelp size={16}/><span>Scores are illustrative demo data and do not make a real procurement decision.</span></div>
      </div>
    </div>
  </>;
}

function Pilots({notify}) {
  const milestones = [
    ["Requirement & Setup","Completed","green"],
    ["System Deployment","Completed","green"],
    ["Field Testing","In Progress","blue"],
    ["Performance Validation","Pending","amber"],
    ["Final Evaluation","Pending","amber"]
  ];
  return <>
    <PageHead eyebrow="PILOT SANDBOX" title="Pilot Management" sub="Manage controlled pilots, milestones, evidence and KPI progress." action={<span className="status-chip blue">Pilot Day 42 / 90</span>}/>
    <div className="pilot-grid">
      <div className="panel">
        <div className="pilot-hero"><div><span className="status-chip green">ON TRACK</span><h3>AI Waste Collection Optimization</h3><p>GreenTech Innovations • Lucknow • 90-day controlled pilot</p></div><div className="big-progress"><b>68%</b><span>complete</span></div></div>
        <div className="progress-line"><i style={{width:"68%"}}/></div>
        <div className="milestones">{milestones.map(([t,s,tone],i)=><div className="milestone" key={t}><div className={`milestone-icon ${tone}`}>{i<2?<Check size={15}/>:i===2?<Activity size={15}/>:<span>{i+1}</span>}</div><div><b>{t}</b><small>{s}</small></div><ChevronRight size={15} className="muted"/></div>)}</div>
        <div className="button-row"><button className="outline-button" onClick={()=>notify("Pilot report opened")}>View Pilot Report</button><button className="primary-button" onClick={()=>notify("Milestone update simulated")}>Update Milestone</button></div>
      </div>
      <div className="panel">
        <div className="panel-head"><div><h3>KPI Snapshot</h3><span>Field evidence captured so far</span></div><Gauge size={18} className="muted"/></div>
        <div className="metric-stack">
          <Kpi name="Collection Efficiency" value="+27%" target="+20%" good />
          <Kpi name="Fuel Usage" value="-18%" target="-12%" good />
          <Kpi name="Complaints" value="-31%" target="-20%" good />
          <Kpi name="Citizen Satisfaction" value="82%" target="80%" good />
        </div>
        <div className="info-box"><Activity size={16}/><span>Performance validation is pending for one predefined KPI.</span></div>
      </div>
    </div>
  </>;
}
function Kpi({name,value,target,good}) { return <div className="kpi-row"><div><b>{name}</b><small>Target {target}</small></div><strong className={good?"good":""}>{value}</strong></div> }

function Procurement({notify}) {
  return <>
    <PageHead eyebrow="PROCUREMENT READINESS" title="Procurement Decision" sub="Support the appropriate compliant route after pilot validation." action={<span className="status-chip green">Ready for review</span>}/>
    <div className="procurement-grid">
      <div className="panel">
        <div className="recommended"><div className="rec-icon"><PackageCheck size={20}/></div><div><span>RECOMMENDED NEXT STEP</span><h3>Proceed to compliant procurement process</h3><p>The demo platform suggests a next route based on pilot evidence. It does not execute procurement.</p></div></div>
        <div className="route-cards">
          {[
            ["GeM","Marketplace / government e-procurement","Primary route"],
            ["Tender / e-Procurement","Department-specific competitive route","Alternative"],
            ["Other Applicable Route","Subject to authority and rules","Review"]
          ].map(([title,desc,tag],i)=><button className={i===0?"route-card selected":"route-card"} key={title} onClick={()=>notify(`${title} selected in demo`)}><div><b>{title}</b><span>{desc}</span></div><span>{tag}</span></button>)}
        </div>
        <button className="primary-button wide" onClick={()=>notify("Sent for procurement approval — demo only")}><PackageCheck size={17}/> Send for Procurement Approval</button>
      </div>
      <div className="panel">
        <div className="panel-head"><div><h3>Readiness Checklist</h3><span>Pre-procurement evidence</span></div></div>
        {[
          ["Pilot completed",true],["KPI evidence available",true],["Expert validation completed",true],["Cybersecurity assessment completed",true],["Budget approval",false],["Procurement authority approval",false]
        ].map(([t,ok])=><div className="check-row" key={t}><span className={ok?"check-circle":"empty-circle"}>{ok?<Check size={13}/>:null}</span><span>{t}</span><span className={ok?"ready":"pending"}>{ok?"Ready":"Pending"}</span></div>)}
        <div className="warning-box"><AlertCircle size={16}/><span>Final route and approval depend on applicable government procurement rules and authorised officials.</span></div>
      </div>
    </div>
  </>;
}

function Analytics() {
  const bars=[44,62,78,92,116,136];
  return <>
    <PageHead eyebrow="IMPACT ANALYTICS" title="ProcureX Innovation Impact" sub="A visual summary of challenges, pilots, validation and procurement conversion." action={<span className="status-chip blue">Demo data</span>}/>
    <div className="kpi-grid four">
      <Metric icon={Target} label="Challenges Created" value="38" delta="+11 vs Q2" tone="blue"/>
      <Metric icon={Users} label="Startups Participating" value="214" delta="+24% YoY" tone="purple"/>
      <Metric icon={TestTube2} label="Pilots Completed" value="15" delta="11 successful" tone="green"/>
      <Metric icon={WalletCards} label="Estimated Cost Savings" value="₹4.8 Cr" delta="Illustrative demo" tone="amber"/>
    </div>
    <div className="analytics-grid">
      <div className="panel chart-panel"><div className="panel-head"><div><h3>Pilots by Month</h3><span>Illustrative activity trend</span></div><TrendingUp size={17} className="success"/></div><div className="chart"><div className="y-labels"><span>150</span><span>100</span><span>50</span><span>0</span></div><div className="bar-chart">{bars.map((h,i)=><div className="bar-wrap" key={i}><div className="bar" style={{height:`${h}px`}}/><small>{["Apr","May","Jun","Jul","Aug","Sep"][i]}</small></div>)}</div></div></div>
      <div className="panel"><div className="panel-head"><div><h3>Validation Funnel</h3><span>Current demo snapshot</span></div></div><div className="funnel"><div style={{width:"100%"}}><b>38</b><span>Challenges</span></div><div style={{width:"78%"}}><b>30</b><span>Applications</span></div><div style={{width:"58%"}}><b>22</b><span>Pilots</span></div><div style={{width:"42%"}}><b>15</b><span>Completed</span></div><div style={{width:"30%"}}><b>11</b><span>Validated</span></div></div></div>
    </div>
    <div className="panel"><div className="panel-head"><div><h3>Operational Indicators</h3><span>Designed for evidence-led procurement</span></div></div><div className="indicator-grid"><Indicator title="Pilot → Procurement" value="73%" sub="8 conversions from 11 validated pilots"/><Indicator title="Avg. Pilot Duration" value="74 days" sub="Across completed pilots"/><Indicator title="Cross-Department Replication" value="6" sub="Example of scale-ready solutions"/><Indicator title="Audit Completeness" value="96%" sub="Demo target for process records"/></div></div>
  </>;
}
function Indicator({title,value,sub}){return <div className="indicator"><span>{title}</span><b>{value}</b><small>{sub}</small></div>}

function CreateModal({close,notify}) {
  const fields=["Challenge Title","Department","Problem Statement","Expected Outcome","Technology Area","Target Beneficiaries","Budget Range","Pilot Duration","Key Performance Indicators","Eligibility Criteria","Application Deadline"];
  return <Modal close={close} title="Create Government Challenge" wide><div className="modal-grid">{fields.map((f,i)=><label key={f} className={i===2||i===8||i===9?"full":""}><span>{f}</span>{f==="Application Deadline"?<input type="date"/>:f.includes("Statement")?<textarea placeholder={`Enter ${f.toLowerCase()}...`}/>:<input placeholder={`Enter ${f.toLowerCase()}...`}/>}</label>)}</div><div className="modal-actions"><button className="outline-button" onClick={()=>{notify("Draft saved");close()}}>Save Draft</button><button className="primary-button" onClick={()=>{notify("Challenge published successfully");close()}}>Publish Challenge</button></div></Modal>
}
function ChallengeModal({item,close,go}){return <Modal close={close} title="Challenge Overview"><span className={`status-chip ${item.statusTone}`}>{item.status}</span><h3 className="modal-title">{item.title}</h3><p className="modal-desc">{item.description}</p><div className="modal-details"><Info title="Department" value={item.department}/><Info title="Applicants" value={`${item.applicants}`}/><Info title="Sector" value={item.sector}/><Info title="Timeline" value={item.due}/></div><div className="modal-divider"/><div className="modal-flow"><b>Next in ProcureX</b><span>Startup discovery and eligibility checks</span></div><div className="modal-actions"><button className="primary-button" onClick={()=>{close();go("startups")}}>Find Matched Startups <ArrowRight size={15}/></button></div></Modal>}
function StartupModal({item,close,go}){return <Modal close={close} title="Startup Profile"><div className="startup-modal-head"><div className="startup-avatar large">{item.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div><div><h3>{item.name}</h3><span>{item.sector} • {item.location}</span></div><span className="verified"><Check size={12}/> DPIIT Verified</span></div><div className="modal-details"><Info title="Founded" value={item.founded}/><Info title="Team Size" value={item.team}/><Info title="Previous Pilots" value={item.pilots}/><Info title="Challenge Match" value={`${item.match}%`}/></div><p className="modal-desc"><b>Solution Overview</b><br/>AI-assisted solution designed for public-sector operational workflows, with configurable deployment, measurable KPIs and pilot-ready architecture.</p><div className="modal-actions"><button className="primary-button" onClick={()=>{close();go("evaluations")}}>Open Evaluation <ArrowRight size={15}/></button></div></Modal>}
function Info({title,value}){return <div className="info-item"><small>{title}</small><b>{value}</b></div>}
function Modal({children,close,title,wide}){return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className={wide?"modal-card wide":"modal-card"}><div className="modal-head"><div><span className="eyebrow">PROCUREX DEMO</span><h2>{title}</h2></div><button className="icon-button" onClick={close}><X size={18}/></button></div>{children}</div></div>}

createRoot(document.getElementById("root")).render(<App />);
