import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface BreadcrumbProps {
  href: string | null;
  label: string;
}

interface AdminHeaderProps {
  breadcrumb: BreadcrumbProps[];
}

export default function AdminHeader({ breadcrumb }: AdminHeaderProps) {
  return (
    <header className="flex items-center p-4 border-b border-gray-200 w-full dark:border-gray-800 sticky top-0 bg-white">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/admin/live"
                    className={`${!item.href && "text-pink-600 font-medium"}`}
                  >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {item.href && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
