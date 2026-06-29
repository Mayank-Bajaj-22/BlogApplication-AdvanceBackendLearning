import { deleteFromCloudinary, uploadOnCloudinary } from "./cloudinary.helper.js";
import { IFileService } from "./file.interface.js";

export class CloudinaryService implements IFileService{
    async upload(filePath: string): Promise<string> {
        const secure_url = await uploadOnCloudinary(filePath);
        return secure_url as string;
    }

    async delete(fileUrl: string) : Promise<void> {
        await deleteFromCloudinary(fileUrl);
    }
}