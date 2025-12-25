export interface UserObject {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarFileName: string;
    avatarUrl: string;
    bio: string;
    _count: {
        followers: number,
        following: number
    },
    followers: {
        id: string;
        followerId: string;
        followingId: string;
        createdAt: string;
    }[]
}

export interface PostType {
    id: string;
    content: string;
    updatedAt: string;
    userId: string;
    cursorId: number;
    _count: {
        likes: number, retweets: number
    };
    likes: {
        id: string
    }[];
    retweets: any[];
    user: {
        avatarFileName: string;
        username: string;
        id: string;
    };
    avatarUrl: string;
    postImageUrl?: string;
}