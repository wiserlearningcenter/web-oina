"use client";

const TOKEN_KEY = "acropolis_cms_token";
const ROLE_KEY = "acropolis_cms_role";
const LABEL_KEY = "acropolis_cms_label";

export type EditorSession = {
  token: string;
  role: string;
  label: string;
};

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getEditorRole(): string {
  if (typeof window === "undefined") return "admin";
  return localStorage.getItem(ROLE_KEY) ?? "admin";
}

export function getEditorLabel(): string {
  if (typeof window === "undefined") return "Editor";
  return localStorage.getItem(LABEL_KEY) ?? "Editor";
}

export function setSession({ token, role, label }: EditorSession) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
  localStorage.setItem(LABEL_KEY, label);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(LABEL_KEY);
}
