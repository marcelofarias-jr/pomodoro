import { Link } from 'react-router-dom';

type RouterLinksProps = {
  children: React.ReactNode;
  href: string;
} & React.ComponentProps<'a'>;

export default function RouterLink({
  children,
  href,
  ...props
}: RouterLinksProps) {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
}
