import { 
    collection, 
    query, 
    getDocs, 
    doc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    QueryConstraint, 
    DocumentData, 
    limit,
    startAfter
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Dispatch } from 'redux';
import { setAddItemLoading, setDeleteItemLoading, setGetAllItemsLoading, setGetItemsByQueryLoading, setGetSumLoading, setUpdateItemLoading } from '@/store/reducer/loadingSlice';
import { setError } from '@/store/reducer/reducer';

// Função para obter todos os itens de uma coleção
export async function getAllItems<T = DocumentData>(
    collectionName: string,
    dispatch: Dispatch
): Promise<T[]> {
    dispatch(setGetAllItemsLoading(true));
    try {
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as T));
    } catch (error) {
        console.error('Erro ao buscar todos os itens:', error);
        throw new Error('Erro ao buscar todos os itens.');
    } finally {
        dispatch(setGetAllItemsLoading(false));
    }
}

// Função para obter itens com base em uma consulta
export async function getItemsByQuery<T = DocumentData>(
    collectionName: string,
    constraints: QueryConstraint[],
    dispatch: Dispatch,
    maxItems?: number,
    lastVisibleDoc?: DocumentData | null,
): Promise<{ data: T[], lastVisible: DocumentData | null }> {
    dispatch(setGetItemsByQueryLoading(true));
    try {
        const collectionRef = collection(db, collectionName);

        let q = query(collectionRef, ...constraints)
        if(maxItems){
            q = query(collectionRef, ...constraints, limit(maxItems));
            if (lastVisibleDoc) {
                q = query(collectionRef, ...constraints, startAfter(lastVisibleDoc), limit(maxItems || 10));
            }
        }

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as T));

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

        return { data, lastVisible };
    } catch (error) {
        console.error('Erro ao buscar itens com consulta:', error);
        throw new Error('Erro ao buscar itens com consulta.');
    } finally {
        dispatch(setGetItemsByQueryLoading(false));
    }
}

// Função para obter a soma de um campo específico
export async function getSum(
    collectionName: string,
    constraints: QueryConstraint[],
    fieldName: string,
    dispatch: Dispatch
): Promise<number> {
    dispatch(setGetSumLoading(true));
    try {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, ...constraints);
        const querySnapshot = await getDocs(q);

        let sum = 0;
        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data[fieldName]) {
                sum += Number(data[fieldName]);
            }
        });

        return sum;
    } catch (error) {
        console.error('Erro ao calcular a soma:', error);
        throw new Error('Erro ao calcular a soma.');
    } finally {
        dispatch(setGetSumLoading(false));
    }
}

// Função para adicionar um novo item
export async function addItem<T extends DocumentData>(
    collectionName: string,
    item: T,
    dispatch: Dispatch
): Promise<void> {
    dispatch(setAddItemLoading(true));
    try {
        const collectionRef = collection(db, collectionName);
        await addDoc(collectionRef, item);
    } catch (error) {
        console.error('Erro ao adicionar item:', error);
        dispatch(setError("Erro ao adicionar Item"))
    } finally {
        dispatch(setAddItemLoading(false));
    }
}

// Função para atualizar um item existente
export async function updateItem(
    collectionName: string,
    id: string,
    updates: Partial<DocumentData>,
    dispatch: Dispatch
): Promise<void> {
    dispatch(setUpdateItemLoading(true));
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, updates);
    } catch (error) {
        console.error('Erro ao atualizar item:', error);
        dispatch(setError("Erro ao Editar Item"))
    } finally {
        dispatch(setUpdateItemLoading(false));
    }
}

// Função para deletar um item
export async function deleteItem(
    collectionName: string,
    id: string,
    dispatch: Dispatch
): Promise<void> {
    dispatch(setDeleteItemLoading(true));
    try {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Erro ao deletar item:', error);
        throw new Error('Erro ao deletar item.');
    } finally {
        dispatch(setDeleteItemLoading(false));
    }
}
