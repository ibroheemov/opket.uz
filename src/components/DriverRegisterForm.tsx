import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import Webcam from "react-webcam";

interface FormData {
    firstname: string;
    lastname: string;
    phone: string;
    car_model: string;
    car_number: string;
    selfie: string; // base64 image
    driver_license: FileList;
    passport: FileList;
}

const DriverRegisterForm: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // Webcam state
    const webcamRef = useRef<Webcam>(null);
    const [showCamera, setShowCamera] = useState(false);
    const [selfie, setSelfie] = useState<string | null>(null);

    // Image previews
    const [licensePreview, setLicensePreview] = useState<string | null>(null);
    const [passportPreview, setPassportPreview] = useState<string | null>(null);

    const captureSelfie = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setSelfie(imageSrc);
            setShowCamera(false);
        }
    };

    const handleFilePreview = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setter(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: FormData) => {
        if (!selfie) {
            setMessage("❌ Please take a selfie before submitting.");
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const formData = new FormData();

            formData.append("firstname", data.firstname);
            formData.append("lastname", data.lastname);
            formData.append("phone", data.phone);
            formData.append("car_model", data.car_model);
            formData.append("car_number", data.car_number);

            // Convert base64 selfie to blob
            const selfieBlob = await fetch(selfie).then((r) => r.blob());
            formData.append("selfie", selfieBlob, "selfie.jpg");

            if (data.driver_license?.[0]) {
                formData.append("driver_license", data.driver_license[0]);
            }
            if (data.passport?.[0]) {
                formData.append("passport", data.passport[0]);
            }

            const res = await axios.post("http://localhost:3000/driver/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage("✅ " + res.data.message);
            reset();
            setSelfie(null);
            setLicensePreview(null);
            setPassportPreview(null);
        } catch (error: any) {
            setMessage("❌ " + (error.response?.data?.message || "Error occurred"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#151a24] from-gray-900 to-gray-800 p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            // className="bg-[#303440] backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-lg"
            >
                <h2 className="text-3xl font-semibold text-white mb-6 text-center">
                    🚗 Driver Registration
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Personal Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            {...register("firstname", { required: true })}
                            placeholder="First Name"
                            className="w-full px-4 py-3 rounded-lg bg-[#303440] border-gray-500 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                        <input
                            {...register("lastname", { required: true })}
                            placeholder="Last Name"
                            className="w-full px-4 py-3 rounded-lg bg-[#303440] border-gray-500 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    <input
                        {...register("phone", { required: true })}
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 rounded-lg bg-[#303440] border-gray-500 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />

                    {/* Vehicle Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            {...register("car_model", { required: true })}
                            placeholder="Car Model"
                            className="w-full px-4 py-3 rounded-lg bg-[#303440] border-gray-500 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                        <input
                            {...register("car_number", { required: true })}
                            placeholder="Car Number"
                            className="w-full px-4 py-3 rounded-lg bg-[#303440] border-gray-500 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Selfie Capture */}
                    <div>
                        <label className="block text-sm text-gray-300 font-medium mb-1">Selfie</label>

                        {showCamera ? (
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
                        )}
                    </div>

                    {/* File Uploads with Preview */}
                    <div className="space-y-4">
                        <label className="block text-sm text-gray-300 font-medium">
                            Driver License
                            <input
                                type="file"
                                accept="image/*"
                                {...register("driver_license", { required: true })}
                                onChange={(e) => handleFilePreview(e, setLicensePreview)}
                                className="block w-full mt-1 text-sm text-gray-300 border border-gray-500 rounded-lg bg-[#303440] cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                            />
                            {licensePreview && (
                                <img
                                    src={licensePreview}
                                    alt="License Preview"
                                    className="mt-2 rounded-lg border border-gray-600 w-full object-cover"
                                />
                            )}
                        </label>

                        <label className="block text-sm text-gray-300 font-medium">
                            Passport
                            <input
                                type="file"
                                accept="image/*"
                                {...register("passport", { required: true })}
                                onChange={(e) => handleFilePreview(e, setPassportPreview)}
                                className="block w-full mt-1 text-sm text-gray-300 border border-gray-500 rounded-lg bg-[#303440] cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                            />
                            {passportPreview && (
                                <img
                                    src={passportPreview}
                                    alt="Passport Preview"
                                    className="mt-2 rounded-lg border border-gray-600 w-full object-cover"
                                />
                            )}
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-all disabled:opacity-60"
                    >
                        {loading ? "Registering..." : "Register Driver"}
                    </button>

                    {message && (
                        <p
                            className={`text-center mt-3 ${message.startsWith("✅") ? "text-green-400" : "text-red-400"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default DriverRegisterForm;
