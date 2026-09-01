# TheMealDB

## ¿Qué es TheMealDB?

**TheMealDB** es una API pública que proporciona información sobre comidas y recetas de diferentes partes del mundo.

Permite consultar datos como:

* Nombre de las comidas.
* Categorías.
* País o región de origen.
* Ingredientes.
* Cantidades de los ingredientes.
* Instrucciones de preparación.
* Imágenes.
* Etiquetas.
* Videos de YouTube.

La API utiliza **REST** y devuelve la información en formato **JSON**.

---

## URL base

La URL base de la API es:

```text
https://www.themealdb.com/api/json/v1/1/
```

Los distintos endpoints se agregan después de esta URL.

Por ejemplo:

```text
https://www.themealdb.com/api/json/v1/1/search.php?s=pizza
```

---

# Endpoints

## Buscar comidas por nombre

Permite buscar comidas utilizando su nombre.

```http
GET /search.php?s={nombre}
```

### Ejemplo

```http
GET https://www.themealdb.com/api/json/v1/1/search.php?s=pizza
```

También se pueden utilizar búsquedas parciales:

```http
GET https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
```

La respuesta contiene todas las comidas que coinciden con la búsqueda.

---

## Buscar comidas por primera letra

Permite obtener todas las comidas cuyo nombre comienza con una determinada letra.

```http
GET /search.php?f={letra}
```

### Ejemplo

```http
GET https://www.themealdb.com/api/json/v1/1/search.php?f=a
```

---

## Obtener una comida por ID

Permite obtener información detallada de una comida específica.

```http
GET /lookup.php?i={id}
```

### Ejemplo

```http
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
```

El resultado contiene todos los datos disponibles de esa comida.

---

## Obtener una comida aleatoria

Devuelve una comida seleccionada aleatoriamente.

```http
GET /random.php
```

### Ejemplo

```http
GET https://www.themealdb.com/api/json/v1/1/random.php
```

Cada solicitud puede devolver una comida diferente.

---

# Categorías

## Obtener todas las categorías

```http
GET /categories.php
```

### Ejemplo

```http
GET https://www.themealdb.com/api/json/v1/1/categories.php
```

Las categorías incluyen, entre otras:

* Beef
* Breakfast
* Chicken
* Dessert
* Goat
* Lamb
* Miscellaneous
* Pasta
* Pork
* Seafood
* Side
* Starter
* Vegan
* Vegetarian

---

## Buscar comidas por categoría

```http
GET /filter.php?c={categoria}
```

### Ejemplo

```http
GET https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
```

Este endpoint devuelve comidas pertenecientes a una categoría determinada.

---

# Áreas gastronómicas

## Obtener todas las áreas

```http
GET /list.php?a=list
```

### Ejemplo

```http
GET https://www.themealdb.com/api/json/v1/1/list.php?a=list
```

Algunas áreas disponibles son:

* American
* British
* Canadian
* Chinese
* Croatian
* Dutch
* Egyptian
* French
* Greek
* Indian
* Irish
* Italian
* Jamaican
* Japanese
* Mexican
* Moroccan
* Spanish
* Thai
* Turkish
* Vietnamese

---

## Buscar comidas por área

```http
GET /filter.php?a={area}
```

### Ejemplo

```http
GET https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian
```

Devuelve las comidas asociadas con esa área gastronómica.

---

# Ingredientes

## Obtener todos los ingredientes

```http
GET /list.php?i=list
```

### Ejemplo

```http
GET https://www.themealdb.com/api/json/v1/1/list.php?i=list
```

---

## Buscar comidas por ingrediente

```http
GET /filter.php?i={ingrediente}
```

### Ejemplo

```http
GET https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
```

Devuelve comidas que utilizan ese ingrediente.

---

# Estructura de una comida

Una comida devuelta por la API puede tener una estructura similar a esta:

```json
{
    "idMeal": "52772",
    "strMeal": "Teriyaki Chicken Casserole",
    "strCategory": "Chicken",
    "strArea": "Japanese",
    "strInstructions": "Preheat oven to 200°C...",
    "strMealThumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    "strTags": "Meat,Casserole",
    "strYoutube": "https://www.youtube.com/watch?v=4aZr5hZXP_s",
    "strIngredient1": "soy sauce",
    "strIngredient2": "water",
    "strIngredient3": "brown sugar",
    "strMeasure1": "3/4 cup",
    "strMeasure2": "1/2 cup",
    "strMeasure3": "1/4 cup"
}
```

---

# Campos de una comida

| Campo                                | Descripción                                  |
| ------------------------------------ | -------------------------------------------- |
| `idMeal`                             | Identificador único de la comida             |
| `strMeal`                            | Nombre de la comida                          |
| `strCategory`                        | Categoría                                    |
| `strArea`                            | Área o país de origen                        |
| `strInstructions`                    | Instrucciones para preparar la comida        |
| `strMealThumb`                       | URL de la imagen                             |
| `strTags`                            | Etiquetas asociadas                          |
| `strYoutube`                         | URL del video de YouTube                     |
| `strIngredient1` - `strIngredient20` | Ingredientes                                 |
| `strMeasure1` - `strMeasure20`       | Cantidades de los ingredientes               |
| `strSource`                          | Fuente original de la receta                 |
| `strCreativeCommonsConfirmed`        | Información relacionada con Creative Commons |
| `dateModified`                       | Fecha de modificación                        |

