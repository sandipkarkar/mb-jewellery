import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useProducts } from "../../context/ProductsContext";
import { useCategories } from "../../context/CategoriesContext";
import type { Product } from "../../../data/products";

const METAL_COLOR_OPTIONS = ["White Gold", "Yellow Gold", "Rose Gold"];
const PURITY_OPTIONS = ["10K", "14K", "18K", "925 Silver"];

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB per image
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MIN_PRODUCT_IMAGE_WIDTH = 800;
const MIN_PRODUCT_IMAGE_HEIGHT = 800;
const MAX_PRODUCT_IMAGES = 12;

function toNumber(value: string): number {
  const cleaned = value.replace(/[^\d.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

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

export function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, addProduct, updateProduct } = useProducts();
  const { categories } = useCategories();
  const categoryOptions = useMemo(() => {
    const names = categories.map((c) => c.name);
    return names.length > 0 ? names : ["Other"];
  }, [categories]);

  const editing = Boolean(id);
  const existing = editing && id ? getProductById(id) : undefined;

  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "Other",
    price: "",
    rating: "4.8",
    reviews: "0",
    description: "",
    metalColors: [...METAL_COLOR_OPTIONS],
    purities: [...PURITY_OPTIONS],
    specifications: {
      diamondType: "Lab Grown Diamond & Real Diamond are available",
      metalType: "Gold",
      weight: "",
      netWeight: "",
      certificate: "",
      manufacturing: "",
      caratWeight: "",
      clarity: "",
      color: "",
      cut: "",
      dimensions: "",
      settingType: "",
      numberOfDiamonds: "",
      metalWeight: "",
      careInstructions: "",
    },
  });

  useEffect(() => {
    if (!editing) {
      setForm((p) => ({
        ...p,
        category: categoryOptions.includes(p.category)
          ? p.category
          : categoryOptions[0] ?? "Other",
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryOptions.join("|")]);

  useEffect(() => {
    if (!editing) return;
    if (!id) return;
    if (!existing) return;

    setImages(existing.images ?? []);
    setForm({
      id: existing.id,
      name: existing.name,
      category: existing.category,
      price: String(existing.price),
      rating: String(existing.rating),
      reviews: String(existing.reviews),
      description: existing.description,
      metalColors: existing.metalColors.length ? existing.metalColors : [...METAL_COLOR_OPTIONS],
      purities: existing.purities.length ? existing.purities : [...PURITY_OPTIONS],
      specifications: {
        diamondType: existing.specifications.diamondType ?? "",
        metalType: existing.specifications.metalType ?? "",
        weight: existing.specifications.weight ?? "",
        netWeight: existing.specifications.netWeight ?? "",
        certificate: existing.specifications.certificate ?? "",
        manufacturing: existing.specifications.manufacturing ?? "",
        caratWeight: existing.specifications.caratWeight ?? "",
        clarity: existing.specifications.clarity ?? "",
        color: existing.specifications.color ?? "",
        cut: existing.specifications.cut ?? "",
        dimensions: existing.specifications.dimensions ?? "",
        settingType: existing.specifications.settingType ?? "",
        numberOfDiamonds: existing.specifications.numberOfDiamonds ?? "",
        metalWeight: existing.specifications.metalWeight ?? "",
        careInstructions: existing.specifications.careInstructions ?? "",
      },
    });
  }, [editing, existing, id]);

  const canSave = useMemo(() => {
    return (
      form.id.trim().length > 0 &&
      form.name.trim().length > 0 &&
      form.category.trim().length > 0 &&
      toNumber(form.price) > 0 &&
      images.length > 0 &&
      form.description.trim().length > 0 &&
      form.specifications.diamondType.trim().length > 0 &&
      form.specifications.metalType.trim().length > 0 &&
      form.specifications.weight.trim().length > 0 &&
      form.specifications.certificate.trim().length > 0 &&
      form.specifications.manufacturing.trim().length > 0
    );
  }, [form, images.length]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!canSave) {
      setError("Please fill all required fields.");
      return;
    }

    const product: Product = {
      id: form.id.trim(),
      name: form.name.trim(),
      category: form.category,
      price: toNumber(form.price),
      rating: Math.max(0, Math.min(5, Number(form.rating) || 0)),
      reviews: Math.max(0, Math.floor(Number(form.reviews) || 0)),
      images,
      metalColors: form.metalColors.length ? form.metalColors : [...METAL_COLOR_OPTIONS],
      purities: form.purities.length ? form.purities : [...PURITY_OPTIONS],
      description: form.description.trim(),
      specifications: {
        diamondType: form.specifications.diamondType.trim(),
        metalType: form.specifications.metalType.trim(),
        weight: form.specifications.weight.trim(),
        netWeight: form.specifications.netWeight.trim() || undefined,
        certificate: form.specifications.certificate.trim(),
        manufacturing: form.specifications.manufacturing.trim(),
        caratWeight: form.specifications.caratWeight.trim() || undefined,
        clarity: form.specifications.clarity.trim() || undefined,
        color: form.specifications.color.trim() || undefined,
        cut: form.specifications.cut.trim() || undefined,
        dimensions: form.specifications.dimensions.trim() || undefined,
        settingType: form.specifications.settingType.trim() || undefined,
        numberOfDiamonds: form.specifications.numberOfDiamonds.trim() || undefined,
        metalWeight: form.specifications.metalWeight.trim() || undefined,
        careInstructions: form.specifications.careInstructions.trim() || undefined,
      },
    };

    if (editing) updateProduct(product);
    else addProduct(product);

    navigate("/admin/products");
  };

  if (editing && id && !existing) {
    return (
      <div className="bg-card border rounded-xl p-6">
        <p className="font-semibold">Product not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/admin/products">Back to products</Link>
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
              <Link to="/admin/products" className="inline-flex items-center hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Products
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-2">
              {editing ? "Update Product" : "Add Product"}
            </h1>
            <p className="text-muted-foreground text-sm">
              Fill details as per Product Details page.
            </p>
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

        {/* Basic info */}
        <section className="bg-card border rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="font-semibold">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pid">Product ID *</Label>
              <Input
                id="pid"
                value={form.id}
                onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))}
                disabled={editing}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pname">Product Name *</Label>
              <Input
                id="pname"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pcat">Category *</Label>
              <select
                id="pcat"
                className="w-full h-10 rounded-md border bg-background px-3 text-sm"
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pprice">Price (₹) *</Label>
              <Input
                id="pprice"
                value={form.price}
                onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                inputMode="numeric"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prating">Rating</Label>
              <Input
                id="prating"
                value={form.rating}
                onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
                inputMode="decimal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previews">Reviews</Label>
              <Input
                id="previews"
                value={form.reviews}
                onChange={(e) => setForm((p) => ({ ...p, reviews: e.target.value }))}
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pdesc">Description *</Label>
            <textarea
              id="pdesc"
              className="w-full min-h-24 rounded-md border bg-background px-3 py-2 text-sm"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              required
            />
          </div>
        </section>

        {/* Images */}
        <section className="bg-card border rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="font-semibold">Images *</h2>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Upload product images. First image is used in product cards.</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>Allowed: JPG / PNG / WebP</li>
              <li>Max size: 5MB per image</li>
              <li>
                Minimum dimensions: {MIN_PRODUCT_IMAGE_WIDTH}×{MIN_PRODUCT_IMAGE_HEIGHT}px
              </li>
              <li>Recommended: square 1200×1200px (or larger) for best quality</li>
              <li>Max {MAX_PRODUCT_IMAGES} images per product</li>
            </ul>
          </div>

          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={async (e) => {
              setError("");
              const files = Array.from(e.target.files ?? []);
              if (files.length === 0) return;

              const badType = files.find((f) => !ALLOWED_IMAGE_TYPES.has(f.type));
              if (badType) {
                setError(
                  `"${badType.name}" is not supported. Please upload JPG, PNG, or WebP images.`,
                );
                e.target.value = "";
                return;
              }

              const tooLarge = files.find((f) => f.size > MAX_IMAGE_BYTES);
              if (tooLarge) {
                setError(`"${tooLarge.name}" is larger than 5MB. Please choose a smaller image.`);
                e.target.value = "";
                return;
              }

              try {
                for (const f of files) {
                  const { width, height } = await getImageDimensions(f);
                  if (width < MIN_PRODUCT_IMAGE_WIDTH || height < MIN_PRODUCT_IMAGE_HEIGHT) {
                    setError(
                      `"${f.name}" is too small (${width}×${height}px). Minimum is ${MIN_PRODUCT_IMAGE_WIDTH}×${MIN_PRODUCT_IMAGE_HEIGHT}px.`,
                    );
                    e.target.value = "";
                    return;
                  }
                }
                const dataUrls = await Promise.all(files.map(readFileAsDataUrl));
                setImages((prev) =>
                  [...prev, ...dataUrls].slice(0, MAX_PRODUCT_IMAGES),
                );
              } catch {
                setError("Could not read one of the images. Please try again.");
              } finally {
                e.target.value = "";
              }
            }}
          />

          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((src, idx) => (
                <div
                  key={`${idx}-${src.slice(0, 24)}`}
                  className="relative border rounded-lg overflow-hidden bg-muted"
                >
                  <img
                    src={src}
                    alt={`Product image ${idx + 1}`}
                    className="h-28 w-full object-cover"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 rounded-md bg-background/90 border px-2 py-1 text-xs hover:bg-background"
                    onClick={() =>
                      setImages((prev) => prev.filter((_, i) => i !== idx))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Options */}
        <section className="bg-card border rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="font-semibold">Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Metal Colors</p>
              <div className="flex flex-wrap gap-2">
                {METAL_COLOR_OPTIONS.map((opt) => {
                  const checked = form.metalColors.includes(opt);
                  return (
                    <label
                      key={opt}
                      className={`px-3 py-2 rounded-lg border text-sm cursor-pointer ${
                        checked ? "border-primary bg-primary/10 text-primary" : "hover:bg-accent"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="mr-2 align-middle"
                        checked={checked}
                        onChange={(e) => {
                          setForm((p) => {
                            const next = e.target.checked
                              ? Array.from(new Set([...p.metalColors, opt]))
                              : p.metalColors.filter((v) => v !== opt);
                            return { ...p, metalColors: next };
                          });
                        }}
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Purity</p>
              <div className="flex flex-wrap gap-2">
                {PURITY_OPTIONS.map((opt) => {
                  const checked = form.purities.includes(opt);
                  return (
                    <label
                      key={opt}
                      className={`px-3 py-2 rounded-lg border text-sm cursor-pointer ${
                        checked ? "border-primary bg-primary/10 text-primary" : "hover:bg-accent"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="mr-2 align-middle"
                        checked={checked}
                        onChange={(e) => {
                          setForm((p) => {
                            const next = e.target.checked
                              ? Array.from(new Set([...p.purities, opt]))
                              : p.purities.filter((v) => v !== opt);
                            return { ...p, purities: next };
                          });
                        }}
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="bg-card border rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="font-semibold">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Diamond Type *</Label>
              <Input
                value={form.specifications.diamondType}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, diamondType: e.target.value },
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Metal Type *</Label>
              <Input
                value={form.specifications.metalType}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, metalType: e.target.value },
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Gross Weight *</Label>
              <Input
                value={form.specifications.weight}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, weight: e.target.value },
                  }))
                }
                placeholder="e.g. 3.5 grams"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Net Weight</Label>
              <Input
                value={form.specifications.netWeight}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, netWeight: e.target.value },
                  }))
                }
                placeholder="e.g. 3.1 grams"
              />
            </div>
            <div className="space-y-2">
              <Label>Diamond Weight</Label>
              <Input
                value={form.specifications.caratWeight}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, caratWeight: e.target.value },
                  }))
                }
                placeholder="e.g. 1.0 carat"
              />
            </div>
            <div className="space-y-2">
              <Label>Certificate *</Label>
              <Input
                value={form.specifications.certificate}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, certificate: e.target.value },
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Manufacturing *</Label>
              <Input
                value={form.specifications.manufacturing}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, manufacturing: e.target.value },
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Clarity</Label>
              <Input
                value={form.specifications.clarity}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, clarity: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <Input
                value={form.specifications.color}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, color: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Cut</Label>
              <Input
                value={form.specifications.cut}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, cut: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Number of Diamonds</Label>
              <Input
                value={form.specifications.numberOfDiamonds}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, numberOfDiamonds: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Setting Type</Label>
              <Input
                value={form.specifications.settingType}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, settingType: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Dimensions</Label>
              <Input
                value={form.specifications.dimensions}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, dimensions: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Metal Weight</Label>
              <Input
                value={form.specifications.metalWeight}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    specifications: { ...p.specifications, metalWeight: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Care Instructions</Label>
            <textarea
              className="w-full min-h-24 rounded-md border bg-background px-3 py-2 text-sm"
              value={form.specifications.careInstructions}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  specifications: { ...p.specifications, careInstructions: e.target.value },
                }))
              }
            />
          </div>
        </section>
      </form>
    </motion.div>
  );
}

