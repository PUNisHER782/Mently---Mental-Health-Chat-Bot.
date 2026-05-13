# Contributing to Mently

Thank you for your interest in contributing to Mently! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

1. **Check existing issues** on GitHub
2. **Create a detailed bug report** including:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment info (OS, Node version, etc.)

### Suggesting Features

1. **Check existing issues** to avoid duplicates
2. **Describe the feature** clearly
3. **Explain the use case** and benefits
4. **Provide examples** if possible

### Code Contributions

#### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/mently.git
   cd mently
   ```

3. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Follow the setup instructions in README.md

#### Code Style

- **TypeScript**: Use strict mode
- **Naming**: camelCase for variables/functions, PascalCase for components/classes
- **Formatting**: Use Prettier (eslint handles this)
- **Comments**: Add meaningful comments for complex logic
- **Imports**: Organize imports alphabetically

#### Backend Guidelines

```typescript
// ✅ Good
const fetchUserData = async (userId: string): Promise<IUser> => {
  // Implementation
};

// ✗ Bad
const fetch_user_data = (userId) => {
  // Implementation
};
```

#### Frontend Guidelines

```typescript
// ✅ Good
export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// ✗ Bad
const MyComponent = (props) => {
  return <div>{props.prop1}</div>;
};
```

#### Commit Messages

Follow conventional commits:

```
feat: add new mood tracking feature
fix: resolve chat message timing issue
docs: update API documentation
style: format code with prettier
refactor: reorganize component structure
test: add unit tests for auth
chore: update dependencies
```

#### Pull Request Process

1. **Update** the README.md if needed
2. **Write/update** tests for new features
3. **Ensure** all tests pass:
   ```bash
   npm run lint
   npm run build
   ```

4. **Create** a descriptive PR with:
   - Clear title
   - Description of changes
   - Related issues
   - Screenshots (if UI changes)

5. **Address** review comments
6. **Ensure** CI/CD passes

## 📋 Development Checklist

Before submitting a PR:

- [ ] Code follows style guide
- [ ] All tests pass (`npm run lint`, `npm run build`)
- [ ] Comments added for complex logic
- [ ] README updated if needed
- [ ] CHANGELOG updated
- [ ] No console.log statements left
- [ ] Error handling implemented
- [ ] Mobile responsive (if UI change)
- [ ] Accessibility considered

## 🧪 Testing

### Backend Testing

```bash
cd server
npm run lint
npm run build
```

### Frontend Testing

```bash
cd client
npm run lint
npm run build
```

## 📚 Documentation

When contributing:

1. Update relevant README files
2. Add code comments for complex logic
3. Document new API endpoints
4. Update CHANGELOG.md
5. Add JSDoc comments to functions

### Documentation Template

```typescript
/**
 * Fetches user data from the database
 * @param userId - The unique identifier of the user
 * @returns Promise resolving to user object
 * @throws Error if user not found
 */
export const fetchUser = async (userId: string): Promise<IUser> => {
  // Implementation
};
```

## 🔄 Pull Request Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Address feedback** if requested
4. **Final approval** before merge
5. **Squash and merge** into main

## 📊 Area-Specific Guidelines

### Backend (`/server`)
- Update types/interfaces
- Add error handling
- Include logging
- Write unit tests

### Frontend (`/client`)
- Ensure TypeScript types
- Mobile responsive design
- Accessibility compliance
- Reusable components

### Documentation
- Clear and concise
- Code examples included
- Updated with changes
- Proofread for grammar

## 🚫 Code Review Criteria

Your code will be reviewed for:

- ✅ Functionality does what's intended
- ✅ No breaking changes
- ✅ Performance not degraded
- ✅ Security best practices
- ✅ Code quality and style
- ✅ Tests passing
- ✅ Documentation complete

## 🏆 Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in CHANGELOG
- Recognized in release notes

## ❓ Questions?

- Check existing GitHub issues
- Review documentation
- Start a GitHub discussion
- Contact maintainers

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions help make Mently better for everyone!

---

**Happy contributing! 🚀**