---

# Ingredientes y cantidades

Los ingredientes no se encuentran dentro de un array.

En cambio, TheMealDB utiliza campos numerados:

```text
strIngredient1
strIngredient2
strIngredient3
...
strIngredient20
```

Y las cantidades utilizan una estructura equivalente:

```text
strMeasure1
strMeasure2
strMeasure3
...
strMeasure20
```

Por ejemplo:

```json
{
    "strIngredient1": "Chicken",
    "strMeasure1": "500g",

    "strIngredient2": "Soy Sauce",
    "strMeasure2": "3 tbsp",

    "strIngredient3": "Garlic",
    "strMeasure3": "2 cloves"
}
```

El ingrediente ubicado en `strIngredient1` corresponde a la cantidad ubicada en `strMeasure1`.

Los campos que no tienen información normalmente aparecen vacíos o como `null`.

---

# Estructura de las respuestas

Las respuestas de TheMealDB normalmente contienen una propiedad llamada `meals`.

Por ejemplo:

```json
{
    "meals": [
        {
            "idMeal": "52772",
            "strMeal": "Teriyaki Chicken Casserole"
        }
    ]
}
```

Cuando existen varios resultados:

```json
{
    "meals": [
        {
            "idMeal": "52772",
            "strMeal": "Teriyaki Chicken Casserole"
        },
        {
            "idMeal": "52773",
            "strMeal": "Beef and Mustard Pie"
        }
    ]
}
```

Cuando una búsqueda no encuentra resultados, puede devolver:

```json
{
    "meals": null
}
```

Por eso es importante comprobar si `meals` contiene información antes de intentar recorrerla.

---

# Filtrar resultados

TheMealDB ofrece diferentes formas de filtrar comidas.

### Por categoría

```http
GET /filter.php?c=Chicken
```

### Por área

```http
GET /filter.php?a=Italian
```

### Por ingrediente

```http
GET /filter.php?i=Garlic
```

Estos endpoints de filtrado devuelven información más limitada de las comidas, normalmente incluyendo:

* ID.
* Nombre.
* Imagen.

Para obtener información completa de una comida filtrada se puede utilizar posteriormente:

```http
GET /lookup.php?i={id}
```

---

# Ejemplo de uso con JavaScript

Se puede realizar una solicitud utilizando `fetch`:

```javascript
const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=pizza"
);

const data = await response.json();

console.log(data.meals);
```

También se puede utilizar una función:

```javascript
async function buscarComida(nombre) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${nombre}`
    );

    const data = await response.json();

    return data.meals;
}
```

---

# Ejemplo de búsqueda

Solicitud:

```http
GET https://www.themealdb.com/api/json/v1/1/search.php?s=pasta
```

Respuesta simplificada:

```json
{
    "meals": [
        {
            "idMeal": "52777",
            "strMeal": "Mediterranean Pasta Salad",
            "strCategory": "Vegetarian",
            "strArea": "Italian",
            "strMealThumb": "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg"
        }
    ]
}
```

---

# Resumen de endpoints

| Función                 | Endpoint                      |
| ----------------------- | ----------------------------- |
| Buscar por nombre       | `/search.php?s={nombre}`      |
| Buscar por letra        | `/search.php?f={letra}`       |
| Buscar por ID           | `/lookup.php?i={id}`          |
| Comida aleatoria        | `/random.php`                 |
| Todas las categorías    | `/categories.php`             |
| Filtrar por categoría   | `/filter.php?c={categoria}`   |
| Filtrar por área        | `/filter.php?a={area}`        |
| Filtrar por ingrediente | `/filter.php?i={ingrediente}` |
| Lista de áreas          | `/list.php?a=list`            |
| Lista de ingredientes   | `/list.php?i=list`            |

---

# Características

* API basada en REST.
* Respuestas en formato JSON.
* Contiene información sobre recetas.
* Incluye imágenes de las comidas.
* Incluye ingredientes y cantidades.
* Permite buscar comidas.
* Permite filtrar por diferentes criterios.
* Permite obtener comidas aleatorias.
* Incluye información de diferentes áreas gastronómicas.
* Incluye enlaces a videos de YouTube.
* Cuenta con una versión gratuita para utilizar las funciones básicas.

---

# API Key

TheMealDB permite utilizar sus endpoints básicos sin autenticación.

Para funcionalidades adicionales existe una API premium que proporciona características adicionales y acceso mediante una API key.

La versión utilizada en los ejemplos:

```text
https://www.themealdb.com/api/json/v1/1/
```

corresponde a la versión pública de la API.

---

# Recursos

* **Sitio oficial:** https://www.themealdb.com/
* **Documentación:** https://www.thememealdb.com/api.php
* **API:** https://www.themealdb.com/api/json/v1/1/

---

# Conclusión

TheMealDB es una API REST orientada a recetas y comidas que proporciona una gran cantidad de información estructurada.

Sus endpoints permiten realizar búsquedas, obtener detalles de recetas, consultar categorías, ingredientes y áreas gastronómicas, además de obtener comidas aleatorias.

La información se entrega principalmente en formato JSON, lo que facilita su utilización desde aplicaciones desarrolladas con JavaScript, React, React Native, Node.js y otros lenguajes o frameworks capaces de realizar solicitudes HTTP.
