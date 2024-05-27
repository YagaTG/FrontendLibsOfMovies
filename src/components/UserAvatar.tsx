import { ip } from "../config.server";

export const UserAvatar = ({
  username,
  className,
}: {
  username: string;
  className: string;
}) => {
  return (
    <img
      src={`http://${ip}:3500/api/getUserAvatar?username=${username}`}
      alt=""
      className={className}
    />
  );
};
