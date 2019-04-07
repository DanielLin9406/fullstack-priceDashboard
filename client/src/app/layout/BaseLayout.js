import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { seo } from '@app/const/const';


class BaseLayout extends Component {
  getAttrs = (rest) => (
    {
      lang: 'en',
      itemscope: undefined,
      itemtype: `http://schema.org/${rest.schema || 'WebPage'}`
    }
  )
  
  getTitle = (rest) => (
    rest.title ? rest.title + seo.defaultSep + seo.defaultTitle : seo.defaultTitle
  )

  getLinks = (pathname) => (
    [{
      rel: 'canonical',
      href: seo.SITE_URL + pathname      
    }]
  )

  getMetaTags(
    {
      title,
      description,
      image,
      contentType,
      twitter,
      noCrawl,
      published,
      updated,
      category,
      tags
    },
    pathname
  ) {
    const theTitle = title
      ? (title + seo.defaultSep + seo.defaultTitle).substring(0, 60)
      : seo.defaultTitle;
    const theDescription = description
      ? description.substring(0, 155)
      : seo.defaultDescription;
    const theImage = image ? `${SITE_URL}${image}` : seo.defaultImage;

    const metaTags = [
      { itemprop: 'name', content: theTitle },
      { itemprop: 'description', content: theDescription },
      { itemprop: 'image', content: theImage },
      { name: 'description', content: theDescription },
      // { name: 'twitter:card', content: 'summary_large_image' },
      // { name: 'twitter:site', content: defaultTwitter },
      // { name: 'twitter:title', content: theTitle },
      // { name: 'twitter:description', content: theDescription },
      // { name: 'twitter:creator', content: twitter || defaultTwitter },
      // { name: 'twitter:image:src', content: theImage },
      // { property: 'og:title', content: theTitle },
      // { property: 'og:type', content: contentType || 'website' },
      // { property: 'og:url', content: SITE_URL + pathname },
      // { property: 'og:image', content: theImage },
      // { property: 'og:description', content: theDescription },
      // { property: 'og:site_name', content: defaultTitle },
      // { property: 'fb:app_id', content: FACEBOOK_APP_ID }
    ];

    if (noCrawl) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' });
    }
    if (published) {
      metaTags.push({ name: 'article:published_time', content: published });
    }
    if (updated) {
      metaTags.push({ name: 'article:modified_time', content: updated });
    }
    if (category) {
      metaTags.push({ name: 'article:section', content: category });
    }
    if (tags) {
      metaTags.push({ name: 'article:tag', content: tags });
    }

    return metaTags;
  }  

  render(){
    const { children, id, className, ...rest } = this.props;
  
    return (
      <main id={id} className={className}>
        <Helmet
          htmlAttributes={this.getAttrs(rest)}
          title={this.getTitle(rest)}
          link={this.getLinks(rest, this.props.location.pathname)}
          meta={this.getMetaTags(rest, this.props.location.pathname)}
        />
        {children}
      </main>
    )
  }
}

export default withRouter(BaseLayout);