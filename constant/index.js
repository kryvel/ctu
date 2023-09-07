export const categoryOptions = [
  {
    value: 9,
    option: "Všechno",
  },
  {
    value: 1,
    option: "Radiokomunikační předpisy"
  },
  {
    value: 2,
    option: "Radiokomunikační provoz",
  },
  {
    value: 3,
    option: "Elektrotechnika a radiotechnika",
  },

];

export const showCategory = (category) => {
  if (category === "general_knowledge") return "General Knowledge";
  else if (category === "science") return "Science";
  else if (category === "sport_and_leisure") return "Sports & Leisure";
  else if (category === "music") return "Music";
  else if (category === "history") return "History";
  else if (category === "geography") return "Geography";
  else if (category === "society_and_culture") return "Society & Culture";
  else if (category === "arts_and_literature") return "Arts & Literture";
  else if (category === "film_and_tv") return "Film & TV";
  else if (category === "food_and_drink") return "Food & Drink";
};
