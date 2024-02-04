---
title: 'Generar imágenes dinámicas para Open Graph en Astro con @vercel/og'
pubDate: 2024-02-03
description: 'Cuando se trata de compartir tu sitio web en redes sociales, la primera impresión cuenta mucho. Las imágenes de Open Graph (OG) son esenciales para captar la atención en plataformas como Facebook, Twitter y LinkedIn. En este post, te mostraré cómo generar imágenes estáticas dinámicas para Open Graph en Astro, utilizando la herramienta @vercel/og.'
author: 'Roberto Serrano'
github_profile: 'rsdiaz'
image:
    url: 'https://res.cloudinary.com/rserrano/image/upload/v1706986213/what-is-astro-cover-image_qj7u0g.png'
    alt: 'El logotipo completo de Astro.'
tags: ["Astro", "SEO"]
---
## ¿Qué es Open Graph?

Open Graph es un protocolo que permite a las páginas web convertirse en objetos ricos en redes sociales. Especificando metadatos en tu HTML, puedes controlar cómo se ven tus enlaces cuando se comparten.

## Preparando tu Proyecto de Astro
Asegúrate de que tu proyecto Astro está configurado y listo para implementar. Si es nuevo en Astro, aquí tienes una [guía rápida](https://astro.build/).

## Instalación de @vercel/og
[@vercel/og](https://www.npmjs.com/package/@vercel/og) es un servicio que permite generar imágenes OG dinámicas. Puedes instalarlo con tu gestor de paquetes favorito:
```sh
npm install @vercel/og
# o con Yarn
yarn add @vercel/og

```

## Creación del endpoint en Astro
Una vez instalado, vamos a crear el endpoint en Astro, en mi caso he creado el fichero /pages/blog/[slug]/og.png.ts
```ts
// /pages/blog/[slug]/og.png.ts

import { getEntry, type CollectionEntry } from "astro:content";
import fs from 'fs';
import path from 'path';
import { ImageResponse } from '@vercel/og';
 
interface Props {
  params: { slug: string };
}

export async function GET({ params }: Props) {
  const { slug } = params;
 
  if (slug === undefined) {
    throw new Error("Slug is required");
  }
  
  const entry = await getEntry("posts", slug) as CollectionEntry<'posts'>;
  
  if (entry === undefined) {
    // return Astro.redirect("/404");
  }

  // Podemos usar fuentes custom
  const DmSansBold = fs.readFileSync(path.resolve('./fonts/DMSans-Bold.ttf'));
  const DmSansRegular = fs.readFileSync(path.resolve('./fonts/DMSans-Regular.ttf'));
 
 // Como esto no es React le pasamos elemento html a ImageResponse de @vercel/og
  const html = {
    type: 'div',
    props: {
      children: [
        {
          type: 'div',
          props: {
            // podemos usar tailwind
            tw: 'w-[250px] h-[250px] flex rounded-3xl overflow-hidden',
            children: [
              {
                type: 'img',
                props: {
                  src: entry.data.image.url,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'pl-10 shrink flex',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-6xl text-gray-300',
                  style: {
                    fontFamily: 'DM Sans Bold',
                    letterSpacing: '-0.07em'
                  },
                  children: entry.data.title,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'absolute right-[40px] top-[40px] flex items-center',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-gray-500 text-3xl',
                  style: {
                    fontFamily: 'DM Sans Bold',
                  },
                  children: 'Roberto Serrano',
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'px-2 text-3xl',
                  style: {
                    fontSize: '30px',
                  },
                  children: '💻',
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'text-3xl text-yellow-500',
                  style: {
                    fontFamily: 'DM Sans Bold',
                  },
                  children: '@rsdiaz',
                },
              },
            ],
          },
        },
      ],
      tw: 'w-full h-full flex items-center justify-center relative px-22',
      style: {
        background: '#0c1221',
        fontFamily: 'DM Sans Regular',
      },
    },
  };
 
  return new ImageResponse(html, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: 'DM Sans Bold',
        data: DmSansBold.buffer,
        style: 'normal',
      },
      {
        name: 'DM Sans Regular',
        data: DmSansRegular.buffer,
        style: 'normal',
      },
    ],
  });
}
 
```


## Probando el resultado
Para probar el endpoint tan solo añadimos a la url de nuestro post /og.png. En mi caso este a sido el resultado:

![generando_imagenes_open_graph_en_astro](http://localhost:4321/blog/generando_imagenes_dinamicas_para_open_graph_en_astro/og.png)

## Añadir los OG tags en el HTML

Podemos crear un componente Astro para esto:
```astro
---
// /components/Metatags.astro

interface Props {
  title: string;
  description: string;
  image: string;
  canonicalUrl: string;
  type: 'website' | 'article';
  publishedTime?: string;
}
 
const { title, description, image, canonicalUrl, type, publishedTime } =
  Astro.props;
---
 
<title>{title}</title>
<meta name="description" content={description} />
{
  publishedTime && (
    <meta property="article:published_time" content={publishedTime} />
  )
}
 
<link rel="canonical" href={canonicalUrl} />
 
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image" content={image} />
<meta property="og:type" content={type} />
 
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta name="twitter:image" content={image} />
```

Una vez creado el componente, ya puedes usarlo en los templates como otro componente cualquiera. 😉
```astro
---
import Metatags from '../components/Metatags.astro';
---

<Metadata
    slot="head"
    title={post.data.title}
    description={post.data.excerpt}
    image={`${import.meta.env.SITE}/blog/${post.slug}/og.png`}
    canonicalUrl={`${import.meta.env.SITE}/blog/${post.slug}/`}
    publishedTime={post.data.date.toISOString()}
    type="article"
  />
```

## Conclusion
Para mi es fundamental automatizar tareas a la hora de crear posts y esta herramienta me ayuda a generar las imágenes OG de mis publicaciones automáticamente. 

Buena herramienta por parte de [vercel](https://vercel.com/)

**¿Qué te ha parecido esta herramienta y su integración con Astro?** No dudes en dejar tus comentarios abajo. Estoy aquí para ayudar y discutir sobre estas fascinantes tecnologías.

