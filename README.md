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
    3. Editar(1 punto) [Renombrar una categoría](src/components/category-update-modal.js#L20) [Añadir o eliminar fuentes de una categoría](src/components/category-add-source.js#L17)
    4. Mostrar(1 punto) [Mostrar una categoría](src/category.js#L133)

4. Realizar una búsqueda mediante ajax y que muestre los resultados. (1.5 puntos)

En mi caso hago un autocomplete al añadir una fuente de noticias, cuando abrimos el modal para añadir una fuente podemos escribir el nombre de la web y va a intentar encontrar una fuente ya añadida en la base de datos, si no hara una peticion a esa web.
Por ejemplo podemos poner: thenextweb.com y si no existe dicha fuente en la base de datos recogerá la información y lo mostrará como único resultado.
Para traer varios elementos podemos buscar con una "p" porque la p está en todas las urls, entonces nos traerá como máximo tres ocurrencias de la base de datos. Clickar en el resultado y añadir.
Toda esta funcionalidad está contenida en el componente [Source Add Modal](src/components/source-add-modal.js#L36)

5. [x] Paginar los elementos mediante ajax.(1.5 puntos)

La paginación de servidor solo ocurre si estamos autenticados en la aplicación.
El desarrollo de esta funcionalidad se encuentra en el archivo [ajaxPaginator.js](src/ajaxPaginator.js) que se usa primariamente en la página [home.js](src/pages/home.js#L126)

## Set up

1. Descargar el proyecto
2. `npm install` para instalar dependencias
3. `npm run dev` para compilar los archivos
4. `npm run start` para iniciar el servidor local
5. Descargar el proyecto de servidor atomic-api (la url debe ser http://atomic-api.test, si no hay que cambiarlo en este proyecto en el archivo [config.js](src/config.js) líneas 20 y 21)
6. Configurar las variables de entorno en .env
7. `composer install` para instalar las dependencias del servidor (telescope necesita la extension php-bcmath)
8. `php artisan migrate` para crear las tablas

Podría haber hecho un seeder pero en este contexto es un poco lioso, por tanto el proceso que yo sigo para testar la aplicación pasando por todos los puntos es:

Una vez haya cargado la aplicacion y sepas que el back funciona.
1. Registrar un usuario en el boton de SignUp, una vez completado cerrar el modal y loguearse en el boton de Log In
2. Añadir fuentes de noticias las que yo uso:
    1. thenextweb.com
    2. theverge.com
    3. omgubuntu.co.uk
    4. linuxhint.com
    5. wired.com
    6. engadget.com
3. Momento perfecto para comprobar que el autocomplete funciona es volver haciendo click para añadir una fuente y escribir por ejemplo 'the'
pues saldrian thenextweb y theverge
3. Con esas fuentes tienes de sobra para realizar paginación (añadir las fuentes puede tardar hasta 30 segundos, paciencia, si dura mas de eso mira la consola y estaré suspenso XD)
4. Recargar página y hacer scrolling para comprobar paginacion (puede tener abierta la pestaña de red para comprobarlo)
5. CRUD
    1. Añadir una categoría en el sidebar (click en +, create)
    2. Entrar en la categoria (read)
    3. Renombrar la categoria haciendo click en el boton de la barra con tres puntos y boton 'Renombrar categoria'
    4. Lo mismo pero click en borrar
