"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { TierId } from "./tiers";
import type { StyleVariant } from "./smartsite/types";

export type WizardState = {
  tradeSlug: string | null;
  styleVariant: StyleVariant | null;
  businessName: string;
  phone: string;
  email: string;
  city: string;
  tagline: string;
  tier: TierId;
};

const emptyState: WizardState = {
  tradeSlug: null,
  styleVariant: null,
  businessName: "",
  phone: "",
  email: "",
  city: "",
  tagline: "",
  tier: "starter",
};

const STORAGE_KEY = "freesites:wizard";

type WizardContextValue = {
  state: WizardState;
  update: (patch: Partial<WizardState>) => void;
  reset: () => void;
};

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WizardState>(emptyState);

  // Restored from localStorage after mount (not in the lazy initializer) so the
  // client's first render matches the server-rendered, storage-free HTML.
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe restore of external (localStorage) state
      setState({ ...emptyState, ...parsed });
    } catch {
      // ignore malformed storage
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const update = (patch: Partial<WizardState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const reset = () => setState(emptyState);

  return (
    <WizardContext.Provider value={{ state, update, reset }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
}
