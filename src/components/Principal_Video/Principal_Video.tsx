import styles from './style.module.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { sequenciadetempo } from '../../utils/converter';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { HomeContext } from '../../contexto/HomeContext';
import { useContext} from 'react';

const Principal_Video = () => {

    const {
        videoRef,
        video,
        isPlaying,
        isMute,
        volume,
        tempoTotal,
        tempoCorrente,
        canvasRef,
        imagensRef,
        filtro,
        setFiltro,
        configurarMute,
        alternarPausaDeReprodução,
        configurarVolume,
        configTempoCorrente,
        configFiltro
      } = useContext(HomeContext);
    
    return (
        <div className={styles.video}>
            <canvas className={styles.canvas} ref={canvasRef} ></canvas>
            <video className={styles.conteudo_video} src={video} ref={videoRef} hidden> </video>

            <input className={styles.tempo_video}
                type="range"
                min={0}
                max={tempoTotal}
                value={tempoCorrente}
                onChange={e => configTempoCorrente(Number(e.target.value))}
            ></input>

            <div className={styles.controles_video}>
                <div className={styles.esquerda_controles_video}>

                    {isPlaying ?
                        (<PauseIcon className={styles.icone_play} onClick={alternarPausaDeReprodução} />) :
                        (<PlayArrowIcon className={styles.icone_play} onClick={alternarPausaDeReprodução} />)
                    }
                    {isMute ?
                        (<VolumeOffIcon className={styles.icone_mutado} onClick={configurarMute} />) :
                        (<VolumeDownIcon className={styles.icone_mutado} onClick={configurarMute} />)
                    }

                    <input className={styles.controles_video_volume}
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={e => configurarVolume(Number(e.target.value))}
                    >
                    </input>
                    <div className={styles.tempoTotal}>
                        <span>{sequenciadetempo(tempoCorrente)}</span> / <span>{sequenciadetempo(tempoTotal)}</span>
                    </div>
                </div>
                <div className={styles.direita_controles_video}>
                    <button className={styles.butao_personalizar}>
                        <ColorLensIcon id="icon" />
                        <select value={filtro} onChange={e => setFiltro(e.target.value)}>
                            <option value="normal">Normal</option>
                            <option value="verde">Verde</option>
                            <option value="vermelho">Vermelho</option>
                            <option value="azul"> Azul</option>
                            <option value="preto e branco">Preto e Branco</option>
                        </select>
                        <button className={styles.bortao_calcular_filtro} onClick={configFiltro}>Calcular</button>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Principal_Video;