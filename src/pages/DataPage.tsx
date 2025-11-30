import DashboardBreadCrumb from "@/components/common/DashboardBreadcrumb";
import DashboardTable from "@/components/common/DashboardTable";

const DataPage = () => {
  return (
    <div className="flex flex-col p-6">
      <DashboardBreadCrumb />
      <DashboardTable />
    </div>
  );
};

export default DataPage;
