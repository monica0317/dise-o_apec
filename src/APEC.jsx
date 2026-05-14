import { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  FolderKanban,
  ClipboardList,
  CheckSquare,
  CheckCircle2,
  Target,
  FileBarChart2,
  History,
  Settings2,
  Bell,
  PanelLeft,
  FileSpreadsheet,
  FileText,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  Upload,
  Download,
  TrendingUp,
  Clipboard,
  Clock,
  Plus,
  Filter,
  AlertTriangle,
  BarChart3
} from "lucide-react";

// ─── THEME & PALETTE ────────────────────────────────────────────────────────
const UAO = {
  red: "#C8102E",
  redDark: "#991B1B",
  redLight: "#FEE2E2",
  redMid: "#EF4444",
  white: "#FFFFFF",
  grayLight: "#F3F4F6",
  grayMed: "#E5E7EB",
  grayBorder: "#D1D5DB",
  grayText: "#6B7280",
  grayDark: "#374151",
  grayDarkest: "#1F2937",
  success: "#059669",
  successLight: "#D1FAE5",
  warning: "#D97706",
  warningLight: "#FEF3C7",
  info: "#2563EB",
  infoLight: "#DBEAFE",
};

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const MOCK_USER = {
  name: "Dr. Carlos Andrés Pérez Rodríguez",
  email: "caperez@uao.edu.co",
  role: "Docente",
  dept: "Facultad de Ingeniería",
  avatar: "CP",
  programa: "Ingeniería de Sistemas",
};

const MOCK_ASIGNATURAS = [
  { id: 1, codigo: "ISI801", nombre: "Proyecto de Grado I", creditos: 6, semestre: "2024-2", estudiantes: 28, grupo: "A", estado: "Activa", so: ["SO1","SO3","SO5","SO6"], docente: "Dr. Carlos Pérez" },
  { id: 2, codigo: "ISI802", nombre: "Proyecto de Grado II", creditos: 6, semestre: "2024-2", estudiantes: 22, grupo: "A", estado: "Activa", so: ["SO1","SO2","SO4","SO5","SO6"], docente: "Dra. María López" },
  { id: 3, codigo: "ISI601", nombre: "Seminario de Investigación", creditos: 3, semestre: "2024-2", estudiantes: 35, grupo: "B", estado: "Activa", so: ["SO1","SO7"], docente: "Dr. Carlos Pérez" },
  { id: 4, codigo: "ISI701", nombre: "Práctica Empresarial", creditos: 6, semestre: "2024-1", estudiantes: 30, grupo: "A", estado: "Cerrada", so: ["SO3","SO4","SO5"], docente: "Dr. Jorge Martínez" },
  { id: 5, codigo: "ISI501", nombre: "Diseño de Software", creditos: 4, semestre: "2024-2", estudiantes: 40, grupo: "C", estado: "Activa", so: ["SO1","SO2"], docente: "Dra. Ana Gómez" },
];

const MOCK_DOCENTES = [
  { id: 1, nombre: "Dr. Carlos Andrés Pérez Rodríguez", email: "caperez@uao.edu.co", dept: "Ing. de Sistemas", tipo: "Tiempo Completo", materias: 2, rol: "Docente", avatar: "CP", estado: "Activo" },
  { id: 2, nombre: "Dra. María Isabel López Vargas", email: "milopez@uao.edu.co", dept: "Ing. de Sistemas", tipo: "Tiempo Completo", materias: 3, rol: "Docente", avatar: "ML", estado: "Activo" },
  { id: 3, nombre: "Dr. Jorge Eduardo Martínez Ríos", email: "jemartinez@uao.edu.co", dept: "Ing. de Sistemas", tipo: "Catedrático", materias: 1, rol: "Docente", avatar: "JM", estado: "Activo" },
  { id: 4, nombre: "Dra. Ana Lucía Gómez Torres", email: "algomez@uao.edu.co", dept: "Ing. de Sistemas", tipo: "Tiempo Completo", materias: 2, rol: "Coordinadora ABET", avatar: "AG", estado: "Activo" },
  { id: 5, nombre: "Ing. Roberto Castillo Mejía", email: "rcastillo@uao.edu.co", dept: "Ing. de Sistemas", tipo: "Catedrático", materias: 1, rol: "Docente", avatar: "RC", estado: "Activo" },
  { id: 6, nombre: "Dr. Felipe Salcedo Pinto", email: "fsalcedo@uao.edu.co", dept: "Ing. de Sistemas", tipo: "Tiempo Completo", materias: 2, rol: "Director", avatar: "FS", estado: "Activo" },
];

const MOCK_ESTUDIANTES = [
  { id: 1, nombre: "Andrés Felipe Moreno Zapata", codigo: "2019115031", email: "afmoreno@uao.edu.co", semestre: 9, promedio: 4.2, grupo: "ISI801-A", avatar: "AM", estado: "Activo" },
  { id: 2, nombre: "Laura Valentina Castro Herrera", codigo: "2019115045", email: "lvcastro@uao.edu.co", semestre: 9, promedio: 4.5, grupo: "ISI801-A", avatar: "LC", estado: "Activo" },
  { id: 3, nombre: "Miguel Ángel Torres Rosero", codigo: "2019115063", email: "matorres@uao.edu.co", semestre: 9, promedio: 3.9, grupo: "ISI801-A", avatar: "MT", estado: "Activo" },
  { id: 4, nombre: "Camila Andrea Ruiz Palacios", codigo: "2019115078", email: "caruiz@uao.edu.co", semestre: 9, promedio: 4.7, grupo: "ISI801-A", avatar: "CR", estado: "Activo" },
  { id: 5, nombre: "Santiago David Bermúdez López", codigo: "2019115092", email: "sdbermudez@uao.edu.co", semestre: 9, promedio: 3.7, grupo: "ISI801-A", avatar: "SB", estado: "Activo" },
  { id: 6, nombre: "Valentina Ospina Cardona", codigo: "2019115107", email: "vospina@uao.edu.co", semestre: 9, promedio: 4.1, grupo: "ISI801-A", avatar: "VO", estado: "Activo" },
  { id: 7, nombre: "Sebastián Henao Muñoz", codigo: "2019115118", email: "shenao@uao.edu.co", semestre: 9, promedio: 4.3, grupo: "ISI801-A", avatar: "SH", estado: "Activo" },
  { id: 8, nombre: "Natalia Rincón Quintero", codigo: "2019115129", email: "nrincon@uao.edu.co", semestre: 9, promedio: 4.6, grupo: "ISI801-A", avatar: "NR", estado: "Activo" },
];

const MOCK_PROYECTOS = [
  { id: 1, titulo: "Sistema de Gestión de Inventarios con IA para PYMES del Valle del Cauca", asignatura: "ISI801-A", integrantes: ["Andrés Moreno","Laura Castro","Miguel Torres"], estado: "En evaluación", avance: 85, nota: null, docente: "Dr. Carlos Pérez" },
  { id: 2, titulo: "Plataforma de Telemedicina para Comunidades Rurales con Conectividad Limitada", asignatura: "ISI801-A", integrantes: ["Camila Ruiz","Santiago Bermúdez"], estado: "Evaluado", avance: 100, nota: 4.3, docente: "Dr. Carlos Pérez" },
  { id: 3, titulo: "Aplicación Móvil de Realidad Aumentada para Aprendizaje de Matemáticas en Primaria", asignatura: "ISI801-A", integrantes: ["Valentina Ospina","Sebastián Henao","Natalia Rincón"], estado: "En revisión", avance: 70, nota: null, docente: "Dr. Carlos Pérez" },
  { id: 4, titulo: "Sistema Blockchain para Trazabilidad de Cadena de Frío en Exportaciones de Café", asignatura: "ISI802-A", integrantes: ["Juan Pablo Díaz","María Fernanda Silva"], estado: "Evaluado", avance: 100, nota: 4.8, docente: "Dra. María López" },
  { id: 5, titulo: "Dashboard de Analítica Predictiva para Gestión Hospitalaria UAO", asignatura: "ISI802-A", integrantes: ["Carlos Ramírez","Andrea Mejía","Luis Echeverri"], estado: "Pendiente", avance: 40, nota: null, docente: "Dra. María López" },
];

const STUDENT_OUTCOMES = [
  { id: "SO1", label: "Análisis de Problemas de Ingeniería", desc: "Identificar, formular y resolver problemas complejos de ingeniería aplicando principios de ciencias, matemáticas y ciencias de la ingeniería", cumplimiento: 87, meta: 85, nivel: "Alto" },
  { id: "SO2", label: "Diseño de Sistemas", desc: "Diseñar soluciones para satisfacer necesidades especificadas con consideración de salud pública, seguridad y bienestar, así como factores globales, culturales, sociales, ambientales y económicos", cumplimiento: 82, meta: 80, nivel: "Alto" },
  { id: "SO3", label: "Comunicación Efectiva", desc: "Comunicarse efectivamente con diversas audiencias", cumplimiento: 79, meta: 80, nivel: "Medio" },
  { id: "SO4", label: "Ética Profesional", desc: "Reconocer las responsabilidades éticas y profesionales en situaciones de ingeniería y hacer juicios informados que deben considerar el impacto de las soluciones de ingeniería en contextos globales, económicos, ambientales y sociales", cumplimiento: 91, meta: 85, nivel: "Alto" },
  { id: "SO5", label: "Trabajo en Equipo", desc: "Funcionar efectivamente como miembro o líder de un equipo cuyos miembros en conjunto proveen liderazgo, crean un ambiente colaborativo e inclusivo, establecen metas, planifican tareas y cumplen objetivos", cumplimiento: 88, meta: 85, nivel: "Alto" },
  { id: "SO6", label: "Experimentación e Investigación", desc: "Desarrollar y conducir experimentos apropiados, analizar e interpretar datos y usar el juicio de ingeniería para sacar conclusiones", cumplimiento: 74, meta: 80, nivel: "Bajo" },
  { id: "SO7", label: "Aprendizaje Autónomo", desc: "Adquirir y aplicar nuevo conocimiento según sea necesario, usando estrategias de aprendizaje apropiadas", cumplimiento: 85, meta: 80, nivel: "Alto" },
];

const RUBRICA_CRITERIOS = [
  { id: 1, so: "SO1", codigo: "A1.1", descripcion: "Identifica y formula claramente el problema de ingeniería con sus restricciones y suposiciones", peso: 25 },
  { id: 2, so: "SO1", codigo: "A1.2", descripcion: "Aplica principios matemáticos y científicos apropiados para el análisis del problema", peso: 25 },
  { id: 3, so: "SO1", codigo: "A1.3", descripcion: "Propone solución técnicamente viable y sustentada en fundamentos de ingeniería", peso: 30 },
  { id: 4, so: "SO1", codigo: "A1.4", descripcion: "Evalúa múltiples alternativas de solución con criterios técnicos y de factibilidad", peso: 20 },
  { id: 5, so: "SO2", codigo: "B2.1", descripcion: "El diseño satisface los requerimientos funcionales y no funcionales establecidos", peso: 30 },
  { id: 6, so: "SO2", codigo: "B2.2", descripcion: "Considera factores de sostenibilidad, seguridad y contexto social en el diseño", peso: 25 },
  { id: 7, so: "SO3", codigo: "C3.1", descripcion: "El informe escrito presenta estructura lógica, claridad y rigor técnico", peso: 50 },
  { id: 8, so: "SO3", codigo: "C3.2", descripcion: "La presentación oral comunica efectivamente los resultados a la audiencia", peso: 50 },
  { id: 9, so: "SO5", codigo: "E5.1", descripcion: "El equipo distribuye roles y responsabilidades de forma equitativa y documentada", peso: 50 },
  { id: 10, so: "SO5", codigo: "E5.2", descripcion: "Se evidencia comunicación interna efectiva y resolución constructiva de conflictos", peso: 50 },
];

