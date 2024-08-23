export const errorMessages: Record<string, { log: string; speak: string }> = {
    'no-speech': {
        log: 'Nenhuma fala detectada. Tente falar mais alto ou mais perto do microfone.',
        speak: 'Não consegui detectar sua fala. Estarei finalizando.',
    },
    'audio-capture': {
        log: 'Problema com a captura de áudio. Verifique se o microfone está funcionando.',
        speak: 'Não consegui acessar o microfone. Verifique se ele está funcionando corretamente.',
    },
    'network': {
        log: 'Problema de conexão de rede.',
        speak: 'Houve um problema de conexão. Verifique sua internet e tente novamente.',
    },
    'aborted': {
        log: 'O reconhecimento de fala foi abortado.',
        speak: 'O reconhecimento de fala foi interrompido. Tente novamente.',
    },
    'not-allowed': {
        log: 'Permissão para usar o microfone foi negada.',
        speak: 'Permissão para acessar o microfone foi negada. Habilite-a nas configurações e tente novamente.',
    },
};