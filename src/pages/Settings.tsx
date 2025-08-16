import { useUser } from "../Context/UserContext";
import RoleRoutes from "../Utils/RoleRoutes";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export default function Settings() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center">
      <div>Settings page! Congrats, you made it {user?.name}!</div>
      <div className="w-96 flex items-center">
        <Accordion>
          <AccordionSummary>Roles</AccordionSummary>
          <AccordionDetails>
            <div>
              <button
                onClick={() => {
                  RoleRoutes.removeAllRoles();
                }}
              >
                Delete All Roles
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
