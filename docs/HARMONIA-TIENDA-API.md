# Tienda → Harmonía (PostgreSQL + contabilidad)

## Qué va en GitHub Pages (este repo)

- `principal/`, `civis/`, `tienda/` — solo HTML/CSS/JS estáticos.
- **No hay base de datos** en GitHub. El stock y los pagos viven en el backend.

## Fases

| Fase | Backend | Tienda (build) |
|------|---------|----------------|
| **A — ahora** | Biblioteca PHP + MySQL (`bookstore_listings`, `store_orders`) | `NEXT_PUBLIC_STORE_API_URL` → Biblioteca |
| **B — Harmonía** | Clojure + PostgreSQL en Railway | Misma variable → URL Harmonía |
| **C — finanzas** | Pedido Azul aprobado → asiento en módulo contabilidad Harmonía | Sin cambio en la tienda estática |

## Variables de entorno (tienda)

```powershell
NEXT_PUBLIC_STORE_API_URL=https://tu-api.railway.app
# Opcional cuando Harmonía exponga REST (sin .php):
NEXT_PUBLIC_STORE_CATALOG_PATH=/api/store/catalog
NEXT_PUBLIC_STORE_CHECKOUT_PATH=/api/store/checkout
```

## PostgreSQL en Harmonía

Esquema inicial en el repo **NA_Harmonia**:

`backend/resources/db/store-commerce.sql`

Tablas: `store_listings`, `store_orders`, `store_payments` (compatible con migración desde MySQL de Biblioteca).

Entidades JSONB (`type: bookstore-listing`) pueden usarse después; las tablas SQL facilitan reportes de finanzas.

## Qué falta implementar en Harmonía (no bloquea subir a GitHub)

1. Endpoints REST catálogo + checkout + webhook Azul.
2. Restar stock al confirmar pago.
3. Registrar ingreso en módulo contabilidad.
4. Script migración MySQL → PostgreSQL.

La tienda en GitHub solo cambia `NEXT_PUBLIC_STORE_API_URL` cuando la API Harmonía esté lista.
