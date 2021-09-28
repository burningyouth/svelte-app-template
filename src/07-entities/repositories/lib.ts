const normalizeDate = (date: DateTimeISO) =>
  new Intl.DateTimeFormat("ru", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export const normalizeRawRepository = (
  repository: RawRepository
): Repository => {
  return {
    ...repository,
    updatedAt: normalizeDate(repository.updatedAt),
    createdAt: normalizeDate(repository.createdAt),
    repositoryTopics: repository.repositoryTopics.nodes.map((node) => ({
      name: node.topic.name,
      url: node.url,
    })),
  };
};

export const normalizeViewerRepositoryResponse = (
  response: ViewerRepositoriesResponse
): Repositories => {
  const normalizedRepositories = response.viewer.repositories.nodes.map(
    (item) => normalizeRawRepository(item)
  );

  return {
    totalCount: response.viewer.repositories.totalCount,
    nodes: normalizedRepositories,
  };
};
