import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// reference: https://stackoverflow.com/questions/14438187/javascript-filereader-parsing-long-file-in-chunks
export const parseFile = (
  file: Blob,
  callback: (chunk: string) => void,
  doneCallback?: () => void
) => {
  let fileSize = file.size;
  let chunkSize = 64 * 1024; // bytes
  let offset = 0;
  let chunkReaderBlock = function (
    _offset: number,
    length: number,
    _file: Blob
  ) {
    let r = new FileReader();
    let blob = _file.slice(_offset, length + _offset);
    r.onload = readEventHandler;
    r.readAsText(blob);
  };

  let readEventHandler = function (evt: ProgressEvent<FileReader>) {
    if (evt.target?.error == null && evt.target?.result != null) {
      offset += (evt.target.result as string).length;
      callback(evt.target.result as string); // callback for handling read chunk
    } else {
      console.log("Read error: " + evt.target?.error);
      return;
    }
    if (offset >= fileSize) {
      console.log("Done reading file");
      doneCallback?.();
      return;
    }

    // of to the next chunk
    chunkReaderBlock(offset, chunkSize, file);
  };

  // now let's start the read with the first block
  chunkReaderBlock(offset, chunkSize, file);
};

export const getFirstNRecords = (data: string, n: number) => {
  return data.split("\n").slice(0, n).join("\n");
};

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const csvToJson = (csv: string) => {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",");
  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    const currentline = lines[i].split(",");
    if (currentline.length === 1) continue; // skip empty lines
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
};
