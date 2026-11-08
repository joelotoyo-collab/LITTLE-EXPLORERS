import { useEffect, useState } from 'react';

export const ROUTES = [
  'home',
  'abc',
  'numbers',
  'animals',
  'colours',
  'shapes',
  'music',
  'stories',
  'play',
  'rewards',
  'parents',
] as const;

export type RouteName = (typeof ROUTES)[number];

export interface Route {
  name: RouteName;
  param?: string;
}

function parseHash(hash: string): Route {
  const [name, param] = hash.replace(/^#\/?/, '').split('/');
  if ((ROUTES as readonly string[]).includes(name)) {
    return { name: name as RouteName, param: param || undefined };
  }
  return { name: 'home' };
}

export function navigateTo(path: string): void {
  window.location.hash = `/${path}`;
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
