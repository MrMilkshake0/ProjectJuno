// src/app/seo.tsx
export function Canonical({ href }: { href: string }) {
  return <link rel="canonical" href={href} />;
}

export function JsonLd<T extends object>({ data }: { data: T }) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  );
}

// If you want absolute URLs from a path (change base as needed)
export function abs(path: string) {
  const base = "https://www.projectjuno.ai";
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
