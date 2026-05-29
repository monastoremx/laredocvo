# Laredo CVO — Calculadora Mona Store

PWA (Progressive Web App) para calcular costos de importación vía Laredo.
Funciona offline y se puede instalar en iOS y Android como app nativa.

---

## 🚀 Deploy en GitHub Pages (5 minutos)

### Paso 1 — Crear el repositorio

1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repo: `laredo-cvo` (o el que quieras)
3. Visibilidad: **Public** ← obligatorio para GitHub Pages gratis
4. Click en **Create repository**

### Paso 2 — Subir los archivos

**Opción A — Desde la web (sin terminal):**
1. En el repo recién creado, click en **"uploading an existing file"**
2. Arrastra TODOS los archivos de esta carpeta:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - carpeta `icons/` con los dos PNG
3. Commit: `"Initial commit – Laredo CVO PWA"`

**Opción B — Desde terminal:**
```bash
git init
git add .
git commit -m "Initial commit – Laredo CVO PWA"
git remote add origin https://github.com/TU_USUARIO/laredo-cvo.git
git push -u origin main
```

### Paso 3 — Activar GitHub Pages

1. En el repo → **Settings** → **Pages** (menú izquierdo)
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)`
4. Click **Save**
5. En ~1 minuto aparece la URL: `https://tu-usuario.github.io/laredo-cvo`

---

## 📱 Instalar como app

### iOS (Safari)
1. Abre la URL en Safari
2. Toca el ícono de compartir ↑
3. "Agregar a pantalla de inicio"
4. Listo — aparece como app con ícono propio

### Android (Chrome)
1. Abre la URL en Chrome
2. Aparece un banner automático "Instalar app"
3. O bien: menú ⋮ → "Agregar a pantalla de inicio"

---

## 🔄 Actualizar la app

Cuando hagas cambios al HTML, incrementa la versión del caché en `sw.js`:
```js
const CACHE_NAME = 'laredo-cvo-v2'; // ← cambiar el número
```
Esto fuerza que los usuarios bajen la versión nueva.

---

## ✅ Características

- **Offline** — funciona sin internet después del primer uso
- **Persistencia** — los cálculos guardados sobreviven al cerrar la app (localStorage)
- **Instalable** — ícono en home, pantalla completa, sin barra de navegador
- **Safe area** — compatible con notch y Dynamic Island de iPhone
