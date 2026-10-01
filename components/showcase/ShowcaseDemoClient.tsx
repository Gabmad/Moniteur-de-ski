"use client";

import { useState } from "react";
import ProductShowcase from "@/components/showcase/ProductShowcase";
import "@/components/showcase/product-showcase.css";

const DEFAULT_PRODUCT = "/images/showcase/rebel-sls.png";

/**
 * Interactive demo for the Duotone-style product showcase template.
 * Swap `productSrc`, `line1`, and `line2` via the side panel (or component props).
 */
export default function ShowcaseDemoClient() {
  const [line1, setLine1] = useState("REBEL");
  const [line2, setLine2] = useState("SLS");
  const [productSrc, setProductSrc] = useState(DEFAULT_PRODUCT);
  const [productScale, setProductScale] = useState(72);

  return (
    <div className="showcase-demo">
      <div className="showcase-demo__stage">
        <ProductShowcase
          productSrc={productSrc || DEFAULT_PRODUCT}
          productAlt={`${line1} ${line2}`.trim() || "Product"}
          line1={line1}
          line2={line2}
          productScale={productScale}
        />
      </div>

      <aside className="showcase-demo__panel">
        <h1>Product showcase</h1>
        <p>
          Template matching the Duotone Rebel SLS reference. Drop-shadow follows
          the product PNG alpha; watermark and image are editable.
        </p>

        <div className="showcase-demo__field">
          <label htmlFor="line1">Background line 1</label>
          <input
            id="line1"
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="showcase-demo__field">
          <label htmlFor="line2">Background line 2</label>
          <input
            id="line2"
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="showcase-demo__field">
          <label htmlFor="productSrc">Product image path</label>
          <input
            id="productSrc"
            value={productSrc}
            onChange={(e) => setProductSrc(e.target.value)}
            spellCheck={false}
            placeholder="/images/showcase/your-product.png"
          />
        </div>

        <div className="showcase-demo__field">
          <label htmlFor="productScale">Product scale (%)</label>
          <input
            id="productScale"
            type="number"
            min={40}
            max={95}
            value={productScale}
            onChange={(e) => setProductScale(Number(e.target.value) || 72)}
          />
        </div>

        <p className="showcase-demo__hint">
          Replace the file at <code>public/images/showcase/rebel-sls.png</code>{" "}
          (transparent PNG) or point the path above at another asset. Pass{" "}
          <code>productSrc</code>, <code>line1</code>, and <code>line2</code> as
          props on <code>ProductShowcase</code>.
        </p>
      </aside>
    </div>
  );
}
