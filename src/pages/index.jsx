import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'
import Image from 'next/image'
import styles from '../styles/home.module.scss'

export default function Home({latesEpisodes, episodes}) {

    return (
        <div className={styles.homepage}>
            <section className={styles.latesEpisodes}>
                <h2>Últimos episódos</h2>
                <ul>
                {
                    latesEpisodes.map( episode => {
                        return (
                            <li key={episode.id}>
                               <div className={styles.containerImage}>
                                <Image
                                    alt={episode.title}
                                    src={episode.thumbnail}
                                    width={192}
                                    height={142}
                                    objectFit="cover"
                                    />
                               </div>
                                <div className={styles.episodeDetails}>
                                    <a href="#">{episode.title}</a>
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
                            episodes.map( episode => {
                                return (
                                    <tr key={episode.id}>
                                        <td>
                                            <Image 
                                                src={episode.thumbnail}
                                                alt={episode.title}
                                                width={90}
                                                height={90}
                                                objectFit="cover"
                                            />
                                        </td>
                                        <td>{episode.title}</td>
                                        <td>{episode.members}</td>
                                        <td>{episode.publishedAt}</td>
                                        <td>{episode.duration}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {}
            </section>
        </div>
    )
}


export const getStaticProps = async () => {
    const response = await fetch('http://localhost:3000/api/episodes')
    const data = await response.json()
    const episodes = data.episodes.map( episode => {
        return {
            id: episode.id,
            title: episode.title,
            thumbnail: episode.thumbnail,
            members: episode.members,
            description: episode.description,
            publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
            duration: convertDurationToTimeString(Number(episode.file.duration)),
            url: episode.file.url
        }
    } )

    const latesEpisodes = episodes.slice(0, 2)
    const allEpisodes = episodes.slice(2, episodes.length)

    return {
        props: {
            latesEpisodes,
            episodes: allEpisodes
        },
        revalidate: 60 * 60 * 8,
    }
}