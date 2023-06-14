import { atom } from 'recoil';

export type ElementType = 'image' | 'text' | 'pdf' | 'avatar';

export type AllElements =
  | IImageElement
  | ITextElement
  | IPdfElement
  | IAvatarElement;

export interface IElement {
  id?: number;
  tempId?: string;
  url?: string;
  type: ElementType;
  name: string;
  display: 'inline' | 'side' | 'page';
  forId?: string;
}

export interface IImageElement extends IElement {
  type: 'image';
  content?: ArrayBuffer;
  size?: 'small' | 'medium' | 'large';
}

export interface IAvatarElement extends IElement {
  type: 'avatar';
  content?: ArrayBuffer;
}

export interface ITextElement extends IElement {
  type: 'text';
  content?: string;
  language?: string;
}
export interface IPdfElement extends IElement {
  type: 'pdf';
  content?: string;
  url?: string;
}

export type IElements = IElement[];

export const elementState = atom<IElements>({
  key: 'Elements',
  default: []
});

export const sideViewState = atom<IElement | undefined>({
  key: 'SideView',
  default: undefined
});
