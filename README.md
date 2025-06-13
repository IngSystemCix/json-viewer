# JsonViewer Web Component

`JsonViewer` es un componente web personalizado que permite mostrar
datos JSON en un modal emergente. Es útil para depuración,
visualización de datos o cualquier caso donde necesites mostrar
JSON de forma legible.

## 🚀 Características

- Renderiza datos JSON en un formato legible.
- Modal emergente con un botón de cierre.
- Fácil de usar e integrar en cualquier proyecto web.
- Compatible con la API de Custom Elements.

---

## Versiones

- **1.0.0**: Versión inicial con funcionalidad básica de
  visualización de JSON **NO USARLO**.
- **1.0.1**: Mejora en la detección de cambios del
  atributo `data` y corrección de errores menores.

---

## 📦 Instalación

### con npm

```bash
npm install @ingsystemcix/json-viewer
```

### o con bun

```bash
bun add @ingsystemcix/json-viewer
```

---

## 🛠️ Uso

### 1. Agregar el componente al DOM

```html
<json-viewer></json-viewer>
```

### 2. Configurar datos JSON

Podés establecer los datos JSON directamente desde JavaScript:

```javascript
const viewer = document.querySelector("json-viewer");
viewer.data = { key: "value", anotherKey: [1, 2, 3] };
```

O usando el atributo `data` en el HTML:

```html
<json-viewer data='{"key": "value", "anotherKey": [1, 2, 3]}'></json-viewer>
```

### 3. Mostrar y ocultar el modal

Para mostrar el modal:

```javascript
viewer.show();
```

Para ocultarlo:

```javascript
viewer.hide();
```

---

## 🧑‍💻 API

### Propiedades

#### `data`

- **Tipo**: `object`
- **Descripción**: Establece o recupera los datos JSON que se muestran en el modal.
- **Ejemplo**:

  ```javascript
  viewer.data = { name: "John Doe", age: 30 };
  console.log(viewer.data); // { name: "John Doe", age: 30 }
  ```

### Métodos

#### `show()`

- **Descripción**: Muestra el modal del visor JSON.
- **Ejemplo**:

  ```javascript
  viewer.show();
  ```

#### `hide()`

- **Descripción**: Oculta el modal del visor JSON.
- **Ejemplo**:

  ```javascript
  viewer.hide();
  ```

#### `render(json)`

- **Descripción**: Renderiza un objeto JSON en el modal.
- **Parámetros**:
  - `json` (object): El objeto JSON a renderizar.
- **Ejemplo**:

  ```javascript
  viewer.render({ key: "value" });
  ```

---

## 📋 Ejemplo Completo

### Aquí hay un ejemplo completo de cómo usar el componente `JsonViewer`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JsonViewer Example</title>
    <script src="path/to/json-viewer.js"></script>
  </head>
  <body>
    <json-viewer></json-viewer>

    <script>
      const viewer = document.querySelector("json-viewer");
      viewer.data = { name: "Jane Doe", hobbies: ["coding", "reading"] };
      viewer.show();

      // Hide the viewer after 5 seconds
      setTimeout(() => viewer.hide(), 5000);
    </script>
  </body>
</html>
```

### React ejemplo

```jsx
import React, { useEffect, useRef } from "react";
import "@ingsystemcix/json-viewer";

const JsonViewerComponent = () => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.data = { name: "John Doe", age: 30 };
      viewerRef.current.show();
    }
  }, []);

  return <json-viewer ref={viewerRef}></json-viewer>;
};

export default JsonViewerComponent;
```

### Angular

```typescript
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import "@ingsystemcix/json-viewer";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements AfterViewInit {
  private jsonViewer!: HTMLElement & { data: any; show: () => void };

  ngAfterViewInit() {
    this.jsonViewer = document.querySelector("json-viewer") as HTMLElement & {
      data: any;
      show: () => void;
    };

    if (this.jsonViewer) {
      this.jsonViewer.data = {
        mensaje: "Hola desde Angular",
        numeros: [1, 2, 3],
      };
    }
  }

  mostrar() {
    if (this.jsonViewer) {
      this.jsonViewer.show();
    }
  }
}
```

```html
<json-viewer />
<button (click)="mostrar()">Mostrar JSON</button>
<router-outlet />
```

---

## ⚙️ Detalles Técnicos

### Observed Attributes

El componente observa el atributo `data`. Si el atributo cambia, intenta analizar
el JSON y renderizarlo automáticamente.

### Shadow DOM

El componente utiliza Shadow DOM para encapsular su estilo y estructura.

---

## 🛡️ Compatibilidad

Este componente es compatible con navegadores modernos que soportan Custom Elements
y Shadow DOM. Para navegadores más antiguos, podrías necesitar un polyfill.

---

## 📝 Contribuciones

¡Las contribuciones son bienvenidas! Si encontrás un bug o querés agregar una
nueva funcionalidad, abrí un issue o enviá un pull request.

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---
