import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeUploadProps {
  onUpload: (file: File) => void;
}

export function ResumeUpload({ onUpload }: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && (file.type === "application/pdf" || file.name.endsWith(".pdf"))) {
        setUploadedFile(file);
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setUploadedFile(file);
        onUpload(file);
      }
    },
    [onUpload]
  );

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Your Resume
      </h3>

      {uploadedFile ? (
        <div className="flex items-center justify-between p-4 rounded-lg bg-success/5 border border-success/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-success text-sm">
              <Check className="w-4 h-4" />
              Uploaded
            </div>
            <button
              onClick={removeFile}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-muted-foreground"
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                isDragging ? "bg-primary/10" : "bg-muted"
              }`}
            >
              <Upload
                className={`w-6 h-6 ${
                  isDragging ? "text-primary" : "text-muted-foreground"
                }`}
              />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Drop your resume here
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse (PDF only)
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              Select File
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}