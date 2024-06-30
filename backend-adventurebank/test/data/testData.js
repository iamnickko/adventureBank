const testData = {
  testUsers: [
    {
      username: "RangerRick",
      email: "ranger@rick.com",
      password: "Password123!",
      role: "admin",
    },
    {
      username: "HungryHippo",
      email: "hungry@hippo.com",
      password: "Password234!",
    },
  ],
  testGearItems: [
    {
      name: "UltraLight Backpack",
      category: "Backpacks",
      weight: 1200, // in grams
      description: "A lightweight backpack for long adventures.",
      user: "RangerRick", // Reference by username
    },
    {
      name: "Camping Stove",
      category: "Kitchen",
      weight: 300, // in grams
      description: "Compact camping stove.",
      user: "HungryHippo", // Reference by username
    },
  ],
  testAdventures: [
    {
      name: "Mount Everest Summit",
      description: "Climbing the highest peak on Earth.",
      userId: "RangerRick", // Reference by username
      gearItems: ["UltraLight Backpack"], // Reference by gear item name
    },
    {
      name: "Sahara Desert Crossing",
      description: "Crossing the Sahara on foot.",
      userId: "HungryHippo", // Reference by username
      gearItems: ["Camping Stove"], // Reference by gear item name
    },
  ],
  newUser: {
    username: "SwoleBadger",
    email: "swole@badger.com",
    password: "Password345!",
  },
  existingUser: {
    email: "hungry@hippo.com",
    password: "Password234!",
  },
};

export default testData;
