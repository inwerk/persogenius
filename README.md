# persogenius.de

> [!NOTE]
> You can access the public instance at [https://www.persogenius.de/](https://www.persogenius.de/).

_persogenius.de_ is a simple web application designed to generate valid machine-readable zones for German ID cards, compliant with the latest specifications.

- [Installation](#installation)
- [Usage](#usage)
- [Privacy](#privacy)
- [References](#references)

## Installation

_persogenius.de_ is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Clone this repository and navigate to the project directory:

```bash
git clone https://github.com/inwerk/persogen.git
cd persogenius
```

Install the dependencies:

```bash
npm install
```

Run the development server:

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

## Usage

Either download this repository and use it locally or visit the public instance.

## Privacy

User inputs remain on the device and are not transmitted to the server.

## References

- [Die maschinenlesbare Zone in deutschen Ausweisen und Pässen](https://www.bmi.bund.de/SharedDocs/downloads/DE/veroeffentlichungen/themen/moderne-verwaltung/ausweise/maschinenlesbare-zone-paesse-ausweise.pdf?__blob=publicationFile&v=17) [(archived)](https://web.archive.org/web/20241009144007/https://www.bmi.bund.de/SharedDocs/downloads/DE/veroeffentlichungen/themen/moderne-verwaltung/ausweise/maschinenlesbare-zone-paesse-ausweise.pdf?__blob=publicationFile&v=17)
