export type DesignationLevelType =
  | "intern"
  | "entry"
  | "middle"
  | "senior"
  | "management";

export const DesignationLevel: {
  [key in DesignationLevelType]: { id: DesignationLevelType; name: string };
} = {
  intern: { id: "intern", name: "Internship" },
  entry: { id: "entry", name: "Entry level" },
  middle: { id: "middle", name: "Middle level" },
  senior: { id: "senior", name: "Senior level" },
  management: { id: "management", name: "Management level" },
};

export const DesignationLevelOptions = Object.keys(DesignationLevel).map(
  (key) => ({
    id: DesignationLevel[key as DesignationLevelType].id,
    name: DesignationLevel[key as DesignationLevelType].name,
  })
);
