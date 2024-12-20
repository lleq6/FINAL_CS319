## Group Members

```bash
1640706451 - Natchanon Srirat
1640706501 - Preemanon Boonkum
1640706501 - Tanaphon Hanlerdrit
1640706675 - Seksan Suwandee
1640706741 - Settawut Tangiam
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Setup PostgreSQL Database

### Windows 10 & 11

#### Using The Installer

As a general starting point, head over to the [Postgres Windows Installers page](https://www.postgresql.org/download/windows/). This is the current recommended approach and uses the installers from [EnterpriseDB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). The installer offers the following options:

![enterprisedb-setup](https://github.com/user-attachments/assets/f5b50953-7025-4cad-9b84-82471fc053ae)

If for example, you only want a Postgres client to connect to a hosted Postgres database (cloud, docker, etc), you would choose the options _pgAdmin 4_ and _Command Line Tools_.

#### Setup PostgreSQL Password
![postgresql-password-setup](https://github.com/user-attachments/assets/d2df309e-9831-4993-87fb-182db5fe299d)

Suggest : Default password = `123456`

![postgresql-port-setup](https://github.com/user-attachments/assets/da163bfb-2d3f-4c86-b343-6db870da2330)

Suggest : Default port = `5432`

## Open pgAdmin to restore database file

![restore-database-file](https://github.com/user-attachments/assets/41c5d05b-d352-4287-9ae6-5492dc3e9e27)

Restore file path : `./FINAL_CS319/database/CS319_ERP.sql`

#### Edit file .env

![edit-file-env](https://github.com/user-attachments/assets/6b0aab78-866b-48a0-b84b-1f2916b092e0)

Suggest :
`DB_HOST="localhost"`
`DB_PORT=5432`
`DB_USER="postgres"`
`DB_PASS="123456"`
`DB_NAME="CS319_ERP"`

#### Install missing node.js package

```bash
npm i
```

#### Finaly to run project

```bash
npm run dev
```
