---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Actualización de Portainer'
pubDate: 2020-11-06
description: 'Este es la primera publicación de mi nuevo blog Astro.'
author: 'Roberto Serrano Diaz-Grande'
image:
    url: 'https://images.unsplash.com/photo-1628295581678-65ec0995d418?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    alt: 'El logotipo completo de Astro.'
tags: ["Nodejs", "Ubuntu", "NVM"]
---
## Mi primera publicación en el blog

Para quien no sepa que es Portainer, Portainer es una aplicación web desarrollada con Angular que sirve para gestionar contenedores Docker de manera visual.

Yo lo conocí a través del curso en YouTube sobre Docker en Qnap de @jmramirez el cual recomiendo si quieres saber más sobre Docker.

Portainer permite desde su interfaz actualizar contenedores Docker, esto suele funcionar en todos los contenedores, a excepción del propio Portainer. Es por eso que hay que realizar una actualización manual.

Hace seis días se lanzo una nueva release de Portainer, la CE 2.0.0 la cual introduce 101 cambios a Portainer, uno de los mayores cambios es el soporte con Kubernetes. Tenéis todos los cambios aquí.

En mi caso utilizo Portainer en un NAS Synology donde tengo instalado Docker, pero la verdad que Portainer es mucho mas completo que la aplicación nativa de Synology Docker.

Los siguientes pasos para actualizar Portainer son válidos en cualquier plataforma que ejecute Docker.

Los pasos a seguir para actualizar Portainer son bastante sencillos:

- Parar el contenedor de Portainer
- Eliminar el contenedor de Portainer
- Actualizar y descargar la nueva imagen de Portainer
- Crear y ejecutar el nuevo contenedor.


Abrimos una terminal y escribimos los siguientes comandos.

```sh
$ docker stop portainer-server
$ docker rm portainer-server
$ docker pull portainer/portainer
$ docker run -d -p 8000:8000 -p 9000:9000 --network=rsnet \\
--restart always \\
--name="portainer-server" \\
-v /var/run/docker.sock:/var/run/docker.sock \\
-v /volume2/docker/portainer:/data \\
portainer/portainer-ce:latest
```
Una vez finalizado, ya podemos acceder a la dirección http://ipportainer:9000 para comprobar que Portainer está actualizado.

Con esto ya tenemos actualizado Portainer a la nueva versión.

Espero que sirva de ayuda, si tienes alguna duda o algo que aportar puedes usar los comentarios.

Saludos.