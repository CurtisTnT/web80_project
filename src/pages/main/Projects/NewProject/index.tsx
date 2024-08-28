import Breadcrumb from "@/layouts/Breadcrumb";

export default function NewProject() {
  return (
    <div className="p-5">
      <Breadcrumb
        items={[
          { title: "Projects", href: "/projects" },
          { title: "Create project" },
        ]}
      />
    </div>
  );
}
