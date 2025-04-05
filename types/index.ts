export interface Article {
    id: number;
    imageUrl: string | null;
    status: string;
    ip: string | null;
    createdAt: Date;
    rejectedReason: string | null;
    content: string;
    delete_key: string;
}

 