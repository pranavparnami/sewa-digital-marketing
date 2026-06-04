"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface ContentItem {
  id: string;
  platform: string;
  type: string;
  title: string;
  caption: string;
  hashtags: string[];
  status: string;
  createdAt: string;
  mediaText: string[];
}

interface AgentStatus {
  status: { running: boolean };
  config: {
    schedule: { postsPerDay: number; enabled: boolean };
    instagram: { isConfigured: boolean };
    gemini: { isConfigured: boolean };
  };
  stats: { totalGenerated: number; totalPosted: number; totalFailed: number; pending: number; todayGenerated: number; todayPosted: number };
}

interface CreativeItem {
  id: string; title: string; type: string; prompt: string; description: string;
  platform: string; status: string; colorPalette: string[]; mood: string;
  dimensions: string; generatedUrl: string | null; createdAt: string;
}

interface CalendarEvent {
  name: string; date: string; type: string; priority: string; relevance: string;
  contentIdeas: string[]; hashtags: string[];
}

interface CompetitorData {
  name: string; category: string; strengths: string[]; weaknesses: string[]; sewaAdvantage: string;
}

interface MarketGapData {
  id: string; gap: string; strategy: string; tactics: string[]; contentTemplates: string[]; kpis: string[];
}

export default function AgentDashboard() {
  const [agentData, setAgentData] = useState<AgentStatus | null>(null);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [creatives, setCreatives] = useState<CreativeItem[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [gaps, setGaps] = useState<MarketGapData[]>([]);
  const [nextBig, setNextBig] = useState<CalendarEvent | null>(null);
  const [activeIntel, setActiveIntel] = useState<"calendar" | "competitors" | "gaps" | "playbook" | "creative">("calendar");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [actionBusy, setActionBusy] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const [statusRes, queueRes, creativesRes, calRes, compRes, gapsRes] = await Promise.all([
        fetch("/api/agent?action=status"), fetch("/api/agent?action=queue"),
        fetch("/api/agent?action=creatives"), fetch("/api/agent?action=calendar"),
        fetch("/api/agent?action=competitors"), fetch("/api/agent?action=gaps"),
      ]);
      setAgentData(await statusRes.json());
      setContent((await queueRes.json()).items || []);
      setCreatives((await creativesRes.json()).creatives || []);
      const cal = await calRes.json();
      setCalendarEvents(cal.events || []);
      setNextBig(cal.nextBig || null);
      setCompetitors((await compRes.json()).competitors || []);
      setGaps((await gapsRes.json()).gaps || []);
    } catch { /* silent */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); const t = setInterval(fetchData, 10000); return () => clearInterval(t); }, [fetchData]);

  const callAction = async (action: string, body?: Record<string, unknown>) => {
    setActionBusy(action);
    try { await fetch(`/api/agent?action=${action}`, { method: "POST", headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined }); await fetchData(); } catch { /* silent */ }
    finally { setActionBusy(""); }
  };

  const filtered = filter === "all" ? content : content.filter((c) => c.status === filter);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-12"><div className="animate-pulse space-y-6"><div className="h-8 bg-stone-200 rounded w-48" /><div className="grid grid-cols-3 gap-4">{[1,2,3].map(i=><div key={i} className="h-24 bg-stone-100 rounded-xl" />)}</div></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl sm:text-3xl font-bold text-stone-900">AI Agent Dashboard</h1><p className="text-stone-500 mt-1">24/7 content generation & posting engine</p></div>
        <Link href="/" className="text-sm text-stone-500 hover:text-amber-700">← Back to Site</Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[{label:"Today Generated",v:(d:AgentStatus|null)=>d?.stats.todayGenerated??0},{label:"Today Posted",v:(d:AgentStatus|null)=>d?.stats.todayPosted??0},{label:"Total Posted",v:(d:AgentStatus|null)=>d?.stats.totalPosted??0},{label:"Pending",v:(d:AgentStatus|null)=>d?.stats.pending??0}].map(s=>(
          <div key={s.label} className="bg-white rounded-xl border border-stone-200 p-4"><div className="text-2xl font-bold text-stone-900">{s.v(agentData)}</div><div className="text-xs text-stone-500 mt-1">{s.label}</div></div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <h2 className="font-semibold text-stone-900 mb-4">Agent Controls</h2>
          <div className="flex items-center gap-3 mb-4">
            <span className={`w-3 h-3 rounded-full ${agentData?.status.running?"bg-green-500 animate-pulse":"bg-stone-300"}`} />
            <span className="text-sm text-stone-600">{agentData?.status.running?"Running":"Stopped"}</span>
            <span className="text-xs text-stone-400">{(agentData?.config.instagram.isConfigured?"| IG Connected":"| IG not configured")+(agentData?.config.gemini?.isConfigured?" | Gemini Connected":" | Gemini not configured")}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <ABtn label="Start Agent" a="start" b={actionBusy} c={callAction} act={!agentData?.status.running} />
            <ABtn label="Stop Agent" a="stop" b={actionBusy} c={callAction} act={!!agentData?.status.running} />
            <ABtn label="Generate Posts" a="generate-posts" b={actionBusy} c={callAction} act={true} />
            <ABtn label="Generate Reel" a="generate-reel" b={actionBusy} c={callAction} act={true} />
            <ABtn label="Post to IG" a="post-pending" b={actionBusy} c={callAction} act={agentData?.config.instagram.isConfigured??false} />
            <ABtn label="AI Creative" a="generate-creative-batch" b={actionBusy} c={(a)=>callAction(a,{count:2})} act={true} />
            <ABtn label="Run Creative Team" a="run-creative-team" b={actionBusy} c={callAction} act={true} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <h2 className="font-semibold text-stone-900 mb-4">🤖 AI Creative Team</h2>
          <p className="text-xs text-stone-500 mb-4">8 specialized AI agents. Create → Measure → Learn loop closed.</p>
          <div className="space-y-2 max-h-[280px] overflow-y-auto">
            {[
              {id:"creative-director",name:"Aria",role:"Creative Director",emoji:"🎨",spec:"Brand guardian, quality control, campaign strategy"},
              {id:"content-creator",name:"Mira",role:"Content Creator",emoji:"📸",spec:"Photography briefs, shot lists, visual concepts"},
              {id:"graphic-designer",name:"Rey",role:"Graphic Designer",emoji:"✏️",spec:"Carousels, A+ content, templates, packaging"},
              {id:"video-editor",name:"Kai",role:"Video Editor",emoji:"🎬",spec:"Reel scripts, storyboards, motion design"},
              {id:"copywriter",name:"Noor",role:"Copywriter",emoji:"📝",spec:"Captions, blogs, emails, ad copy, product descriptions"},
              {id:"influencer-manager",name:"Zara",role:"Influencer Manager",emoji:"🤝",spec:"Outreach, UGC campaigns, ambassadors"},
              {id:"prompt-engineer",name:"Sol",role:"Prompt Engineer",emoji:"🧠",spec:"Prompt architecture, model optimization, quality audits"},
              {id:"performance-analyst",name:"Dax",role:"Performance Analyst",emoji:"📊",spec:"Content scoring, A/B testing, funnel analysis"}
            ].map(agent=>(
              <div key={agent.id} className="flex items-center justify-between border border-stone-100 rounded-lg p-2.5 text-xs hover:bg-stone-50">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg">{agent.emoji}</span>
                  <div>
                    <span className="font-medium text-stone-900">{agent.name}</span>
                    <span className="text-stone-400 ml-1">— {agent.role}</span>
                    <p className="text-[10px] text-stone-400">{agent.spec}</p>
                  </div>
                </div>
                <button
                  onClick={()=>callAction("run-agent",{agent:agent.id})}
                  disabled={actionBusy!==""}
                  className="px-2 py-1 text-[10px] rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 font-medium disabled:opacity-50 whitespace-nowrap"
                >
                  {actionBusy==="run-agent"?"...":"Run"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <h2 className="font-semibold text-stone-900 mb-4">Gemini Creative Studio</h2>
          {agentData?.config.gemini?.isConfigured ? <div className="text-sm text-green-700 bg-green-50 rounded-lg p-3 mb-4">Gemini API connected. Generating high-quality image and video creatives.</div> : <div className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3 mb-4">Add GEMINI_API_KEY to .env to enable AI-powered image and video generation.</div>}
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {creatives.length===0 ? <div className="text-center text-stone-400 text-sm py-4">No creatives yet. Click "AI Creative" to generate.</div> : creatives.slice(0,10).map(c=>(
              <div key={c.id} className="border border-stone-100 rounded-lg p-3 text-xs">
                <div className="flex items-center justify-between mb-1"><div className="flex items-center gap-2"><span className={`text-[10px] uppercase px-1.5 py-0.5 rounded-full font-medium ${c.status==="generated"?"bg-green-100 text-green-700":"bg-stone-100 text-stone-500"}`}>{c.status}</span><span className="text-[10px] uppercase bg-stone-100 text-stone-400 px-1.5 py-0.5 rounded-full">{c.type}</span><span className="text-[10px] uppercase bg-stone-100 text-stone-400 px-1.5 py-0.5 rounded-full">{c.dimensions}</span></div><span className="text-[10px] text-stone-400">{new Date(c.createdAt).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</span></div>
                <p className="font-medium text-stone-900">{c.title}</p><p className="text-stone-400 mt-0.5 line-clamp-2">{c.mood}</p>
                <div className="flex gap-1 mt-1.5">{c.colorPalette.map(col=><span key={col} className="w-3 h-3 rounded-full border border-stone-200" style={{backgroundColor:col}} title={col} />)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden mb-8">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="font-semibold text-stone-900">📊 Marketing Intelligence</h2>
          <div className="flex gap-1">
            {["calendar","competitors","gaps","playbook","creative"].map(t=>(
              <button key={t} onClick={()=>setActiveIntel(t as never)}               className={`px-3 py-1 text-xs rounded-full transition-colors ${activeIntel===t?"bg-amber-700 text-white":"bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>{t==="playbook"?"Growth":t==="creative"?"Creative Ops":t.charAt(0).toUpperCase()+t.slice(1)}</button>
            ))}
          </div>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          {activeIntel==="calendar" && <>
            {nextBig && <div className="m-4 p-4 bg-amber-50 border border-amber-200 rounded-xl"><div className="flex items-center gap-2 mb-2"><span className="text-xs px-2 py-0.5 rounded-full bg-amber-700 text-white font-medium">NEXT BIG EVENT</span><span className="text-xs text-amber-700">{Math.ceil((new Date(nextBig.date).getTime()-Date.now())/86400000)}d</span></div><h3 className="font-semibold text-stone-900">{nextBig.name}</h3><p className="text-sm text-stone-600 mt-1">{nextBig.relevance}</p><div className="mt-2 space-y-1">{nextBig.contentIdeas.slice(0,3).map((idea,i)=><p key={i} className="text-xs text-stone-500">• {idea}</p>)}</div></div>}
            {calendarEvents.length===0 ? <div className="p-8 text-center text-stone-400 text-sm">No upcoming events.</div> : <div className="divide-y divide-stone-100">{calendarEvents.map(e=>{const d=Math.ceil((new Date(e.date).getTime()-Date.now())/86400000);return <div key={e.name} className="p-4 hover:bg-stone-50"><div className="flex items-center gap-2 mb-1"><span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-medium ${e.priority==="critical"?"bg-red-100 text-red-700":e.priority==="high"?"bg-amber-100 text-amber-700":"bg-stone-100 text-stone-600"}`}>{e.priority}</span><span className="text-[10px] uppercase text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">{e.type}</span><span className="text-xs text-stone-500">{new Date(e.date).toLocaleDateString("en-IN",{day:"numeric",month:"short"})}</span><span className="text-xs text-amber-600 font-medium">{d}d</span></div><p className="font-medium text-sm text-stone-900">{e.name}</p><p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{e.relevance}</p></div>})}</div>}
          </>}
          {activeIntel==="competitors" && <div className="divide-y divide-stone-100">{competitors.map(c=><div key={c.name} className="p-4 hover:bg-stone-50"><div className="flex items-center gap-2 mb-2"><h3 className="font-semibold text-stone-900">{c.name}</h3><span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">{c.category}</span></div><div className="grid grid-cols-2 gap-3 text-xs"><div><p className="text-green-700 font-medium mb-1">Strengths</p>{c.strengths.slice(0,3).map((s,i)=><p key={i} className="text-stone-600">• {s}</p>)}</div><div><p className="text-red-700 font-medium mb-1">Weaknesses</p>{c.weaknesses.slice(0,3).map((w,i)=><p key={i} className="text-stone-600">• {w}</p>)}</div></div><div className="mt-2 p-2 bg-amber-50 rounded-lg text-xs"><span className="font-medium text-amber-800">SEWA Advantage: </span><span className="text-stone-700">{c.sewaAdvantage.slice(0,120)}...</span></div></div>)}</div>}
          {activeIntel==="gaps" && <div className="divide-y divide-stone-100">{gaps.map(g=><div key={g.id} className="p-4 hover:bg-stone-50"><div className="flex items-start gap-2 mb-3"><span className="text-lg mt-0.5">{g.id==="category-ownership"?"🏆":g.id==="quick-commerce"?"⚡":g.id==="gifting"?"🎁":g.id==="wedding-return-gifts"?"💍":"🏢"}</span><div className="flex-1"><h3 className="font-semibold text-sm text-stone-900">{g.gap}</h3><p className="text-xs text-stone-500 mt-1">{g.strategy.slice(0,150)}...</p></div><button onClick={()=>callAction("generate-gaps")} disabled={actionBusy!==""} className="px-2 py-1 text-[10px] rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 font-medium disabled:opacity-50 whitespace-nowrap">{actionBusy==="generate-gaps"?"...":"Generate"}</button></div><div className="space-y-2"><div><p className="text-[10px] font-medium text-stone-500 uppercase mb-1">Key Tactics</p>{g.tactics.slice(0,3).map((t,i)=><p key={i} className="text-xs text-stone-600">• {t}</p>)}</div><div><p className="text-[10px] font-medium text-stone-500 uppercase mb-1">Content Ideas</p>{g.contentTemplates.slice(0,2).map((c2,i)=><p key={i} className="text-xs text-stone-600">• {c2.slice(0,100)}...</p>)}</div></div></div>)}</div>}
          {activeIntel==="playbook" && <div className="p-4"><PlaybookView /></div>}
          {activeIntel==="creative" && <div className="p-4"><CreativeOpsView /></div>}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="font-semibold text-stone-900">Content Queue ({filtered.length})</h2>
          <div className="flex items-center gap-2">
            {content.filter(i=>i.status==="pending").length>0 && <button onClick={()=>callAction("approve-all")} disabled={actionBusy!==""} className="px-3 py-1 text-xs rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50">{actionBusy==="approve-all"?"...":`Approve All (${content.filter(i=>i.status==="pending").length})`}</button>}
            <div className="flex gap-1">{[{l:"all",f:"all"},{l:"pending",f:"pending"},{l:"approved",f:"approved"},{l:"posted",f:"posted"},{l:"failed",f:"failed"}].map(fv=><button key={fv.f} onClick={()=>setFilter(fv.f)} className={`px-3 py-1 text-xs rounded-full transition-colors ${filter===fv.f?"bg-amber-700 text-white":"bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>{fv.l}</button>)}</div>
          </div>
        </div>
        <div className="divide-y divide-stone-100 max-h-[600px] overflow-y-auto">
          {filtered.length===0 ? <div className="p-8 text-center text-stone-400 text-sm">No content yet. Click "Generate Posts" to create some.</div> : filtered.map(item=>(
            <div key={item.id} className="p-4 hover:bg-stone-50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] uppercase font-medium px-2 py-0.5 rounded-full ${item.status==="posted"?"bg-green-100 text-green-700":item.status==="approved"?"bg-blue-100 text-blue-700":item.status==="failed"?"bg-red-100 text-red-700":"bg-amber-100 text-amber-700"}`}>{item.status}</span>
                    <span className="text-[10px] uppercase text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">{item.platform}</span>
                    <span className="text-[10px] uppercase text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">{item.type}</span>
                  </div>
                  <p className="font-medium text-stone-900 text-sm">{item.title}</p>
                  <p className="text-stone-500 text-xs mt-1 line-clamp-2">{item.caption}</p>
                  {item.hashtags.length>0 && <div className="flex flex-wrap gap-1 mt-2">{item.hashtags.map(t=><span key={t} className="text-[10px] text-stone-400">{t}</span>)}</div>}
                  {item.status==="pending" && <div className="flex gap-2 mt-3"><button onClick={()=>callAction("approve",{id:item.id})} disabled={actionBusy!==""} className="px-3 py-1 text-[10px] rounded-full bg-green-600 text-white hover:bg-green-700 font-medium disabled:opacity-50">✓ Approve</button><button onClick={()=>callAction("reject",{id:item.id})} disabled={actionBusy!==""} className="px-3 py-1 text-[10px] rounded-full bg-red-100 text-red-700 hover:bg-red-200 font-medium disabled:opacity-50">✕ Reject</button></div>}
                </div>
                <span className="text-[10px] text-stone-400 whitespace-nowrap">{new Date(item.createdAt).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ABtn({label, a, b, c, act}:{label:string;a:string;b:string;c:(action:string,body?:Record<string,unknown>)=>void;act:boolean}) {
  return <button onClick={()=>c(a)} disabled={!act||b!==""} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${act?"bg-amber-700 text-white hover:bg-amber-800":"bg-stone-100 text-stone-400 cursor-not-allowed"} ${b===a?"opacity-50 animate-pulse":""}`}>{b===a?"...":label}</button>;
}

function PlaybookView() {
  const [data, setData] = useState<Record<string,unknown> | null>(null);
  useEffect(()=>{fetch("/api/agent?action=playbook").then(r=>r.json()).then(setData);},[]);
  if(!data) return <div className="p-4 text-stone-400 text-sm">Loading...</div>;
  const topP = (data as {topPriorities?:Array<Record<string,unknown>>}).topPriorities || [];
  const sales = (data as {aggressiveSalesTactics?:Record<string,unknown>}).aggressiveSalesTactics || {};
  const contentF = (data as {contentFormatsWinning?:Record<string,unknown>}).contentFormatsWinning || {};
  return <div className="space-y-6">
    <div><h3 className="font-semibold text-stone-900 text-sm mb-3">Top 5 Priorities</h3>{topP.map((p:Record<string,unknown>,i:number)=><div key={i} className="border border-stone-100 rounded-lg p-3 mb-2 text-xs"><div className="flex items-center gap-2 mb-1"><span className="font-semibold text-stone-900">#{i+1}</span><span className="font-medium text-amber-700">{p.name as string}</span><span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">{p.revenueImpact as string}</span></div><p className="text-stone-500">{(p.why as string)?.slice(0,150)}...</p></div>)}</div>
    <div><h3 className="font-semibold text-stone-900 text-sm mb-3">Aggressive Sales Tactics</h3>{Object.entries(sales as Record<string,{headline?:string;tactics?:string[]}>).slice(0,3).map(([key,val])=><div key={key} className="mb-3"><p className="text-xs font-medium text-amber-800 capitalize">{key.replace(/([A-Z])/g," $1")}</p><p className="text-xs text-stone-500">{val.headline?.slice(0,120)}</p><ul className="mt-1 space-y-0.5">{(val.tactics||[]).slice(0,3).map((t:string,j:number)=><li key={j} className="text-[11px] text-stone-600 ml-3">• {t.slice(0,100)}</li>)}</ul></div>)}</div>
    <div><h3 className="font-semibold text-stone-900 text-sm mb-3">Winning Content Formats</h3>{Object.entries(contentF as Record<string,Array<Record<string,string>>>).slice(0,2).map(([key,items])=><div key={key} className="mb-2"><p className="text-xs font-medium text-stone-500 uppercase">{key}</p>{(items||[]).slice(0,2).map((item,j)=><p key={j} className="text-[11px] text-stone-600 ml-3">• {item.type}: {item.idea?.slice(0,80)}...</p>)}</div>)}</div>
  </div>;
}

function CreativeOpsView() {
  const [data, setData] = useState<Record<string,unknown> | null>(null);
  const [tab, setTab] = useState("team");
  useEffect(()=>{fetch("/api/agent?action=creative-playbook").then(r=>r.json()).then(setData);},[]);
  if(!data) return <div className="p-4 text-stone-400 text-sm">Loading...</div>;
  const team = (data as {creativeTeam?:{structure?:Array<Record<string,unknown>>;totalTeamBudget?:string}}).creativeTeam || {};
  const visuals = (data as {visualIdentity?:Record<string,unknown>}).visualIdentity || {photoStyle:""} as Record<string,unknown>;
  const content = (data as {contentCreationPlaybook?:Record<string,unknown>}).contentCreationPlaybook || {};
  const packaging = (data as {packagingDesignBriefs?:Record<string,unknown>}).packagingDesignBriefs || {};
  const workflow = (data as {creativeReviewWorkflow?:Record<string,unknown>}).creativeReviewWorkflow || {};
  const pkg = packaging as {universalGuidelines?:Record<string,unknown>;productSpecific?:Array<Record<string,unknown>>};
  const universal = pkg.universalGuidelines || {};
  return <div>
    <div className="flex gap-1 mb-4">{[{k:"team",l:"Team"},{k:"visuals",l:"Visual Identity"},{k:"content",l:"Content Specs"},{k:"packaging",l:"Packaging"},{k:"workflow",l:"Review Workflow"}].map(t=><button key={t.k} onClick={()=>setTab(t.k)} className={`px-3 py-1 text-xs rounded-full ${tab===t.k?"bg-amber-700 text-white":"bg-stone-100 text-stone-600"}`}>{t.l}</button>)}</div>
    {tab==="team" && <div className="space-y-3">
      <div className="text-xs text-stone-500 mb-2">Budget: {(team as {totalTeamBudget?:string}).totalTeamBudget || "N/A"} (6 people)</div>
      {(team as {structure?:Array<Record<string,unknown>>}).structure?.map((r,i)=><div key={i} className="border border-stone-100 rounded-lg p-3 text-xs"><div className="flex items-center justify-between mb-1"><span className="font-semibold text-stone-900">{r.role as string}</span><span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">{r.type as string}</span><span className="text-amber-700 font-medium">{r.budget as string}</span></div><p className="text-stone-500 mb-1">{(r.idealProfile as string)?.slice(0,120)}</p><div className="flex flex-wrap gap-1">{((r.responsibilities as string[])||[]).slice(0,4).map((resp,j)=><span key={j} className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-800 rounded-full">{resp.slice(0,50)}</span>)}</div></div>)}
    </div>}
    {tab==="visuals" && <div className="space-y-3 text-xs">{(visuals as {photographyStyle?:Record<string,string>}).photographyStyle && Object.entries((visuals as {photographyStyle?:Record<string,string>}).photographyStyle!).map(([k,v])=><div key={k} className="border border-stone-100 rounded-lg p-3"><span className="font-medium text-amber-800 capitalize">{k}:</span> <span className="text-stone-600">{v}</span></div>)}</div>}
    {tab==="content" && <div className="space-y-3 text-xs">{(content as {instagramFeed?:{contentMix?:Record<string,{percentage:number;examples:string[]}>};reels?:{frequency:string;types?:Array<{name:string;duration:string}>}}).instagramFeed?.contentMix && Object.entries((content as {instagramFeed:{contentMix:Record<string,{percentage:number;examples:string[]}>}}).instagramFeed.contentMix).map(([k,v])=><div key={k} className="border border-stone-100 rounded-lg p-3"><span className="font-medium text-amber-800 capitalize">{k.replace(/([A-Z])/g," $1")} ({v.percentage}%):</span> <span className="text-stone-500">{v.examples.join(" • ")}</span></div>)}<div className="border border-stone-100 rounded-lg p-3"><span className="font-medium text-amber-800">Reels ({((content as {reels:{frequency:string}}).reels?.frequency)||"4/week"}):</span> {((content as {reels:{types?:Array<{name:string;duration:string}>}}).reels?.types||[]).map((t:Record<string,string>)=><span key={t.name} className="block text-stone-500 ml-3">• {t.name} ({t.duration})</span>)}</div></div>}
    {tab==="packaging" && <div className="space-y-3 text-xs"><div className="border border-amber-200 bg-amber-50 rounded-lg p-3"><span className="font-semibold text-amber-800">Universal Guidelines</span><p className="text-stone-600 mt-1">{(universal.materials as string)?.slice(0,200)}</p><div className="flex flex-wrap gap-1 mt-2">{((universal.sustainabilityFeatures as string[])||[]).map((f,i)=><span key={i} className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full">{f.slice(0,60)}</span>)}</div></div>{(pkg.productSpecific||[]).slice(0,6).map((p,i)=><div key={i} className="border border-stone-100 rounded-lg p-3"><span className="font-medium text-stone-900">{p.product as string}</span><span className="text-stone-400 ml-2">{p.boxStyle as string}</span><span className="text-stone-400 ml-2">{p.dimensions as string}</span><p className="text-stone-500 mt-1">{(p.labelArt as string)?.slice(0,150)}</p></div>)}</div>}
    {tab==="workflow" && <div className="space-y-2 text-xs">{(workflow as {stages?:Array<Record<string,string>>;tools?:string[]}).stages?.map((s,i)=><div key={i} className="border border-stone-100 rounded-lg p-3 flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold">{i+1}</span><div><p className="font-medium text-stone-900">{s.name} <span className="text-stone-400 font-normal">— {s.owner}</span></p><p className="text-stone-500">{s.timeline} → {s.output}</p></div></div>)}<div className="mt-3 p-3 bg-stone-50 rounded-lg"><span className="font-medium text-stone-700">Tools:</span> {((workflow as {tools?:string[]}).tools||[]).map((t:string)=><span key={t} className="ml-2 text-[10px] px-2 py-0.5 bg-white border border-stone-200 rounded-full">{t}</span>)}</div></div>}
  </div>;
}
