BEGIN;
-- On est obligé de supprimer la clé étrangère "bonne réponse" lors de l'ajout des données, car les tables "answer" et "question" sont liées dans les 2 sens
/* ALTER TABLE "answer"
  DROP CONSTRAINT answer_question_id_fkey; */
INSERT INTO
  "list"("name")
VALUES
  ('Animaux'),
  ('Chats'),
  ('Séries'),
  ('Séb'),
  ('Adrien'),
  ('Jeff');
INSERT INTO
  "card" ("title", "color", "list_id")
VALUES
  ('Back to the future', 'blue', 1),
  ('Chien', '#f0f', 1),
  ('Chat', 'red', 1),
  ('Serpent', 'green', 1),
  ('Serpent', 'green', 1);
INSERT INTO
  "label" ("color", "name")
VALUES
  ('blue', 'Classic Sci-Fi & Fantasy'),
  ('gold', 'Movies for ages 11 to 12'),
  ('plum', 'Gay & Lesbian Dramas'),
  ('ivory', 'Showbiz Dramas'),
  ('fuchsia', 'Screwball Comedies'),
  ('purple', 'Cult Movies'),
  ('teal', 'Cult Sci-Fi & Fantasy'),
  ('gold', 'Slasher and Serial Killer Movies'),
  ('purple', 'TV Mysteries'),
  ('yellow', 'Stand-up Comedy'),
  ('red', 'Family Features'),
  ('tan', 'Japanese Movies'),
  ('pink', 'Reality TV'),
  ('indigo', 'Romantic Foreign Movies'),
  ('yellow', 'Film Noir'),
  ('green', 'Middle Eastern Movies'),
  ('violet', 'Japanese Movies'),
  ('red', 'Action Sci-Fi & Fantasy'),
  ('orange', 'Science & Nature TV'),
  ('white', 'Steamy Thrillers');
INSERT INTO
  "card_has_label" ("card_id", "label_id")
VALUES
  (1,1);
 
  BEGIN;

--
-- PostGres avec le type serial n'incrémente pas automatiquement de façon implicite la séquence rattaché à la colonne !
-- Il faut donc mettre à jour la valeur courante de chacune des séquences en séléctionnant l'id maximum de chaque table
--
SELECT setval('list_id_seq', (SELECT MAX(id) from "list"));
SELECT setval('card_id_seq', (SELECT MAX(id) from "card"));
SELECT setval('label_id_seq', (SELECT MAX(id) from "label"));

COMMIT;