export type LevelDesignationType =
  | "intern"
  | "entry"
  | "middle"
  | "senior"
  | "management";

export const LevelDesignation: {
  [key in LevelDesignationType]: { value: LevelDesignationType; label: string };
} = {
  intern: { value: "intern", label: "Internship" },
  entry: { value: "entry", label: "Entry level" },
  middle: { value: "middle", label: "Middle level" },
  senior: { value: "senior", label: "Senior level" },
  management: { value: "management", label: "Management level" },
};

export const levelDesignationOptions = Object.keys(LevelDesignation).map(
  (key) => ({
    value: LevelDesignation[key as LevelDesignationType].value,
    label: LevelDesignation[key as LevelDesignationType].label,
  })
);
