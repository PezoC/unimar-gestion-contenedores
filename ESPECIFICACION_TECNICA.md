# ESPECIFICACION_TECNICA.md
# Sistema de Gestión de Contenedores - UNIMAR

---

# 1. Contratos de API

## Obtener Contenedores

### Endpoint

```http
GET /api/contenedores
```

### Response HTTP 200

```json
[
  {
    "id": 1,
    "codigo_ISO": "MSCU1234567",
    "peso_vacio": 2200,
    "peso_bruto": 6000,
    "estado": "Disponible",
    "ubicacion_patio": "A-01",
    "viaje_asignado": "VJ001",
    "autorizar_salida": true
  }
]
```

### Códigos HTTP

| Código | Descripción |
|---|---|
| 200 | Consulta exitosa |
| 500 | Error interno servidor |

---

## Registrar Contenedor

### Endpoint

```http
POST /api/contenedores
```

### Request

```json
{
  "codigo_ISO": "MSCU1234567",
  "peso_vacio": 2200,
  "peso_bruto": 6000,
  "estado": "Disponible",
  "ubicacion_patio": "A-01",
  "viaje_asignado": "VJ001",
  "autorizar_salida": true
}
```

### Response HTTP 200

```json
{
  "message": "Contenedor registrado correctamente"
}
```

### Response HTTP 409

```json
{
  "message": "El peso bruto debe ser mayor que el peso vacio"
}
```

### Códigos HTTP

| Código | Descripción |
|---|---|
| 200 | Registro exitoso |
| 409 | Regla de negocio incumplida |
| 500 | Error interno servidor |

---

## Actualizar Contenedor

### Endpoint

```http
PUT /api/contenedores/:id
```

### Request

```json
{
  "codigo_ISO": "MSCU1234567",
  "peso_vacio": 2200,
  "peso_bruto": 6000,
  "estado": "Disponible",
  "ubicacion_patio": "A-01",
  "viaje_asignado": "VJ001",
  "autorizar_salida": true
}
```

### Response HTTP 200

```json
{
  "message": "Contenedor actualizado correctamente"
}
```

### Response HTTP 409

```json
{
  "message": "Un contenedor inmovilizado no puede tener ubicación, viaje ni salida autorizada"
}
```

### Códigos HTTP

| Código | Descripción |
|---|---|
| 200 | Actualización exitosa |
| 409 | Validación de negocio |
| 500 | Error interno servidor |

---

# 2. Modelo de Datos

## Tabla: contenedor

| Campo | Tipo | Restricción | Nullable |
|---|---|---|---|
| id | INT | PK Identity | NO |
| codigo_ISO | VARCHAR(11) | ISO 6346 | NO |
| peso_vacio | NUMERIC(10,2) | Tara | NO |
| peso_bruto | NUMERIC(10,2) | Peso Bruto > Tara | NO |
| estado | VARCHAR(100) | Estado operativo | NO |
| ubicacion_patio | VARCHAR(100) | Ubicación física | SÍ |
| viaje_asignado | VARCHAR(100) | Viaje asignado | SÍ |
| autorizar_salida | BIT | Booleano operativo | NO |

---

# 3. Arquitectura y Flujo Técnico

```text
Usuario
   ↓
Frontend Angular
   ↓
ContenedorService
   ↓
HTTP REST API
   ↓
Express Routes
   ↓
Controllers
   ↓
Services (Reglas de negocio)
   ↓
Repositories
   ↓
SQL Server
```

La solución implementa una arquitectura desacoplada frontend/backend.

## Frontend Angular

Responsable de:
- renderización UI
- formularios
- modales
- validaciones UX
- consumo REST

## Backend Node.js

Responsable de:
- lógica de negocio
- validaciones operativas
- manejo HTTP
- persistencia

## SQL Server

Responsable de:
- persistencia de contenedores
- almacenamiento operativo

---

# 4. Estrategia de Manejo de Errores

Las reglas de negocio son validadas tanto en frontend como backend.

El backend captura excepciones controladas desde la capa Service y retorna respuestas HTTP consistentes para el frontend.

## Ejemplos de validaciones

- ISO 6346 inválido
- Peso Bruto <= Peso Vacío (Tara)
- Contenedor inmovilizado con viaje asignado
- Contenedor inmovilizado con ubicación operativa
- Contenedor inmovilizado con salida autorizada

## Ejemplo de Error HTTP 409

```json
{
  "message": "El peso bruto debe ser mayor que el peso vacio"
}
```

---

# 5. Reglas de Negocio

## Validación ISO 6346

El código del contenedor debe cumplir:

- 4 letras
- 7 números

Ejemplo válido:

```text
MSCU1234567
```

---

## Consistencia de Estado y Bloqueos

Si un contenedor se encuentra en estado:

```text
Inmovilizado (Aduanas/Senasa)
```

el sistema prohíbe:

- asignar viaje
- establecer ubicación operativa
- autorizar salida

La validación es aplicada tanto en frontend como backend.

---

## Capacidad de Carga vs Tara

El peso bruto debe ser mayor que el peso vacío.

Regla aplicada:

```text
Peso Bruto > Peso Vacío
```

---

# 6. Consideraciones Técnicas

- Angular standalone components
- Arquitectura por capas
- SQL parametrizado
- Validaciones frontend/backend
- Manejo de errores HTTP
- Componentización UI

