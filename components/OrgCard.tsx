
import React from 'react';
import { Employee } from '../types';
import { COLORS } from '../constants';

interface OrgCardProps {
  employee: Employee;
  onAISparkle: (role: string) => void;
}

const OrgCard: React.FC<OrgCardProps> = ({ employee, onAISparkle }) => {
  const getLevelStyle = () => {
    switch (employee.level) {
      case 0: return 'border-t-6 border-[#455A64] bg-[#ECEFF1]';
      case 1: 
        return employee.type === 'dg' 
          ? `border-t-6 border-[${COLORS.ceo}] bg-gradient-to-b from-[#FBE9E7] to-white`
          : `border-t-6 border-[${COLORS.dg}] bg-gradient-to-b from-[#FFF8E1] to-white`;
      case 2: return `border-t-6 border-[${COLORS.primary}] bg-gradient-to-b from-[#E3F2FD] to-white`;
      case 3: return `border-t-6 border-[${COLORS.ops}] bg-gradient-to-b from-[#E8F5E9] to-white`;
      default: return 'border-t-4 border-[#78909C] border-l-4 border-[#ECEFF1] bg-white';
    }
  };

  const getBorderColor = () => {
    if (employee.level === 0) return '#455A64';
    if (employee.level === 1) return employee.type === 'dg' ? COLORS.ceo : COLORS.dg;
    if (employee.level === 2) return COLORS.primary;
    if (employee.level === 3) return COLORS.ops;
    return '#78909C';
  };

  return (
    <div 
      className={`absolute w-[220px] bg-white border border-[#cfd8dc] rounded-2xl flex flex-col items-center py-4 px-2 cursor-pointer z-[2] shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:z-50`}
      style={{ 
        left: `${employee.position.x}px`, 
        top: `${employee.position.y}px`,
        borderTop: `6px solid ${getBorderColor()}`,
        transform: 'translateX(-110px)'
      }}
    >
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">{employee.area}</div>
      <div className="font-black text-sm text-[#263238] text-center mb-1 leading-tight">{employee.role}</div>
      <div className="text-[10px] text-[#546E7A] text-center italic bg-black/5 p-1 rounded w-[95%]">
        {employee.detail}
      </div>
      
      <div 
        onClick={(e) => { e.stopPropagation(); onAISparkle(employee.role); }}
        className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-[#6200EA] to-[#D500F9] text-white rounded-full flex items-center justify-center text-sm cursor-pointer z-10 shadow-lg hover:scale-110 transition-transform"
      >
        ✨
      </div>
      
      <div className="absolute -bottom-2 right-4 px-2 py-0.5 bg-gray-100 rounded-full border border-gray-300 text-[9px] font-bold text-gray-600">
        {employee.count}
      </div>
    </div>
  );
};

export default OrgCard;