const EVAL_MOCK_RESULT = {
  grupal: {
    "ISI801-A - Proyecto 1": {
      criterios: { 1: true, 2: true, 3: false, 4: true, 5: true, 6: false, 7: true, 8: true, 9: true, 10: true },
      nota: 4.1,
    }
  }
};

const HISTORIAL = [
  { id: 1, proyecto: "Sistema de Gestión de Inventarios con IA", asignatura: "ISI801-A", fecha: "2024-11-15", evaluador: "Dr. Carlos Pérez", nota: 4.1, estado: "Publicada" },
  { id: 2, proyecto: "Plataforma de Telemedicina Rural", asignatura: "ISI801-A", fecha: "2024-11-10", evaluador: "Dr. Carlos Pérez", nota: 4.3, estado: "Publicada" },
  { id: 3, proyecto: "Blockchain para Café", asignatura: "ISI802-A", fecha: "2024-11-08", evaluador: "Dra. María López", nota: 4.8, estado: "Publicada" },
  { id: 4, proyecto: "Dashboard Hospitalario UAO", asignatura: "ISI802-A", fecha: "2024-11-20", evaluador: "Dra. María López", nota: null, estado: "Borrador" },
];

// ─── CONTEXT ─────────────────────────────────────────────────────────────────
const AppCtx = createContext(null);

function useApp() { return useContext(AppCtx); }

// ─── TOAST SYSTEM ─────────────────────────────────────────────────────────────
function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type === "success" ? UAO.success : t.type === "error" ? UAO.red : UAO.info,
          color: "#fff", padding: "12px 18px", borderRadius: 10, fontSize: 14,
          boxShadow: "0 4px 24px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 10,
          minWidth: 260, maxWidth: 360, animation: "slideIn .25s ease",
        }}>
          <span>{t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}</span>
          <span style={{ flex: 1 }}>{t.msg}</span>
          <button onClick={() => removeToast(t.id)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, opacity: 0.7 }}>×</button>
        </div>
      ))}
    </div>
  );
}

// ─── MINI COMPONENTS ─────────────────────────────────────────────────────────
function Avatar({ initials, size = 36, bg = UAO.red, color = "#fff", fontSize = 13 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: bg, color,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize, flexShrink: 0, fontFamily: "Georgia, serif",
      letterSpacing: 0.5,
    }}>{initials}</div>
  );
}

function Badge({ children, color = UAO.red, bg = UAO.redLight }) {
  return (
    <span style={{
      background: bg, color, borderRadius: 6, padding: "2px 10px",
      fontSize: 11, fontWeight: 700, letterSpacing: 0.4, display: "inline-flex", alignItems: "center",
    }}>{children}</span>
  );
}

function StatCard({ label, value, sub, icon, color = UAO.red }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: "20px 22px",
      border: `1px solid ${UAO.grayMed}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 13, color: UAO.grayText, fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 20, background: `${color}15`, borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</span>
      </div>
      <span style={{ fontSize: 30, fontWeight: 800, color: UAO.grayDarkest, lineHeight: 1 }}>{value}</span>
      {sub && <span style={{ fontSize: 12, color: UAO.grayText }}>{sub}</span>}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", size = "md", disabled = false, style: extraStyle = {} }) {
  const base = {
    border: "none", borderRadius: 8, cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6,
    transition: "all .15s", opacity: disabled ? 0.6 : 1, fontFamily: "inherit",
    padding: size === "sm" ? "6px 14px" : size === "lg" ? "12px 28px" : "9px 20px",
    fontSize: size === "sm" ? 12 : size === "lg" ? 15 : 13,
    ...extraStyle,
  };
  const variants = {
    primary: { background: UAO.red, color: "#fff" },
    secondary: { background: UAO.grayLight, color: UAO.grayDark, border: `1px solid ${UAO.grayBorder}` },
    ghost: { background: "transparent", color: UAO.red, border: `1px solid ${UAO.red}` },
    danger: { background: UAO.redDark, color: "#fff" },
    success: { background: UAO.success, color: "#fff" },
  };
  return (
    <button onClick={disabled ? undefined : onClick} style={{ ...base, ...variants[variant] }}>
      {children}
    </button>
  );
}

function Modal({ open, onClose, title, children, width = 540 }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: 28, width: "100%", maxWidth: width,
        maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        animation: "fadeUp .2s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: UAO.grayDarkest }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: UAO.grayText, lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text", style: s = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, ...s }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: UAO.grayDark }}>{label}</label>}
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          border: `1px solid ${UAO.grayBorder}`, borderRadius: 8, padding: "9px 12px",
          fontSize: 14, outline: "none", color: UAO.grayDarkest, fontFamily: "inherit",
          transition: "border-color .15s",
        }}
        onFocus={e => e.target.style.borderColor = UAO.red}
        onBlur={e => e.target.style.borderColor = UAO.grayBorder}
      />
    </div>
  );
}

function Select({ label, value, onChange, options, style: s = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, ...s }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: UAO.grayDark }}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        border: `1px solid ${UAO.grayBorder}`, borderRadius: 8, padding: "9px 12px",
        fontSize: 14, color: UAO.grayDarkest, background: "#fff", fontFamily: "inherit", outline: "none",
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function ProgressBar({ value, max = 100, color = UAO.red, height = 6, showLabel = false }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, background: UAO.grayMed, borderRadius: 99, height, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width .4s ease" }} />
      </div>
      {showLabel && <span style={{ fontSize: 12, fontWeight: 600, color: UAO.grayDark, minWidth: 34 }}>{pct}%</span>}
    </div>
  );
}

function Skeleton({ width = "100%", height = 16, borderRadius = 6, style: s = {} }) {
  return (
    <div style={{
      width, height, borderRadius, background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", ...s,
    }} />
  );
}

// ─── MINI BAR CHART (No recharts, pure SVG) ─────────────────────────────────
function BarChart({ data, height = 160, color = UAO.red }) {
  const max = Math.max(...data.map(d => d.value), 1);
  const w = 480, barW = Math.floor((w - 40) / data.length) - 8;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${height + 40}`} style={{ overflow: "visible" }}>
      {data.map((d, i) => {
        const barH = Math.max(4, Math.floor(((d.value) / max) * height));
        const x = 20 + i * (barW + 8);
        const y = height - barH;
        const col = d.value >= (d.meta || 80) ? UAO.success : d.value >= 70 ? UAO.warning : UAO.red;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={barH} rx={4} fill={col} opacity={0.85} />
            {d.meta && <line x1={x} y1={height - Math.floor((d.meta / max) * height)} x2={x + barW} y2={height - Math.floor((d.meta / max) * height)} stroke="#374151" strokeWidth={1.5} strokeDasharray="3,2" />}
            <text x={x + barW / 2} y={height + 14} textAnchor="middle" fontSize={9} fill={UAO.grayText} fontFamily="inherit">{d.label}</text>
            <text x={x + barW / 2} y={y - 5} textAnchor="middle" fontSize={10} fill={col} fontWeight="700" fontFamily="inherit">{d.value}%</text>
          </g>
        );
      })}
      <line x1={20} y1={0} x2={20} y2={height} stroke={UAO.grayBorder} strokeWidth={1} />
      <line x1={20} y1={height} x2={w - 10} y2={height} stroke={UAO.grayBorder} strokeWidth={1} />
    </svg>
  );
}

