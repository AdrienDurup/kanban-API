BEGIN;

DROP TABLE IF EXISTS "card_has_label";
DROP TABLE IF EXISTS "label";
DROP TABLE IF EXISTS "card";
DROP TABLE IF EXISTS "list";

CREATE TABLE "list" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE "card" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255),
    "color" VARCHAR(255),
    "position" INTEGER,
    "list_id" INT NOT NULL REFERENCES "list"("id"),
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE "label" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255),
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE "card_has_label" (
    "card_id" INT NOT NULL REFERENCES "card"("id"),
    "label_id" INT NOT NULL REFERENCES "label"("id"),
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);
COMMIT;
