export const SettingsScreen = ({ user }) => {
  return (
    <div className="profile">
      <div className="profile__login">Имя пользователя: {user?.username}</div>
      <div className="profile__login">Электронная почта: {user?.mail}</div>
    </div>
  );
};
