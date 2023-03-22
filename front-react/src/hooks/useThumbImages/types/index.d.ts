export type TUseThumbImages = [
    (urlImages: FileList | null) => string[],
    (files: FileList | null) => FileList | null,
    (genPlaceholder: FileList | null) => string,
]