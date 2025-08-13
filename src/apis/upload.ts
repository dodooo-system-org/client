import { api } from '@/configs/axios.config';
import { IKSignature } from '@/types/apis/response';
import { upload } from '@imagekit/react';

class UploadAPI {
    private readonly baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    public getSignature = async (): Promise<IKSignature> => {
        const response = await api.get<IKSignature>(
            `${this.baseUrl}/upload/signature`
        );
        return response.data;
    };
    public uploadImage = async (
        file: File,
        signature: IKSignature,
        folder: string
    ): Promise<string> => {
        const response = await upload({
            file,
            fileName: file.name + `-${Date.now()}`,
            signature: signature.signature,
            token: signature.token,
            expire: signature.expire,
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
            folder: folder,
            tags: ['category'],
            transformation: {
                // post: [
                //     {
                //         type: 'transformation',
                //         value: 'w-800,h-400,q-100',
                //     },
                // ],
                pre: 'w-400,h-200,q-100',
            },
        });
        if (!response || !response.url) {
            throw new Error('Image upload failed');
        }
        return response.url;
    };
}

export { UploadAPI };
