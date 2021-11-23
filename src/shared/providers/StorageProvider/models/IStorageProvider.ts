interface IStorageProvider {
    saveFile(file: string | undefined): Promise<string>;

    deleteFile(file: string): Promise<void>;
}

export { IStorageProvider };
