import { useUser } from "../Context/UserContext";
import RoleRoutes from "../Utils/RoleRoutes";

export default function Settings() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Settings page! Congrats, you made it {user?.name}!
      <button
        onClick={() => {
          RoleRoutes.removeAllRoles();
        }}
      >
        Delete all roles
      </button>
    </div>
  );
}
