// global.d.ts
interface BeforeInstallPromptEvent extends Event {
    prompt(): void;
    userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
    }>;
  }
  
  interface Window {
    deferredPrompt?: BeforeInstallPromptEvent;
  }
  