function DonutChart({ data, size = 120 }) {
  const total = data.reduce((a, b) => a + b.value, 0);
  const cx = size / 2, cy = size / 2, r = size * 0.38, stroke = size * 0.15;
  let angle = -90;
  const arcs = data.map(d => {
    const pct = d.value / total;
    const a1 = angle, a2 = angle + pct * 360;
    angle = a2;
    const rad1 = (a1 * Math.PI) / 180, rad2 = (a2 * Math.PI) / 180;
    const x1 = cx + r * Math.cos(rad1), y1 = cy + r * Math.sin(rad1);
    const x2 = cx + r * Math.cos(rad2), y2 = cy + r * Math.sin(rad2);
    const large = pct > 0.5 ? 1 : 0;
    return { ...d, path: `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`, pct };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {arcs.map((a, i) => (
        <path key={i} d={a.path} fill="none" stroke={a.color} strokeWidth={stroke} strokeLinecap="butt" />
      ))}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize={size * 0.2} fontWeight="800" fill={UAO.grayDarkest} fontFamily="inherit">{Math.round((data.find(d => d.label === "Cumple")?.value || 0) / total * 100)}%</text>
    </svg>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "asignaturas", label: "Asignaturas", icon: BookOpen },
  { key: "docentes", label: "Docentes", icon: GraduationCap },
  { key: "estudiantes", label: "Estudiantes", icon: Users },
  { key: "proyectos", label: "Proyectos", icon: FolderKanban },
  { key: "rubricas", label: "Rúbricas ABET", icon: ClipboardList },
  { key: "excel", label: "Carga Excel", icon: FileSpreadsheet },
  { key: "evaluacion", label: "Evaluación", icon: CheckSquare },
  { key: "outcomes", label: "Student Outcomes", icon: Target },
  { key: "reportes", label: "Reportes", icon: FileBarChart2 },
];
function Sidebar({ active, onNav, collapsed }) {
  return (
    <div style={{
      width: collapsed ? 64 : 242, minHeight: "100vh", background: UAO.grayDarkest,
      display: "flex", flexDirection: "column", transition: "width .25s ease",
      position: "fixed", top: 0, left: 0, zIndex: 100, overflowX: "hidden",
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? "20px 12px" : "20px 20px", borderBottom: `1px solid rgba(255,255,255,0.08)`,
        display: "flex", alignItems: "center", gap: 10, minHeight: 68,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, background: UAO.red,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 16, color: "#fff", flexShrink: 0,
        }}>A</div>
        {!collapsed && (
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>APEC</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, fontWeight: 500 }}>UAO · ABET Platform</div>
          </div>
        )}
      </div>
      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px 0", overflowY: "auto" }}>
        {NAV.map(n => {
  const isActive = active === n.key;
  const Icon = n.icon;

  return (
    <button
      key={n.key}
      onClick={() => onNav(n.key)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: collapsed ? "10px 0" : "10px 16px",
        width: "100%",
        border: "none",
        borderRadius: 0,
        cursor: "pointer",
        background: isActive ? `${UAO.red}20` : "transparent",
        borderLeft: isActive
          ? `3px solid ${UAO.red}`
          : "3px solid transparent",
        color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
        transition: "all .15s",
        fontFamily: "inherit",
        justifyContent: collapsed ? "center" : "flex-start",
      }}
    >
      <Icon size={18} strokeWidth={2} />

      {!collapsed && (
        <span
          style={{
            fontSize: 13,
            fontWeight: isActive ? 700 : 400,
          }}
        >
          {n.label}
        </span>
      )}
    </button>
  );
})}
      </nav>
      {/* User */}
      {!collapsed && (
        <div style={{
          padding: "14px 16px", borderTop: `1px solid rgba(255,255,255,0.08)`,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <Avatar initials={MOCK_USER.avatar} size={32} bg={UAO.red} fontSize={12} />
          <div style={{ overflow: "hidden" }}>
            <div style={{ color: "#fff", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {MOCK_USER.name.split(" ").slice(0, 3).join(" ")}
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>{MOCK_USER.role}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ onToggleSidebar, page, addToast }) {
  const labels = { dashboard: "Dashboard", asignaturas: "Asignaturas", docentes: "Docentes", estudiantes: "Estudiantes", proyectos: "Proyectos", rubricas: "Rúbricas ABET", excel: "Carga Excel", evaluacion: "Evaluación de Proyectos", outcomes: "Student Outcomes ABET", reportes: "Reportes", historial: "Historial de Evaluaciones", config: "Configuración", perfil: "Mi Perfil", admin: "Panel Administrativo" };
  const [notifOpen, setNotifOpen] = useState(false);
  const notifs = [
    { msg: "3 proyectos pendientes de evaluación", time: "hace 2h", unread: true },
    { msg: "Reporte SO6 actualizado por Dra. Gómez", time: "hace 5h", unread: true },
    { msg: "Nuevo grupo cargado: ISI802-B", time: "hace 1d", unread: false },
  ];
  return (
    <div style={{
      height: 60, background: "#fff", borderBottom: `1px solid ${UAO.grayMed}`,
      display: "flex", alignItems: "center", padding: "0 24px", gap: 16,
      position: "sticky", top: 0, zIndex: 50,
    }}>
    <button
  onClick={onToggleSidebar}
  style={{
    background: "none",
    border: "none",
    cursor: "pointer",
    color: UAO.grayText,
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <PanelLeft size={20} strokeWidth={2} />
</button>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: UAO.grayDarkest }}>{labels[page] || page}</span>
        <span style={{ marginLeft: 10, fontSize: 12, color: UAO.grayText, fontWeight: 400 }}>· Universidad Autónoma de Occidente</span>
      </div>
      <div style={{ position: "relative" }}>
       <button
        onClick={() => setNotifOpen(v => !v)}
        style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            position: "relative",
            padding: 4,
            color: UAO.grayText,
        }}
        >
        <Bell size={18} strokeWidth={2} />

        <span
            style={{
            position: "absolute",
            top: 1,
            right: 0,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: UAO.red,
            border: "2px solid #fff",
            }}
        />
        </button>
        {notifOpen && (
          <div style={{
            position: "absolute", right: 0, top: 40, width: 320, background: "#fff",
            border: `1px solid ${UAO.grayMed}`, borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 200,
          }}>
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${UAO.grayMed}`, fontWeight: 700, fontSize: 14, color: UAO.grayDarkest }}>Notificaciones</div>
            {notifs.map((n, i) => (
              <div key={i} style={{ padding: "12px 16px", borderBottom: `1px solid ${UAO.grayLight}`, display: "flex", gap: 10, alignItems: "flex-start", background: n.unread ? "#fff9f9" : "#fff" }}>
                {n.unread && <span style={{ width: 7, height: 7, borderRadius: "50%", background: UAO.red, marginTop: 6, flexShrink: 0 }} />}
                <div>
                  <div style={{ fontSize: 13, color: UAO.grayDarkest }}>{n.msg}</div>
                  <div style={{ fontSize: 11, color: UAO.grayText, marginTop: 2 }}>{n.time}</div>
                </div>
              </div>
            ))}
            <div style={{ padding: "10px 16px", textAlign: "center" }}>
              <button onClick={() => { setNotifOpen(false); addToast("Todas las notificaciones marcadas como leídas", "success"); }} style={{ background: "none", border: "none", color: UAO.red, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Marcar todas como leídas</button>
            </div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar initials={MOCK_USER.avatar} size={34} />
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: UAO.grayDarkest }}>{MOCK_USER.name.split(" ").slice(0, 2).join(" ")}</div>
          <div style={{ fontSize: 11, color: UAO.grayText }}>{MOCK_USER.role}</div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: LOGIN ─────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1800);
  };
  return (
    <div style={{
      minHeight: "100vh", background: `linear-gradient(135deg, ${UAO.grayDarkest} 0%, #2d1515 50%, ${UAO.redDark} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%",
            width: Math.random() * 200 + 60, height: Math.random() * 200 + 60,
            background: `rgba(200,16,46,${Math.random() * 0.06 + 0.02})`,
            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 8 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }} />
        ))}
      </div>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "48px 44px", width: "100%", maxWidth: 420,
        boxShadow: "0 30px 80px rgba(0,0,0,0.35)", position: "relative", zIndex: 1,
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, background: UAO.red,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: 28, fontWeight: 900, color: "#fff",
            boxShadow: `0 8px 24px ${UAO.red}55`,
          }}>A</div>
          <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 900, color: UAO.grayDarkest }}>APEC</h1>
          <p style={{ margin: 0, fontSize: 13, color: UAO.grayText }}>Aplicación Portable para Evaluación por Criterios</p>
          <div style={{ marginTop: 6 }}>
            <Badge color={UAO.redDark} bg={UAO.redLight}>Universidad Autónoma de Occidente</Badge>
          </div>
        </div>
        <div style={{ background: UAO.grayLight, borderRadius: 12, padding: "14px 16px", marginBottom: 24, fontSize: 13, color: UAO.grayDark, lineHeight: 1.5, border: `1px solid ${UAO.grayMed}` }}>
          <strong style={{ color: UAO.red }}>Acceso institucional</strong> mediante Microsoft 365.<br />
          Ingrese con sus credenciales UAO para continuar.
        </div>
        <button onClick={handleLogin} disabled={loading} style={{
          width: "100%", padding: "14px 20px", borderRadius: 10, border: "none",
          background: loading ? UAO.grayMed : "#2F2F2F", color: "#fff",
          fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          transition: "all .2s", fontFamily: "inherit",
        }}>
          <span style={{ fontSize: 18 }}>⊞</span>
          {loading ? "Autenticando con Microsoft..." : "Iniciar sesión con Microsoft 365"}
        </button>
        {loading && (
          <div style={{ marginTop: 16 }}>
            <div style={{ height: 4, background: UAO.grayMed, borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", background: UAO.red, borderRadius: 99, animation: "progress 1.8s ease forwards" }} />
            </div>
            <p style={{ textAlign: "center", fontSize: 12, color: UAO.grayText, marginTop: 8 }}>Verificando identidad institucional...</p>
          </div>
        )}
        <p style={{ textAlign: "center", fontSize: 11, color: UAO.grayText, marginTop: 24, lineHeight: 1.6 }}>
          Al iniciar sesión, acepta los términos de uso de la plataforma APEC y la política de tratamiento de datos de la UAO · v2.1.0
        </p>
      </div>
    </div>
  );
}

// ─── PAGE: DASHBOARD ─────────────────────────────────────────────────────────
function DashboardPage({ addToast }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 900); }, []);
  const soData = STUDENT_OUTCOMES.map(s => ({ label: s.id, value: s.cumplimiento, meta: s.meta }));
  const actividadReciente = [
    { text: "Evaluación cargada: ISI801-A Grupo 3", time: "Hace 30 min", type: "eval" },
    { text: "Excel procesado: ISI802-A estudiantes", time: "Hace 2h", type: "excel" },
    { text: "Rúbrica actualizada: SO6 criterios 2024-2", time: "Hace 3h", type: "rubrica" },
    { text: "Reporte SO exportado por Dra. Gómez", time: "Hace 5h", type: "reporte" },
    { text: "Nuevo docente agregado: Dr. Salcedo", time: "Hace 1d", type: "docente" },
  ];
  return (
    <div>
      {/* Welcome */}
      <div style={{ background: `linear-gradient(135deg, ${UAO.red}, ${UAO.redDark})`, borderRadius: 16, padding: "24px 28px", marginBottom: 24, color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800 }}>Bienvenido, Dr. Pérez</h2>
          <p style={{ margin: 0, opacity: 0.85, fontSize: 14 }}>Semestre 2024-2 · Programa de Ingeniería de Sistemas · Acreditación ABET</p>
        </div>
        <div style={{ textAlign: "right", opacity: 0.9 }}>
          <div style={{ fontSize: 13 }}>Última sesión</div>
          <div style={{ fontWeight: 700 }}>Hoy, 09:14 am</div>
        </div>
      </div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {loading ? [...Array(4)].map((_, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 22, border: `1px solid ${UAO.grayMed}` }}>
            <Skeleton height={12} width="60%" style={{ marginBottom: 12 }} />
            <Skeleton height={28} width="40%" />
          </div>
        )) : (
          <>
            <StatCard
            label="Asignaturas Activas"
            value="5"
            sub="Semestre 2024-2"
            icon={<BookOpen size={18} />}
            color={UAO.red}
            />
            <StatCard label="Estudiantes Matriculados" value="155" sub="+8 vs semestre anterior" icon={<GraduationCap size={18} />} color={UAO.info} />
            <StatCard label="Proyectos Evaluados" value="23" sub="De 31 en total" icon={<CheckCircle2 size={18} />} color={UAO.success} />
            <StatCard label="Cumplimiento ABET Promedio" value="83.7%" sub="Meta: 80% — ✓ Logrado" icon={<Target size={18} />} color={UAO.success} />
          </>
        )}
      </div>
      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* SO Chart */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "20px 22px", border: `1px solid ${UAO.grayMed}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: UAO.grayDarkest }}>Student Outcomes — Semestre 2024-2</h4>
            <Badge color={UAO.success} bg={UAO.successLight}>5/7 en meta</Badge>
          </div>
          {loading ? <Skeleton height={160} borderRadius={8} /> : <BarChart data={soData} />}
          <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 11, color: UAO.grayText }}>
            <span>— — Meta (80%)</span>
            <span style={{ color: UAO.success }}>■ Logrado</span>
            <span style={{ color: UAO.warning }}>■ En riesgo</span>
            <span style={{ color: UAO.red }}>■ No logrado</span>
          </div>
        </div>
        {/* Recent Activity */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "20px 22px", border: `1px solid ${UAO.grayMed}` }}>
          <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: UAO.grayDarkest }}>Actividad Reciente</h4>
          {loading ? [...Array(5)].map((_, i) => <Skeleton key={i} height={12} style={{ marginBottom: 12 }} />) : actividadReciente.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${UAO.grayLight}` : "none" }}>
              <div style={{ color: UAO.grayText }}>
                {a.type === "eval" ? (
                    <CheckCircle2 size={16} />
                ) : a.type === "excel" ? (
                    <FileSpreadsheet size={16} />
                ) : a.type === "rubrica" ? (
                    <ClipboardList size={16} />
                ) : a.type === "reporte" ? (
                    <FileText size={16} />
                ) : (
                    <UserPlus size={16} />
                )}
                </div>
              <div>
                <div style={{ fontSize: 13, color: UAO.grayDarkest }}>{a.text}</div>
                <div style={{ fontSize: 11, color: UAO.grayText }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick actions */}
      <div style={{ background: "#fff", borderRadius: 14, padding: "20px 22px", border: `1px solid ${UAO.grayMed}` }}>
        <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: UAO.grayDarkest }}>Acciones Rápidas</h4>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Btn onClick={() => addToast("Abriendo módulo de evaluación...", "info")}>Nueva Evaluación</Btn>
          <Btn variant="secondary" onClick={() => addToast("Cargando plantilla Excel...", "info")}>Cargar Excel</Btn>
          <Btn variant="ghost" onClick={() => addToast("Generando reporte PDF...", "info")}>Exportar Reporte</Btn>
          <Btn variant="secondary" onClick={() => addToast("Rúbricas actualizadas", "success")}>Ver Rúbricas</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: ASIGNATURAS ────────────────────────────────────────────────────────
