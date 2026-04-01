import { Link } from "react-router";
import { Package, PlusCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useProducts } from "../../context/ProductsContext";

export function AdminDashboard() {
  const { products } = useProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your store content.</p>
        </div>
        <Button asChild>
          <Link to="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2 bg-primary/10 text-primary">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold tabular-nums">{products.length}</p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" asChild className="w-full">
              <Link to="/admin/products">Manage Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

