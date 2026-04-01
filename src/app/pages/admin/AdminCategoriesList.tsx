import { Link } from "react-router";
import { useRef } from "react";
import { Edit3, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useCategories } from "../../context/CategoriesContext";
import { useProducts } from "../../context/ProductsContext";

export function AdminCategoriesList() {
  const { categories, deleteCategory, resetToSeed, setCategories } =
    useCategories();
  const { products, setProducts } = useProducts();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground text-sm">
            Add, update, and manage categories (with images).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const text = await file.text();
                const parsed = JSON.parse(text) as unknown;
                if (!Array.isArray(parsed)) {
                  alert("Invalid file. Expected an array of categories.");
                  return;
                }
                setCategories(parsed as any);
                alert("Categories imported.");
              } catch {
                alert("Could not import categories. Invalid JSON file.");
              } finally {
                e.target.value = "";
              }
            }}
          />

          <Button
            variant="outline"
            onClick={() => {
              const blob = new Blob([JSON.stringify(categories, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "categories.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export JSON
          </Button>

          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            Import JSON
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              const ok = window.confirm("Reset categories to default seed data?");
              if (ok) resetToSeed();
            }}
          >
            Reset
          </Button>

          <Button asChild>
            <Link to="/admin/categories/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[780px] w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">Image</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Products</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories.map((c) => {
                const count = products.filter((p) => p.category === c.name).length;
                return (
                  <tr key={c.name} className="hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="h-10 w-10 rounded-md object-cover border bg-muted"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3">{count}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/admin/categories/${encodeURIComponent(c.name)}/edit`}>
                            <Edit3 className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const ok = window.confirm(
                              `Delete category "${c.name}"? Products in this category will be moved to "Other".`,
                            );
                            if (!ok) return;
                            setProducts(
                              products.map((p) =>
                                p.category === c.name ? { ...p, category: "Other" } : p,
                              ),
                            );
                            deleteCategory(c.name);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {categories.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-10 text-center text-muted-foreground"
                    colSpan={4}
                  >
                    No categories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

