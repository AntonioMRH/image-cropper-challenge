import { useRef, useState } from "react"
import { Image, WarningCircle, X } from "phosphor-react"
import { useDropzone } from 'react-dropzone'
import Cropper from "react-easy-crop"
import getCroppedImg from "../utils/cropImage"
import { getSliderBgSize } from "../utils/sliderBgResizer"
import { useCropperValues } from "../context/CropperCtx"

interface FileWithPreview extends File {
    preview?: string;
}

type AreaType = {
    x: number;
    y: number;
    width: number;
    height: number;
}

const AvatarUpload = () => {

    const {
        setCroppedImgURL, setCroppedImgFile, croppedImgURL
    } = useCropperValues()

    const inputFile = useRef<HTMLInputElement | null>(null)

    const [files, setFiles] = useState<FileWithPreview | null>(null)
    const [dropError, setDropError] = useState<boolean>(false)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(20)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<AreaType | null>(null);
    const [resizeComplete, setResizeComplete] = useState<boolean>(false)

    // Dropzone config
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': [".jpg", ".png", ".gif", ".jpeg"]
        },
        maxFiles: 1,
        onDrop: acceptedFiles => {
            setFiles(
                {
                    preview: URL.createObjectURL(acceptedFiles[0]),
                    ...acceptedFiles[0],
                }
            );
            setResizeComplete(false);
            setCroppedImgURL("")
        },
        onError: () => {
            setFiles(null)
            setDropError(true)
        },
    })

    const cropImage = async () => {
        try {
            // @ts-ignore : TS bug
            const { file, url } = await getCroppedImg(
                files?.preview!,
                croppedAreaPixels,
            );
            setCroppedImgURL(url!);
            setCroppedImgFile(file);
        } catch (error) {
            console.log(error);
        }
    };

    const cropComplete = (croppedArea: AreaType, croppedAreaPixels: AreaType) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    // Event handlers
    const handleZoomChange = (newValue: number) => {
        setZoom(newValue);
    };

    const handleSavedCroppedImg = () => {
        cropImage()
        setFiles(null)
        setResizeComplete(true);
    }

    const handleCancelCrop = () => {
        // Reset states
        setFiles(null)
        setCrop({ x: 0, y: 0 })
        setZoom(20)
        setDropError(false)
        setResizeComplete(false)
    }

    // Steps conditions
    const initialStep = files == null && !dropError && !resizeComplete
    const imageUploadedStep = files !== null && !resizeComplete
    const croppedImgSaveStep =
        croppedImgURL.length > 0 && resizeComplete && !dropError
    const errorStep = files == null && dropError

    return (
        <article className="max-w-full h-screen pt-20 pb-6 flex flex-col 
        items-center justify-start"
        >
            <section className={`sm:w-[553px] sm:h-[177px] bg-gray-100 
                rounded-lg flex flex-col items-center justify-center antialiased
                ${files == null && !dropError ? "border-dashed border-2 border-gray-200" : ""} font-inter`}
            >
                {/* Initial Layout*/}
                {initialStep &&
                    <div {...getRootProps({ className: 'dropzone' })} className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center
                text-blue-600 gap-[12.1px]"
                        >
                            <Image size={20} weight="fill" />
                            <p className="text-sm font-medium leading-[25.2px]">
                                Organization Logo
                            </p>
                        </div>
                        <p className="text-sm font-normal leading-[25.2px] text-gray">
                            Drop the image here or click to browse.
                        </p>
                        <input
                            {...getInputProps()}
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={inputFile}
                            className="hidden"
                        />
                    </div>}
                {/* Upload Fail*/}
                {errorStep &&
                    <div className="w-full h-full flex items-center justify-start px-[31px] pt-[32px] pb-[31px] gap-8 relative">
                        <div className="w-[114px] h-[114px] rounded-full flex justify-center items-center bg-gray-300" >
                            <WarningCircle size={24} color="#fff" weight="fill" />
                        </div>
                        <div className="w-fit h-full flex flex-col items-start justify-start pt-[7px]">
                            <p className="text-orange-error font-normal leading-[28.8px] text-base">
                                Sorry, the upload failed.
                            </p>
                            <button onClick={handleCancelCrop}>
                                <p className="text-blue-700 font-medium leading-[28.8px] text-base underline">
                                    Try again
                                </p>
                            </button>
                        </div>
                        <button
                            className="w-4 h-4 absolute right-0 top-0 mt-[35.75px] mr-[28.75px]"
                            onClick={handleCancelCrop}
                        >
                            <X size={20} color="##677489" weight="fill" />
                        </button>
                    </div>}
                {/* Upload Successful*/}
                {imageUploadedStep &&
                    <div className="w-full h-full flex items-center justify-start px-[31px] pt-[32px] pb-[31px] gap-8 relative">
                        <div className="w-[114px] h-[114px] rounded-full relative" >
                            <Cropper
                                image={files?.preview}
                                crop={crop}
                                zoom={zoom / 10}
                                aspect={5 / 5}
                                onCropChange={setCrop}
                                onCropComplete={cropComplete}
                                onZoomChange={setZoom}
                                cropShape="round"
                                showGrid={false}
                            />
                        </div>
                        <div className="w-[276px] h-full flex flex-col items-end justify-center">
                            <div className="w-full flex flex-col items-start justify-start flex-1 h-full gap-[13px] pt-[7px]">
                                <p className="text-gray font-normal leading-[28.8px] text-base">
                                    Crop
                                </p>
                                <div className="flex flex-col justify-start items-start w-[276px]">
                                    <input
                                        type="range"
                                        min={1}
                                        max={100}
                                        value={zoom}
                                        className="slider"
                                        onChange={e => handleZoomChange(Number(e.target.value))}
                                        style={getSliderBgSize(zoom)}
                                    />
                                </div>
                            </div>
                            <button
                                className="w-[109px] h-[32px] rounded-2xl font-medium leading-[25.2px] text-sm text-white bg-blue-700"
                                onClick={handleSavedCroppedImg}
                            >
                                Save
                            </button>
                        </div>
                        <button
                            className="w-4 h-4 absolute right-0 top-0 mt-[35.75px] mr-[28.75px]"
                            onClick={handleCancelCrop}
                        >
                            <X size={20} color="##677489" weight="fill" />
                        </button>
                    </div>}
                {/* Image saved */}
                {croppedImgSaveStep &&
                    <div
                        {...getRootProps({ className: 'dropzone' })}
                        className="cursor-pointer w-full h-full flex items-center justify-start gap-[50px] p-[31px]"
                    >
                        <div className="w-[114px] h-[114px] rounded-full flex justify-center items-center bg-gray-300" >
                            <img src={croppedImgURL} className="rounded-full" />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex items-center justify-center
                            text-blue-600 gap-[12.1px]"
                            >
                                <Image size={20} weight="fill" />
                                <p className="text-sm font-medium leading-[25.2px]">
                                    Organization Logo
                                </p>
                            </div>
                            <p className="text-sm font-normal leading-[25.2px] text-gray">
                                Drop the image here or click to browse.
                            </p>
                        </div>
                        <input
                            {...getInputProps()}
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={inputFile}
                            className="hidden"
                        />
                    </div>}
            </section>
        </article>
    )
}

export default AvatarUpload