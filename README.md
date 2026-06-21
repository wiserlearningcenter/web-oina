# web-oina — Acropolis RD

Monorepo para sitios públicos de Nueva Acrópolis República Dominicana.

| Carpeta | URL producción | Dev local |
|---------|----------------|-----------|
| `principal/` | acropolis.org.do | http://localhost:3100 |
| `civis/` | civis.acropolis.org.do | http://localhost:3200 |
| `tienda/` | tienda.acropolis.org.do | http://localhost:3300 |
| `editor/` | editor.acropolis.org.do | http://localhost:3400 |

Harmonía (NA_Harmonia), Biblioteca y contabilidad viven en repos aparte (Railway).

## Desarrollo local

```powershell
npm run dev:principal
npm run dev:civis
npm run dev:tienda
npm run dev:editor
npm run dev:editor-api
```

## Subir a GitHub

Repo: **wiserlearningcenter/web-oina**

```powershell
cd "c:\Users\marth\Cursor Projects\acropolis.org.do"
& "C:\Program Files\Git\bin\git.exe" add .
& "C:\Program Files\Git\bin\git.exe" commit -m "Publicar Acropolis, Civis, Tienda y editor OINA"
& "C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/wiserlearningcenter/web-oina.git
& "C:\Program Files\Git\bin\git.exe" branch -M main
& "C:\Program Files\Git\bin\git.exe" push -u origin main
```

Tras instalar GitHub CLI: `gh auth login` y luego `gh repo sync` si hace falta.

## GitHub Pages + Railway

- **Pages:** webs estáticas (`principal`, `civis`, `tienda`) — ver `docs/GITHUB-PAGES.md`
- **Railway:** editor API, Harmonía (stock, checkout Azul, contabilidad) — ver `docs/HARMONIA-TIENDA-API.md`

## Build producción

```powershell
npm run build:all
```

Cada sitio genera `out/` para hosting estático.
