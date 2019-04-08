# Google Cloud function to convert a HTML file to PDF

## Requirements

- NODE >= 10
- Google Cloud SDK Installed

## Usage

Method: POST
Required fields in POST body: html

```
{
  html: html,
  opts: {
    ...# Puppeteer Options
  }
}
```

Puppeteer PDF Options
https://github.com/GoogleChrome/puppeteer/blob/v1.14.0/docs/api.md#pagepdfoptions

## Deploy

```
npm run deploy
```
