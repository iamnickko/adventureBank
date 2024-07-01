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
      category: "Backpack",
      description: "A lightweight backpack for long adventures.",
    },
    {
      name: "Invisible Tent",
      category: "Tent",
      description:
        "So lightweight and transparent, you won't even know it's there!",
    },
    {
      name: "Camping Stove",
      category: "Kitchen",
      description: "Compact camping stove.",
    },
    {
      name: "Self-Walking Boots",
      category: "Clothing",
      description:
        "Just set your destination, sit back, and enjoy the journey. Walking is so last year.",
    },
  ],
  testAdventures: [
    {
      name: "Mount Everest Summit",
      description: "Climbing the highest peak on Earth.",
      // userId: "RangerRick", // Reference by username
      // gearItems: ["UltraLight Backpack"], // Reference by gear item name
    },
    {
      name: "Sahara Desert Crossing",
      description: "Crossing the Sahara on foot.",
      // userId: "HungryHippo", // Reference by username
      // gearItems: ["Camping Stove"], // Reference by gear item name
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
