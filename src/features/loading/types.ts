export type IsLoading = boolean;

export type LoadingOptions = {
  showSkeleton?: boolean;
};

export interface LoadingState {
  isLoading: IsLoading;
}
