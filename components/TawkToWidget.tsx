'use client'
import { useEffect } from 'react';

// Define the Tawk_API interface based on available methods and properties
interface TawkToAPI {
  onLoad?: () => void;
  onStatusChange?: (status: string) => void;
  onChatMaximized?: () => void;
  onChatMinimized?: () => void;
  onChatHidden?: () => void;
  onChatStarted?: () => void;
  onChatEnded?: () => void;
  onPrechatSubmit?: (data: unknown) => void;
  onOfflineSubmit?: (data: unknown) => void;
  minimize?: () => void;
  maximize?: () => void;
  toggle?: () => void;
  popup?: () => void;
  showWidget?: () => void;
  hideWidget?: () => void;
  toggleVisibility?: () => void;
  endChat?: () => void;
  visitor?: {
    name?: string;
    email?: string;
    hash?: string;
  };
}

export type { TawkToAPI };

const TawkToWidget = () => {
  useEffect(() => {
    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Load the script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/66bbc28d146b7af4a439fee4/1i56mvvcd';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup
    return () => {
      // Check if script exists before removing
      const tawkScript = document.querySelector(`script[src="${script.src}"]`);
      if (tawkScript && tawkScript.parentNode) {
        tawkScript.parentNode.removeChild(tawkScript);
      }
    };
  }, []);

  return null;
};

export default TawkToWidget;