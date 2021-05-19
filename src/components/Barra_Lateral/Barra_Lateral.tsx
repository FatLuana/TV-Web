import styles from './style.module.css';
import Dados from "./Dados";

const Barra_Lateral = ()=>{

    return (
        <div className={styles.barra_lateral}>
        <ul className={styles.info}>
          {Dados.map((val, key) => {
            return (
              <li key={key} className={styles.barra_lateral_informação}>
                <div className={styles.informação_icon} > {val.icon} </div>

                <div className={styles.informação_titulo}>
                   <h4>{val.title}</h4>
                 </div>    
              </li>
            );
          })}
        </ul>
    </div>
    );
}

export default Barra_Lateral;