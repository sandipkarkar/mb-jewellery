import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Eye, EyeOff, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const ADMIN_ID = "admin@mbbrothergems.com";
const ADMIN_PASSWORD = "MBbrother_123";
const ADMIN_AUTH_STORAGE_KEY = "isAdminAuthenticated";

export function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
  });

  const canSubmit = useMemo(() => {
    return formData.adminId.trim().length > 0 && formData.password.length > 0;
  }, [formData.adminId, formData.password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const ok =
      formData.adminId.trim() === ADMIN_ID && formData.password === ADMIN_PASSWORD;

    if (!ok) {
      setError("Invalid Admin ID or Password.");
      return;
    }

    localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, "true");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-3 sm:px-4 bg-gradient-to-br from-primary/8 to-primary/15 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-lg border p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Login</h1>
            <p className="text-muted-foreground">Sign in to admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="adminId">Admin ID</Label>
              <Input
                id="adminId"
                value={formData.adminId}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, adminId: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPassword">Password</Label>
              <div className="relative">
                <Input
                  id="adminPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={!canSubmit}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-primary font-semibold hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

