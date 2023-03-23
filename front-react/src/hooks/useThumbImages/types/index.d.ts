export type TUseThumbImages = [
    (urlImages: FileList | null | IPhoto[]) => string[],
    (files: FileList | null | IPhoto[]) => FileList | null | IPhoto[],
    (genPlaceholder: FileList | null | IPhoto[]) => string,
]