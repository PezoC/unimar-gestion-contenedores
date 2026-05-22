# Sistema de Gestión de Contenedores - UNIMAR

Aplicación fullstack para la gestión y mantenimiento de contenedores marítimos.

---

# Tecnologías Utilizadas

## Backend
- Node.js
- Express
- TypeScript
- SQL Server

## Frontend
- Angular 21
- TypeScript
- CSS

---

# Instalación y Ejecución Local

## 1. Clonar el repositorio

```bash
git clone https://github.com/PezoC/unimar-gestion-contenedores.git
```

---

## 2. Configurar Base de Datos SQL Server

Ingresar a la carpeta:

```text
database/
```

Ejecutar el script SQL:

```text
database.sql
```

El script realiza:

- Creación de la base de datos `UNIMAR_CONTENEDORES`
- Creación de la tabla `contenedor`
- Creación de índice para `codigo_ISO`

---

## 3. Configurar Backend

Ingresar a la carpeta:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear archivo:

```text
.env
```

Ejemplo de configuración:

```env
PORT=3000

DB_USER=sa
DB_PASSWORD=TU_PASSWORD

DB_SERVER=localhost
DB_DATABASE=UNIMAR_CONTENEDORES

DB_PORT=1433
```

Ejecutar backend:

```bash
npm run dev
```

El backend quedará disponible en:

```text
http://localhost:3000
```

---

## 4. Configurar Frontend Angular

Abrir una nueva terminal.

Ingresar a la carpeta:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar aplicación Angular:

```bash
ng serve
```

El frontend quedará disponible en:

```text
http://localhost:4200
```

---

## 5. Flujo General de Ejecución

1. Levantar SQL Server
2. Ejecutar scripts SQL
3. Levantar backend Node.js
4. Levantar frontend Angular
5. Acceder desde navegador

---

## 6. Consideraciones Técnicas

- Node.js recomendado: v20+
- Angular CLI recomendado: v21+
- SQL Server Express compatible
- Arquitectura frontend/backend desacoplada
- API REST desarrollada con Node.js + Express
- Frontend desarrollado con Angular Standalone Components

# Funcionalidades

- Registro de contenedores
- Actualización de contenedores
- Listado de contenedores
- Validaciones de negocio
- Modal dinámico
- Gestión de autorización de salida

---

# Reglas de Negocio

## ISO 6346
El código del contenedor debe cumplir:
- 4 letras
- 7 números

Ejemplo:
```text
MSCU1234567
```
## Consistencia de Estado y Bloqueos

Si un contenedor está marcado con el estado:

```text
Inmovilizado (Aduanas/Senasa)
```
El Sistema prohíbe:

- Asignarle un viaje
- Establecer una ubicación operativa
- Autorizar su salida

En caso de incumplimiento, el backend lanza una excepción controlada de negocio.

## Capacidad de Carga vs Tara

El peso bruto registrado debe ser siempre mayor al peso vacío (tara) del contenedor.

Regla aplicada:

```text
Peso Bruto > Peso Vacío