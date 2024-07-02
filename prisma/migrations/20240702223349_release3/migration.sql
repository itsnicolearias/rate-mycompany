/*
  Warnings:

  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Qualification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QualificationCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_department_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Qualification" DROP CONSTRAINT "Qualification_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Qualification" DROP CONSTRAINT "Qualification_qualification_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Qualification" DROP CONSTRAINT "Qualification_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_subscription_id_fkey";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Qualification";

-- DropTable
DROP TABLE "QualificationCategory";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "company";

-- CreateTable
CREATE TABLE "companies" (
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

    CONSTRAINT "companies_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "subscription_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("subscription_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "email" VARCHAR(100),
    "phone_number" VARCHAR(20),
    "country" VARCHAR(50),
    "city" VARCHAR(50),
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(100),
    "subscription_id" VARCHAR(36),
    "is_subscription_owner" BOOLEAN DEFAULT false,
    "profile_picture" TEXT,
    "born_date" TIMESTAMP(3),
    "password" TEXT,
    "role" VARCHAR(100),
    "forget_password_token" TEXT,
    "verify_account_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "employees" (
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "department_id" VARCHAR(36),
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "qualifications" (
    "qualification_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION,
    "comment" TEXT,
    "user_id" VARCHAR(36),
    "company_id" VARCHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "qualification_category_id" VARCHAR(36),

    CONSTRAINT "qualifications_pkey" PRIMARY KEY ("qualification_id")
);

-- CreateTable
CREATE TABLE "departments" (
    "department_id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "qualification_categories" (
    "qualification_category_id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "qualification_categories_pkey" PRIMARY KEY ("qualification_category_id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("subscription_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualifications" ADD CONSTRAINT "qualifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualifications" ADD CONSTRAINT "qualifications_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualifications" ADD CONSTRAINT "qualifications_qualification_category_id_fkey" FOREIGN KEY ("qualification_category_id") REFERENCES "qualification_categories"("qualification_category_id") ON DELETE SET NULL ON UPDATE CASCADE;
