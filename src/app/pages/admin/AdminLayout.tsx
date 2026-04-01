import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { PAGE_CONTAINER, PAGE_VERTICAL_PADDING } from "../../../config/layout";

const ADMIN_AUTH_STORAGE_KEY = "isAdminAuthenticated";

function NavLink({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  const location = useLocation();
  const active = location.pathname === to || location.pathname.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active ? "bg-primary/10 text-primary" : "hover:bg-accent"
      }`}
    >
      {label}
    </Link>
  );
}

export function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) !== "true") {
      navigate("/admin-login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-muted/20">
      <div className={`${PAGE_CONTAINER} ${PAGE_VERTICAL_PADDING}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <aside className="bg-card border rounded-xl p-4 h-fit lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Admin</p>
                <p className="font-semibold">Dashboard</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
                  navigate("/admin-login");
                }}
              >
                Sign Out
              </Button>
            </div>

            <nav className="space-y-1">
              <NavLink to="/admin" label="Overview" />
              <NavLink to="/admin/products" label="Products" />
              <NavLink to="/admin/categories" label="Categories" />
            </nav>
          </aside>

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

