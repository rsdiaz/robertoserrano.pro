import { Section, HeroAvatar, GradientText } from '@/components'

const Hero = () => {
  return (
    <Section>
      <HeroAvatar
        title={
          <>
            Hola, soy <GradientText>Roberto</GradientText> 👋
          </>
        }
        description={
          <>
            Apasionado de las tecnologías web, el desarrollo y la seguridad informática.{' '}
            <a className="text-amber-500 hover:underline" href="/">
              Entusiasta
            </a>{' '}
            de HTML, CSS, JavaScript, Node.{' '}
            Comparto mi aprendizaje y conocimiento a traves de mi{' '}
            <a className="text-amber-500 hover:underline" href="/posts">
              blog
            </a>{' '}
            en el cual publico artículos sobre desarrollo web y mi día a día tecnológico.
          </>
        }
        avatar={
          <>
            <img
              className="h-60 w-64 rounded-full"
              src="/assets/images/avatar.png"
              alt="Avatar image"
              loading="lazy"
            />
          </>
        }
      />
    </Section>
  )
}

export { Hero }
