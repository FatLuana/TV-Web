import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { useContext } from 'react';
import { HomeContext } from '../contexto/HomeContext'
import Barra_Superior from '../components/Barra_Superior/Barra_Superior';
import Barra_Lateral from '../components/Barra_Lateral/Barra_Lateral';
import Principal_Video from '../components/Principal_Video/Principal_Video';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

export default function Home() {

  const {
    imagensRef,
  } = useContext(HomeContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Aplicação de vídeo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <div className={styles.topo}>
          <Barra_Superior />
        </div>
        <div className={styles.centro}>
          <Barra_Lateral />
          <div className={styles.visualizar_video}>
            <div className={styles.conteudo_video_fotos_imagens}>
            <Principal_Video />
            <div className={styles.imagens} ref={imagensRef} > </div>
            </div>
            <div className={styles.informações_video}>
              <div className={styles.informação_esquerda}>
                <h3>Prague Cello Quartet - The Phantom of the Opera</h3>
                <p>
                  Prague Cello Quartet:
                  Jan Zvěřina
                  Petr Špaček
                  Ivan Vokáč
                  Jan Zemen
                </p>
              </div>
              <div className={styles.informação_direita}>
                <h3>27.045.267</h3>
                <div className={styles.quadrado}></div>
                <div className={styles.icons_likes}>
                  <div className={styles.icon}>
                    <ThumbUpAltIcon className={styles.iconlike} />
                    <p className={styles.p}>579.000</p>
                  </div>
                  <div className={styles.icon2}>
                    <ThumbDownAltIcon className={styles.icondeslike} />
                    <p>5.300</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
