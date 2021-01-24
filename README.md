<a href="https://www.narative.co/labs/novela/" target="_blank">
<img src="https://github.com/tinialabs/next-theme-novela/blob/main/.github/static/nextjs-theme-novela-hero-emotion.jpg?raw=true" alt="gatsby-novela-theme hero image" />
</a>

<br/>

# Novela — A theme by Narative, forked for Next.js by Tinia Labs

With minimal styling and maximum features — including multiple homepage layouts, built-in social sharing and dark mode — Novela makes it easy to start publishing beautiful articles and stories with Next.js.

Novela is built by the team at [Narative](https://www.narative.co), updated by [Tinia Labs](https://tinia.org) to work on Next.js, and built for everyone that loves the web.

Special thanks to [@jpvalery](https://github.com/jpvalery) for helping maintain Novela.

<div>
<a href="https://www.narative.co/labs/novela/" target="_blank">
<img src="https://github.com/tinialabs/next-theme-novela/blob/main/.github/static/nextjs-theme-novela-cta-demo.jpg?raw=true" alt="gatsby-novela-theme live demo" width="295px" />
</a>
</div>

Features specific to Next.js over others Next.js examples
- **Favicon generator** Uses the `favicons` package to generate favicons and manifests on all required platforms
- **Yaml config** Put all your site config in one place in a site.yml file in your content folder
- **All content colocated** All content including images and markdown are colocated in the `content` folders
- **No CMS required** Keep all your blog articles and images under version control in Github or similar
- **Image optimization** Use Next.js runtime image optimization without needing to know the height and width of each image
- **Image lazy loading and LQIP** Use blurred image placeholders (similar to Medium) without an extra server roundtrip;  lazy laod images when the images are ready to be shown in the viewport
- **Fast performance** Much faster build times than Gatsby for the exact same blog content and layout;  >95 lighthouse scores in every category currently
- **Simpler project structure** Instead of multiple gatsby hooks, use Next.js intuitive /pages structure for a better developer experience

### Table of Contents

- [Why Novela?](#why-use-novela)

- [Getting Started](#getting-started-with-next-starter-novela)

  - With Next.js Starter Novela

    - [Installation](#step-1-starter-installation)
    - [Develop & Build](#step-2-develop--build)

  - From scratch

    - [Installation](#step-1-installation)
    - [Folder structure](#step-2-folder-structure)
    - [Using Novela Theme](#step-3-using-next-theme-novela)
    - [Adding an Author](#step-4-adding-an-author)
    - [Adding a Post](#step-5-adding-a-post)
    - [Configuring Site Metadata](#step-6-configuring-sitemetadata)

- [Data Sources](#data-sources)

  - [Local](#local)
  - [Contentful](#contentful)

- [Customization](#customization)

  - [Enabling Author Pages](#enabling-author-pages)
  - [Changing styles](#changing-styles)
  - [Component shadowing](#component-shadowing)
  - [Using images](#using-images)
  - [Adding your logo](#adding-your-logo)
  - [Adding Mailchimp](#adding-mailchimp)

- [Data Models](#data-models)

  - [Theme Options](#theme-options)
  - [Author](#author)
  - [Post](#post)
  - [Site Metadata](#site-metadata)

- [Future](#the-future)

  <br />

# Getting Started with Next.js Starter Novela

This guide will take you through setting up Novela with Next.js Starter Novela.

### Step 1: Starter installation

##### With `create-next-app`:

```sh
npx create-next-app -e https://github.com/tinialabs/next-starter-novela
```

##### With `git clone`:

```sh
git clone git@github.com:tinialabs/next-starter-novela.git novela-site

cd novela-site

yarn
```

### Step 2: Develop & Build

Once installed or cloned locally and all packages are installed you can begin developing your site.

```sh
# Run localhost
yarn dev

# Build your Next.js site
yarn build
```

To learn more about adding Authors, Posts, and Site Metadata see:

- [Adding an Author](#step-4-adding-an-author)
- [Adding a Post](#step-5-adding-a-post)
- [Configuring Site Metadata](#step-6-configuring-sitemetadata)

# Getting Started from scratch

This guide will take you through adding Novela to a new project. You do not require any Next.js starters or similar, but you can add Novela to an existing Next.js project.

You can also view the completed [example repository](https://github.com/tinialabs/next-starter-novela).

### Step 1: Installation

```sh
# Create an empty directory and go into it
mkdir novela-site && cd novela-site

# Add all required dependencies
yarn add react react-dom next next-theme-novela
```

### Step 2: Folder structure

Once you've installed React, Next.js, and Novela you'll want to add your first Author and Post.

The recommended project structure for your content and site looks like this:

```
  novela-site
    ├── .config
    │ ├── .mdx-plugins.js
    │ └── .next-sitemap.js
    ├── content
    │ ├── authors
    │ │   ├── avatars
    │ │   │    └── avatar.jpg
    │ │   └── authors.yml
    │ └── posts
    │ │   └── 2020-01-01-my-first-novela-post
    │ │       ├── images
    │ │       │   └── novela-hero.jpg
    │ │       └── index.mdx
    │ ├── theme
    │     ├── favicon.png
    │     └── site.yml
    ├── .meta
    ├── node_modules
    ├── next-config.js
    ├── package.json
    ├── pages
    ├── public
    └── tsconfg.json
```

### Step 3: Using `next-theme-novela`

You must add `next-theme-novela` and `next-lib-content` as package.json dependencies or .meta sub-projects.  We
use the latter in all examples

We also require `next-favicon-loader` and `next-image-meta-loader` as next.js plugins, and use `next-compose-plugins` to
add these to your next-config.js file.   These generate the favicons/site manifest, as well as provide the ability to
import images directly from the `content` tree  right next to the assocated markdown, instead of the Next.js default of 
having to put them in the `public` folder.

```js
// next-config.js

const { withPlugins } = require('next-compose-plugins');

module.exports = withPlugins(
  [
    require('next-favicon-loader'),
    require('next-image-meta-loader'),
  ],
  {
    webpack: (config, { defaultLoaders }) => {
      defaultLoaders.babel.options.plugins = [
        require.resolve('@emotion/babel-plugin')
      ]

      return config
    }
  }
)
```

---

Once you've setup the plugins in `next-config.js` and installed the theme proects you can start creating your first Posts. In order to create a Post you also need at least one Author.

### Step 4: Adding an Author

In [step 2](#step-2-folder-structure) we created the folder structure of our project. We can now add an Author by populating `/content/authors/authors.yml`:

```
  novela-site
  └── content
    └── authors
        ├── avatars
        │    └── brotzky-avatar.jpg
        └── authors.yml
```

In `authors.yml` add an Author. There **must** be at least one `featured` Author.

`/content/authors/authors.yml`:

```yml
- name: Dennis Brotzky
  bio: |
    Written by Dennis Brotzky who lives and works in Vancouver building useful things.
    You should follow him on Twitter.
  avatar: ./avatars/brotzky-avatar.jpg
  featured: true
  social:
    - url: https://unsplash.com
    - url: https://stackoverflow.com
    - url: https://github.com
```

### Step 5: Adding a Post

Once you have at least one Author defined in `authors.yml` you can add your first Post.

Start by creating a new folder in `content/posts`. You can name it anything you like but we recommend including the date at the front to organize your posts. Once you've created your folder you can add an `index.mdx` file and an `images` folder.

`/content/posts/2020-01-01/index.mdx`

```yml
---
title: Why Narative loves Next.js
author: Dennis Brotzky
date: 2019-04-27
hero: ./images/narative-gatsby-hero.jpg
excerpt: This is a love story about Narative and Next.js
---
# And then under the heading YML you can insert any MDX you like
# like headings, links, code, images, etc
# This will show up in the body of your post
# ...
```

### Step 6: Configuring siteMetadata

In order to configure the theme to properly generate the pages and meta tags you must add specific data to `siteMetadata`.

The fields that are unique to Novela are `hero.heading`, `hero.maxWidth`, and `social`.

Add your Site Metadata to the `site.yml` file.

```yaml
// site.yml
---
title: Novela by Tinia Labs
name: Tinia Labs & Narative
siteUrl: https://novela.narative.co
description: This is my description that will be used in the meta tags and
  important for search results
hero:
  heading: Welcome to Novela, the simplest way to start publishing with Next.js.
  maxWidth: 652
social:
  - name: twitter
    url: https://twitter.com/narative
  - name: github
    url: https://github.com/narative
  - name: instagram
    url: https://instagram.com/narative.co
  - name: linkedin
    url: https://www.linkedin.com/company/narative/
  - name: dribbble
    url: https://dribbble.com/narativestudio
blog:
  copyrightYear: 2021
  contentPosts: content/posts
  contentAuthors: content/authors
  basePath: /
  authorsPage: true
  pathPosts: 'a'
  pathAuthors: 'authors'
  pageLength: 6
  sources:
    local: true
    contentful: false
manifest:
  appName: Novela by Narative
  appShortName: Novela
  appDescription: Novela by Narative
  start_url: /
  background: "#fff"
  theme_color: "#fff"   
  display: standalone
  alwaysEmitFull: false
googleAnalytics:
  trackingId: UA-118232427-3
```

### You can now run your site

Once all steps have been completed you can run your site. In the root of your project run `yarn dev`.

If you ran into problems you can reference the [example repository](https://github.com/tinialabs/next-starter-novela) or create an issue.

<br />

- [Data Sources](#data-sources)

# Data Sources

With the flexibility of Next.js, Novela is able to pull different data sources to build your website. Right now we support your local file system. All data sources can be combined together or used separately.

### Local

Local is the default data source for Novela. Write MDX and YAML in order to generate posts and authors. This is the fastest and simplest way to get started.

To learn how to use the local file system, read the [Installation](#installation) steps.

### Contentful

Contentful and other cloud content management systems provide the flexibility of a headless CMS which allows you to write content without committing new files and working in a text editor. The setup process is simple if you are familiar with Contentful.

You will need to setup your Contentful space and import the Novela model.

Then fork the `next-lib-content` and instead of reading the posts from the file system, read them from your CMS.

This is currently beyond the scope of this Next.js starter.

# Customization

Once you've created the Logo component it should automatically appear in your site.

The technique we have used is called Meta Repositories and Yarn Workspaces and is easier than Gatsby component shadowing.  Just fork `next-theme-novela` and `next-lib-content`, update the `.meta` file, and run the install again. 

### Enabling Author pages

By default Author pages are  enabled. They can be disabled through the site option `authorsPage`. If you decided to enable Author pages please make sure you have all the required for each author you add.

### Changing styles

Novela allows you to change the default theme styling by updating the [theme-ui](https://theme-ui.com/) values. If you're familiar with Styled Components or Emotion it's the same as adapting the theme you pass to `ThemeProvider`.

### Using images

Images can be added to Posts and customized to fit your content. Define a regular Markdown image that will default to Small or write HTML to customize the sizes. All images can be clicked to zoom.

```html
![This is the alt text for small image](./images/small.jpg)

<div className="Image__Small">
  <img src="./images/small.jpg" alt="This is the alt text small image" />
</div>

<div className="Image__Medium">
  <img src="./images/medium.jpg" alt="This is the alt text medium image" />
</div>

<div className="Image__Large">
  <img src="./images/large.jpg" alt="This is the alt text large image" />
</div>
```

| Size   |   Class Name    |          Description           |
| ------ | :-------------- | :---------------------------- |
| small  | Image\_\_Small  |       Width of the text       |
| medium | Image\_\_Medium | Larger than width of the text |
| large  | Image\_\_Large  |       Full width image        |

### Adding your logo

Your logo must be in SVG (vector) format in order to add it to the theme. This is required because we will be making a React component containing your SVG Logo.

Start by creating the component file at:

```
  novela-site
  └── src
    └── @narative
      └── gatsby-theme-novela
        └── components
          └── Logo
            └── index.js
```

It is important you create the exact folder structure so Next.js knows to shadow this component. Once the file is created you can create your Logo component.

```jsx
import React from 'react';

/**
 * Paste in your SVG logo and return it from this component.
 * Make sure you have a height set for your logo.
 * It is recommended to keep the height within 25-35px.
 * Logo comes with a property value called `fill`. `fill` is useful 
 * when you want to change your logo depending on the theme you are on. 
 */
export default function Logo({ fill }) {
  return (
    <svg viewBox="0 0 106 28" height="30px">
      <path d="M62.9 12h2.8v10...." />
      <path fill={fill} d="M25 14h-..." />
      <path d="M14 0C6.3..." fill="#639" />
    </svg>
  );
}
```


# Data Models

## Theme Options

It is recommended to use the Default options, but if your project requires something else you can configure them to your need.

| Option                 |     Default     |                                                             Description                                                             |
| ---------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| contentPosts           |  content/posts  |                                          Define where you want to pull your Post data from                                          |
| contentAuthors         | content/authors |                                         Define where you want to pull your Author data from                                         |
| authorsPage            |      false      |                                                         Create Author pages                                                         |
| authorsPath            |    /authors     |                                                   Where should Author pages live?                                                   |
| rootPath               |        /        |                                                   Define the index of your site                                                     |
| basePath               |        /        |                      Where should the site be served from? `/blog` will change all paths to start with `/blog`                      |
| pageLength               |        6        |                      How many posts should be shown per page                      |
| articlePermalinkFormat |      :slug      | Define the format of the article permalink. Possible values: `:slug`, `:year`, `:month`, `:day`. Example: `:year/:month/:day/:slug` |
| mailchimp              |      false      |                                             Enable Mailchimp subscriptions on each Post                                             |
| sources.local          |      true       |                                                Enable local file system data source                                                 |
| sources.contentful     |      false      |                                                    Enable Contentful data source                                                    |

[View Theme option example](https://github.com/tinialabs/next-starter-novela/blob/master/next-config.js#L36)


## Author

[View Author example](https://github.com/tinialabs/next-starter-novela/blob/master/content/authors/authors.yml)

| Key      | Required |  Type   |                                                                 Description                                                                 |
| -------- | :------: | :----- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| name     | required | String  |                                The Author's full name which is used should be used as a reference in Posts                                 |
| bio      | required | String  |                                            The Author's bio which is displayed on the home page                                            |
| avatar   | required |  Image  |                                                            The Author's avatar                                                             |
| featured | optional | Boolean |                                              If `true` the Author will appear on the homepage                                              |
| slug     | optional | String  |                          Override the autogenerated slug based on the Author's name. Do not include any slashes.                           |
| social   | required |  Array  | A list of social accounts and urls. [View supported icon/name combinations](https://github.com/narative/gatsby-theme-novela/blob/master/%40narative/gatsby-theme-novela/src/components/SocialLinks/SocialLinks.tsx#L15) |

```yml
- name: Dennis Brotzky
  bio: |
    Written by You. This is where your author bio lives. Share your work, your
    joys and of course, your Twitter handle.
  avatar: ./avatars/dennis-brotzky.jpg
  featured: true
  social:
    - url: https://github.com
    - url: https://twitter.com

- name: Thiago Costa
  bio: |
    Written by You. This is where your author bio lives. Share your work, your
    joys and of course, your Twitter handle.
  avatar: ./avatars/thiago-costa.png
```

## Post

| Key          | Required |    Type    |                                          Description                                          |
| ------------ | :------: | :-------- | :------------------------------------------------------------------------------------------- |
| title        | required |   String   |                  Used as title and generates a default slug. Must be unique.                  |
| slug         | optional |   String   |                Define a custom slug that will override the default title slug.                |
| author       | required | String Ref | Must **match** a defined Author name. Co-author posts by adding comma seperated Author names. |
| date         | required |    Date    |                                       YYYY-MM-DD format                                       |
| hero         | required |   Image    |                               1200px minimum width recommended                                |
| excerpt      | required |   String   |                                      140 character limit                                      |
| subscription | optional |   String   |          If mailchimp is enabled disable the subscription box on an individual Post           |
| secret       | optional |  Boolean   |           If secret the Post will not appear in paginated lists. Defaults to false.           |

[View Post example](https://github.com/tinialabs/next-starter-novela/blob/master/content/posts/2019-04-31-understanding-the-gatsby-lifecycle/index.mdx)

```yml
# novela-site/content/posts/2020-01-01/index.mdx
---
title: Why Narative loves Next.js
author: Dennis Brotzky, Thiago Costa, Brad Tiller
date: 2019-04-27
hero: ./images/narative-gatsby-hero.jpg
excerpt: This is a love story about Narative and Next.js
---
# And then under the heading YML you can insert any MDX you like
# like headings, links, code, images, etc
# This will show up in the body of your post
# ...
```

## Site Metadata

| Key           | Required |    Type    |                                                                     Description                                                                     |
| ------------- | :------: | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| title         | required |   String   |                                                            Used for the <title></title>                                                             |
| name          | required | String Ref |                                           Used in multiple locations including meta tags and site footer                                            |
| siteUrl       | required |    Date    |                                                                  Used in meta tags                                                                  |
| description   | required |   String   |                                                                  Used in meta tags                                                                  |
| hero.heading  | required |   String   |                                                                  Used in the Hero                                                                   |
| hero.maxWidth | optional |   number   |                                                          Used in the Hero. Defaults to 652                                                          |
| social        | required |   Array    | [View supported icon/name combinations](https://github.com/narative/gatsby-theme-novela/blob/master/%40narative/gatsby-theme-novela/src/components/SocialLinks/SocialLinks.tsx#L15). `url` is required and the icon is chosen based on the url. If you also provide `name`, then the icon will be the same as the name you provided as long as the name equals one of the supported icons (See example bellow). Used in site footer and meta tags |

## Why use Novela?

There are many Next.js themes to choose from. Here’s why we think you won’t regret choosing Novela:

### Multiple Homepage Layouts

Choose between a variable width grid or a simpler list style to display each story.

### Toggleable Light and Dark Mode

Out of the box, Novela includes both light and dark designs that can be toggled by the user anywhere across the site.

<img src="https://raw.githubusercontent.com/tinialabs/next-theme-novela/master/.github/static/gatsby-theme-novela-light-dark.gif" alt="gatsby-novela-theme light dark theme demonstration" />

### Simple Customization with [Theme UI](https://theme-ui.com/)

Consistent, easy-to-read code lets you quickly customize every color and setting.

### Show code effortlessly

High quality embedded codeblocks that make authoring technical blog posts a breeze.

### Highlight-to-Share

Users can select text within an article to copy or share to platforms like Twitter and LinkedIn.

<img src="https://raw.githubusercontent.com/tinialabs/next-theme-novela/master/.github/static/gatsby-theme-novela-share.jpg" alt="gatsby-novela-theme light dark theme demonstration" />

### Read Time and Progress

Read time is automatically generated for each article based on length, with an animated bar tracking the reader’s progress through each piece.

### Accessibility in Mind

Navigable by cursor or keyboard, readable via screens and screen readers, Novela ensures everyone on the web can read what you write.

<img src="https://raw.githubusercontent.com/tinialabs/next-theme-novela/master/.github/static/gatsby-theme-novela-accessibility.gif" alt="gatsby-novela-theme accessibility demonstration" />

# The Future

This project is early in development and we are interested in creating an even more extensible experience, and increased out-of-box functionality, including:

- Data sources such as Prismic, Sanity, Contentful, Netlify CMS, and others
- Built in search with Algolia or similar
- Tags, categories, and more
- More theme variations
- More customization options

<div>
<a href="https://gatsby-theme-novela.netlify.com" target="_blank">
<img src="https://raw.githubusercontent.com/tinialabs/next-theme-novela/master/.github/static/gatsby-theme-novela-cta-demo.jpg" alt="gatsby-novela-theme live demo" width="295px" />
</a>
</div>
