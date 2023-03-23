import { IPhoto } from "@interfaces/IPhoto";
import { TUseThumbImages } from "./types";

export const useThumbImages = (): TUseThumbImages => {

    const urlImages = (fileList: FileList | null | IPhoto[]): string[] => {
        if (fileList instanceof FileList) {
            const urlFiles: string[] = [];
            Array.from(fileList).forEach((file: File) => {
                const url = URL.createObjectURL(file);
                urlFiles.push(url);
            });
            return urlFiles;
        }

        if (!fileList) return []

        return fileList.map((file: IPhoto) => file.url);
    }

    const genFiles = (fileList: FileList | null | IPhoto[]): FileList | null | IPhoto[] => {
        if (!fileList) null
        return fileList;
    }

    const genPlaceholder = (fileList: FileList | null | IPhoto[]): string => {
        if (fileList instanceof FileList) {
            const placeholderArray: string[] = [""];
            Array.from(fileList).forEach((file: File) => {
                placeholderArray.push(file.name);
            });
            return placeholderArray.join(", ");
        }

        if (!fileList) return "Nenhuma Foto";

        return fileList!.map((file: IPhoto) => file.filename).join(", ");
    }


    return [urlImages, genFiles, genPlaceholder]
}