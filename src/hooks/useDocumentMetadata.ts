import { useEffect } from 'react';

export default function useDocumentMetadata(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} | LensLyrics AR`;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    
    if (description) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);
}
