import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";


function ZoomableImage({ src, imgW, imgH }) {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ cursor: 'zoom-in' }}>
                <TransformWrapper>
                    <TransformComponent>
                        <img
                            style={{ width: imgW, maxWidth: imgW, maxHeight: imgH, }}
                            src={src}
                            alt="test"
                        />
                    </TransformComponent>

                </TransformWrapper>
            </div>
        </div>
    );
}

export default ZoomableImage;
