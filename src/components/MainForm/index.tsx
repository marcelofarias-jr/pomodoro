import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import getNextCycleType from '../../utils/getNextCycleType';
import { TaskActionsTypes } from '../../contexts/TaskContext/taskActions';

export default function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (!taskNameInput.current) return;
    const taskName = taskNameInput.current.value.trim();

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };
    dispatch({ type: TaskActionsTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask() {
    dispatch({ type: TaskActionsTypes.INTERRUPT_TASK });
  }
  return (
    <form className='form' action='' onSubmit={handleSubmit}>
      <div className='formRow'>
        <DefaultInput
          type='text'
          id='meuInput'
          labelText='task'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>
      <div className='formRow'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing </p>
      </div>
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}
      <div className='formRow'>
        {!state.activeTask && (
          <DefaultButton
            icon={<PlayCircleIcon />}
            title='Iniciar uma nova tarefa'
            aria-label='Iniciar uma nova tarefa'
            key='botao_submit'
          />
        )}

        {!!state.activeTask && (
          <DefaultButton
            icon={<StopCircleIcon />}
            title='Interromper tarefa atual'
            aria-label='Interromper tarefa atual'
            color='red'
            type='button'
            onClick={handleInterruptTask}
            key='botao_button'
          />
        )}
      </div>
    </form>
  );
}
