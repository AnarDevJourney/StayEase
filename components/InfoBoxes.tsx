import InfoBox from "./InfoBox";

const InfoBoxes: React.FC = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            description="Find your dream rental property. Bookmark properties and contact owners."
            heading="For Renters"
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgroundColor: "bg-black",
            }}
          />
          <InfoBox
            description="List your properties and reach potential tenants. Rent as an
              airbnb or long term."
            heading="For Property Owners"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              backgroundColor: "bg-blue-500",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
