export interface IImg {
  url: string; // 链接
  previewUrl: string; // 预览
  date: string; //容器
  copyright: string;
}

export interface IResponse {
  images: {
    startdate: string;
    fullstartdate: string;
    enddate: string;
    url: string;
    urlbase: string;
    copyright: string;
    copyrightlink: string;
    title: string;
    quiz: string;
    wp: boolean;
    hsh: string;
    [key: string]: any;
  }[];
  [key: string]: any;
}
