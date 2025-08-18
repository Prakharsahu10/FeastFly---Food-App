# 🍔 FeastFly - Food Ordering App

<div align="center">

![FeastFly Logo](assets/images/logo.png)

**🚀 A Modern Food Ordering Experience Built with React Native & Expo**

[![Expo](https://img.shields.io/badge/Expo-~53.0.20-blue.svg?style=for-the-badge&logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Appwrite](https://img.shields.io/badge/Appwrite-Backend-red.svg?style=for-the-badge&logo=appwrite)](https://appwrite.io)

[Features](#-features) • [Screenshots](#-screenshots) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 🌟 Features

### 🔐 Authentication & User Management

- **Secure Sign Up/Sign In** with email and password
- **Auto-session management** with Appwrite backend
- **User profile management** with avatar support
- **Rate limiting protection** with retry mechanisms

### 🍕 Food Discovery & Ordering

- **Browse by Categories** - Burgers, Pizzas, Burritos, Sandwiches, Wraps, Bowls
- **Smart Search** with real-time filtering
- **Menu Customization** - Add toppings, sides, and extras
- **Shopping Cart** with quantity management
- **Order Summary** with detailed pricing

### 🎨 Modern UI/UX

- **Sleek Design** with Tailwind CSS styling
- **Smooth Animations** powered by React Native Reanimated
- **Responsive Layout** optimized for all screen sizes
- **Tab Navigation** with custom icons and transitions
- **Loading States** and error handling

### 🛡️ Performance & Reliability

- **Error Tracking** with Sentry integration
- **Optimized Images** with Expo Image
- **State Management** using Zustand
- **TypeScript** for type safety
- **ESLint** for code quality

---

## 📱 Screenshots

<div align="center">
  <img src="assets/images/login-graphic.png" width="250" alt="Login Screen" />
  <img src="assets/images/burger-one.png" width="250" alt="Home Screen" />
  <img src="assets/images/pizza-one.png" width="250" alt="Menu Screen" />
</div>

---

## 🚀 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)
- Appwrite server instance

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/Prakharsahu10/FeastFly---Food-App.git
   cd feastfly
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the root directory:

   ```env
   EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   SENTRY_AUTH_TOKEN=your_sentry_token
   ```

4. **Set up Appwrite Backend**

   - Create a new Appwrite project
   - Set up the required collections (see [Database Schema](#database-schema))
   - Configure authentication settings

5. **Seed the Database** (Optional)

   ```bash
   npm run seed
   ```

6. **Start the development server**

   ```bash
   npm start
   ```

7. **Run on your device**

   ```bash
   # For Android
   npm run android

   # For iOS
   npm run ios

   # For Web
   npm run web
   ```

---

## 🛠️ Tech Stack

### Frontend

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and toolchain
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based routing system
- **NativeWind** - Tailwind CSS for React Native
- **React Native Reanimated** - Smooth animations
- **Zustand** - Lightweight state management

### Backend

- **Appwrite** - Backend-as-a-Service
- **Appwrite Database** - NoSQL document database
- **Appwrite Authentication** - User management
- **Appwrite Storage** - File storage

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Sentry** - Error monitoring
- **TypeScript** - Static type checking

---

## 📊 Database Schema

### Collections

#### Categories

```typescript
interface Category {
  $id: string;
  name: string;
  description: string;
}
```

#### Menu Items

```typescript
interface MenuItem {
  $id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  categories: string; // Category ID
}
```

#### Customizations

```typescript
interface Customization {
  $id: string;
  name: string;
  price: number;
  type: "topping" | "side" | "size";
}
```

#### Users

```typescript
interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
  accountId: string;
}
```

---

## 🎯 App Structure

```
feastfly/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication screens
│   │   ├── sign-in.tsx    # Sign in screen
│   │   ├── sign-up.tsx    # Sign up screen
│   │   └── _layout.tsx    # Auth layout
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── search.tsx     # Search & menu screen
│   │   ├── cart.tsx       # Shopping cart
│   │   ├── profile.tsx    # User profile
│   │   └── _layout.tsx    # Tab layout
│   ├── _layout.tsx        # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── CartButton.tsx     # Cart button with badge
│   ├── CartItem.tsx       # Cart item component
│   ├── CustomButton.tsx   # Styled button
│   ├── CustomHeader.tsx   # Custom header
│   ├── CustomInput.tsx    # Styled input field
│   ├── Filter.tsx         # Category filter
│   ├── MenuCard.tsx       # Menu item card
│   └── SearchBar.tsx      # Search input
├── lib/                   # Utilities and services
│   ├── appwrite.ts        # Appwrite configuration
│   ├── data.ts            # Sample data
│   ├── seed.ts            # Database seeding
│   └── useAppwrite.ts     # Appwrite hooks
├── store/                 # State management
│   ├── auth.store.ts      # Authentication state
│   └── cart.store.ts      # Shopping cart state
├── constants/             # App constants
│   └── index.ts           # Images and constants
├── assets/                # Static assets
│   ├── fonts/            # Custom fonts
│   ├── icons/            # App icons
│   └── images/           # Images and graphics
└── scripts/              # Utility scripts
```

---

## 🔧 Available Scripts

| Script                  | Description                    |
| ----------------------- | ------------------------------ |
| `npm start`             | Start Expo development server  |
| `npm run android`       | Run on Android device/emulator |
| `npm run ios`           | Run on iOS device/simulator    |
| `npm run web`           | Run in web browser             |
| `npm run lint`          | Run ESLint                     |
| `npm run seed`          | Seed database with sample data |
| `npm run reset-project` | Reset project to initial state |

---

## 🎨 Design System

### Colors

- **Primary**: `#FE8C00` (Orange)
- **Dark**: `#1a1a1a` (Near Black)
- **Gray**: `#5D5F6D` (Medium Gray)
- **Light**: `#F5F5F5` (Light Gray)

### Typography

- **Font Family**: Quicksand
- **Weights**: Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)

### Components

- **Rounded corners**: 8px, 12px, 24px
- **Shadows**: Consistent elevation system
- **Spacing**: 4px base unit system

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules
- Use meaningful commit messages
- Add tests for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Prakhar Sahu**

- GitHub: [@Prakharsahu10](https://github.com/Prakharsahu10)
- Project: [FeastFly---Food-App](https://github.com/Prakharsahu10/FeastFly---Food-App)

---

## 🙏 Acknowledgments

- **Expo Team** for the amazing development platform
- **Appwrite Team** for the powerful backend solution
- **React Native Community** for continuous innovation
- **NativeWind** for bringing Tailwind CSS to React Native

---

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/Prakharsahu10/FeastFly---Food-App/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with 💖 by [Prakhar Sahu](https://github.com/Prakharsahu10)

</div>
