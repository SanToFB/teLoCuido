# teLoCuido

 
##### Descripción
Es una app para encontrar niñera, tanto para niños como para mascotas, a la que se podra buscar por turnos disponibles. Tambien se podra buscar un listado de niñeras que acepten cuidar mascotas para aquellos que lo busquen. Para contactar se enviaran mensajes entre ellos. Por otro lado se realiza una api call a una api de clima, para consultar si va estar soleado, con lluvia o nublado ese mismo dia.
Tanto la niñera como el usuario podra tener su listado de favoritos agregando o borrando a la lista.

##### Funciones
Dar de alta niñera / usuario.
Modificar datos de niñera / usuario.
Eliminar niñera / usuario.
Buscar niñera por turno.
Buscar niñera por cuida mascotas.
Enviar mensajes entre usuario y niñera.
Busscar mensajes por id usuarios e id niñera.
Acceder al estado del clima.


##### Roles
-Usuarios
-Niñeras

##### Entidades Principales

-user
-nanny
-message
-clima
 
##### Package
Ejecuta `npm install`, instalando así todas las dependencias en el path node_modules. 

##### Available Scripts

En el directorio del proyecto, puede ejecutar:

##### `npm start`

Ejecuta la aplicación en el modo de desarrollo. \
Abra http://localhost:3000/ para verlo en el navegador.

##### `npm run startdev`

Ejecuta la aplicación en el modo de desarrollo. Se ejecuta automaticamente luego de grabar.\
Abra http://localhost:3000/ para verlo en el navegador.

La página se recargará si realiza modificaciones. \
También verá el hilo de errores en la consola.

##### Endpoints

GET:
users/api/users                         => trae usuarios.
users/api/user                          => trae usuario.
nannies/api/users                       => trae nannies.
nannies/api/user                        => trae nanny.
nannies/api/nanniesByMascota            => trae nannies que cuidan mascotas o no.
nannies/api/nanniesByTurno              => trae nannies por turno.
messages/api/mensajes                   => trae listado de mensajes entre usuario y nanny por id.
messages/api/mensaje                    => trae un mensaje por id.

POST:
users/api/user                          => agrega usuario.
users/api/login                         => login de usuario.
users/api/agregarFavoritos              => agrega usuario a lista de favoritos.
nannies/api/user                        => agrega nanny.
nannies/api/login                       => login de nanny.
nannies/api/agregarFavoritos            => agrega nanny a lista de favoritos.
messages/api/enviarMensaje              => agrega mensaje a la colleccion.

PUT:
users/api/user/:id                      => actualiza datos de usuario.
users/api/borrarFavoritos               => borra de favoritos un usuario o nanny.
nannies/api/user/:id                    => actualiza datos de nanny.
nannies/api/borrarFavoritos             => borra de favoritos un nanny.

DELETE:
users/api/user/:id                      =>Elimina usuario o nanny.
nannies/api/user/:id                    =>Elimina nanny.
messages/api/mensaje                    =>Elimina mensaje.