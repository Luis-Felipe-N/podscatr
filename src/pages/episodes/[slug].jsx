import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import axios from "axios";
import styles from './styles.module.scss'

export default function Episode({episode}) {
  console.log(episode)

    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                <button type="button">
                    <img src="/arrow-left.svg" alt="Botão voltar" />
                </button>
                </Link>
                <Image 
                    src={episode.thumbnail}
                    alt={episode.id}
                    width={700}
                    height={350}
                />
                <button type="button">
                    <img src="/play.svg" alt="Tocar podcastr" />
                </button>
            </div>
            <header>
                <h1>{episode.title}</h1>
                <span className={styles.members}>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.duration}</span>
            </header>
            <div dangerouslySetInnerHTML={{ __html: episode.description}}/>
        </div>
    )
}

export const getStaticPaths = async (ctx) => {
  const response = await fetch('http://localhost:3000/api/episodes')
  const data = await response.json()
    
  const paths = data.episodes.map(episode => ({
    params: {
      slug: episode.id
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async (ctx) => {
    const { slug } = ctx.params;

    const response = await fetch('http://localhost:3000/api/episodes')
    const responseJson = await response.json()
  
    const data = responseJson.episodes.filter(episode => episode.id === slug)[0]

    const episode = {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      members: data.members,
      publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
      duration: convertDurationToTimeString(Number(data.file.duration)),
      // durationAsString: convertDurationToTimeString(Number(data.file.duration)),
      description: data.description,
      url: data.file.url,
    }
    return {
      props: {
        episode
      },
      revalidate: 60 * 60 * 24 //24 hours
    }
  }