# Proyecto: Explorador de Contenido Mobile

## Consigna General
Deberán desarrollar una aplicación mobile utilizando **React Native y Expo** que permita consultar información proveniente de una API externa, visualizarla en un listado adaptable, filtrarla mediante un buscador y guardar elementos seleccionados en una sección de favoritos persistente.

La temática del explorador podrá ser, por ejemplo:
* Películas o series.
* Videojuegos.
* Pokémon.
* Personajes.
* Libros.
* Países.
* Recetas.
* Música.
* Deportes.
* Otra temática aprobada por el docente.

---

## Requerimientos Técnicos

### 1. Estructura del Proyecto
Crear un nuevo proyecto utilizando **Expo**. La aplicación deberá estar organizada utilizando componentes funcionales y respetando una correcta separación de responsabilidades. No se deberá colocar toda la lógica y la interfaz dentro de un único archivo.

Como mínimo deberán existir componentes y pantallas equivalentes a:
* **App** (Punto de entrada y configuración de navegadores)
* **Home / Listado** (Pantalla principal con el buscador y la lista)
* **Favorites** (Pantalla con los elementos guardados)
* **SearchBar** (Componente de filtrado de texto)
* **ItemCard** (Componente reutilizable para la tarjeta de cada elemento)

Los nombres pueden variar según la temática seleccionada.

### 2. Componentes de React Native
La interfaz debe estar diseñada puramente para entornos móviles. Deberán utilizar correctamente los componentes nativos de React Native:
* `<View>` y `<Text>` para contenedores y tipografías.
* `<Image>` para renderizar los recursos visuales de la API.
* `<Pressable>` o `<TouchableOpacity>` para botones e interacciones táctiles.
* `<TextInput>` para el buscador de elementos.
* `<FlatList>` para renderizar el listado general de forma eficiente.
* `<ScrollView>` únicamente cuando la disposición de la pantalla lo requiera (evitar anidarlo incorrectamente con FlatList).

❌ **Prohibido:** No se permite el uso de etiquetas HTML como `<div>`, `<p>`, `<button>` o `<img>`.

### 3. Estilos Nativos
Los estilos deberán declararse y estructurarse utilizando:
```javascript
StyleSheet.create()
```
El diseño debe estar pensado exclusivamente para una interfaz mobile, evaluándose:
* Organización de pantallas y uso de Flexbox para layouts fluidos.
* Márgenes (`margin`) y rellenos (`padding`) balanceados para pantallas táctiles.
* Tamaños de fuente legibles y contraste adecuado.

### 4. Consumo de API
La aplicación deberá obtener información desde una API externa utilizando **Axios** (o fetch nativo).
* Al iniciar la pantalla principal, deberá realizarse la consulta de manera asíncrona.
* Durante la consulta del recurso, deberá aplicarse renderizado condicional para mostrar un indicador de carga en pantalla (por ejemplo, el componente `<ActivityIndicator>` o un texto como *"Cargando información..."*).
* Si ocurre un error en la petición, se deberá capturar y mostrar un mensaje apropiado en la interfaz (Ejemplo: *"No fue posible obtener la información."*).

### 5. Listado y Tarjetas Reutilizables
Los resultados obtenidos desde la API deberán mostrarse mediante el componente `<FlatList>`, vinculando un componente reutilizable (`ItemCard`) en su propiedad `renderItem`.

Cada tarjeta deberá mostrar de forma ordenada:
* Nombre o título del elemento.
* Imagen, siempre que la API lo provea.
* Al menos dos datos adicionales de la temática (ej. si es Pokémon: *Tipo* y *Peso*; si es Película: *Año* y *Género*).

Deberán definir correctamente la propiedad `keyExtractor` en el `FlatList` utilizando el ID único provisto por la API.

### 6. Buscador y Manejo de Estado
La aplicación deberá utilizar hooks de React para administrar la reactividad:
* `useState` para controlar los datos de la API, el texto ingresado en el buscador, el estado de carga/error y la lista de favoritos.
* `useEffect` para disparar la carga inicial de datos.

El buscador de la app (`TextInput`) actualizará el estado del texto en tiempo real. El filtrado de los elementos se realizará utilizando métodos funcionales de JavaScript (como `.filter()`) antes de enviarlo al listado. Si no hay coincidencias con la búsqueda, la interfaz deberá mostrar un mensaje condicional (Ejemplo: *"No encontramos resultados."*).

### 7. Sección de Favoritos y Persistencia (AsyncStorage)
Cada tarjeta deberá incorporar un botón/icono interactivo para **"Agregar a favoritos"**.
* Si el elemento es seleccionado, se añadirá a una sección o pantalla independiente.
* Desde la pantalla de favoritos, o desde la misma tarjeta, se deberá poder **"Quitar de favoritos"**.
* El código debe validar e impedir que se agregue el mismo elemento más de una vez.
* **Persistencia:** La lista de favoritos deberá guardarse de forma local utilizando `@react-native-async-storage/async-storage`. Al cerrar y volver a abrir la aplicación en el emulador o dispositivo, los favoritos deben seguir estando disponibles.

### 8. Navegación Mobile
La aplicación deberá contar con navegación nativa utilizando las herramientas de **React Navigation** (Stack Navigation, Bottom Tabs Navigation, o una combinación de ambas).

Deberán existir al menos dos pantallas accesibles mediante menús táctiles o pestañas:
1. **Home / Inicio:** Listado general y barra de búsqueda.
2. **Favoritos:** Elementos guardados por el usuario.

---

## Organización del Código (Sugerido)
Se tendrá especialmente en cuenta que el proyecto mantenga una arquitectura de carpetas limpia y legible:

```text
src/
├── components/
│   ├── SearchBar.jsx
│   └── ItemCard.jsx
├── screens/
│   ├── HomeScreen.jsx
│   └── FavoritesScreen.jsx
├── services/
│   └── api.js
└── App.jsx
```

---

## Criterios de Entrega
Deberán entregar:
1. **Código fuente** del proyecto React Native / Expo listo para ejecutar.
2. **Repositorio de GitHub** con el historial de commits de los integrantes.
3. Archivo **README.md** en la raíz del proyecto que incluya:
   * Nombre del proyecto y de los integrantes.
   * API externa utilizada.
   * Descripción breve de la aplicación y la temática elegida.
   * Capturas de pantalla o un breve GIF del funcionamiento en el emulador/dispositivo.
   * Explicación de cómo organizaron los componentes y las herramientas de depuración utilizadas (Consola de Expo, errores en emulador, etc.).
