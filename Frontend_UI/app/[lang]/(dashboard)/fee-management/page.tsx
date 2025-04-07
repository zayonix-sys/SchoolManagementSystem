"use client";
import React from "react";
import { FeeGrid } from "./fee-grid";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";

function Page() {
  return (
    <>
      <Breadcrumbs className="mb-5">
        <BreadcrumbItem>Fee Management</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">List</BreadcrumbItem>
      </Breadcrumbs>

      <FeeGrid />
    </>
  );
}

export default Page;
