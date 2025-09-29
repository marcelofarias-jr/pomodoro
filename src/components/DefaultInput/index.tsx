import styles from './styles.module.scss';

type DefaultInputProps = {
  id: string;
  labelText: string;
} & React.ComponentProps<'input'>;
export function DefaultInput({
  type,
  id,
  labelText,
  ...props
}: DefaultInputProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input className={styles.input} type={type} id={id} {...props} />
    </>
  );
}
