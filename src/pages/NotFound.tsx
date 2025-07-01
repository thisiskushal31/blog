
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">Go to Blog Home</Link>
          </Button>
          <Button asChild variant="outline">
            <a 
              href="https://thisiskushal31.github.io/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Back to Portfolio
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
