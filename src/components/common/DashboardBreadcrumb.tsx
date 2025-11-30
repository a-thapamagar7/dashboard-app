import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn-components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { Link, useMatches } from "react-router-dom";

const DashboardBreadCrumb = () => {
  const matches = useMatches();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matches.map((data, index) =>
          index === matches.length - 1 ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {typeof data.handle === "object" &&
                  data.handle &&
                  "breadcrumb" in data.handle &&
                  typeof data.handle.breadcrumb === "string"
                    ? data.handle.breadcrumb
                    : ""}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">
                    {" "}
                    {typeof data.handle === "object" &&
                    data.handle &&
                    "breadcrumb" in data.handle &&
                    typeof data.handle.breadcrumb === "string"
                      ? data.handle.breadcrumb
                      : ""}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
            </>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadCrumb;
