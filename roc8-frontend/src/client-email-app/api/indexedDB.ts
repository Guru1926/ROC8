import { openDB, DBSchema, IDBPDatabase } from "idb";

export type userActivityType = {
  key: string;
  value: {
    key: string;
    value: string[];
  };
};

// Define the schema for the database
interface UserActivitySchema extends DBSchema {
  userActivities: userActivityType;
}

// Function to set up the database
async function setupDatabase(): Promise<IDBPDatabase<UserActivitySchema>> {
  return openDB<UserActivitySchema>("clientEmailDatabase", 1, {
    upgrade(db) {
      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains("userActivities")) {
        db.createObjectStore("userActivities", { keyPath: "key" });
        console.log("Object store 'userActivities' created.");
      }
    },
  });
}



// Function to retrieve user activities
export async function getUserActivities() {
  // Initialize database
 const db = await setupDatabase();
  const tx = db.transaction("userActivities", "readonly");
  const store = tx.objectStore("userActivities");

  const readObj = await store.get("Read");
  const favoritesObj = await store.get("Favorites");

  return { Favorites: favoritesObj?.value ?? [], Read: readObj?.value ?? [] };
}

// Function to update user activity
export async function updateUserActivity(
  key: "Favorites" | "Read",
  id: string
) {
  const currentData = await getUserActivities();
  // Initialize database
const db = await setupDatabase();

  const activity = { key: key, value: [...currentData[key], id] };

  const tx = db.transaction("userActivities", "readwrite");
  const store = tx.objectStore("userActivities");
  
  await store.put(activity);
  
  await tx.done; // Wait for transaction to complete
}