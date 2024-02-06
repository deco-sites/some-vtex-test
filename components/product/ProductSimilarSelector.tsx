import { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "$store/sdk/url.ts";

interface Props {
  product: Product;
  /** @title Client navigation */
  /** @description Partially update page instead of reloading it */
  clientNav?: boolean;
}

function SimilarOption(props: { selected: boolean } & Props) {
  const img = props.product?.image?.[0];
  const border = props.selected ? "border-base-300" : "border-transparent";
  const classes = `${border} border rounded overflow-hidden block`;

  if (!img?.url) return null;

  const image = <Image src={img.url} width={64} height={64} />;
  return (
    <li>
      {props.clientNav
        ? (
          <button
            f-partial={relative(props.product.url)}
            f-client-nav
            class={classes}
          >
            {image}
          </button>
        )
        : (
          <a href={props.product.url} class={classes}>
            {image}
          </a>
        )}
    </li>
  );
}

function SimilarSelector(props: Props) {
  const similars = [props.product].concat(props.product.isSimilarTo ?? []);
  similars.sort((a, b) => a.productID.localeCompare(b.productID));

  return (
    <ul class="flex gap-2 mb-2 sm:mb-4">
      {similars.map((similar) => (
        <SimilarOption
          product={similar}
          clientNav={props.clientNav}
          selected={props.product.productID === similar.productID}
        />
      ))}
    </ul>
  );
}

export default SimilarSelector;
