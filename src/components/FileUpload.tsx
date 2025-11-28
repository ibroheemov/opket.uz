import React, { useCallback, useState } from "react";

interface FileUploadProps {
    onFileSelected?: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected, ...props }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
        },
        []
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleFile = (file: File) => {
        setFileName(file.name);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        onFileSelected?.(file);
    };

    const handleReplace = () => {
        document.getElementById("file-input")?.click();
    };

    const handleDelete = () => {
        setPreviewUrl(null);
        setFileName("");
        onFileSelected?.(null);
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Upload Area */}
            <div
                className={`
          relative flex flex-col items-center justify-center
          w-full h-56 border-2 border-dashed rounded-2xl
          transition-all duration-200 cursor-pointer overflow-hidden
          ${isDragging ? "border-[#ffffff]" : "border-[#343d47]"}
          bg-[#272e37] hover:border-[#ffffff]
        `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    {...props}
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Background preview */}
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt={fileName}
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-40"
                    />
                )}

                {/* Overlay content */}
                {!previewUrl ? (
                    <label
                        htmlFor="file-input"
                        className="flex flex-col items-center justify-center text-center z-10"
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3585/3585899.png"
                            alt="upload"
                            className="w-16 h-16 opacity-80 mb-2"
                        />
                        <p className="text-white text-base font-medium">
                            Drop or select file
                        </p>
                        <p className="text-sm text-[#919EAB]">
                            Drag an image here, or{" "}
                            <span className="text-[#00bfa6] underline">browse</span>.
                        </p>
                    </label>
                ) : (
                    <div className="flex flex-col items-center justify-center z-10">
                        <p className="text-white text-sm mb-3 truncate max-w-[200px]">
                            {fileName}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleReplace}
                                className="px-4 py-2 text-sm font-medium rounded-md bg-[#00bfa6] text-white hover:bg-[#00a88f] transition"
                            >
                                Replace
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm font-medium rounded-md bg-[#343d47] text-white hover:bg-[#ffffff] hover:text-[#1a1f25] transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
