import { createCn } from "cn/config";

export const cn = createCn({
  extend: {
    theme: {
      radius: ["control", "card", "media"],
      shadow: ["card", "overlay"],
      spacing: ["section", "gutter"],
      container: ["page"],
    },
    classGroups: {
      "font-size": [
        { text: ["display", "h1", "h2", "h3", "lead", "body", "small", "stat"] },
      ],
    },
  },
});
