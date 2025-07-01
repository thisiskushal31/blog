
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LinkableHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  id: string;
  children: ReactNode;
  className?: string;
}

const LinkableHeading = ({ level, id, children, className = "" }: LinkableHeadingProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <HeadingTag id={id} className={`group relative ${className}`}>
      <Link 
        to={`#${id}`} 
        className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
        aria-label={`Link to ${children}`}
      >
        #
      </Link>
      {children}
    </HeadingTag>
  );
};

export default LinkableHeading;
