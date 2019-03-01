# Atomic

A content reader web application to aggregate all your blogs and news sources into one place.

![Atomic demo](atomic.gif)

### Todo
1. Validación de un formulario en cliente. (1 punto) [Formulario de registro](src/components/signup-modal.js)

Esta validado en cliente y en servidor, por ejemplo en cliente no controlo que la contraseña tiene que ser mayor de 8 caracteres
pero en el servidor si y esto aparece después de realizar la petición.

2. Validación en servidor mediante ajax de un formulario de la aplicación.(1.5 puntos) [Formulario de registro](src/components/signup-modal.js)

Como he dicho anteriormente en servidor todos los datos son validados y si falla se devuelve una respuesta json con los mensajes de errores.

3. CRUD mediante ajax en la aplicaición:
    1. Añadir(1 punto) [Añadir una categoría](src/components/category-add-modal.js)
    2. Borrar(1.5 puntos) [Borrar una categoría](src/model.js#L83)
    3. Editar(1 punto) [Renombrar una categoría](src/components/category-update-modal.js#L20)
    4. [] Mostrar(1 punto) [Mostrar categorias]()

4. Realizar una búsqueda mediante ajax y que muestre los resultados. (1.5 puntos)

En mi caso hago un autocomplete al añadir una fuente de noticias, cuando abrimos el modal para añadir una fuente podemos escribir el nombre de la web y va a intentar encontrar una fuente ya añadida en la base de datos, si no hara una peticion a esa web.
Por ejemplo podemos poner: thenextweb.com y si no existe dicha fuente en la base de datos recogerá la información y lo mostrará como único resultado.
Para traer varios elementos podemos buscar con una "p" porque la p está en todas las urls, entonces nos traerá como máximo tres ocurrencias de la base de datos. Clickar en el resultado y añadir.
Toda esta funcionalidad está contenida en el componente [Source Add Modal](src/components/source-add-modal.js#L36)

5. [x] Paginar los elementos mediante ajax.(1.5 puntos)

La paginación de servidor solo ocurre si estamos autenticados en la aplicación.
El desarrollo de esta funcionalidad se encuentra en el archivo [ajaxPaginator.js](src/ajaxPaginator.js) que se usa primariamente en la página [home.js](src/pages/home.js#L126)
