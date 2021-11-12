BEGIN;

DROP TABLE IF EXISTS "card_has_label";
DROP TABLE IF EXISTS "label";
DROP TABLE IF EXISTS "card";
DROP TABLE IF EXISTS "list";

CREATE TABLE "list" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "card" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255),
    "color" VARCHAR(255) NOT NULL DEFAULT '#FFF',
    "position" INTEGER,
    "list_id" INT NOT NULL REFERENCES "list"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "label" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255) NOT NULL DEFAULT '#FFF',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "card_has_label" (
    "card_id" INT NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
    "label_id" INT NOT NULL REFERENCES "label"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);
COMMIT;
