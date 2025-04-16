// Note: This is based on AbstractTechnology. The backend might return concrete implementations.
// We might need to add a type discriminator field (e.g., 'technologyType') if needed.
export interface AbstractTechnology {
  name: string;
  dependencyKey: string;
  filesNames: string[];
  filesPaths: string[];
  // The actual methods (detectDependencies, extractDependencies, updateDependencies, copy)
  // are backend logic and won't be directly represented here.
}
