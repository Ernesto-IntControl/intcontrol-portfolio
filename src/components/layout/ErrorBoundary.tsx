import { Component, type ErrorInfo, type ReactNode } from "react";

interface State {
  error: Error | null;
}

/** Évite la page blanche : une erreur de rendu affiche un message et un lien de retour. */
export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Erreur de rendu :", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <section className="container-x flex min-h-[100svh] flex-col items-center justify-center text-center">
        <p className="eyebrow">Erreur inattendue</p>
        <h1 className="mt-4 text-4xl font-semibold">Quelque chose s'est mal passé.</h1>
        <p className="mt-4 max-w-md text-muted">Rechargez la page ou revenez à l'accueil.</p>
        <a href="/" className="btn-primary mt-8">
          Retour à l'accueil
        </a>
      </section>
    );
  }
}
