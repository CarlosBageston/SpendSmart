import { useEffect, useState } from 'react';
import './PWABadge.css'

import { useRegisterSW } from 'virtual:pwa-register/react'

function PWABadge() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  // check for updates every hour
  const period = 60 * 60 * 1000

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r)
      }
      else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker
          if (sw.state === 'activated')
            registerPeriodicSync(period, swUrl, r)
        })
      }
    },
  })

  function close() {
    setOfflineReady(false)
    setNeedRefresh(false)
  }
  function downloadApp() {
    const installPromptEvent = window.deferredPrompt;
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        window.deferredPrompt = undefined;
      });
    }
  }
  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      console.log('BeforeInstallPromptEvent fired:', event);
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    if (import.meta.env.DEV) {
      setTimeout(() => {
        const fakeEvent = {
          prompt: () => console.log('Simulando prompt de instalação...'),
          userChoice: Promise.resolve({ outcome: 'accepted' }),
          preventDefault: () => console.log('Simulando preventDefault...'),
        } as BeforeInstallPromptEvent;
        handleBeforeInstallPrompt(fakeEvent);
      }, 3000);
    } else {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <div className="PWABadge" role="alert" aria-labelledby="toast-message">
      {(offlineReady || needRefresh)
        && (
          <div className="PWABadge-toast">
            <div className="PWABadge-message">
              {offlineReady
                ? <span id="toast-message">App está pronto para ser baixado.</span>
                : <span id="toast-message">Nova Versão do App Encontrada, Clique Em recarregar para atualizar.</span>}
            </div>
            <div className="PWABadge-buttons">
              {needRefresh && <button className="PWABadge-toast-button" onClick={() => updateServiceWorker(true)}>Recarregar</button>}
              <button className="PWABadge-toast-button" onClick={() => close()}>Fechar</button>
              {deferredPrompt && <button className="PWABadge-toast-button" onClick={downloadApp}>Baixar App</button>}
            </div>
          </div>
        )}
    </div>
  )
}

export default PWABadge

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(period: number, swUrl: string, r: ServiceWorkerRegistration) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine)
      return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    })

    if (resp?.status === 200)
      await r.update()
  }, period)
}
