import Image from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export type SpotlightAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

export function SpotlightAnchor({ href, className, children, ...rest }: SpotlightAnchorProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

/** Remote URLs use `<img>`; local `/…` uses `next/image`. */
export function SpotlightMediaImage({
  src,
  alt,
  sizes,
  className
}: {
  src: string;
  alt: string;
  sizes: string;
  className: string;
}) {
  if (/^https?:\/\//i.test(src)) {
    return (
      // Remote CDNs; plain img avoids `next/image` remotePatterns for every host.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        loading="lazy"
        decoding="async"
        sizes={sizes}
      />
    );
  }
  return <Image src={src} alt={alt} fill className={className} sizes={sizes} />;
}
