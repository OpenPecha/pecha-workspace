"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href: string;
  current: boolean;
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on home page
  if (pathname === "/") return null;

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: "Home",
      href: "/",
      current: false,
    },
  ];

  pathSegments.forEach((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);
    const current = index === pathSegments.length - 1;

    breadcrumbs.push({
      name,
      href,
      current,
    });
  });

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <ol
          role="list"
          className="flex items-center space-x-2 text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbs.map((item, index) => (
            <li
              key={item.href}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(index + 1)} />

              {index === 0 ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700 transition-colors flex items-center"
                  itemProp="item"
                >
                  <Home className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span itemProp="name">{item.name}</span>
                </Link>
              ) : (
                <>
                  <ChevronRight
                    className="h-4 w-4 text-gray-400 mx-2"
                    aria-hidden="true"
                  />
                  {item.current ? (
                    <span
                      className="text-gray-900 font-medium"
                      aria-current="page"
                      itemProp="name"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      itemProp="item"
                    >
                      <span itemProp="name">{item.name}</span>
                    </Link>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
