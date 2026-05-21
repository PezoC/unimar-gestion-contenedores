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

# Funcionalidades

- Registro de contenedores
- Actualización de contenedores
- Validaciones de negocio
- Modal dinámico
- Gestión de autorización de salida
- Listado de contenedores
- Registro de contenedores
- Actualización de contenedores

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