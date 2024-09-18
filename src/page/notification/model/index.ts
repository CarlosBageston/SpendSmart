import { Timestamp } from "firebase/firestore";


export interface NotificationModel {
    id?: string,
    titleNotification: string,
    descriptionNotification: string,
    typeNotification: "Notification" | "FaExclamationCircle" | "FaCheckCircle",
    openNotification: boolean,
    timestamp: Timestamp
}