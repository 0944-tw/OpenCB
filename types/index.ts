export interface Article {
    id: string;
    imageUrl: string | null;
    status: string;
    ip: string | null;
    createdAt: Date;
    rejectedReason: string | null;
    content: string;
}

 