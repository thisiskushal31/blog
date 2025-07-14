// LinkableHeading.tsx - Renders a heading (h1-h6) with an anchor link for easy section linking.
// Used for blog post headings to allow users to copy direct links to sections.
// If rendering fails, an error is logged and a fallback UI is shown.
import React from 'react';

interface LinkableHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6; // Heading level (h1-h6)
  children: React.ReactNode; // Heading content
  id?: string; // Optional id for anchor
}

const LinkableHeading = ({ level, children, id }: LinkableHeadingProps) => {
  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return (
      <Tag id={id} className="group relative scroll-mt-8 flex items-center gap-2">
        <span>{children}</span>
        {id && (
          <a
            href={`#${id}`}
            className="copy-link-btn opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Copy link to this section"
            aria-label="Copy link to this section"
          >
            {/* SVG link icon */}
            <svg className="h-4 w-4 inline-block align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </a>
        )}
      </Tag>
    );
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error('Error rendering LinkableHeading:', err);
    return null;
  }
};

export default LinkableHeading;
