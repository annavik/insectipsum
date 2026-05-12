# Insect Ipsum

Insect themed placeholder content for design and code 🐛

## Tech stack

- **Frontend**: React + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui with Radix UI
- **Backend**: Netlify Functions
- **Image Processing**: Sharp
- **Deployment**: Netlify

## Usage

### Web interface

http://insectipsum.com/

### Text API

**Endpoint**: `GET /text/:type/:count`

**Parameters**:

- `:type` – The type of content to generate: `paragraphs`, `sentences`, or `words`
- `:count` – The number of items to generate (1–100)

**Example**: https://insectipsum.com/text/paragraphs/3

### Photos API

**Endpoint**: `GET /photos/:width/:height`

**Parameters**:

- `:width` – Image width in pixels (1–1024)
- `:height` – Image height in pixels (1–1024)

**Example**: https://insectipsum.com/photos/200/300

## Local development

### System requirements

- [Node](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

The `.nvmrc` file in project root describes the recommended Node version for this project.

### Getting started

```bash
# Install dependencies
npm install

# Run app in development mode
npm run dev
```

The app will now be available on http://localhost:5173/.

### Netlify Functions

For the API, Netlify Functions are used. Use [Netlify CLI](https://docs.netlify.com/cli/get-started/) to start a local dev server.

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local dev server
netlify dev
```

The local dev server will now be available on http://localhost:8888/.

## Credits

The stickers in the header come from [Flaticon](https://www.flaticon.com/stickers-pack/nature-204).

The original insect photos come from [Unsplash](https://unsplash.com/). They all have a [free license](https://unsplash.com/license) and can be downloaded and used without permission.
