# Contributing to Drug Symptom Lookup

Thank you for contributing! This project helps junior developers learn API integration and code review practices.

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Open http://localhost:3000

## Making a Contribution

1. Create a new branch: `git checkout -b issue-number/your-feature-name`
2. Make your changes (focus on `app/page.tsx` or `app/page.module.css`)
3. Test by searching for a drug (try: Aspirin, Ibuprofen, Lipitor)
4. Commit: `git commit -m "Description of your change"`
5. Push and open a Pull Request

## Pull Request Guidelines

Your PR should include:
- Clear title describing the change
- Brief explanation of what and why
- How you tested it
- Screenshots if you changed the UI

## Code Review Focus

We review PRs based on:

**1. User Experience**
- Does it work as expected?
- Is it easy to use?
- Are error messages helpful?

**2. Code Quality**
- Is the code readable?
- Are variable names clear?
- Is it well-structured?

**3. Data Safety**
When handling health data, consider:
- What kind of data is this? (Sensitive vs public)
- Do we trust user input too much?
- Are we leaking information in errors or logs?
- Could this feature be abused?

**4. Edge Cases**
- What happens with empty input?
- What if the API fails?
- What about unusual drug names?

## Questions?

- Check existing issues first
- Ask in the PR comments
- Tag a reviewer for help

Remember: We're all learning! Don't hesitate to ask questions.