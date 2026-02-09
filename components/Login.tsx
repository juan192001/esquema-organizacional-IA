
import React, { useEffect, useState } from 'react';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Inicializar Google Sign-In
    const handleCredentialResponse = (response: any) => {
      try {
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        
        // Validación de dominio estricta
        if (payload.email && payload.email.endsWith('@esgrap.org')) {
          onLoginSuccess(payload);
        } else {
          setError(`Acceso denegado. El correo ${payload.email} no pertenece a @esgrap.org`);
        }
      } catch (err) {
        setError('Error al procesar el inicio de sesión.');
      }
    };

    // Fix: Access window.google using type assertion to satisfy TypeScript
    const google = (window as any).google;
    if (google) {
      google.accounts.id.initialize({
        client_id: "TU_CLIENT_ID_DE_GOOGLE.apps.googleusercontent.com", // Reemplazar con Client ID real
        callback: handleCredentialResponse,
        auto_select: false,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: "outline", size: "large", width: 280, text: "signin_with" }
      );
    }
  }, [onLoginSuccess]);

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full"></div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[40px] shadow-2xl w-full max-w-md flex flex-col items-center animate-in fade-in zoom-in duration-500">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#1565C0] to-[#64B5F6] rounded-2xl flex items-center justify-center shadow-lg mb-6 rotate-3">
            <span className="text-4xl">💎</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">TALENT OS <span className="text-[#64B5F6]">v13.0</span></h1>
          <p className="text-blue-200/60 text-xs font-bold uppercase tracking-[0.2em]">Gold Standard Executive Suite</p>
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-8"></div>

        <p className="text-center text-gray-400 text-sm mb-8 leading-relaxed">
          Bienvenido al portal estratégico de <span className="text-white font-bold">ESGRAP</span>. 
          Por favor, inicie sesión con su cuenta corporativa.
        </p>

        <div id="googleBtn" className="min-h-[50px]"></div>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs text-center animate-pulse">
            {error}
          </div>
        )}

        <div className="mt-12 text-[10px] text-gray-500 font-medium uppercase tracking-widest opacity-50">
          Exclusive Access • Secure Session • v13.0
        </div>
      </div>
    </div>
  );
};

export default Login;
