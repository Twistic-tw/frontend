## Documentación de Filtros Inteligentes en `Search&FilterModal`

Esta guía explica el funcionamiento y la lógica de cada tipo de filtro utilizado en el modal `Search&FilterModal` de la plataforma de catálogos.

---

### 1. Filtro de Texto (`TextFilter.vue`)

* **Descripción:** Permite realizar búsquedas en campos de texto.
* **Condiciones comunes:**

  * Contiene (default)
  * Empieza con
  * Termina con
  * Igual
* **Uso típico:**

  * Nombres
  * Códigos de producto
  * Descripciones

---

### 2. Filtro Numérico (`NumberRangeFilter.vue`)

* **Descripción:** Filtra resultados dentro de un rango numérico.
* **Campos:**

  * Valor mínimo
  * Valor máximo
* **Uso típico:**

  * Precio neto o con impuestos
  * Descuento
  * IGIC / IVA
  * Stock o cantidad

---

### 3. Filtro de Fecha (`DateRangeFilter.vue`)

* **Descripción:** Muestra resultados entre dos fechas específicas.
* **Campos:**

  * Fecha de inicio
  * Fecha de fin
* **Uso típico:**

  * Fecha de creación o modificación
  * Fechas de promoción o validez
  * Disponibilidad de producto

---

### 4. Filtro Booleano (`BooleanFilter.vue`)

* **Descripción:** Permite elegir entre valores lógicos `true` / `false`.
* **Opciones:**

  * Sí / No (Yes / No)
* **Uso típico:**

  * ¿Está activo?
  * ¿Es visible?
  * ¿Tiene imagen?
  * ¿Es destacado?

---

### 5. Lógica Dinámica

* Los tipos de campo se infieren automáticamente en base al contenido de las filas.
* Cada campo genera dinámicamente un componente adecuado de filtro.
* El archivo `DynamicFiltersLogic.ts` centraliza:

  * La detección de tipo de dato
  * La lógica de filtrado
  * Los componentes que se deben renderizar

---

### 6. Extensiones Futuras (Propuesta)

* **Multiselección:** para categorías, marcas, zonas.
* **Expresiones compuestas:** (ej. Precio > 10 y Categoría = Bebidas).
* **Campos dependientes:** Filtrar modelos dependiendo de la marca.
* **Presets de filtros:** Guardar configuraciones frecuentes.

---

Este documento es útil para desarrolladores y diseñadores que integren o personalicen la experiencia de filtrado en catálogos PDF generados desde la plataforma.
