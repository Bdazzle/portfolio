export interface ThemeProps {
    [key: string] : string
}

export default function themeReducer(state: ThemeProps, action: string){
    switch (action) {
      case "dark":
        return {
          backgroundColor: `#000`,
          color: `#fff`,
          scheme: 'dark',
          mid: '#303134',
        };
      case "light":
        return {
          backgroundColor: `#fff`,
          color: `#000`,
          scheme: 'light',
          mid: ''
        };
      default:
        return state;
    }
  };