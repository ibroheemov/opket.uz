import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { AppCard } from "../../components/AppCard";
import Input from "../../components/Input";
import { AppButton } from "../../components/AppButton";

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


    const onSubmit = async (data: FormData) => {

        setLoading(true);
        setMessage(null);

        try {
            const formData = new FormData();

            formData.append("firstname", data.firstname);
            formData.append("lastname", data.lastname);
            formData.append("phone", data.phone);
            formData.append("car_model", data.car_model);
            formData.append("car_number", data.car_number);

            const res = await axios.post("http://localhost:3000/driver/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage("✅ " + res.data.message);
            reset();
        } catch (error: any) {
            setMessage("❌ " + (error.response?.data?.message || "Error occurred"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center from-gray-900 to-gray-800 p-6">
            <AppCard>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                // className="bg-[#303440] backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-lg"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                        🚗 Driver Registration
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Personal Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <Input {...register("firstname", { required: true })} label="Firstname" />
                            <Input {...register("lastname", { required: true })} label="Lastname" />
                        </div>
                        <Input {...register("phone", { required: true })} label="Phone Number" />

                        {/* Vehicle Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <Input {...register("car_model", { required: true })} label="Car Model" />
                            <Input {...register("car_number", { required: true })} label="Car Number" />
                        </div>
                        <AppButton text={"Register Driver"} loading={loading} />

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
            </AppCard>
        </div>
    );
};

export default DriverRegisterForm;
