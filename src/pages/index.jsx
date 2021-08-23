import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/home.module.scss'
import axios from 'axios'
import { api } from '../service/api'
// import { api } from '../service/api'

export default function Home({latestEpisodes, allEpisodes}) {

    return (
        <div className={styles.homepage}>
            <section className={styles.latestEpisodes}>
                <h2>Últimos episódos</h2>
                <ul>
                {
                    latestEpisodes.map( episode => {
                        return (
                            <li key={episode.id}>
                               <div style={{width: '6rem'}}>
                                <Image
                                    alt={episode.title}
                                    src={episode.thumbnail}
                                    width={192}
                                    height={192}
                                    objectFit="cover"
                                    />
                               </div>
                                <div className={styles.episodeDetails}>
                                    <Link href={`/episodes/${episode.id}`}><a>{episode.title}</a></Link>
                                    <p>{episode.members}</p>
                                    <span>{episode.publishedAt}</span>
                                    <span>{episode.duration}</span>
                                </div>
                                <button>
                                    <img src="/play-green.svg" alt="começar episódio" />
                                </button>
                            </li>
                        )
                    })
                }
                </ul>
            </section>
            <section className={styles.allEpisodes}>
                <h2>Todos episódios</h2>
                <table cellSpacing={0}>
                    <thead>
                        <th></th>
                        <th>Podcast</th>
                        <th>Integrantes</th>
                        <th>Data</th>
                        <th>Duração</th>
                    </thead>
                    <tbody>
                        {
                            allEpisodes.map( episode => {
                                return (
                                    <tr key={episode.id}>
                                        <td  style={{width: '70px'}}>
                                            <Image 
                                                src={episode.thumbnail}
                                                alt={episode.title}
                                                width={90}
                                                height={90}
                                                objectFit="cover"
                                            />
                                        </td>
                                        <td>
                                            <Link href={`/episodes/${episode.id}`}>
                                                <a>{episode.title}</a>  
                                            </Link>
                                        </td>
                                        <td>{episode.members}</td>
                                        <td style={{width: '100px'}}>{episode.publishedAt}</td>
                                        <td>{episode.duration}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export const getStaticProps = async () => {
    const { data } = await api.get('episodes', {
        params: {
          __limit: 2,
          __sort: 'published_at',
          __order: 'desc'
        }
      })
 
    const episodes = data.map(episode => {
      return {
        id: episode.id,
        title: episode.title,
        thumbnail: episode.thumbnail,
        members: episode.members,
        publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
        duration: convertDurationToTimeString(Number(episode.file.duration)),
        url: episode.file.url
      }
    })
 
    const latestEpisodes = episodes.slice(0, 2)
    const allEpisodes = episodes.slice(2, episodes.length)
 
    return {
      props: {
       latestEpisodes,
       allEpisodes,
      },
      revalidate: 60 * 60 * 8,
    }
}