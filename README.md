# Digital Legacy Social Platform

A modern social platform designed to preserve personal memories, family history, financial records, and life instructions in a secure and structured way, allowing users to share important information with family members and ensure digital legacy access after death.

This platform combines social networking, family relationship management, and digital inheritance features into a single system where users can create posts, manage family trees, store important life information, and securely transfer access to trusted family members when needed.

It is built to help people organize their life stories, financial and property information, final instructions, and personal knowledge while maintaining privacy, security, and controlled access.

---

## 🚀 Project Overview

The Digital Legacy Social Platform is a full-stack system that allows users to create and manage structured posts related to their personal life, family, and legacy. Unlike traditional social platforms, this system focuses on long-term digital memory preservation and controlled family access.

Users can register, join using referral codes, create public or private posts, build family relationships, and manage important life information such as finance, property, family history, life lessons, and final instructions. Family members can be granted permission to access the account and view important content in case of emergencies or after the user's death.

The system ensures secure data management, role-based access control, and privacy-focused content visibility.

---

## 🎯 Purpose of the Platform

The main goal of this platform is to create a secure digital space where people can store and share important life information with their family and trusted members.

It helps users:
* Preserve family history and memories
* Store financial and property information securely
* Share life lessons and knowledge
* Manage final instructions and funeral arrangements
* Document asset distribution and movement
* Build family trees and relationships
* Control who can access their information
* Transfer digital access to family members after death

This platform acts as a digital legacy vault combined with a social networking system.

---

## 💡 Key Idea

Traditional social media platforms focus on daily interaction and entertainment, while this platform focuses on meaningful life documentation, secure information sharing, and family legacy preservation.

Users can create categorized posts such as:
* Finance
* Bank & Investments
* Property & Family Home
* Family History
* Life Lessons & Knowledge
* Final Instructions & Funeral Arrangement
* Distribution of Assets & Movement
* Other Personal Records

Each post can be public, private, or shared with specific family members. This ensures that sensitive information remains protected while still allowing controlled access to trusted individuals.

---

## 🧩 Core Concept

**Social Platform + Family System + Digital Legacy Management**

The system provides:
* Social interaction
* Family relationship management
* Secure digital memory storage
* Post-death access control
* Referral-based user growth
* Structured life documentation

This creates a unique combination of a social platform and a digital legacy management system.

---

## 🌟 Vision

To build a secure and meaningful digital environment where individuals can preserve their life stories, family relationships, financial records, and legacy for future generations while maintaining privacy, control, and structured access.

---

## 👥 Target Users

* Families
* Individuals who want to store life records
* Elderly people planning digital legacy
* Professionals managing assets and instructions
* Users who want to preserve family history
* Communities focused on long-term memory preservation

---

## 🏷️ Platform Type

* Digital Legacy Social Platform
* Family Legacy Management System
* Social Content & Memory Preservation Platform

---

## ⚠️ Problem It Solves

Many people store important life information in scattered places such as notebooks, documents, bank files, or private records. After death or emergencies, family members often struggle to find financial information, property details, or final instructions.

This platform solves that problem by providing a centralized and secure digital system where all important information is organized and accessible to trusted family members when needed.

---

## ✅ Solution

A structured social platform that allows users to:
* Store important life data
* Share content securely
* Manage family relationships
* Control content visibility
* Transfer access to trusted family members
* Preserve digital legacy

All in one secure and scalable platform.

---

## 📝 Short Description

A digital legacy social platform that helps users store personal memories, financial records, family history, and final instructions while allowing controlled access to family members and preserving digital legacy for future generations.

---

## 🛠️ Tech Stack

### Standard Tools & Core Technologies
* **Runtime Environment:** [Node.js](https://nodejs.org/)
* **Engine / Programming Language:** [TypeScript](https://www.typescriptlang.org/)
* **Web Framework:** [Express.js](https://expressjs.com/) (v5)
* **Database Management:** [MongoDB](https://www.mongodb.com/)
* **ORM:** [Prisma](https://www.prisma.io/)

### Integrations and Services
* **Validation & Schema Management:** Zod
* **Authentication & Security:** JSON Web Tokens (JWT), Bcrypt.js, Helmet, CORS
* **Media & File Uploads:** Multer
* **Logging System:** Winston (with Winston Daily Rotate File)
* **Email Services:** Nodemailer

---

## 📂 Project Structure

```text
├── .env
├── .gitignore
├── .git/
├── dev_error.log
├── logs/
├── package.json
├── package-lock.json
├── tsconfig.json
├── prisma/
│   └── schema.prisma      # Prisma schema for MongoDB modeling
└── src/
    ├── app/               # Main application modules and domains
    ├── config/            # Application configuration files (e.g., env variables mapping)
    ├── constants/         # Global and application-wide constants
    ├── errors/            # Error handling classes and centralized logic
    ├── helpers/           # Helper functions used across the app
    ├── interfaces/        # TypeScript interfaces and type definitions
    ├── lib/               # Utility libraries configurations
    ├── shared/            # Shared components (e.g., standard responses, catchAsync)
    ├── utils/             # Other utility functions (like email sending, processing)
    ├── app.ts             # Express app setup and middleware configuration
    └── server.ts          # Server entry file, db connection and bootstrapping
```

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed to run and test the application:
- **Node.js** (v18+)
- **MongoDB** (Local or Atlas)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the Backend directory:**
   ```bash
   cd family-legacy-social-platform-backend
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Configure the Environment:**
   Update the `.env` file at the root of the project to add the following necessary variables (e.g., `DATABASE_URL`, JWT secrets, Email settings etc.).
   
   Example:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/digital-legacy?retryWrites=true&w=majority"
   ```

5. **Generate Prisma Client and DB Push:**
   Synchronize your Prisma schema with the database.
   ```bash
   npm run gen
   npm run push
   ```

6. **Run the Application:**
   To start the backend server in development server format:
   ```bash
   npm run dev
   ```

The application API endpoints should now be running locally on your specified port (e.g. `http://localhost:5000`).
