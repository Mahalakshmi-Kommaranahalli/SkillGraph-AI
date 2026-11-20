import React, { useState, useEffect, useRef } from 'react';
import { 
  Network, 
  Sparkles, 
  Info, 
  ExternalLink, 
  Filter, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { SKILL_ONTOLOGY, SKILL_CATEGORIES } from '../data/skillOntology.js';

export default function SkillGraphVisualizer({ 
  activeResume, 
  activeJob, 
  gapAnalysis, 
  onNavigateToRoadmap 
}) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [zoomLevel, setZoomLevel] = useState(1);
  const svgRef = useRef(null);

  // Build Graph Nodes and Edges based on activeResume and activeJob
  const studentSkillIds = new Set((activeResume.skills || []).map(s => s.id));
  const jobReqIds = new Set((activeJob.requiredSkills || []).map(s => s.id));
  const jobPrefIds = new Set((activeJob.preferredSkills || []).map(s => s.id));

  // Combine unique skills present in student or target role
  const allInvolvedSkillIds = new Set([
    ...studentSkillIds,
    ...jobReqIds,
    ...jobPrefIds
  ]);

  const nodes = [];
  const edges = [];

  // Categorize positions around clusters
  const categoryAngles = {
    [SKILL_CATEGORIES.FRONTEND]: { cx: 200, cy: 170, color: '#6366f1' },
    [SKILL_CATEGORIES.BACKEND]: { cx: 480, cy: 160, color: '#3b82f6' },
    [SKILL_CATEGORIES.DATABASE]: { cx: 580, cy: 360, color: '#10b981' },
    [SKILL_CATEGORIES.CLOUD_DEVOPS]: { cx: 180, cy: 400, color: '#f59e0b' },
    [SKILL_CATEGORIES.AI_ML]: { cx: 450, cy: 450, color: '#ec4899' },
    [SKILL_CATEGORIES.SYSTEM_DESIGN]: { cx: 360, cy: 260, color: '#8b5cf6' },
    [SKILL_CATEGORIES.TESTING_QA]: { cx: 280, cy: 320, color: '#06b6d4' },
    [SKILL_CATEGORIES.SOFT_SKILLS]: { cx: 350, cy: 100, color: '#a855f7' }
  };

  let nodeIndex = 0;
  for (const skillId of allInvolvedSkillIds) {
    const ontology = SKILL_ONTOLOGY[skillId];
    if (!ontology) continue;

    if (filterCategory !== 'ALL' && ontology.category !== filterCategory) {
      continue;
    }

    const isStudent = studentSkillIds.has(skillId);
    const isRequired = jobReqIds.has(skillId);
    const isPreferred = jobPrefIds.has(skillId);

    let status = 'other';
    let nodeColor = '#94a3b8';
    let ringColor = 'rgba(148, 163, 184, 0.3)';

    if (isRequired && !isStudent) {
      status = 'critical_gap';
      nodeColor = '#f43f5e'; // Rose
      ringColor = 'rgba(244, 63, 94, 0.4)';
    } else if (isPreferred && !isStudent) {
      status = 'secondary_gap';
      nodeColor = '#f59e0b'; // Amber
      ringColor = 'rgba(245, 158, 11, 0.4)';
    } else if (isStudent && (isRequired || isPreferred)) {
      status = 'matched';
      nodeColor = '#10b981'; // Emerald
      ringColor = 'rgba(16, 185, 129, 0.4)';
    } else if (isStudent) {
      status = 'student_extra';
      nodeColor = '#06b6d4'; // Cyan
      ringColor = 'rgba(6, 182, 212, 0.4)';
    }

    const cluster = categoryAngles[ontology.category] || { cx: 350, cy: 250, color: '#6366f1' };
    
    // Deterministic spread around cluster center
    const angle = (nodeIndex * 1.35) % (Math.PI * 2);
    const distance = 45 + (nodeIndex * 14) % 65;
    const x = cluster.cx + Math.cos(angle) * distance;
    const y = cluster.cy + Math.sin(angle) * distance;

    nodes.push({
      id: skillId,
      name: ontology.name,
      category: ontology.category,
      marketDemand: ontology.marketDemand,
      difficulty: ontology.difficulty,
      description: ontology.description,
      relatedSkills: ontology.relatedSkills || [],
      status,
      nodeColor,
      ringColor,
      x,
      y,
      radius: status === 'critical_gap' ? 18 : (status === 'matched' ? 16 : 14)
    });

    nodeIndex++;
  }

  // Create semantic edges
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  for (const node of nodes) {
    for (const relId of node.relatedSkills) {
      if (nodeMap.has(relId) && node.id < relId) {
        const target = nodeMap.get(relId);
        edges.push({
          source: node,
          target,
          key: `${node.id}-${relId}`
        });
      }
    }
  }

  // Auto select first critical gap or node if none selected
  useEffect(() => {
    if (!selectedNode && nodes.length > 0) {
      const firstGap = nodes.find(n => n.status === 'critical_gap') || nodes[0];
      setSelectedNode(firstGap);
    }
  }, [nodes]);

  return (
    <div className="space-y-6">
      {/* Visualizer Header */}
      <div className="glass-panel p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Network className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  Interactive SkillGraph Network Topology
                </h2>
                <span className="badge badge-indigo text-xs">Visual Ontology</span>
              </div>
              <p className="text-xs text-slate-400">
                Explore relational connections between candidate competencies, required industry skills, and missing bridges.
              </p>
            </div>
          </div>

          {/* Graph Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800">
              <button 
                onClick={() => setZoomLevel(prev => Math.min(1.5, prev + 0.1))}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.1))}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setZoomLevel(1)}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-indigo-400" />
            Category:
          </span>
          {['ALL', ...Object.values(SKILL_CATEGORIES)].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'All Domains' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Canvas & Inspector Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SVG Network Viewport (3 cols) */}
        <div className="lg:col-span-3 glass-panel p-4 relative overflow-hidden bg-slate-950/70 min-h-[500px] flex flex-col justify-between">
          {/* Legend Overlay */}
          <div className="absolute top-4 left-4 z-10 p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
              <span className="text-slate-300 font-medium">Matched Skill (Verified)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-sm shadow-rose-500/50"></span>
              <span className="text-rose-300 font-medium">Critical Missing Gap</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span>
              <span className="text-amber-300 font-medium">Secondary Gap (Nice-to-Have)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
              <span className="text-slate-400">Candidate Extra Strength</span>
            </div>
          </div>

          {/* SVG Graph */}
          <div className="w-full h-full flex items-center justify-center overflow-auto py-6">
            <svg
              ref={svgRef}
              viewBox="50 50 650 480"
              className="w-full h-[480px] select-none"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
            >
              {/* Defs for gradients & glows */}
              <defs>
                <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Render Connecting Edges */}
              {edges.map((edge) => (
                <line
                  key={edge.key}
                  x1={edge.source.x}
                  y1={edge.source.y}
                  x2={edge.target.x}
                  y2={edge.target.y}
                  stroke="#1e293b"
                  strokeWidth="1.5"
                  strokeDasharray="2,2"
                  className="transition-all hover:stroke-indigo-400"
                />
              ))}

              {/* Render Nodes */}
              {nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const isGap = node.status === 'critical_gap';

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer group"
                    transform={`translate(${node.x}, ${node.y})`}
                  >
                    {/* Pulsing ring for critical gaps */}
                    {isGap && (
                      <circle
                        r={node.radius + 8}
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                        opacity="0.6"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer selection ring */}
                    <circle
                      r={node.radius + 4}
                      fill="none"
                      stroke={isSelected ? '#ffffff' : node.ringColor}
                      strokeWidth={isSelected ? 2 : 1}
                      strokeDasharray={isSelected ? 'none' : '3,3'}
                    />

                    {/* Main node circle */}
                    <circle
                      r={node.radius}
                      fill={node.nodeColor}
                      filter={isGap ? 'url(#glow-rose)' : undefined}
                      className="transition-all duration-200 group-hover:scale-110"
                    />

                    {/* Skill Label */}
                    <text
                      y={node.radius + 14}
                      fill={isSelected ? '#ffffff' : '#cbd5e1'}
                      fontSize="9"
                      fontWeight={isSelected ? '700' : '500'}
                      textAnchor="middle"
                      className="pointer-events-none drop-shadow"
                    >
                      {node.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="text-[10px] text-slate-500 text-center pt-2 border-t border-slate-900">
            Tip: Click any skill node to view detailed gap impact, learning resources, and market demand in the inspector.
          </div>
        </div>

        {/* Node Inspector Panel (1 col) */}
        <div className="glass-panel p-5 flex flex-col justify-between space-y-4">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Info className="w-5 h-5" />
                </span>
                <span className={`badge ${
                  selectedNode.status === 'critical_gap' ? 'badge-rose' :
                  selectedNode.status === 'matched' ? 'badge-emerald' :
                  selectedNode.status === 'secondary_gap' ? 'badge-amber' : 'badge-cyan'
                } text-[10px]`}>
                  {selectedNode.status === 'critical_gap' ? 'Critical Blocker' :
                   selectedNode.status === 'matched' ? 'Verified Matched' :
                   selectedNode.status === 'secondary_gap' ? 'Secondary Gap' : 'Candidate Skill'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{selectedNode.name}</h3>
                <p className="text-xs text-indigo-300 font-medium mt-0.5">{selectedNode.category}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {selectedNode.description}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded bg-slate-900/50">
                  <span className="text-slate-400">Market Demand:</span>
                  <span className="text-cyan-400 font-mono font-semibold">{selectedNode.marketDemand}%</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-900/50">
                  <span className="text-slate-400">Difficulty:</span>
                  <span className="text-slate-200">{selectedNode.difficulty}</span>
                </div>
              </div>

              {selectedNode.status === 'critical_gap' && (
                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 space-y-1">
                  <strong className="block font-semibold">Recruiter Impact:</strong>
                  <span>Essential for candidate screening in {activeJob.title}. Without this skill, resume is rejected by automated filters.</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-slate-500 text-center py-12">
              Select any skill node in the graph to view intelligence details.
            </div>
          )}

          {selectedNode && (
            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={onNavigateToRoadmap}
                className="w-full btn btn-primary text-xs flex items-center justify-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Learning Roadmap</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

