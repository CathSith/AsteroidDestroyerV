import styles from "./Action.module.css";

interface AsteroidCardActionProps {
  isDangerous: boolean;
  onClick: () => void;
  isDisabled: boolean;
}

export const AsteroidCardAction = ({ isDangerous, onClick, isDisabled }: AsteroidCardActionProps ) => {
 

  return (
    <div>
      <div className={styles.actionGrade}>
        Оценка: {isDangerous ? "Опасен" : "Не опасен"}
      </div>
      <button
        type="button"
        onClick={onClick}        
        className={`${styles.action} ${isDisabled ? styles.disabled : ''}`}
        disabled={isDisabled}
      >
        <div className={styles.actionText}>Уничтожить</div>
      </button>
    </div>
  );
};