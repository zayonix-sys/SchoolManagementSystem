"use client";

import { Docs } from "@/components/svg";
import { Card } from "@/components/ui/card";
import React, { Fragment } from "react";
import ViewCategories from "./categories/view-categories";
import { InventoryCategoryData } from "@/services/apis/inventoryCategoryService";
import { InventoryItemData } from "@/services/apis/inventoryItemService";
import ViewItems from "./items/view-items";
import { Icon } from "@iconify/react";
import { InventoryStockData } from "@/services/apis/inventoryStockService";
import { InventoryStatusData } from "@/services/apis/inventoryStatusService";
import ViewStocks from "./stocks/view-stocks";

const ReportsCard = ({
  categories,
  items,
  stocks,
  status,
}: {
  categories: InventoryCategoryData[];
  items: InventoryItemData[];
  stocks: InventoryStockData[];
  status: InventoryStatusData[];
}) => {
  const categoriesCount = categories?.length.toString();
  const itemsCount = items?.length.toString();
  const stocksCount = stocks?.length.toString();
  interface ReportItem {
    id: number;
    name: string;
    count: string;
    rate: string;
    icon: React.ReactNode;
    color?:
      | "primary"
      | "secondary"
      | "success"
      | "info"
      | "warning"
      | "destructive"
      | "default"
      | "dark";
  }

  const reports: ReportItem[] = [
    {
      id: 1,
      name: "No. of Categories",
      // count:"10",
      count: (categoriesCount ? categoriesCount : 0).toString(),
      rate: "8.2",
      icon: (
        <Icon
          icon="heroicons:rectangle-stack-solid"
          className="w-6 h-6 text-info"
        />
      ),
      color: "destructive",
    },
    {
      id: 2,
      name: "No. of Items",
      count: (itemsCount ? itemsCount : 0).toString(),
      rate: "8.2",
      icon: (
        <Icon
          icon="heroicons:cube-solid"
          className="w-6 h-6 text-warning-700"
        />
      ),
      color: "destructive",
    },
    {
      id: 3,
      name: "No. of Inventory Stocks",
      count: (stocksCount ? stocksCount : 0).toString(),
      rate: "8.2",
      icon: (
        <Icon
          icon="heroicons:clipboard-document-list-solid"
          className="w-6 h-6"
        />
      ),
      color: "info",
    },
  ];
  return (
    <Fragment>
      {reports.map((item) => (
        <Card
          key={item.id}
          className="rounded-lg p-4 xl:p-2 xl:py-6 2xl:p-6  flex flex-col items-center 2xl:min-w-[168px]"
        >
          <div>
            <span
              className={`h-12 w-12 rounded-full flex justify-center items-center bg-${item.color}/10`}
            >
              {item.icon}
            </span>
          </div>
          <div className="mt-4 text-center">
            <div className="text-base font-medium text-default-600">
              {item.name}
            </div>
            <div className={"text-3xl font-semibold text-${item.color} mt-1"}>
              {item.count}
            </div>
            {item.id === 1 && (
              <ViewCategories
                selectedCategory={categories as InventoryCategoryData[]}
              />
            )}
            {item.id === 2 && (
              <ViewItems
                selectedItem={items as InventoryItemData[]}
                categories={categories as InventoryCategoryData[]}
              />
            )}
            {item.id === 3 && (
              <ViewStocks
                selectedStocks={stocks as InventoryStockData[]}
                items={items as InventoryItemData[]}
                status={status as InventoryStatusData[]}
              />
            )}
          </div>
        </Card>
      ))}
    </Fragment>
  );
};

export default ReportsCard;

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
