# LibertadntFrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Deploy Frontend con Vercel — Libertand't

## Requisitos previos

- Tener una cuenta en Vercel
- Tener Node.js instalado
- Tener el proyecto frontend funcionando localmente
- Tener Vercel CLI instalada

## Opción gratuita

Vercel ofrece un plan gratuito suficiente para proyectos personales y académicos.

- Vercel: https://vercel.com
- Dashboard: https://vercel.com/dashboard
- Documentación: https://vercel.com/docs

---

# 1. Instalar Vercel CLI

Instalar globalmente:

```bash
npm install -g vercel
```

---

# 2. Iniciar sesión en Vercel

```bash
vercel login
```

Esto abrirá el navegador para autenticar la cuenta.

---

# 3. Configurar variables de entorno

En archivo .env

```ts
export const environment = {
  API_URL: "https://api.libertant.com/",
};
```

La URL debe apuntar al backend

---

# 4. Deploy del frontend

Desde la raíz del proyecto:

```bash
vercel
```

La primera vez Vercel preguntará:

- Scope
- Nombre del proyecto
- Framework detectado
- Directorio de salida

````

---

# 5. Deploy a producción

Una vez configurado:

```bash
vercel deploy --prod
````

Vercel devolverá una URL similar a:

```txt
https://libertant-front-end.vercel.app
```

---

# 6. Configurar dominio personalizado (Opcional)

Desde el dashboard de Vercel:

```txt
Project → Settings → Domains
```

Agregar:

```txt
app.libertant.com
```

Luego configurar los registros DNS indicados por Vercel.

---

# 7. Configurar CORS en el backend

En el backend permitir:

```txt
https://libertant-front-end.vercel.app
```

Ir a ../BackEnd-Proyecto/src/shared/cors.options.ts.

Y luego poner url en origin:

```ts
    origin:"https://libertant-front-end.vercel.app",
```

# Notas

- HTTPS queda habilitado automáticamente.
- Cada push puede generar un Preview Deployment automático.
- El plan gratuito incluye CI/CD integrado con GitHub.
- Vercel detecta automáticamente proyectos Angular.
- Se recomienda usar variables de entorno para URLs sensibles.

---

# Integración recomendada

Repositorio GitHub + Vercel:

1. Subir proyecto a GitHub
2. Importar repositorio en Vercel
3. Cada push a `main` genera deploy automático

---
