export interface Article {
    id: string;
    imageUrl?: string;
    status: "pending" | "approved" | "rejected";
    ip: string;
    createdAt: Date;
    rejectedReason: string;
    content: string;
}

export type Status = "pending" | "approved" | "rejected"