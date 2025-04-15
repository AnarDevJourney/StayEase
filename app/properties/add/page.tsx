import { NextPage } from "next";
import AddPropertyForm from "@/components/AddPropertyForm";

const AddPropertyPage: NextPage = () => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 shadow-md rounded-sm border m-4 md:m-0">
          <AddPropertyForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
