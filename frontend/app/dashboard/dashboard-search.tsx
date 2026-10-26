"use client";

import { useState } from "react";
import SmartSearchBar from "@/components/ui/searchbar";

export default function DashboardSearch() {
  const [search, setSearch] = useState("");

  return <SmartSearchBar search={search} onSearchChange={setSearch} />;
}
