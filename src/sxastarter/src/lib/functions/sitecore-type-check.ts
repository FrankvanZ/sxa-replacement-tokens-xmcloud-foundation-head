import { Field, Item } from '@sitecore-jss/sitecore-jss-nextjs';

export function isField(field: Field | Item | Item[]): field is Field {
  if (field === null) return false;
  if (typeof field !== 'object') return false;
  if (Array.isArray(field)) return false;

  return (field as Field).value !== undefined;
}

export function isItem(field: Field | Item | Item[]): field is Item {
  if (field === null) return false;
  if (typeof field !== 'object') return false;
  if (Array.isArray(field)) return false;

  return (field as Item).fields !== undefined;
}

export function isItemArray(field: Field | Item | Item[]): field is Item[] {
  if (field === null) return false;
  if (!Array.isArray(field)) return false;

  return (field as Item[]).every(isItem);
}

export function isTextField(field: Field): boolean {
  return typeof field.value === 'string';
}
