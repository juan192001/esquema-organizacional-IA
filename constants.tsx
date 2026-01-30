
import { Employee } from './types';

export const COLORS = {
  primary: '#1565C0',
  ceo: '#D84315',
  dg: '#FF6F00',
  ops: '#2E7D32',
  comm: '#EF6C00',
  support: '#64B5F6',
  textDark: '#263238',
};

export const INITIAL_DATA: Employee[] = [
  // Gobierno
  { id: '1', area: 'GOBIERNO', role: 'Consejo de Administración', detail: 'Máximo Órgano de Gobierno', level: 0, count: 5, position: { x: 1600, y: 50 }, type: 'gov' },
  
  // CEO
  { id: '2', area: 'DIRECCIÓN', role: 'CEO', detail: 'Visión Estratégica Global', level: 1, count: 1, parentId: '1', position: { x: 1600, y: 350 }, type: 'dg' },
  
  // Nivel 1b: Directores Generales
  { id: '3', area: 'OPERACIONES', role: 'Director General Ops', detail: 'Ejecución y Eficiencia', level: 1, parentId: '2', count: 1, position: { x: 2500, y: 650 }, type: 'ops' },
  { id: '4', area: 'ESTRATEGIA', role: 'Director Comercial', detail: 'Crecimiento y Mercado', level: 1, parentId: '2', count: 1, position: { x: 1750, y: 650 }, type: 'comm' },
  { id: '5', area: 'SOPORTE', role: 'Director Corporativo', detail: 'Servicios Compartidos', level: 1, parentId: '2', count: 1, position: { x: 700, y: 650 }, type: 'support' },

  // Nivel 2: Managers Ops
  { id: '6', area: 'PRODUCCIÓN', role: 'Gerente Producción', detail: 'Cadena de Suministro', level: 2, parentId: '3', count: 1, position: { x: 2300, y: 950 }, type: 'ops' },
  { id: '7', area: 'LOGÍSTICA', role: 'Gerente Logística', detail: 'Distribución Global', level: 2, parentId: '3', count: 1, position: { x: 2700, y: 950 }, type: 'ops' },
  { id: '8', area: 'CALIDAD', role: 'Jefe de Calidad', detail: 'Estándares ISO', level: 3, parentId: '6', count: 3, position: { x: 2300, y: 1250 }, type: 'ops' },

  // Nivel 2: Managers Comm
  { id: '9', area: 'VENTAS', role: 'Gerente Ventas', detail: 'Ingresos Directos', level: 2, parentId: '4', count: 1, position: { x: 1600, y: 950 }, type: 'comm' },
  { id: '10', area: 'MARKETING', role: 'Gerente Marketing', detail: 'Branding y Digital', level: 2, parentId: '4', count: 1, position: { x: 1900, y: 950 }, type: 'comm' },

  // Nivel 2: Managers Support
  { id: '11', area: 'RRHH', role: 'Gerente Talento', detail: 'Cultura y Personas', level: 2, parentId: '5', count: 1, position: { x: 400, y: 950 }, type: 'support' },
  { id: '12', area: 'FINANZAS', role: 'Gerente Finanzas', detail: 'Control y Tesorería', level: 2, parentId: '5', count: 1, position: { x: 700, y: 950 }, type: 'support' },
  { id: '13', area: 'TECNOLOGÍA', role: 'Gerente IT', detail: 'Sistemas e Innovación', level: 2, parentId: '5', count: 1, position: { x: 1000, y: 950 }, type: 'support' },
];
