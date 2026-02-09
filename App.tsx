
import React, { useState, useCallback, useMemo } from 'react';
import { INITIAL_DATA, COLORS } from './constants';
import { Employee, AnalysisType } from './types';
import { runAIAnalysis } from './services/geminiService';
import OrgCard from './components/OrgCard';
import Modal from './components/Modal';
import Login from './components/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [data] = useState<Employee[]>(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Consultor Estratégico');
  const [modalContent, setModalContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleGlobalAI = useCallback(async (type: AnalysisType | string) => {
    setModalTitle(`Análisis IA: ${type}`);
    setModalContent('');
    setIsLoading(true);
    setIsModalOpen(true);

    const result = await runAIAnalysis(type, data);
    setModalContent(result);
    setIsLoading(false);
  }, [data]);

  const exportPDF = useCallback(async () => {
    // @ts-ignore
    const { jsPDF } = window.jspdf;
    // @ts-ignore
    const html2canvas = window.html2canvas;
    
    const doc = new jsPDF('p', 'mm', 'a4');
    
    doc.setFontSize(26);
    doc.setTextColor(21, 101, 192);
    doc.text("TALENT OS v13.0", 20, 50);
    doc.setFontSize(16);
    doc.setTextColor(38, 50, 56);
    doc.text("INFORME ESTRATÉGICO DE CAPITAL HUMANO", 20, 65);
    doc.setDrawColor(21, 101, 192);
    doc.setLineWidth(1);
    doc.line(20, 75, 190, 75);
    
    doc.setFontSize(10);
    doc.text(`Consultor: ${user?.name || 'Usuario Autorizado'}`, 20, 265);
    doc.text("Generado el: " + new Date().toLocaleString(), 20, 270);
    doc.text("© 2024 ISIT-APP TALENT OS", 20, 275);

    doc.addPage();
    doc.setFontSize(14);
    doc.text("ESTRUCTURA ORGANIZACIONAL", 20, 20);
    
    const canvas = document.getElementById('canvas');
    if (canvas) {
      const img = await html2canvas(canvas, { 
        scale: 0.8,
        useCORS: true,
        logging: false
      });
      doc.addImage(img.toDataURL('image/png'), 'PNG', 5, 30, 200, 140);
    }

    doc.addPage();
    doc.setFontSize(14);
    doc.text("DICCIONARIO DE ROLES Y FUNCIONES", 20, 20);
    
    const rows = data.map(e => [e.area, e.role, e.detail, e.count.toString()]);
    // @ts-ignore
    doc.autoTable({
      head: [['Área', 'Cargo', 'Funciones', 'FTEs']],
      body: rows,
      startY: 30,
      theme: 'grid',
      headStyles: { fillStyle: COLORS.primary }
    });

    doc.save(`Estrategia_ESGRAP_${new Date().getTime()}.pdf`);
  }, [data, user]);

  const connections = useMemo(() => {
    return data.filter(e => e.parentId).map(e => {
      const parent = data.find(p => p.id === e.parentId);
      if (!parent) return null;
      
      const x1 = parent.position.x;
      const y1 = parent.position.y + 100;
      const x2 = e.position.x;
      const y2 = e.position.y - 4;
      
      const midY = y1 + (y2 - y1) / 2;

      return (
        <path
          key={`conn-${parent.id}-${e.id}`}
          d={`M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`}
          stroke="#cfd8dc"
          strokeWidth="2"
          fill="none"
        />
      );
    });
  }, [data]);

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* User Status Bar */}
      <div className="fixed top-2 right-6 z-[1100] flex items-center gap-3">
         <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
            <img src={user.picture} alt="profile" className="w-6 h-6 rounded-full border border-blue-200" />
            <span className="text-[10px] font-bold text-gray-600">{user.email}</span>
            <button 
              onClick={handleLogout}
              className="text-[10px] bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded-full font-bold text-gray-400 transition-colors"
            >
              SALIR
            </button>
         </div>
      </div>

      {/* UI Controls */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-[1000] bg-white/90 backdrop-blur-md px-6 py-4 rounded-full shadow-2xl border border-white/20">
        <button 
          onClick={() => handleGlobalAI('Diagnostico')}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1976D2] text-white font-black text-sm rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          📊 <span className="hidden md:inline">Análisis IA</span>
        </button>
        <button 
          onClick={() => handleGlobalAI('Crisis')}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F57C00] text-white font-black text-sm rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          ⚡ <span className="hidden md:inline">Crisis</span>
        </button>
        <button 
          onClick={() => handleGlobalAI('Futuro')}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#7B1FA2] text-white font-black text-sm rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          🔮 <span className="hidden md:inline">Futuro</span>
        </button>
        <button 
          onClick={() => handleGlobalAI('Estrategia')}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#00897B] text-white font-black text-sm rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          🎯 <span className="hidden md:inline">Estrategia</span>
        </button>
        <div className="w-[1px] h-8 bg-gray-200 mx-2" />
        <button 
          onClick={exportPDF}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D32F2F] text-white font-black text-sm rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          🖨️ <span className="hidden md:inline">Exportar PDF</span>
        </button>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 overflow-auto bg-[#f4f6f8] relative">
        <div id="canvas" className="absolute top-[180px] left-[50px] w-[3400px] h-[2200px] bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Background Zones */}
          <div className="absolute top-[40px] left-[1300px] w-[600px] h-[250px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-[30px] opacity-40 pointer-events-none" />
          <div className="absolute top-[850px] left-[50px] w-[1150px] h-[1100px] bg-[#E3F2FD] border-2 border-dashed border-[#64B5F6] rounded-[30px] opacity-20 pointer-events-none" />
          <div className="absolute top-[850px] left-[1300px] w-[800px] h-[1100px] bg-[#FFF3E0] border-2 border-dashed border-[#FFB74D] rounded-[30px] opacity-20 pointer-events-none" />
          <div className="absolute top-[850px] left-[2200px] w-[1150px] h-[1100px] bg-[#E8F5E9] border-2 border-dashed border-[#81C784] rounded-[30px] opacity-20 pointer-events-none" />

          {/* SVG Connections */}
          <svg className="absolute inset-0 pointer-events-none z-[1] w-full h-full">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#cfd8dc" />
              </marker>
            </defs>
            {connections}
          </svg>

          {/* Org Cards */}
          {data.map(emp => (
            <OrgCard 
              key={emp.id} 
              employee={emp} 
              onAISparkle={(role) => handleGlobalAI(`Perfil: ${role}`)} 
            />
          ))}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-[#1565C0] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-bold animate-pulse text-sm">Ejecutando algoritmos de capital humano...</p>
          </div>
        ) : (
          <div className="whitespace-pre-wrap font-sans text-lg">
            {modalContent || "Sin contenido disponible."}
          </div>
        )}
      </Modal>

      <div className="fixed bottom-6 right-6 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-200 shadow-md text-[10px] font-bold text-gray-400 z-[1000]">
        TALENT OS v13.0 | <span className="text-blue-500">AUTORIZADO: {user.family_name}</span>
      </div>
    </div>
  );
};

export default App;
