## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Branch Workflow

This repo uses a two-step release flow:

- `testing` is the preview/staging branch
- `main` is the production branch

Recommended flow:

1. Create a feature branch from `testing`.
2. Build your change and commit it there.
3. Merge that feature branch into `testing`.
4. Push `testing` and review the deployed result yourself.
5. If everything looks good, merge `testing` into `main`.

Example:

```bash
git checkout testing
git pull origin testing
git checkout -b feature/my-change

# make changes
git add -A
git commit -m "Describe the change"
git push -u origin feature/my-change

git checkout testing
git merge feature/my-change
git push origin testing

# after reviewing the testing deployment
git checkout main
git pull origin main
git merge testing
git push origin main
```

## Automation

GitHub Actions now validates:

- pushes to `testing`
- pushes to `main`
- pull requests targeting `testing`
- pull requests targeting `main`

The workflow runs:

- `npm ci`
- `npm run lint`
- `npm run build`

## Deploy on Vercel

Recommended Vercel setup:

1. Keep `main` as the Production Branch.
2. Push `testing` whenever you want to review a staging version.
3. Use Vercel preview deployments for the `testing` branch.
4. After approval, merge `testing` into `main` for production.

If you want a fixed staging URL, map a staging domain or branch-specific environment in Vercel to `testing`.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
