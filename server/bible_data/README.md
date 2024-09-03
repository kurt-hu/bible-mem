# Setup

### Download bible database (optional, but recommended)

Download `bible-sqlite.db` from here (all public domain): https://github.com/scrollmapper/bible_databases/blob/master/bible-sqlite.db. Move to this directory (/server/bible_data)

- King James Version (KJV)
- American Standard-ASV1901 (ASV)
- Bible in Basic English (BBE)
- World English Bible (WEB)
- Young's Literal Translation (YLT)

### Install DB Browser for SQLite (optional, but recommended)

This is a very helpful program to view/update/export the SQLite database `data.db`: https://sqlitebrowser.org/

### Import bible collections with PocketBase UI (required)

1. Start the local PocketBase server (refer to `server/README.md`)
2. Log in to the admin panel and go to this url: http://127.0.0.1:8090/_/#/settings/import-collections
3. Import the collection(s) in `server/bible_data/pb_schema.json`
4. In `server/bible_data/src`, create a `.env` file with your admin credentials:

```
DB_USERNAME="example@test.com"
DB_PASSWORD="examplepassword"
```

5. In `server/bible_data/src`, run the following commands to import the actual data:

```
npm install
node import_json.js
```

### References

- https://github.com/pocketbase/pocketbase/discussions/2088
- https://github.com/pocketbase/pocketbase/discussions/2014
- https://github.com/pocketbase/pocketbase/discussions/1692

# Old (Can't directly add tables because PocketBase needs associated metadata, required table fields)

## Export .db to .sql file

```
cd server/bible_data
sqlite3
.open bible-sqlite.db
.output bible-sqlite-export.sql
.dump
.exit
```

## Import .sql file into PocketBase data.db

```
cd server/pb_data
sqlite3
.open data.db
.read ../bible_data/bible-sqlite-export.sql
.exit
```
