import Link from "next/link";
import ReduxCounter from "@/components/ReduxCounter";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import PlaceholderContent from "@/components/demo/placeholder-content";
import CountryTemplate from "@/components/CountryTemplate";

export default function CountriesPage() {
  return (
    <ContentLayout title="Countries">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          
          <BreadcrumbItem>
            <BreadcrumbPage>Countries</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
     <CountryTemplate />
    </ContentLayout>
  );
}
