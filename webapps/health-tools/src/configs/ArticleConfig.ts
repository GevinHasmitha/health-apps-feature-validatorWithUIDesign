export enum ArticleType {
  article = "Article",
  blog = "Blog",
}

export interface IArticle {
  title: string;
  link: string;
  type?: ArticleType;
}

export const articles: IArticle[] = [
  {
    title:
      "Four Ways that API-led Interoperability Will Drive Digital Healthcare Innovation",
    link: "https://aithority.com/technology/life-sciences/four-ways-that-api-led-interoperability-will-drive-digital-healthcare-innovation/",
  },
  {
    title: "How APIs are Aiding the Healthcare Industry in the 21st Century",
    link: "https://wso2.com/blogs/thesource/how-apis-are-aiding-the-healthcare-industry-in-the-21st-century/",
    type: ArticleType.blog,
  },
  {
    title:
      "Healthcare Innovation Through The Lens Of Interoperability And Privacy",
    link: "https://www.forbes.com/sites/forbestechcouncil/2021/04/15/healthcare-innovation-through-the-lens-of-interoperability-and-privacy/?sh=3da9fd4f1665",
  },
  {
    title: "The Healthcare API Ecosystem: Looking Beyond The CMS Rule",
    link: "https://www.forbes.com/sites/forbestechcouncil/2020/09/03/the-healthcare-api-ecosystem-looking-beyond-the-cms-rule/?sh=67ab81243e13",
  },
];
