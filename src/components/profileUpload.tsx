import React, { useState } from "react";
import { Camera } from "assets";

import axios from "axios";
import "../pages/ScrapPage/ScrapListPage.css";

interface ProfileUploadProps {
  profileImg?: string | null;
}

const ProfileUpload: React.FC<ProfileUploadProps> = ({ profileImg }) => {
  const placeholderImage =
    "https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp";
  const [profilePicture, setProfilePicture] = useState<string | null>(
    profileImg || null
  );
  const [error, setError] = useState<string | null>(null);

  const updateProfileImage = async (imageData: string) => {
    try {
      const response = await axios.patch("/mypage/profile/edit", {
        profileImg: imageData,
      });

      if (response.status === 200) {
        console.log("Profile image updated successfully:", response.data);
      } else {
        console.error("Failed to update profile image:", response.data.message);
      }
    } catch (error) {
      console.error("Error occurred while updating the profile image:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (
        fileExtension === "png" ||
        fileExtension === "jpg" ||
        fileExtension === "jpeg"
      ) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result as string;
          setProfilePicture(imageData);
          setError(null);
          updateProfileImage(imageData); // patch
        };
        reader.readAsDataURL(file);
      } else {
        setError("Only PNG and JPG files are allowed.");
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        accept=".png,.jpg,.jpeg"
        onChange={handleFileChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginTop: "-500px" }}>
        <img
          src={profilePicture || placeholderImage}
          alt="Profile"
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            marginLeft: "100px",
          }}
        />
        <Camera
          onClick={() => document.getElementById("fileInput")?.click()}
          style={{ marginLeft: "-60px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default ProfileUpload;
