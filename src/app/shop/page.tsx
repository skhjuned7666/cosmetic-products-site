import { Suspense } from "react";
import ShopClient from "./ShopClient";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-28 pb-16 min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ShopClient
        initialSearch=""
        initialCategory=""
        initialSort="featured"
      />
    </Suspense>
  );
}
