import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { Plugin } from '..';
import { SitecorePageProps } from 'lib/page-props';
import { replaceContent } from '../../functions/replacecontent';

class ContentReplacePlugin implements Plugin {
  // This has been set to 4 for now, because the highest order number Sitecore defines is 3.
  // I opted to let this plugin execute AFTER Sitecore plugins have run
  order = 4;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (context.preview) return props;

    replaceContent(props.layoutData, props.dictionary);

    return props;
  }
}

export const contentReplacePlugin = new ContentReplacePlugin();
