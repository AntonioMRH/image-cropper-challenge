import {
    useState, createContext, SetStateAction, Dispatch, ReactNode, useContext
} from "react"

export type CroppedFile = {
    file: Blob
    url: string
}

export interface CroppedCtxInterface {
    setCroppedImgURL: Dispatch<SetStateAction<string>>,
    setCroppedImgFile: Dispatch<SetStateAction<CroppedFile | null>>,
    croppedImgURL: string,
}

const defaultState = {
    setCroppedImgURL: (croppedFileURL: string) => { },
    setCroppedImgFile: (croppedFile: CroppedFile | null) => { },
    croppedImgURL: ""
} as CroppedCtxInterface

const CropperCtx = createContext(defaultState)

type CropperProviderProps = {
    children: ReactNode
}

const CropperCtxProvider = ({ children }: CropperProviderProps) => {
    const [croppedImgURL, setCroppedImgURL] = useState<string>("")
    const [croppedImgFile, setCroppedImgFile] = useState<CroppedFile | null>(null)

    const value = {
        setCroppedImgURL, setCroppedImgFile, croppedImgURL
    }

    return (
        <CropperCtx.Provider value={{ ...value }}>
            {children}
        </CropperCtx.Provider>
    )
}

export default CropperCtxProvider;

export function useCropperValues() {
    const context = useContext(CropperCtx);

    if (!context) {
        throw new Error(
            "useCropperValues must be used within a CropperCtxProvider"
        );
    }

    return context;
}
