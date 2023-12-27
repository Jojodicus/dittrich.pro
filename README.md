[![Netlify Status](https://api.netlify.com/api/v1/badges/c9f55710-9443-4276-a550-8a0eb204d363/deploy-status)](https://app.netlify.com/sites/dittrich-pro/deploys)

# [dittrich.pro](https://dittrich.pro)

My humble blog, built using [Zola](https://www.getzola.org/) with the [Kita](https://github.com/st1020/kita) theme, hosted on [Netlify](https://www.netlify.com/), with auto-deployment using [Hugo](https://gohugo.io/).

## Usage reference

Normal posts go into [content/](content/) as Markdown files with enhanced syntax, with any images being stored in [static/images/](static/images/). For a sample post using all available features, see [first_post.md](content/first_post.md).

## Local debugging

To host the website locally for debugging purposes, run:

```
zola serve
```

Zola automatically refreshes when files are changed, so you don't have to restart the local server after every modification.
