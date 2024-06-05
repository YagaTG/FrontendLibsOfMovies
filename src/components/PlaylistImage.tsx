import { ip } from "../config.server";

export const PlaylistImage = ({ path, playlistName, className }) => {
  console.log(path);
  return (
    <img
      className={className}
      src={`http://${ip}:3500/api/getPlaylistImage?path=${path}`}
      alt={`Обложка подборки ${playlistName}`}
    />
  );
};
