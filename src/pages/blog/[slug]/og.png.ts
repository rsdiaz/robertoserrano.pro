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

  const DmSansBold = fs.readFileSync(path.resolve('./fonts/DMSans-Bold.ttf'));
  const DmSansRegular = fs.readFileSync(path.resolve('./fonts/DMSans-Regular.ttf'));
 
  const html = {
    type: 'div',
    props: {
      children: [
        {
          type: 'div',
          props: {
            // using tailwind
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
 