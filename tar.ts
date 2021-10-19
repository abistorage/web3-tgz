import got from "got";
import * as tt from "tar-transform";
import extractSubFolder from "./extractSubFolder";
import fetchGitDirectory from "./fetchGitDirectory";

export type PipelineItem =
  | NodeJS.ReadableStream
  | NodeJS.WritableStream
  | NodeJS.ReadWriteStream;

export function pipelineToDownloadGitPkg: PipelineItem[] {

  const tgzUrl = fetchGitDirectory(`${cii.GITHUB_ORG}/${cii.GITHUB_REPO}`, cii.GITHUB_COMMIT);

  return [
    got.stream(tgzUrl),
    tt.extract({ gzip: true }),
    ...pipelineToPkgTarEntries(pkgOpts),
    tt.pack({ gzip: true }),
  ];
}