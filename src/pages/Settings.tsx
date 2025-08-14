import { useUser } from "../Context/UserContext";

export default function Settings() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Settings page! Congrats, you made it {user?.name}!</div>;
}