function AsignaturasPage({ addToast }) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ codigo: "", nombre: "", creditos: "", semestre: "2024-2", grupo: "A" });
  const filtered = MOCK_ASIGNATURAS.filter(a =>
    a.nombre.toLowerCase().includes(search.toLowerCase()) ||
    a.codigo.toLowerCase().includes(search.toLowerCase())
  );
  const handleSave = () => {
    setModalOpen(false);
    addToast(selected ? "Asignatura actualizada correctamente" : "Asignatura creada exitosamente", "success");
    setForm({ codigo: "", nombre: "", creditos: "", semestre: "2024-2", grupo: "A" });
    setSelected(null);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <BookOpen size={22} color={UAO.red} />
        
        <h2
            style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 800,
            color: UAO.grayDarkest,
            }}
        >
            Asignaturas
        </h2>
        </div>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Gestión de materias vinculadas al proceso de evaluación ABET</p>
        </div>
        <Btn
        onClick={() => {
            setSelected(null);
            setModalOpen(true);
        }}
        >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Plus size={16} />
            Nueva Asignatura
        </div>
        </Btn>
      </div>
      {/* Filter bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <div style={{ position: "relative", flex: 1 }}>
    <div
    style={{
        position: "absolute",
        left: 12,
        top: "50%",
        transform: "translateY(-50%)",
        color: UAO.grayText,
        display: "flex",
        alignItems: "center",
    }}
    >
    <Search size={16} />
    </div>          
    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o código..."
            style={{ width: "100%", padding: "9px 12px 9px 36px", border: `1px solid ${UAO.grayBorder}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
        </div>
        <select style={{
  padding: "10px 14px",
  border: `1px solid ${UAO.grayBorder}`,
  borderRadius: 10,
  fontSize: 13,
  fontFamily: "inherit",
  outline: "none",
  background: "#fff",
  color: UAO.grayDarkest,
  fontWeight: 500,
  minWidth: 170,
}}>
          <option>Todos los semestres</option>
          <option>2024-2</option>
          <option>2024-1</option>
        </select>
        <select style={{
  padding: "10px 14px",
  border: `1px solid ${UAO.grayBorder}`,
  borderRadius: 10,
  fontSize: 13,
  fontFamily: "inherit",
  outline: "none",
  background: "#fff",
  color: UAO.grayDarkest,
  fontWeight: 500,
  minWidth: 170,
}}>
          <option>Todos los estados</option>
          <option>Activa</option>
          <option>Cerrada</option>
        </select>
      </div>
      {/* Table */}
        <div
        style={{
            background: "#fff",
            borderRadius: 18,
            border: `1px solid ${UAO.grayMed}`,
            overflow: "hidden",
            boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
        }}
        >       
         <table style={{ width: "100%",borderCollapse: "separate", borderSpacing: 0,  }}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {["Código","Nombre","Créditos","Semestre","Grupo","Docente","Estudiantes","SOs","Estado","Acciones"].map(h => (
                <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: UAO.grayDark, borderBottom: `1px solid ${UAO.grayMed}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={a.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${UAO.grayLight}` : "none", transition: "background .1s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: UAO.red, fontFamily: "monospace" }}>{a.codigo}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: UAO.grayDarkest, maxWidth: 200 }}>{a.nombre}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, textAlign: "center" }}>{a.creditos}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: UAO.grayDark }}>{a.semestre}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, textAlign: "center" }}>{a.grupo}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: UAO.grayDark, maxWidth: 140 }}>{a.docente}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, textAlign: "center", fontWeight: 600 }}>{a.estudiantes}</td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {a.so.map(s => <Badge key={s} color={UAO.info} bg={UAO.infoLight}>{s}</Badge>)}
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <Badge color={a.estado === "Activa" ? UAO.success : UAO.grayText} bg={a.estado === "Activa" ? UAO.successLight : UAO.grayLight}>{a.estado}</Badge>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                <div style={{ display: "flex", gap: 6 }}>
                <Btn
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                    setSelected(a);

                    setForm({
                        codigo: a.codigo,
                        nombre: a.nombre,
                        creditos: String(a.creditos),
                        semestre: a.semestre,
                        grupo: a.grupo,
                    });

                    setModalOpen(true);
                    }}
                >
                    <Pencil size={14} />
                </Btn>

                <Btn
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                    addToast(`Asignatura ${a.codigo} eliminada`, "error")
                    }
                >
                    <Trash2 size={14} />
                </Btn>
                </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: UAO.grayText, fontSize: 14 }}>No se encontraron asignaturas</div>}
        {/* Pagination */}
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${UAO.grayLight}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: UAO.grayText }}>
          <span>Mostrando {filtered.length} de {MOCK_ASIGNATURAS.length} asignaturas</span>
          <div style={{ display: "flex", gap: 6 }}>
            <Btn size="sm" variant="secondary">← Anterior</Btn>
            <Btn size="sm" variant="primary">1</Btn>
            <Btn size="sm" variant="secondary">Siguiente →</Btn>
          </div>
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={selected ? "Editar Asignatura" : "Nueva Asignatura"}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Input label="Código" value={form.codigo} onChange={v => setForm(f => ({ ...f, codigo: v }))} placeholder="ISI801" />
            <Input label="Créditos" value={form.creditos} onChange={v => setForm(f => ({ ...f, creditos: v }))} placeholder="6" type="number" />
          </div>
          <Input label="Nombre de la Asignatura" value={form.nombre} onChange={v => setForm(f => ({ ...f, nombre: v }))} placeholder="Proyecto de Grado I" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Select label="Semestre" value={form.semestre} onChange={v => setForm(f => ({ ...f, semestre: v }))}
              options={[{ value: "2024-2", label: "2024-2" }, { value: "2024-1", label: "2024-1" }, { value: "2025-1", label: "2025-1" }]} />
            <Select label="Grupo" value={form.grupo} onChange={v => setForm(f => ({ ...f, grupo: v }))}
              options={["A","B","C","D"].map(g => ({ value: g, label: `Grupo ${g}` }))} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: UAO.grayDark, display: "block", marginBottom: 6 }}>Student Outcomes Vinculados</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STUDENT_OUTCOMES.map(so => (
                <label key={so.id} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked={selected?.so?.includes(so.id)} />
                  {so.id}
                </label>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 8, borderTop: `1px solid ${UAO.grayLight}` }}>
            <Btn variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Btn>
            <Btn onClick={handleSave}>{selected ? "Actualizar" : "Crear Asignatura"}</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── PAGE: DOCENTES ────────────────────────────────────────────────────────────
