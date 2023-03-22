import { TUseThumbImages } from "./types";

export const useThumbImages = (): TUseThumbImages => {

    const urlImages = (fileList: FileList | null): string[] => {
        if (fileList instanceof FileList) {
            const urlFiles: string[] = [];
            Array.from(fileList).forEach((file: File) => {
                const url = URL.createObjectURL(file);
                urlFiles.push(url);
            });
            return urlFiles;
        }
        return []
    }

    const genFiles = (fileList: FileList | null): FileList | null => {
        if (fileList instanceof FileList) {
            return fileList
        }
        return null;
    }

    const genPlaceholder = (fileList: FileList | null): string => {
        const placeholderArray: string[] = [""];
        if (fileList instanceof FileList) {
            Array.from(fileList).forEach((file: File) => {
                placeholderArray.push(file.name);
            });
            return placeholderArray.join(", ");
        }
        return "Nenhuma Foto";
    }


    return [urlImages, genFiles, genPlaceholder]
}