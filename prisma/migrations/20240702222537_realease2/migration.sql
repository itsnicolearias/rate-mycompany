/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Qualification" DROP CONSTRAINT "Qualification_company_id_fkey";

-- DropTable
DROP TABLE "Company";

-- CreateTable
CREATE TABLE "company" (
    "company_id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "description" TEXT,
    "logo" TEXT,
    "principal_picture" TEXT,
    "social_media" JSONB,
    "creation_date" DATE,
    "banner_picture" TEXT,
    "other_pictures" TEXT,
    "located_in" VARCHAR(100),
    "employees_number" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "company_pkey" PRIMARY KEY ("company_id")
);

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;
