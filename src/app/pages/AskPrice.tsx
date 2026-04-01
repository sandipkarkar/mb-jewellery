import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { whatsappUrl } from "../../utils/whatsapp";
import { SITE_NAME } from "../../config/site";
import { PAGE_CONTAINER, PAGE_VERTICAL_PADDING } from "../../config/layout";

type DiamondLine = {
  type: string;
  carat: string;
};

const DIAMOND_TYPE_OPTIONS = [
  "0.001 crt to 0.009 crt - EF - VVS - VS",
  "0.01 crt to 0.049 crt - EF - VVS - VS",
  "0.05 crt to 0.09 crt - EF - VVS - VS",
  "0.05 to 0.10 - PINK TREATED - NA",
  "0.10 crt to 0.249 crt - EF - VVS - VS",
  "0.25 crt to 0.49 crt - EF - VVS - VS",
  "0.50 crt to 0.99 crt - EF - VVS - VS",
  "1 crt to 1.249 crt - EF - VVS - VS",
  "1-COLOR STONE - NA",
  "1.25 crt to 1.49 crt - EF - VVS - VS",
  "1.5 crt to 1.99 crt - EF - VVS - VS",
  "2 crt TO 3 crt - EF - VVS - VS",
  "FANCY CUT DIAMONDS - E - F - VVS - VS",
];

const GOLD_TYPE_OPTIONS = ["10K", "14K", "18K", "925 Silver"];

export function AskPrice() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [goldType, setGoldType] = useState("14K");
  const [goldGram, setGoldGram] = useState("");

  const [diamondType, setDiamondType] = useState("");
  const [diamondCarat, setDiamondCarat] = useState("");
  const [diamonds, setDiamonds] = useState<DiamondLine[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const canAddDiamond = diamondType.trim().length > 0 && diamondCarat.trim().length > 0;

  const whatsappMessage = useMemo(() => {
    const lines: string[] = [];
    lines.push(`Hi ${SITE_NAME}, I want to ask price.`);
    lines.push("");
    lines.push("PERSONAL DETAILS");
    lines.push(`Name: ${name || "-"}`);
    lines.push(`Email: ${email || "-"}`);
    lines.push(`Mobile: ${mobile || "-"}`);
    lines.push("");
    lines.push("GOLD");
    lines.push(`Type: ${goldType || "-"}`);
    lines.push(`Gram: ${goldGram || "-"}`);
    lines.push("");
    lines.push("DIAMOND");
    if (diamonds.length === 0) {
      lines.push("- None added");
    } else {
      diamonds.forEach((d, idx) => {
        lines.push(`${idx + 1}) Type: ${d.type} | Carat: ${d.carat}`);
      });
    }
    lines.push("");
    lines.push("IMAGE");
    if (imageFile) {
      lines.push(
        `Selected file: ${imageFile.name} (please tell me where to send it in WhatsApp)`,
      );
    } else {
      lines.push("No image selected");
    }
    return lines.join("\n");
  }, [diamonds, email, goldGram, goldType, imageFile, mobile, name]);

  const handleAddDiamond = () => {
    if (!canAddDiamond) return;
    setDiamonds((prev) => [
      ...prev,
      { type: diamondType.trim(), carat: diamondCarat.trim() },
    ]);
    setDiamondType("");
    setDiamondCarat("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const href = whatsappUrl(whatsappMessage);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-muted/20">
      <div className={`${PAGE_CONTAINER} ${PAGE_VERTICAL_PADDING}`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Ask Price
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Details */}
            <section className="bg-card border rounded-xl overflow-hidden">
              <div className="px-4 sm:px-6 py-3 border-b">
                <h2 className="text-xs font-semibold tracking-wide text-muted-foreground">
                  PERSONAL DETAILS
                </h2>
              </div>
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Mobile <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    inputMode="tel"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Gold */}
            <section className="bg-card border rounded-xl overflow-hidden">
              <div className="px-4 sm:px-6 py-3 border-b">
                <h2 className="text-xs font-semibold tracking-wide text-muted-foreground">
                  GOLD
                </h2>
              </div>
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Type <span className="text-destructive">*</span>
                  </label>
                  <select
                    className="mt-2 w-full h-10 rounded-md border bg-background px-3 text-sm"
                    value={goldType}
                    onChange={(e) => setGoldType(e.target.value)}
                    required
                  >
                    {GOLD_TYPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Gram <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={goldGram}
                    onChange={(e) => setGoldGram(e.target.value)}
                    inputMode="decimal"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Diamond */}
            <section className="bg-card border rounded-xl overflow-hidden">
              <div className="px-4 sm:px-6 py-3 border-b">
                <h2 className="text-xs font-semibold tracking-wide text-muted-foreground">
                  DIAMOND
                </h2>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Type <span className="text-destructive">*</span>
                    </label>
                    <select
                      className="mt-2 w-full h-10 rounded-md border bg-background px-3 text-sm"
                      value={diamondType}
                      onChange={(e) => setDiamondType(e.target.value)}
                    >
                      <option value="">Select...</option>
                      {DIAMOND_TYPE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Carat <span className="text-destructive">*</span>
                    </label>
                    <Input
                      value={diamondCarat}
                      onChange={(e) => setDiamondCarat(e.target.value)}
                      inputMode="decimal"
                      placeholder="e.g. 0.50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAddDiamond}
                    disabled={!canAddDiamond}
                  >
                    Add
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Add one or more diamond lines.
                  </p>
                </div>

                {diamonds.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="px-4 py-2 bg-muted/40 text-xs font-semibold text-muted-foreground">
                      Added diamonds
                    </div>
                    <div className="divide-y">
                      {diamonds.map((d, idx) => (
                        <div
                          key={`${d.type}-${d.carat}-${idx}`}
                          className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {idx + 1}. {d.type}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Carat: {d.carat}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setDiamonds((prev) =>
                                prev.filter((_, i) => i !== idx),
                              )
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Upload */}
            <section className="bg-card border rounded-xl overflow-hidden">
              <div className="px-4 sm:px-6 py-3 border-b">
                <h2 className="text-xs font-semibold tracking-wide text-muted-foreground">
                  Upload Image
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  WhatsApp message can’t attach the image automatically. After
                  WhatsApp opens, send the image in chat.
                </p>
              </div>
            </section>

            <div className="flex justify-center pt-3">
              <Button type="submit" size="lg">
                Ask Price
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

