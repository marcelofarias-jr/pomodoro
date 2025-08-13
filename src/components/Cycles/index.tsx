import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import styles from './styles.module.scss';

export function Cycles() {
  const { state } = useTaskContext();
  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cyclesDots}>
        {state.tasks.map((task, i) => {
          const type = task.type;
          return (
            <span
              className={`${styles.cycleDot} ${styles[type]}`}
              aria-label={`Indicador de ciclo de ${cycleDescriptionMap[type]}`}
              title={`Indicador de ciclo de ${cycleDescriptionMap[type]}`}
              key={i}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
