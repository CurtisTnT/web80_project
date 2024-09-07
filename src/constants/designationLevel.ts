export type designationLevelType =
  | "intern"
  | "entry"
  | "middle"
  | "senior"
  | "management";

export const DesignationLevel: {
  [key in designationLevelType]: { id: designationLevelType; name: string };
} = {
  intern: { id: "intern", name: "Internship" },
  entry: { id: "entry", name: "Entry level" },
  middle: { id: "middle", name: "Middle level" },
  senior: { id: "senior", name: "Senior level" },
  management: { id: "management", name: "Management level" },
};

export const DesignationLevelOptions = Object.keys(DesignationLevel).map(
  (key) => ({
    id: DesignationLevel[key as designationLevelType].id,
    name: DesignationLevel[key as designationLevelType].name,
  })
);
