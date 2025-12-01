import React, { useCallback, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import {
  useGetPostsQuery,
  useGetPostTagsQuery,
  type Post,
} from "@/services/posts/postEndpoints";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-components/ui/table";
import { Input } from "@/components/shadcn-components/ui/input";
import { Pagination } from "@/components/common/Pagination";
import { Badge } from "@/components/shadcn-components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-components/ui/select";
import { debounce } from "@/utils/resusableFunction";

const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: () => <div className="max-md:hidden">S.N.</div>,
    cell: ({ row }) => (
      <div className="max-md:hidden"> {row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div
        data-cy="title"
        className="w-[100px] truncate [400px]:w-[150px] lg:max-w-md xl:w-[300px]"
      >
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "body",
    header: () => <div className="max-lg:hidden">Body</div>,
    cell: ({ row }) => (
      <div className="w-[150px] truncate text-gray-600 max-md:hidden  xl:w-[250px]">
        {row.getValue("body")}
      </div>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      return (
        <div className="flex flex-wrap gap-1 w-[100px] [400px]:w-[150px] md:w-[180px]">
          {tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
];
export default function DashboardTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [pageSize, setPageSize] = useState(10);

  const { data: tagsData } = useGetPostTagsQuery();
  const { data, isLoading, error } = useGetPostsQuery({
    limit: pageSize,
    skip: pageIndex * pageSize,
    search: searchTerm,
    tag: selectedTag,
    sortBy: sortBy,
    order: sortOrder,
  });

  const posts = data?.posts || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / pageSize);
  const tags = tagsData || [];

  const table = useReactTable({
    data: posts,
    columns,
    pageCount: totalPages,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
  });

  const debouncedSearchChange = useCallback(
    // eslint-disable-next-line react-hooks/use-memo
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setPageIndex(0);
    }, 150), // Now you can control the delay
    []
  );

  const handleTagChange = (value: string) => {
    setSelectedTag(value === "all" ? "" : value);
    setPageIndex(0);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value === "none" ? "" : value);
    setPageIndex(0);
  };

  const handleOrderChange = (value: string) => {
    setSortOrder(value as "asc" | "desc");
    setPageIndex(0);
  };

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Error loading products. Please try again.
      </div>
    );
  }

  return (
    <div className="w-full p-2 sm:p-6">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-3xl font-bold">Posts Dashboard</h1>
        <hr className="border" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center mt-4 py-4">
        <Input
          placeholder="Search..."
          onChange={debouncedSearchChange}
          className="w-full lg:w-1/3"
        />

        <Select value={selectedTag || "all"} onValueChange={handleTagChange}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue data-cy="tag-select" placeholder="Filter by tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag} value={tag} className="capitalize">
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy || "none"} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Sorting</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="reactions">Reactions</SelectItem>
          </SelectContent>
        </Select>

        {sortBy && (
          <Select value={sortOrder} onValueChange={handleOrderChange}>
            <SelectTrigger className="w-full lg:w-[140px]">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="w-full rounded-sm border border-gray-200 shadow-sm overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : posts.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <Pagination
          table={table}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          totalPages={totalPages}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}
