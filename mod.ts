#!/usr/bin/env -S deno run --unstable --allow-net --allow-read --allow-write --import-map=import_map.json mod.ts
import { IResponse, IImg } from "./types.ts";
// import { createReadme, createArchive } from "./utils.ts";
import { createReadme } from "./utils.ts";

const BING_URL = "https://cn.bing.com";
const BING_API = `${BING_URL}/HPImageArchive.aspx?format=js&idx=0&n=1&nc=1615820180559&pid=hp&uhd=1&uhdwidth=3840&uhdheight=2160`;

const response = await fetch(BING_API);

if (!response.ok) {
  console.error(response.statusText);
  Deno.exit(-1);
}

const { images }: IResponse = await response.json();
const [image] = images;
const { url, enddate, copyright } = image;
// 图片地址
const fullUrl = `${BING_URL}${url.split("&")[0]}`;
// 图片的展示日期
const date = enddate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");

const imageInfo: IImg = {
  url: fullUrl,
  previewUrl: fullUrl + "&pid=hp&w=1000",
  copyright,
  date,
};

// &h=216&rs=1&c=4

// ![](https://cn.bing.com/th?id=OHR.PawneeOwls_EN-US5086668928_UHD.jpg&w=1000)Today: [Burrowing owl chicks gaze out from among flowers near the Pawnee National Grassland in Colorado (© Roberta Olenick/Alamy)](https://cn.bing.com/th?id=OHR.PawneeOwls_EN-US5086668928_UHD.jpg)

// 更新 README.md
const readme = await createReadme(imageInfo);
await Deno.writeTextFile("./README.md", readme);

// 更新 archives
// const archiveText = createArchive(imageInfo);
// await Deno.writeTextFile("./archives.md", archiveText, { append: true });
