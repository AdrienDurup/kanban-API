-- On démarre une transaction afin de s'assurer de la cohérence globale de la BDD --
BEGIN;

-- On supprime l'existant, si elle existe
DROP TABLE IF EXISTS "list", "card", "label", "card_has_label";

-- On crée la table list
CREATE TABLE "list" (
    -- Un id avec SERIAL qui est un pseudo-type de PostgresSQL
    -- "id" SERIAL PRIMARY KEY,
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- On crée la table carte
CREATE TABLE "card" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "content" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '#FFF',
    "position" INTEGER NOT NULL DEFAULT 0,
    "list_id" INTEGER NOT NULL REFERENCES list("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- On crée la table label
CREATE TABLE "label" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '#FFF',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card_has_label" (
    "card_id" INTEGER NOT NULL REFERENCES card("id") ON DELETE CASCADE,
    "label_id" INTEGER NOT NULL REFERENCES list("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    -- ici pas besoin de updated_at : une relation ne se met pas à jour, soit on l'ajoute, soit on la supprime
);

-- Une fois les tables crées, on va les remplir

INSERT INTO "list"("name")
VALUES ('Première liste');

INSERT INTO "card"("content", "color", "list_id")
VALUES ('Carte 1', '#ff696', 1);

INSERT INTO "label"("name", "color")
VALUES ('Urgent', '#F00');

-- a ne pas oublier ... la liaison !
INSERT INTO "card_has_label" ("card_id", "label_id")
VALUES (1,1);

COMMIT;