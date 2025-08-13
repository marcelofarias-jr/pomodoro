import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import getNextCycleType from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import Tips from '../Tips';
import { toastfyWrapper } from '../../adapters/toastfyWrapper';

export default function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name;

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      toastfyWrapper.warn('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };
    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    toastfyWrapper.sucess('Tarefa iniciada');
  }

  function handleInterruptTask() {
    toastfyWrapper.dismiss();
    toastfyWrapper.info('Tarefa interrompida');
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }
  return (
    <form className='form' action='' onSubmit={handleSubmit}>
      <div className='formRow'>
        <DefaultInput
          type='text'
          id='meuInput'
          labelText='O que você deseja fazer?'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>
      <div className='formRow'>
        <Tips />
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
