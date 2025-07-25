export class Notification {

    ID?: number;
    APPLICANT_ID!: number;
    USER_ID!: number;
    BRANCH_ID!: number;
    NOTIFICATION_DETAIL!: string;
    CREATED_USER_ID!: number;
    CREATED_ON_DATETIME?: Date; 
    LAST_MODIFIED_DATE?: string; 
    STATUS?: string;
}
