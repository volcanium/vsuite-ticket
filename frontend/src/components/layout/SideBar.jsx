import React from "react";
import { IconLayoutSidebarFilled } from "@tabler/icons-react";
import Select from "../ui/Select";

export default function SideBar() {
  return (
    <>
      <aside className="bg-contaner w-90 px-5 flex flex-col gap-5 py-4 h-screen">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-title text-secondary">Tickets</h1>
            <h2 className="text-xl font-title text-main">VSuite</h2>
          </div>
          <div>
            <IconLayoutSidebarFilled className="w-6 h-6 mt-1 text-secondary cursor-pointer" />
          </div>
        </div>
        <Select
          text={"Support"}
          variant={2}
          options={[
            {
              label: "VStudio Client",
            },
          ]}
        />
      </aside>
    </>
  );
}
