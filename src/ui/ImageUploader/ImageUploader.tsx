import Button from "../Button/Button";

export const ImageUploader = ({
  handleFileChange,
  handleUploadClick,
  isForm = false,
}) => {
  const onChange = (e) => {
    console.log("wtf");
    handleFileChange(e);
  };

  return (
    <div className="avatar__form">
      <input
        className="avatar__input"
        id="image-file"
        type="file"
        onChange={onChange}
      />
      {!isForm && <Button
        className="avatar__btn"
        type="sumbit"
        text="Загрузить"
        onClick={handleUploadClick}
      />}
    </div>
  );
};
