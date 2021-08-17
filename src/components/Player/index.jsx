import styles from './styles.module.scss'

export function Player() {
    
    return (
        <div className={styles.playcontainer}>
            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>
            <footer className={styles.empty}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        <div className={styles.emptySlider}></div>
                    </div>
                    <span>00:00</span>     
                </div>        

                <div className={styles.buttons}>
                    <button>
                        <img src="/shuffle.svg" alt="embaralhar" />
                    </button>
                    <button>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button className={styles.playButtton}>
                        <img src="/play.svg" alt="Tocar podcast" />
                    </button>
                    <button>
                        <img src="/play-next.svg" alt="Tocar proxima" />
                    </button>
                    <button>
                        <img src="/repeat.svg" alt="Reprtir" />
                    </button>
                </div>
            </footer>
        </div>
    )
}