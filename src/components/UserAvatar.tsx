export const UserAvatar = ({
  username,
  className,
}: {
  username: string;
  className: string;
}) => {
  return (
    <img
      src={`http://192.168.0.100:3500/api/getUserAvatar?username=${username}`}
      alt=""
      className={className}
    />
  );
};
