-- ============================================
-- CREACIÓN BASE DE DATOS
-- ============================================

IF DB_ID('UNIMAR_CONTENEDORES') IS NULL
BEGIN

    CREATE DATABASE UNIMAR_CONTENEDORES;

END
GO

USE UNIMAR_CONTENEDORES;
GO

-- ============================================
-- ELIMINAR TABLA SI EXISTE
-- ============================================

IF OBJECT_ID('contenedor', 'U') IS NOT NULL
BEGIN

    DROP TABLE contenedor;

END
GO


-- ============================================
-- CREACIÓN TABLA CONTENEDOR
-- ============================================

CREATE TABLE contenedor (
    id INT IDENTITY(1,1) PRIMARY KEY,
    codigo_ISO VARCHAR(11) NOT NULL UNIQUE,
    peso_vacio NUMERIC(10,2) NOT NULL,
    peso_bruto NUMERIC(10,2) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    ubicacion_patio VARCHAR(100),
    viaje_asignado VARCHAR(100),
	autorizar_salida BIT NOT NULL DEFAULT 0,
    fecha_registro DATETIME DEFAULT GETDATE(),
    fecha_actualizado DATETIME DEFAULT GETDATE()
);
GO

-- ============================================
-- ÍNDICE
-- ============================================

CREATE INDEX idx_codigo_ISO ON contenedor(codigo_ISO);