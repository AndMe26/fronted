import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("[ErrorBoundary]", error, info.componentStack);
    }

    handleReset = () => window.location.reload();


    render() {
        if (this.state.hasError) {
            return (
                <div style={s.container}>
                    <h2 style={s.title}>Algo salió mal</h2>
                    <p style={s.msg}>{this.state.error?.message ?? "Error inesperado."}</p>
                    <button style={s.btn} onClick={this.handleReset}>Recargar página</button>
                </div>
            );
        }
        return this.props.children;
    }

}

const s : Record<string, React.CSSProperties> = {
    container: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "1rem", padding: "2rem" },
    title: { fontSize: "1.5rem", color: "#e53e3e" },
    msg: { color: "#555", maxWidth: 400, textAlign: "center" },
    btn: { padding: "0.6rem 1.4rem", background: "#3182ce", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: "1rem" },

};

