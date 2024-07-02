-- CreateTable
CREATE TABLE "Company" (
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

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "subscription_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscription_id")
);

-- CreateTable
CREATE TABLE "User" (
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "department_id" VARCHAR(36),
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "qualification_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION,
    "comment" TEXT,
    "user_id" VARCHAR(36),
    "company_id" VARCHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "qualification_category_id" VARCHAR(36),

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("qualification_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "department_id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "QualificationCategory" (
    "qualification_category_id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "QualificationCategory_pkey" PRIMARY KEY ("qualification_category_id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "Subscription"("subscription_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_qualification_category_id_fkey" FOREIGN KEY ("qualification_category_id") REFERENCES "QualificationCategory"("qualification_category_id") ON DELETE SET NULL ON UPDATE CASCADE;
