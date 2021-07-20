export enum Semver {
  Major = "major",
  Minor = "minor",
  Patch = "patch",
}

export interface Gitmoji {
  emoji: string;
  entity: string;
  code: string;
  description: string;
  name: string;
  semver: Semver | null;
}
