import { Mock } from './mocks';

export type ArticleData = { title: string; authors: string; cover: string };

const sleep = (ms: number): Promise<void> => new Promise((resolve) => window.setTimeout(resolve, ms));

const getArticles = (): Promise<ArticleData[]> => sleep(1000).then(() => Mock.articles);

export const Webservice = { getArticles };
