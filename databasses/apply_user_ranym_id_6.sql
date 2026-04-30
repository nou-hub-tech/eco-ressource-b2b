--
-- À exécuter sur MySQL/MariaDB APRÈS import complet de eco_ressource_db (1).sql
-- Objectif : ranymmejri1@gmail.com passe de user id 2 → id 6
-- Contraint : l'utilisateur Mona (mona@entreprise.tn) occupait déjà id 6
-- --> Mona est repoussée vers user id = 110 (libre dans le dump ci-dessus)

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ---------------------------------------------------------------------------
-- Phase A : ancien user id 6 (Mona) → 110
-- ---------------------------------------------------------------------------

UPDATE enterprises SET user_id = 110 WHERE user_id = 6;
UPDATE comments SET user_id = 110 WHERE user_id = 6;
UPDATE favorites SET user_id = 110 WHERE user_id = 6;
UPDATE wallet_transactions SET user_id = 110 WHERE user_id = 6;
UPDATE users SET id = 110 WHERE id = 6;

-- ---------------------------------------------------------------------------
-- Phase B : ancien user id 2 (Ranym / ranymmejri1@gmail.com) → id 6
-- ---------------------------------------------------------------------------

UPDATE enterprises SET user_id = 6 WHERE user_id = 2;
UPDATE comments SET user_id = 6 WHERE user_id = 2;
UPDATE favorites SET user_id = 6 WHERE user_id = 2;
UPDATE wallet_transactions SET user_id = 6 WHERE user_id = 2;
UPDATE users SET id = 6 WHERE id = 2;

SET FOREIGN_KEY_CHECKS = 1;

-- Contrôle conseillés :
-- SELECT id, email FROM users WHERE id IN (2, 6, 110);
-- doit montrer ranym en 6 et mona en 110 ;

--
-- Fusion eco.sql vers eco_ressource_db (1).sql : le dump ``(1)'' est déjà enrichi et
-- contient plusieurs tables absentes ou divergentes dans eco.sql (annonces complètes,
-- autres emails pour les id 5/6, etc.). Les blocs escrow 11‑32 présents dans les deux
-- sont identiques côté (1); il n’est pas prudent d’importer eco.sql brut sans
-- remapper les clés. Priorité : garder eco_ressource_db (1).sql puis ce script APPLY.
