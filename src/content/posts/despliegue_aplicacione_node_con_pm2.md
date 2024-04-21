---
title: 'Despliegue de aplicaciones Nodejs con PM2'
pubDate: 2024-04-15
description: 'PM2 es una herramienta de gestión de procesos para Node.js con características como recarga sin tiempo de inactividad y balanceo de carga.'
author: 'Roberto Serrano'
github_profile: 'rsdiaz'
image:
    url: 'https://res.cloudinary.com/rserrano/image/upload/v1713735855/DALL_E_2024-04-13_11.11.56_-_Design_a_minimalist_image_representing_a_high-availability_application._The_image_should_include_abstract_interconnected_nodes_with_a_continuous_loop_hbarzt_qzhfxc.png'
    alt: 'El logotipo completo de Astro.'
tags: ["NodeJS"]
---
## 🤔 ¿Qué es PM2?

PM2 es una herramienta de gestión de procesos para Node.js que ofrece características como recarga sin tiempo de inactividad y balanceo de carga, entre otras.

#### Características principales de PM2

- Monitorización de estado y seguimiento detallado
- Balanceo de carga y gestión de cluster
- Administración de memoria y gestión de logs
- Reinicio automático de aplicaciones en caso de fallos,
- Capacidad para lanzar aplicaciones en modo fork o cluster
- Posibilidad de añadir o eliminar dinámicamente procesos de un cluster
- Integraciones con herramientas de DevOps como Docker y Kubernetes

#### Ventajas de Usar PM2
- Gestión de procesos automatizada para una disponibilidad continua
- Recarga sin tiempo de inactividad (zero-downtime reload)
- Balanceo de carga para un mejor rendimiento

Vamos a entrar en materia… empezamos con la instalación 😉

## 🤓 Instalación y Configuración

Realizaremos la instalación global de PM2 en nuestro sistema para facilitar la gestión de cualquier aplicación Node.js desde cualquier lugar.

```sh
npm install -g pm2
```

## 🧐 Monitoreo y Mantenimiento

Para monitorear tus aplicaciones Node.js con PM2, puedes utilizar una serie de comandos útiles que te proporcionan información detallada sobre el estado y el rendimiento de tus procesos.

```sh
# Muestra una lista de todas las aplicaciones que están siendo gestionadas por PM2
pm2 list

# Muestra una lista de todas las aplicaciones que están siendo gestionadas por PM2 con más detalle
pm2 ls

# AWESOME COMMAND 🚨
# Abre una terminal interactiva que permite monitorear el uso de CPU y memoria de cada aplicación en tiempo real
pm2 monit

# Descripción detallada de un proceso específico
pm2 show [app-name o id]

# Similar a pm2 list, pero puede proporcionar una salida más detallada dependiendo de las versiones de PM2
pm2 status

# Permite seguir los logs en tiempo real
pm2 logs [app-name o id]

# Información detallada sobre un proceso específico, útil para la depuración
pm2 describe [id]

# Para aquellos que prefieren una interfaz gráfica 💻
pm2 dashboard
```

Se pueden combinar estos comandos con scripts de shell o sistemas de monitoreo para automatizar el seguimiento de la salud de las aplicaciones.

## 🚀 Despliegue de aplicaciones con PM2

PM2 ofrece herramientas que pueden hacer que este proceso sea más eficiente y fiable. Aquí te presento algunos puntos que podrías tratar en tu sección sobre estrategias de despliegue.

Configuración del archivo ecosystem.config.js

El archivo ecosystem.config.js es el corazón de la configuración de PM2 y permite definir el entorno de nuestras aplicaciones Node.js. Aquí puedes especificar:

- **Scripts de despliegue**: Define los comandos necesarios para ejecutar antes y después del despliegue, como la instalación de dependencias con npm install.
- **Repositorio**: Indica el origen del código fuente, normalmente un repositorio de Git.
- **Información del host**: Especifica los servidores donde se desplegará la aplicación.
- **Rutas de directorios**: Define dónde se guardará el código en los servidores.
- **Variables de entorno**: Establece las variables específicas del entorno de producción, desarrollo, etc.

Ejemplo de fichero:

```javascript
module.exports = {
  apps: [{
    name: 'mi-aplicacion-node',
    script: 'app.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'username',
      host: ['192.168.0.1'],
      ref: 'origin/main',
      repo: 'git@github.com:usuario/repositorio.git',
      path: '/var/www/mi-aplicacion-node',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production'
      }
    },
    development: {
      user: 'username',
      host: ['192.168.0.2'],
      ref: 'origin/dev',
      repo: 'git@github.com:usuario/repositorio.git',
      path: '/var/www/mi-aplicacion-node-dev',
      'post-deploy': 'npm install y pm2 reload ecosystem.config.js --env development',
      env: {
        NODE_ENV: 'development'
      }
    }
  }
};
```

## 💻 Comandos de Despliegue

Utilizando pm2 deploy, puedes automatizar todo el ciclo de despliegue:

- **Despliegue**:
```sh
# Preparar el entorno de producción
pm2 deploy production setup

# Despliegue de la aplicación
pm2 deploy production
```

- **Actualización**: Si ya está desplegada, pm2 deploy production update actualiza la aplicación.

## ✅ Rollbacks Automáticos

Si algo sale mal, PM2 puede revertir a un despliegue anterior automáticamente.

```sh
# Donde `[n]` es el número de despliegues que quieres retroceder
pm2 deploy production revert [n]
```

## ♻️ Zero-Downtime Reload

Con PM2 puedes recargar la aplicación sin tiempo de inactividad, lo que permite que las actualizaciones sean imperceptibles para los usuarios.

```sh
pm2 reload ecosystem.config.js
```

## 🌐 Estrategias de Escalado

PM2 permite escalar horizontalmente tu aplicación con facilidad mediante el comando.

```sh
pm2 scale app +1
```

## ❤️ Conclusión

PM2 no solo simplifica la gestión de aplicaciones Node.js, sino que también potencia su estabilidad y rendimiento con herramientas avanzadas de monitoreo, despliegue y escalado.

Te animo a integrar PM2 en tus proyectos y a explorar cómo puede mejorar la disponibilidad y eficiencia de tus aplicaciones.

¿Tienes experiencias con PM2 que te gustaría compartir? ¡Deja tus comentarios abajo y hablemos!

#### Enlaces relacionados:
[PM2](https://pm2.keymetrics.io/)