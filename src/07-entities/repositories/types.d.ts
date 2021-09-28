type RawRepository = {
  name: string;
  createdAt: DateTimeISO;
  updatedAt: DateTimeISO;
  homepageUrl: URI;
  resourcePath: URI;
  url: URI;
  description: string;
  repositoryTopics: {
    nodes: {
      topic: { name: string };
      url: URI;
    }[];
  };
};

type ViewerRepositoriesResponse = {
  viewer: {
    repositories: {
      totalCount: number;
      nodes: RawRepository[];
    };
  };
};

type RepositoryResponse = {
  repository: RawRepository;
};

type RepositoryTopic = {
  name: string;
  url: URI;
};

type Repository = {
  name: string;
  createdAt: DateTimeISO;
  updatedAt: DateTimeISO;
  homepageUrl: URI;
  resourcePath: URI;
  url: URI;
  description: string;
  deployment?: URI;
  repositoryTopics: RepositoryTopic[];
};
type RepositoryReadme = {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: URI;
  git_url: URI;
  html_url: URI;
  download_url: URI;
  _links: {
    git: URI;
    self: URI;
    html: URI;
  };
};

type Repositories = {
  totalCount: number;
  nodes: Repository[];
};
