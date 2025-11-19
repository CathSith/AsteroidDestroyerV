import styles from "./Header.module.css";
import { memo} from "react";
import { NavLink } from "react-router-dom";

export const Header = memo(() => {
  
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.label}>ARMAGGEDON V</div>
                <div className={styles.subLabel}>
                    Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.
                </div>
            </div>
            <div className={styles.rightColumn}>
                <div className={styles.linkCont}>
                    <NavLink
                        to="/asteroids"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                        }
                    >
                        Астероиды
                    </NavLink>
                    <NavLink
                        to="/destruction"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                        }
                    >
                        Уничтожение
                    </NavLink>
                </div>

            </div>

            <div className={styles.rectangle}></div>
        </div>
    );
});

Header.displayName = "Header";