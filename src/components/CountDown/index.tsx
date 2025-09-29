import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import styles from './styles.module.scss';

export function CountDown() {
  const { state } = useTaskContext();

  return (
    <div className={styles.container}>{state.formattedSecondsRemaining}</div>
  );
}
