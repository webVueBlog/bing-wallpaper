import { IImg } from "./types.ts";

export async function createReadme(image: IImg): Promise<string> {
  const readme = await Deno.readTextFile("./README.md");
  return readme.replace(
    /<!-- BEGIN -->[\W\w]*<!-- END -->/,
    createImageRow(image)
  );
}

export function createImageRow(image: IImg): string {
  return `<!-- BEGIN -->
<!--  ${Date()} -->
  ![${image.copyright}](${image.previewUrl})Today: [${image.date}${image.copyright}](${image.url})
  
<!-- END -->`;
}

export function createArchive(image: IImg): string {
  return `\n| ${image.date} | ![${image.copyright}](${image.previewUrl}) | [下载](${image.url}) |`;
}

