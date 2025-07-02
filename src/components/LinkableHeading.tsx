
import { Link } from 'lucide-react';

interface LinkableHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  id?: string;
}

const LinkableHeading = ({ level, children, id }: LinkableHeadingProps) => {
  // Generate ID from text content if not provided
  const headingId = id || children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const baseClasses = "group relative scroll-mt-8";
  const levelClasses = {
    1: "text-3xl font-bold mb-8 mt-10",
    2: "text-2xl font-semibold mb-6 mt-8", 
    3: "text-xl font-semibold mb-4 mt-6",
    4: "text-lg font-semibold mb-3 mt-5",
    5: "text-base font-semibold mb-2 mt-4",
    6: "text-sm font-semibold mb-2 mt-3"
  };

  return (
    <Tag id={headingId} className={`${baseClasses} ${levelClasses[level]}`}>
      <a
        href={`#${headingId}`}
        className="text-foreground hover:text-foreground hover:underline no-underline"
        aria-label={`Link to ${children}`}
      >
        {children}
        <Link 
          className="ml-2 h-4 w-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" 
          aria-hidden="true"
        />
      </a>
    </Tag>
  );
};

export default LinkableHeading;
