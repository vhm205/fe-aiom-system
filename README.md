# 🚀 AIOM Admin Dashboard

A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS. Tailwick provides a comprehensive suite of UI components and features for building professional web applications.

## 🌟 Introduction

Tailwick is a feature-rich admin dashboard template that combines the power of React with the utility-first approach of Tailwind CSS. It's designed to help developers quickly build beautiful, responsive admin interfaces with minimal effort.

## ⚙️ Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Basic knowledge of React and TypeScript

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/tailwick-react.git
cd tailwick-react
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Create a `.env` file in the root directory and configure your environment variables:
```env
REACT_APP_ENV=development
REACT_APP_API_VERSION=v1
REACT_APP_API_URL=http://localhost:2005/api
REACT_APP_SERVER_URL=http://localhost:2005
```

4. Start the development server:
```bash
yarn start
# or
npm start
```

## 🎯 Features

- 🎨 **Modern UI Components**: Extensive collection of pre-built components
- 📱 **Responsive Design**: Fully responsive layout that works on all devices
- 🌙 **Dark Mode**: Built-in dark mode support
- 🔒 **Authentication**: Ready-to-use authentication system
- 📊 **Data Visualization**: Integration with ApexCharts for beautiful charts
- 📅 **Calendar**: Full calendar integration with event management
- 📝 **Rich Text Editor**: Integrated CKEditor for content editing
- 🌐 **Internationalization**: Multi-language support with i18next
- 🎭 **Theme Customization**: Easy theme customization with Tailwind CSS
- 📦 **State Management**: Redux integration for state management

## 💻 Usage

### Basic Component Usage

```tsx
import { Button } from 'Common/Components/Button';

function MyComponent() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Click Me
    </Button>
  );
}
```

### Theme Configuration

Customize the theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.blue[500],
        secondary: colors.purple[500],
      },
    },
  },
};
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your PR adheres to the following guidelines:
- Follow the existing code style
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass

## 🚀 Deployment

To deploy the application:

1. Build the production bundle:
```bash
yarn build
# or
npm run build
```

2. Using Docker:
```bash
docker build -t tailwick-react .
docker run -p 80:80 tailwick-react
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- Author: Minh Moment
- Email: minhvh.tech@gmail.com
- Website: https://aiom.vercel.app
- GitHub: [@vhm205](https://github.com/vhm205)

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com)
- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- All other open-source libraries used in this project

---

Made with ❤️ by Minh Moment
