import type fr from "./messages/fr.json";

type Messages = typeof fr;

declare global {
  interface IntlMessages extends Messages {}
}

export {};
