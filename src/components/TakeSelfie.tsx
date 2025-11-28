import type React from "react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

/*
// Convert base64 selfie to blob
            const selfieBlob = await fetch(selfie).then((r) => r.blob());
            formData.append("selfie", selfieBlob, "selfie.jpg");
*/

export const TakeSelfie: React.FC = () => {
    // Webcam state
    const webcamRef = useRef<Webcam>(null);
    const [showCamera, setShowCamera] = useState(false);
    const [selfie, setSelfie] = useState<string | null>(null);

    const captureSelfie = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setSelfie(imageSrc);
            setShowCamera(false);
        }
    };

    return (
        < div >
            <label className="block text-sm text-gray-300 font-medium mb-1">Selfie</label>
            {
                showCamera ? (
                    <div className="flex flex-col items-center gap-3">
                        <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="rounded-xl border border-gray-600"
                        />
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={captureSelfie}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
                            >
                                Capture
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCamera(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : selfie ? (
                    <div className="flex flex-col items-center gap-3">
                        <img src={selfie} alt="Selfie Preview" className="rounded-xl w-40 h-40 object-cover border border-gray-600" />
                        <button
                            type="button"
                            onClick={() => setShowCamera(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                        >
                            Retake Selfie
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setShowCamera(true)}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                    >
                        Take Selfie
                    </button>
                )
            }
        </div >
    );
}
