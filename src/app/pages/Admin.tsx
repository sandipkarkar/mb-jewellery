import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { PAGE_CONTAINER, PAGE_VERTICAL_PADDING } from "../../config/layout";

const ADMIN_AUTH_STORAGE_KEY = "isAdminAuthenticated";

export function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) !== "true") {
      navigate("/admin-login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className={`${PAGE_CONTAINER} ${PAGE_VERTICAL_PADDING}`}>
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Admin Panel</h1>
                <p className="text-muted-foreground mt-1">
                  Logged in (static admin).
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
                  navigate("/admin-login");
                }}
              >
                Sign Out
              </Button>
            </div>

            <div className="mt-6 text-sm text-muted-foreground">
              This is a placeholder admin page. Add your admin features here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

