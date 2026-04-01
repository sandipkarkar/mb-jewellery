import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useCategories } from "../../context/CategoriesContext";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MIN_CATEGORY_IMAGE_WIDTH = 600;
const MIN_CATEGORY_IMAGE_HEIGHT = 600;
const RECOMMENDED_CATEGORY_SIZE = "800×800px (square)";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(String(reader.result || ""));
    reader.readAsDataURL(file);
  });
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;
      URL.revokeObjectURL(url);
      resolve({ width, height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Invalid image"));
    };
    img.src = url;
  });
}

export function AdminCategoryForm() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { addCategory, updateCategory, getCategoryByName } = useCategories();

  const editing = Boolean(name);
  const existing = editing && name ? getCategoryByName(name) : undefined;

  const [error, setError] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (!editing) return;
    if (!existing) return;
    setCategoryName(existing.name);
    setImage(existing.image);
  }, [editing, existing]);

  const canSave = useMemo(() => {
    return categoryName.trim().length > 0 && image.trim().length > 0;
  }, [categoryName, image]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!canSave) {
      setError("Please fill all required fields.");
      return;
    }

    const payload = { name: categoryName.trim(), image };

    if (editing) {
      updateCategory(payload);
    } else {
      addCategory(payload);
    }
    navigate("/admin/categories");
  };

  if (editing && name && !existing) {
    return (
      <div className="bg-card border rounded-xl p-6">
        <p className="font-semibold">Category not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/admin/categories">Back to categories</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                to="/admin/categories"
                className="inline-flex items-center hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Categories
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-2">
              {editing ? "Update Category" : "Add Category"}
            </h1>
            <div className="text-muted-foreground text-sm space-y-1">
              <p>Upload a category image.</p>
              <ul className="list-disc pl-5 text-xs space-y-0.5">
                <li>Allowed: JPG / PNG / WebP</li>
                <li>Max size: 5MB</li>
                <li>
                  Minimum dimensions: {MIN_CATEGORY_IMAGE_WIDTH}×{MIN_CATEGORY_IMAGE_HEIGHT}px
                </li>
                <li>Recommended: {RECOMMENDED_CATEGORY_SIZE}</li>
              </ul>
            </div>
          </div>
          <Button type="submit" disabled={!canSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <section className="bg-card border rounded-xl p-4 sm:p-6 space-y-4">
          <div className="space-y-2">
            <Label>Category Name *</Label>
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              disabled={editing}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Category Image *</Label>
            <Input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={async (e) => {
                setError("");
                const file = e.target.files?.[0];
                if (!file) return;
                if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
                  setError(
                    `"${file.name}" is not supported. Please upload JPG, PNG, or WebP images.`,
                  );
                  e.target.value = "";
                  return;
                }
                if (file.size > MAX_IMAGE_BYTES) {
                  setError(`"${file.name}" is larger than 5MB. Please choose a smaller image.`);
                  e.target.value = "";
                  return;
                }
                try {
                  const { width, height } = await getImageDimensions(file);
                  if (width < MIN_CATEGORY_IMAGE_WIDTH || height < MIN_CATEGORY_IMAGE_HEIGHT) {
                    setError(
                      `"${file.name}" is too small (${width}×${height}px). Minimum is ${MIN_CATEGORY_IMAGE_WIDTH}×${MIN_CATEGORY_IMAGE_HEIGHT}px.`,
                    );
                    e.target.value = "";
                    return;
                  }
                  const dataUrl = await readFileAsDataUrl(file);
                  setImage(dataUrl);
                } catch {
                  setError("Could not read the image. Please try again.");
                } finally {
                  e.target.value = "";
                }
              }}
            />
          </div>

          {image && (
            <div className="border rounded-xl overflow-hidden bg-muted">
              <img
                src={image}
                alt="Category preview"
                className="h-48 w-full object-cover"
                loading="lazy"
              />
            </div>
          )}
        </section>
      </form>
    </motion.div>
  );
}

