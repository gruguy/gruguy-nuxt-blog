## tailwindcss 配置

### 1. 安装

```bash
npm install -D tailwindcss
npx tailwindcss init -y
```

### 2. 配置

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      "2xl": "1920px",
    },
    colors: {
      primary: "#06b6d4",
      secondary: "#f97316",
      white: "#ffffff",
      black: "#000000",
      gray: "#f3f4f6",
      "gray-light": "#9ca3af",
      "gray-dark": "#374151",
      "gray-darker": "#1f2937",
      "gray-darkest": "#111827",
      red: "#ef4444",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
    },
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["20px", "28px"],
      xl: ["24px", "32px"],
      "2xl": ["32px", "40px"],
    },
  },
};
```

### 3. 引入

```js
import "./index.css";
import "./App.css";
import "./tailwind.css";
```

### 4. 运行

```bash
npm run dev
```

## 常用样式

```css
.text-primary {
  color: var(--primary);
  @apply text-gray-dark;
  @apply text-gray-darker;
  @apply text-gray-darkest;
}

/** 截断 */
.one-line {
  @apply overflow-hidden truncate;
}
```
