import styles from './style.module.css';
import ReorderIcon from '@material-ui/icons/Reorder';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';

const Barra_Superior = ()=>{

    return (
        <div className={styles.barra_superior}>
        <div className={styles.esquerda}>
          <ReorderIcon id="menu"/>
        </div>
        <div className={styles.centro_superior}>
           <button className={styles.botao_icon}>
               <SearchIcon  style={{color: "grey"}}/>
           </button>
           <input className={styles.buscar} placeholder="Search..." />
        </div>
        
        <div className={styles.direita}>
        <div className={styles.direita_icon}><NotificationsIcon/></div>
          <div className={styles.imagemperfil} >
          <img className={styles.imagem} src={"foto.jpeg"}/>
          </div>
        </div>
     </div>
    );
}

export default Barra_Superior;