function DocentesPage({ addToast }) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const filtered = MOCK_DOCENTES.filter(d => d.nombre.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: UAO.grayDarkest }}>Docentes</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Gestión del cuerpo docente del programa</p>
        </div>
        <Btn onClick={() => setModalOpen(true)}>+ Nuevo Docente</Btn>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <div style={{ position: "relative", flex: 1 }}>
        <div
        style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: UAO.grayText,
            display: "flex",
            alignItems: "center",
        }}
        >
        <Search size={16} />
        </div>      
    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar docente..."
            style={{ width: "100%", padding: "9px 12px 9px 36px", border: `1px solid ${UAO.grayBorder}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {filtered.map(d => (
          <div key={d.id} style={{ background: "#fff", borderRadius: 14, border: `1px solid ${UAO.grayMed}`, padding: 20, transition: "box-shadow .2s" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.10)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
              <Avatar initials={d.avatar} size={46} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: UAO.grayDarkest, lineHeight: 1.3 }}>{d.nombre}</div>
                <div style={{ fontSize: 12, color: UAO.grayText, marginTop: 2 }}>{d.email}</div>
                <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
                  <Badge color={d.rol === "Coordinadora ABET" ? UAO.info : d.rol === "Director" ? UAO.redDark : UAO.grayDark}
                    bg={d.rol === "Coordinadora ABET" ? UAO.infoLight : d.rol === "Director" ? UAO.redLight : UAO.grayLight}>{d.rol}</Badge>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, color: UAO.grayText }}>
              <div><span style={{ fontWeight: 600, color: UAO.grayDark }}>Tipo:</span> {d.tipo}</div>
              <div><span style={{ fontWeight: 600, color: UAO.grayDark }}>Materias:</span> {d.materias}</div>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <Btn size="sm" variant="secondary" style={{ flex: 1 }} onClick={() => addToast(`Perfil de ${d.nombre.split(" ")[1]} abierto`, "info")}>Ver Perfil</Btn>
              <Btn size="sm" variant="ghost" onClick={() => addToast("Correo enviado", "success")}>📧</Btn>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo Docente">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Input label="Nombres" placeholder="Carlos Andrés" value="" onChange={() => {}} />
            <Input label="Apellidos" placeholder="Pérez Rodríguez" value="" onChange={() => {}} />
          </div>
          <Input label="Correo institucional" placeholder="nombre@uao.edu.co" value="" onChange={() => {}} type="email" />
          <Select label="Tipo de vinculación" value="Tiempo Completo" onChange={() => {}}
            options={[{ value: "Tiempo Completo", label: "Tiempo Completo" }, { value: "Catedrático", label: "Catedrático" }]} />
          <Select label="Rol en el sistema" value="Docente" onChange={() => {}}
            options={["Docente","Coordinadora ABET","Director"].map(r => ({ value: r, label: r }))} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 8, borderTop: `1px solid ${UAO.grayLight}` }}>
            <Btn variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Btn>
            <Btn onClick={() => { setModalOpen(false); addToast("Docente agregado exitosamente", "success"); }}>Crear Docente</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── PAGE: ESTUDIANTES ─────────────────────────────────────────────────────────
function EstudiantesPage({ addToast }) {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("ISI801-A");
  const filtered = MOCK_ESTUDIANTES.filter(e =>
    (e.nombre.toLowerCase().includes(search.toLowerCase()) || e.codigo.includes(search)) &&
    (group === "Todos" || e.grupo === group)
  );
  return (
        <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <GraduationCap size={22} color={UAO.red} />

    <h2
        style={{
        margin: 0,
        fontSize: 22,
        fontWeight: 800,
        color: UAO.grayDarkest,
        }}
    >
        Estudiantes
    </h2>
    </div> 
         <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Gestión de estudiantes matriculados en el programa</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
        <Btn
        variant="secondary"
        onClick={() => addToast("Plantilla Excel descargada", "success")}
        >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Download size={16} />
            Plantilla Excel
        </div>
        </Btn>    
        <Btn onClick={() => addToast("Estudiante agregado", "success")}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Plus size={16} />
            Nuevo Estudiante
        </div>
        </Btn>  
      </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <div style={{ position: "relative", flex: 1 }}>
        <div
        style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: UAO.grayText,
            display: "flex",
            alignItems: "center",
        }}
        >
        <Search size={16} />
        </div>          
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o código..."
            style={{ width: "100%", padding: "9px 12px 9px 36px", border: `1px solid ${UAO.grayBorder}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
        </div>
        <select value={group} onChange={e => setGroup(e.target.value)} style={{ padding: "9px 14px", border: `1px solid ${UAO.grayBorder}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", background: "#fff" }}>
          <option value="Todos">Todos los grupos</option>
          {["ISI801-A","ISI802-A","ISI601-B"].map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${UAO.grayMed}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0,}}>
          <thead>
            <tr style={{ background: UAO.grayLight }}>
              {["Estudiante","Código","Email","Semestre","Promedio","Grupo","Estado","Acciones"].map(h => (
                <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: UAO.grayDark, borderBottom: `1px solid ${UAO.grayMed}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, i) => (
              <tr key={e.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${UAO.grayLight}` : "none" }}
                onMouseEnter={ev => ev.currentTarget.style.background = "#fafafa"}
                onMouseLeave={ev => ev.currentTarget.style.background = "#fff"}
              >
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={e.avatar} size={32} bg={`hsl(${e.id * 47}, 55%, 45%)`} fontSize={11} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: UAO.grayDarkest }}>{e.nombre}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 13, fontFamily: "monospace", color: UAO.grayDark }}>{e.codigo}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: UAO.info }}>{e.email}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, textAlign: "center" }}>{e.semestre}°</td>
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: e.promedio >= 4.0 ? UAO.success : e.promedio >= 3.5 ? UAO.warning : UAO.red }}>{e.promedio.toFixed(1)}</span>
                </td>
                <td style={{ padding: "12px 14px" }}><Badge color={UAO.info} bg={UAO.infoLight}>{e.grupo}</Badge></td>
                <td style={{ padding: "12px 14px" }}><Badge color={UAO.success} bg={UAO.successLight}>{e.estado}</Badge></td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Btn size="sm" variant="secondary" onClick={() => addToast(`Perfil de ${e.nombre.split(" ")[0]} abierto`, "info")}>Ver</Btn>
                    <Btn size="sm" variant="ghost" onClick={() => addToast(`Historial de ${e.nombre.split(" ")[0]} exportado`, "success")}>📊</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${UAO.grayLight}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: UAO.grayText }}>
          <span>Mostrando {filtered.length} estudiantes</span>
          <div style={{ display: "flex", gap: 6 }}>
            <Btn size="sm" variant="secondary">← Anterior</Btn>
            <Btn size="sm" variant="primary">1</Btn>
            <Btn size="sm" variant="secondary">Siguiente →</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: PROYECTOS ──────────────────────────────────────────────────────────
function ProyectosPage({ addToast }) {
  const [search, setSearch] = useState("");
  const [detalle, setDetalle] = useState(null);
  const filtered = MOCK_PROYECTOS.filter(p => p.titulo.toLowerCase().includes(search.toLowerCase()));
  const estadoColor = { "Evaluado": [UAO.success, UAO.successLight], "En evaluación": [UAO.warning, UAO.warningLight], "En revisión": [UAO.info, UAO.infoLight], "Pendiente": [UAO.grayText, UAO.grayLight] };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: UAO.grayDarkest }}>Proyectos Académicos</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Gestión y seguimiento de proyectos grupales por asignatura</p>
        </div>
        <Btn onClick={() => addToast("Proyecto creado", "success")}>+ Nuevo Proyecto</Btn>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <div style={{ position: "relative", flex: 1 }}>
        <div
        style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: UAO.grayText,
            display: "flex",
            alignItems: "center",
        }}
        >
        <Search size={16} />
        </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar proyecto..."
            style={{ width: "100%", padding: "9px 12px 9px 36px", border: `1px solid ${UAO.grayBorder}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
        </div>
        <select style={{ padding: "9px 14px", border: `1px solid ${UAO.grayBorder}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", background: "#fff" }}>
          <option>Todos los estados</option>
          <option>Evaluado</option>
          <option>En evaluación</option>
          <option>Pendiente</option>
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map(p => {
          const [c, bg] = estadoColor[p.estado] || [UAO.grayText, UAO.grayLight];
          return (
            <div key={p.id} style={{
              background: "#fff", borderRadius: 14, border: `1px solid ${UAO.grayMed}`,
              padding: "20px 22px", cursor: "pointer", transition: "box-shadow .2s",
            }}
              onClick={() => setDetalle(p)}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.10)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                    <Badge color={c} bg={bg}>{p.estado}</Badge>
                    <Badge color={UAO.info} bg={UAO.infoLight}>{p.asignatura}</Badge>
                    {p.nota && <Badge color={UAO.success} bg={UAO.successLight}>Nota: {p.nota}</Badge>}
                  </div>
                  <h3 style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 700, color: UAO.grayDarkest, lineHeight: 1.4 }}>{p.titulo}</h3>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {p.integrantes.map(m => (
                      <span key={m} style={{ fontSize: 12, color: UAO.grayDark, background: UAO.grayLight, borderRadius: 6, padding: "3px 10px" }}>👤 {m}</span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right", minWidth: 100 }}>
                  <div style={{ fontSize: 11, color: UAO.grayText, marginBottom: 6 }}>Avance</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: p.avance >= 80 ? UAO.success : UAO.warning }}>{p.avance}%</div>
                  <ProgressBar value={p.avance} color={p.avance >= 80 ? UAO.success : UAO.warning} height={6} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal open={!!detalle} onClose={() => setDetalle(null)} title="Detalle del Proyecto" width={600}>
        {detalle && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <Badge color={estadoColor[detalle.estado]?.[0]} bg={estadoColor[detalle.estado]?.[1]}>{detalle.estado}</Badge>
                <Badge color={UAO.info} bg={UAO.infoLight}>{detalle.asignatura}</Badge>
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: UAO.grayDarkest }}>{detalle.titulo}</h3>
              <p style={{ margin: "0 0 16px", fontSize: 13, color: UAO.grayText }}>Docente evaluador: {detalle.docente}</p>
            </div>
            <div style={{ background: UAO.grayLight, borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: UAO.grayDark, marginBottom: 8 }}>INTEGRANTES DEL GRUPO</div>
              {detalle.integrantes.map(m => (
                <div key={m} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${UAO.grayMed}` }}>
                  <Avatar initials={m.split(" ").map(x => x[0]).join("").slice(0,2)} size={28} bg={UAO.red} fontSize={10} />
                  <span style={{ fontSize: 13, color: UAO.grayDarkest }}>{m}</span>
                </div>
              ))}
            </div>
            {detalle.nota && (
              <div style={{ background: UAO.successLight, borderRadius: 10, padding: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: UAO.success }}>{detalle.nota}</span>
                <div><div style={{ fontWeight: 700, color: UAO.success }}>Evaluación completada</div><div style={{ fontSize: 12, color: UAO.success }}>Nota definitiva registrada</div></div>
              </div>
            )}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <Btn variant="secondary" onClick={() => setDetalle(null)}>Cerrar</Btn>
              <Btn onClick={() => { setDetalle(null); addToast("Abriendo módulo de evaluación...", "info"); }}>Evaluar Proyecto</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ─── PAGE: RÚBRICAS ────────────────────────────────────────────────────────────
function RubricasPage({ addToast }) {
  const [selectedSO, setSelectedSO] = useState("SO1");
  const criterios = RUBRICA_CRITERIOS.filter(c => c.so === selectedSO);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: UAO.grayDarkest }}>Rúbricas y Criterios ABET</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Configuración de criterios de evaluación por Student Outcome</p>
        </div>
        <Btn onClick={() => addToast("Criterio agregado exitosamente", "success")}>+ Nuevo Criterio</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
        {/* SO List */}
        <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${UAO.grayMed}`, overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${UAO.grayMed}`, fontWeight: 700, fontSize: 13, color: UAO.grayDarkest, background: UAO.grayLight }}>Student Outcomes</div>
          {STUDENT_OUTCOMES.map(so => (
            <button key={so.id} onClick={() => setSelectedSO(so.id)} style={{
              display: "block", width: "100%", padding: "12px 16px", border: "none",
              borderLeft: selectedSO === so.id ? `3px solid ${UAO.red}` : "3px solid transparent",
              background: selectedSO === so.id ? UAO.redLight : "transparent",
              textAlign: "left", cursor: "pointer", fontFamily: "inherit",
              borderBottom: `1px solid ${UAO.grayLight}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: selectedSO === so.id ? UAO.redDark : UAO.grayDarkest }}>{so.id}</div>
              <div style={{ fontSize: 11, color: UAO.grayText, marginTop: 2, lineHeight: 1.3 }}>{so.label}</div>
            </button>
          ))}
        </div>
        {/* Criterios */}
        <div>
          {(() => {
            const so = STUDENT_OUTCOMES.find(s => s.id === selectedSO);
            return (
              <>
                <div style={{ background: `linear-gradient(135deg, ${UAO.red}, ${UAO.redDark})`, borderRadius: 14, padding: "20px 24px", marginBottom: 16, color: "#fff" }}>
                  <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{so.id} — {so.label}</div>
                  <p style={{ margin: 0, fontSize: 13, opacity: 0.85, lineHeight: 1.6 }}>{so.desc}</p>
                  <div style={{ marginTop: 14, display: "flex", gap: 16 }}>
                    <div><div style={{ fontSize: 11, opacity: 0.7 }}>Cumplimiento actual</div><div style={{ fontSize: 22, fontWeight: 800 }}>{so.cumplimiento}%</div></div>
                    <div><div style={{ fontSize: 11, opacity: 0.7 }}>Meta ABET</div><div style={{ fontSize: 22, fontWeight: 800 }}>{so.meta}%</div></div>
                    <div><div style={{ fontSize: 11, opacity: 0.7 }}>Nivel</div><Badge color="#fff" bg="rgba(255,255,255,0.2)">{so.nivel}</Badge></div>
                  </div>
                </div>
                {criterios.length > 0 ? criterios.map(c => (
                  <div key={c.id} style={{ background: "#fff", borderRadius: 12, border: `1px solid ${UAO.grayMed}`, padding: "16px 20px", marginBottom: 12, display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ minWidth: 70, textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: UAO.grayText, marginBottom: 4 }}>Código</div>
                      <code style={{ fontSize: 13, fontWeight: 700, color: UAO.red, background: UAO.redLight, borderRadius: 6, padding: "3px 8px" }}>{c.codigo}</code>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: "0 0 8px", fontSize: 14, color: UAO.grayDarkest, lineHeight: 1.5 }}>{c.descripcion}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ flex: 1 }}><ProgressBar value={c.peso} max={100} color={UAO.red} /></div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: UAO.red, minWidth: 50 }}>Peso: {c.peso}%</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
            <Btn
            size="sm"
            variant="secondary"
            onClick={() => {
                setSelected(a);
                setForm({
                codigo: a.codigo,
                nombre: a.nombre,
                creditos: String(a.creditos),
                semestre: a.semestre,
                grupo: a.grupo
                });
                setModalOpen(true);
            }}
            >
            <Pencil size={14} />
            </Btn>                      
            <Btn
            size="sm"
            variant="ghost"
            onClick={() =>
                addToast(`Asignatura ${a.codigo} eliminada`, "error")
            }
            >
            <Trash2 size={14} />
            </Btn>
            </div>
                  </div>
                )) : (
                  <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${UAO.grayMed}`, padding: 40, textAlign: "center", color: UAO.grayText }}>
                    No hay criterios configurados para este Student Outcome.<br />
                    <Btn style={{ marginTop: 14 }} onClick={() => addToast("Criterio agregado", "success")}>+ Agregar Criterio</Btn>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: EXCEL ──────────────────────────────────────────────────────────────
function ExcelPage({ addToast }) {
  const [step, setStep] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState(null);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    setFileName("estudiantes_ISI801_2024-2.xlsx");
    setStep(1);
  };
  const handleProcess = () => {
    setProcessing(true);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) { p = 100; clearInterval(iv); setProcessing(false); setStep(2); addToast("Excel procesado: 28 estudiantes importados", "success"); }
      setProgress(Math.min(100, p));
    }, 200);
  };
  const preview = [
    { codigo: "2019115031", nombre: "Andrés Felipe Moreno Zapata", email: "afmoreno@uao.edu.co", semestre: 9 },
    { codigo: "2019115045", nombre: "Laura Valentina Castro Herrera", email: "lvcastro@uao.edu.co", semestre: 9 },
    { codigo: "2019115063", nombre: "Miguel Ángel Torres Rosero", email: "matorres@uao.edu.co", semestre: 9 },
    { codigo: "...", nombre: "...", email: "...", semestre: "..." },
  ];
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: UAO.grayDarkest }}>Carga de Datos Excel</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Importe listas de estudiantes, proyectos y evaluaciones desde archivos Excel</p>
      </div>
      {/* Steps indicator */}
      <div style={{ display: "flex", gap: 0, marginBottom: 28, background: "#fff", borderRadius: 12, border: `1px solid ${UAO.grayMed}`, overflow: "hidden" }}>
        {["Seleccionar archivo","Vista previa y validación","Importación completada"].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "14px 20px", textAlign: "center", background: step === i ? UAO.red : step > i ? UAO.redLight : "#fff", color: step === i ? "#fff" : step > i ? UAO.redDark : UAO.grayText, fontWeight: step === i ? 700 : 400, fontSize: 13, borderRight: i < 2 ? `1px solid ${UAO.grayMed}` : "none", transition: "all .3s" }}>
            <span style={{ fontWeight: 800, marginRight: 8 }}>{step > i ? "✓" : i + 1}.</span>{s}
          </div>
        ))}
      </div>
      {step === 0 && (
        <div>
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragging ? UAO.red : UAO.grayBorder}`,
              borderRadius: 16, padding: "60px 40px", textAlign: "center",
              background: dragging ? UAO.redLight : "#fff", transition: "all .2s",
              cursor: "pointer",
            }}
            onClick={() => { setFileName("estudiantes_ISI801_2024-2.xlsx"); setStep(1); }}
          >
            <BarChart3 size={48} color={UAO.red} style={{ marginBottom: 12 }} />
            <h3 style={{ margin: "0 0 8px", fontSize: 18, color: UAO.grayDarkest }}>Arrastra tu archivo Excel aquí</h3>
            <p style={{ margin: "0 0 20px", color: UAO.grayText, fontSize: 14 }}>O haz clic para seleccionar desde tu computador</p>
            <Badge color={UAO.grayDark} bg={UAO.grayLight}>.xlsx · .xls · .csv — Máximo 10MB</Badge>
          </div>
          <div style={{ marginTop: 20, background: "#fff", borderRadius: 12, border: `1px solid ${UAO.grayMed}`, padding: 20 }}>
            <h4 style={{ margin: "0 0 12px", fontSize: 14, color: UAO.grayDarkest }}>📋 Plantillas disponibles</h4>
            <div style={{ display: "flex", gap: 12 }}>
              {["Estudiantes por grupo","Proyectos grupales","Evaluaciones individuales"].map(t => (
                <Btn key={t} variant="secondary" size="sm" onClick={() => addToast(`Plantilla "${t}" descargada`, "success")}>⬇️ {t}</Btn>
              ))}
            </div>
          </div>
        </div>
      )}
      {step === 1 && (
        <div>
          <div style={{ background: UAO.successLight, borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", gap: 12, alignItems: "center", border: `1px solid #a7f3d0` }}>
            <span style={{ fontSize: 20 }}>📎</span>
            <div>
              <div style={{ fontWeight: 700, color: UAO.success }}>{fileName}</div>
              <div style={{ fontSize: 12, color: UAO.success }}>Archivo detectado · 28 filas · 6 columnas · 142 KB</div>
            </div>
          </div>
          <h4 style={{ margin: "0 0 12px", fontSize: 14, color: UAO.grayDarkest }}>Vista previa (primeras filas)</h4>
          <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${UAO.grayMed}`, overflow: "hidden", marginBottom: 20 }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, }}>
              <thead>
                <tr style={{ background: UAO.grayLight }}>
                  {["Código","Nombre completo","Email institucional","Semestre"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: UAO.grayDark, borderBottom: `1px solid ${UAO.grayMed}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((r, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${UAO.grayLight}` }}>
                    <td style={{ padding: "10px 14px", fontSize: 13, fontFamily: "monospace" }}>{r.codigo}</td>
                    <td style={{ padding: "10px 14px", fontSize: 13 }}>{r.nombre}</td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: UAO.info }}>{r.email}</td>
                    <td style={{ padding: "10px 14px", fontSize: 13, textAlign: "center" }}>{r.semestre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {processing && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, color: UAO.grayDark }}>
                <span>Procesando datos...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: 8, background: UAO.grayMed, borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: UAO.red, borderRadius: 99, transition: "width .1s" }} />
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="secondary" onClick={() => setStep(0)}>← Volver</Btn>
            <Btn onClick={handleProcess} disabled={processing}>{processing ? "Procesando..." : "Procesar e Importar →"}</Btn>
          </div>
        </div>
      )}
      {step === 2 && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h3 style={{ margin: "0 0 8px", fontSize: 22, color: UAO.success }}>¡Importación exitosa!</h3>
          <p style={{ margin: "0 0 24px", color: UAO.grayText, fontSize: 15 }}>28 estudiantes importados correctamente al grupo ISI801-A · Semestre 2024-2</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {[["Registros importados","28","✅"],["Errores encontrados","0","✅"],["Columnas mapeadas","6/6","✅"]].map(([l,v,ic]) => (
              <div key={l} style={{ background: UAO.grayLight, borderRadius: 10, padding: "14px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: UAO.grayDarkest }}>{v} {ic}</div>
                <div style={{ fontSize: 12, color: UAO.grayText }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center" }}>
            <Btn variant="secondary" onClick={() => { setStep(0); setFileName(null); }}>Cargar otro archivo</Btn>
            <Btn onClick={() => addToast("Navegando a estudiantes...", "info")}>Ver estudiantes importados →</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE: EVALUACIÓN ─────────────────────────────────────────────────────────
function EvaluacionPage({ addToast }) {
  const [asignatura, setAsignatura] = useState("ISI801-A");
  const [proyecto, setProyecto] = useState(MOCK_PROYECTOS[0]);
  const [criteriosState, setCriteriosState] = useState({});
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("grupal");
  const toggleCriterio = (id) => {
    setCriteriosState(s => ({ ...s, [id]: !s[id] }));
    setSaved(false);
  };
  const cumple = Object.values(criteriosState).filter(Boolean).length;
  const total = RUBRICA_CRITERIOS.length;
  const pct = total > 0 ? Math.round((cumple / total) * 100) : 0;
  const nota = (1 + (cumple / total) * 4).toFixed(1);
  const handleSave = () => {
    setSaved(true);
    addToast(`Evaluación guardada. Nota calculada: ${nota}`, "success");
  };
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: UAO.grayDarkest }}>Módulo de Evaluación</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Evaluación de proyectos bajo criterios ABET · Selección Cumple / No Cumple</p>
      </div>
      {/* Config row */}
      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${UAO.grayMed}`, padding: "16px 20px", marginBottom: 20, display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Select label="Asignatura" value={asignatura} onChange={setAsignatura}
          options={MOCK_ASIGNATURAS.map(a => ({ value: `${a.codigo}-${a.grupo}`, label: `${a.codigo}-${a.grupo} · ${a.nombre}` }))} style={{ flex: 1 }} />
        <Select label="Proyecto" value={proyecto?.id?.toString()} onChange={v => setProyecto(MOCK_PROYECTOS.find(p => p.id === parseInt(v)))}
          options={MOCK_PROYECTOS.slice(0,3).map(p => ({ value: p.id.toString(), label: p.titulo.slice(0, 50) + "..." }))} style={{ flex: 2 }} />
      </div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, background: "#fff", borderRadius: 10, border: `1px solid ${UAO.grayMed}`, width: "fit-content", overflow: "hidden" }}>
        {["grupal","individual"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 24px", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: tab === t ? 700 : 400, fontSize: 14, background: tab === t ? UAO.red : "transparent", color: tab === t ? "#fff" : UAO.grayText, transition: "all .15s" }}>
            {t === "grupal" ? "👥 Evaluación Grupal" : "👤 Evaluación Individual"}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
        {/* Criterios */}
        <div>
          {STUDENT_OUTCOMES.filter(so => ["SO1","SO2","SO3","SO5"].includes(so.id)).map(so => {
            const crit = RUBRICA_CRITERIOS.filter(c => c.so === so.id);
            if (!crit.length) return null;
            return (
              <div key={so.id} style={{ background: "#fff", borderRadius: 12, border: `1px solid ${UAO.grayMed}`, marginBottom: 16, overflow: "hidden" }}>
                <div style={{ background: UAO.grayLight, padding: "12px 18px", borderBottom: `1px solid ${UAO.grayMed}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 14, color: UAO.grayDarkest }}>{so.id} — {so.label}</span>
                  </div>
                  <Badge color={UAO.info} bg={UAO.infoLight}>{crit.length} criterios</Badge>
                </div>
                {crit.map(c => {
                  const cv = criteriosState[c.id];
                  return (
                    <div key={c.id} style={{
                      padding: "14px 18px", borderBottom: `1px solid ${UAO.grayLight}`,
                      display: "flex", alignItems: "center", gap: 16,
                      background: cv === true ? "#f0fdf4" : cv === false ? "#fef2f2" : "#fff",
                      transition: "background .2s",
                    }}>
                      <code style={{ fontSize: 12, fontWeight: 700, color: UAO.red, background: UAO.redLight, borderRadius: 4, padding: "2px 7px", flexShrink: 0 }}>{c.codigo}</code>
                      <p style={{ flex: 1, margin: 0, fontSize: 13, color: UAO.grayDarkest, lineHeight: 1.5 }}>{c.descripcion}</p>
                      <span style={{ fontSize: 11, color: UAO.grayText, flexShrink: 0 }}>Peso {c.peso}%</span>
                      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                        <button onClick={() => toggleCriterio(c.id)} style={{
                          padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                          background: cv === true ? UAO.success : UAO.grayLight,
                          color: cv === true ? "#fff" : UAO.grayDark, fontWeight: 700, fontSize: 12, fontFamily: "inherit",
                          transition: "all .15s",
                        }}>✓ Cumple</button>
                        <button onClick={() => setCriteriosState(s => ({ ...s, [c.id]: s[c.id] === false ? undefined : false }))} style={{
                          padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                          background: cv === false ? UAO.red : UAO.grayLight,
                          color: cv === false ? "#fff" : UAO.grayDark, fontWeight: 700, fontSize: 12, fontFamily: "inherit",
                          transition: "all .15s",
                        }}>✕ No Cumple</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {/* Panel de nota */}
        <div>
          <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${UAO.grayMed}`, padding: 20, position: "sticky", top: 20 }}>
            <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: UAO.grayDarkest }}>Motor de Cálculo ABET</h4>
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <DonutChart data={[{ label: "Cumple", value: Math.max(cumple,0.01), color: UAO.success }, { label: "No Cumple", value: Math.max(total - cumple, 0.01), color: UAO.redLight }]} size={120} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <div style={{ background: UAO.successLight, borderRadius: 10, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: UAO.success }}>{cumple}</div>
                <div style={{ fontSize: 11, color: UAO.success }}>Cumplen</div>
              </div>
              <div style={{ background: UAO.redLight, borderRadius: 10, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: UAO.red }}>{total - cumple}</div>
                <div style={{ fontSize: 11, color: UAO.red }}>No Cumplen</div>
              </div>
            </div>
            <div style={{ background: UAO.grayLight, borderRadius: 10, padding: 14, marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: UAO.grayText, marginBottom: 4 }}>NOTA CALCULADA</div>
              <div style={{ fontSize: 38, fontWeight: 900, color: parseFloat(nota) >= 3.0 ? UAO.success : UAO.red }}>{nota}</div>
              <div style={{ fontSize: 12, color: UAO.grayText }}>Sobre 5.0 · {pct}% cumplimiento</div>
            </div>
            <ProgressBar value={pct} color={pct >= 80 ? UAO.success : pct >= 60 ? UAO.warning : UAO.red} showLabel />
            {saved && <div style={{ background: UAO.successLight, borderRadius: 8, padding: "10px 14px", marginTop: 12, fontSize: 13, color: UAO.success, display: "flex", gap: 8 }}>Evaluación guardada</div>}
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              <Btn onClick={handleSave} style={{ width: "100%", justifyContent: "center" }}>💾 Guardar Evaluación</Btn>
              <Btn variant="secondary" style={{ width: "100%", justifyContent: "center" }} onClick={() => addToast("Evaluación publicada al estudiante", "success")}>📤 Publicar Resultado</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: STUDENT OUTCOMES ───────────────────────────────────────────────────
function OutcomesPage({ addToast }) {
  const [semestre, setSemestre] = useState("2024-2");
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: UAO.grayDarkest }}>Dashboard Student Outcomes ABET</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Cumplimiento de los 7 Student Outcomes del programa · Ingeniería de Sistemas</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <select value={semestre} onChange={e => setSemestre(e.target.value)} style={{ padding: "9px 14px", border: `1px solid ${UAO.grayBorder}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", background: "#fff" }}>
            <option value="2024-2">Semestre 2024-2</option>
            <option value="2024-1">Semestre 2024-1</option>
            <option value="2023-2">Semestre 2023-2</option>
          </select>
          <Btn variant="secondary" onClick={() => addToast("Reporte SO exportado", "success")}>📄 Exportar</Btn>
        </div>
      </div>
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard label="SOs en Meta" value="5/7" sub="Meta: ≥80% cumplimiento" icon={<Target size={18} />} color={UAO.success} />
        <StatCard label="Promedio General" value="83.7%" sub="+2.1% vs sem. anterior" icon={<TrendingUp size={18} />} color={UAO.success} />
        <StatCard label="SOs en Riesgo" value="1" sub="SO6: Experimentación" icon={<AlertTriangle size={18} />} color={UAO.warning} />
        <StatCard label="Proyectos Evaluados" value="23" sub="Muestras del período" icon={<Clipboard size={18} />} color={UAO.info} />
      </div>
      {/* Chart */}
      <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${UAO.grayMed}`, padding: "22px 24px", marginBottom: 24 }}>
        <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: UAO.grayDarkest }}>Cumplimiento por Student Outcome — {semestre}</h4>
        <BarChart data={STUDENT_OUTCOMES.map(s => ({ label: s.id, value: s.cumplimiento, meta: s.meta }))} height={180} />
        <div style={{ display: "flex", gap: 20, marginTop: 10, fontSize: 12, color: UAO.grayText }}>
          <span>— — Meta institucional (80%)</span>
          <span style={{ color: UAO.success }}>■ Logrado</span>
          <span style={{ color: UAO.warning }}>■ En riesgo (70-79%)</span>
          <span style={{ color: UAO.red }}>■ No logrado (&lt;70%)</span>
        </div>
      </div>
      {/* SO Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {STUDENT_OUTCOMES.map(so => {
          const col = so.cumplimiento >= so.meta ? UAO.success : so.cumplimiento >= 70 ? UAO.warning : UAO.red;
          const bg = so.cumplimiento >= so.meta ? UAO.successLight : so.cumplimiento >= 70 ? UAO.warningLight : UAO.redLight;
          return (
            <div key={so.id} style={{ background: "#fff", borderRadius: 12, border: `1px solid ${UAO.grayMed}`, padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ background: bg, color: col, borderRadius: 8, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{so.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: UAO.grayDarkest, marginBottom: 3 }}>{so.label}</div>
                  <div style={{ fontSize: 12, color: UAO.grayText, lineHeight: 1.4, maxWidth: 500 }}>{so.desc.slice(0,100)}...</div>
                </div>
                <div style={{ textAlign: "right", minWidth: 160 }}>
                  <div style={{ display: "flex", align: "center", justifyContent: "flex-end", gap: 10, marginBottom: 6 }}>
                    <Badge color={col} bg={bg}>{so.nivel}</Badge>
                    <span style={{ fontWeight: 800, fontSize: 18, color: col }}>{so.cumplimiento}%</span>
                  </div>
                  <ProgressBar value={so.cumplimiento} max={100} color={col} height={6} />
                  <div style={{ fontSize: 11, color: UAO.grayText, marginTop: 4 }}>Meta: {so.meta}% · {so.cumplimiento >= so.meta ? "Logrado" : "⚠️ Pendiente"}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PAGE: REPORTES ───────────────────────────────────────────────────────────
function ReportesPage({ addToast }) {
  const reportes = [
    { titulo: "Reporte General Student Outcomes", desc: "Informe completo de cumplimiento de los 7 SOs del programa con análisis por asignatura y período", tipo: "PDF", icon: <Target size={18} />, size: "2.4 MB" },
    { titulo: "Informe de Evaluaciones por Asignatura", desc: "Detalle de todas las evaluaciones realizadas con notas, criterios y estadísticas de cumplimiento ABET", tipo: "Excel", icon: <FileBarChart2 size={18} />, size: "1.8 MB" },
    { titulo: "Reporte de Desempeño Estudiantil", desc: "Análisis individual y grupal del desempeño de estudiantes en los criterios ABET evaluados", tipo: "PDF", icon: <GraduationCap size={18} />, size: "3.1 MB" },
    { titulo: "Dashboard Ejecutivo ABET", desc: "Resumen ejecutivo para directivos con KPIs principales del proceso de acreditación", tipo: "PDF", icon: <TrendingUp size={18} />, size: "1.2 MB" },
    { titulo: "Plantilla de Autoevaluación ABET", desc: "Formato oficial de autoevaluación para el proceso de acreditación ABET del programa", tipo: "Excel", icon: <Clipboard size={18} />, size: "850 KB" },
    { titulo: "Histórico de Cumplimiento SO", desc: "Serie histórica de cumplimiento de Student Outcomes de los últimos 4 semestres", tipo: "PDF", icon: <Clock size={18} />, size: "1.5 MB" },
  ];
  const [generating, setGenerating] = useState(null);
  const handleGenerate = (r) => {
    setGenerating(r.titulo);
    setTimeout(() => { setGenerating(null); addToast(`"${r.titulo}" generado y listo para descargar`, "success"); }, 1800);
  };
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: UAO.grayDarkest }}>Reportes y Exportaciones</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Generación y descarga de reportes institucionales para el proceso de acreditación ABET</p>
      </div>
      <div style={{ background: `linear-gradient(135deg, ${UAO.red}, ${UAO.redDark})`, borderRadius: 14, padding: "20px 24px", marginBottom: 24, color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800 }}>Paquete Completo de Acreditación ABET</h3>
            <p style={{ margin: 0, opacity: 0.85, fontSize: 13 }}>Todos los reportes necesarios para el proceso de acreditación en un solo ZIP</p>
          </div>
          <Btn variant="secondary" style={{ background: "#fff", color: UAO.red }} onClick={() => addToast("Paquete completo descargado (8.3 MB)", "success")}>⬇️ Descargar Paquete Completo</Btn>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {reportes.map(r => (
          <div key={r.titulo} style={{ background: "#fff", borderRadius: 14, border: `1px solid ${UAO.grayMed}`, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 32 }}>{r.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: UAO.grayDarkest, marginBottom: 4 }}>{r.titulo}</div>
                <p style={{ margin: 0, fontSize: 12, color: UAO.grayText, lineHeight: 1.5 }}>{r.desc}</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <Badge color={r.tipo === "PDF" ? UAO.red : UAO.success} bg={r.tipo === "PDF" ? UAO.redLight : UAO.successLight}>{r.tipo}</Badge>
                <span style={{ fontSize: 12, color: UAO.grayText, alignSelf: "center" }}>{r.size}</span>
              </div>
              <Btn size="sm" variant={generating === r.titulo ? "secondary" : "primary"}
                onClick={() => handleGenerate(r)} disabled={generating === r.titulo}>
                {generating === r.titulo ? "⏳ Generando..." : "⬇️ Generar"}
              </Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: HISTORIAL ──────────────────────────────────────────────────────────
function HistorialPage({ addToast }) {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: UAO.grayDarkest }}>Historial de Evaluaciones</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Registro completo de todas las evaluaciones realizadas en el sistema</p>
      </div>
    <div
    style={{
        background: "#fff",
        borderRadius: 18,
        border: `1px solid ${UAO.grayMed}`,
        overflow: "hidden",
        boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
    }}
    >       
 <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0,}}>
          <thead>
            <tr style={{ background: UAO.grayLight }}>
              {["Proyecto","Asignatura","Fecha","Evaluador","Nota","Estado","Acciones"].map(h => (
                <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: UAO.grayDark, borderBottom: `1px solid ${UAO.grayMed}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HISTORIAL.map((h, i) => (
              <tr key={h.id} style={{ borderBottom: i < HISTORIAL.length - 1 ? `1px solid ${UAO.grayLight}` : "none" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                <td style={{ padding: "12px 14px", fontSize: 13, color: UAO.grayDarkest, maxWidth: 220 }}>{h.proyecto}</td>
                <td style={{ padding: "12px 14px" }}><Badge color={UAO.info} bg={UAO.infoLight}>{h.asignatura}</Badge></td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: UAO.grayDark }}>{h.fecha}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: UAO.grayDark }}>{h.evaluador}</td>
                <td style={{ padding: "12px 14px" }}>
                  {h.nota ? <span style={{ fontWeight: 800, fontSize: 16, color: h.nota >= 3.5 ? UAO.success : UAO.red }}>{h.nota}</span> : <span style={{ color: UAO.grayText, fontSize: 13 }}>—</span>}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <Badge color={h.estado === "Publicada" ? UAO.success : UAO.warning} bg={h.estado === "Publicada" ? UAO.successLight : UAO.warningLight}>{h.estado}</Badge>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Btn size="sm" variant="secondary" onClick={() => addToast("Detalle de evaluación abierto", "info")}>Ver</Btn>
                    <Btn size="sm" variant="ghost" onClick={() => addToast("Reporte descargado", "success")}>📄</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PAGE: CONFIGURACIÓN ─────────────────────────────────────────────────────
function ConfigPage({ addToast }) {
  const [tab, setTab] = useState("institucional");
  const tabs = [["institucional","🏛️ Institucional"],["abet","🎯 ABET"],["notificaciones","🔔 Notificaciones"],["seguridad","🔒 Seguridad"]];
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: UAO.grayDarkest }}>Configuración del Sistema</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Parámetros institucionales y configuración de la plataforma APEC</p>
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${UAO.grayMed}`, overflow: "hidden" }}>
            {tabs.map(([k,l]) => (
              <button key={k} onClick={() => setTab(k)} style={{
                display: "block", width: "100%", padding: "12px 16px", border: "none",
                borderLeft: tab === k ? `3px solid ${UAO.red}` : "3px solid transparent",
                background: tab === k ? UAO.redLight : "transparent",
                color: tab === k ? UAO.redDark : UAO.grayDark,
                textAlign: "left", cursor: "pointer", fontFamily: "inherit",
                fontWeight: tab === k ? 700 : 400, fontSize: 13,
                borderBottom: `1px solid ${UAO.grayLight}`,
              }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, background: "#fff", borderRadius: 12, border: `1px solid ${UAO.grayMed}`, padding: 24 }}>
          {tab === "institucional" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>Datos Institucionales</h4>
              <Input label="Nombre de la institución" value="Universidad Autónoma de Occidente" onChange={() => {}} />
              <Input label="Programa académico" value="Ingeniería de Sistemas" onChange={() => {}} />
              <Input label="Facultad" value="Facultad de Ingeniería" onChange={() => {}} />
              <Input label="Semestre activo" value="2024-2" onChange={() => {}} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Input label="Nota mínima aprobatoria" value="3.0" onChange={() => {}} type="number" />
                <Input label="Meta de cumplimiento ABET (%)" value="80" onChange={() => {}} type="number" />
              </div>
              <Btn onClick={() => addToast("Configuración institucional guardada", "success")}>Guardar Cambios</Btn>
            </div>
          )}
          {tab === "abet" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>Parámetros ABET</h4>
              {[["Versión del estándar ABET","ABET EAC 2024-2025"],["Ciclo de acreditación","2022-2027"],["Organismo acreditador","ABET Inc."]].map(([l,v]) => (
                <Input key={l} label={l} value={v} onChange={() => {}} />
              ))}
              <label style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked />
                <span>Calcular nota automáticamente según criterios cumplidos</span>
              </label>
              <label style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked />
                <span>Alertar cuando un SO no alcanza la meta institucional</span>
              </label>
              <Btn onClick={() => addToast("Configuración ABET actualizada", "success")}>Guardar</Btn>
            </div>
          )}
          {tab === "notificaciones" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>Configuración de Notificaciones</h4>
              {["Notificaciones por correo electrónico","Alertas de proyectos pendientes","Recordatorio de evaluaciones próximas","Reporte semanal de avance SO","Alertas de SOs por debajo de la meta"].map(n => (
                <label key={n} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, cursor: "pointer", padding: "8px 0", borderBottom: `1px solid ${UAO.grayLight}` }}>
                  <input type="checkbox" defaultChecked={n !== "Reporte semanal de avance SO"} />
                  <span>{n}</span>
                </label>
              ))}
              <Btn onClick={() => addToast("Preferencias de notificaciones guardadas", "success")}>Guardar</Btn>
            </div>
          )}
          {tab === "seguridad" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>Seguridad y Acceso</h4>
              <div style={{ background: UAO.grayLight, borderRadius: 10, padding: 16, fontSize: 13, color: UAO.grayDark }}>
                <strong>Autenticación:</strong> Microsoft Azure AD SSO<br/>
                <strong>Último acceso:</strong> Hoy 09:14 am · Cali, Valle<br/>
                <strong>Sesiones activas:</strong> 1
              </div>
              {["Requerir 2FA para acciones críticas","Registrar todas las actividades del sistema","Bloquear sesión tras 30 min de inactividad"].map(n => (
                <label key={n} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked />
                  <span>{n}</span>
                </label>
              ))}
              <Btn variant="danger" onClick={() => addToast("Cerrando todas las sesiones...", "error")}>Cerrar todas las sesiones</Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: PERFIL ─────────────────────────────────────────────────────────────
function PerfilPage({ addToast }) {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: UAO.grayDarkest }}>Mi Perfil</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Información personal y preferencias de cuenta</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
        <div>
          <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${UAO.grayMed}`, padding: 24, textAlign: "center", marginBottom: 16 }}>
            <Avatar initials={MOCK_USER.avatar} size={80} fontSize={28} />
            <h3 style={{ margin: "16px 0 4px", fontSize: 16, fontWeight: 700 }}>{MOCK_USER.name}</h3>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: UAO.grayText }}>{MOCK_USER.email}</p>
            <Badge color={UAO.red} bg={UAO.redLight}>{MOCK_USER.role}</Badge>
            <div style={{ marginTop: 14 }}>
              <Btn variant="secondary" size="sm" onClick={() => addToast("Foto actualizada", "success")}>📷 Cambiar foto</Btn>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${UAO.grayMed}`, padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: UAO.grayText, marginBottom: 12 }}>ESTADÍSTICAS</div>
            {[["Evaluaciones realizadas","47"],["Asignaturas activas","2"],["Años en el programa","6"],["Proyectos supervisados","128"]].map(([l,v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${UAO.grayLight}` }}>
                <span style={{ fontSize: 13, color: UAO.grayText }}>{l}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: UAO.grayDarkest }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${UAO.grayMed}`, padding: 24 }}>
          <h4 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700 }}>Información Personal</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Input label="Nombres" value="Carlos Andrés" onChange={() => {}} />
              <Input label="Apellidos" value="Pérez Rodríguez" onChange={() => {}} />
            </div>
            <Input label="Correo institucional" value={MOCK_USER.email} onChange={() => {}} type="email" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Input label="Departamento" value={MOCK_USER.dept} onChange={() => {}} />
              <Input label="Programa" value={MOCK_USER.programa} onChange={() => {}} />
            </div>
            <Input label="Código docente" value="UAO-DOC-0892" onChange={() => {}} />
            <Select label="Idioma de la interfaz" value="es" onChange={() => {}}
              options={[{ value: "es", label: "Español" }, { value: "en", label: "English" }]} />
            <div style={{ paddingTop: 8, borderTop: `1px solid ${UAO.grayLight}`, display: "flex", gap: 10 }}>
              <Btn onClick={() => addToast("Perfil actualizado correctamente", "success")}>Guardar Cambios</Btn>
              <Btn variant="secondary" onClick={() => addToast("Cambios descartados", "info")}>Cancelar</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: ADMIN ──────────────────────────────────────────────────────────────
function AdminPage({ addToast }) {
  const stats = [
    { label: "Usuarios registrados", value: "47", icon: "👥" },
    { label: "Asignaturas en sistema", value: "23", icon: <GraduationCap size={18} /> },
    { label: "Evaluaciones totales", value: "312", icon: <Clipboard size={18} /> },
    { label: "Almacenamiento usado", value: "4.2 GB", icon: <HardDrive size={18} /> },
  ];
  const logs = [
    { user: "Dr. Pérez", action: "Evaluación guardada", time: "09:42", ip: "192.168.1.14" },
    { user: "Dra. Gómez", action: "Excel importado (35 registros)", time: "09:18", ip: "192.168.1.22" },
    { user: "Dr. Martínez", action: "Reporte PDF exportado", time: "08:55", ip: "192.168.1.8" },
    { user: "Sistema", action: "Backup automático completado", time: "06:00", ip: "localhost" },
    { user: "Dra. López", action: "Nueva rúbrica configurada", time: "Ayer 17:30", ip: "192.168.1.31" },
  ];
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: UAO.grayDarkest }}>Panel Administrativo</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: UAO.grayText }}>Gestión técnica y operativa de la plataforma APEC</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map(s => <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${UAO.grayMed}`, padding: 20 }}>
          <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700 }}>Estado del Sistema</h4>
          {[["Base de datos","Operativa"],["Servidor de archivos","Operativa"],["Integración Microsoft","Operativa"],["Servicio de correo","Operativa"],["API ABET","Modo demo"]].map(([s,e]) => (
            <div key={s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${UAO.grayLight}` }}>
              <span style={{ fontSize: 13, color: UAO.grayDark }}>{s}</span>
              <Badge color={e === "Operativa" ? UAO.success : UAO.warning} bg={e === "Operativa" ? UAO.successLight : UAO.warningLight}>{e === "Operativa" ? "🟢" : "🟡"} {e}</Badge>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${UAO.grayMed}`, padding: 20 }}>
          <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700 }}>Acciones de Mantenimiento</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
{[
  {
    label: "Sincronizar con Microsoft AD",
    variant: "secondary",
    icon: <RefreshCw size={16} />
  },
  {
    label: "Generar backup manual",
    variant: "secondary",
    icon: <Database size={16} />
  },
  {
    label: "Limpiar caché del sistema",
    variant: "secondary",
    icon: <Trash2 size={16} />
  },
  {
    label: "Regenerar reportes SO",
    variant: "primary",
    icon: <BarChart3 size={16} />
  },
  {
    label: "Modo mantenimiento",
    variant: "danger",
    icon: <AlertTriangle size={16} />
  }
].map((item, index) => (
  <Btn
    key={index}
    variant={item.variant}
    style={{ justifyContent: "flex-start" }}
    onClick={() =>
      addToast(
        `${item.label} ejecutado correctamente`,
        item.variant === "danger" ? "error" : "success"
      )
    }
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {item.icon}
      {item.label}
    </div>
  </Btn>
))}
          </div>
        </div>
      </div>
      {/* Logs */}
        <div
        style={{
            background: "#fff",
            borderRadius: 18,
            border: `1px solid ${UAO.grayMed}`,
            overflow: "hidden",
            boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
        }}
        >
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${UAO.grayMed}`, fontWeight: 700, fontSize: 14, display: "flex", justifyContent: "space-between" }}>
          <span>Registro de Actividad del Sistema</span>
          <Btn size="sm" variant="secondary" onClick={() => addToast("Logs exportados", "success")}>📄 Exportar logs</Btn>
        </div>
        <table style={{ width: "100%",  borderCollapse: "separate", borderSpacing: 0,}}>
          <thead>
            <tr style={{ background: UAO.grayLight }}>
              {["Usuario","Acción","Hora","IP"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: UAO.grayDark, borderBottom: `1px solid ${UAO.grayMed}` }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {logs.map((l, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${UAO.grayLight}` }}>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: UAO.grayDarkest }}>{l.user}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: UAO.grayDark }}>{l.action}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: UAO.grayText, fontFamily: "monospace" }}>{l.time}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: UAO.grayText, fontFamily: "monospace" }}>{l.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── CSS ANIMATIONS ───────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:${UAO.grayLight};color:${UAO.grayDarkest};}
