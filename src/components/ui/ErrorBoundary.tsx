import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Sparkles, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime exception intercepted by boundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-black text-cream flex items-center justify-center p-6 selection:bg-gold selection:text-black font-sans">
          <div className="max-w-md w-full border border-white/10 bg-zinc-950 p-8 md:p-12 text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto">
              <Sparkles size={20} />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium block">
                FATAL RUNTIME ENCOUNTER
              </span>
              <h1 className="font-serif text-3xl text-cream tracking-tight">Something Went Wrong</h1>
            </div>

            <p className="text-muted text-xs leading-[1.8] font-light max-w-sm mx-auto">
              The application encountered an unexpected visual rendering state. Our diagnostic monitors have logged this incident.
            </p>

            {this.state.error && (
              <pre className="p-3 bg-[#111] text-red-400/80 font-mono text-[9px] text-left overflow-x-auto max-h-[100px] border border-white/5 custom-scrollbar">
                {this.state.error.message}
              </pre>
            )}

            <button
              onClick={this.handleReset}
              className="mx-auto px-6 py-3.5 bg-gold hover:bg-gold/90 text-black text-[10px] tracking-[0.2em] uppercase font-semibold flex items-center gap-2 transition-all duration-300 select-none cursor-pointer"
            >
              <RefreshCcw size={12} /> Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
