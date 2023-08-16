export type GithubInformationStructure = GithubInformation[];

interface GithubInformation {
  dir: string;
  files: GithubFiles[];
}

interface GithubFiles {
  dir?: string;
  files?: GithubSubFiles[];
  name?: string;
  type?: string;
  url?: string;
}

export interface GithubSubFiles {
  name: string;
  type: string;
  url: string;
  parentFolder: string;
}

export interface GithubTypeFiles {
  imgs: GithubSubFiles[];
  letters: GithubSubFiles[];
}

// Tipos de datos que utiliza los contextos de la web

export interface TYPE_CONTEXT_GITHUB {
  photos: TYPE_GITHUB_FILE[];
  letters: TYPE_GITHUB_FILE[];
  githubData: TYPE_GITHUB_TYPE_FILES;
  lettersContent: TYPE_CONTENT_LETTER[];
}

export interface TYPE_CONTENT_LETTER {
  name: string;
  parentFolder: string;
  content: string;
  url: string;
  cover?: string;
}

export interface TYPE_GITHUB_FILE {
  name: string;
  type: string;
  url: string;
  parentFolder: string;
  cover?: string;
}

export interface TYPE_GITHUB_TYPE_FILES {
  imgs: TYPE_GITHUB_FILE[];
  letters: TYPE_GITHUB_FILE[];
}

// Tipos de datos que utilizan los componentes
export interface TYPE_BASE_COMPONENT {
  children: React.ReactNode;
}
