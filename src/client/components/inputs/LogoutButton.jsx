import { useLogoutMutation } from "../../redux/api/auth";

function LogoutButton() {
  const [logout] = useLogoutMutation();


  return <a onClick={logout}>Logout</a>;
}

export default LogoutButton;