@keyframes slideIn{from{transform:translateX(20px);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes fadeUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes progress{from{width:0}to{width:100%}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
::-webkit-scrollbar{width:6px;height:6px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:${UAO.grayBorder};border-radius:99px}
`;

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const addToast = (msg, type = "info") => {
    const id = ++toastId.current;
    setToasts(ts => [...ts, { id, msg, type }]);
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 3500);
  };
  const removeToast = id => setToasts(ts => ts.filter(t => t.id !== id));

  const sideW = collapsed ? 64 : 242;

  if (!loggedIn) return (
    <>
      <style>{CSS}</style>
      <LoginPage onLogin={() => { setLoggedIn(true); addToast("¡Bienvenido, Dr. Pérez! Sesión iniciada correctamente.", "success"); }} />
    </>
  );

  const pages = { dashboard: DashboardPage, asignaturas: AsignaturasPage, docentes: DocentesPage, estudiantes: EstudiantesPage, proyectos: ProyectosPage, rubricas: RubricasPage, excel: ExcelPage, evaluacion: EvaluacionPage, outcomes: OutcomesPage, reportes: ReportesPage, historial: HistorialPage, config: ConfigPage, perfil: PerfilPage, admin: AdminPage };
  const PageComp = pages[page] || DashboardPage;

  return (
    <>
      <style>{CSS}</style>
      <AppCtx.Provider value={{ addToast, page, setPage }}>
        <Sidebar active={page} onNav={setPage} collapsed={collapsed} />
        <div style={{ marginLeft: sideW, minHeight: "100vh", transition: "margin-left .25s ease" }}>
          <Navbar onToggleSidebar={() => setCollapsed(c => !c)} page={page} addToast={addToast} />
          <main style={{ padding: "24px 28px", maxWidth: 1400, margin: "0 auto" }}>
            <PageComp addToast={addToast} />
          </main>
        </div>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </AppCtx.Provider>
    </>
  );
}
