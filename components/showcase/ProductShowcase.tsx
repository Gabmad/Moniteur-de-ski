import Image from "next/image";

export type ProductShowcaseProps = {
  /** Path to a transparent product PNG (preferred) under /public or remote URL. */
  productSrc: string;
  productAlt?: string;
  /** Top watermark line, e.g. "REBEL" */
  line1?: string;
  /** Bottom watermark line, e.g. "SLS" */
  line2?: string;
  showLogo?: boolean;
  showBadge?: boolean;
  /** Optional product width as % of the canvas (default ~72). */
  productScale?: number;
  className?: string;
};

/**
 * Duotone Rebel SLS–style product showcase.
 * Layer order: canvas → watermark → product (+ silhouette drop-shadow) → corner marks.
 */
export default function ProductShowcase({
  productSrc,
  productAlt = "Product",
  line1 = "REBEL",
  line2 = "SLS",
  showLogo = true,
  showBadge = true,
  productScale = 76,
  className = "",
}: ProductShowcaseProps) {
  return (
    <figure
      className={`product-showcase ${className}`.trim()}
      data-showcase="duotone-rebel"
    >
      {/* 1. Canvas + 2. Watermark text */}
      <div className="product-showcase__watermark" aria-hidden="true">
        <span className="product-showcase__line">{line1}</span>
        <span className="product-showcase__line">{line2}</span>
      </div>

      {/* 3. Shadow (via filter) + 4. Product — drop-shadow tracks PNG alpha */}
      <div
        className="product-showcase__product"
        style={{ width: `${productScale}%` }}
      >
        <Image
          src={productSrc}
          alt={productAlt}
          width={1200}
          height={1200}
          priority
          unoptimized
          className="product-showcase__img"
          sizes="(max-width: 768px) 90vw, 720px"
        />
      </div>

      {/* 5. Corner marks */}
      {showLogo ? (
        <div className="product-showcase__logo" aria-label="Brand mark">
          <DuotoneMark />
        </div>
      ) : null}
      {showBadge ? (
        <div className="product-showcase__badge" aria-label="SLS">
          <span>S</span>
          <i aria-hidden="true" />
          <span>L</span>
          <i aria-hidden="true" />
          <span>S</span>
        </div>
      ) : null}
    </figure>
  );
}

/** Approximate Duotone twin-chevron mark (stylized D). */
function DuotoneMark() {
  return (
    <svg
      viewBox="0 0 72 52"
      width="100%"
      height="100%"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Rear chevron — lighter density like the brand mark */}
      <path d="M4 6h26l22 20L30 46H4l20-20L4 6z" opacity="0.28" />
      {/* Front chevron */}
      <path d="M22 6h26l22 20L48 46H22l20-20L22 6z" />
    </svg>
  );
}
