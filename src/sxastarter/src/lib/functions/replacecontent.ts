import {
  LayoutServiceData,
  ComponentRendering,
  HtmlElementRendering,
  PlaceholdersData,
  ComponentFields,
  Field,
  Item,
  DictionaryPhrases,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { isField, isItem, isItemArray, isTextField } from './sitecore-type-check';

const regex = /\$\(\w.*?\)/g;

export function replaceContent(layout: LayoutServiceData, dictionary: DictionaryPhrases) {
  const placeholders = layout.sitecore.route?.placeholders;
  if (Object.keys(placeholders ?? {}).length === 0) {
    return;
  }
  if (placeholders) {
    Object.keys(placeholders).forEach((placeholder) => {
      placeholders[placeholder] = contentReplacePlaceholder(placeholders[placeholder], dictionary);
    });
  }
}

function contentReplacePlaceholder(
  components: Array<ComponentRendering | HtmlElementRendering>,
  dictionary: DictionaryPhrases
): Array<ComponentRendering | HtmlElementRendering> {
  {
    let result = components
      .map((component) => {
        const rendering = component as ComponentRendering;
        const fields = rendering.fields as ComponentFields;

        if (fields) contentReplaceFields(fields, dictionary);

        if (rendering.placeholders) {
          const placeholders = rendering.placeholders as PlaceholdersData;

          Object.keys(placeholders).forEach((placeholder) => {
            placeholders[placeholder] = contentReplacePlaceholder(
              placeholders[placeholder],
              dictionary
            );
          });
        }

        return component;
      })
      .filter(Boolean);

    return result;
  }
}
function contentReplaceField(field: Field, dictionary: DictionaryPhrases) {
  if (isTextField(field)) {
    let val = field.value as string;
    const match = regex.exec(val);
    if (match) {
      field.value = val.replace(regex, (matched) =>
        dictionary[matched] !== undefined ? dictionary[matched] : matched
      );
    }
  }
}

function contentReplaceFields(fields: ComponentFields, dictionary: DictionaryPhrases) {
  Object.keys(fields).forEach((field) => {
    if (isField(fields[field])) contentReplaceField(fields[field] as Field, dictionary);
    else if (isItem(fields[field])) contentReplaceItem(fields[field] as Item, dictionary);
    else if (isItemArray(fields[field])) contentReplaceItems(fields[field] as Item[], dictionary);
  });
}

function contentReplaceItem(item: Item, dictionary: DictionaryPhrases) {
  Object.keys(item.fields).forEach((field) => {
    contentReplaceField(item.fields[field] as Field, dictionary);
  });
}

function contentReplaceItems(items: Item[], dictionary: DictionaryPhrases) {
  items.forEach((item) => {
    contentReplaceItem(item, dictionary);
  });
}
