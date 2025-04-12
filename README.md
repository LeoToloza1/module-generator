# 🔧 lynk-module-generator

Un generador de módulos para proyectos basados en el microkernel de [LYNK](https://www.npmjs.com/package/@leotoloza/kernel). Automatiza la creación de estructuras de carpetas y archivos necesarios para desarrollar nuevos módulos de forma rápida, organizada y escalable.

---

## 🚀 Instalación

```bash
pnpm add -D lynk-module-generator
# o
npm install --save-dev lynk-module-generator
```
se puede usar con -g para intalarlo global y usarlo en cualquier directorio
---

## 📦 Uso

Podés ejecutarlo desde la línea de comandos:

```bash
npx lynk-module-generator
```

O como script desde tu `package.json`:

```json
{
  "scripts": {
    "crear-modulo": "lynk-module-generator"
  }
}
```

---

## 🧱 ¿Qué genera?

Crea una estructura de módulo como esta:

```
src/
└── nombre-del-modulo/
    ├── index.ts
    ├── controlador.ts
    ├── servicio.ts
    └── rutas.ts
```

Podés personalizar los nombres y estructura según tu flujo de trabajo.

---

## 🧠 ¿Para qué sirve?

Este generador está pensado para desarrolladores que usan el [microkernel de LYNK](https://www.npmjs.com/package/@leotoloza/kernel) y necesitan incorporar nuevos módulos rápidamente, siguiendo una convención de carpetas y responsabilidades.

---

## ⚙️ Requisitos

- Node.js >= 18
- PNPM o NPM
- Proyecto basado en [@leotoloza/kernel](https://www.npmjs.com/package/@leotoloza/kernel)

---

## ✍️ Autor

Desarrollado por [leotoloza](https://www.npmjs.com/~leotoloza)

---

## 🪪 Licencia

MIT
