# Analytics y SEO — Acropolis principal / Civis

## Google Analytics 4 (GA ID)

1. Entra en [Google Analytics](https://analytics.google.com/) con la cuenta de Google de la organización.
2. **Administrar** (engranaje abajo a la izquierda) → **Crear** → **Propiedad**.
3. Nombre: p. ej. `Nueva Acrópolis RD` o `Civis Consulting`.
4. Zona horaria e industria → **Siguiente**.
5. **Crear flujo de datos** → **Web** → URL del sitio (`https://acropolis.adesa.com.do` o civis).
6. Copia el **ID de medición** con formato **`G-XXXXXXXXXX`**.

### Activar en el build

En PowerShell, antes de `npm run build:cpanel`:

```powershell
$env:NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
$env:NEXT_PUBLIC_SITE_URL="https://acropolis.adesa.com.do"
npm run build:cpanel
```

Si no defines la variable, **no se carga ningún script** de Analytics (sitio igual de ligero).

---

## Google Search Console

1. [Google Search Console](https://search.google.com/search-console)
2. **Añadir propiedad** → URL del dominio o prefijo (`https://acropolis.adesa.com.do`).
3. Método **Etiqueta HTML**: copia solo el valor de `content="..."` (sin comillas).
4. Build con:

```powershell
$env:NEXT_PUBLIC_GSC_VERIFICATION="el_codigo_que_te_da_google"
npm run build:cpanel
```

---

## Sitemap y robots

Se generan solos en el build (`/sitemap.xml`, `/robots.txt`).

Tras subir el `out/`, en Search Console → **Sitemaps** → enviar:

- `https://acropolis.adesa.com.do/sitemap.xml`
- `https://civis.acropolis.adesa.com.do/sitemap.xml`

---

## Seguridad (.htaccess)

El build incluye `.htaccess` endurecido en la raíz y `api/.htaccess` en principal (solo `na-feed.php` público).

Si el hosting devuelve **500** tras subir, comenta temporalmente la línea de HTTPS forzado en `.htaccess` (algunos proxies ya terminan TLS).
