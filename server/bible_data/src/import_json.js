import "dotenv/config";
import PocketBase from "pocketbase";
import t_kjv from "./t_kjv.json" assert { type: "json" };

const pb = new PocketBase("http://127.0.0.1:8090");

console.log(process.env.dbUsername, process.env.dbPassword);

await pb.admins.authWithPassword(
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  { cache: "no-store" }
);

console.log("rows:", t_kjv.length);

// to preserve the insertion order, await each request
for (let i = 0; i < t_kjv.length; i++) {
  if (i % 1000 === 0) {
    console.log(i);
  }
  const item = t_kjv[i];

  await pb.collection("t_kjv").create({
    ...item,
    id: item["id"].toString().padStart(15, "0"), // pocketbase id must be a 15 character string
    key: item["id"],
  });
}
