import { useState } from "react";
import { ImageUploader } from "../../../ui/ImageUploader/ImageUploader";
import { UserAvatar } from "../../../components/UserAvatar";

export const SettingsScreen = ({ user }) => {
  const [file, setFile] = useState<File>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      setFile(data);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      console.log("WTF2");
      return;
    }
    console.log(file);
    // 👇 Uploading the file using the fetch API to the server
    fetch(
      `http://192.168.0.102:3500/api/addUserAvatar?username=${user.username}`,
      {
        method: "POST",
        body: file,
        // 👇 Set headers manually for single file upload
        headers: {
          "Access-Control-Allow-Credentials": "true",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="profile__wrapper">
      <div className="profile__login">Имя пользователя: {user?.username}</div>
      <div className="profile__login">Электронная почта: {user?.mail}</div>
      <div className="profile__avatar">
        <UserAvatar
          className="avatar__img"
          username={user?.username}
        ></UserAvatar>
        <ImageUploader
          handleFileChange={handleFileChange}
          handleUploadClick={handleUploadClick}
        />
      </div>
    </div>
  );
};
