import Dropzone from 'react-dropzone'
import { act, fireEvent, render } from '@testing-library/react'
import CropperCtxProvider, { useCropperValues } from '../context/CropperCtx';
import { useEffect } from 'react';

// Dropzone component test
describe("Dropzone behavior", () => {
    it("renders the root and input nodes with the necessary props", () => {
        const { container } = render(
            <Dropzone>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                    </div>
                )}
            </Dropzone>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });

    it("sets {accept} prop on the <input>", () => {
        const accept = {
            "image/jpeg": [],
        };
        const { container } = render(
            <Dropzone accept={accept}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                    </div>
                )}
            </Dropzone>
        );

        expect(container.querySelector("input")).toHaveAttribute(
            "accept",
            "image/jpeg"
        );
    });
});

test('invoke onDragEnter when dragenter event occurs', async () => {
    const file = new File([
        JSON.stringify({ ping: true })
    ], 'ping.json', { type: 'application/json' })
    const data = mockData([file])
    const onDragEnter = jest.fn()

    const ui = (
        <Dropzone onDragEnter={onDragEnter}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                </div>
            )}
        </Dropzone>
    )
    const { container } = render(ui)

    await act(
        () => fireEvent.dragEnter(
            container.querySelector('div')!,
            data,
        )
    );
    expect(onDragEnter).toHaveBeenCalled()
})

function mockData(files: File[]) {
    return {
        dataTransfer: {
            files,
            items: files.map(file => ({
                kind: 'file',
                type: file.type,
                getAsFile: () => file
            })),
            types: ['Files']
        }
    }
}

// Ctx test
const TestingComponent = () => {
    const { setCroppedImgURL, croppedImgURL } = useCropperValues()
    useEffect(() => {
        setCroppedImgURL("test ctx")
    }, [])
    return (
        <>
            <p>{croppedImgURL}</p>
        </>
    );
};

describe('<CropperCtxProvider />', () => {
    test('provides expected cropped img url to child elements', () => {
        const { getByText } = render(
            <CropperCtxProvider>
                <TestingComponent />
            </CropperCtxProvider>,
        );

        expect(getByText("test ctx")).toBeInTheDocument()
    })
})