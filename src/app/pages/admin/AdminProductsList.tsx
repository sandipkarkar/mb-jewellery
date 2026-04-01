import { Link } from "react-router";
import { useRef } from "react";
import { Edit3, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useProducts } from "../../context/ProductsContext";

export function AdminProductsList() {
  const { products, deleteProduct, setProducts, resetToSeed } = useProducts();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground text-sm">
            Add, update, and manage all products.
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
                  alert("Invalid file. Expected an array of products.");
                  return;
                }
                setProducts(parsed as any);
                alert("Products imported.");
              } catch {
                alert("Could not import products. Invalid JSON file.");
              } finally {
                e.target.value = "";
              }
            }}
          />

          <Button
            variant="outline"
            onClick={() => {
              const blob = new Blob([JSON.stringify(products, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "products.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export JSON
          </Button>

          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Import JSON
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              const ok = window.confirm("Reset products to default seed data?");
              if (ok) resetToSeed();
            }}
          >
            Reset
          </Button>

          <Button asChild>
            <Link to="/admin/products/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[780px] w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">{p.id}</td>
                  <td className="px-4 py-3 max-w-[26rem]">
                    <div className="line-clamp-1">{p.name}</div>
                  </td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3 tabular-nums">
                    ₹{p.price.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/admin/products/${encodeURIComponent(p.id)}/edit`}>
                          <Edit3 className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const ok = window.confirm(
                            `Delete product ${p.id} - ${p.name}?`,
                          );
                          if (ok) deleteProduct(p.id);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-muted-foreground" colSpan={5}>
                    No products yet.
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

