import { useUser } from "../Context/UserContext";
import RoleRoutes from "../Utils/RoleRoutes";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export default function Settings() {
  const { loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-around border border-yellow-300">
      <div>Settings page</div>
      <div className="border border-green-400">
        <div className="w-96 border border-red-500">
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
      <div></div>
    </div>
  );
}
