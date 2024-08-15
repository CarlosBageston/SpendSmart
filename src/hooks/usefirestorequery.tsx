import { useState, useEffect, useRef } from 'react';
import { collection, query, getDocs, QueryConstraint, DocumentData } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface UseFirestoreQueryParams {
    /**
     * Nome da coleção no Firestore a ser consultada.
     */
    collectionName: string;

    /**
     * Restrições opcionais para a consulta, como `where`, `orderBy`, etc.
     * @example
     * // Exemplo de uso de constraints para buscar documentos onde o campo 'ativo' seja verdadeiro
     * const constraints = [
     *   where('ativo', '==', true)
     * ];
     */
    constraints?: QueryConstraint[];

    /**
     * Define se o resultado da consulta deve ser armazenado em cache.
     * @default false
     */
    useCache?: boolean;
}

/**
 * Hook personalizado para consultar dados de uma coleção do Firestore.
 *
 * @template T - O tipo dos documentos retornados.
 * @param {UseFirestoreQueryParams} params - Os parâmetros para a consulta.
 * @returns {object} - Um objeto contendo os dados da consulta, o estado de carregamento e possíveis erros.
 *
 * @example
 * // Exemplo de uso do hook para buscar uma coleção 'usuarios' onde o campo 'ativo' seja verdadeiro
 * const { data, loading, error } = UseFirestoreQuery<User>({
 *   collectionName: 'usuarios',
 *   constraints: [where('ativo', '==', true)],
 *   useCache: true
 * });
 */
export function UseFirestoreQuery<T = DocumentData>({
    collectionName,
    constraints = [],
    useCache = false,
}: UseFirestoreQueryParams) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cache para armazenar os resultados
    const cacheKey = `${collectionName}-${JSON.stringify(constraints)}`;
    const cache = useRef<Record<string, T[]>>({});

    useEffect(() => {
        const fetchData = async () => {
            if (useCache && cache.current[cacheKey]) {
                console.log('entro no cache')
                setData(cache.current[cacheKey]);
                setLoading(false);
                return;
            }

            try {
                const collectionRef = collection(db, collectionName);
                const q = query(collectionRef, ...constraints);
                const querySnapshot = await getDocs(q);

                const fetchedData: T[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                } as T));

                if (useCache) {
                    cache.current[cacheKey] = fetchedData;
                }
                setData(fetchedData);
            } catch (error) {
                setError('Erro ao buscar dados. Tente novamente');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collectionName]);

    return { data, loading, error };
}
