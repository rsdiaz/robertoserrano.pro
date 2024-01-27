---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Estrenando nuevo sitio web desarrollado con Astro'
pubDate: 2024-01-27
description: 'Bienvenidos a la primera entrada de mi blog en este nuevo sitio web. En esta primera publicación, quiero presentarles el sitio que he desarrollado y hablar un poco sobre las herramientas que utilicé, centrándome especialmente en Astro.'
author: 'Roberto Serrano'
github_profile: 'rsdiaz'
image:
    url: 'https://images.unsplash.com/photo-1628295581678-65ec0995d418?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    alt: 'El logotipo completo de Astro.'
tags: ["Astro", "Ubuntu", "NVM"]
---
## Primera publicación en mi nuevo sitio web

Bienvenidos a la primera entrada de mi blog en este nuevo sitio web. En esta primera publicación, quiero presentarles el sitio que he desarrollado y hablar un poco sobre las herramientas que utilicé, centrándome especialmente en [Astro](https://astro.build/).

Astro es un framework moderno que está ganando popularidad en el mundo del desarrollo web por su enfoque y eficiencia. Elegí Astro para este proyecto por varias razones que detallaré más adelante, destacando sus características y cómo estas benefician tanto al desarrollador como al usuario final.

En las siguientes secciones, exploraremos qué hace a Astro una opción notable y cómo ha impactado en la construcción de este sitio. Para aquellos interesados en aprender más, les recomiendo visitar la [documentación oficial de Astro](https://docs.astro.build/) y este [artículo introductorio](https://blog.example.com/intro-a-astro) que encontré particularmente útil.

Espero que este viaje por el desarrollo web sea tan informativo para ustedes como lo ha sido para mí.



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