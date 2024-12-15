# Pixa Table

Pixa Table is a powerful and flexible table library for React applications. It provides a variety of features such as resizable columns, selectable rows, expandable rows, custom pagination, and more. It is built on top of [@tanstack/react-table v8](https://tanstack.com/table/latest/docs/introduction), and all of the API from it are still available. Pixa Table is just a wrapper on top of it, with some styling of the table.

## Installation

To install Pixa Table, you need to add it as a dependency to your project:

```bash
npm install @marioandres717/pixa-table
```

or

```bash
yarn add @marioandres717/pixa-table
```

## Usage

Here is a basic example of how to use Pixa Table in your project:

```tsx
import React from 'react';
import { PixaTable, usePixaTable } from '@marioandres717/pixa-table';

const MyTableComponent = () => {
  const config = {
    data: [], // Required field
    columns: [], // Required field
    theme: 'light',
  };
  const table = usePixaTable(config);

  return <PixaTable table={table} />;
};

export default MyTableComponent;
```

## Storybook Examples

You can explore various examples and configurations of Pixa Table in the Storybook. Here are some of the available stories:

- **Default Table**: Basic usage of the table.
- **Inside Resizable Container**: Table inside a resizable container.
- **Loading Skeleton**: Table with a loading skeleton.
- **Custom Cell**: Table with custom cell rendering.
- **Custom Header Filter**: Table with custom header filters.
- **Custom Layout**: Table with a custom layout.
- **Custom Page Size**: Table with custom page size options.
- **Custom Pagination**: Table with custom pagination controls.
- **Expandable Rows**: Table with expandable rows.
- **Global Filter**: Table with a global filter.
- **Many Columns**: Table with many columns.
- **Row Actions**: Table with row actions.
- **Selectable Rows**: Table with selectable rows.
- **Virtualization Disabled**: Table with virtualization disabled.
- **Dynamic Row Height**: Table with dynamic row heights.
- **Custom Scrollable Container**: Table with a custom scrollable container.
- **Table Actions**: Table with additional actions.

## Private Package Registry

The compiled binaries of the library are stored in a private package registry on GitHub. To push locally to the registry, you need to configure your `.npmrc` file with an access token from GitHub.

Create or update your `.npmrc` file with the following content:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@your-github-username:registry=https://npm.pkg.github.com/
```

Replace `YOUR_GITHUB_TOKEN` with your GitHub personal access token.

## Release Workflow

After creating a pull request, a set of GitHub Actions are run to ensure code quality and build the project. Once the pull request is merged into the `main` branch, a new version of the library is created using `semantic-release`.

The release workflow includes the following steps:

1. Code quality checks (linting, formatting, testing) are run on every pull request.
2. After merging to `main`, the release workflow is triggered.
3. The release workflow builds the project and publishes a new version to the private package registry on GitHub.

## Scripts

Here are some useful scripts defined in the `package.json`:

- `start`: Starts the Storybook.
- `build`: Builds the project for production.
- `lint`: Runs ESLint to check for linting errors.
- `format:check`: Checks the code formatting using Prettier.
- `format:fix`: Fixes the code formatting using Prettier.
- `test`: Runs the tests using Vitest.
- `test:watch`: Runs the tests in watch mode.
- `test:coverage`: Generates test coverage reports.
- `test-storybook`: Runs the Storybook tests.

## License

This project is licensed under the MIT License.