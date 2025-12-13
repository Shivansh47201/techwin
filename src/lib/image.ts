export function safeImageSrc(src?: string | null) {
  if (!src) return src ?? "";
  try {
    // normalize and encode
    let s = String(src);


    const knownProductRoots = [
      "/single-frequency",
      "/seed-lasers",
      "/high-power",
      "/high-power-fiber-lasers",
      "/broadband-ase-sources",
      "/ase-sources",
      "/fiber-amplifiers",
      "/wavelength-conversion",
      "/sled",
      "/testing",
      "/point-light-sources",
    ];

    if (!s.startsWith("/products") && knownProductRoots.some((r) => s.startsWith(r))) {
      s = "/products" + s;
    }

    return encodeURI(s);
  } catch (e) {
    return src ?? "";
  }
}

export default safeImageSrc;
