"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ProfileUploadButtonProps {
  userId: string;
}

export default function ProfileUploadButton({ userId }: ProfileUploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data: session, update } = useSession();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast("Please upload an image smaller than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`/api/users/${userId}/profile-image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload profile image");
      }

      const result = await response.json();
      
      await update({
        user: {
          ...session?.user,
          image: result.imageUrl
        }
      });

      const imgElement = document.querySelector('.avatar-image') as HTMLImageElement;
      if (imgElement) {
        imgElement.src = `${result.imageUrl}?t=${new Date().getTime()}`;
      }

      toast("Profile image updated successfully");
      
      router.refresh();
    } catch (error) {
      toast(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="w-full flex items-center px-2 py-1.5 text-sm"
        disabled={isUploading}
      >
        <Upload className="mr-2 h-4 w-4" />
        <span>{isUploading ? "Uploading..." : "Upload Profile Picture"}</span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}