// ! copies database collections and their documents

// * setting up MongoDB Atlas database
// ^ run with   `mongosh ".env var [mongodb_copy_dbs_link]" --username [username] src/db/copy-db.js` in terminal

const SRC_DB = "s22-shop"; // source sb
const DST_DB = "s23-shop"; // target db
const colls = ["users", "products", "orders", "sessions"]; // which collections should be copied

for (const name of colls) {
  db.getSiblingDB(SRC_DB)
    .getCollection(name)
    .aggregate([
      { $match: {} },
      {
        $merge: {
          into: { db: DST_DB, coll: name },
          on: "_id",
          whenMatched: "replace",
          whenNotMatched: "insert",
        },
      },
    ]);
}

print("Done");
